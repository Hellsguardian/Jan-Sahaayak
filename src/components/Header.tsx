import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, 
  ChevronDown, 
  Menu, 
  X, 
  Users
} from 'lucide-react';

interface HeaderProps {
  onOpenLodgeModal: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  currentLang?: string;
  onChangeLang?: (lang: string) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenLodgeModal,
  onOpenNotifications,
  unreadNotificationsCount,
  activeSection,
  onNavigate
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const delta = currentY - lastScrollY.current;

          // Progress maps 0px -> 70px scroll into 0.0 -> 1.0
          const p = Math.min(1, Math.max(0, currentY / 70));
          setScrollProgress(p);

          // Scroll direction auto-hide / reveal logic
          if (currentY <= 50) {
            // At top, always visible
            if (hideTimerRef.current) {
              clearTimeout(hideTimerRef.current);
              hideTimerRef.current = null;
            }
            setIsVisible(true);
          } else if (delta < -2) {
            // Scrolling UP -> reveal immediately & cancel hide timer
            if (hideTimerRef.current) {
              clearTimeout(hideTimerRef.current);
              hideTimerRef.current = null;
            }
            setIsVisible(true);
          } else if (delta > 2) {
            // Scrolling DOWN past top header -> start 3-second inactivity timer if not already set
            if (!hideTimerRef.current) {
              hideTimerRef.current = setTimeout(() => {
                setIsVisible(false);
                hideTimerRef.current = null;
              }, 3000);
            }
          }

          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, []);

  const isScrolled = scrollProgress > 0.4;

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'your-complaints', label: 'My Complaints' },
    { id: 'what-needs-fixing', label: 'Services' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  // Interpolated visual values for smooth physical morphing & refined glassmorphism
  const bgAlpha = scrollProgress > 0 ? (0.72 + scrollProgress * 0.12).toFixed(2) : '1.0';
  const borderAlpha = (0.05 + scrollProgress * 0.30).toFixed(2);
  const shadowAlpha = (scrollProgress * 0.08).toFixed(2);
  const blurAmount = Math.round(scrollProgress * 20); // 0px to 20px blur
  const borderRadius = Math.round(scrollProgress * 999);
  const scaleVal = (1 - scrollProgress * 0.02).toFixed(3);
  const marginTopVal = Math.round(scrollProgress * 8);

  return (
    <header className="sticky top-0 z-50 w-full flex justify-center pointer-events-none origin-top transition-all duration-500 ease-out">
      <div 
        style={{
          width: scrollProgress > 0 ? `${100 - scrollProgress * 10}%` : '100%',
          maxWidth: scrollProgress > 0 ? `${1536 - scrollProgress * 200}px` : '100%',
          marginTop: `${marginTopVal}px`,
          backgroundColor: scrollProgress > 0 
            ? `rgba(252, 250, 255, ${bgAlpha})` 
            : 'rgba(255, 255, 255, 1)',
          backdropFilter: `blur(${blurAmount}px)`,
          WebkitBackdropFilter: `blur(${blurAmount}px)`,
          borderRadius: `${borderRadius}px`,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: scrollProgress > 0
            ? `rgba(200, 185, 255, ${borderAlpha})`
            : 'rgba(220, 209, 255, 0.15)',
          boxShadow: scrollProgress > 0.1 
            ? `0 ${scrollProgress * 10}px ${scrollProgress * 28}px rgba(101, 70, 217, ${shadowAlpha}), inset 0 1px 1.5px rgba(255, 255, 255, 0.85)`
            : 'none',
          transform: isVisible 
            ? `translateY(0px) scale(${scaleVal})` 
            : `translateY(-135%) scale(${scaleVal})`,
          opacity: isVisible ? 1 : 0,
          transformOrigin: 'center top'
        }}
        className={`pointer-events-auto flex items-center justify-between gap-3 sm:gap-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled 
            ? 'px-3.5 sm:px-5 md:px-6 lg:px-8 py-1.5 sm:py-2 hover:border-purple-300/80 hover:shadow-lg hover:shadow-purple-900/10' 
            : 'px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3.5'
        }`}
      >
        {/* LEFT: LOGO */}
        <button 
          onClick={() => handleNavClick('hero')} 
          className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none text-left shrink-0 cursor-pointer"
        >
          {/* BRAND ICON */}
          <div className={`rounded-full bg-[#6546D9] text-white flex items-center justify-center shadow-md shadow-purple-600/20 group-hover:scale-105 transition-all duration-300 relative overflow-hidden ${
            isScrolled ? 'w-7.5 h-7.5 sm:w-8 sm:h-8' : 'w-9.5 h-9.5 sm:w-10.5 sm:h-10.5'
          }`}>
            <div className="flex items-center justify-center gap-0.5">
              <div className="w-2 h-2 rounded-full bg-[#FFC83D] -mr-1" />
              <div className="w-3 h-3 rounded-full bg-white opacity-90" />
            </div>
            <Users className="w-3.5 h-3.5 text-white absolute opacity-90" />
          </div>

          <div>
            <span className={`font-black tracking-tight leading-tight block transition-all duration-300 ${
              isScrolled ? 'text-sm sm:text-base' : 'text-lg sm:text-xl'
            }`}>
              <span className="text-[#6546D9]">JAN</span> <span className="text-[#111A35]">SAHAAYAK</span>
            </span>
            <p className={`font-medium text-[#5D6785] hidden sm:block leading-none transition-all duration-300 ${
              isScrolled ? 'text-[8.5px] mt-0' : 'text-[10px] sm:text-[11px] mt-0.5'
            }`}>
              Aapki Samasya, Hamara Samadhan
            </p>
          </div>
        </button>

        {/* CENTER: DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-1 bg-transparent">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative font-medium transition-all duration-300 cursor-pointer rounded-full ${
                  isScrolled ? 'px-3 sm:px-4 py-1 text-xs' : 'px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm'
                } ${
                  isActive
                    ? isScrolled
                      ? 'bg-[#6546D9] text-white font-semibold shadow-xs shadow-purple-600/25 hover:-translate-y-[1px]'
                      : 'text-[#6546D9] font-bold bg-purple-50/80 hover:bg-purple-100/60'
                    : 'text-[#5D6785] hover:text-[#6546D9] hover:bg-[#F4F1FF]/80 hover:-translate-y-[1px]'
                }`}
              >
                {item.label}
                {isActive && !isScrolled && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#6546D9] rounded-full transition-all" />
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT: NOTIFICATION & PROFILE */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          {/* NOTIFICATION BUTTON */}
          <button
            onClick={onOpenNotifications}
            className={`relative rounded-full bg-white/90 border border-purple-100/90 hover:bg-[#F4F1FF] hover:border-purple-200 flex items-center justify-center text-[#111A35] shadow-2xs hover:shadow-xs hover:-translate-y-[1px] transition-all cursor-pointer group ${
              isScrolled ? 'w-7.5 h-7.5 sm:w-8 sm:h-8' : 'w-9 h-9 sm:w-10 sm:h-10'
            }`}
            title="Notifications"
          >
            <Bell className={`text-[#111A35] group-hover:text-[#6546D9] transition-colors ${
              isScrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'
            }`} />
            {unreadNotificationsCount > 0 && (
              <span className={`absolute bg-[#EF3B35] text-white font-bold rounded-full flex items-center justify-center border-2 border-white shadow-2xs ${
                isScrolled ? '-top-1 -right-1 text-[9px] w-3.5 h-3.5' : '-top-0.5 -right-0.5 text-[10px] w-4 h-4 sm:w-4.5 sm:h-4.5'
              }`}>
                {unreadNotificationsCount}
              </span>
            )}
          </button>

          {/* USER PROFILE BADGE */}
          <div className={`hidden sm:flex items-center gap-1.5 bg-[#F4F1FF]/90 hover:bg-[#EEE9FF] border border-purple-100/90 rounded-full cursor-pointer shadow-2xs hover:shadow-xs hover:-translate-y-[1px] transition-all ${
            isScrolled ? 'px-2 py-0.5' : 'px-2.5 py-1.5'
          }`}>
            <div className={`rounded-full bg-[#6546D9] text-white font-bold flex items-center justify-center shadow-2xs transition-all duration-300 ${
              isScrolled ? 'w-5.5 h-5.5 text-[9.5px]' : 'w-7 h-7 text-[11px]'
            }`}>
              NR
            </div>
            <span className={`font-semibold text-[#111A35] ${isScrolled ? 'text-[11px]' : 'text-xs'}`}>
              Nikhil Raj
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-[#5D6785] ml-0.5" />
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-full bg-white border border-purple-100 text-[#111A35] cursor-pointer hover:bg-[#F4F1FF]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER NAV */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl rounded-3xl border border-purple-100 p-4 shadow-xl animate-in fade-in slide-in-from-top-3">
          <div className="flex flex-col gap-1.5 mb-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-4 py-2.5 rounded-2xl font-semibold text-sm ${
                  activeSection === item.id
                    ? 'bg-[#6546D9] text-white'
                    : 'text-[#5D6785] hover:bg-purple-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onOpenLodgeModal();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#6546D9] text-white font-bold text-sm py-3 rounded-2xl shadow-md shadow-purple-600/20"
          >
            <span>Lodge a Grievance Now</span>
          </button>
        </div>
      )}
    </header>
  );
};

