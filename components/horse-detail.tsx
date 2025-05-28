"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Package, Activity, Clock, User, Plus, Edit, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Horse {
  id: number
  name: string
  breed: string
  dateOfBirth: string
  statusColor: string
}

interface HorseDetailProps {
  horse: Horse
  onBack: () => void
  language: string
}

const HorseDetail = ({ horse, onBack, language }: HorseDetailProps) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [pedigreeOpen, setPedigreeOpen] = useState(false)
  const [showTackManagement, setShowTackManagement] = useState(false)

  const translations = {
    en: {
      back: "Back",
      overview: "Overview",
      records: "Records",
      training: "Training",
      shows: "Shows",
      media: "Media",
      notes: "Notes",
      ownerInfo: "Owner Info",
      // Overview
      basicInfo: "Basic Information",
      vitals: "Current Vitals",
      recentActivity: "Recent Activity",
      quickActions: "Quick Actions",
      pedigree: "Pedigree",
      sire: "Sire",
      dam: "Dam",
      // Medical
      medicalHistory: "Medical History",
      vaccinations: "Vaccinations",
      medications: "Current Medications",
      vetVisits: "Vet Visits",
      // Training
      trainingLog: "Training Log",
      performance: "Performance Metrics",
      goals: "Training Goals",
      // Actions
      addNote: "Add Note",
      scheduleVet: "Schedule Vet",
      addTraining: "Add Training",
      updateTack: "Update Tack",
      editProfile: "Edit Profile",
      shareProfile: "Share Profile",
      exportData: "Export Data",
    },
    es: {
      back: "Atrás",
      overview: "Resumen",
      records: "Registros",
      training: "Entrenamiento",
      shows: "Espectáculos",
      media: "Medios",
      notes: "Notas",
      ownerInfo: "Info Propietario",
      // Overview
      basicInfo: "Información Básica",
      vitals: "Signos Vitales",
      recentActivity: "Actividad Reciente",
      quickActions: "Acciones Rápidas",
      pedigree: "Pedigrí",
      sire: "Padre",
      dam: "Madre",
      // Medical
      medicalHistory: "Historial Médico",
      vaccinations: "Vacunas",
      medications: "Medicamentos",
      vetVisits: "Visitas Veterinarias",
      // Training
      trainingLog: "Registro de Entrenamiento",
      performance: "Métricas de Rendimiento",
      goals: "Objetivos de Entrenamiento",
      // Actions
      addNote: "Agregar Nota",
      scheduleVet: "Programar Vet",
      addTraining: "Agregar Entrenamiento",
      updateTack: "Actualizar Equipo",
      editProfile: "Editar Perfil",
      shareProfile: "Compartir Perfil",
      exportData: "Exportar Datos",
    },
  }

  const t = translations[language as keyof typeof translations]

  const recentActivities = [
    {
      date: "Today",
      time: "08:00 AM",
      activity: "Training Session",
      instructor: "John Smith",
      duration: "2 hours",
      notes: "Excellent progress on collection work",
    },
    {
      date: "Yesterday",
      time: "10:00 AM",
      activity: "Grooming & Care",
      instructor: "Maria Garcia",
      duration: "1 hour",
      notes: "Regular grooming, checked hooves",
    },
    {
      date: "2 days ago",
      time: "02:00 PM",
      activity: "Vet Check",
      instructor: "Dr. Smith",
      duration: "30 min",
      notes: "Routine checkup - all clear",
    },
  ]

  const trainingLog = [
    {
      date: "Today",
      session: "Collection & Balance",
      duration: "2h",
      instructor: "John Smith",
      rating: 5,
      notes: "Outstanding session. Horse is responding well to collection cues.",
    },
    {
      date: "Yesterday",
      session: "Ground Work",
      duration: "1h",
      instructor: "Sarah Johnson",
      rating: 4,
      notes: "Good focus and attention. Worked on leading and standing.",
    },
    {
      date: "2 days ago",
      session: "Longe Line Work",
      duration: "45m",
      instructor: "John Smith",
      rating: 4,
      notes: "Consistent gaits, good transitions.",
    },
  ]

  const OverviewTab = () => (
    <div className="space-y-4">
      {/* Basic Information */}
      <Card className="shadow-lg border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-blue-900">{t.basicInfo}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Breed</p>
              <p className="font-bold text-lg">{horse.breed}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Date of Birth</p>
              <p className="font-bold text-lg">{horse.dateOfBirth}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Weight</p>
              <p className="font-bold text-lg">1,150 lbs</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Height</p>
              <p className="font-bold text-lg">16.2 hands</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Staff Assignments */}
      <Card className="shadow-lg border-l-4 border-l-indigo-500">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-blue-900">Staff Assignments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Trainer</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="font-bold text-blue-900">JS</span>
                </div>
                <p className="font-bold text-lg">John Smith</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Instructor</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="font-bold text-green-900">SJ</span>
                </div>
                <p className="font-bold text-lg">Sarah Johnson</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Groom</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="font-bold text-purple-900">MG</span>
                </div>
                <p className="font-bold text-lg">Maria Garcia</p>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-2 hover:bg-blue-50">
            <Edit className="w-4 h-4 mr-2" />
            Change Staff Assignments
          </Button>
        </CardContent>
      </Card>

      {/* Pedigree */}
      <Card className="shadow-lg border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-blue-900">{t.pedigree}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">{t.sire}</p>
                <p className="font-bold text-lg">Thunder's Legacy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">{t.dam}</p>
                <p className="font-bold text-lg">Midnight's Dream</p>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full hover:bg-blue-50" onClick={() => setPedigreeOpen(!pedigreeOpen)}>
            {pedigreeOpen ? "Hide Full Pedigree" : "View Full Pedigree"}
          </Button>
          {pedigreeOpen && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Full pedigree chart would appear here...</p>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Paternal Grandsire:</strong> Storm King
                </p>
                <p>
                  <strong>Paternal Granddam:</strong> Royal Thunder
                </p>
                <p>
                  <strong>Maternal Grandsire:</strong> Midnight Express
                </p>
                <p>
                  <strong>Maternal Granddam:</strong> Dream Weaver
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="shadow-lg border-l-4 border-l-purple-500">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-blue-900">{t.recentActivity}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-xl border-l-4 border-l-purple-300">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">{activity.activity}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{activity.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{activity.instructor}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{activity.notes}</p>
                </div>
                <Badge className="bg-purple-100 text-purple-900 border-purple-200" variant="outline">
                  {activity.duration}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const RecordsTab = () => {
    const [recordsSubTab, setRecordsSubTab] = useState("medical")

    const medicalRecords = [
      {
        date: "2024-01-15",
        type: "Vaccination",
        description: "Annual vaccines (EWT, Flu, Rhino)",
        veterinarian: "Dr. Smith",
        status: "Completed",
      },
      {
        date: "2024-01-10",
        type: "Checkup",
        description: "Routine health examination",
        veterinarian: "Dr. Smith",
        status: "Completed",
      },
    ]

    const chiropractorRecords = [
      {
        date: "2024-01-20",
        type: "Adjustment",
        description: "Full body alignment and adjustment",
        practitioner: "Dr. Williams",
        status: "Completed",
        notes: "Slight tension in lower back, improved after treatment",
      },
      {
        date: "2023-12-15",
        type: "Assessment",
        description: "Initial chiropractic evaluation",
        practitioner: "Dr. Williams",
        status: "Completed",
        notes: "Overall good alignment, recommended monthly maintenance",
      },
    ]

    const farrierRecords = [
      {
        date: "2024-01-25",
        type: "Shoeing",
        description: "New shoes - front and back",
        farrier: "Mike Wilson",
        status: "Completed",
        notes: "Steel shoes, good hoof condition",
      },
      {
        date: "2024-01-10",
        type: "Trim",
        description: "Hoof trimming and maintenance",
        farrier: "Mike Wilson",
        status: "Completed",
        notes: "Regular maintenance trim",
      },
    ]

    return (
      <div className="space-y-4">
        {/* Records Sub-navigation */}
        <Card className="shadow-lg border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex justify-center gap-6">
              <Button
                variant={recordsSubTab === "medical" ? "default" : "outline"}
                size="sm"
                onClick={() => setRecordsSubTab("medical")}
                className={`px-6 ${recordsSubTab === "medical" ? "bg-red-900 hover:bg-red-800" : ""}`}
              >
                Medical
              </Button>
              <Button
                variant={recordsSubTab === "chiropractor" ? "default" : "outline"}
                size="sm"
                onClick={() => setRecordsSubTab("chiropractor")}
                className={`px-6 ${recordsSubTab === "chiropractor" ? "bg-red-900 hover:bg-red-800" : ""}`}
              >
                Chiropractor
              </Button>
              <Button
                variant={recordsSubTab === "farrier" ? "default" : "outline"}
                size="sm"
                onClick={() => setRecordsSubTab("farrier")}
                className={`px-6 ${recordsSubTab === "farrier" ? "bg-red-900 hover:bg-red-800" : ""}`}
              >
                Farrier
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Medical Records */}
        {recordsSubTab === "medical" && (
          <Card className="shadow-lg border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-blue-900">Medical History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {medicalRecords.map((record, index) => (
                <div key={index} className="p-4 bg-red-50 rounded-xl border-l-4 border-l-red-300">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-900">{record.type}</h3>
                        <Badge className="bg-green-100 text-green-900 border-green-200" variant="outline">
                          {record.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{record.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{record.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{record.veterinarian}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Chiropractor Records */}
        {recordsSubTab === "chiropractor" && (
          <Card className="shadow-lg border-l-4 border-l-teal-500">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-blue-900">Chiropractor History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {chiropractorRecords.map((record, index) => (
                <div key={index} className="p-4 bg-teal-50 rounded-xl border-l-4 border-l-teal-300">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-900">{record.type}</h3>
                        <Badge className="bg-green-100 text-green-900 border-green-200" variant="outline">
                          {record.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{record.description}</p>
                      <p className="text-sm text-gray-600 mb-2 italic">{record.notes}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{record.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{record.practitioner}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Farrier Records */}
        {recordsSubTab === "farrier" && (
          <Card className="shadow-lg border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-blue-900">Farrier History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {farrierRecords.map((record, index) => (
                <div key={index} className="p-4 bg-purple-50 rounded-xl border-l-4 border-l-purple-300">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-900">{record.type}</h3>
                        <Badge className="bg-green-100 text-green-900 border-green-200" variant="outline">
                          {record.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{record.description}</p>
                      <p className="text-sm text-gray-600 mb-2 italic">{record.notes}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{record.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{record.farrier}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  const ShowsTab = () => {
    const [showsSubTab, setShowsSubTab] = useState("past")

    const pastShows = [
      {
        date: "2024-01-15",
        showName: "Kentucky State Fair",
        classes: ["Three-Gaited Open", "Park Horse"],
        results: ["1st Place", "3rd Place"],
        location: "Louisville, KY",
        earnings: "$2,500",
      },
      {
        date: "2023-12-10",
        showName: "Lexington Junior League",
        classes: ["Three-Gaited Novice"],
        results: ["2nd Place"],
        location: "Lexington, KY",
        earnings: "$800",
      },
    ]

    const upcomingShows = [
      {
        date: "2024-02-20",
        showName: "Spring Classic Horse Show",
        classes: ["Three-Gaited Open", "Park Horse", "Road Horse"],
        entryFees: "$450",
        location: "Nashville, TN",
        status: "Entered",
      },
      {
        date: "2024-03-15",
        showName: "Regional Championship",
        classes: ["Three-Gaited Championship"],
        entryFees: "$300",
        location: "Atlanta, GA",
        status: "Considering",
      },
    ]

    return (
      <div className="space-y-4">
        {/* Shows Sub-navigation */}
        <Card className="shadow-lg border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex justify-center gap-8">
              <Button
                variant={showsSubTab === "past" ? "default" : "outline"}
                size="sm"
                onClick={() => setShowsSubTab("past")}
                className={`px-8 ${showsSubTab === "past" ? "bg-red-900 hover:bg-red-800" : ""}`}
              >
                Past Shows
              </Button>
              <Button
                variant={showsSubTab === "upcoming" ? "default" : "outline"}
                size="sm"
                onClick={() => setShowsSubTab("upcoming")}
                className={`px-8 ${showsSubTab === "upcoming" ? "bg-red-900 hover:bg-red-800" : ""}`}
              >
                Upcoming Shows
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Past Shows */}
        {showsSubTab === "past" && (
          <Card className="shadow-lg border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-blue-900">Past Show Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pastShows.map((show, index) => (
                <div
                  key={index}
                  className="p-4 bg-green-50 rounded-xl border-l-4 border-l-green-300 cursor-pointer hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900">{show.showName}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {show.location} • {show.date}
                      </p>
                      <div className="space-y-1 mb-2">
                        {show.classes.map((className, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">{className}</span>
                            <Badge className="bg-yellow-100 text-yellow-900 border-yellow-200" variant="outline">
                              {show.results[idx]}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm font-semibold text-green-700">Earnings: {show.earnings}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Upcoming Shows */}
        {showsSubTab === "upcoming" && (
          <Card className="shadow-lg border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-blue-900">Upcoming Show Entries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingShows.map((show, index) => (
                <div
                  key={index}
                  className="p-4 bg-blue-50 rounded-xl border-l-4 border-l-blue-300 cursor-pointer hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-gray-900">{show.showName}</h3>
                        <Badge
                          className={`${show.status === "Entered" ? "bg-green-100 text-green-900 border-green-200" : "bg-yellow-100 text-yellow-900 border-yellow-200"}`}
                          variant="outline"
                        >
                          {show.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {show.location} • {show.date}
                      </p>
                      <div className="space-y-1 mb-2">
                        {show.classes.map((className, idx) => (
                          <div key={idx} className="text-sm text-gray-700">
                            • {className}
                          </div>
                        ))}
                      </div>
                      <p className="text-sm font-semibold text-blue-700">Entry Fees: {show.entryFees}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  const TackManagement = ({ onClose }: { onClose: () => void }) => {
    const [tackSettings, setTackSettings] = useState({
      workBridle: "Standard Snaffle",
      showBridleSnaffle: "D-Ring Snaffle",
      showBridleCurb: "Full Bridle - Weymouth",
      saddle: "All Purpose Saddle",
      girth: 'Leather Girth - 54"',
      martingale: "None",
      reins: "Single Rein",
      cavesson: "Regular Cavesson",
      poloWraps: false,
      standingWraps: false,
      splintBoots: true,
      kneeBoots: false,
      bellBoots: true,
    })

    const bridleOptions = [
      "Standard Snaffle",
      "D-Ring Snaffle",
      "Eggbutt Snaffle",
      "Loose Ring Snaffle",
      "Pelham Bridle",
      "Hackamore",
    ]

    const curbBridleOptions = ["Full Bridle - Weymouth", "Double Bridle", "Pelham with Curb Chain", "Kimberwick"]

    const martingaleOptions = ["None", "German Martingale", "Running Martingale", "Standing Martingale"]

    const reinsOptions = ["Single Rein", "Double Reins", "Draw Reins", "Side Reins"]

    const cavessonOptions = ["None", "Regular Cavesson", "Flash Noseband", "Figure 8 Noseband", "Drop Noseband"]

    const saddleOptions = [
      "All Purpose Saddle",
      "Dressage Saddle",
      "Jumping Saddle",
      "Saddle Seat Saddle",
      "Western Saddle",
      "Driving Harness",
    ]

    const girthOptions = [
      'Leather Girth - 50"',
      'Leather Girth - 52"',
      'Leather Girth - 54"',
      'Leather Girth - 56"',
      'Synthetic Girth - 50"',
      'Synthetic Girth - 52"',
      'Synthetic Girth - 54"',
      'Synthetic Girth - 56"',
    ]

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-blue-900">Tack Management</h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            </div>

            {/* Tack Equipment */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Equipment</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Bridle</label>
                <select
                  value={tackSettings.workBridle}
                  onChange={(e) => setTackSettings({ ...tackSettings, workBridle: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {bridleOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* This section is now replaced with the new fields added above */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Girth</label>
                <select
                  value={tackSettings.girth}
                  onChange={(e) => setTackSettings({ ...tackSettings, girth: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {girthOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Show Bridle - Snaffle</label>
                <select
                  value={tackSettings.showBridleSnaffle}
                  onChange={(e) => setTackSettings({ ...tackSettings, showBridleSnaffle: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {bridleOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Show Bridle - Curb</label>
                <select
                  value={tackSettings.showBridleCurb}
                  onChange={(e) => setTackSettings({ ...tackSettings, showBridleCurb: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {curbBridleOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Martingale</label>
                <select
                  value={tackSettings.martingale}
                  onChange={(e) => setTackSettings({ ...tackSettings, martingale: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {martingaleOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reins</label>
                <select
                  value={tackSettings.reins}
                  onChange={(e) => setTackSettings({ ...tackSettings, reins: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {reinsOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cavesson</label>
                <select
                  value={tackSettings.cavesson}
                  onChange={(e) => setTackSettings({ ...tackSettings, cavesson: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {cavessonOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Protective Equipment */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Protective Equipment</h3>

              {[
                { key: "poloWraps", label: "Polo Wraps" },
                { key: "standingWraps", label: "Standing Wraps" },
                { key: "splintBoots", label: "Splint Boots" },
                { key: "kneeBoots", label: "Knee Boots" },
                { key: "bellBoots", label: "Bell Boots" },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={item.key}
                    checked={tackSettings[item.key as keyof typeof tackSettings] as boolean}
                    onChange={(e) => setTackSettings({ ...tackSettings, [item.key]: e.target.checked })}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={item.key} className="text-sm font-medium text-gray-700">
                    {item.label}
                  </label>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button onClick={onClose} className="flex-1 bg-red-900 hover:bg-red-800 text-white">
                Save Changes
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

  const TrainingTab = () => (
    <div className="space-y-4">
      <Card className="shadow-lg border-l-4 border-l-green-500">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-blue-900">{t.trainingLog}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trainingLog.map((session, index) => (
            <div key={index} className="p-4 bg-green-50 rounded-xl border-l-4 border-l-green-300">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-gray-900">{session.session}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${i < session.rating ? "bg-yellow-400" : "bg-gray-200"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{session.notes}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{session.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{session.instructor}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )

  const OwnerTab = () => (
    <div className="space-y-4">
      <Card className="shadow-lg border-l-4 border-l-indigo-500">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-blue-900">Owner Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Owner Name</p>
              <p className="font-bold text-lg">Sarah Mitchell</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Contact Phone</p>
              <p className="font-bold text-lg">(555) 123-4567</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Email</p>
              <p className="font-bold text-lg">sarah.mitchell@email.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Address</p>
              <p className="font-bold text-lg">
                123 Equestrian Lane
                <br />
                Lexington, KY 40511
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Emergency Contact</p>
              <p className="font-bold text-lg">John Mitchell - (555) 987-6543</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <Card className="shadow-lg border-l-4 border-l-blue-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-blue-50">
                <ArrowLeft className="w-4 h-4 mr-1" />
                {t.back}
              </Button>
              <div className={`w-4 h-4 rounded-full ${horse.statusColor}`}></div>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">{horse.name}</h1>
                <p className="text-gray-600">
                  {horse.breed} • {horse.dateOfBirth}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="hover:bg-blue-50">
                <Share className="w-4 h-4 mr-1" />
                {t.shareProfile}
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-blue-50">
                <Edit className="w-4 h-4 mr-1" />
                {t.editProfile}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-lg border-l-4 border-l-orange-500">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-blue-900">{t.quickActions}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 hover:bg-blue-50">
              <Plus className="w-4 h-4 mr-2" />
              {t.addNote}
            </Button>
            <Button variant="outline" className="h-12 hover:bg-red-50">
              <Calendar className="w-4 h-4 mr-2" />
              {t.scheduleVet}
            </Button>
            <Button variant="outline" className="h-12 hover:bg-green-50">
              <Activity className="w-4 h-4 mr-2" />
              {t.addTraining}
            </Button>
            <Button variant="outline" className="h-12 hover:bg-purple-50" onClick={() => setShowTackManagement(true)}>
              <Package className="w-4 h-4 mr-2" />
              {t.updateTack}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="records">{t.records}</TabsTrigger>
          <TabsTrigger value="training">{t.training}</TabsTrigger>
          <TabsTrigger value="shows">{t.shows}</TabsTrigger>
          <TabsTrigger value="owner">{t.ownerInfo}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="records">
          <RecordsTab />
        </TabsContent>

        <TabsContent value="training">
          <TrainingTab />
        </TabsContent>

        <TabsContent value="shows">
          <ShowsTab />
        </TabsContent>

        <TabsContent value="owner">
          <OwnerTab />
        </TabsContent>
      </Tabs>
      {showTackManagement && <TackManagement onClose={() => setShowTackManagement(false)} />}
    </div>
  )
}

export default HorseDetail
