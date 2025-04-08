import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

// Sentiment analysis helper
export function analyzeSentiment(text: string): {
  score: number
  crisisDetected: boolean
} {
  // This is a simplified sentiment analysis
  // In production, you would use a more sophisticated model

  const crisisKeywords = [
    "suicide",
    "kill myself",
    "end my life",
    "don't want to live",
    "better off dead",
    "can't go on",
    "want to die",
    "no reason to live",
    "hopeless",
    "worthless",
    "harm myself",
    "hurt myself",
  ]

  const text_lower = text.toLowerCase()

  // Check for crisis keywords
  const crisisDetected = crisisKeywords.some((keyword) => text_lower.includes(keyword))

  // Simple sentiment scoring
  // -1 to 1 scale where -1 is very negative, 1 is very positive
  let score = 0

  // This is just a placeholder - in production you would use
  // a proper sentiment analysis model or API
  if (crisisDetected) {
    score = -0.8
  } else if (text_lower.includes("sad") || text_lower.includes("depressed") || text_lower.includes("anxious")) {
    score = -0.5
  } else if (text_lower.includes("happy") || text_lower.includes("good") || text_lower.includes("great")) {
    score = 0.5
  }

  return {
    score,
    crisisDetected,
  }
}

