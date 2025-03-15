"use client"

import { memo, useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { DayViewProps } from "./types"
import { calculateEventPosition } from "@/lib/calendar-utils"

function DayView({ day, events, onEventClick }: DayViewProps) {
  // Sort events by start time for better display
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const aStart = a.start.split(":").map(Number)
      const bStart = b.start.split(":").map(Number)

      if (aStart[0] !== bStart[0]) {
        return aStart[0] - bStart[0]
      }

      return aStart[1] - bStart[1]
    })
  }, [events])

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 text-center border-b">
        <div className="text-sm text-gray-500">{day.name}</div>
        <div className="text-2xl font-semibold">{day.number}</div>
      </div>
      <div className="flex flex-1 overflow-auto">
        {/* Time labels */}
        <div className="w-20 flex-shrink-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-20 text-sm text-gray-500 text-right pr-2">
              {`${7 + i}:00`}
            </div>
          ))}
        </div>

        {/* Events */}
        <div className="flex-1 relative border-l">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-20 border-b border-gray-100" />
          ))}

          {sortedEvents.map((event) => {
            const { top, height } = calculateEventPosition(event.start, event.end, 7)

            return (
              <div
                key={event.id}
                className={`absolute left-2 right-2 p-3 rounded-lg ${event.color} cursor-pointer hover:opacity-90 transition-opacity`}
                style={{
                  top: `${top}px`,
                  height: `${height}px`,
                }}
                onClick={() => onEventClick(event)}
              >
                <div className="text-sm font-medium">{event.title}</div>
                <div className="text-xs text-gray-600">
                  {event.start} - {event.end}
                </div>
                <p className="text-xs mt-1 text-gray-700 line-clamp-2">{event.description}</p>
                {event.participants.length > 0 && (
                  <div className="flex -space-x-2 mt-2">
                    {event.participants.map((user, i) => (
                      <Avatar key={i} className="w-6 h-6 border-2 border-white">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default memo(DayView)

