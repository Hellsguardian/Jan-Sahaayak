import React, { useState, useEffect } from 'react';
import { FileText, RefreshCw, CheckCircle2, TrendingUp, Info } from 'lucide-react';

interface CivicPulseProps {
  reportedCount?: number;
  processingCount?: number;
  solvedCount?: number;
  weeklyResolved?: number;
  onFilterClick?: (status: 'Reported' | 'Processing' | 'Resolved' | 'Solved') => void;
}

export const CivicPulse: React.FC<CivicPulseProps> = ({
  reportedCount = 24,
  processingCount = 12,
  solvedCount = 87,
  weeklyResolved = 8,
  onFilterClick
}) => {
  const [displayReported, setDisplayReported] = useState(0);
  const [displayProcessing, setDisplayProcessing] = useState(0);
  const [displaySolved, setDisplaySolved] = useState(0);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Animated counter on mount or prop change
  useEffect(() => {
    const duration = 900; // ms
    const startTime = performance.now();

    const animateCounts = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayReported(Math.floor(eased * reportedCount));
      setDisplayProcessing(Math.floor(eased * processingCount));
      setDisplaySolved(Math.floor(eased * solvedCount));

      if (progress < 1) {
        requestAnimationFrame(animateCounts);
      } else {
        setDisplayReported(reportedCount);
        setDisplayProcessing(processingCount);
        setDisplaySolved(solvedCount);
      }
    };

    requestAnimationFrame(animateCounts);
  }, [reportedCount, processingCount, solvedCount]);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-[24px] border border-purple-100/90 p-3.5 sm:p-4.5 shadow-lg shadow-purple-900/5 relative transition-all hover:border-purple-200/90">
      
      {/* COMPACT TITLE HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4 pb-2.5 mb-2.5 border-b border-purple-100/70">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#6546D9] animate-pulse" />
          <h3 className="text-sm sm:text-base font-extrabold text-[#111A35] tracking-tight">
            Your Civic Pulse <span className="text-[#6546D9] font-bold">— Your Area</span>
          </h3>
          <span className="hidden md:inline-block text-[11px] text-[#5D6785] font-normal pl-2 border-l border-purple-100">
            Real-time status of problems in your area
          </span>
        </div>

        <div className="text-[11px] text-[#5D6785] font-medium flex items-center gap-1.5 bg-[#F4F1FF]/80 px-2.5 py-0.5 sm:py-1 rounded-full border border-purple-100/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Live Area Updates</span>
        </div>
      </div>

      {/* COMPACT 4-COLUMN GRID (3 STATUS METRICS + 1 WEEKLY PROGRESS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        
        {/* 1. REPORTED METRIC MINI-CARD */}
        <div
          onClick={() => onFilterClick?.('Reported')}
          onMouseEnter={() => setActiveTooltip('reported')}
          onMouseLeave={() => setActiveTooltip(null)}
          className="relative group cursor-pointer bg-red-50/60 hover:bg-red-50/90 border border-red-200/80 hover:border-red-300 px-3.5 py-2.5 rounded-xl shadow-xs shadow-red-500/5 hover:shadow-md hover:shadow-red-500/10 transition-all duration-200 hover:-translate-y-[2px] flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl bg-[#EF3B35] text-white flex items-center justify-center shadow-md shadow-red-500/20 shrink-0 group-hover:scale-105 transition-transform">
              <FileText className="w-4.5 h-4.5 text-white" />
              {/* Soft pulsing red indicator dot */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-400 rounded-full border-2 border-white animate-ping" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#EF3B35] leading-none font-mono tracking-tight">
                {displayReported}
              </div>
              <div className="text-xs font-bold text-[#111A35] mt-0.5 group-hover:text-[#EF3B35] transition-colors">
                Reported
              </div>
            </div>
          </div>

          <Info className="w-3.5 h-3.5 text-red-300 group-hover:text-red-500 transition-colors opacity-70 group-hover:opacity-100" />

          {/* HOVER CONTEXTUAL TOOLTIP */}
          {activeTooltip === 'reported' && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#111A35] text-white text-[11px] font-medium px-3 py-1 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none">
              24 new civic issues reported in your area
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111A35] rotate-45" />
            </div>
          )}
        </div>

        {/* 2. PROCESSING METRIC MINI-CARD */}
        <div
          onClick={() => onFilterClick?.('Processing')}
          onMouseEnter={() => setActiveTooltip('processing')}
          onMouseLeave={() => setActiveTooltip(null)}
          className="relative group cursor-pointer bg-amber-50/60 hover:bg-amber-50/90 border border-amber-200/80 hover:border-amber-300 px-3.5 py-2.5 rounded-xl shadow-xs shadow-amber-500/5 hover:shadow-md hover:shadow-amber-500/10 transition-all duration-200 hover:-translate-y-[2px] flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F9B51B] text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0 group-hover:scale-105 transition-transform">
              <RefreshCw className="w-4.5 h-4.5 text-white group-hover:rotate-180 transition-transform duration-700" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#D97706] leading-none font-mono tracking-tight">
                {displayProcessing}
              </div>
              <div className="text-xs font-bold text-[#111A35] mt-0.5 group-hover:text-[#D97706] transition-colors">
                Processing
              </div>
            </div>
          </div>

          <Info className="w-3.5 h-3.5 text-amber-300 group-hover:text-amber-500 transition-colors opacity-70 group-hover:opacity-100" />

          {/* HOVER CONTEXTUAL TOOLTIP */}
          {activeTooltip === 'processing' && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#111A35] text-white text-[11px] font-medium px-3 py-1 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none">
              12 issues currently being worked on
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111A35] rotate-45" />
            </div>
          )}
        </div>

        {/* 3. SOLVED METRIC MINI-CARD */}
        <div
          onClick={() => onFilterClick?.('Solved')}
          onMouseEnter={() => setActiveTooltip('solved')}
          onMouseLeave={() => setActiveTooltip(null)}
          className="relative group cursor-pointer bg-emerald-50/60 hover:bg-emerald-50/90 border border-emerald-200/80 hover:border-emerald-300 px-3.5 py-2.5 rounded-xl shadow-xs shadow-emerald-500/5 hover:shadow-md hover:shadow-emerald-500/10 transition-all duration-200 hover:-translate-y-[2px] flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2DB45A] text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#2DB45A] leading-none font-mono tracking-tight">
                {displaySolved}
              </div>
              <div className="text-xs font-bold text-[#111A35] mt-0.5 group-hover:text-[#2DB45A] transition-colors">
                Solved
              </div>
            </div>
          </div>

          <Info className="w-3.5 h-3.5 text-emerald-300 group-hover:text-emerald-500 transition-colors opacity-70 group-hover:opacity-100" />

          {/* HOVER CONTEXTUAL TOOLTIP */}
          {activeTooltip === 'solved' && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#111A35] text-white text-[11px] font-medium px-3 py-1 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none">
              87 issues successfully resolved
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111A35] rotate-45" />
            </div>
          )}
        </div>

        {/* 4. WEEKLY PROGRESS INDICATOR CARD */}
        <div 
          onMouseEnter={() => setActiveTooltip('weekly')}
          onMouseLeave={() => setActiveTooltip(null)}
          className="relative group cursor-pointer bg-[#F4F1FF]/80 hover:bg-[#F4F1FF] border border-purple-200/80 hover:border-purple-300 px-3.5 py-2.5 rounded-xl shadow-xs shadow-purple-500/5 hover:shadow-md hover:shadow-purple-500/10 transition-all duration-200 hover:-translate-y-[2px] flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#6046E8] text-white flex items-center justify-center shadow-xs shrink-0">
                <TrendingUp className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span className="text-xs font-bold text-[#6046E8]">
                {weeklyResolved} resolved this week
              </span>
            </div>
            <span className="text-[10px] font-bold text-[#6046E8] bg-purple-200/70 px-1.5 py-0.5 rounded-md">
              +18%
            </span>
          </div>

          {/* MINI PROGRESS LINE */}
          <div className="w-full bg-purple-200/60 h-1.5 rounded-full overflow-hidden mt-1.5">
            <div className="bg-[#6046E8] h-full w-[78%] rounded-full transition-all duration-500 group-hover:w-[85%]" />
          </div>

          {/* HOVER TOOLTIP FOR WEEKLY PROGRESS */}
          {activeTooltip === 'weekly' && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#111A35] text-white text-[11px] font-medium px-3 py-1 rounded-lg shadow-xl whitespace-nowrap z-30 pointer-events-none">
              ↑ 18% faster resolution than last week
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#111A35] rotate-45" />
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

