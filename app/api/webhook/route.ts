import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL; // Remove NEXT_PUBLIC_

  if (!webhookUrl) {
    return NextResponse.json(
      { error: "Webhook URL is not configured" },
      { status: 500 },
    );
  }

  try {
    const data = await request.json();

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to send webhook");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send webhook" },
      { status: 500 },
    );
  }
}
