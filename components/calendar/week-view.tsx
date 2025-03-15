"use client"

import { memo, useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { WeekViewProps, CalendarEvent } from "./types"
import { calculateEventPosition } from "@/lib/calendar-utils"

function WeekView({ days, events, onEventClick, selectedDay, setSelectedDay }: WeekViewProps) {
  // Memoize the event calculations for each day to prevent recalculation on re-renders
  const eventsByDay = useMemo(() => {
    return days.map((day) => ({
      day,
      events: events.filter((event) => event.day === day.date.getDate()),
    }))
  }, [days, events])

  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <div className="w-16 flex-shrink-0" />
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          {days.map((day, dayIndex) => (
            <div
              key={day.date.toISOString()}
              className={cn(
                "p-2 text-center border-b cursor-pointer",
                day.date.getDate() === selectedDay ? "bg-gray-100" : "",
              )}
              onClick={() => setSelectedDay(day.date.getDate())}
            >
              <div className="text-xs sm:text-sm text-gray-500">{day.name}</div>
              <div className="text-lg sm:text-xl font-semibold">{day.number}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-1 overflow-auto">
        {/* Time labels */}
        <div className="w-16 flex-shrink-0">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-20 text-xs sm:text-sm text-gray-500 text-right pr-2">
              {`${8 + i}:00`}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          {eventsByDay.map(({ day, events }) => (
            <div key={day.date.toISOString()} className="border-l relative">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-20 border-b border-gray-100" />
              ))}
              {events.map((event) => (
                <EventItem key={event.id} event={event} onEventClick={onEventClick} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Memoized event item component to prevent unnecessary re-renders
const EventItem = memo(
  ({
    event,
    onEventClick,
  }: {
    event: CalendarEvent
    onEventClick: (event: CalendarEvent) => void
  }) => {
    const { top, height } = useMemo(() => calculateEventPosition(event.start, event.end, 8), [event.start, event.end])

    return (
      <div
        className={`absolute left-1 right-1 p-2 rounded-lg ${event.color} cursor-pointer hover:opacity-90 transition-opacity`}
        style={{
          top: `${top}px`,
          height: `${height}px`,
        }}
        onClick={() => onEventClick(event)}
      >
        <div className="text-xs sm:text-sm font-medium truncate">{event.title}</div>
        <div className="text-xs text-gray-500 hidden sm:block">
          {event.start} - {event.end}
        </div>
        {event.participants.length > 0 && (
          <div className="flex -space-x-2 mt-1 hidden sm:flex">
            {event.participants.map((user, i) => (
              <Avatar key={i} className="w-5 h-5 border-2 border-white">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        )}
      </div>
    )
  },
)
EventItem.displayName = "EventItem"

export default memo(WeekView)

