"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useCallback, memo, useMemo } from "react"
import type { MiniCalendarProps } from "./types"

function MiniCalendar({ onDaySelect }: MiniCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 9))

  const prevMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1))
  }, [])

  const nextMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1))
  }, [])

  // Memoize calendar data to prevent recalculation on re-renders
  const calendarData = useMemo(() => {
    const monthName = currentMonth.toLocaleString("default", { month: "long" })
    const year = currentMonth.getFullYear()

    // Get days in month
    const daysInMonth = new Date(year, currentMonth.getMonth() + 1, 0).getDate()

    // Get first day of month
    const firstDayOfMonth = new Date(year, currentMonth.getMonth(), 1).getDay()
    const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 // Adjust for Monday start

    // Create calendar days array
    const days = Array.from({ length: 42 }, (_, i) => {
      const dayNumber = i - firstDayIndex + 1
      if (dayNumber > 0 && dayNumber <= daysInMonth) {
        return dayNumber
      }
      return null
    })

    return { monthName, year, days }
  }, [currentMonth])

  const handleDayClick = useCallback(
    (day: number | null) => {
      if (day && onDaySelect) {
        onDaySelect(day)
      }
    },
    [onDaySelect],
  )

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">
          {calendarData.monthName} {calendarData.year}
        </h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="text-white" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs mb-2">
        <div className="text-center">Mo</div>
        <div className="text-center">Tu</div>
        <div className="text-center">We</div>
        <div className="text-center">Th</div>
        <div className="text-center">Fr</div>
        <div className="text-center">Sa</div>
        <div className="text-center">Su</div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-xs">
        {calendarData.days.map((day, i) => {
          const isToday = day === 18 && currentMonth.getMonth() === 9 && currentMonth.getFullYear() === 2023
          return (
            <div
              key={i}
              className={cn(
                "h-7 w-7 flex items-center justify-center rounded-full",
                day === null ? "invisible" : "cursor-pointer",
                isToday ? "bg-yellow-300 text-black" : "hover:bg-gray-800",
              )}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default memo(MiniCalendar)

