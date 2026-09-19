import React from 'react';
import { X, Bell, CheckCircle2, AlertTriangle, Droplets, Construction } from 'lucide-react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClearUnread: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  onClearUnread
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 1,
      title: 'Water Supply Maintenance Alert',
      time: '10m ago',
      text: 'Scheduled valve maintenance in Sector 12 tomorrow 10 AM-2 PM.',
      icon: Droplets,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 2,
      title: 'Grievance GRV-2026-001245 Updated',
      time: '1h ago',
      text: 'Ward technician dispatched to inspect dirty water supply.',
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 3,
      title: 'Road Resurfacing Night Drive',
      time: '3h ago',
      text: 'Main Market Road paving in progress between 11 PM - 5 AM.',
      icon: Construction,
      color: 'text-amber-600 bg-amber-50'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-sm h-full shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right">
        
        <div>
          {/* DRAWER HEADER */}
          <div className="flex items-center justify-between pb-4 border-b border-purple-100 mb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#6546D9]" />
              <h3 className="font-extrabold text-lg text-[#171717]">Civic Alerts</h3>
            </div>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#F7F5FF] text-zinc-500 hover:text-[#171717]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* NOTIFICATION LIST */}
          <div className="space-y-3">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div key={n.id} className="p-3.5 rounded-2xl bg-[#F8F6FF] border border-[#EEE9FF] flex items-start gap-3">
                  <div className={`p-2 rounded-xl ${n.color} shrink-0 mt-0.5`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <p className="font-extrabold text-xs text-[#171717]">{n.title}</p>
                      <span className="text-[9px] font-bold text-zinc-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-zinc-600 font-medium mt-1 leading-snug">{n.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM ACTION */}
        <button
          onClick={() => {
            onClearUnread();
            onClose();
          }}
          className="w-full bg-[#EEE9FF] text-[#6546D9] font-extrabold text-xs py-3 rounded-2xl hover:bg-[#DCD1FF] transition-colors"
        >
          Mark All As Read
        </button>

      </div>
    </div>
  );
};
