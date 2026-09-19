import React, { useState } from 'react';
import { MapMarker, GrievanceStatus } from '../types';
import { 
  MapPin, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Navigation, 
  ThumbsUp,
  ExternalLink,
  LocateFixed
} from 'lucide-react';

interface IssuesMapProps {
  markers: MapMarker[];
  onSelectMarker: (marker: MapMarker) => void;
  onLodgeNewHere: () => void;
}

export const IssuesMap: React.FC<IssuesMapProps> = ({
  markers,
  onSelectMarker,
  onLodgeNewHere
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | GrievanceStatus>('All');
  const [activeMarker, setActiveMarker] = useState<MapMarker | null>(markers[0]);
  const [hoveredMarker, setHoveredMarker] = useState<MapMarker | null>(null);
  const [hoveredLegendStatus, setHoveredLegendStatus] = useState<GrievanceStatus | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const filteredMarkers = markers.filter(m => {
    if (m.category === 'Location') return true;
    if (selectedFilter === 'All') return true;
    return m.status === selectedFilter;
  });

  const getStatusColor = (status: GrievanceStatus | string) => {
    switch (status) {
      case 'Reported': return 'bg-[#FF4D4D] text-white border-white shadow-red-500/30';
      case 'Processing': return 'bg-[#FFC83D] text-[#171717] border-white shadow-amber-500/30';
      case 'Resolved': return 'bg-[#35B96B] text-white border-white shadow-emerald-500/40';
      default: return 'bg-[#6546D9] text-white border-[#FFD84D] shadow-purple-500/40';
    }
  };

  return (
    <div className="bg-white rounded-[32px] border-2 border-[#DCD1FF] p-4 sm:p-6 shadow-xl shadow-purple-900/5 h-full flex flex-col justify-between relative overflow-hidden group/mapcard">
      
      {/* MAP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6546D9] animate-ping" />
            <span className="text-[11px] font-black text-[#6546D9] uppercase tracking-wider">
              CIVIC MAP · SECTOR 12
            </span>
          </div>
          <h3 className="font-extrabold text-xl sm:text-2xl text-[#171717]">Issues Around You</h3>
        </div>

        {/* MAP FILTER TABS - SEGMENTED CONTROL */}
        <div className="flex items-center gap-1 bg-[#F5F2FF] p-1 rounded-2xl border border-[#E5DEFF] text-xs font-bold overflow-x-auto shadow-inner">
          {(['All', 'Reported', 'Processing', 'Resolved'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => {
                setSelectedFilter(tab);
                // Auto switch active marker if current isn't in filter
                if (tab !== 'All' && activeMarker && activeMarker.category !== 'Location' && activeMarker.status !== tab) {
                  const firstMatch = markers.find(m => m.category !== 'Location' && m.status === tab);
                  if (firstMatch) setActiveMarker(firstMatch);
                }
              }}
              className={`px-3 py-1.5 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedFilter === tab
                  ? 'bg-[#6546D9] text-white shadow-md shadow-purple-900/20 scale-[1.02]'
                  : 'text-zinc-600 hover:text-[#6546D9] hover:bg-purple-100/50'
              }`}
            >
              {tab === 'All' ? 'All Issues' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* CANVAS / STYLIZED MAP BODY */}
      <div className="relative flex-1 min-h-[360px] sm:min-h-[440px] bg-[#F1EEFB] rounded-2xl border-2 border-[#EEE9FF] overflow-hidden">
        
        {/* INNER SCALABLE MAP CONTAINER */}
        <div 
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
        >
          {/* STYLIZED VECTOR MAP GRAPHICS (ROADS, PARKS, BUILDINGS) */}
          <svg className="absolute inset-0 w-full h-full opacity-80" xmlns="http://www.w3.org/2000/svg">
            {/* Green Parks with subtle hover glow */}
            <rect x="5%" y="10%" width="22%" height="28%" rx="16" fill="#D2F3E1" className="hover:fill-[#C2EED5] transition-colors duration-300 cursor-pointer" />
            <rect x="70%" y="60%" width="25%" height="30%" rx="16" fill="#D2F3E1" className="hover:fill-[#C2EED5] transition-colors duration-300 cursor-pointer" />
            
            {/* Water Body */}
            <path d="M 0 320 Q 200 280 400 350 T 800 320" stroke="#B8E1FF" strokeWidth="24" fill="none" strokeLinecap="round" />

            {/* Main Avenues / Roads */}
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#FFFFFF" strokeWidth="18" />
            <line x1="45%" y1="0" x2="45%" y2="100%" stroke="#FFFFFF" strokeWidth="18" />
            <line x1="20%" y1="0" x2="80%" y2="100%" stroke="#FFFFFF" strokeWidth="10" strokeDasharray="6 4" />

            {/* Road Markings */}
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#FFD84D" strokeWidth="2" strokeDasharray="8 8" />
            <line x1="45%" y1="0" x2="45%" y2="100%" stroke="#FFD84D" strokeWidth="2" strokeDasharray="8 8" />

            {/* Building Blocks */}
            <rect x="10%" y="58%" width="12%" height="15%" rx="6" fill="#E2DCFC" className="hover:fill-[#D8CFFE] transition-colors cursor-pointer" />
            <rect x="26%" y="58%" width="14%" height="15%" rx="6" fill="#E2DCFC" className="hover:fill-[#D8CFFE] transition-colors cursor-pointer" />
            <rect x="52%" y="15%" width="15%" height="25%" rx="6" fill="#E2DCFC" className="hover:fill-[#D8CFFE] transition-colors cursor-pointer" />
            <rect x="72%" y="15%" width="18%" height="20%" rx="6" fill="#E2DCFC" className="hover:fill-[#D8CFFE] transition-colors cursor-pointer" />
            <rect x="52%" y="60%" width="14%" height="25%" rx="6" fill="#E2DCFC" className="hover:fill-[#D8CFFE] transition-colors cursor-pointer" />
          </svg>

          {/* CLICKABLE MAP MARKERS WITH IDLE ANIMATIONS & HOVER TOOLTIPS */}
          {filteredMarkers.map((marker) => {
            const isSelected = activeMarker?.id === marker.id;
            const isUserLoc = marker.category === 'Location';
            const isLegendHighlighted = hoveredLegendStatus ? marker.status === hoveredLegendStatus : true;
            const isMutedByLegend = hoveredLegendStatus && !isLegendHighlighted && !isUserLoc;

            return (
              <div
                key={marker.id}
                style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group/marker transition-all duration-300 ${
                  isMutedByLegend ? 'opacity-30 scale-90' : 'opacity-100'
                }`}
                onMouseEnter={() => setHoveredMarker(marker)}
                onMouseLeave={() => setHoveredMarker(null)}
              >
                {/* MARKER BUTTON */}
                <button
                  onClick={() => {
                    setActiveMarker(marker);
                    onSelectMarker(marker);
                  }}
                  className={`relative transition-all duration-300 focus:outline-none cursor-pointer ${
                    isSelected ? 'scale-125 z-30 ring-4 ring-[#6546D9]/20 rounded-full' : 'hover:scale-115'
                  }`}
                >
                  {isUserLoc ? (
                    <div className="relative flex items-center justify-center">
                      <span className="w-8 h-8 rounded-full bg-[#6546D9]/30 animate-ping absolute" />
                      <div className="w-8 h-8 rounded-full bg-[#6546D9] text-white flex items-center justify-center border-2 border-white shadow-xl shadow-purple-900/30">
                        <Navigation className="w-4 h-4 text-[#FFD84D]" />
                      </div>
                    </div>
                  ) : (
                    <div className={`relative p-2 rounded-full border-2 shadow-lg flex items-center justify-center transition-all duration-300 ${getStatusColor(marker.status)}`}>
                      
                      {/* IDLE PULSE RING ACCORDING TO STATUS */}
                      {marker.status === 'Reported' && (
                        <span className="absolute -inset-1.5 rounded-full bg-[#FF4D4D]/40 animate-ping pointer-events-none" />
                      )}
                      {marker.status === 'Processing' && (
                        <span className="absolute -inset-1 rounded-full bg-[#FFC83D]/50 animate-pulse pointer-events-none" />
                      )}
                      {marker.status === 'Resolved' && (
                        <span className="absolute -inset-1 rounded-full bg-[#35B96B]/30 blur-xs pointer-events-none" />
                      )}

                      <MapPin className="w-4 h-4 fill-current relative z-10" />
                    </div>
                  )}
                </button>

                {/* COMPACT HOVER TOOLTIP ON MARKER */}
                {!isUserLoc && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 w-48 bg-[#171717] text-white p-2.5 rounded-xl shadow-2xl pointer-events-none opacity-0 scale-95 group-hover/marker:opacity-100 group-hover/marker:scale-100 transition-all duration-200 z-40 border border-white/10">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
                        marker.status === 'Reported' ? 'bg-red-500/20 text-red-300' :
                        marker.status === 'Processing' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        ● {marker.status}
                      </span>
                      <span className="text-[9px] font-medium text-zinc-400">{marker.timeAgo}</span>
                    </div>
                    <p className="font-extrabold text-xs leading-tight line-clamp-1">{marker.title}</p>
                    <p className="text-[10px] text-zinc-400 mt-0.5">{marker.distance}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FLOATING MAP CONTROLS (+, -, RESET) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.35))}
            className="w-9 h-9 rounded-xl bg-white text-zinc-700 hover:text-[#6546D9] border border-purple-100 shadow-md flex items-center justify-center font-bold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer hover:shadow-lg"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.85))}
            className="w-9 h-9 rounded-xl bg-white text-zinc-700 hover:text-[#6546D9] border border-purple-100 shadow-md flex items-center justify-center font-bold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer hover:shadow-lg"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setZoomLevel(1);
              const locMarker = markers.find(m => m.category === 'Location');
              if (locMarker) setActiveMarker(locMarker);
            }}
            className="w-9 h-9 rounded-xl bg-white text-zinc-700 hover:text-[#6546D9] border border-purple-100 shadow-md flex items-center justify-center font-bold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer hover:shadow-lg"
            title="Center Map / Locate"
          >
            <LocateFixed className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* MAP FOOTER LEGEND WITH INTERACTIVE HOVER HIGHLIGHTING */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-bold pt-2 border-t border-purple-100">
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity p-1 rounded-lg"
            onMouseEnter={() => setHoveredLegendStatus('Reported')}
            onMouseLeave={() => setHoveredLegendStatus(null)}
          >
            <span className="w-3 h-3 rounded-full bg-[#FF4D4D] shadow-xs" />
            <span className="text-zinc-700">Reported</span>
          </div>
          <div 
            className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity p-1 rounded-lg"
            onMouseEnter={() => setHoveredLegendStatus('Processing')}
            onMouseLeave={() => setHoveredLegendStatus(null)}
          >
            <span className="w-3 h-3 rounded-full bg-[#FFC83D] shadow-xs" />
            <span className="text-zinc-700">Processing</span>
          </div>
          <div 
            className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity p-1 rounded-lg"
            onMouseEnter={() => setHoveredLegendStatus('Resolved')}
            onMouseLeave={() => setHoveredLegendStatus(null)}
          >
            <span className="w-3 h-3 rounded-full bg-[#35B96B] shadow-xs" />
            <span className="text-zinc-700">Resolved</span>
          </div>
        </div>

        {/* REPORT ISSUE ACTION BUTTON */}
        <button
          onClick={onLodgeNewHere}
          className="group/reportbtn text-[#6546D9] hover:text-[#5032bf] font-extrabold flex items-center gap-1.5 text-xs transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <Navigation className="w-3.5 h-3.5 text-[#6546D9] group-hover/reportbtn:translate-x-0.5 group-hover/reportbtn:-translate-y-0.5 transition-transform duration-200" />
          <span className="group-hover/reportbtn:underline decoration-[#6546D9] decoration-2 underline-offset-2">
            + Report issue at your current location
          </span>
        </button>
      </div>

    </div>
  );
};

