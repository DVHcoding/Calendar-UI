"use client"

import type React from "react"

import { useState, useCallback, memo } from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { TimePickerProps } from "@/components/calendar/types"

function TimePickerComponent({ value, onChange, disabled = false }: TimePickerProps) {
  const [timeValue, setTimeValue] = useState(value)

  const handleTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTimeValue(e.target.value)
      onChange(e.target.value)
    },
    [onChange],
  )

  const handleTimeSelect = useCallback(
    (time: string) => {
      setTimeValue(time)
      onChange(time)
    },
    [onChange],
  )

  const commonTimes = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {timeValue || "Select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3">
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto">
              {commonTimes.map((time) => (
                <Button
                  key={time}
                  variant="ghost"
                  size="sm"
                  className={cn("w-full", timeValue === time && "bg-primary text-primary-foreground")}
                  onClick={() => handleTimeSelect(time)}
                  disabled={disabled}
                >
                  {time}
                </Button>
              ))}
            </div>
            <div className="flex items-center">
              <Input type="time" value={timeValue} onChange={handleTimeChange} className="flex-1" disabled={disabled} />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export const TimePicker = memo(TimePickerComponent)

