import { memo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, X, ChevronDown } from "lucide-react"
import { calendars, categories, users } from "./calendar-data"
import MiniCalendar from "./mini-calendar"
import type { CalendarSidebarProps } from "./types"

function CalendarSidebar({ onDaySelect }: CalendarSidebarProps) {
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

      <MiniCalendar onDaySelect={onDaySelect} />

      <ScrollArea className="flex-1">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium mb-2">My Calendars</h3>
              <ChevronDown className="h-4 w-4" />
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
              <ChevronDown className="h-4 w-4" />
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

export default memo(CalendarSidebar)

