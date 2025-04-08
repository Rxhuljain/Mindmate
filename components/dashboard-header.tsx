import Link from "next/link";

import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/logo";
import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";



interface DashboardHeaderProps {
  user: User | null; // or whatever the correct Clerk user type is
}

export function DashboardHeader({ }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo size="md" />
        <nav className="flex items-center gap-4">
          <Link href="/dashboard" className="text-sm font-medium relative group">
            Dashboard
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/chat" className="text-sm font-medium relative group">
            Chat
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/resources" className="text-sm font-medium relative group">
            Resources
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/journal" className="text-sm font-medium relative group">
            Journal
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all group-hover:w-full"></span>
          </Link>
          <ModeToggle />
          <div className="relative">
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-secondary rounded-full"></div>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 border-2 border-primary/20",
                },
              }}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}
