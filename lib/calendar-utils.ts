/**
 * Calculate the position and height of an event on the calendar grid
 * @param startTime Start time in format "HH:MM"
 * @param endTime End time in format "HH:MM"
 * @param startHour The hour that corresponds to the top of the calendar (e.g., 8 for 8:00 AM)
 * @returns Object with top position and height in pixels
 */
export function calculateEventPosition(
  startTime: string,
  endTime: string,
  startHour: number,
): { top: number; height: number } {
  // Parse times
  const [startHourStr, startMinuteStr] = startTime.split(":")
  const [endHourStr, endMinuteStr] = endTime.split(":")

  const startHourNum = Number.parseInt(startHourStr, 10)
  const startMinuteNum = Number.parseInt(startMinuteStr, 10)
  const endHourNum = Number.parseInt(endHourStr, 10)
  const endMinuteNum = Number.parseInt(endMinuteStr, 10)

  // Calculate position
  const hourHeight = 80 // Height of one hour in pixels

  // Calculate top position (distance from the top of the calendar)
  const hourOffset = startHourNum - startHour
  const minuteOffset = startMinuteNum / 60
  const top = (hourOffset + minuteOffset) * hourHeight

  // Calculate height (duration of the event)
  const durationHours = endHourNum - startHourNum
  const durationMinutes = (endMinuteNum - startMinuteNum) / 60
  const height = (durationHours + durationMinutes) * hourHeight

  return { top, height }
}

/**
 * Format a date to a string
 * @param date Date object
 * @param format Format string (e.g., "yyyy-MM-dd")
 * @returns Formatted date string
 */
export function formatDate(date: Date, format = "yyyy-MM-dd"): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return format.replace("yyyy", year.toString()).replace("MM", month).replace("dd", day)
}

/**
 * Parse a time string to minutes since midnight
 * @param time Time string in format "HH:MM"
 * @returns Minutes since midnight
 */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number)
  return hours * 60 + minutes
}

/**
 * Convert minutes since midnight to a time string
 * @param minutes Minutes since midnight
 * @returns Time string in format "HH:MM"
 */
export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`
}

/**
 * Check if two time ranges overlap
 * @param start1 Start time of first range in format "HH:MM"
 * @param end1 End time of first range in format "HH:MM"
 * @param start2 Start time of second range in format "HH:MM"
 * @param end2 End time of second range in format "HH:MM"
 * @returns True if the ranges overlap, false otherwise
 */
export function doTimesOverlap(start1: string, end1: string, start2: string, end2: string): boolean {
  const start1Minutes = timeToMinutes(start1)
  const end1Minutes = timeToMinutes(end1)
  const start2Minutes = timeToMinutes(start2)
  const end2Minutes = timeToMinutes(end2)

  return start1Minutes < end2Minutes && start2Minutes < end1Minutes
}

