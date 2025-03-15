export interface User {
  name: string
  image: string
}

export interface CalendarEvent {
  id: number
  title: string
  start: string
  end: string
  day: number
  participants: User[]
  color: string
  description: string
}

export interface Day {
  name: string
  number: string
  date: Date
}

export interface Category {
  name: string
  color: string
}

export interface Calendar {
  name: string
  checked: boolean
}

export interface EventFormData {
  title?: string
  description?: string
  date?: Date
  startTime?: string
  endTime?: string
  category?: string
}

export interface TimePickerProps {
  value: string
  onChange: (time: string) => void
  disabled?: boolean
}

export interface WeekViewProps {
  days: Day[]
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
  selectedDay: number
  setSelectedDay: (day: number) => void
}

export interface MonthViewProps {
  days: Day[]
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
}

export interface DayViewProps {
  day: Day
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
}

export interface EventFormProps {
  onSubmit: (event: EventFormData) => void
  selectedDay: number
  event?: CalendarEvent
  isLoading?: boolean
}

export interface EventDetailProps {
  event: CalendarEvent
  onClose: () => void
  onDelete: (id: number) => void
  onUpdate: (event: CalendarEvent) => void
  isLoading?: boolean
}

export interface CalendarHeaderProps {
  view: "month" | "week" | "day"
  setView: (view: "month" | "week" | "day") => void
  isMobile: boolean
  onMenuClick: () => void
  toggleSidebar: () => void
  sidebarExpanded: boolean
}

export interface CalendarSidebarProps {
  onDaySelect: (day: number) => void
}

export interface MiniCalendarProps {
  onDaySelect?: (day: number) => void
}

export interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

