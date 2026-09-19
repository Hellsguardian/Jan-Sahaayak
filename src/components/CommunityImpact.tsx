import React from 'react';
import { Sparkles, HeartHandshake, CheckCircle2, TrendingUp, Users, ShieldCheck } from 'lucide-react';

export const CommunityImpact: React.FC = () => {
  const stats = [
    { label: 'Problems Reported', value: '12,482', badge: 'Verified', color: 'text-[#6546D9]', bg: 'bg-purple-50' },
    { label: 'Problems Solved', value: '9,731', badge: '78% Solved', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Resolution Rate', value: '78%', badge: 'Active Wards', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Fixed This Month', value: '1,284', badge: '+14% YoY', color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1536px] w-full mx-auto">
      
      <div className="bg-[#EEE9FF] rounded-[40px] border-2 border-[#DCD1FF] p-8 sm:p-12 relative overflow-hidden">
        
        {/* DECORATIVE YELLOW SHAPES */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD84D]/30 blob-shape-3 blur-2xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto mb-10 relative z-10">
          <div className="inline-block px-4 py-1.5 bg-[#DCD1FF] text-[#6546D9] rounded-full text-[10px] font-bold tracking-widest uppercase mb-3 shadow-sm">
            COMMUNITY IMPACT
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
            Together, we're <span className="text-[#6546D9]">improving</span> our city.
          </h2>

          <p className="text-zinc-600 font-medium text-base mt-2">
            Jan Sahaayak bridges citizens and municipal departments to ensure every neighborhood stays safe, clean, and well-maintained.
          </p>
        </div>

        {/* STATISTICS CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[2rem] p-6 border-2 border-[#DCD1FF] shadow-xl text-center flex flex-col justify-between hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-center justify-center mb-2">
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${stat.bg} ${stat.color}`}>
                  {stat.badge}
                </span>
              </div>

              <div className={`text-4xl sm:text-5xl font-extrabold my-2 tracking-tight ${stat.color}`}>
                {stat.value}
              </div>

              <p className="text-xs font-bold text-zinc-600 uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* CITIZEN TRUST BADGE ROW */}
        <div className="mt-10 pt-6 border-t border-[#DCD1FF] flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-zinc-700 relative z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#6546D9]" />
            <span>100% Ward Transparency</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Verified Officer Signoffs</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>45,000+ Active Citizens</span>
          </div>
        </div>

      </div>

    </section>
  );
};
