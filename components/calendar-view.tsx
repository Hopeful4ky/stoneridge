"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CalendarEvent {
  id: number
  title: string
  time: string
  duration: string
  horse: string
  type: "training" | "lesson" | "veterinary" | "farrier" | "feeding" | "chiropractor" | "trial" | "show"
  instructor: string
  location: string
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  activity: string
  tack: string
}

interface CalendarViewProps {
  view: "month" | "week" | "day"
  selectedDate: Date
  onViewChange: (view: "month" | "week" | "day") => void
  onDateChange: (date: Date) => void
  language: string
}

const CalendarView = ({ view, selectedDate, onViewChange, onDateChange, language }: CalendarViewProps) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [selectedSession, setSelectedSession] = useState<CalendarEvent | null>(null)

  const translations = {
    en: {
      month: "Month",
      week: "Week",
      day: "Day",
      today: "Today",
      addEvent: "Add Event",
      todaysSchedule: "Today's Schedule",
      training: "Training",
      lesson: "Lesson",
      veterinary: "Vet Check",
      farrier: "Farrier",
      feeding: "Feeding",
      chiropractor: "Chiropractor",
      trial: "Horse Trial",
      show: "Horse Show",
      scheduled: "Scheduled",
      inProgress: "In Progress",
      completed: "Completed",
      cancelled: "Cancelled",
    },
    es: {
      month: "Mes",
      week: "Semana",
      day: "Día",
      today: "Hoy",
      addEvent: "Agregar",
      todaysSchedule: "Horario de Hoy",
      training: "Entrenamiento",
      lesson: "Lección",
      veterinary: "Veterinario",
      farrier: "Herrador",
      feeding: "Alimentación",
      chiropractor: "Quiropráctico",
      trial: "Prueba de Caballo",
      show: "Espectáculo",
      scheduled: "Programado",
      inProgress: "En Progreso",
      completed: "Completado",
      cancelled: "Cancelado",
    },
  }

  const t = translations[language as keyof typeof translations]

  // Enhanced daily schedule with specific horse activities
  const todaysSchedule: CalendarEvent[] = [
    {
      id: 1,
      title: "Morning Feeding",
      time: "06:00",
      duration: "30m",
      horse: "All Horses",
      type: "feeding",
      instructor: "Maria Garcia",
      location: "Barn",
      status: "completed",
      activity: "Feeding",
      tack: "N/A",
    },
    {
      id: 2,
      title: "Long Lining",
      time: "08:00",
      duration: "45m",
      horse: "Thunder Bay",
      type: "training",
      instructor: "John Smith",
      location: "Arena 1",
      status: "completed",
      activity: "Long Lining",
      tack: "Work Bridle, Surcingle",
    },
    {
      id: 3,
      title: "Turnout",
      time: "09:00",
      duration: "2h",
      horse: "Midnight Star",
      type: "training",
      instructor: "Maria Garcia",
      location: "Paddock 3",
      status: "in-progress",
      activity: "Turnout",
      tack: "Halter",
    },
    {
      id: 4,
      title: "Ride - Work Bridle",
      time: "10:00",
      duration: "1h",
      horse: "Golden Dawn",
      type: "training",
      instructor: "Sarah Johnson",
      location: "Arena 2",
      status: "scheduled",
      activity: "Ride - Work Bridle",
      tack: "Standard Snaffle, All Purpose Saddle, Splint Boots",
    },
    {
      id: 5,
      title: "Hand Walk",
      time: "11:00",
      duration: "30m",
      horse: "Silver Moon",
      type: "training",
      instructor: "Maria Garcia",
      location: "Barn Area",
      status: "scheduled",
      activity: "Hand Walk",
      tack: "Halter, Lead Rope",
    },
    {
      id: 6,
      title: "Beginner Lesson",
      time: "12:00",
      duration: "1h",
      horse: "Thunder Bay",
      type: "lesson",
      instructor: "Sarah Johnson",
      location: "Arena 2",
      status: "scheduled",
      activity: "Ride - Work Bridle",
      tack: "Standard Snaffle, All Purpose Saddle, Polo Wraps",
    },
    {
      id: 7,
      title: "Lunge Work",
      time: "13:00",
      duration: "30m",
      horse: "Midnight Star",
      type: "training",
      instructor: "John Smith",
      location: "Round Pen",
      status: "scheduled",
      activity: "Lunge",
      tack: "Lunge Line, Surcingle, Side Reins",
    },
    {
      id: 8,
      title: "Chiropractor Visit",
      time: "14:00",
      duration: "45m",
      horse: "Golden Dawn",
      type: "chiropractor",
      instructor: "Dr. Williams",
      location: "Stable",
      status: "scheduled",
      activity: "Treatment",
      tack: "N/A",
    },
    {
      id: 9,
      title: "Drive Training",
      time: "15:00",
      duration: "1h",
      horse: "Silver Moon",
      type: "training",
      instructor: "John Smith",
      location: "Driving Track",
      status: "scheduled",
      activity: "Drive",
      tack: "Driving Harness, Cart",
    },
    {
      id: 10,
      title: "Ride - Full Bridle",
      time: "16:00",
      duration: "1h",
      horse: "Thunder Bay",
      type: "training",
      instructor: "Sarah Johnson",
      location: "Arena 1",
      status: "scheduled",
      activity: "Ride - Full Bridle",
      tack: "Full Bridle - Weymouth, Saddle Seat Saddle, Bell Boots",
    },
    {
      id: 11,
      title: "Farrier Visit",
      time: "17:00",
      duration: "45m",
      horse: "Midnight Star",
      type: "farrier",
      instructor: "Mike Wilson",
      location: "Barn",
      status: "scheduled",
      activity: "Shoeing",
      tack: "N/A",
    },
    {
      id: 12,
      title: "Evening Feeding",
      time: "18:00",
      duration: "30m",
      horse: "All Horses",
      type: "feeding",
      instructor: "Maria Garcia",
      location: "Barn",
      status: "scheduled",
      activity: "Feeding",
      tack: "N/A",
    },
  ]

  const getEventColor = (type: string) => {
    switch (type) {
      case "training":
        return "bg-blue-500 border-blue-600"
      case "lesson":
        return "bg-green-500 border-green-600"
      case "veterinary":
        return "bg-red-500 border-red-600"
      case "farrier":
        return "bg-purple-500 border-purple-600"
      case "feeding":
        return "bg-orange-500 border-orange-600"
      case "chiropractor":
        return "bg-teal-500 border-teal-600"
      case "trial":
        return "bg-yellow-500 border-yellow-600"
      case "show":
        return "bg-pink-500 border-pink-600"
      default:
        return "bg-gray-500 border-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-900 border-blue-200"
      case "in-progress":
        return "bg-yellow-100 text-yellow-900 border-yellow-200"
      case "completed":
        return "bg-green-100 text-green-900 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-900 border-red-200"
      default:
        return "bg-gray-100 text-gray-900 border-gray-200"
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === "es" ? "es-ES" : "en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate)
    if (view === "month") {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
    } else {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
    }
    onDateChange(newDate)
  }

  const goToToday = () => {
    onDateChange(new Date())
  }

  const SessionDetailModal = ({ session, onClose }: { session: CalendarEvent; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-blue-900">{session.title}</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="font-medium">
                {session.time} ({session.duration})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <span>{session.instructor}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{session.location}</span>
            </div>

            <div className="border-t pt-3">
              <h3 className="font-semibold text-gray-900 mb-2">Activity Details</h3>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Horse:</strong> {session.horse}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Activity:</strong> {session.activity}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Tack:</strong> {session.tack}
              </p>
            </div>

            <div className="border-t pt-3">
              <Badge className={`${getStatusColor(session.status)}`} variant="outline">
                {t[session.status as keyof typeof t] || session.status}
              </Badge>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={onClose} className="flex-1 bg-red-900 hover:bg-red-800 text-white">
              Close
            </Button>
            <Button variant="outline" className="flex-1">
              Edit Session
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <Card className="shadow-lg border-l-4 border-l-blue-900">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-bold text-blue-900">Calendar</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateDate("prev")} className="hover:bg-blue-50">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={goToToday} className="hover:bg-blue-50">
                  {t.today}
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateDate("next")} className="hover:bg-blue-50">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={view} onValueChange={onViewChange}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">{t.month}</SelectItem>
                  <SelectItem value="week">{t.week}</SelectItem>
                  <SelectItem value="day">{t.day}</SelectItem>
                </SelectContent>
              </Select>
              <Button
                size="sm"
                className="bg-red-900 hover:bg-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-1" />
                {t.addEvent}
              </Button>
            </div>
          </div>
          <p className="text-lg font-semibold text-gray-700">{formatDate(selectedDate)}</p>
        </CardHeader>
      </Card>

      {/* Today's Schedule */}
      <Card className="shadow-lg border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-blue-900">{t.todaysSchedule}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todaysSchedule.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedSession(event)}
              className={`p-4 rounded-xl border-l-4 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.02] ${getEventColor(event.type)} bg-white`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-gray-900">{event.title}</h3>
                    <Badge className={`text-xs ${getStatusColor(event.status)}`} variant="outline">
                      {t[event.status as keyof typeof t] || event.status}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">
                        {event.time} ({event.duration})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>
                        {event.horse} • {event.instructor}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                <Badge className={`${getEventColor(event.type)} text-white font-semibold`}>
                  {t[event.type as keyof typeof t]}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Event Types Legend */}
      <Card className="shadow-lg border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold text-blue-900">Event Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {[
              { type: "training", label: t.training },
              { type: "lesson", label: t.lesson },
              { type: "veterinary", label: t.veterinary },
              { type: "farrier", label: t.farrier },
              { type: "feeding", label: t.feeding },
              { type: "chiropractor", label: t.chiropractor },
              { type: "trial", label: t.trial },
              { type: "show", label: t.show },
            ].map((item) => (
              <div key={item.type} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${getEventColor(item.type)}`}></div>
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {selectedSession && <SessionDetailModal session={selectedSession} onClose={() => setSelectedSession(null)} />}
    </div>
  )
}

export default CalendarView
