import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { saveEmergencyContact } from "@/lib/db-utils"

export async function POST(request: Request) {
  try {
    const { userId } = await auth()

    if (!userId) {
      console.error("Unauthorized: No userId found in auth")
      return new NextResponse("Unauthorized", { status: 401 })
    }

    console.log("Authenticated userId:", userId)

    const body = await request.json()

    console.log("Received emergency contact data:", body)

    // Validate required fields
    if (!body.name || !body.email || !body.relationship) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Save emergency contact
    const contact = await saveEmergencyContact({
      userId,
      name: body.name,
      relationship: body.relationship,
      email: body.email,
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error("[EMERGENCY_CONTACT_POST]", error)
    return new NextResponse(`Internal error: ${error instanceof Error ? error.message : "Unknown error"}`, {
      status: 500,
    })
  }
}

