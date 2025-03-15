"use client"

import { useEffect, useState, useCallback } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  // Use useCallback to memoize the listener function
  const handleChange = useCallback((e: MediaQueryListEvent) => {
    setMatches(e.matches)
  }, [])

  useEffect(() => {
    // Check for window to ensure this only runs in the browser
    if (typeof window === "undefined") {
      return
    }

    // Initialize with the current state
    const media = window.matchMedia(query)
    setMatches(media.matches)

    // Add event listener using the memoized callback
    media.addEventListener("change", handleChange)

    // Clean up
    return () => media.removeEventListener("change", handleChange)
  }, [query, handleChange])

  return matches
}

