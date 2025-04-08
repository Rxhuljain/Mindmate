"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser, useAuth } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Logo } from "@/components/logo"

export default function EmergencyContactPage() {
  const { user, isLoaded: isUserLoaded } = useUser()
  const { getToken, isLoaded: isAuthLoaded } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    email: "",
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (isUserLoaded && isAuthLoaded && !user) {
      router.push("/sign-in")
    }
  }, [isUserLoaded, isAuthLoaded, user, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Get auth token
      const token = await getToken()

      if (!token) {
        throw new Error("Authentication failed. Please sign in again.")
      }

      // First test the database connection
      const testResponse = await fetch("/api/test-db")
      const testData = await testResponse.json()
      console.log("Database test:", testData)

      if (!testData.success) {
        throw new Error(`Database connection failed: ${testData.error}`)
      }

      console.log("Submitting emergency contact:", formData)

      // Save emergency contact to database
      const response = await fetch("/api/emergency-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user?.id,
          ...formData,
        }),
      })

      // Log the raw response
      console.log("Response status:", response.status)

      const text = await response.text()
      console.log("Response text:", text)

      let data
      try {
        data = JSON.parse(text)
      } catch (e) {
        console.error("Failed to parse JSON:", e)
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText} - ${text}`)
      }

      toast({
        title: "Emergency contact saved",
        description: "Your emergency contact has been saved successfully.",
      })

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Error saving emergency contact:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to save emergency contact"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading state while checking authentication
  if (!isUserLoaded || !isAuthLoaded) {
    return (
      <div className="container flex items-center justify-center min-h-screen py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect if not authenticated (this is a fallback, the useEffect should handle this)
  if (!user) {
    return null
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen py-12 pattern-bg">
      <div className="mb-8">
        <Logo size="lg" />
      </div>

      <Card className="w-full max-w-md border-0 shadow-xl">
        <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
        <CardHeader>
          <CardTitle className="text-2xl">Emergency Contact</CardTitle>
          <CardDescription>
            Please provide an emergency contact. This information will only be used in case of emergency.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-4 bg-destructive/15 text-destructive rounded-md text-sm border border-destructive/30">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {error}
                </div>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
                className="rounded-md border-2 focus:border-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="relationship" className="text-sm font-medium">
                Relationship
              </Label>
              <Input
                id="relationship"
                name="relationship"
                placeholder="Friend, Family Member, etc."
                required
                value={formData.relationship}
                onChange={handleChange}
                className="rounded-md border-2 focus:border-primary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="rounded-md border-2 focus:border-primary/50"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                "Save Emergency Contact"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-full border-2"
              onClick={async () => {
                try {
                  const response = await fetch("/api/test-db")
                  const data = await response.json()
                  toast({
                    title: data.success ? "Database Connected" : "Database Error",
                    description: data.message || data.error,
                    variant: data.success ? "default" : "destructive",
                  })
                } catch (error) {
                  toast({
                    title: "Connection Error",
                    description: error instanceof Error ? error.message : "Failed to test database connection",
                    variant: "destructive",
                  })
                }
              }}
            >
              Test Database Connection
            </Button>
          </CardFooter>
        </form>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Your information is secure and will only be used in emergency situations.</p>
      </div>
    </div>
  )
}

