import { db } from "@/lib/db/index"
import { emergencyContacts, messages } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { nanoid } from "nanoid"

export async function getEmergencyContact(userId: string) {
  try {
    console.log("Getting emergency contact for user:", userId)
    const contacts = await db.select().from(emergencyContacts).where(eq(emergencyContacts.userId, userId)).limit(1)

    console.log("Found contacts:", contacts)
    return contacts.length > 0 ? contacts[0] : null
  } catch (error) {
    console.error("Error fetching emergency contact:", error)
    return null
  }
}

export async function saveEmergencyContact(data: {
  userId: string
  name: string
  relationship: string
  email: string
}) {
  try {
    console.log("Saving emergency contact:", data)

    // Check if contact exists
    const existingContact = await getEmergencyContact(data.userId)

    if (existingContact) {
      console.log("Updating existing contact")
      // Update existing contact
      await db
        .update(emergencyContacts)
        .set({
          name: data.name,
          relationship: data.relationship,
          email: data.email,
          updatedAt: new Date(),
        })
        .where(eq(emergencyContacts.userId, data.userId))

      return { ...existingContact, ...data }
    } else {
      console.log("Creating new contact")
      // Create new contact
      const newContact = {
        id: nanoid(),
        userId: data.userId,
        name: data.name,
        relationship: data.relationship,
        email: data.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      await db.insert(emergencyContacts).values(newContact)

      return newContact
    }
  } catch (error) {
    console.error("Error saving emergency contact:", error)
    throw error
  }
}

export async function saveMessage(data: {
  userId: string
  content: string
  role: "user" | "assistant"
  sentimentScore?: number
  crisisDetected?: boolean
}) {
  try {
    const newMessage = {
      id: nanoid(),
      userId: data.userId,
      content: data.content,
      role: data.role,
      sentimentScore: data.sentimentScore,
      crisisDetected: data.crisisDetected,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    await db.insert(messages).values(newMessage)

    return newMessage
  } catch (error) {
    console.error("Error saving message:", error)
    throw error
  }
}

export async function getUserMessages(userId: string, limit = 50) {
  try {
    const userMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.userId, userId))
      .orderBy(messages.createdAt)
      .limit(limit)

    return userMessages
  } catch (error) {
    console.error("Error fetching user messages:", error)
    return []
  }
}

