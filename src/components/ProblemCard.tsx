import React from 'react';
import { ProblemCategory } from '../types';
import { 
  Cone, 
  Lightbulb, 
  Droplets, 
  Waves, 
  Trash2, 
  Footprints, 
  CircleDot, 
  ShieldAlert, 
  Pipette, 
  Construction, 
  Bath, 
  Dog, 
  Trees, 
  VolumeX, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface ProblemCardProps {
  category: ProblemCategory;
  onSelectCategory: (categoryTitle: string) => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  category,
  onSelectCategory
}) => {

  // Dynamic Lucide Icon Mapper with proper sizing
  const renderIcon = (name: string) => {
    const props = { className: "w-6 h-6 stroke-[2.2]" };
    switch (name) {
      case 'Cone': return <Cone {...props} className="w-6 h-6 text-[#6046E8]" />;
      case 'Lightbulb': return <Lightbulb {...props} className="w-6 h-6 text-[#6046E8]" />;
      case 'Droplets': return <Droplets {...props} className="w-6 h-6 text-[#111A35]" />;
      case 'Waves': return <Waves {...props} className="w-6 h-6 text-[#111A35]" />;
      case 'Trash2': return <Trash2 {...props} className="w-6 h-6 text-[#111A35]" />;
      case 'Footprints': return <Footprints {...props} className="w-6 h-6 text-[#111A35]" />;
      case 'CircleDot': return <CircleDot {...props} className="w-6 h-6 text-[#6046E8]" />;
      case 'ShieldAlert': return <ShieldAlert {...props} className="w-6 h-6 text-[#FFD34F]" />;
      case 'Pipette': return <Pipette {...props} className="w-6 h-6 text-[#111A35]" />;
      case 'Construction': return <Construction {...props} className="w-6 h-6 text-[#6046E8]" />;
      case 'Dumpster': return <Trash2 {...props} className="w-6 h-6 text-[#111A35]" />;
      case 'Bath': return <Bath {...props} className="w-6 h-6 text-[#111A35]" />;
      case 'Dog': return <Dog {...props} className="w-6 h-6 text-[#111A35]" />;
      case 'Trees': return <Trees {...props} className="w-6 h-6 text-[#111A35]" />;
      case 'VolumeX': return <VolumeX {...props} className="w-6 h-6 text-[#6046E8]" />;
      default: return <HelpCircle {...props} className="w-6 h-6 text-white" />;
    }
  };

  // High-Quality Custom SVG Illustrations tailored to each civic issue category
  const renderTopRightIllustration = (id: string) => {
    const baseClass = "w-28 h-28 opacity-30 group-hover:scale-105 group-hover:-rotate-2 transition-all duration-300 pointer-events-none";
    
    switch (id) {
      case 'potholes':
        return (
          <svg className={baseClass} viewBox="0 0 120 120" fill="none">
            {/* Pothole / Cracked Asphalt Illustration */}
            <path d="M 20 80 Q 50 70, 80 85 T 110 75" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M 10 95 Q 45 88, 75 100 T 115 90" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            {/* Crater outline */}
            <ellipse cx="70" cy="50" rx="32" ry="18" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="3" />
            {/* Fracture lines */}
            <path d="M 45 48 L 30 38 M 85 45 L 100 35 M 65 65 L 60 78 M 78 62 L 90 72" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'street-lights':
        return (
          <svg className={baseClass} viewBox="0 0 120 120" fill="none">
            {/* Street Lamp Pole & Curved Arm */}
            <path d="M 85 110 L 85 35 Q 85 15, 60 15 L 42 15" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            {/* Lamp Base Plate */}
            <line x1="75" y1="110" x2="95" y2="110" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            
            {/* Sleek Lamp Fixture Head */}
            <path d="M 44 15 Q 35 15, 30 22 L 48 28 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            
            {/* Light Cone / Soft Downward Beam Glow */}
            <polygon points="32,24 10,105 70,105" fill="currentColor" fillOpacity="0.1" />
            <path d="M 10 105 Q 40 100, 70 105" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
            
            {/* Soft Radiant Light Rays */}
            <line x1="28" y1="32" x2="16" y2="42" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="36" y1="38" x2="28" y2="52" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="46" y1="36" x2="48" y2="54" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'water-leakage':
        return (
          <svg className={baseClass} viewBox="0 0 120 120" fill="none">
            {/* Pipe Joint & Bursting Water Droplets */}
            <rect x="20" y="45" width="45" height="18" rx="4" stroke="currentColor" strokeWidth="3.5" />
            <rect x="65" y="40" width="12" height="28" rx="3" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="3" />
            <path d="M 77 54 C 90 40, 105 50, 95 65 C 90 75, 105 85, 95 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" />
            {/* Water Drops */}
            <path d="M 82 25 C 82 20, 88 15, 88 25 C 88 29, 82 29, 82 25 Z" fill="currentColor" />
            <path d="M 100 38 C 100 33, 106 28, 106 38 C 106 42, 100 42, 100 38 Z" fill="currentColor" />
          </svg>
        );

      case 'waterlogging':
        return (
          <svg className={baseClass} viewBox="0 0 120 120" fill="none">
            {/* Layered Flooded Wave Curves */}
            <path d="M 10 40 Q 35 25, 60 40 T 110 40" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M 10 65 Q 35 50, 60 65 T 110 65" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M 10 90 Q 35 75, 60 90 T 110 90" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            {/* Floating marker */}
            <circle cx="85" cy="30" r="8" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
          </svg>
        );

      case 'garbage-dump':
        return (
          <svg className={baseClass} viewBox="0 0 120 120" fill="none">
            {/* Waste Bin / Trash Can Container */}
            <path d="M 35 45 L 40 100 C 40 104, 80 104, 80 100 L 85 45 Z" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="3.5" />
            <line x1="28" y1="45" x2="92" y2="45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <path d="M 48 45 L 52 32 L 68 32 L 72 45" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="58" x2="48" y2="88" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="60" y1="58" x2="60" y2="88" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <line x1="70" y1="58" x2="72" y2="88" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'broken-footpath':
        return (
          <svg className={baseClass} viewBox="0 0 120 120" fill="none">
            {/* Broken Paving Slab Grid */}
            <rect x="20" y="20" width="38" height="38" rx="6" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.1" />
            <rect x="64" y="20" width="38" height="38" rx="6" stroke="currentColor" strokeWidth="3" />
            <rect x="20" y="64" width="38" height="38" rx="6" stroke="currentColor" strokeWidth="3" />
            <rect x="64" y="64" width="38" height="38" rx="6" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.1" />
            {/* Jagged Cracks */}
            <path d="M 30 20 L 42 38 L 35 58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 64 78 L 82 82 L 102 70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'open-manhole':
        return (
          <svg className={baseClass} viewBox="0 0 120 120" fill="none">
            {/* Open Manhole Frame & Lid */}
            <ellipse cx="60" cy="70" rx="42" ry="22" stroke="currentColor" strokeWidth="4" fill="currentColor" fillOpacity="0.1" />
            <ellipse cx="60" cy="70" rx="30" ry="14" stroke="currentColor" strokeWidth="2.5" strokeDasharray="6 4" />
            {/* Offset lid */}
            <ellipse cx="78" cy="40" rx="32" ry="16" stroke="currentColor" strokeWidth="3.5" fill="currentColor" fillOpacity="0.25" />
            {/* Warning Ring */}
            <path d="M 30 65 Q 20 40, 40 30" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" />
          </svg>
        );

      case 'traffic-signal':
        return (
          <svg className={baseClass} viewBox="0 0 120 120" fill="none">
            {/* Traffic Light Housing & Lenses */}
            <rect x="42" y="15" width="36" height="90" rx="12" stroke="currentColor" strokeWidth="3.5" fill="currentColor" fillOpacity="0.12" />
            <circle cx="60" cy="35" r="9" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.4" />
            <circle cx="60" cy="60" r="9" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="60" cy="85" r="9" stroke="currentColor" strokeWidth="2.5" />
            {/* Side Visors */}
            <path d="M 34 30 L 42 30 M 34 55 L 42 55 M 34 80 L 42 80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M 78 30 L 86 30 M 78 55 L 86 55 M 78 80 L 86 80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'drainage-issue':
        return (
          <svg className={baseClass} viewBox="0 0 120 120" fill="none">
            {/* Sewer Drain Grate Slats */}
            <rect x="20" y="30" width="80" height="60" rx="8" stroke="currentColor" strokeWidth="3.5" fill="currentColor" fillOpacity="0.1" />
            <line x1="35" y1="38" x2="35" y2="82" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="50" y1="38" x2="50" y2="82" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="65" y1="38" x2="65" y2="82" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="80" y1="38" x2="80" y2="82" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            {/* Downward Swirl Arcs */}
            <path d="M 30 100 Q 60 115, 90 100" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'road-damage':
        return (
          <svg className={baseClass} viewBox="0 0 120 120" fill="none">
            {/* Construction Barrier Board */}
            <rect x="15" y="35" width="90" height="28" rx="5" stroke="currentColor" strokeWidth="3.5" fill="currentColor" fillOpacity="0.15" />
            <line x1="25" y1="35" x2="45" y2="63" stroke="currentColor" strokeWidth="3.5" />
            <line x1="55" y1="35" x2="75" y2="63" stroke="currentColor" strokeWidth="3.5" />
            <line x1="85" y1="35" x2="95" y2="49" stroke="currentColor" strokeWidth="3.5" />
            {/* Barrier legs */}
            <path d="M 30 63 L 25 100 M 90 63 L 95 100" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );

      case 'illegal-dumping':
        return (
          <svg className={baseClass} viewBox="0 0 120 120" fill="none">
            {/* Warning Triangle Shield & Debris Pile */}
            <polygon points="60,20 105,95 15,95" stroke="currentColor" strokeWidth="3.5" fill="currentColor" fillOpacity="0.12" strokeLinejoin="round" />
            <line x1="60" y1="42" x2="60" y2="70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <circle cx="60" cy="82" r="3" fill="currentColor" />
          </svg>
        );

      case 'public-toilet':
        return (
          <svg className={baseClass} viewBox="0 0 120 120" fill="none">
            {/* Sanitary Door Frame & Water Crest */}
            <rect x="35" y="25" width="50" height="75" rx="6" stroke="currentColor" strokeWidth="3.5" fill="currentColor" fillOpacity="0.1" />
            <circle cx="45" cy="62" r="3.5" fill="currentColor" />
            <path d="M 60 40 L 60 55 M 52 48 L 68 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M 20 85 Q 35 75, 50 85 T 80 85" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 3" />
          </svg>
        );

      case 'stray-animals':
        return (
          <svg className={baseClass} viewBox="0 0 120 120" fill="none">
            {/* Friendly Animal Paw Print */}
            <ellipse cx="60" cy="75" rx="22" ry="16" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="3" />
            <circle cx="38" cy="48" r="8" fill="currentColor" />
            <circle cx="53" cy="38" r="8.5" fill="currentColor" />
            <circle cx="67" cy="38" r="8.5" fill="currentColor" />
            <circle cx="82" cy="48" r="8" fill="currentColor" />
          </svg>
        );

      case 'fallen-tree':
        return (
          <svg className={baseClass} viewBox="0 0 120 120" fill="none">
            {/* Fallen Tree Trunk & Leafy Branch */}
            <rect x="20" y="65" width="80" height="20" rx="10" stroke="currentColor" strokeWidth="3.5" fill="currentColor" fillOpacity="0.18" />
            <circle cx="28" cy="75" r="6" stroke="currentColor" strokeWidth="2" />
            {/* Leaves */}
            <path d="M 65 30 C 50 30, 45 45, 60 55 C 75 65, 85 45, 75 35 Z" stroke="currentColor" strokeWidth="3" fill="currentColor" fillOpacity="0.1" />
            <path d="M 85 42 C 75 42, 70 52, 82 60 C 92 68, 100 52, 92 45 Z" stroke="currentColor" strokeWidth="2.5" />
          </svg>
        );

      case 'noise-complaint':
        return (
          <svg className={baseClass} viewBox="0 0 120 120" fill="none">
            {/* Speaker Cone & Expanding Sound Wave Arcs */}
            <polygon points="25,48 42,48 65,28 65,92 42,72 25,72" stroke="currentColor" strokeWidth="3.5" fill="currentColor" fillOpacity="0.15" strokeLinejoin="round" />
            <path d="M 78 42 Q 88 60, 78 78" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 92 32 Q 106 60, 92 88" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        );

      default:
        return (
          <svg className={baseClass} viewBox="0 0 120 120" fill="none">
            {/* Sparkle Gear Wheel */}
            <circle cx="60" cy="60" r="28" stroke="currentColor" strokeWidth="3.5" fill="currentColor" fillOpacity="0.12" />
            <circle cx="60" cy="60" r="12" stroke="currentColor" strokeWidth="3" />
            <path d="M 60 20 L 60 32 M 60 88 L 60 100 M 20 60 L 32 60 M 88 60 L 100 60 M 32 32 L 40 40 M 80 80 L 88 88 M 88 32 L 80 40 M 40 80 L 32 88" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <button
      onClick={() => onSelectCategory(category.title)}
      className={`group relative text-left p-5 sm:p-6 rounded-[28px] sm:rounded-[32px] ${category.cardBg} ${category.textColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-950/10 flex flex-col justify-between h-[290px] w-full overflow-hidden border border-black/5 cursor-pointer shrink-0`}
    >
      {/* TOP DECORATIVE ISSUE-SPECIFIC VECTOR ILLUSTRATION */}
      <div className="absolute top-1 right-1 text-current z-0">
        {renderTopRightIllustration(category.id)}
      </div>

      {/* BADGE IF ANY */}
      {category.badgeText && (
        <span className="absolute top-4 right-4 bg-white/90 text-[#111A35] font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs z-10">
          {category.badgeText}
        </span>
      )}

      {/* TOP & MIDDLE CONTENT AREA */}
      <div className="relative z-10 flex-1 flex flex-col justify-start">
        {/* TOP: SCALLOPED STAMP ICON BADGE */}
        <div className="relative w-12 h-12 sm:w-13 sm:h-13 flex items-center justify-center shrink-0 mb-3">
          {/* Scalloped Stamp Background */}
          <svg className="absolute inset-0 w-full h-full text-white/95 shadow-xs group-hover:scale-105 transition-transform duration-300" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 5 C57 5 62 10 67 12 C73 14 78 12 83 17 C88 22 86 27 88 33 C90 38 95 43 95 50 C95 57 90 62 88 67 C86 73 88 78 83 83 C78 88 73 86 67 88 C62 90 57 95 50 95 C43 95 38 90 33 88 C27 86 22 88 17 83 C12 78 14 73 12 67 C10 62 5 57 5 50 C5 43 10 38 12 33 C14 27 12 22 17 17 C22 12 27 14 33 12 C38 10 43 5 50 5 Z" />
          </svg>
          <div className="relative z-10">
            {renderIcon(category.iconName)}
          </div>
        </div>

        {/* CARD HEADING (MAIN BOLD + ITALIC SCRIPT ACCENT) */}
        <div className="space-y-0">
          <h3 className="font-extrabold text-xl sm:text-2xl tracking-tight leading-tight">
            {category.titleMain}
          </h3>
          <p className="font-serif italic text-xl sm:text-2xl font-normal leading-tight opacity-90">
            {category.titleAccent}
          </p>
        </div>

        {/* SHORT DESCRIPTION (LINE-CLAMPED) */}
        <p className={`text-xs font-medium leading-snug mt-1.5 line-clamp-2 max-w-[88%] ${category.descColor}`}>
          {category.description}
        </p>
      </div>

      {/* BOTTOM: CIRCULAR ARROW ACTION BUTTON */}
      <div className="relative z-10 mt-2 shrink-0">
        <div className="w-10 h-10 rounded-full bg-white text-[#111A35] group-hover:bg-[#6046E8] group-hover:text-white flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:shadow-purple-900/20 group-hover:scale-105 transition-all duration-300">
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
        </div>
      </div>
    </button>
  );
};
