import React, { useEffect, useRef, useState } from 'react';
import { AREA_SCORE_ITEMS } from '../data/civicData';
import { TrendingUp, Info, Construction, Droplets, Trash2, Lightbulb, Waves } from 'lucide-react';

export const AreaScorecard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showStatTooltip, setShowStatTooltip] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Category tooltips map
  const CATEGORY_TOOLTIPS: Record<string, string> = {
    'Roads & Pavements': 'Good — primary road repairs prioritized and active in Sector 12.',
    'Water Quality & Supply': 'Optimal — regular purity testing and supply pressure maintained.',
    'Waste Management': 'Active — daily door-to-door garbage clearance ongoing.',
    'Street Lighting': 'Excellent — 91% of reported street-light outages resolved within 24 hours.',
    'Drainage & Stormwater': 'Under review — pre-monsoon desilting and storm drain cleanup active.'
  };

  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Calculate stroke dashoffset for 78% score (circumference = 2 * PI * 18 = ~113)
  const targetScore = 78;
  const strokeDasharray = 113;
  const strokeDashoffset = animated ? strokeDasharray * (1 - targetScore / 100) : strokeDasharray;

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Construction': return <Construction className="w-3.5 h-3.5 text-amber-300 shrink-0" />;
      case 'Droplets': return <Droplets className="w-3.5 h-3.5 text-blue-300 shrink-0" />;
      case 'Trash2': return <Trash2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />;
      case 'Lightbulb': return <Lightbulb className="w-3.5 h-3.5 text-yellow-300 shrink-0" />;
      case 'Waves': return <Waves className="w-3.5 h-3.5 text-rose-300 shrink-0" />;
      default: return null;
    }
  };

  return (
    <div 
      ref={cardRef} 
      className="bg-[#6546D9] text-white rounded-[2.5rem] p-5 sm:p-6 shadow-xl shadow-purple-950/20 h-full flex flex-col justify-between relative overflow-hidden group/scorecard"
    >
      {/* ATMOSPHERIC GLOW ACCENTS */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-400/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#FFD84D]/10 rounded-full blur-xl pointer-events-none" />

      {/* HEADER ROW */}
      <div className="flex items-center justify-between pb-3 border-b border-purple-400/30 relative z-10">
        <div>
          <span className="text-[10px] font-black tracking-widest uppercase text-[#FFD84D]">
            WARD 14 · SECTOR 12
          </span>
          <h3 className="font-extrabold text-xl text-white">Area Scorecard</h3>
        </div>

        {/* SCORE DISPLAY BADGE WITH CIRCULAR PROGRESS RING */}
        <div 
          className="relative flex items-center gap-2.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/20 hover:bg-white/15 transition-all cursor-pointer group/scorebadge"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          {/* CIRCULAR PROGRESS SVG */}
          <div className="relative w-9 h-9 flex items-center justify-center shrink-0">
            <svg className="w-9 h-9 -rotate-90 transform" viewBox="0 0 40 40">
              {/* Background ring */}
              <circle
                cx="20"
                cy="20"
                r="18"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="3.5"
                fill="transparent"
              />
              {/* Animated Progress ring */}
              <circle
                cx="20"
                cy="20"
                r="18"
                stroke="#FFD84D"
                strokeWidth="3.5"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <span className="absolute font-black text-xs text-white">78</span>
          </div>

          <div>
            <div className="flex items-center gap-1">
              <p className="text-[10px] font-black text-[#FFD84D] uppercase leading-none">Civic Score</p>
              <Info className="w-3 h-3 text-purple-200" />
            </div>
            <p className="text-[9px] font-bold text-emerald-300 leading-tight mt-0.5">★ Good Standing</p>
          </div>

          {/* TOOLTIP ON HOVER CIVIC SCORE */}
          {showInfo && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-[#171717] text-white text-[11px] font-medium p-3 rounded-xl shadow-2xl z-50 border border-purple-400/30 animate-in fade-in zoom-in-95 duration-200">
              Civic Score represents the overall health of reported civic issues and infrastructure maintenance in your ward.
            </div>
          )}
        </div>
      </div>

      {/* SERVICE PROGRESS BARS */}
      <div className="flex-1 my-3 flex flex-col justify-center gap-2 relative z-10">
        {AREA_SCORE_ITEMS.map((item, idx) => (
          <div 
            key={item.service} 
            className="group/row relative cursor-pointer"
            onMouseEnter={() => setHoveredCategory(item.service)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className="p-2 -mx-1 rounded-xl bg-white/5 hover:bg-white/12 border border-white/5 hover:border-white/15 transition-all duration-200">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-purple-100 group-hover/row:text-white transition-colors flex items-center gap-2 truncate">
                  {getServiceIcon(item.icon)}
                  <span className="truncate">{item.service}</span>
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
                    item.score >= 80 ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/30' :
                    item.score >= 65 ? 'bg-amber-500/25 text-amber-300 border border-amber-400/30' :
                    'bg-rose-500/25 text-rose-300 border border-rose-400/30'
                  }`}>
                    {item.score >= 80 ? 'Good' : item.score >= 65 ? 'Average' : 'Needs Action'}
                  </span>
                  <span className="text-[#FFD84D] font-extrabold text-xs">{item.score}%</span>
                </div>
              </div>
              
              <div className="w-full h-2 bg-purple-950/50 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out group-hover/row:brightness-110 group-hover/row:shadow-[0_0_8px_rgba(255,216,77,0.8)]"
                  style={{ 
                    width: animated ? `${item.score}%` : '0%', 
                    backgroundColor: item.color === '#FFC83D' ? '#FFD84D' : item.color 
                  }}
                />
              </div>
            </div>

            {/* CATEGORY HOVER TOOLTIP (Smart positioning to prevent top row overflow) */}
            {hoveredCategory === item.service && (
              <div className={`absolute left-0 z-50 bg-[#171717] text-white text-[10px] font-medium p-2.5 rounded-xl shadow-2xl border border-purple-400/30 animate-in fade-in zoom-in-95 duration-150 pointer-events-none w-64 ${
                idx === 0 ? 'top-full mt-1.5' : 'bottom-full mb-1.5'
              }`}>
                <p className="font-bold text-[#FFD84D] flex items-center gap-1.5">
                  {getServiceIcon(item.icon)}
                  <span>{item.service} ({item.score}%)</span>
                </p>
                <p className="text-zinc-300 mt-1 leading-normal">{CATEGORY_TOOLTIPS[item.service] || 'Performance index based on citizen resolution times.'}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER RESOLUTION STAT */}
      <div 
        className="relative bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 flex items-center justify-between text-xs font-bold text-white hover:bg-white/15 transition-all cursor-pointer relative z-10"
        onMouseEnter={() => setShowStatTooltip(true)}
        onMouseLeave={() => setShowStatTooltip(false)}
      >
        <div className="flex items-center gap-2 text-[#FFD84D]">
          <TrendingUp className="w-4 h-4 text-[#FFD84D] animate-bounce" style={{ animationDuration: '3s' }} />
          <span>78% resolved this month</span>
        </div>
        <span className="text-[10px] text-purple-200 font-bold bg-white/10 px-2 py-0.5 rounded-full">Updated today</span>

        {/* TOOLTIP ON HOVER STATISTIC */}
        {showStatTooltip && (
          <div className="absolute bottom-full left-0 mb-2 w-60 bg-[#171717] text-white text-[11px] font-medium p-2.5 rounded-xl shadow-2xl z-50 border border-purple-400/30 animate-in fade-in zoom-in-95 duration-200">
            Resolution rate improved by 8% compared with last month.
          </div>
        )}
      </div>

    </div>
  );
};

