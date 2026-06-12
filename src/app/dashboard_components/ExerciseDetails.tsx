import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, ChevronRight, RotateCcw, Play, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";
const exampleImage = "/dashboard_assets/b10f0466762b7638a487dda766c6a48b7120c758.png";

type TabType = "instructions" | "performance" | "logs";

const exerciseData = {
  "neck-rotations": {
    id: "Exercise 3.4",
    title: "Neck Rotations",
    reps: 10,
    duration: "60s",
    images: [exampleImage],
    instructions: [
      "Start in a comfortable standing position with your feet shoulder-width apart.",
      "Keep your core engaged and maintain proper form throughout the movement.",
      "Perform the exercise slowly and with control, focusing on the targeted muscle group.",
      "Breathe naturally and avoid holding your breath during the exercise."
    ],
    relatedExercises: [
      { id: "neck-rotations", name: "Neck Rotations", sets: "10 reps × 60s", current: true },
      { id: "chin-tucks", name: "Chin Tucks", sets: "15 reps × 45s" },
      { id: "side-neck-stretch", name: "Side Neck Stretch", sets: "8 reps × 30s" },
      { id: "shoulder-rolls", name: "Shoulder Rolls", sets: "12 reps × 45s" }
    ],
    performanceData: [
      { date: "Week 1", exercise: 45, technique: 60, endurance: 55 },
      { date: "Week 2", exercise: 55, technique: 65, endurance: 62 },
      { date: "Week 3", exercise: 65, technique: 70, endurance: 68 },
      { date: "Week 4", exercise: 75, technique: 75, endurance: 72 },
      { date: "Week 5", exercise: 80, technique: 78, endurance: 75 },
      { date: "Week 6", exercise: 85, technique: 82, endurance: 80 }
    ],
    logs: [
      { date: "Dec 30, 2024", time: "08:12 AM", sets: 3, reps: 12, weight: "-", difficulty: "Easy", notes: "" },
      { date: "Dec 28, 2024", time: "07:45 AM", sets: 3, reps: 10, weight: "-", difficulty: "Medium", notes: "" },
      { date: "Dec 26, 2024", time: "08:30 AM", sets: 3, reps: 10, weight: "-", difficulty: "Easy", notes: "" },
      { date: "Dec 24, 2024", time: "09:15 AM", sets: 2, reps: 8, weight: "-", difficulty: "Easy", notes: "" },
      { date: "Dec 22, 2024", time: "07:30 AM", sets: 3, reps: 12, weight: "-", difficulty: "Medium", notes: "" },
      { date: "Dec 20, 2024", time: "08:00 AM", sets: 3, reps: 10, weight: "-", difficulty: "Easy", notes: "" },
      { date: "Dec 18, 2024", time: "07:50 AM", sets: 3, reps: 10, weight: "-", difficulty: "Easy", notes: "" },
      { date: "Dec 16, 2024", time: "08:20 AM", sets: 2, reps: 8, weight: "-", difficulty: "Easy", notes: "" },
      { date: "Dec 14, 2024", time: "09:00 AM", sets: 3, reps: 12, weight: "-", difficulty: "Medium", notes: "" },
      { date: "Dec 12, 2024", time: "07:40 AM", sets: 3, reps: 10, weight: "-", difficulty: "Easy", notes: "" },
      { date: "Dec 10, 2024", time: "08:10 AM", sets: 3, reps: 10, weight: "-", difficulty: "Easy", notes: "" },
      { date: "Dec 08, 2024", time: "07:55 AM", sets: 2, reps: 8, weight: "-", difficulty: "Easy", notes: "" }
    ]
  }
};

export function ExerciseDetails() {
  const router = useRouter();
  const { exerciseId } = useParams();
  const [currentTab, setCurrentTab] = useState<TabType>("instructions");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAddLog, setShowAddLog] = useState(false);

  const exercise = exerciseData["neck-rotations"];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-orange-100 text-orange-700";
      case "hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F8FB]">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[1000px] mx-auto px-6 py-8">
            {/* Back Button */}
            <button
              onClick={() => router.push("/exercise-plans")}
              className="flex items-center gap-2 text-[#043570] mb-6 hover:opacity-70 transition-opacity"
            >
              <ChevronLeft size={20} />
              <span className="font-medium">Back</span>
            </button>

            {/* Hero Image Section with Carousel */}
            <div className="relative rounded-3xl overflow-hidden mb-6">
              {/* Exercise ID Badge */}
              <div className="absolute top-4 left-4 z-10 bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
                {exercise.id}
              </div>

              {/* Fullscreen Button */}
              <button className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-700">
                  <path d="M2 5.5V2.5C2 2.22386 2.22386 2 2.5 2H5.5M10.5 2H13.5C13.7761 2 14 2.22386 14 2.5V5.5M14 10.5V13.5C14 13.7761 13.7761 14 13.5 14H10.5M5.5 14H2.5C2.22386 14 2 13.7761 2 13.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Main Image */}
              <img 
                src={exercise.images[currentImageIndex]} 
                alt={exercise.title}
                className="w-full h-64 object-cover"
              />

              {/* Play Button Overlay */}
              <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Play size={20} className="text-blue-500 ml-1" fill="currentColor" />
              </button>

              {/* Carousel Navigation */}
              {exercise.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? exercise.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={18} className="text-gray-700" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev === exercise.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronRight size={18} className="text-gray-700" />
                  </button>
                </>
              )}
            </div>

            {/* Exercise Title and Stats */}
            <div className="bg-white rounded-3xl p-6 mb-4">
              <h1 className="text-2xl font-bold text-[#0f172b] mb-6">{exercise.title}</h1>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#F6F8FB] rounded-2xl px-6 py-6 text-center">
                  <div className="text-4xl font-bold text-blue-500">{exercise.reps}</div>
                  <div className="text-xs text-[#64748B] uppercase tracking-wide mt-1">Reps</div>
                </div>
                <div className="bg-[#F6F8FB] rounded-2xl px-6 py-6 text-center">
                  <div className="text-4xl font-bold text-blue-500">{exercise.duration}</div>
                  <div className="text-xs text-[#64748B] uppercase tracking-wide mt-1">Duration</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-blue-500 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-600 transition-colors">
                  Start AI Guide
                </button>
                <button className="flex-1 border-2 border-blue-500 text-blue-500 py-3.5 rounded-xl font-semibold text-sm hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                  <RotateCcw size={16} />
                  Restart
                </button>
                <button className="flex-1 bg-green-500 text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                  <CheckCircle2 size={18} />
                  Mark as Done
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-6 bg-white rounded-2xl p-1.5">
              <button
                onClick={() => setCurrentTab("instructions")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  currentTab === "instructions"
                    ? "bg-blue-50 text-blue-600"
                    : "text-[#64748B] hover:text-[#0f172b]"
                }`}
              >
                📋 Instructions
              </button>
              <button
                onClick={() => setCurrentTab("performance")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  currentTab === "performance"
                    ? "bg-blue-50 text-blue-600"
                    : "text-[#64748B] hover:text-[#0f172b]"
                }`}
              >
                📊 Performance
              </button>
              <button
                onClick={() => setCurrentTab("logs")}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  currentTab === "logs"
                    ? "bg-blue-50 text-blue-600"
                    : "text-[#64748B] hover:text-[#0f172b]"
                }`}
              >
                📝 Logs
              </button>
            </div>

            {/* Tab Content */}
            {currentTab === "instructions" && (
              <div className="space-y-4">
                {/* Exercise Instructions */}
                <div className="bg-white rounded-3xl p-6">
                  <h2 className="text-lg font-bold text-[#0f172b] mb-4">Exercise Instructions</h2>
                  <div className="space-y-3">
                    {exercise.instructions.map((instruction, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                          {index + 1}
                        </div>
                        <p className="text-sm text-[#475569] leading-relaxed pt-0.5">{instruction}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Exercises */}
                <div className="bg-white rounded-3xl p-6">
                  <h2 className="text-lg font-bold text-[#0f172b] mb-4">All Exercises in Neck rehabilitation</h2>
                  <div className="space-y-2">
                    {exercise.relatedExercises.map((relatedExercise, index) => (
                      <div
                        key={relatedExercise.id}
                        className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-colors ${
                          relatedExercise.current
                            ? "bg-blue-50"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-semibold ${
                            relatedExercise.current
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 text-[#64748B]"
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className={`font-semibold text-sm ${
                              relatedExercise.current ? "text-blue-600" : "text-[#0f172b]"
                            }`}>
                              {relatedExercise.name}
                            </div>
                            <div className="text-xs text-[#64748B] mt-0.5">{relatedExercise.sets}</div>
                          </div>
                        </div>
                        <ChevronRight size={18} className="text-[#CBD5E1]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentTab === "performance" && (
              <div className="space-y-4">
                {/* Performance Chart */}
                <div className="bg-white rounded-3xl p-6">
                  <h2 className="text-lg font-bold text-[#0f172b] mb-6">Performance Analysis</h2>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={exercise.performanceData}>
                      <defs>
                        <linearGradient id="colorExercise" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FB923C" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#FB923C" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorTechnique" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorEndurance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                      <XAxis dataKey="date" tick={{ fill: '#64748B', fontSize: 12 }} />
                      <YAxis tick={{ fill: '#64748B', fontSize: 12 }} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Area type="monotone" dataKey="exercise" stroke="#FB923C" fillOpacity={1} fill="url(#colorExercise)" name="Exercise" strokeWidth={2} />
                      <Area type="monotone" dataKey="technique" stroke="#3B82F6" fillOpacity={1} fill="url(#colorTechnique)" name="Technique Score" strokeWidth={2} />
                      <Area type="monotone" dataKey="endurance" stroke="#10B981" fillOpacity={1} fill="url(#colorEndurance)" name="Endurance" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                  <p className="text-xs text-[#64748B] mt-4">Completed 3 out of 10 reps</p>
                </div>

                {/* Score Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6">
                    <div className="text-xs text-blue-600 font-medium mb-2">Overall Score</div>
                    <div className="text-3xl font-bold text-blue-700">8/10</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-6">
                    <div className="text-xs text-orange-600 font-medium mb-2">Technique Score</div>
                    <div className="text-3xl font-bold text-orange-700">7.5/10</div>
                  </div>
                </div>
              </div>
            )}

            {currentTab === "logs" && (
              <div className="bg-white rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-[#0f172b]">Exercise History</h2>
                  <button
                    onClick={() => setShowAddLog(!showAddLog)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                  >
                    + Add
                  </button>
                </div>

                {/* Add Log Form */}
                {showAddLog && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-4 mb-6">
                    <div className="grid grid-cols-4 gap-3 mb-3">
                      <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                      <input type="time" className="px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                      <input type="number" placeholder="Sets" className="px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                      <input type="number" placeholder="Reps" className="px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                    </div>
                    <div className="flex gap-3">
                      <select className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm">
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                      </select>
                      <button className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                        Save
                      </button>
                    </div>
                  </div>
                )}

                {/* Logs Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-3 text-xs font-semibold text-[#64748B] uppercase">Date</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-[#64748B] uppercase">Time</th>
                        <th className="text-center py-3 px-3 text-xs font-semibold text-[#64748B] uppercase">Sets</th>
                        <th className="text-center py-3 px-3 text-xs font-semibold text-[#64748B] uppercase">Reps</th>
                        <th className="text-center py-3 px-3 text-xs font-semibold text-[#64748B] uppercase">Weight</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-[#64748B] uppercase">Difficulty</th>
                        <th className="text-left py-3 px-3 text-xs font-semibold text-[#64748B] uppercase">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exercise.logs.map((log, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-3 text-sm text-[#0f172b]">{log.date}</td>
                          <td className="py-3 px-3 text-sm text-[#64748B]">{log.time}</td>
                          <td className="py-3 px-3 text-sm text-[#0f172b] text-center">{log.sets}</td>
                          <td className="py-3 px-3 text-sm text-[#0f172b] text-center">{log.reps}</td>
                          <td className="py-3 px-3 text-sm text-[#64748B] text-center">{log.weight}</td>
                          <td className="py-3 px-3">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(log.difficulty)}`}>
                              {log.difficulty}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-sm text-[#64748B]">{log.notes || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-xs text-[#64748B] mt-4 text-center">Showing 12 of 57 entries</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
