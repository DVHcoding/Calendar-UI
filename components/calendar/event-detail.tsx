"use client"

import { useState, memo } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, Users, Edit, Loader2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EventForm from "./event-form"
import type { EventDetailProps } from "./types"

function EventDetail({ event, onClose, onDelete, onUpdate, isLoading = false }: EventDetailProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleUpdate = (updatedEvent: any) => {
    const updated = {
      ...event,
      title: updatedEvent.title,
      description: updatedEvent.description,
      start: updatedEvent.startTime,
      end: updatedEvent.endTime,
      day: updatedEvent.date?.getDate() || event.day,
      color:
        updatedEvent.category === "Work"
          ? "bg-blue-100"
          : updatedEvent.category === "Personal"
            ? "bg-green-100"
            : "bg-purple-100",
    }
    onUpdate(updated)
    setIsEditing(false)
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>

        {isEditing ? (
          <EventForm onSubmit={handleUpdate} selectedDay={event.day} event={event} isLoading={isLoading} />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>
                {event.start} - {event.end}
              </span>
            </div>
            {event.participants.length > 0 && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <div className="flex -space-x-2">
                  {event.participants.map((user, i) => (
                    <Avatar key={i} className="w-6 h-6 border-2 border-white">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            )}
            <p className="text-gray-700">{event.description}</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditing(true)} disabled={isLoading}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" onClick={onClose} disabled={isLoading}>
                Close
              </Button>
              <Button variant="destructive" onClick={() => onDelete(event.id)} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default memo(EventDetail)

