import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 py-12">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto w-full max-w-md",
            card: "bg-background shadow-lg rounded-lg border p-6",
          },
        }}
        afterSignInUrl="/dashboard"
      />
    </div>
  )
}

