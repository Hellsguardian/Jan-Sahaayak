import React, { useState } from 'react';
import { GrievanceItem } from '../types';
import { GrievanceCard } from './GrievanceCard';
import { CIVIC_UPDATES } from '../data/civicData';
import { Search, Megaphone, Calendar, Sparkles, ChevronRight, Bell } from 'lucide-react';

interface YourGrievancesProps {
  grievances: GrievanceItem[];
  onOpenLodgeModal: () => void;
  onOpenTrackModal: (item: GrievanceItem) => void;
  onUpvoteGrievance: (id: string) => void;
}

export const YourGrievances: React.FC<YourGrievancesProps> = ({
  grievances,
  onOpenLodgeModal,
  onOpenTrackModal,
  onUpvoteGrievance
}) => {
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Resolved'>('Active');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredUpdateId, setHoveredUpdateId] = useState<string | null>(null);

  const filteredGrievances = grievances.filter(g => {
    if (statusFilter === 'Active' && g.status === 'Resolved') return false;
    if (statusFilter === 'Resolved' && g.status !== 'Resolved') return false;

    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      g.id.toLowerCase().includes(q) ||
      g.title.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q) ||
      g.location.toLowerCase().includes(q)
    );
  });

  return (
    <section 
      id="citizen-dashboard" 
      className="py-8 sm:py-12 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1536px] w-full mx-auto scroll-mt-24"
    >
      {/* SCROLL TARGET ALIASES FOR BACKWARD COMPATIBILITY */}
      <div id="your-complaints" className="scroll-mt-24" />
      <div id="your-grievances" className="scroll-mt-24" />

      {/* UNIFIED MAIN HEADER - COMPACT & POLISHED */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEE9FF] text-[#6546D9] text-[11px] font-black uppercase tracking-wider mb-2 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#6546D9]" />
            <span>CITIZEN DASHBOARD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#171717] tracking-tight leading-tight">
            Citizen <span className="text-[#6546D9]">Dashboard</span>
          </h2>
          <p className="text-zinc-600 font-medium text-sm sm:text-base mt-1 max-w-2xl leading-snug">
            Track your reported issues, monitor progress, and stay updated with important civic activity in your area.
          </p>
        </div>
      </div>

      {/* UNIFIED DASHBOARD LAYOUT GRID (33% Left Sidebar / 67% Right Main Area) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* LEFT COLUMN: COMPACT CIVIC UPDATES SIDEBAR (33% width on desktop) */}
        <div className="lg:col-span-4 order-2 lg:order-1">
          <div className="bg-white rounded-[2rem] border-2 border-[#DCD1FF] p-4 sm:p-5 shadow-xl shadow-purple-900/5 flex flex-col justify-between">
            
            <div>
              {/* SIDEBAR HEADER */}
              <div className="pb-3 border-b border-purple-100 flex items-center justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100/80 text-[#6546D9] text-[10px] font-black uppercase tracking-wider mb-0.5">
                    <Megaphone className="w-3 h-3 text-[#6546D9]" />
                    <span>CIVIC UPDATES</span>
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#171717]">Civic Updates</h3>
                  <p className="text-[11px] text-zinc-500 font-medium">
                    Important updates in your area
                  </p>
                </div>
              </div>

              {/* COMPACT CIVIC UPDATES CARDS FEED */}
              <div className="mt-3 space-y-2.5 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
                {CIVIC_UPDATES.map((update) => {
                  const isHovered = hoveredUpdateId === update.id;
                  
                  return (
                    <div
                      key={update.id}
                      onMouseEnter={() => setHoveredUpdateId(update.id)}
                      onMouseLeave={() => setHoveredUpdateId(null)}
                      className={`p-3 rounded-xl border transition-all duration-200 relative cursor-pointer ${
                        isHovered
                          ? 'bg-white border-[#6546D9] shadow-md -translate-y-[2px]'
                          : 'bg-[#FAF9FF] hover:bg-white border-purple-100 hover:border-purple-300'
                      }`}
                    >
                      {/* TYPE & DATE */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className={`font-black text-[9px] px-2 py-0.5 rounded-md uppercase tracking-wider shadow-2xs ${
                          update.type === 'Alert' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                          update.type === 'Maintenance' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                          'bg-purple-100 text-purple-800 border border-purple-200'
                        }`}>
                          {update.type}
                        </span>

                        <span className="text-[10px] font-bold text-zinc-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-[#6546D9]" />
                          <span>{update.date}</span>
                        </span>
                      </div>

                      {/* SHORT TITLE */}
                      <h4 className="font-extrabold text-xs sm:text-sm text-[#171717] group-hover:text-[#6546D9] transition-colors leading-snug">
                        {update.title}
                      </h4>

                      {/* ONE SHORT SUPPORTING LINE */}
                      <p className="text-[11px] font-semibold text-[#6546D9] mt-0.5 truncate">
                        {update.department}
                      </p>

                      {/* DETAILS AFFORDANCE ON HOVER */}
                      <div className={`mt-1.5 flex items-center justify-end text-[10px] font-bold text-[#6546D9] gap-0.5 transition-opacity duration-200 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <span>View details</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SIDEBAR FOOTER NOTICE */}
            <div className="mt-3 pt-2.5 border-t border-purple-100 flex items-center justify-between text-[10px] font-bold text-zinc-500">
              <span className="flex items-center gap-1">
                <Bell className="w-3 h-3 text-[#6546D9]" />
                Updated in real-time
              </span>
              <span className="text-[#6546D9] font-extrabold">Sector 12 Ward</span>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: PRIMARY "YOUR COMPLAINTS" AREA (67% width on desktop) */}
        <div className="lg:col-span-8 order-1 lg:order-2">
          
          <div className="bg-white rounded-[2.5rem] border-2 border-[#DCD1FF] p-5 sm:p-6 shadow-xl shadow-purple-900/5 min-h-[520px]">
            
            {/* TOOLBAR HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-xl sm:text-2xl text-[#171717] tracking-tight">Your Complaints</h3>
                  <span className="bg-[#6546D9] text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-2xs">
                    {filteredGrievances.length}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-500 font-medium mt-0.5">
                  Track real-time status updates, department logs, and inspection progress for your reported issues.
                </p>
              </div>

              {/* SEARCH & FILTERS */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto shrink-0">
                
                {/* SEARCH INPUT */}
                <div className="relative w-full sm:w-48">
                  <input
                    type="text"
                    placeholder="Search complaints..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#FAF9FF] border-2 border-[#EEE9FF] text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#6546D9] focus:bg-white transition-all"
                  />
                  <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
                </div>

                {/* STATUS FILTER TABS */}
                <div className="flex items-center gap-1 bg-[#F7F5FF] p-1 rounded-xl border border-[#EEE9FF] text-xs font-bold w-full sm:w-auto">
                  {(['All', 'Active', 'Resolved'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setStatusFilter(tab)}
                      className={`flex-1 sm:flex-none px-3 py-1 rounded-lg transition-all cursor-pointer ${
                        statusFilter === tab
                          ? 'bg-[#6546D9] text-white shadow-xs font-extrabold'
                          : 'text-zinc-600 hover:text-[#6546D9]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

              </div>
            </div>

            {/* COMPLAINTS GRID */}
            <div className="mt-5">
              {filteredGrievances.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  {filteredGrievances.map((item) => (
                    <GrievanceCard
                      key={item.id}
                      item={item}
                      onTrackClick={onOpenTrackModal}
                      onUpvoteClick={onUpvoteGrievance}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-[#FAF9FF] rounded-3xl border-2 border-dashed border-[#DCD1FF] p-8 sm:p-10 text-center max-w-md mx-auto my-6">
                  <p className="font-extrabold text-base text-[#171717]">No complaints found</p>
                  <p className="text-xs text-zinc-500 font-medium mt-1 leading-relaxed">
                    There are no reported complaints matching your search query or selected status filter.
                  </p>
                  <button
                    onClick={onOpenLodgeModal}
                    className="mt-4 bg-[#6546D9] hover:bg-[#5234c2] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    Lodge a Complaint Now
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export const YourComplaints = YourGrievances;
