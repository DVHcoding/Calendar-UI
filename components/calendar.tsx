"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, X, Menu, CalendarIcon, Clock, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { TimePicker } from "@/components/time-picker"
import { useMediaQuery } from "@/hooks/use-media-query"

const users = [
  {
    name: "John",
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Sarah",
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Mike",
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    name: "Emma",
    image: "/placeholder.svg?height=32&width=32",
  },
]

const initialEvents = [
  {
    id: 1,
    title: "Email design",
    start: "9:00",
    end: "11:20",
    day: 18,
    participants: users.slice(0, 3),
    color: "bg-blue-100",
    description: "Design email templates for the new campaign",
  },
  {
    id: 2,
    title: "Youtube video",
    start: "8:30",
    end: "9:30",
    day: 19,
    participants: [],
    color: "bg-purple-100",
    description: "Record tutorial video for the new feature",
  },
  {
    id: 3,
    title: "Designers meeting",
    start: "9:30",
    end: "10:30",
    day: 19,
    participants: users.slice(1, 3),
    color: "bg-blue-100",
    description: "Weekly design team sync",
  },
  {
    id: 4,
    title: "Breakfast",
    start: "9:30",
    end: "10:30",
    day: 20,
    participants: [],
    color: "bg-blue-100",
    description: "Team breakfast",
  },
  {
    id: 5,
    title: "UX meeting",
    start: "11:30",
    end: "13:00",
    day: 19,
    participants: [],
    color: "bg-blue-100",
    description: "Discuss user experience improvements",
  },
  {
    id: 6,
    title: "Brain storm",
    start: "11:10",
    end: "13:30",
    day: 20,
    participants: users.slice(0, 2),
    color: "bg-blue-100",
    description: "Brainstorming session for new product ideas",
  },
  {
    id: 7,
    title: "Team meeting",
    start: "10:30",
    end: "12:00",
    day: 21,
    participants: users.slice(0, 2),
    color: "bg-purple-100",
    description: "Weekly team sync",
  },
  {
    id: 8,
    title: "Launch Time",
    start: "11:30",
    end: "12:30",
    day: 21,
    participants: [],
    color: "bg-purple-100",
    description: "Product launch preparation",
  },
  {
    id: 9,
    title: "Landing Page",
    start: "9:00",
    end: "10:30",
    day: 22,
    participants: [],
    color: "bg-blue-100",
    description: "Design landing page for new product",
  },
  {
    id: 10,
    title: "Designers meet",
    start: "12:30",
    end: "2:30",
    day: 22,
    participants: [],
    color: "bg-blue-100",
    description: "Design team collaboration session",
  },
  {
    id: 11,
    title: "UX meeting",
    start: "12:00",
    end: "1:30",
    day: 23,
    participants: [],
    color: "bg-purple-100",
    description: "User experience review meeting",
  },
  {
    id: 12,
    title: "Study time",
    start: "9:30",
    end: "11:30",
    day: 23,
    participants: [],
    color: "bg-purple-100",
    description: "Personal study session",
  },
  {
    id: 13,
    title: "Motion design",
    start: "7:30",
    end: "10:30",
    day: 23,
    participants: users.slice(1, 3),
    color: "bg-blue-100",
    description: "Create motion graphics for the new app",
  },
  {
    id: 14,
    title: "New Project",
    start: "10:30",
    end: "12:10",
    day: 23,
    participants: [],
    color: "bg-blue-100",
    description: "Kickoff meeting for the new project",
  },
  {
    id: 15,
    title: "Develop meeting",
    start: "12:30",
    end: "1:30",
    day: 19,
    participants: [],
    color: "bg-purple-100",
    description: "Development team sync",
  },
]

const days = [
  { name: "TUE", number: "18", date: new Date(2023, 9, 18) },
  { name: "WED", number: "19", date: new Date(2023, 9, 19) },
  { name: "THU", number: "20", date: new Date(2023, 9, 20) },
  { name: "FRI", number: "21", date: new Date(2023, 9, 21) },
  { name: "SAT", number: "22", date: new Date(2023, 9, 22) },
  { name: "SUN", number: "23", date: new Date(2023, 9, 23) },
]

const categories = [
  { name: "Work", color: "bg-blue-400" },
  { name: "Personal", color: "bg-green-400" },
  { name: "Education", color: "bg-purple-400" },
]

const calendars = [
  { name: "Daily Tasks", checked: true },
  { name: "Birthdays", checked: true },
  { name: "Tasks", checked: true },
]

export default function CalendarApp() {
  const [view, setView] = useState<"month" | "week" | "day">("week")
  const [events, setEvents] = useState(initialEvents)
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date(2023, 9, 18))
  const [startTime, setStartTime] = useState<string>("09:00")
  const [endTime, setEndTime] = useState<string>("10:00")
  const [selectedDay, setSelectedDay] = useState<number>(18)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const handleAddEvent = (event: any) => {
    const newEvent = {
      id: events.length + 1,
      title: event.title,
      start: event.startTime,
      end: event.endTime,
      day: selectedDay,
      participants: [],
      color:
        event.category === "Work" ? "bg-blue-100" : event.category === "Personal" ? "bg-green-100" : "bg-purple-100",
      description: event.description,
    }
    setEvents([...events, newEvent])
  }

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id))
    setSelectedEvent(null)
  }

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 bg-gray-950 text-white">
        <SidebarContent />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <h1 className="text-xl font-semibold hidden sm:block">October 2023</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              <Button
                variant={view === "month" ? "secondary" : "ghost"}
                onClick={() => setView("month")}
                className="rounded-r-none text-xs sm:text-sm"
              >
                Month
              </Button>
              <Button
                variant={view === "week" ? "secondary" : "ghost"}
                onClick={() => setView("week")}
                className="rounded-none border-x text-xs sm:text-sm"
              >
                Week
              </Button>
              <Button
                variant={view === "day" ? "secondary" : "ghost"}
                onClick={() => setView("day")}
                className="rounded-l-none text-xs sm:text-sm"
              >
                Day
              </Button>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size={isMobile ? "sm" : "default"}>Join</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Join Calendar</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <Button className="w-full">Join Calendar</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          {view === "week" && (
            <WeekView
              days={days}
              events={events}
              onEventClick={setSelectedEvent}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          )}
          {view === "month" && <MonthView days={days} events={events} onEventClick={setSelectedEvent} />}
          {view === "day" && (
            <DayView
              day={days.find((d) => d.date.getDate() === selectedDay)}
              events={events.filter((e) => e.day === selectedDay)}
              onEventClick={setSelectedEvent}
            />
          )}
        </div>

        {/* Add Event Button (Mobile) */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg md:hidden" size="icon">
              <Plus className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
            </DialogHeader>
            <EventForm onSubmit={handleAddEvent} selectedDay={selectedDay} />
          </DialogContent>
        </Dialog>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>
                    {selectedEvent.start} - {selectedEvent.end}
                  </span>
                </div>
                {selectedEvent.participants.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <div className="flex -space-x-2">
                      {selectedEvent.participants.map((user: any, i: number) => (
                        <Avatar key={i} className="w-6 h-6 border-2 border-white">
                          <AvatarImage src={user.image} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-gray-700">{selectedEvent.description}</p>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                    Close
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteEvent(selectedEvent.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

function SidebarContent() {
  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="bg-purple-200 text-purple-700 p-2 rounded-xl">
          <X className="h-5 w-5" />
        </div>
        <div className="bg-purple-200 text-purple-700 p-2 rounded-xl">
          <Plus className="h-5 w-5" />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">October 2023</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-white">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
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
          {Array.from({ length: 30 }).map((_, i) => {
            const day = i + 1
            const isToday = day === 18
            return (
              <div
                key={i}
                className={cn(
                  "h-7 w-7 flex items-center justify-center rounded-full",
                  isToday ? "bg-yellow-300 text-black" : "hover:bg-gray-800",
                )}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium mb-2">My Calendars</h3>
              <ChevronRight className="h-4 w-4" />
            </div>
            <div className="space-y-2">
              {calendars.map((calendar, i) => (
                <label key={i} className="flex items-center gap-2">
                  <Checkbox defaultChecked={calendar.checked} />
                  <span className="text-sm">{calendar.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium mb-2">Favorites</h3>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              {categories.map((category, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${category.color}`} />
                  <span className="text-sm">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      <div className="mt-4 flex -space-x-2">
        {users.map((user, i) => (
          <Avatar key={i} className="border-2 border-gray-950">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
        ))}
      </div>
    </div>
  )
}

function WeekView({ days, events, onEventClick, selectedDay, setSelectedDay }: any) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex">
        <div className="w-16 flex-shrink-0" />
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          {days.map((day: any, dayIndex: number) => (
            <div
              key={dayIndex}
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
          {days.map((day: any, dayIndex: number) => (
            <div key={dayIndex} className="border-l relative">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="h-20 border-b border-gray-100" />
              ))}
              {events
                .filter((event: any) => event.day === day.date.getDate())
                .map((event: any) => (
                  <div
                    key={event.id}
                    className={`absolute left-1 right-1 p-2 rounded-lg ${event.color} cursor-pointer hover:opacity-90 transition-opacity`}
                    style={{
                      top: `${
                        (Number.parseInt(event.start.split(":")[0]) - 8) * 80 +
                        (Number.parseInt(event.start.split(":")[1]) / 60) * 80
                      }px`,
                      height: `${
                        (Number.parseInt(event.end.split(":")[0]) - Number.parseInt(event.start.split(":")[0])) * 80 +
                        ((Number.parseInt(event.end.split(":")[1]) - Number.parseInt(event.start.split(":")[1])) / 60) *
                          80
                      }px`,
                    }}
                    onClick={() => onEventClick(event)}
                  >
                    <div className="text-xs sm:text-sm font-medium truncate">{event.title}</div>
                    <div className="text-xs text-gray-500 hidden sm:block">
                      {event.start} - {event.end}
                    </div>
                    {event.participants.length > 0 && (
                      <div className="flex -space-x-2 mt-1 hidden sm:flex">
                        {event.participants.map((user: any, i: number) => (
                          <Avatar key={i} className="w-5 h-5 border-2 border-white">
                            <AvatarImage src={user.image} alt={user.name} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MonthView({ days, events, onEventClick }: any) {
  return (
    <div className="grid grid-cols-7 gap-1 p-4">
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
        <div key={i} className="text-center font-medium p-2">
          {day}
        </div>
      ))}
      {Array.from({ length: 35 }).map((_, i) => {
        const day = i + 1
        const dayEvents = events.filter((event: any) => event.day === day)
        return (
          <div key={i} className="border rounded-lg h-32 p-1 overflow-hidden">
            <div className="text-right text-sm text-gray-500 mb-1">{day}</div>
            <div className="space-y-1">
              {dayEvents.slice(0, 3).map((event: any) => (
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
          </div>
        )
      })}
    </div>
  )
}

function DayView({ day, events, onEventClick }: any) {
  if (!day) return null

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
          {events.map((event: any) => (
            <div
              key={event.id}
              className={`absolute left-2 right-2 p-3 rounded-lg ${event.color} cursor-pointer hover:opacity-90 transition-opacity`}
              style={{
                top: `${
                  (Number.parseInt(event.start.split(":")[0]) - 7) * 80 +
                  (Number.parseInt(event.start.split(":")[1]) / 60) * 80
                }px`,
                height: `${
                  (Number.parseInt(event.end.split(":")[0]) - Number.parseInt(event.start.split(":")[0])) * 80 +
                  ((Number.parseInt(event.end.split(":")[1]) - Number.parseInt(event.start.split(":")[1])) / 60) * 80
                }px`,
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
                  {event.participants.map((user: any, i: number) => (
                    <Avatar key={i} className="w-6 h-6 border-2 border-white">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function EventForm({ onSubmit, selectedDay }: any) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date(2023, 9, selectedDay))
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("10:00")
  const [category, setCategory] = useState("Work")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      title,
      description,
      date,
      startTime,
      endTime,
      category,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event description"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Work">Work</SelectItem>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Start Time</Label>
          <TimePicker value={startTime} onChange={setStartTime} />
        </div>

        <div className="space-y-2">
          <Label>End Time</Label>
          <TimePicker value={endTime} onChange={setEndTime} />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit">Create Event</Button>
      </div>
    </form>
  )
}

