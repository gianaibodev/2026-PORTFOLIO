"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MacOSMenuBar from "@/components/ui/mac-os-menu-bar";
import { PixelHeader } from "@/components/ui/pixel-header";
import { GraduationCap, Award, Trophy, Users, Mail, Phone, Linkedin, Facebook, Instagram, Sparkles, X, Search, FileText } from "lucide-react";
import Link from "next/link";

const collegeGrades = [
  { term: "Year 1 - 1st Sem", subject: "Art Appreciation", grade: 1.2, equivalent: "98%" },
  { term: "Year 1 - 1st Sem", subject: "Computer Science Fundamentals", grade: 1.0, equivalent: "100%" },
  { term: "Year 1 - 1st Sem", subject: "Computer Programming 1", grade: 1.0, equivalent: "100%" },
  { term: "Year 1 - 1st Sem", subject: "Group Guidance 1", grade: 1.1, equivalent: "99%" },
  { term: "Year 1 - 1st Sem", subject: "Lasallian Spirituality", grade: 1.2, equivalent: "98%" },
  { term: "Year 1 - 1st Sem", subject: "Mathematics in the Modern World", grade: 1.0, equivalent: "100%" },
  { term: "Year 1 - 1st Sem", subject: "Purposive Communication", grade: 1.2, equivalent: "98%" },
  { term: "Year 1 - 1st Sem", subject: "Wellness and Fitness", grade: 1.1, equivalent: "99%" },
  { term: "Year 1 - 1st Sem", subject: "Science, Technology and Society", grade: 1.2, equivalent: "98%" },
  { term: "Year 1 - 2nd Sem", subject: "Computer Programming 2", grade: 1.0, equivalent: "100%" },
  { term: "Year 1 - 2nd Sem", subject: "2D Game Art", grade: 1.1, equivalent: "99%" },
  { term: "Year 1 - 2nd Sem", subject: "Ethics", grade: 1.1, equivalent: "99%" },
  { term: "Year 1 - 2nd Sem", subject: "Christian Morality", grade: 1.0, equivalent: "100%" },
  { term: "Year 1 - 2nd Sem", subject: "Logic", grade: 1.1, equivalent: "99%" },
  { term: "Year 1 - 2nd Sem", subject: "College Algebra", grade: 1.1, equivalent: "99%" },
  { term: "Year 1 - 2nd Sem", subject: "Team Sports and Rhythmic Activities", grade: 1.0, equivalent: "100%" },
  { term: "Year 1 - 2nd Sem", subject: "Reading Visual Art", grade: 1.1, equivalent: "99%" },
  { term: "Year 2 - 1st Sem", subject: "Data Structures and Algorithms", grade: 2.2, equivalent: "88%" },
  { term: "Year 2 - 1st Sem", subject: "Information Management", grade: 1.4, equivalent: "96%" },
  { term: "Year 2 - 1st Sem", subject: "Object Oriented Programming", grade: 1.4, equivalent: "96%" },
  { term: "Year 2 - 1st Sem", subject: "Discrete Structures", grade: 1.4, equivalent: "96%" },
  { term: "Year 2 - 1st Sem", subject: "System Analysis and Design", grade: 1.1, equivalent: "99%" },
  { term: "Year 2 - 1st Sem", subject: "Trigonometry", grade: 1.3, equivalent: "97%" },
  { term: "Year 2 - 1st Sem", subject: "National Service Training Program 1", grade: 1.0, equivalent: "100%" },
  { term: "Year 2 - 1st Sem", subject: "Swimming and Recreation", grade: 1.0, equivalent: "100%" },
  { term: "Year 2 - 2nd Sem", subject: "Applied Math for Games", grade: 1.5, equivalent: "95%" },
  { term: "Year 2 - 2nd Sem", subject: "Analysis and Design of Algorithms", grade: 1.3, equivalent: "97%" },
  { term: "Year 2 - 2nd Sem", subject: "Comp. Org. w/ Microcontroller Prog.", grade: 1.1, equivalent: "99%" },
  { term: "Year 2 - 2nd Sem", subject: "Software Engineering", grade: 1.2, equivalent: "98%" },
  { term: "Year 2 - 2nd Sem", subject: "Intro to Game Design and Development", grade: 1.1, equivalent: "99%" },
  { term: "Year 2 - 2nd Sem", subject: "Usability, HCI and User Interaction Design", grade: 1.2, equivalent: "98%" },
  { term: "Year 2 - 2nd Sem", subject: "Analytical Geometry and Calculus", grade: 2.2, equivalent: "88%" },
  { term: "Year 2 - 2nd Sem", subject: "National Service Training Program 2", grade: 1.1, equivalent: "99%" },
  { term: "Year 2 - 2nd Sem", subject: "Individual and Dual Sports", grade: 1.2, equivalent: "98%" },
  { term: "Year 3 - 1st Sem", subject: "Cloud Based Application Development", grade: 1.2, equivalent: "98%" },
  { term: "Year 3 - 1st Sem", subject: "CS Elective 1: Technopreneurship", grade: 1.3, equivalent: "97%" },
  { term: "Year 3 - 1st Sem", subject: "Automata Theory and Formal Languages", grade: 1.6, equivalent: "94%" },
  { term: "Year 3 - 1st Sem", subject: "3D Animation", grade: 1.0, equivalent: "100%" },
  { term: "Year 3 - 1st Sem", subject: "Game Programming 2: Advance Game Design", grade: 1.4, equivalent: "96%" },
  { term: "Year 3 - 1st Sem", subject: "GE Electives 3 (Gender and Society)", grade: 1.5, equivalent: "95%" },
  { term: "Year 3 - 1st Sem", subject: "Spirituality in the Workplace", grade: 1.5, equivalent: "95%" },
  { term: "Year 3 - 1st Sem", subject: "Understanding the Self", grade: 1.5, equivalent: "95%" },
  { term: "Year 3 - 2nd Sem", subject: "CS Elective 2: Game Technologies", grade: 1.2, equivalent: "98%" },
  { term: "Year 3 - 2nd Sem", subject: "Social Issues and Professional Practice", grade: 1.0, equivalent: "100%" },
  { term: "Year 3 - 2nd Sem", subject: "Web Development Technologies", grade: 1.0, equivalent: "100%" },
  { term: "Year 3 - 2nd Sem", subject: "Programming Languages", grade: 1.8, equivalent: "92%" },
  { term: "Year 3 - 2nd Sem", subject: "Thesis 1", grade: 1.4, equivalent: "96%" },
  { term: "Year 3 - 2nd Sem", subject: "Probability and Statistics", grade: 1.8, equivalent: "92%" },
  { term: "Year 3 - 2nd Sem", subject: "Public Speaking", grade: 1.1, equivalent: "99%" },
  { term: "Year 3 - Summer", subject: "Internship", grade: 1.7, equivalent: "93%" },
  { term: "Year 4 - 1st Sem", subject: "Networks and Communications", grade: 2.4, equivalent: "86%" },
  { term: "Year 4 - 1st Sem", subject: "Thesis 2", grade: 1.6, equivalent: "94%" },
  { term: "Year 4 - 1st Sem", subject: "Artificial Intelligence", grade: 1.5, equivalent: "95%" },
  { term: "Year 4 - 1st Sem", subject: "Data Science", grade: 1.7, equivalent: "93%" },
  { term: "Year 4 - 1st Sem", subject: "Great Books", grade: 1.2, equivalent: "98%" },
  { term: "Year 4 - 1st Sem", subject: "Life and Works of Rizal", grade: 1.2, equivalent: "98%" },
  { term: "Year 4 - 2nd Sem", subject: "CS Elective 3: Machine Learning", grade: 1.7, equivalent: "93%" },
  { term: "Year 4 - 2nd Sem", subject: "Operating System", grade: 2.1, equivalent: "89%" },
  { term: "Year 4 - 2nd Sem", subject: "Information Assurance and Security", grade: 1.1, equivalent: "99%" },
  { term: "Year 4 - 2nd Sem", subject: "Mobile-based Application Development", grade: 1.7, equivalent: "93%" },
  { term: "Year 4 - 2nd Sem", subject: "Emerging Trends in Computing", grade: 1.9, equivalent: "91%" },
  { term: "Year 4 - 2nd Sem", subject: "The Contemporary World", grade: 1.2, equivalent: "98%" },
  { term: "Year 4 - 2nd Sem", subject: "Readings in Philippine History", grade: 1.5, equivalent: "95%" },
];

const accolades = {
  college: {
    honors: [
      "CUM LAUDE with an OVERALL GWA: 1.3 (97%)",
      "College Awardee - Outstanding Intern Award",
      "Rank 1 - Highest GWA across all colleges and year levels with 7,042 students",
    ],
    deansList: [
      "1st Year, 1st Semester - First Honors Deans' List",
      "1st Year, 2nd Semester - First Honors Deans' List",
      "2nd Year, 1st Semester - First Honors Deans' List",
      "2nd Year, 2nd Semester - First Honors Deans' List",
      "3rd Year, 1st Semester - First Honors Deans' List",
      "3rd Year, 2nd Semester - First Honors Deans' List",
      "4th Year, 1st Semester - First Honors Deans' List",
      "4th Year, 2nd Semester - First Honors Deans' List",
    ],
    awards: [
      "Outstanding Intern College Award – Seniors' Recognition Rites (2025)",
      "Google Developer Groups on Campus USLS - Legacy Builder Award (2025)",
      "Best in 3D Game – Game On USLS (2024)",
      "Best in Mobile Game – Game On USLS (2024)",
      "Best in Character and Asset Design – Game On USLS (2024)",
      "Best in 2D Game Design – Game On USLS (2024)",
      "Best in 2D Game – Game On USLS (2024)",
      "Best in Game Concept – Game On USLS (2024)",
      "Best in Sound Design – Game On USLS (2024)",
      "Top 10 – Philippine Creative Awards for Animation and Games (2024)",
      "Best in Art Direction – Philippine Creative Awards (2024)",
      "Most Outstanding Student in Visual Arts – Animo Grand Cup (2023)",
      "Most Outstanding Student in Student Service – Corps d' Elite (2023)",
      "Most Outstanding Special Interest Club President – Corps d' Elite (2023)",
      "Role Model of the Year – Google Awards (2023)",
      "Google Fellow of the Year – Google Awards (2023)",
      "Distinguished Achievement Award for External Leadership (2023)",
      "Best Thesis Project Presenters – CS Department (2023)",
      "Best Web Game Technologies Project Concept (2023)",
      "Most Outstanding Student in Visual Arts – Corps d' Elite Finalist (2022)",
      "Google Career Certificate Scholar (2022)",
    ],
    affiliations: [
      "Creatives Co-head, Google Developer Groups Bacolod (2022–2025)",
      "CEO & Organizer, Google Developer Groups on Campus USLS (2024–2025)",
      "Mentor, CAMPUS DEVCON Student Ambassadors (2024)",
      "Student Representative, CS Program Advisory Council (2023–2024)",
      "President, DEVCON Bacolod (2024–2025)",
      "Acting President & Volunteer, DEVCON Bacolod (2023)",
      "Creatives & Marketing Intern, Armada Brands (2024)",
      "CEO & Lead, Google Developer Student Clubs USLS (2022–2023)",
      "Editor in Chief, Tigris (2022–2023)",
      "Vice President, Google Developer Student Clubs USLS (2021–2022)",
    ],
  },
  seniorHigh: {
    honors: ["With Highest Honors", "Principal's Distinction Award", "Licean Scholarship Grantee", "Best Capstone Project"],
    awards: ["Most Outstanding Student in Culture and Arts – Laurier de La Salle (2021)"],
  },
  juniorHigh: {
    honors: ["First Honors (Rank 1)", "Best in Math", "Best in English", "Best in Filipino", "Best in Science", "Best in Computer"],
    awards: ["Sen. Manny Villar Sipag Award", "PRISSAAP Best Leader", "Scrabble Champion", "Battle of the Bands Champion"],
  },
  elementary: {
    honors: ["First Honors (Rank 1)", "Best in English", "Best in Science", "Best in Math"],
    awards: ["Computer Wizard", "Artist of the Year", "Singer of the Year", "Most Outstanding Pupil – PRISSAAP Region VI"],
  },
  certifications: { google: 11, canva: 3, ibm: 1, microsoft: 7 },
};

function GradesModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLegend, setShowLegend] = useState(false);

  const filteredGrades = useMemo(() => {
    if (!searchQuery.trim()) return collegeGrades;
    const query = searchQuery.toLowerCase();
    return collegeGrades.filter(
      (g) =>
        g.subject.toLowerCase().includes(query) ||
        g.term.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Group grades by term
  const groupedGrades = useMemo(() => {
    const groups: Record<string, typeof collegeGrades> = {};
    filteredGrades.forEach((grade) => {
      if (!groups[grade.term]) groups[grade.term] = [];
      groups[grade.term].push(grade);
    });
    return groups;
  }, [filteredGrades]);

  const getGradeColor = (grade: number) => {
    if (grade <= 1.0) return "text-emerald-400 bg-emerald-500/20";
    if (grade <= 1.5) return "text-green-400 bg-green-500/20";
    if (grade <= 2.0) return "text-blue-400 bg-blue-500/20";
    return "text-yellow-400 bg-yellow-500/20";
  };

  // Stats
  const perfectGrades = collegeGrades.filter((g) => g.grade === 1.0).length;
  const avgGrade = (collegeGrades.reduce((sum, g) => sum + g.grade, 0) / collegeGrades.length).toFixed(2);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-2 left-2 right-2 bottom-2 sm:top-4 sm:left-4 sm:right-4 sm:bottom-4 md:top-8 md:left-[10%] md:right-[10%] md:bottom-8 lg:top-12 lg:left-[15%] lg:right-[15%] lg:bottom-12 bg-zinc-900 border border-white/10 rounded-2xl z-50 overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Compact Header with Search */}
            <div className="flex-shrink-0 p-3 sm:p-4 border-b border-white/10 bg-zinc-900/80">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-bold truncate">College Transcript</h2>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">BS Computer Science • USLS • 2021-2025</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search subjects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Compact Stats + Legend Toggle */}
            <div className="flex-shrink-0 px-3 sm:px-4 py-2 border-b border-white/10 bg-zinc-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-center">
                    <span className="text-lg sm:text-xl font-bold text-blue-400">{avgGrade}</span>
                    <span className="text-[10px] text-muted-foreground ml-1">GWA</span>
                  </div>
                  <div className="text-center">
                    <span className="text-lg sm:text-xl font-bold text-emerald-400">{perfectGrades}</span>
                    <span className="text-[10px] text-muted-foreground ml-1">Perfect</span>
                  </div>
                  <div className="text-center">
                    <span className="text-lg sm:text-xl font-bold text-zinc-400">{collegeGrades.length}</span>
                    <span className="text-[10px] text-muted-foreground ml-1">Total</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowLegend(!showLegend)}
                  className={`text-[10px] sm:text-xs px-2 py-1 rounded-md transition-colors ${showLegend ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-muted-foreground hover:bg-white/10'}`}
                >
                  {showLegend ? 'Hide' : 'Legend'}
                </button>
              </div>
              
              {/* Collapsible Legend */}
              <AnimatePresence>
                {showLegend && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 mt-2 border-t border-white/5">
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] sm:text-xs">
                        <span><span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>1.0 = 100%</span>
                        <span><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>1.1-1.5 = 95-99%</span>
                        <span><span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>1.6-2.0 = 88-94%</span>
                        <span><span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>2.1+ = 85-87%</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground/70 mt-1">Philippine grading: 1.0 is highest (A+), lower GWA = better</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Column Headers */}
            <div className="flex-shrink-0 px-3 sm:px-4 py-2 border-b border-white/5 bg-zinc-800/30">
              <div className="flex items-center text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">
                <span className="flex-1">Subject</span>
                <span className="w-12 text-center">Grade</span>
                <span className="w-12 text-right">%</span>
              </div>
            </div>

            {/* Grades List - Scrollable */}
            <div className="flex-1 overflow-y-auto min-h-0">
              {Object.entries(groupedGrades).map(([term, grades]) => (
                <div key={term}>
                  <div className="sticky top-0 z-10 px-3 sm:px-4 py-2 bg-zinc-800/90 backdrop-blur-sm border-b border-white/5">
                    <span className="text-xs font-medium text-blue-400">{term}</span>
                    <span className="text-[10px] text-muted-foreground ml-2">({grades.length} subjects)</span>
                  </div>
                  <div className="divide-y divide-white/5">
                    {grades.map((grade, idx) => (
                      <div
                        key={`${term}-${idx}`}
                        className="flex items-center px-3 sm:px-4 py-2.5 hover:bg-white/[0.03] transition-colors"
                      >
                        <span className="flex-1 text-xs sm:text-sm pr-2 truncate">{grade.subject}</span>
                        <span className={`w-12 text-center text-xs font-bold px-1.5 py-0.5 rounded ${getGradeColor(grade.grade)}`}>
                          {grade.grade.toFixed(1)}
                        </span>
                        <span className="w-12 text-right text-xs text-muted-foreground">
                          {grade.equivalent}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {filteredGrades.length === 0 && (
                <div className="text-center py-12 px-4">
                  <Search className="w-8 h-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No subjects found</p>
                </div>
              )}
            </div>

            {/* Compact Footer */}
            <div className="flex-shrink-0 px-3 sm:px-4 py-2 border-t border-white/10 bg-zinc-800/50">
              <p className="text-[10px] text-center text-muted-foreground">
                University of St. La Salle • Official Academic Records
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

import { useCopyMode } from "@/components/copy-mode-provider";

export default function AboutPage() {
  const { copyMode } = useCopyMode();
  const [mounted, setMounted] = useState(false);
  const [showGrades, setShowGrades] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showGrades) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showGrades]);

  if (!mounted) return null;

  return (
    <div className="w-full min-h-screen bg-background">
      <MacOSMenuBar appName="About Gian Aibo" />

      <PixelHeader
        title="Gian Aibo C. Boyero"
        subtitle={copyMode === "plain" 
          ? "I’m early in my web development career, but I ship projects quickly and care a lot about polish. Here’s my background."
          : "Fresh Computer Science Graduate • Cum Laude • Rank 1 of 7,042 Students"}
        colors={["#3b82f6", "#10b981", "#f59e0b", "#ec4899"]}
        categoryIcon={<GraduationCap className="size-4" />}
        categoryText="Class 2025"
        maxWidth="max-w-7xl"
      />

      {/* Quick Stats */}
      <section className="px-4 sm:px-6 lg:px-10 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: copyMode === "plain" ? "Reliability" : "GWA", value: copyMode === "plain" ? "100%" : "1.3", sub: copyMode === "plain" ? "Commitment" : "97%" },
              { label: copyMode === "plain" ? "Performance" : "Rank", value: copyMode === "plain" ? "Top" : "#1", sub: copyMode === "plain" ? "Quality" : "of 7,042" },
              { label: "Honors", value: "Cum Laude", sub: "2025" },
              { label: "Certifications", value: "22+", sub: "Total" },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl border border-white/10 backdrop-blur-xl bg-white/5 dark:bg-white/[0.03] text-center"
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
                <div className="text-xs text-muted-foreground/70 mt-1">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education - 4 Columns */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            Formal Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2 bg-blue-500/10 rounded-2xl p-6 border border-blue-500/30 dark:border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <h3 className="text-lg font-bold">College - USLS</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">BS Computer Science (2021-2025)</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">Cum Laude</span>
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold">GWA: 1.3 / 97%</span>
              </div>
              <button
                onClick={() => setShowGrades(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-sm font-medium transition-all hover:scale-105 active:scale-95"
              >
                <FileText className="w-4 h-4" />
                View My Grades
              </button>
            </div>
            <div className="bg-green-500/10 rounded-2xl p-6 border border-green-500/30 dark:border-green-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <h3 className="text-lg font-bold">Senior High</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">STEM • Liceo De La Salle</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-semibold">Highest Honors</span>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-xs font-semibold">98%</span>
              </div>
            </div>
            <div className="bg-orange-500/10 rounded-2xl p-6 border border-orange-500/30 dark:border-orange-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full" />
                <h3 className="text-lg font-bold">Junior High</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Holy Infant Academy</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold">Rank 1</span>
                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold">Highest Honors</span>
                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-semibold">98.2%</span>
              </div>
            </div>
            <div className="bg-pink-500/10 rounded-2xl p-6 border border-pink-500/30 dark:border-pink-500/20">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-pink-500 rounded-full" />
                <h3 className="text-lg font-bold">Primary School</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">Holy Infant Academy</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-semibold">Valedictorian</span>
                <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-semibold">97.4%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards - 3 Columns */}
      <section className="px-4 sm:px-6 lg:px-10 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Awards & Achievements
          </h2>
          
          <h3 className="text-xl font-bold mb-6 text-blue-600 dark:text-blue-400">College</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            <div>
              <h4 className="text-sm font-semibold mb-4 flex items-center gap-2"><Award className="w-4 h-4" /> Honors</h4>
              <div className="space-y-3">
                {accolades.college.honors.map((h, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5 text-sm leading-relaxed">{h}</div>
                ))}
              </div>
            </div>
            {copyMode !== "plain" && (
              <>
                <div>
                  <h4 className="text-sm font-semibold mb-4 flex items-center gap-2"><Trophy className="w-4 h-4" /> Awards</h4>
                  <div className="space-y-3">
                    {(expandedSections.collegeAwards ? accolades.college.awards : accolades.college.awards.slice(0, 5)).map((a, i) => (
                      <div key={i} className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-sm leading-relaxed">{a}</div>
                    ))}
                  </div>
                  {accolades.college.awards.length > 5 && (
                    <button 
                      onClick={() => toggleSection('collegeAwards')}
                      className="mt-4 w-full py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium transition-all"
                    >
                      {expandedSections.collegeAwards ? 'Show Less' : `Show ${accolades.college.awards.length - 5} More`}
                    </button>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-4 flex items-center gap-2"><Users className="w-4 h-4" /> Leadership</h4>
                  <div className="space-y-3">
                    {(expandedSections.collegeLeadership ? accolades.college.affiliations : accolades.college.affiliations.slice(0, 5)).map((a, i) => (
                      <div key={i} className="p-4 rounded-xl border border-white/10 bg-white/5 text-sm leading-relaxed">{a}</div>
                    ))}
                  </div>
                  {accolades.college.affiliations.length > 5 && (
                    <button 
                      onClick={() => toggleSection('collegeLeadership')}
                      className="mt-4 w-full py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-medium transition-all"
                    >
                      {expandedSections.collegeLeadership ? 'Show Less' : `Show ${accolades.college.affiliations.length - 5} More`}
                    </button>
                  )}
                </div>
              </>
            )}
            {copyMode === "plain" && (
              <div className="col-span-2">
                <h4 className="text-sm font-semibold mb-4 flex items-center gap-2"><Users className="w-4 h-4" /> Key Roles & Recognition</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                    <p className="font-bold text-blue-400 mb-2">Leadership</p>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>• President, DEVCON Bacolod</li>
                      <li>• CEO, Google Developer Groups (Campus)</li>
                      <li>• Creatives Lead, Google Developer Groups</li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                    <p className="font-bold text-blue-400 mb-2">Top Awards</p>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>• Outstanding Intern Award &apos;25</li>
                      <li>• Google Fellow of the Year &apos;23</li>
                      <li>• Best in Art Direction (PH Creative Awards)</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Other Levels - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Senior High */}
            <div className="p-6 rounded-2xl border border-green-500/20 bg-green-500/5">
              <h3 className="text-lg font-bold mb-5 text-green-600 dark:text-green-400 flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                Senior High
              </h3>
              <div className="space-y-3">
                {(expandedSections.seniorHigh 
                  ? [...accolades.seniorHigh.honors, ...accolades.seniorHigh.awards]
                  : [...accolades.seniorHigh.honors, ...accolades.seniorHigh.awards].slice(0, 3)
                ).map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/5 dark:bg-white/[0.03] text-sm leading-relaxed">{item}</div>
                ))}
              </div>
              {[...accolades.seniorHigh.honors, ...accolades.seniorHigh.awards].length > 3 && (
                <button 
                  onClick={() => toggleSection('seniorHigh')}
                  className="mt-4 w-full py-2 px-3 rounded-lg border border-green-500/20 bg-green-500/10 hover:bg-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium transition-all"
                >
                  {expandedSections.seniorHigh ? 'Show Less' : `Show ${[...accolades.seniorHigh.honors, ...accolades.seniorHigh.awards].length - 3} More`}
                </button>
              )}
            </div>

            {/* Junior High */}
            <div className="p-6 rounded-2xl border border-orange-500/20 bg-orange-500/5">
              <h3 className="text-lg font-bold mb-5 text-orange-600 dark:text-orange-400 flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
                Junior High
              </h3>
              <div className="space-y-3">
                {(expandedSections.juniorHigh 
                  ? [...accolades.juniorHigh.honors, ...accolades.juniorHigh.awards]
                  : [...accolades.juniorHigh.honors, ...accolades.juniorHigh.awards].slice(0, 3)
                ).map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/5 dark:bg-white/[0.03] text-sm leading-relaxed">{item}</div>
                ))}
              </div>
              {[...accolades.juniorHigh.honors, ...accolades.juniorHigh.awards].length > 3 && (
                <button 
                  onClick={() => toggleSection('juniorHigh')}
                  className="mt-4 w-full py-2 px-3 rounded-lg border border-orange-500/20 bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 text-sm font-medium transition-all"
                >
                  {expandedSections.juniorHigh ? 'Show Less' : `Show ${[...accolades.juniorHigh.honors, ...accolades.juniorHigh.awards].length - 3} More`}
                </button>
              )}
            </div>

            {/* Primary School */}
            <div className="p-6 rounded-2xl border border-pink-500/20 bg-pink-500/5">
              <h3 className="text-lg font-bold mb-5 text-pink-600 dark:text-pink-400 flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-pink-500 rounded-full" />
                Primary School
              </h3>
              <div className="space-y-3">
                {(expandedSections.elementary 
                  ? [...accolades.elementary.honors, ...accolades.elementary.awards]
                  : [...accolades.elementary.honors, ...accolades.elementary.awards].slice(0, 3)
                ).map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/5 dark:bg-white/[0.03] text-sm leading-relaxed">{item}</div>
                ))}
              </div>
              {[...accolades.elementary.honors, ...accolades.elementary.awards].length > 3 && (
                <button 
                  onClick={() => toggleSection('elementary')}
                  className="mt-4 w-full py-2 px-3 rounded-lg border border-pink-500/20 bg-pink-500/10 hover:bg-pink-500/20 text-pink-600 dark:text-pink-400 text-sm font-medium transition-all"
                >
                  {expandedSections.elementary ? 'Show Less' : `Show ${[...accolades.elementary.honors, ...accolades.elementary.awards].length - 3} More`}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Contact - 2 Columns */}
      <section className="px-4 sm:px-6 lg:px-10 py-12 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-blue-500" />
                Certifications
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Google", count: accolades.certifications.google },
                  { name: "Canva", count: accolades.certifications.canva },
                  { name: "IBM", count: accolades.certifications.ibm },
                  { name: "Microsoft", count: accolades.certifications.microsoft },
                ].map((cert) => (
                  <div key={cert.name} className="p-5 rounded-2xl border border-white/10 bg-white/5 text-center">
                    <div className="text-3xl font-bold mb-1">{cert.count}</div>
                    <div className="text-sm text-muted-foreground">{cert.name}</div>
                  </div>
                ))}
              </div>
              <p className="text-center mt-4 text-sm text-muted-foreground">
                View on <a href="https://linkedin.com/in/aiboboyero" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">LinkedIn</a>
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">Let&apos;s Connect</h2>
              <div className="space-y-4">
                <a href="mailto:gianaibo.dev@gmail.com" className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <div>
                    <div className="font-semibold text-sm">Email</div>
                    <div className="text-xs text-muted-foreground">gianaibo.dev@gmail.com</div>
                  </div>
                </a>
                <a href="tel:+639626442911" className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                  <Phone className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-semibold text-sm">Phone</div>
                    <div className="text-xs text-muted-foreground">+63 962 644 2911</div>
                  </div>
                </a>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/aiboboyero" },
                    { icon: Facebook, label: "Facebook", href: "https://facebook.com/gianheybo" },
                    { icon: Instagram, label: "Instagram", href: "https://instagram.com/gianheybo" },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                      <s.icon className="w-5 h-5" />
                      <span className="text-xs">{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Grades Modal */}
      <GradesModal isOpen={showGrades} onClose={() => setShowGrades(false)} />
    </div>
  );
}
