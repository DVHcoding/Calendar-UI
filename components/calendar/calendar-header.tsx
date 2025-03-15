"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"

interface CalendarHeaderProps {
  view: "month" | "week" | "day"
  setView: (view: "month" | "week" | "day") => void
  isMobile: boolean
  onMenuClick: () => void
}

export default function CalendarHeader({ view, setView, isMobile, onMenuClick }: CalendarHeaderProps) {
  return (
    <header className="p-4 flex items-center justify-between border-b">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
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
  )
}

