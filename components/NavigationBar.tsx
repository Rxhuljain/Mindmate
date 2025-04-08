import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function NavigationBar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-900 shadow-sm">
      {/* Logo */}
      <div className="flex items-center space-x-2">
      <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">MindMate</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-6">
        <Link href="/dashboard" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 transition">
          Dashboard
        </Link>
        <Link href="/chat" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 transition">
          Chat
        </Link>
        <Link href="/resources" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 transition">
          Resources
        </Link>
        <Link href="/journal" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-primary dark:hover:text-blue-400 transition">
          Journal
        </Link>

        {/* Profile Avatar */}
        <Avatar className="w-8 h-8">
          <AvatarFallback className="text-sm bg-gray-200 dark:bg-gray-700 dark:text-white">R</AvatarFallback>
        </Avatar>
      </nav>
    </header>
  );
}
