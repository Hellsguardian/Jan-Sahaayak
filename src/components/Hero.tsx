import React from 'react';
import { 
  FileEdit, 
  ArrowRight, 
  ShieldCheck
} from 'lucide-react';
import { CivicPulse } from './CivicPulse';

interface HeroProps {
  onOpenLodgeModal: () => void;
  onNavigateToTrack: () => void;
  reportedCount: number;
  processingCount: number;
  solvedCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenLodgeModal,
  onNavigateToTrack,
  reportedCount,
  processingCount,
  solvedCount
}) => {
  return (
    <section id="hero" className="relative pt-4 sm:pt-6 pb-2 sm:pb-3 overflow-hidden bg-gradient-to-b from-[#FAF9FF] via-[#F4F1FF]/30 to-[#FAF9FF]">
      
      {/* ATMOSPHERIC BACKGROUND DECORATIVE GLOWS & ACCENTS */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-[#EEE9FF]/60 rounded-full blur-3xl pointer-events-none -z-10 animate-glow-pulse" />
      <div className="absolute top-12 right-[-10%] w-[600px] h-[600px] bg-[#F4F1FF]/80 rounded-full blur-3xl pointer-events-none -z-10 animate-glow-pulse" />
      
      {/* SUBTLE BACKGROUND BIRDS / ACCENTS */}
      <div className="absolute top-8 left-[44%] opacity-35 pointer-events-none hidden sm:block animate-bird-fly">
        <svg width="42" height="22" viewBox="0 0 40 20" fill="none" stroke="#6546D9" strokeWidth="2" strokeLinecap="round">
          <path d="M0 10 Q 10 0 20 10 Q 30 0 40 10" />
        </svg>
      </div>

      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 w-full flex flex-col gap-6 sm:gap-8">
        
        {/* MAIN HERO TWO-COLUMN GRID */}
        <div style={{ marginBottom: '-30px' }} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center w-full">
          
          {/* LEFT COLUMN: HERO CONTENT (~42% width / 5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start pt-1">
            
            {/* MAIN HEADLINE */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-extrabold tracking-tight text-[#111A35] leading-[1.1] font-['Poppins']">
              How can we help<br />
              <span className="relative inline-block">
                you
                {/* ORGANIC HAND-DRAWN YELLOW UNDERLINE */}
                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 120 12" fill="none" preserveAspectRatio="none">
                  <path d="M3 8 C 30 11, 70 3, 117 7" stroke="#FFC83D" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>{' '}
              <span className="text-[#6546D9]">today?</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-sm sm:text-base text-[#5D6785] font-normal leading-relaxed max-w-md mt-3 sm:mt-4">
              Report issues, track progress and help make our city a better place to live.
            </p>

            {/* PRIMARY CTA - LODGE A GRIEVANCE CARD BUTTON */}
            <button
              onClick={onOpenLodgeModal}
              className="w-full sm:w-auto sm:min-w-[360px] max-w-[460px] bg-gradient-to-r from-[#6546D9] to-[#7B61E8] text-white p-4 sm:p-5 rounded-[20px] shadow-lg shadow-purple-600/25 flex items-center justify-between hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-600/35 active:translate-y-0.5 transition-all duration-300 cursor-pointer group mt-5 sm:mt-7"
            >
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                  <FileEdit className="w-5.5 h-5.5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-base sm:text-lg text-white leading-snug">
                    Lodge a Grievance
                  </div>
                  <div className="text-xs text-purple-100/90 font-normal mt-0.5">
                    Report a civic problem in your area
                  </div>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full bg-white text-[#6546D9] flex items-center justify-center shadow-md group-hover:scale-105 group-hover:translate-x-1.5 transition-all duration-200 shrink-0 ml-2">
                <ArrowRight className="w-4.5 h-4.5 text-[#6546D9]" />
              </div>
            </button>

          </div>

          {/* RIGHT COLUMN: HERO ILLUSTRATION & DECORATIVE FLOATING CARD (~58% width / 7 cols) */}
          <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end mt-2 lg:mt-0">
            
            {/* ATMOSPHERIC LAVENDER GLOW BEHIND ILLUSTRATION */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-[#EEE9FF]/70 rounded-full blur-3xl opacity-80 pointer-events-none -z-10 animate-glow-pulse" />

            {/* SINGLE FLOATING SPEECH / MESSAGE CARD (UPPER-RIGHT OVERLAY) */}
            <div className="absolute top-0 right-1 sm:top-1 sm:right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 px-4 shadow-lg shadow-purple-950/10 border border-purple-100/80 flex items-center gap-2.5 z-20 animate-float hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <div className="w-8.5 h-8.5 rounded-xl bg-[#6546D9] text-white flex items-center justify-center shadow-md shadow-purple-600/20 shrink-0 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="text-xs sm:text-xs font-medium text-[#111A35] leading-snug">
                Together, let's build<br />
                a <span className="text-[#6546D9] font-bold">better</span> tomorrow
              </div>
              {/* SPEECH POINTER TAIL */}
              <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-white rotate-45 border-r border-b border-purple-100" />
            </div>

            {/* HERO ILLUSTRATION - USING EXACT ASSETS/I1.PNG */}
            <div className="relative w-full max-w-[500px] lg:max-w-[580px] xl:max-w-[640px] flex items-center justify-center pt-2 animate-float-slow">
              <img 
                src="/assets/i1.png" 
                alt="Jan Sahaayak Citizens" 
                className="w-full h-auto max-h-[380px] lg:max-h-[420px] xl:max-h-[460px] object-contain drop-shadow-sm transition-all duration-300"
              />
            </div>

          </div>

        </div>

        {/* CIVIC PULSE AREA - COMPACT SUPPORTING LAYER AT BOTTOM OF HERO */}
        <div className="w-full mt-1 sm:mt-2">
          <CivicPulse
            reportedCount={reportedCount}
            processingCount={processingCount}
            solvedCount={solvedCount}
          />
        </div>

      </div>
    </section>
  );
};
