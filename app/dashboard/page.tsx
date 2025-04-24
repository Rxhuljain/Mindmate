import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { getEmergencyContact } from "@/lib/db-utils"
import { DailyQuizCard } from '@/components/DailyQuizCard'
export default async function DashboardPage() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  
  let emergencyContact = null
  try {
    emergencyContact = await getEmergencyContact(user.id)
  } catch (error) {
    console.error("Error fetching emergency contact:", error)
   
  }

  if (!emergencyContact) {
    redirect("/emergency-contact")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader user={user} />
      <DashboardShell className="pattern-bg">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight, text-black dark:text-gray-800" >
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {user.firstName || "Friend"}
            </span>
          </h1>
          <p className="text-muted-foreground mt-1">
            How are you feeling today? Your mental health journey continues here.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="overflow-hidden border-2 border-primary/10 card-hover">
            <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Chat with AI
              </CardTitle>
              <CardDescription>Talk to our AI assistant about your thoughts and feelings.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-20 w-full rounded-md bg-muted flex items-center justify-center">
                <p className="text-sm text-muted-foreground italic">"How are you feeling today?"</p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/chat" className="w-full">
                <Button className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                  Start Chat
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden border-2 border-secondary/10 card-hover">
            <div className="h-2 bg-gradient-to-r from-secondary to-primary"></div>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-secondary"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z"></path>
                  <path d="M8 7h6"></path>
                  <path d="M8 11h8"></path>
                  <path d="M8 15h6"></path>
                </svg>
                Resources
              </CardTitle>
              <CardDescription>Access helpful resources and articles.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-20 w-full rounded-md bg-muted flex items-center justify-center">
                <p className="text-sm text-muted-foreground italic">Discover tools for mental wellness</p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/resources" className="w-full">
                <Button variant="outline" className="w-full rounded-full border-2">
                  View Resources
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="overflow-hidden border-2 border-accent/10 card-hover">
            <div className="h-2 bg-gradient-to-r from-accent to-secondary"></div>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                >
                  <path d="M12 2v8"></path>
                  <path d="m4.93 10.93 1.41 1.41"></path>
                  <path d="M2 18h2"></path>
                  <path d="M20 18h2"></path>
                  <path d="m19.07 10.93-1.41 1.41"></path>
                  <path d="M22 22H2"></path>
                  <path d="m16 6-4 4-4-4"></path>
                  <path d="M16 18a4 4 0 0 0-8 0"></path>
                </svg>
                Journal
              </CardTitle>
              <CardDescription>Keep track of your thoughts and progress.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-20 w-full rounded-md bg-muted flex items-center justify-center">
                <p className="text-sm text-muted-foreground italic">Record your daily reflections</p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/journal" className="w-full">
                <Button variant="outline" className="w-full rounded-full border-2">
                  Open Journal
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Chat with AI card */}
          {/* Resources card */}
          {/* Journal card */}
          {/* ... all those cards you already had ... */}
        </div>

        {/* Progress Card */}
        <div className="mt-12">
          <Card className="overflow-hidden border-0 shadow-lg">
            {/* ... progress content ... */}
          </Card>
        </div>

        {/* ✅ Daily Quiz Card */}
        <div className="mt-12">
          <DailyQuizCard />
        </div>
      </DashboardShell>
      
    </div>
    
  )
}

