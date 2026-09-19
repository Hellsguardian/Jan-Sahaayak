import React, { useEffect, useRef, useState } from 'react';
import { IssuesMap } from './IssuesMap';
import { AreaScorecard } from './AreaScorecard';
import { RecentlyResolved } from './RecentlyResolved';
import { MapMarker, GrievanceItem } from '../types';

interface CivicAreaBentoProps {
  markers: MapMarker[];
  resolvedGrievances: GrievanceItem[];
  onSelectMarker: (marker: MapMarker) => void;
  onLodgeNewHere: () => void;
  onViewResolvedClick: () => void;
  onOpenGrievanceDetail: (item: GrievanceItem) => void;
}

export const CivicAreaBento: React.FC<CivicAreaBentoProps> = ({
  markers,
  resolvedGrievances,
  onSelectMarker,
  onLodgeNewHere,
  onViewResolvedClick,
  onOpenGrievanceDetail
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="civic-area" 
      ref={sectionRef}
      className={`py-8 sm:py-12 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1536px] w-full mx-auto transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-[0.98]'
      }`}
    >
      
      {/* SECTION HEADER */}
      <div className="mb-6 sm:mb-8 pl-1 sm:pl-2">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
            Civic <span className="text-[#6546D9]">Pulse</span>
          </h2>

          {/* SUBTLE ANIMATED LIVE PULSE BADGE */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-black tracking-widest uppercase shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span>LIVE</span>
          </div>
        </div>

        <p className="text-zinc-600 font-medium text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          Real-time neighborhood tracking, ward health scorecard, and verified resolution feed in your area.
        </p>
      </div>

      {/* BENTO CONTAINER - RESPONSIVE 2-COLUMN DESKTOP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: ISSUES MAP (APPROX 60% DESKTOP / 7 COLS) */}
        <div className={`lg:col-span-7 flex flex-col h-[750px] transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
        }`}>
          <IssuesMap
            markers={markers}
            onSelectMarker={onSelectMarker}
            onLodgeNewHere={onLodgeNewHere}
          />
        </div>

        {/* RIGHT COLUMN: STACKED SCORECARD & RESOLVED FEED (APPROX 40% DESKTOP / 5 COLS) */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-[750px]">
          
          {/* TOP CARD: AREA SCORECARD */}
          <div className={`flex-1 min-h-[290px] transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
          }`}>
            <AreaScorecard />
          </div>

          {/* BOTTOM CARD: RECENTLY RESOLVED */}
          <div className={`flex-1 min-h-[310px] transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
          }`}>
            <RecentlyResolved
              resolvedList={resolvedGrievances}
              onViewResolvedClick={onViewResolvedClick}
              onOpenGrievanceDetail={onOpenGrievanceDetail}
            />
          </div>

        </div>

      </div>

    </section>
  );
};

