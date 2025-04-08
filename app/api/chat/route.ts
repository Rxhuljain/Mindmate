import { NextRequest, NextResponse } from "next/server";
import { Client } from "@gradio/client";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db"; // ✅ Make sure your export in lib/db/index.ts is: `export { db } from './drizzle';`
import { messages } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";

export const runtime = "nodejs";

const triggerWords = [
  "suicide", "self-harm", "depressed", "hopeless",
  "end my life", "worthless", "kill myself", "no way out", "give up"
];

const TRIGGER_THRESHOLD = 3;

function countTriggerWords(message: string): number {
  const lowerCaseMessage = message.toLowerCase();
  return triggerWords.reduce((count, word) => {
    if (lowerCaseMessage.includes(word)) {
      count++;
    }
    return count;
  }, 0);
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth(); // ✅ Await the promise to access userId
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const crisisScore = countTriggerWords(message);
    const crisisDetected = crisisScore >= TRIGGER_THRESHOLD;

    // Store user message
    await db.insert(messages).values({
      id: uuidv4(),
      userId,
      content: message,
      role: "user",
      sentimentScore: crisisScore,
      crisisDetected,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Get AI response
    const client = await Client.connect("https://rahulxjain11-mindmate-chatbot.hf.space/");
    const result = await client.predict("/chat", {
      message,
      system_message: "You are a helpful and supportive AI mental health assistant.",
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.95,
    });

    const aiReply = (result?.data as string[])[0] || "Sorry, I couldn't process your message.";

    // Store AI reply
    await db.insert(messages).values({
      id: uuidv4(),
      userId,
      content: aiReply,
      role: "assistant",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return NextResponse.json({ message: aiReply, crisisDetected });
  } catch (error: any) {
    console.error("❌ Error in /api/chat route:", error);
    return NextResponse.json({ error: "Failed to fetch AI response" }, { status: 500 });
  }
}
