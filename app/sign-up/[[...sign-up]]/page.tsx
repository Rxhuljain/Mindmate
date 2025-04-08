import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 py-12">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto w-full max-w-md",
            card: "bg-background shadow-lg rounded-lg border p-6",
          },
        }}
        afterSignUpUrl="/emergency-contact"
      />
    </div>
  )
}

