import type React from "react"
import { cn } from "@/lib/utils"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <main className={cn("flex-1", className)} {...props}>
      <div className="container py-6 md:py-8">{children}</div>
    </main>
  )
}

