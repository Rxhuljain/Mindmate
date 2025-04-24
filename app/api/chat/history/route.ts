// app/api/chat/history/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.userId, userId))
      .orderBy(messages.createdAt);

    return NextResponse.json({ messages: userMessages });
  } catch (error) {
    console.error("❌ Error fetching chat history:", error);
    return NextResponse.json({ error: "Failed to fetch chat history" }, { status: 500 });
  }
}
