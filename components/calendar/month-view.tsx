"use client"

import { memo, useMemo } from "react"
import type { MonthViewProps, CalendarEvent } from "./types"

function MonthView({ days, events, onEventClick }: MonthViewProps) {
  // Generate days for the month view (35 days to fill a 5-week grid)
  const monthDays = useMemo(() => {
    // Get the first day of the month (October 2023)
    const firstDay = new Date(2023, 9, 1)
    const firstDayOfWeek = firstDay.getDay() || 7 // Convert Sunday (0) to 7 for easier calculation

    // Calculate the offset to start from Monday
    const offset = firstDayOfWeek - 1

    // Generate array of 35 days (5 weeks)
    return Array.from({ length: 35 }, (_, i) => {
      const day = i - offset + 1
      const date = new Date(2023, 9, day)
      return { day, date, isCurrentMonth: day > 0 && day <= 31 }
    })
  }, [])

  // Group events by day for efficient rendering
  const eventsByDay = useMemo(() => {
    const map = new Map<number, CalendarEvent[]>()

    events.forEach((event) => {
      if (!map.has(event.day)) {
        map.set(event.day, [])
      }
      map.get(event.day)?.push(event)
    })

    return map
  }, [events])

  return (
    <div className="grid grid-cols-7 gap-1 p-4">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
        <div key={day} className="text-center font-medium p-2">
          {day}
        </div>
      ))}

      {monthDays.map(({ day, date, isCurrentMonth }) => {
        const dayEvents = eventsByDay.get(day) || []

        return (
          <div
            key={date.toISOString()}
            className={`border rounded-lg h-32 p-1 overflow-hidden ${!isCurrentMonth ? "bg-gray-50 opacity-50" : ""}`}
          >
            <div className="text-right text-sm text-gray-500 mb-1">{isCurrentMonth ? day : ""}</div>

            {isCurrentMonth && (
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className={`${event.color} p-1 rounded text-xs truncate cursor-pointer`}
                    onClick={() => onEventClick(event)}
                  >
                    {event.title}
                  </div>
                ))}

                {dayEvents.length > 3 && <div className="text-xs text-gray-500">+{dayEvents.length - 3} more</div>}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default memo(MonthView)

