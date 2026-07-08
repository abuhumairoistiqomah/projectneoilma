import React, { useState } from "react";
import { GraduationCap, LayoutDashboard, Database, ChevronDown, Sparkles, Settings } from "lucide-react";

interface HeaderProps {
  activeView: string; // "dashboard" | "grade-1" | "grade-2" | ... | "settings"
  onViewChange: (view: string) => void;
  gasConfigured: boolean;
}

export default function Header({ activeView, onViewChange, gasConfigured }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const grades = [1, 2, 3, 4, 5, 6];

  const handleGradeSelect = (grade: number) => {
    onViewChange(`grade-${grade}`);
    setDropdownOpen(false);
  };

  const getActiveViewLabel = () => {
    if (activeView === "dashboard") return "Dashboard";
    if (activeView === "settings") return "Database Settings";
    if (activeView.startsWith("grade-")) {
      return `Grade ${activeView.split("-")[1]}`;
    }
    return activeView;
  };

  return (
    <header id="app-header" className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <div 
          id="brand-logo"
          className="flex items-center gap-2.5 cursor-pointer" 
          onClick={() => onViewChange("dashboard")}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-slate-900 text-white shadow-md shadow-blue-100">
            <span className="font-display text-xl font-bold tracking-tight">Ω</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                NEO ILMA
              </span>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-1.5 py-0.5 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/10">
                ES
              </span>
            </div>
            <p className="hidden text-[10px] font-semibold tracking-wider text-slate-400 uppercase sm:block">
              Inspiring Little Mathematicians
            </p>
          </div>
        </div>

        {/* Navigation Actions */}
        <nav className="flex items-center gap-2 sm:gap-4">
          {/* Dashboard Button */}
          <button
            id="nav-btn-dashboard"
            onClick={() => onViewChange("dashboard")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all sm:text-sm ${
              activeView === "dashboard"
                ? "bg-blue-50 text-blue-700 font-bold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          {/* Grades Dropdown */}
          <div className="relative">
            <button
              id="nav-btn-grades"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all sm:text-sm ${
                activeView.startsWith("grade-")
                  ? "bg-blue-50 text-blue-700 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              <span>Grade</span>
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {dropdownOpen && (
              <>
                {/* Backdrop overlay to dismiss dropdown */}
                <div 
                  id="dropdown-overlay"
                  className="fixed inset-0 z-10" 
                  onClick={() => setDropdownOpen(false)} 
                />
                
                <div 
                  id="grades-dropdown-menu"
                  className="absolute right-0 mt-1.5 w-48 origin-top-right rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl ring-1 ring-black/5 z-20 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Select Grade Level
                  </div>
                  {grades.map((grade) => (
                    <button
                      key={grade}
                      id={`dropdown-grade-${grade}`}
                      onClick={() => handleGradeSelect(grade)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold sm:text-sm transition-all ${
                        activeView === `grade-${grade}`
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-100"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>Grade {grade}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                        activeView === `grade-${grade}` 
                          ? "bg-blue-500 text-blue-50" 
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        K{grade}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>


        </nav>
      </div>
    </header>
  );
}
