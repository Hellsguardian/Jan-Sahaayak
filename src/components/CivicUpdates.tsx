import React from 'react';
import { CIVIC_UPDATES } from '../data/civicData';
import { Sparkles, Megaphone, Clock, Calendar, MapPin, AlertTriangle, ArrowRight } from 'lucide-react';

export const CivicUpdates: React.FC = () => {
  return (
    <section id="civic-updates" className="py-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1536px] w-full mx-auto">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-block px-4 py-1.5 bg-[#DCD1FF] text-[#6546D9] rounded-full text-[10px] font-bold tracking-widest uppercase mb-2 shadow-sm">
            MUNICIPAL ANNOUNCEMENTS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
            Civic <span className="text-[#6546D9]">Updates</span>
          </h2>
          <p className="text-zinc-600 font-medium text-base mt-1">
            Stay informed on planned maintenance, road diversions, monsoon advisories, and water supply schedules.
          </p>
        </div>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CIVIC_UPDATES.map((update) => (
          <div
            key={update.id}
            className="bg-white rounded-[2rem] border-2 border-[#DCD1FF] p-6 shadow-xl relative overflow-hidden flex flex-col justify-between hover:border-[#6546D9] transition-all group"
          >
            {/* TOP TYPE BADGE */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider ${
                  update.type === 'Alert' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                  update.type === 'Maintenance' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                  'bg-purple-100 text-purple-800 border border-purple-200'
                }`}>
                  {update.type}
                </span>
                
                <span className="text-[10px] font-bold text-zinc-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#6546D9]" />
                  <span>{update.date}</span>
                </span>
              </div>

              {/* TITLE */}
              <h3 className="font-extrabold text-lg text-[#171717] group-hover:text-[#6546D9] transition-colors leading-snug">
                {update.title}
              </h3>

              {/* DEPARTMENT */}
              <p className="text-xs font-bold text-[#6546D9] mt-1">{update.department}</p>

              {/* SUMMARY */}
              <p className="text-xs text-zinc-600 font-medium mt-3 leading-relaxed">
                {update.summary}
              </p>
            </div>

            {/* AFFECTED AREAS & TIME */}
            <div className="mt-6 pt-4 border-t border-purple-100 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-700">
                <span className="flex items-center gap-1 text-zinc-500">
                  <Clock className="w-3.5 h-3.5 text-[#6546D9]" />
                  Timing
                </span>
                <span className="text-[#171717]">{update.time}</span>
              </div>

              <div className="flex items-center gap-1 flex-wrap mt-1">
                <MapPin className="w-3 h-3 text-[#6546D9] shrink-0" />
                {update.affectedAreas.map((area) => (
                  <span key={area} className="text-[10px] font-bold bg-[#F1EDFF] text-[#6546D9] px-2 py-0.5 rounded-md">
                    {area}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
