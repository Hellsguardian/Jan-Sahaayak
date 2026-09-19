import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROBLEM_CATEGORIES } from '../data/civicData';
import { ProblemCard } from './ProblemCard';
import { Search, ArrowRight, CheckCircle2, ChevronUp, LayoutGrid, FileText, Activity } from 'lucide-react';

interface WhatNeedsFixingProps {
  onSelectCategory: (categoryTitle: string) => void;
  onOpenLodgeModal: () => void;
}

// TOP-RIGHT INTERACTIVE CIVIC JOURNEY CLUSTER (REPORT -> TRACK -> RESOLVE)
const GrievanceJourneyCluster: React.FC<{ onOpenLodgeModal: () => void }> = ({ onOpenLodgeModal }) => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  // Auto cycle through Report (0) -> Track (1) -> Resolve (2)
  useEffect(() => {
    if (hoveredStage !== null) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 3);
    }, 1800);
    return () => clearInterval(interval);
  }, [hoveredStage]);

  const currentStage = hoveredStage !== null ? hoveredStage : activeStage;

  const handleStageClick = (index: number) => {
    if (index === 0) {
      onOpenLodgeModal();
    } else if (index === 1) {
      document.getElementById('your-grievances')?.scrollIntoView({ behavior: 'smooth' });
    } else if (index === 2) {
      document.getElementById('community-impact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stages = [
    {
      id: 'report',
      label: 'Report',
      tooltip: 'Report a civic problem in 2 taps',
      bg: 'bg-[#DCCBFF]',
      activeBg: 'bg-[#d0bcfc]',
      text: 'text-[#111A35]',
      activeRing: 'ring-2 ring-[#6046E8]/40',
      icon: <FileText className="w-3.5 h-3.5 text-[#6046E8] shrink-0" />,
      dotColor: 'bg-[#6046E8]',
      x: 52,
      y: 32,
    },
    {
      id: 'track',
      label: 'Track',
      tooltip: 'Track your grievance status live',
      bg: 'bg-[#FFD34F]',
      activeBg: 'bg-[#f7c736]',
      text: 'text-[#111A35]',
      activeRing: 'ring-2 ring-[#111A35]/30',
      icon: <Activity className="w-3.5 h-3.5 text-[#111A35] shrink-0" />,
      dotColor: 'bg-[#111A35]',
      x: 162,
      y: 52,
    },
    {
      id: 'resolve',
      label: 'Resolve',
      tooltip: 'See verified community resolutions',
      bg: 'bg-[#6046E8]',
      activeBg: 'bg-[#5035d8]',
      text: 'text-white',
      activeRing: 'ring-2 ring-purple-300',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD34F] shrink-0" />,
      dotColor: 'bg-[#FFD34F]',
      x: 272,
      y: 32,
    },
  ];

  return (
    <div className="relative shrink-0 w-[330px] h-[88px] flex items-center justify-center">
      {/* SVG CONNECTING PATH & TRAVELING PULSE */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 330 88" fill="none">
        {/* Subtle curved dotted path connecting Report -> Track -> Resolve */}
        <path
          d="M 52 32 Q 107 72, 162 52 T 272 32"
          stroke="#C0B3FE"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        
        {/* Animated Traveling Glowing Dot along path */}
        <motion.circle
          r="5"
          fill={currentStage === 2 ? '#FFD34F' : '#6046E8'}
          className="shadow-md"
          animate={{
            cx: stages[currentStage].x,
            cy: stages[currentStage].y,
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        />
      </svg>

      {/* FLOATING PILLS */}
      <div className="relative z-10 w-full h-full">
        {stages.map((stage, index) => {
          const isActive = currentStage === index;
          return (
            <div
              key={stage.id}
              className="absolute transition-all duration-300"
              style={{
                left: index === 0 ? '6px' : index === 1 ? '118px' : '228px',
                top: index === 1 ? '34px' : '14px',
              }}
            >
              <button
                type="button"
                onClick={() => handleStageClick(index)}
                onMouseEnter={() => setHoveredStage(index)}
                onMouseLeave={() => setHoveredStage(null)}
                className={`relative group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-sm border border-white/50 cursor-pointer transition-all duration-300 ${
                  stage.bg
                } ${stage.text} ${
                  isActive
                    ? `${stage.activeBg} ${stage.activeRing} scale-105 shadow-md -translate-y-0.5`
                    : 'opacity-85 hover:opacity-100 hover:scale-102 hover:-translate-y-0.5'
                }`}
              >
                {stage.icon}
                <span>{stage.label}</span>

                {/* Subtle active pulse ping dot */}
                {isActive && (
                  <span className="relative flex h-2 w-2 ml-0.5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${stage.dotColor}`} />
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${stage.dotColor}`} />
                  </span>
                )}
              </button>

              {/* TOOLTIP ON HOVER / ACTIVE */}
              <AnimatePresence>
                {hoveredStage === index && (
                  <motion.div
                    initial={{ opacity: 0, y: index === 1 ? 6 : -6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: index === 1 ? 4 : -4, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#111A35] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-lg pointer-events-none z-30 ${
                      index === 1 ? 'top-full mt-1.5' : 'bottom-full mb-1.5'
                    }`}
                  >
                    {stage.tooltip}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 border-4 border-transparent ${
                        index === 1
                          ? 'bottom-full border-b-[#111A35]'
                          : 'top-full border-t-[#111A35]'
                      }`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const WhatNeedsFixing: React.FC<WhatNeedsFixingProps> = ({
  onSelectCategory,
  onOpenLodgeModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const isSearching = searchQuery.trim().length > 0;

  // Filter logic across all 16 categories
  const filteredCategories = PROBLEM_CATEGORIES.filter(cat => 
    cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.titleMain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.titleAccent.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const initial8 = PROBLEM_CATEGORIES.slice(0, 8);
  const remaining8 = PROBLEM_CATEGORIES.slice(8, 16);

  return (
    <section id="what-needs-fixing" className="pt-2 sm:pt-4 pb-8 sm:pb-12 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1536px] w-full mx-auto relative">
      
      {/* SECTION OUTER CONTAINER - LARGE ROUNDED CANVAS (REFERENCE MATCH) */}
      <div className="bg-white rounded-[36px] sm:rounded-[44px] border border-purple-100/90 shadow-2xl shadow-purple-950/5 p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        
        {/* CORNER DOTTED PATTERN ACCENTS */}
        <div className="absolute top-8 right-8 hidden sm:grid grid-cols-4 gap-2 opacity-20 text-[#6046E8] pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-current" />
          ))}
        </div>
        <div className="absolute bottom-8 left-8 hidden sm:grid grid-cols-4 gap-2 opacity-20 text-[#6046E8] pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-current" />
          ))}
        </div>

        {/* SECTION HEADER TOP AREA */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-[30px] w-full relative z-10">
          
          {/* LEFT: HEADING & SUBTEXT */}
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111A35] tracking-tight leading-[1.15]">
              Report a <span className="font-serif italic font-normal text-[#6046E8] underline decoration-purple-200 decoration-wavy decoration-2">local issue</span>
            </h2>
            <p className="text-slate-600 font-medium text-base sm:text-lg mt-0">
              Report a civic issue in just a few taps.
            </p>
          </div>

          {/* RIGHT: INTERACTIVE CIVIC JOURNEY CLUSTER (REPORT -> TRACK -> RESOLVE) */}
          <div className="hidden md:block">
            <GrievanceJourneyCluster onOpenLodgeModal={onOpenLodgeModal} />
          </div>
        </div>

        {/* SEARCH / FILTER INPUT BAR */}
        <div className="mb-10 relative z-10 max-w-md">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-purple-400 absolute left-4" />
            <input
              type="text"
              placeholder="Search category (e.g. pothole, streetlight, garbage)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[448px] max-w-full pl-11 pr-4 h-[45px] rounded-2xl bg-[#F7F5FF] border border-purple-100 text-sm font-semibold text-[#111A35] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#6046E8]/30 focus:bg-white shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs text-slate-400 hover:text-slate-600 font-bold px-2 py-1 rounded-md cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* MAIN CATEGORY GRID */}
        {isSearching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 relative z-10">
            {filteredCategories.map((category) => (
              <ProblemCard
                key={category.id}
                category={category}
                onSelectCategory={onSelectCategory}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 relative z-10">
            {/* Initial 8 cards */}
            {initial8.map((category) => (
              <ProblemCard
                key={category.id}
                category={category}
                onSelectCategory={onSelectCategory}
              />
            ))}

            {/* Remaining 8 cards with smooth expansion animation */}
            <AnimatePresence>
              {isExpanded && (
                <>
                  {remaining8.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: index * 0.04, 
                        ease: [0.22, 1, 0.36, 1] 
                      }}
                    >
                      <ProblemCard
                        category={category}
                        onSelectCategory={onSelectCategory}
                      />
                    </motion.div>
                  ))}
                </>
              )}
            </AnimatePresence>
          </div>
        )}

        {filteredCategories.length === 0 && isSearching && (
          <div className="text-center py-16 bg-[#F7F5FF] rounded-3xl border border-dashed border-purple-200 mt-6">
            <p className="text-slate-600 font-bold text-base">No categories match &quot;{searchQuery}&quot;</p>
            <p className="text-slate-400 text-xs mt-1">Try searching for potholes, streetlights, garbage, or water leakage.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-5 py-2.5 bg-[#6046E8] text-white text-xs font-bold rounded-full shadow-md hover:bg-[#5035d8] transition-colors cursor-pointer"
            >
              Show all 16 categories
            </button>
          </div>
        )}

        {/* CENTERED "SHOW ALL ISSUES" / "COLLAPSE ISSUES" CONTROL */}
        {!isSearching && (
          <div className="mt-8 flex justify-center relative z-10">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center gap-3 bg-[#F4F0FF] hover:bg-[#6046E8] text-[#6046E8] hover:text-white border border-purple-200/80 px-7 py-3.5 rounded-full text-xs sm:text-sm font-extrabold shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <div className="w-6 h-6 rounded-md bg-[#6046E8] group-hover:bg-white text-white group-hover:text-[#6046E8] flex items-center justify-center transition-colors">
                <LayoutGrid className="w-3.5 h-3.5" />
              </div>
              <span>{isExpanded ? 'Collapse Issues' : 'Show All Issues'}</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-[#6046E8] group-hover:text-white group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4 text-[#6046E8] group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
              )}
            </button>
          </div>
        )}

      </div>

    </section>
  );
};
