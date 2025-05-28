"use client"

import { useState } from "react"
import {
  Calendar,
  Users,
  ClipboardList,
  MessageSquare,
  Upload,
  Settings,
  Menu,
  Bell,
  Plus,
  Home,
  ChevronRight,
  Clock,
  AlertCircle,
  User,
  Eye,
  EyeOff,
  Loader2,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import CalendarView from "@/components/calendar-view"
import HorseDetail from "@/components/horse-detail"

export default function StoneRidgeApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [language, setLanguage] = useState("en")
  const [roleFilter, setRoleFilter] = useState("all")
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Set to true to show main app
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [selectedHorse, setSelectedHorse] = useState(null)
  const [calendarView, setCalendarView] = useState("day") // Changed default to day view
  const [selectedDate, setSelectedDate] = useState(new Date())

  const translations = {
    en: {
      // Login Screen
      login: "Log In",
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot password?",
      english: "English",
      spanish: "Español",
      // Navigation
      dashboard: "Dashboard",
      horses: "Horses",
      schedule: "Calendar",
      tasks: "Tasks",
      messages: "Messages",
      uploads: "Files",
      settings: "Settings",
      profile: "Profile",
      // Content
      welcome: "StoneRidge Saddlebreds",
      todaysOverview: "Today's Overview",
      activeTasks: "Active Tasks",
      recentMessages: "Recent Messages",
      horseCount: "Total Horses",
      pendingTasks: "Pending Tasks",
      unreadMessages: "Unread",
      viewAll: "View All",
      addNew: "Add New",
      priority: "Priority",
      dueToday: "Due Today",
      overdue: "Overdue",
      // Roles
      trainer: "Trainer",
      instructor: "Instructor",
      groom: "Groom",
      allRoles: "All Roles",
      // Activities
      training: "Training",
      lessons: "Lessons",
      veterinary: "Vet",
      farrier: "Farrier",
    },
    es: {
      // Login Screen
      login: "Iniciar Sesión",
      email: "Correo Electrónico",
      password: "Contraseña",
      forgotPassword: "¿Olvidaste tu contraseña?",
      english: "English",
      spanish: "Español",
      // Navigation
      dashboard: "Inicio",
      horses: "Caballos",
      schedule: "Calendario",
      tasks: "Tareas",
      messages: "Mensajes",
      uploads: "Archivos",
      settings: "Config",
      profile: "Perfil",
      // Content
      welcome: "StoneRidge Saddlebreds",
      todaysOverview: "Resumen de Hoy",
      activeTasks: "Tareas Activas",
      recentMessages: "Mensajes Recientes",
      horseCount: "Total Caballos",
      pendingTasks: "Pendientes",
      unreadMessages: "No Leídos",
      viewAll: "Ver Todo",
      addNew: "Agregar",
      priority: "Prioridad",
      dueToday: "Vence Hoy",
      overdue: "Vencido",
      // Roles
      trainer: "Entrenador",
      instructor: "Instructor",
      groom: "Cuidador",
      allRoles: "Todos los Roles",
      // Activities
      training: "Entrenamiento",
      lessons: "Lecciones",
      veterinary: "Veterinario",
      farrier: "Herrador",
    },
  }

  const t = translations[language as keyof typeof translations]

  const mainTabs = [
    { id: "dashboard", icon: Home, label: t.dashboard },
    { id: "horses", icon: Users, label: t.horses },
    { id: "schedule", icon: Calendar, label: t.schedule },
    { id: "tasks", icon: ClipboardList, label: t.tasks },
    { id: "messages", icon: MessageSquare, label: t.messages },
  ]

  const horses = [
    {
      id: 1,
      name: "Thunder Bay",
      breed: "Saddlebred",
      dateOfBirth: "March 15, 2016",
      statusColor: "bg-blue-500",
    },
    {
      id: 2,
      name: "Midnight Star",
      breed: "Saddlebred",
      dateOfBirth: "June 22, 2018",
      statusColor: "bg-red-500",
    },
    {
      id: 3,
      name: "Golden Dawn",
      breed: "Saddlebred",
      dateOfBirth: "April 8, 2014",
      statusColor: "bg-yellow-500",
    },
    {
      id: 4,
      name: "Silver Moon",
      breed: "Saddlebred",
      dateOfBirth: "September 12, 2019",
      statusColor: "bg-blue-500",
    },
  ]

  const todaySchedule = [
    {
      time: "06:00",
      activity: "Morning Feed",
      horse: "All Horses",
      assigned: "Maria",
      status: "completed",
      type: "training",
      role: "groom",
    },
    {
      time: "08:00",
      activity: "Training Session",
      horse: "Thunder Bay",
      assigned: "John",
      status: "current",
      type: "training",
      role: "trainer",
    },
    {
      time: "10:00",
      activity: "Lesson - Beginner",
      horse: "Midnight Star",
      assigned: "Sarah",
      status: "upcoming",
      type: "lessons",
      role: "instructor",
    },
    {
      time: "14:00",
      activity: "Vet Check",
      horse: "Golden Dawn",
      assigned: "Dr. Smith",
      status: "upcoming",
      type: "veterinary",
      role: "veterinary",
    },
    {
      time: "16:00",
      activity: "Farrier Visit",
      horse: "Silver Moon",
      assigned: "Mike",
      status: "upcoming",
      type: "farrier",
      role: "farrier",
    },
    {
      time: "18:00",
      activity: "Evening Feed",
      horse: "All Horses",
      assigned: "Maria",
      status: "upcoming",
      type: "training",
      role: "groom",
    },
  ]

  const tasks = [
    {
      id: 1,
      title: "Clean stalls",
      priority: "High",
      assignee: "Maria",
      dueDate: "Today",
      completed: false,
      overdue: false,
      role: "groom",
    },
    {
      id: 2,
      title: "Update medical records",
      priority: "Medium",
      assignee: "Sarah",
      dueDate: "Tomorrow",
      completed: false,
      overdue: false,
      role: "instructor",
    },
    {
      id: 3,
      title: "Order feed supplies",
      priority: "High",
      assignee: "John",
      dueDate: "Yesterday",
      completed: false,
      overdue: true,
      role: "trainer",
    },
    {
      id: 4,
      title: "Repair fence gate",
      priority: "Low",
      assignee: "Mike",
      dueDate: "This week",
      completed: false,
      overdue: false,
      role: "groom",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Dr. Smith",
      message: "Golden Dawn's recovery is progressing well. Continue current treatment.",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: 2,
      sender: "Maria",
      message: "Feed delivery scheduled for tomorrow morning at 8 AM",
      time: "09:15 AM",
      unread: false,
    },
    {
      id: 3,
      sender: "John",
      message: "Thunder Bay ready for competition prep. Excellent progress this week.",
      time: "08:45 AM",
      unread: true,
    },
    {
      id: 4,
      sender: "Sarah",
      message: "Grooming supplies running low. Need to reorder brushes.",
      time: "Yesterday",
      unread: false,
    },
  ]

  const getFilteredSchedule = () => {
    if (roleFilter === "all") return todaySchedule
    return todaySchedule.filter((item) => item.role === roleFilter)
  }

  const getFilteredTasks = () => {
    if (roleFilter === "all") return tasks
    return tasks.filter((task) => task.role === roleFilter)
  }

  const handleLogin = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setIsLoggedIn(true)
  }

  const LoginScreen = () => (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/stoneridge-logo.jpeg"
            alt="StoneRidge Logo"
            width={200}
            height={200}
            className="rounded-lg"
            priority
          />
        </div>

        {/* Brand Name */}
        <h1
          className="text-5xl font-black text-blue-900 mb-1 tracking-wider text-center"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: "0.05em" }}
        >
          STONE RIDGE
        </h1>
        <h2
          className="text-5xl font-black text-blue-900 mb-8 tracking-wider text-center"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif", letterSpacing: "0.05em" }}
        >
          SADDLEBREDS
        </h2>

        {/* Form */}
        <div className="w-full space-y-4">
          {/* Email Field */}
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              placeholder={t.email}
              className={`w-full px-4 py-4 bg-white border-2 rounded-2xl text-lg font-medium placeholder:text-slate-400 transition-all duration-300 ${
                emailFocused
                  ? "border-blue-900 shadow-lg shadow-blue-900/10 scale-[1.02]"
                  : "border-slate-200 hover:border-slate-300"
              } focus:outline-none`}
            />
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-900/5 to-red-900/5 pointer-events-none transition-opacity duration-300 ${
                emailFocused ? "opacity-100" : "opacity-0"
              }`}
            ></div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              placeholder={t.password}
              className={`w-full px-4 py-4 pr-12 bg-white border-2 rounded-2xl text-lg font-medium placeholder:text-slate-400 transition-all duration-300 ${
                passwordFocused
                  ? "border-blue-900 shadow-lg shadow-blue-900/10 scale-[1.02]"
                  : "border-slate-200 hover:border-slate-300"
              } focus:outline-none`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-200 p-1"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-900/5 to-red-900/5 pointer-events-none transition-opacity duration-300 ${
                passwordFocused ? "opacity-100" : "opacity-0"
              }`}
            ></div>
          </div>

          {/* Language Toggle */}
          <div className="flex justify-center items-center py-2">
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 text-lg font-medium transition-colors duration-200 ${
                language === "en" ? "text-blue-900 font-semibold" : "text-slate-500"
              }`}
            >
              {t.english}
            </button>
            <div className="mx-2 text-slate-300">|</div>
            <button
              onClick={() => setLanguage("es")}
              className={`px-4 py-2 text-lg font-medium transition-colors duration-200 ${
                language === "es" ? "text-blue-900 font-semibold" : "text-slate-500"
              }`}
            >
              {t.spanish}
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading || !email || !password}
            className={`w-full py-4 px-6 bg-gradient-to-r from-red-900 to-red-800 text-white text-lg font-bold rounded-2xl shadow-lg transition-all duration-300 ${
              isLoading || !email || !password
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-red-800 hover:to-red-700 hover:shadow-xl hover:shadow-red-900/25 active:scale-[0.98] hover:scale-[1.02]"
            } focus:outline-none focus:ring-4 focus:ring-red-900/20`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing In...</span>
              </div>
            ) : (
              t.login
            )}
          </button>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <button className="text-blue-900 hover:text-blue-700 text-lg font-medium transition-colors duration-200">
              {t.forgotPassword}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const DashboardContent = () => (
    <div className="space-y-4 pb-20">
      {/* Role Filter */}
      <Card className="p-4 shadow-lg border-l-4 border-l-blue-900">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-blue-900">Filter by Role</h3>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-40 border-2 border-slate-200 hover:border-blue-900 transition-colors duration-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allRoles}</SelectItem>
              <SelectItem value="trainer">{t.trainer}</SelectItem>
              <SelectItem value="instructor">{t.instructor}</SelectItem>
              <SelectItem value="groom">{t.groom}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-black text-blue-900">{horses.length}</p>
              <p className="text-sm text-gray-600 font-semibold">{t.horseCount}</p>
            </div>
            <Users className="h-10 w-10 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border-l-4 border-l-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-black text-red-900">
                {getFilteredTasks().filter((t) => !t.completed).length}
              </p>
              <p className="text-sm text-gray-600 font-semibold">{t.pendingTasks}</p>
            </div>
            <ClipboardList className="h-10 w-10 text-red-900" />
          </div>
        </Card>
      </div>

      {/* Today's Overview */}
      <Card className="shadow-lg border-l-4 border-l-green-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-blue-900">{t.todaysOverview}</CardTitle>
            <Clock className="h-6 w-6 text-green-500" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {getFilteredSchedule()
            .slice(0, 3)
            .map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-4 rounded-xl border-l-4 transition-all duration-300 hover:scale-[1.02] ${
                  item.status === "current"
                    ? "bg-red-50 border-red-900 shadow-md"
                    : item.status === "completed"
                      ? "bg-green-50 border-green-500 shadow-md"
                      : "bg-blue-50 border-blue-300 shadow-sm"
                }`}
              >
                <div className="flex-1">
                  <p className={`font-bold text-lg ${item.status === "current" ? "text-red-900" : "text-gray-900"}`}>
                    {item.activity}
                  </p>
                  <p className={`text-sm font-medium ${item.status === "current" ? "text-red-700" : "text-gray-600"}`}>
                    {item.horse} • {item.assigned}
                  </p>
                </div>
                <Badge
                  className={`font-bold ${item.status === "current" ? "bg-red-900 text-white" : "bg-gray-500 text-white"} shadow-sm`}
                >
                  {item.time}
                </Badge>
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Urgent Tasks */}
      <Card className="shadow-lg border-l-4 border-l-orange-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-blue-900">Urgent Tasks</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("tasks")}
              className="hover:bg-blue-50 hover:text-blue-900 transition-all duration-200"
            >
              {t.viewAll}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {getFilteredTasks()
            .filter((task) => !task.completed && (task.priority === "High" || task.overdue))
            .slice(0, 3)
            .map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border-l-4 border-l-orange-500 hover:shadow-md transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-lg text-gray-900">{task.title}</p>
                    {task.overdue && <AlertCircle className="h-5 w-5 text-red-500 animate-pulse" />}
                  </div>
                  <p className="text-sm text-gray-600 font-medium">
                    {task.assignee} • {task.dueDate}
                  </p>
                </div>
                <Badge
                  className={`font-bold shadow-sm ${
                    task.overdue
                      ? "bg-red-900 text-white hover:bg-red-800"
                      : "bg-orange-900 text-white hover:bg-orange-800"
                  }`}
                >
                  {task.overdue ? t.overdue : task.priority}
                </Badge>
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Recent Messages */}
      <Card className="shadow-lg border-l-4 border-l-purple-500">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-blue-900">{t.recentMessages}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("messages")}
              className="hover:bg-blue-50 hover:text-blue-900 transition-all duration-200"
            >
              {t.viewAll}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {messages.slice(0, 3).map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                message.unread ? "bg-red-50 border-l-4 border-l-red-900" : "bg-purple-50 border-l-4 border-l-purple-300"
              }`}
            >
              <Avatar className="w-12 h-12 shadow-md">
                <AvatarFallback className="text-xs bg-purple-100 text-purple-900 font-bold">
                  {message.sender
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-bold text-sm text-slate-900">{message.sender}</p>
                  <span className="text-xs text-gray-500 font-medium">{message.time}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{message.message}</p>
              </div>
              {message.unread && <div className="w-3 h-3 bg-red-900 rounded-full mt-2 animate-pulse"></div>}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const ScheduleContent = () => (
    <CalendarView
      view={calendarView}
      selectedDate={selectedDate}
      onViewChange={setCalendarView}
      onDateChange={setSelectedDate}
      language={language}
    />
  )

  const HorsesContent = () => {
    if (selectedHorse) {
      return <HorseDetail horse={selectedHorse} onBack={() => setSelectedHorse(null)} language={language} />
    }

    return (
      <div className="space-y-4 pb-20">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-900">Horse Profiles</h2>
          <Button
            size="sm"
            className="bg-red-900 hover:bg-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Horse
          </Button>
        </div>

        <div className="space-y-3">
          {horses.map((horse) => (
            <Card
              key={horse.id}
              onClick={() => setSelectedHorse(horse)}
              className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-900"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${horse.statusColor} shadow-sm`}></div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{horse.name}</h3>
                    <p className="text-sm text-slate-600 font-medium">
                      {horse.breed} • {horse.dateOfBirth}
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  const TasksContent = () => {
    const [completedTasks, setCompletedTasks] = useState([])
    const [showCompletedTasks, setShowCompletedTasks] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [showNewTaskModal, setShowNewTaskModal] = useState(false)

    // Generate automatic tasks from calendar events
    const calendarTasks = [
      {
        id: 101,
        title: "Train Thunder Bay - Long Lining",
        priority: "High",
        assignee: "John Smith",
        dueDate: "Today, 8:00 AM",
        completed: false,
        overdue: false,
        role: "trainer",
        type: "training",
        horse: "Thunder Bay",
        location: "Arena 1",
        duration: "45m",
        tack: "Work Bridle, Surcingle, Long Lines",
        notes: "Focus on transitions and responsiveness to voice commands",
      },
      {
        id: 102,
        title: "Turnout Midnight Star",
        priority: "Medium",
        assignee: "Maria Garcia",
        dueDate: "Today, 9:00 AM",
        completed: false,
        overdue: false,
        role: "groom",
        type: "care",
        horse: "Midnight Star",
        location: "Paddock 3",
        duration: "2h",
        tack: "Halter, Lead Rope",
        notes: "Check water levels in paddock",
      },
      {
        id: 103,
        title: "Ride Golden Dawn - Work Bridle",
        priority: "High",
        assignee: "Sarah Johnson",
        dueDate: "Today, 10:00 AM",
        completed: false,
        overdue: false,
        role: "instructor",
        type: "training",
        horse: "Golden Dawn",
        location: "Arena 2",
        duration: "1h",
        tack: "Standard Snaffle, All Purpose Saddle, Splint Boots",
        notes: "Work on collection and lateral movements",
      },
      {
        id: 104,
        title: "Hand Walk Silver Moon",
        priority: "Medium",
        assignee: "Maria Garcia",
        dueDate: "Today, 11:00 AM",
        completed: false,
        overdue: false,
        role: "groom",
        type: "care",
        horse: "Silver Moon",
        location: "Barn Area",
        duration: "30m",
        tack: "Halter, Lead Rope",
        notes: "Light exercise after yesterday's training session",
      },
      {
        id: 105,
        title: "Beginner Lesson with Thunder Bay",
        priority: "High",
        assignee: "Sarah Johnson",
        dueDate: "Today, 12:00 PM",
        completed: false,
        overdue: false,
        role: "instructor",
        type: "lesson",
        horse: "Thunder Bay",
        location: "Arena 2",
        duration: "1h",
        tack: "Standard Snaffle, All Purpose Saddle, Polo Wraps",
        notes: "Student: Emma - Focus on posting trot",
      },
    ]

    // Enhanced tasks with more details
    const enhancedTasks = tasks.map((task) => ({
      ...task,
      location: "Barn",
      duration: "Varies",
      tack: "N/A",
      notes: "General barn maintenance task",
    }))

    // Combine manual tasks with calendar-generated tasks
    const allTasks = [...enhancedTasks, ...calendarTasks]

    // Filter tasks based on role
    const getFilteredAllTasks = () => {
      if (roleFilter === "all") return allTasks.filter((task) => !task.completed)
      return allTasks.filter((task) => task.role === roleFilter && !task.completed)
    }

    const getFilteredCompletedTasks = () => {
      if (roleFilter === "all") return completedTasks
      return completedTasks.filter((task) => task.role === roleFilter)
    }

    const handleMarkDone = (taskId) => {
      const taskToComplete = allTasks.find((task) => task.id === taskId)
      if (taskToComplete) {
        const completedTask = {
          ...taskToComplete,
          completed: true,
          completedAt: new Date().toLocaleTimeString(),
        }
        setCompletedTasks((prev) => [completedTask, ...prev])

        // Remove from active tasks (this would normally update the backend)
        // For demo purposes, we'll just mark it as completed
        taskToComplete.completed = true
      }
    }

    const handleUndoComplete = (taskId) => {
      const taskToRestore = completedTasks.find((task) => task.id === taskId)
      if (taskToRestore) {
        // Remove from completed tasks
        setCompletedTasks((prev) => prev.filter((task) => task.id !== taskId))

        // Restore to active tasks
        const originalTask = allTasks.find((task) => task.id === taskId)
        if (originalTask) {
          originalTask.completed = false
        }
      }
    }

    const TaskDetailModal = ({ task, onClose }) => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-blue-900">{task.title}</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="font-medium">Assigned to: {task.assignee}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span>Due: {task.dueDate}</span>
              </div>

              {task.horse && task.horse !== "All Horses" && (
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <span>Horse: {task.horse}</span>
                </div>
              )}

              {task.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span>Location: {task.location}</span>
                </div>
              )}

              {task.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>Duration: {task.duration}</span>
                </div>
              )}

              {task.tack && task.tack !== "N/A" && (
                <div className="border-t pt-3">
                  <h3 className="font-semibold text-gray-900 mb-2">Required Tack</h3>
                  <p className="text-sm text-gray-600">{task.tack}</p>
                </div>
              )}

              {task.notes && (
                <div className="border-t pt-3">
                  <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                  <p className="text-sm text-gray-600">{task.notes}</p>
                </div>
              )}

              <div className="border-t pt-3">
                <Badge
                  className={`${
                    task.overdue
                      ? "bg-red-100 text-red-900 border-red-200"
                      : task.priority === "High"
                        ? "bg-orange-100 text-orange-900 border-orange-200"
                        : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-900 border-yellow-200"
                          : "bg-green-100 text-green-900 border-green-200"
                  }`}
                  variant="outline"
                >
                  {task.overdue ? "Overdue" : `${task.priority} Priority`}
                </Badge>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={onClose} className="flex-1 bg-red-900 hover:bg-red-800 text-white">
                Close
              </Button>
              <Button variant="outline" className="flex-1">
                Edit Task
              </Button>
            </div>
          </div>
        </div>
      </div>
    )

    const NewTaskModal = ({ onClose }) => {
      const [selectedAssignee, setSelectedAssignee] = useState("")
      const [selectedTaskType, setSelectedTaskType] = useState("")
      const [customTask, setCustomTask] = useState("")
      const [priority, setPriority] = useState("Medium")
      const [dueDate, setDueDate] = useState("Today")

      // Current user role (Joey is admin, so can assign to anyone)
      const currentUserRole = "admin" // This would come from auth context

      const availableAssignees =
        currentUserRole === "admin"
          ? [
              { name: "Maria Garcia", role: "groom" },
              { name: "John Smith", role: "trainer" },
              { name: "Sarah Johnson", role: "instructor" },
              { name: "Mike Wilson", role: "farrier" },
            ]
          : [{ name: "Maria Garcia", role: "groom" }] // Trainers/Instructors can only assign to grooms

      const preGeneratedTasks = [
        "Clean Tack",
        "Cobweb Stalls",
        "Clean Washrack",
        "Repair Fence",
        "Rake Isleway",
        "Fill Water Buckets",
        "Sweep Barn Aisle",
        "Check Feed Supplies",
        "Organize Tack Room",
        "Clean Grooming Tools",
      ]

      const handleAddTask = () => {
        const taskTitle = selectedTaskType === "custom" ? customTask : selectedTaskType
        if (!selectedAssignee || !taskTitle) return

        const newTask = {
          id: Date.now(),
          title: taskTitle,
          priority: priority,
          assignee: selectedAssignee,
          dueDate: dueDate,
          completed: false,
          overdue: false,
          role: availableAssignees.find((a) => a.name === selectedAssignee)?.role || "groom",
          type: "manual",
          location: "Barn",
          duration: "Varies",
          tack: "N/A",
          notes: "Manually assigned task",
        }

        // Add to tasks (in real app, this would be an API call)
        tasks.push(newTask)
        onClose()
      }

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-blue-900">New Task</h2>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  ✕
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
                  <select
                    value={selectedAssignee}
                    onChange={(e) => setSelectedAssignee(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select person...</option>
                    {availableAssignees.map((person) => (
                      <option key={person.name} value={person.name}>
                        {person.name} ({person.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Task Type</label>
                  <select
                    value={selectedTaskType}
                    onChange={(e) => setSelectedTaskType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select task...</option>
                    {preGeneratedTasks.map((task) => (
                      <option key={task} value={task}>
                        {task}
                      </option>
                    ))}
                    <option value="custom">Custom Task</option>
                  </select>
                </div>

                {selectedTaskType === "custom" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Custom Task</label>
                    <input
                      type="text"
                      value={customTask}
                      onChange={(e) => setCustomTask(e.target.value)}
                      placeholder="Enter custom task..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <select
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Today">Today</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Week">This Week</option>
                    <option value="Next Week">Next Week</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleAddTask}
                  disabled={!selectedAssignee || !selectedTaskType || (selectedTaskType === "custom" && !customTask)}
                  className="flex-1 bg-red-900 hover:bg-red-800 text-white"
                >
                  Add Task
                </Button>
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-4 pb-20">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-900">Task Management</h2>
          <Button
            size="sm"
            onClick={() => setShowNewTaskModal(true)}
            className="bg-red-900 hover:bg-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-1" />
            New Task
          </Button>
        </div>

        {/* Calendar Tasks Section */}
        <Card className="shadow-lg border-l-4 border-l-blue-900">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-blue-900">Today's Schedule Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {calendarTasks
              .filter((task) => (roleFilter === "all" || task.role === roleFilter) && !task.completed)
              .map((task) => (
                <Card
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={`p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer border-l-4 ${
                    task.type === "training"
                      ? "border-l-blue-500 bg-blue-50/50"
                      : task.type === "lesson"
                        ? "border-l-green-500 bg-green-50/50"
                        : "border-l-purple-500 bg-purple-50/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-slate-900">{task.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <User className="h-4 w-4 text-slate-500" />
                        <p className="text-sm text-slate-600 font-medium">{task.assignee}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={`font-semibold ${
                            task.type === "training"
                              ? "bg-blue-100 text-blue-900 border-blue-200"
                              : task.type === "lesson"
                                ? "bg-green-100 text-green-900 border-green-200"
                                : "bg-purple-100 text-purple-900 border-purple-200"
                          }`}
                          variant="outline"
                        >
                          {task.horse}
                        </Badge>
                        <span className="text-sm text-slate-500 font-medium">{task.dueDate}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMarkDone(task.id)
                      }}
                      className="hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all duration-200"
                    >
                      Mark Done
                    </Button>
                  </div>
                </Card>
              ))}
          </CardContent>
        </Card>

        {/* Regular Tasks Section */}
        <Card className="shadow-lg border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-blue-900">General Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {enhancedTasks
              .filter((task) => (roleFilter === "all" || task.role === roleFilter) && !task.completed)
              .map((task) => (
                <Card
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={`p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer border-l-4 ${
                    task.overdue
                      ? "border-l-red-500 bg-red-50/50"
                      : task.priority === "High"
                        ? "border-l-orange-500 bg-orange-50/50"
                        : "border-l-blue-500 bg-blue-50/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-slate-900">{task.title}</h3>
                        {task.overdue && <AlertCircle className="h-5 w-5 text-red-500 animate-pulse" />}
                      </div>
                      <p className="text-sm text-slate-600 mb-3 font-medium">Assigned to {task.assignee}</p>
                      <div className="flex items-center gap-3">
                        <Badge
                          className={`font-semibold ${
                            task.overdue
                              ? "bg-red-100 text-red-900 border-red-200"
                              : task.priority === "High"
                                ? "bg-orange-100 text-orange-900 border-orange-200"
                                : task.priority === "Medium"
                                  ? "bg-yellow-100 text-yellow-900 border-yellow-200"
                                  : "bg-green-100 text-green-900 border-green-200"
                          }`}
                          variant="outline"
                        >
                          {task.overdue ? t.overdue : task.priority}
                        </Badge>
                        <span className="text-sm text-slate-500 font-medium">Due {task.dueDate}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleMarkDone(task.id)
                      }}
                      className="hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all duration-200"
                    >
                      Mark Done
                    </Button>
                  </div>
                </Card>
              ))}
          </CardContent>
        </Card>

        {/* Completed Tasks Section */}
        {completedTasks.length > 0 && (
          <Card className="shadow-lg border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setShowCompletedTasks(!showCompletedTasks)}
              >
                <CardTitle className="text-lg font-bold text-blue-900">
                  Completed Tasks ({getFilteredCompletedTasks().length})
                </CardTitle>
                <ChevronRight
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
                    showCompletedTasks ? "rotate-90" : ""
                  }`}
                />
              </div>
            </CardHeader>
            {showCompletedTasks && (
              <CardContent className="space-y-3">
                {getFilteredCompletedTasks().map((task) => (
                  <Card
                    key={task.id}
                    onClick={() => handleUndoComplete(task.id)}
                    className="p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer border-l-4 border-l-green-300 bg-green-50/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg text-slate-900 line-through">{task.title}</h3>
                          <Badge className="bg-green-100 text-green-900 border-green-200" variant="outline">
                            ✓ Completed
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-1 font-medium">
                          Completed by {task.assignee} at {task.completedAt}
                        </p>
                        <p className="text-xs text-slate-500">Click to undo completion</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            )}
          </Card>
        )}

        {/* Modals */}
        {selectedTask && <TaskDetailModal task={selectedTask} onClose={() => setSelectedTask(null)} />}

        {showNewTaskModal && <NewTaskModal onClose={() => setShowNewTaskModal(false)} />}
      </div>
    )
  }

  const MessagesContent = () => (
    <div className="space-y-4 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-900">Messages</h2>
        <Button
          size="sm"
          className="bg-red-900 hover:bg-red-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-4 h-4 mr-1" />
          New Message
        </Button>
      </div>

      <div className="space-y-3">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer border-l-4 ${
              message.unread ? "border-l-red-900 bg-red-50/50" : "border-l-slate-300 bg-white"
            }`}
          >
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12 shadow-md">
                <AvatarFallback className="bg-blue-100 text-blue-900 font-bold">
                  {message.sender
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-bold text-lg text-slate-900">{message.sender}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500 font-medium">{message.time}</span>
                    {message.unread && <div className="w-3 h-3 bg-red-900 rounded-full animate-pulse"></div>}
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">{message.message}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />
      case "horses":
        return <HorsesContent />
      case "schedule":
        return <ScheduleContent />
      case "tasks":
        return <TasksContent />
      case "messages":
        return <MessagesContent />
      default:
        return <DashboardContent />
    }
  }

  if (!isLoggedIn) {
    return <LoginScreen />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header - Navy Blue */}
      <header className="bg-blue-900 text-white px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/stoneridge-logo.jpeg" alt="StoneRidge Logo" width={32} height={32} className="rounded" />
            <h1 className="text-lg font-semibold">{t.welcome}</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-blue-800">
              <Bell className="h-5 w-5" />
              {messages.filter((m) => m.unread).length > 0 && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-900 rounded-full"></div>
              )}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Joey (Admin)</p>
                      <p className="text-sm text-gray-600">Administrator</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                      <User className="w-5 h-5 text-gray-500" />
                      {t.profile}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                      <Upload className="w-5 h-5 text-gray-500" />
                      {t.uploads}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-3 h-12">
                      <Settings className="w-5 h-5 text-gray-500" />
                      {t.settings}
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <label className="block text-sm font-medium mb-2">Language</label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="en">🇺🇸 English</option>
                      <option value="es">🇪🇸 Español</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => setIsLoggedIn(false)}
                    variant="outline"
                    className="w-full border-red-900 text-red-900 hover:bg-red-50"
                  >
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-4">{renderContent()}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors relative ${
                activeTab === tab.id ? "text-red-900 bg-red-50" : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
              {tab.id === "messages" && messages.filter((m) => m.unread).length > 0 && (
                <div className="absolute top-1 right-2 w-2 h-2 bg-red-900 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
