import React, { useState, useEffect } from 'react';
import { GrievanceItem } from '../types';
import { CheckCircle2, ArrowRight, MapPin, Sparkles } from 'lucide-react';

interface RecentlyResolvedProps {
  resolvedList: GrievanceItem[];
  onViewResolvedClick: () => void;
  onOpenGrievanceDetail: (item: GrievanceItem) => void;
}

export const RecentlyResolved: React.FC<RecentlyResolvedProps> = ({
  resolvedList,
  onViewResolvedClick,
  onOpenGrievanceDetail
}) => {
  const [highlightIndex, setHighlightIndex] = useState<number | null>(0);
  const [hoveredVerifiedTooltip, setHoveredVerifiedTooltip] = useState(false);

  // Periodic subtle live feed highlight tick every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightIndex((prev) => (prev === null ? 0 : (prev + 1) % Math.min(resolvedList.length, 4)));
    }, 5000);
    return () => clearInterval(interval);
  }, [resolvedList.length]);

  return (
    <div className="bg-white rounded-[2.5rem] border-2 border-[#DCD1FF] p-5 sm:p-6 shadow-xl shadow-purple-900/5 h-full flex flex-col justify-between relative overflow-hidden group/feed">
      
      {/* ATMOSPHERIC PURPLE GLOW ACCENT */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#6546D9]/5 rounded-full blur-2xl pointer-events-none" />

      {/* HEADER */}
      <div className="flex items-center justify-between pb-3 border-b border-[#EEE9FF] relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#35B96B]"></span>
          </div>
          <h3 className="font-extrabold text-lg sm:text-xl text-[#171717] flex items-center gap-1.5">
            <span>Recently Resolved</span>
          </h3>
        </div>

        {/* VERIFIED BADGE WITH HOVER TOOLTIP */}
        <div 
          className="relative flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/90 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-2xs cursor-pointer hover:bg-emerald-100/80 transition-colors"
          onMouseEnter={() => setHoveredVerifiedTooltip(true)}
          onMouseLeave={() => setHoveredVerifiedTooltip(false)}
        >
          <Sparkles className="w-3 h-3 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span>VERIFIED FEED</span>

          {hoveredVerifiedTooltip && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-[#171717] text-white text-[10px] font-medium p-2.5 rounded-xl shadow-2xl z-50 border border-purple-400/30 animate-in fade-in zoom-in-95 duration-150">
              Resolution verified by civic authority & verified by on-site field photos.
            </div>
          )}
        </div>
      </div>

      {/* RECENTLY RESOLVED ROWS - LIVE ACTIVITY FEED */}
      <div className="flex-1 my-3 flex flex-col justify-start gap-2 sm:gap-2.5 overflow-y-auto pr-0.5 relative z-10">
        {resolvedList.slice(0, 4).map((item, idx) => {
          const isHighlighted = highlightIndex === idx;

          return (
            <button
              key={item.id}
              onClick={() => onOpenGrievanceDetail(item)}
              onMouseEnter={() => setHighlightIndex(idx)}
              className={`group w-full text-left p-3 rounded-2xl border transition-all duration-300 flex items-start justify-between gap-3 relative cursor-pointer ${
                isHighlighted 
                  ? 'bg-gradient-to-r from-[#F5F2FF] to-white border-[#6546D9]/40 shadow-md -translate-y-0.5 ring-2 ring-[#6546D9]/10' 
                  : 'bg-[#F9F8FF] hover:bg-white border-[#EEE9FF] hover:border-[#6546D9]/30 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={`p-1.5 rounded-xl transition-all duration-300 shrink-0 mt-0.5 ${
                  isHighlighted ? 'bg-[#35B96B] text-white shadow-sm scale-110' : 'bg-emerald-100 text-[#35B96B] group-hover:bg-[#35B96B] group-hover:text-white'
                }`}>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-extrabold text-xs sm:text-sm text-[#171717] group-hover:text-[#6546D9] transition-colors leading-snug truncate">
                      {item.title}
                    </p>
                    {isHighlighted && (
                      <span className="text-[9px] font-black text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded uppercase shrink-0 animate-pulse border border-emerald-200">
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-zinc-500 font-medium flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3 h-3 text-[#6546D9] shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 self-center">
                <span className="text-[10px] font-extrabold text-zinc-500 group-hover:text-[#171717] transition-colors">
                  {item.resolvedDate || 'Recent'}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#6546D9] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
              </div>
            </button>
          );
        })}
      </div>

      {/* FOOTER LINK */}
      <button
        onClick={onViewResolvedClick}
        className="w-full pt-2.5 border-t border-[#EEE9FF] flex items-center justify-center gap-2 text-xs font-extrabold text-[#6546D9] hover:text-[#5234c2] group/allbtn transition-colors relative z-10 cursor-pointer"
      >
        <span>View all resolved civic issues</span>
        <ArrowRight className="w-4 h-4 group-hover/allbtn:translate-x-1 transition-transform" />
      </button>

    </div>
  );
};

