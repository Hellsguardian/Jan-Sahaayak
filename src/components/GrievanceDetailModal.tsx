import React from 'react';
import { GrievanceItem } from '../types';
import { 
  X, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Building2, 
  AlertTriangle,
  FileCheck2,
  Calendar
} from 'lucide-react';

interface GrievanceDetailModalProps {
  item: GrievanceItem | null;
  onClose: () => void;
}

export const GrievanceDetailModal: React.FC<GrievanceDetailModalProps> = ({
  item,
  onClose
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-[32px] border-4 border-[#EEE9FF] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative">
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#F7F5FF] text-zinc-500 hover:text-[#171717] hover:bg-[#EEE9FF]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* MODAL HEADER */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold text-[#6546D9] bg-[#EEE9FF] px-2.5 py-1 rounded-xl">
              {item.id}
            </span>
            <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${
              item.status === 'Reported' ? 'bg-red-100 text-red-700' :
              item.status === 'Processing' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
            }`}>
              ● {item.status}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">{item.title}</h2>
          <p className="text-xs text-zinc-500 font-medium mt-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#6546D9]" />
            <span>{item.location} ({item.ward})</span>
          </p>
        </div>

        {/* METADATA GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-[#F8F6FF] border border-[#EEE9FF]">
          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase">Submitted</p>
            <p className="text-xs font-extrabold text-[#171717] mt-0.5">{item.submittedDate}</p>
          </div>

          <div>
            <p className="text-[10px] font-bold text-zinc-400 uppercase">Assigned Officer</p>
            <p className="text-xs font-extrabold text-[#171717] mt-0.5">{item.assignedOfficer || 'Pending'}</p>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase">Department</p>
            <p className="text-xs font-extrabold text-[#6546D9] mt-0.5">{item.department}</p>
          </div>
        </div>

        {/* TIMELINE PROGRESS STEPS */}
        <div className="mb-6">
          <h3 className="font-extrabold text-sm text-[#171717] mb-3 uppercase tracking-wider">
            Real-Time Resolution Timeline
          </h3>

          <div className="space-y-4 relative pl-6 border-l-2 border-[#DCD1FF]">
            {item.timeline.map((step, idx) => (
              <div key={idx} className="relative">
                {/* STEP DOT */}
                <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                  step.completed ? 'bg-[#35B96B] text-white' : 'bg-[#DCD1FF]'
                }`}>
                  {step.completed && <CheckCircle2 className="w-3 h-3 fill-current" />}
                </div>

                <div>
                  <p className={`text-xs font-extrabold ${step.completed ? 'text-[#171717]' : 'text-zinc-400'}`}>
                    {step.step}
                  </p>
                  <p className="text-[10px] font-bold text-zinc-400">{step.date}</p>
                  {step.note && (
                    <p className="text-xs text-zinc-600 bg-[#F7F5FF] p-2 rounded-xl mt-1 font-medium border border-[#EEE9FF]">
                      Note: {step.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BEFORE & AFTER PHOTO PROOF IF RESOLVED */}
        {item.status === 'Resolved' && (item.beforePhotoUrl || item.afterPhotoUrl) && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <h4 className="text-xs font-extrabold text-emerald-900 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#35B96B]" />
              <span>Inspection Verification Photos</span>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              {item.beforePhotoUrl && (
                <div>
                  <p className="text-[10px] font-extrabold text-zinc-500 mb-1">BEFORE REPAIR</p>
                  <img src={item.beforePhotoUrl} alt="Before" className="w-full h-28 rounded-xl object-cover border border-emerald-200" />
                </div>
              )}
              {item.afterPhotoUrl && (
                <div>
                  <p className="text-[10px] font-extrabold text-emerald-700 mb-1">AFTER REPAIR</p>
                  <img src={item.afterPhotoUrl} alt="After" className="w-full h-28 rounded-xl object-cover border-2 border-[#35B96B]" />
                </div>
              )}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full bg-[#6546D9] text-white font-extrabold text-xs py-3 rounded-2xl shadow-md"
        >
          Close Detail View
        </button>

      </div>
    </div>
  );
};
