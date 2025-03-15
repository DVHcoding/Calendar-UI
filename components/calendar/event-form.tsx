"use client"

import type React from "react"

import { useState, useEffect, memo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { TimePicker } from "../time-picker"
import type { EventFormProps } from "./types"

function EventForm({ onSubmit, selectedDay, event, isLoading = false }: EventFormProps) {
  const [title, setTitle] = useState(event?.title || "")
  const [description, setDescription] = useState(event?.description || "")
  const [date, setDate] = useState<Date | undefined>(
    event?.day ? new Date(2023, 9, event.day) : new Date(2023, 9, selectedDay),
  )
  const [startTime, setStartTime] = useState(event?.start || "09:00")
  const [endTime, setEndTime] = useState(event?.end || "10:00")
  const [category, setCategory] = useState(
    event?.color === "bg-blue-100" ? "Work" : event?.color === "bg-green-100" ? "Personal" : "Education",
  )
  const [formErrors, setFormErrors] = useState<{
    title?: string
    time?: string
  }>({})

  // Reset form when event changes
  useEffect(() => {
    if (event) {
      setTitle(event.title)
      setDescription(event.description)
      setDate(new Date(2023, 9, event.day))
      setStartTime(event.start)
      setEndTime(event.end)
      setCategory(event.color === "bg-blue-100" ? "Work" : event.color === "bg-green-100" ? "Personal" : "Education")
    }
  }, [event])

  const validateForm = () => {
    const errors: {
      title?: string
      time?: string
    } = {}

    if (!title.trim()) {
      errors.title = "Title is required"
    }

    // Validate that end time is after start time
    const [startHour, startMinute] = startTime.split(":").map(Number)
    const [endHour, endMinute] = endTime.split(":").map(Number)

    if (endHour < startHour || (endHour === startHour && endMinute <= startMinute)) {
      errors.time = "End time must be after start time"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onSubmit({
      id: event?.id,
      title,
      description,
      date,
      startTime: startTime,
      endTime: endTime,
      category,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
          required
          disabled={isLoading}
          aria-invalid={!!formErrors.title}
        />
        {formErrors.title && <p className="text-sm text-red-500">{formErrors.title}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event description"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal" disabled={isLoading}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus disabled={isLoading} />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory} disabled={isLoading}>
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
          <TimePicker value={startTime} onChange={setStartTime} disabled={isLoading} />
        </div>

        <div className="space-y-2">
          <Label>End Time</Label>
          <TimePicker value={endTime} onChange={setEndTime} disabled={isLoading} />
          {formErrors.time && <p className="text-sm text-red-500">{formErrors.time}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {event ? "Updating..." : "Creating..."}
            </>
          ) : event ? (
            "Update Event"
          ) : (
            "Create Event"
          )}
        </Button>
      </div>
    </form>
  )
}

export default memo(EventForm)

