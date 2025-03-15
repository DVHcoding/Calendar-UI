"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Plus } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ErrorBoundary } from "react-error-boundary"
import dynamic from "next/dynamic"

import CalendarHeader from "./calendar-header"
import CalendarSidebar from "./calendar-sidebar"
import { initialEvents, days } from "./calendar-data"
import type { CalendarEvent } from "./types"
import ErrorFallback from "./error-fallback"

// Dynamically import view components for code splitting
const WeekView = dynamic(() => import("./week-view"), {
  loading: () => (
    <div className="flex-1 grid place-items-center">
      <p>Loading week view...</p>
    </div>
  ),
})
const MonthView = dynamic(() => import("./month-view"), {
  loading: () => (
    <div className="flex-1 grid place-items-center">
      <p>Loading month view...</p>
    </div>
  ),
})
const DayView = dynamic(() => import("./day-view"), {
  loading: () => (
    <div className="flex-1 grid place-items-center">
      <p>Loading day view...</p>
    </div>
  ),
})
const EventForm = dynamic(() => import("./event-form"))
const EventDetail = dynamic(() => import("./event-detail"))

export default function CalendarApp() {
  const [view, setView] = useState<"month" | "week" | "day">("week")
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<number>(18)
  const [isLoading, setIsLoading] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  // Load sidebar state from localStorage on component mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem("sidebarExpanded")
      if (savedState !== null) {
        setSidebarExpanded(savedState === "true")
      }
    } catch (error) {
      console.error("Failed to load sidebar state from localStorage:", error)
    }
  }, [])

  // Save sidebar state to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem("sidebarExpanded", sidebarExpanded.toString())
    } catch (error) {
      console.error("Failed to save sidebar state to localStorage:", error)
    }
  }, [sidebarExpanded])

  // Memoize filtered events for the current day view to prevent recalculation
  const dayViewEvents = useMemo(() => {
    return events.filter((e) => e.day === selectedDay)
  }, [events, selectedDay])

  // Memoize the selected day object
  const selectedDayObject = useMemo(() => {
    return days.find((d) => d.date.getDate() === selectedDay)
  }, [selectedDay])

  const toggleSidebar = useCallback(() => {
    setSidebarExpanded((prev) => !prev)
  }, [])

  const handleAddEvent = useCallback(
    (event: Partial<CalendarEvent>) => {
      setIsLoading(true)
      try {
        const newEvent: CalendarEvent = {
          id: Math.max(0, ...events.map((e) => e.id)) + 1,
          title: event.title || "Untitled Event",
          start: event.startTime || "09:00",
          end: event.endTime || "10:00",
          day: selectedDay,
          participants: [],
          color:
            event.category === "Work"
              ? "bg-blue-100"
              : event.category === "Personal"
                ? "bg-green-100"
                : "bg-purple-100",
          description: event.description || "",
        }

        setEvents((prev) => [...prev, newEvent])
      } catch (error) {
        console.error("Failed to add event:", error)
      } finally {
        setIsLoading(false)
      }
    },
    [events, selectedDay],
  )

  const handleDeleteEvent = useCallback((id: number) => {
    setIsLoading(true)
    try {
      setEvents((prev) => prev.filter((event) => event.id !== id))
      setSelectedEvent(null)
    } catch (error) {
      console.error("Failed to delete event:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleUpdateEvent = useCallback((updatedEvent: CalendarEvent) => {
    setIsLoading(true)
    try {
      setEvents((prev) => prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)))
      setSelectedEvent(null)
    } catch (error) {
      console.error("Failed to update event:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleEventClick = useCallback((event: CalendarEvent) => {
    setSelectedEvent(event)
  }, [])

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <CalendarSidebar onDaySelect={setSelectedDay} />
          </ErrorBoundary>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:block bg-gray-950 text-white transition-all duration-300 ease-in-out ${
          sidebarExpanded ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <CalendarSidebar onDaySelect={setSelectedDay} />
        </ErrorBoundary>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <CalendarHeader
            view={view}
            setView={setView}
            isMobile={isMobile}
            onMenuClick={() => setSidebarOpen(true)}
            toggleSidebar={toggleSidebar}
            sidebarExpanded={sidebarExpanded}
          />
        </ErrorBoundary>

        <div className="flex-1 overflow-auto">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {view === "week" && (
              <WeekView
                days={days}
                events={events}
                onEventClick={handleEventClick}
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
              />
            )}
            {view === "month" && <MonthView days={days} events={events} onEventClick={handleEventClick} />}
            {view === "day" && selectedDayObject && (
              <DayView day={selectedDayObject} events={dayViewEvents} onEventClick={handleEventClick} />
            )}
          </ErrorBoundary>
        </div>

        {/* Add Event Button (Mobile) */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg md:hidden"
              size="icon"
              disabled={isLoading}
            >
              <Plus className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <EventForm onSubmit={handleAddEvent} selectedDay={selectedDay} isLoading={isLoading} />
            </ErrorBoundary>
          </DialogContent>
        </Dialog>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <EventDetail
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
              onDelete={handleDeleteEvent}
              onUpdate={handleUpdateEvent}
              isLoading={isLoading}
            />
          </ErrorBoundary>
        )}
      </div>
    </div>
  )
}

