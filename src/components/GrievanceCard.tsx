import React from 'react';
import { GrievanceItem } from '../types';
import { 
  Clock, 
  MapPin, 
  UserCheck, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  ThumbsUp,
  FileText
} from 'lucide-react';

interface GrievanceCardProps {
  item: GrievanceItem;
  onTrackClick: (item: GrievanceItem) => void;
  onUpvoteClick: (id: string) => void;
}

export const GrievanceCard: React.FC<GrievanceCardProps> = ({
  item,
  onTrackClick,
  onUpvoteClick
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Reported':
        return (
          <span className="bg-red-100 text-red-700 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 border border-red-200 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            Reported
          </span>
        );
      case 'Processing':
        return (
          <span className="bg-amber-100 text-amber-900 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 border border-amber-300 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
            </span>
            Processing
          </span>
        );
      case 'Resolved':
        return (
          <span className="bg-emerald-100 text-emerald-800 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 border border-emerald-200 shadow-2xs">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            Resolved
          </span>
        );
      default:
        return null;
    }
  };

  const completedSteps = item.timeline.filter(t => t.completed).length;
  const progressPercent = Math.round((completedSteps / item.timeline.length) * 100);

  return (
    <div className="bg-white rounded-[2rem] border-2 border-[#DCD1FF] p-5 sm:p-6 shadow-xl shadow-purple-900/5 hover:border-[#6546D9] hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 flex flex-col justify-between group/card hover:-translate-y-1">
      
      <div>
        {/* CARD TOP HEADER */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="font-mono text-xs font-extrabold text-[#6546D9] bg-[#F1EDFF] px-2.5 py-1 rounded-xl border border-purple-100">
            {item.id}
          </span>
          {getStatusBadge(item.status)}
        </div>

        {/* TITLE */}
        <h3 className="font-extrabold text-base sm:text-lg text-[#171717] group-hover/card:text-[#6546D9] transition-colors leading-snug">
          {item.title}
        </h3>
        
        {/* LOCATION & DEPARTMENT */}
        <p className="text-xs text-zinc-500 font-medium mt-1.5 flex items-center gap-1.5 truncate">
          <MapPin className="w-3.5 h-3.5 text-[#6546D9] shrink-0" />
          <span className="truncate">{item.location} ({item.ward})</span>
        </p>

        {/* TIMELINE PROGRESS MINI BAR */}
        <div className="mt-4 bg-[#F8F6FF] p-3 rounded-2xl border border-[#EEE9FF]">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-zinc-600">Progress Stage</span>
            <span className="text-[#6546D9] font-extrabold">{progressPercent}% Completed</span>
          </div>

          <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#6546D9] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-[11px] text-zinc-500 font-medium mt-2">
            Last Step: <span className="text-zinc-800 font-bold">{item.timeline.find(t => t.completed)?.step || 'Registered'}</span>
          </p>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="mt-5 pt-3 border-t border-purple-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onUpvoteClick(item.id)}
          className="flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-[#6546D9] bg-[#F7F5FF] hover:bg-[#EEE9FF] px-3 py-1.5 rounded-xl border border-[#EEE9FF] transition-all cursor-pointer active:scale-95"
        >
          <ThumbsUp className="w-3.5 h-3.5 text-[#6546D9]" />
          <span>{item.upvotes} Endorsements</span>
        </button>

        <button
          onClick={() => onTrackClick(item)}
          className="flex items-center gap-1.5 bg-[#6546D9] hover:bg-[#5234c2] text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 group/btn cursor-pointer"
        >
          <span>Track Complaint</span>
          <ChevronRight className="w-4 h-4 text-[#FFD84D] group-hover/btn:translate-x-1 transition-transform duration-200" />
        </button>
      </div>

    </div>
  );
};
