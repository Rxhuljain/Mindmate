"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const { user } = useUser()
  const { toast } = useToast()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi there! I'm your AI mental health assistant. How are you feeling today?",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [crisisFlag, setCrisisFlag] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage = input
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString() + "-user",
        role: "user",
        content: userMessage,
        timestamp: new Date(),
      },
    ])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!response.ok) {
        const contentType = response.headers.get("content-type")
        if (contentType && contentType.includes("application/json")) {
          const errorDetails = await response.json()
          throw new Error(errorDetails.error || "Failed to fetch AI response")
        } else {
          const errorText = await response.text()
          throw new Error(errorText || "Unexpected response from server")
        }
      }

      const result = await response.json()
      const aiReply = result.message
      const crisisDetected = result.crisisDetected

      if (crisisDetected) {
        setCrisisFlag(true)
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-bot",
          role: "assistant",
          content: aiReply,
          timestamp: new Date(),
        },
      ])
    } catch (error: any) {
      console.error("❌ Error sending message:", error)
      toast({
        title: "Error",
        description: error?.message || "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user as any} />
      <DashboardShell className="flex-1 flex flex-col pattern-bg">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight, text-black dark:text-gray-800">
            Chat with{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MindMate
            </span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Share your thoughts and feelings in a safe, confidential space.
          </p>
        </div>

        {crisisFlag && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow">
            <strong className="font-semibold">Crisis detected:</strong> It seems you might be going through a tough time. You're not alone.
            <div className="mt-2">
              <Button
                variant="outline"
                onClick={() => {
                  // You could link to /emergency or open a modal
                  toast({
                    title: "Emergency Contact",
                    description: "Consider reaching out to your trusted contact or calling a helpline.",
                  })
                }}
              >
                View Emergency Resources
              </Button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border">
            <div className="space-y-6 max-w-3xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex items-start gap-3 max-w-[80%]">
                    {message.role === "assistant" && (
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-30 animate-pulse-slow"></div>
                        <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="AI" />
                          <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                            AI
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                    <Card
                      className={`${
                        message.role === "user"
                          ? "bg-gradient-to-r from-primary to-secondary text-white border-0"
                          : "bg-white dark:bg-gray-900 border-2 border-primary/10 dark:border-primary/20"
                      }`}
                    >
                      <CardContent className="p-4">
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <div className="text-xs opacity-70 mt-2 text-right">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </CardContent>
                    </Card>
                    {message.role === "user" && (
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-30 animate-pulse-slow"></div>
                        <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800">
                          <AvatarImage src={user.imageUrl} alt={user.firstName || "User"} />
                          <AvatarFallback className="bg-gradient-to-r from-secondary to-accent text-white">
                            {user.firstName?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="border-t p-4 mt-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex flex-col gap-3">
              <Textarea
                placeholder="Type your message here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[100px] border-2 focus:border-primary/50 rounded-xl resize-none"
                disabled={isLoading}
              />
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  Your conversations are private and confidential.
                </p>
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="rounded-full px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DashboardShell>
    </div>
  )
}
