import React from 'react';
import { MapPin, CheckCircle2, Phone, Mail, Globe, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenLodgeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenLodgeModal
}) => {
  return (
    <footer className="bg-[#171717] text-white pt-16 pb-12 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mt-16 rounded-t-[48px] border-t-4 border-[#6546D9] relative overflow-hidden">
      
      <div className="max-w-[1536px] w-full mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-zinc-800">
        
        {/* BRAND COLUMN */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#6546D9] text-white flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#FFD84D]" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              Jan Sahaayak
            </span>
          </div>

          <p className="text-zinc-400 font-medium text-sm leading-relaxed max-w-sm">
            "Your voice. Your neighbourhood. Your city."
            <br />
            Jan Sahaayak empowers citizens to log, monitor, and resolve civic grievances in direct partnership with local municipal bodies.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <span className="bg-[#6546D9] text-[#FFD84D] font-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
              Official Civic Tech Portal
            </span>
          </div>
        </div>

        {/* CITIZEN SERVICES */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-extrabold text-sm uppercase tracking-wider text-[#FFD84D]">Citizen Services</h4>
          <ul className="space-y-2 text-xs font-semibold text-zinc-300">
            <li>
              <button onClick={onOpenLodgeModal} className="hover:text-white transition-colors">
                Lodge a Grievance
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('your-grievances')} className="hover:text-white transition-colors">
                Track Grievance Status
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('civic-area')} className="hover:text-white transition-colors">
                Civic Issues Map
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('what-needs-fixing')} className="hover:text-white transition-colors">
                Problem Categories
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('ai-sahaayak')} className="hover:text-white transition-colors">
                AI Sahaayak Assistant
              </button>
            </li>
          </ul>
        </div>

        {/* EMERGENCY HELPLINES */}
        <div className="md:col-span-4 space-y-3">
          <h4 className="font-extrabold text-sm uppercase tracking-wider text-[#FFD84D]">24x7 Civic Helplines</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
            <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-800">
              <p className="text-zinc-500 text-[10px] uppercase">Municipal Call Center</p>
              <p className="text-[#FFD84D] font-extrabold text-sm">1800-111-2026</p>
            </div>
            <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-800">
              <p className="text-zinc-500 text-[10px] uppercase">Jal Board Emergency</p>
              <p className="text-[#FFD84D] font-extrabold text-sm">1916</p>
            </div>
            <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-800">
              <p className="text-zinc-500 text-[10px] uppercase">Disaster Helpline</p>
              <p className="text-white font-extrabold text-sm">1077</p>
            </div>
            <div className="bg-zinc-900 p-2.5 rounded-xl border border-zinc-800">
              <p className="text-zinc-500 text-[10px] uppercase">Electricity Helpline</p>
              <p className="text-white font-extrabold text-sm">1912</p>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER BOTTOM LEGAL */}
      <div className="max-w-[1536px] w-full mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
        <p>© 2026 Jan Sahaayak Civic Platform. Built for transparent public governance.</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-zinc-300">Privacy Policy</a>
          <a href="#" className="hover:text-zinc-300">Terms of Service</a>
          <a href="#" className="hover:text-zinc-300">Accessibility</a>
        </div>
      </div>

    </footer>
  );
};
