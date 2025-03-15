"use client"

import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import type { ErrorFallbackProps } from "./types"

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center h-full">
      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error.message || "An unexpected error occurred"}</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  )
}

