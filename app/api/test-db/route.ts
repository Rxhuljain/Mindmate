import { NextResponse } from "next/server"
import { executeQuery } from "@/lib/db/index"

export async function GET() {
  try {
    // Simple query to test connection
    const result = await executeQuery("SELECT 1 as test")
    return NextResponse.json({
      success: true,
      message: "Database connected successfully!",
      result,
    })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to connect to database",
      },
      { status: 500 },
    )
  }
}

