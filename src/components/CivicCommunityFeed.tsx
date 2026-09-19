import React, { useState, useRef } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  ChevronRight, 
  MoreVertical, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronLeft, 
  Check, 
  Filter, 
  SlidersHorizontal
} from 'lucide-react';
import { GrievanceItem } from '../types';

interface FeedCardItem {
  id: string;
  title: string;
  titleHighlight?: string;
  category: string;
  location: string;
  distance: string;
  status: 'REPORTED' | 'PROCESSING' | 'RESOLVED' | 'URGENT';
  imageUrl: string;
  fallbackGradient: string;
  citizenName: string;
  citizenAvatarBg: string;
  timeAgo: string;
  likesCount: number;
  commentsCount: number;
  isFeatured?: boolean;
  featuredBadgeText?: string;
  description?: string;
}

const SAMPLE_FEED_ITEMS: FeedCardItem[] = [
  {
    id: 'feed-1',
    title: 'Deep Pothole near',
    titleHighlight: 'School Gate',
    category: 'Potholes',
    location: 'Sector 12, Chandigarh',
    distance: '250m away',
    status: 'REPORTED',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
    fallbackGradient: 'from-amber-600 to-stone-800',
    citizenName: 'Aarav Sharma',
    citizenAvatarBg: 'bg-purple-600',
    timeAgo: '2h ago',
    likesCount: 42,
    commentsCount: 12,
    isFeatured: true,
    featuredBadgeText: '🔥 TRENDING NEAR YOU',
    description: 'Large pothole forming right outside St. Xavier school entrance. Causing traffic jams during morning drop-off hours.'
  },
  {
    id: 'feed-2',
    title: 'Overflowing Garbage Bin at',
    titleHighlight: 'Main Market',
    category: 'Waste Management',
    location: 'Sector 12 Market',
    distance: '400m away',
    status: 'PROCESSING',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    fallbackGradient: 'from-amber-500 to-emerald-700',
    citizenName: 'Priya Malhotra',
    citizenAvatarBg: 'bg-emerald-600',
    timeAgo: '4h ago',
    likesCount: 28,
    commentsCount: 7,
    description: 'Community garbage bins overflowing near shop #42. Sanitation truck needed for clearing.'
  },
  {
    id: 'feed-3',
    title: 'Broken Streetlight &',
    titleHighlight: 'Dark Stretch',
    category: 'Street Lights',
    location: 'Sector 12, B-Block',
    distance: '180m away',
    status: 'RESOLVED',
    imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80',
    fallbackGradient: 'from-indigo-700 to-purple-900',
    citizenName: 'Rohan Verma',
    citizenAvatarBg: 'bg-indigo-600',
    timeAgo: 'Yesterday',
    likesCount: 64,
    commentsCount: 19,
    description: 'Streetlight pole #14 was flickering continuously. MC team replaced bulb and wire fitting.'
  },
  {
    id: 'feed-4',
    title: 'Water Pipeline Leakage on',
    titleHighlight: 'Main Road',
    category: 'Water Supply',
    location: 'Ward 4 Crossroads',
    distance: '650m away',
    status: 'URGENT',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
    fallbackGradient: 'from-blue-600 to-cyan-800',
    citizenName: 'Sunita Devi',
    citizenAvatarBg: 'bg-blue-600',
    timeAgo: '1h ago',
    likesCount: 89,
    commentsCount: 23,
    isFeatured: true,
    featuredBadgeText: '📍 CLOSE TO YOU',
    description: 'Clean drinking water leaking continuously from underground municipal valve.'
  },
  {
    id: 'feed-5',
    title: 'Severe Waterlogging at',
    titleHighlight: 'Underpass',
    category: 'Waterlogging',
    location: 'Sector 17 Underpass',
    distance: '1.1km away',
    status: 'PROCESSING',
    imageUrl: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=600&q=80',
    fallbackGradient: 'from-blue-700 to-slate-900',
    citizenName: 'Vikram Singh',
    citizenAvatarBg: 'bg-rose-600',
    timeAgo: '3h ago',
    likesCount: 51,
    commentsCount: 15,
    description: 'Rainwater clogging underpass passage. Motorists facing heavy delay.'
  },
  {
    id: 'feed-6',
    title: 'Open Manhole near',
    titleHighlight: 'Community Park',
    category: 'Public Safety',
    location: 'Sector 12 Park Gate 2',
    distance: '320m away',
    status: 'REPORTED',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
    fallbackGradient: 'from-zinc-700 to-red-900',
    citizenName: 'Meera Patel',
    citizenAvatarBg: 'bg-amber-600',
    timeAgo: '5h ago',
    likesCount: 37,
    commentsCount: 11,
    description: 'Dangerous open manhole without warning barricade near children park entrance.'
  }
];

interface CivicCommunityFeedProps {
  onOpenGrievanceDetail?: (item: GrievanceItem) => void;
  onOpenLodgeModal?: () => void;
}

export const CivicCommunityFeed: React.FC<CivicCommunityFeedProps> = ({
  onOpenGrievanceDetail,
  onOpenLodgeModal
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Latest' | 'Trending' | 'Resolved'>('All');
  const [selectedLocation, setSelectedLocation] = useState<string>('Near You (Sector 12)');
  const [locationDropdownOpen, setLocationDropdownOpen] = useState<boolean>(false);
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    SAMPLE_FEED_ITEMS.forEach(item => {
      initial[item.id] = item.likesCount;
    });
    return initial;
  });
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedItems(prev => {
      const isLiked = !prev[id];
      setLikeCounts(counts => ({
        ...counts,
        [id]: counts[id] + (isLiked ? 1 : -1)
      }));
      return { ...prev, [id]: isLiked };
    });
  };

  const handleShare = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setCopiedShareId(id);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(`${window.location.origin}#feed-${id}`).catch(() => {});
    }
    setTimeout(() => setCopiedShareId(null), 2000);
  };

  // Filter feed items based on filter tab
  const filteredItems = SAMPLE_FEED_ITEMS.filter(item => {
    if (selectedFilter === 'Latest') return item.timeAgo.includes('h ago') || item.timeAgo.includes('1h');
    if (selectedFilter === 'Trending') return item.isFeatured || item.likesCount > 40;
    if (selectedFilter === 'Resolved') return item.status === 'RESOLVED';
    return true;
  });

  const getStatusBadge = (status: FeedCardItem['status']) => {
    switch (status) {
      case 'REPORTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EF3B35]/90 text-white text-[10.5px] font-black uppercase tracking-wider shadow-md backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            REPORTED
          </span>
        );
      case 'PROCESSING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F9B51B]/95 text-[#111A35] text-[10.5px] font-black uppercase tracking-wider shadow-md backdrop-blur-md">
            <Clock className="w-3 h-3 text-[#111A35]" />
            PROCESSING
          </span>
        );
      case 'RESOLVED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2DB45A]/95 text-white text-[10.5px] font-black uppercase tracking-wider shadow-md backdrop-blur-md">
            <CheckCircle2 className="w-3 h-3 text-white" />
            RESOLVED
          </span>
        );
      case 'URGENT':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-600/95 text-white text-[10.5px] font-black uppercase tracking-wider shadow-md backdrop-blur-md border border-purple-300/40">
            <Flame className="w-3 h-3 text-amber-300" />
            URGENT
          </span>
        );
    }
  };

  return (
    <section 
      id="civic-community" 
      className="py-10 sm:py-14 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-[1536px] w-full mx-auto relative overflow-hidden"
    >
      {/* ATMOSPHERIC BACKGROUND DECORATION */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* SECTION HEADER BLOCK */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10 relative z-10">
        
        {/* LEFT: EYEBROW & TITLE */}
        <div className="space-y-2 max-w-2xl">
          {/* EYEBROW */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F1FF] border border-purple-200/80 text-[#6546D9] text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#6546D9]" />
            <span>CIVIC COMMUNITY</span>
          </div>

          {/* MAIN HEADING */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111A35] tracking-tight leading-tight">
            Voices of <span className="text-[#6546D9] italic font-serif font-normal">Your City</span>
          </h2>
        </div>

        {/* RIGHT: CONTROLS (LOCATION SELECTOR & FILTER TABS) */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
          
          {/* LOCATION DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              className="px-3.5 py-2 rounded-full bg-white/90 hover:bg-white border border-purple-200/90 text-[#111A35] text-xs sm:text-sm font-semibold shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-[#6546D9]" />
              <span>{selectedLocation}</span>
              <span className="text-purple-400 text-xs">▾</span>
            </button>

            {locationDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-purple-100 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                {[
                  'Near You (Sector 12)',
                  'Ward 4, Chandigarh',
                  'Sector 17 Market',
                  'Entire City'
                ].map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setLocationDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      selectedLocation === loc ? 'bg-purple-50 text-[#6546D9]' : 'text-zinc-700 hover:bg-zinc-50'
                    }`}
                  >
                    <span>{loc}</span>
                    {selectedLocation === loc && <Check className="w-3.5 h-3.5 text-[#6546D9]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* FILTER TABS */}
          <div className="bg-[#F4F1FF] p-1 rounded-full border border-purple-100/90 flex items-center gap-1 shadow-2xs">
            {(['All', 'Latest', 'Trending', 'Resolved'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  selectedFilter === tab
                    ? 'bg-[#6546D9] text-white shadow-xs shadow-purple-600/30'
                    : 'text-[#5D6785] hover:text-[#6546D9] hover:bg-white/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* COMPLAINT CARDS FEED (RESPONSIVE HORIZONTAL SCROLL OR CAROUSEL) */}
      <div 
        ref={scrollContainerRef}
        className="flex lg:grid lg:grid-cols-4 gap-5 overflow-x-auto lg:overflow-visible pb-4 pt-1 snap-x snap-mandatory scrollbar-none transition-all duration-300 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filteredItems.map((item) => {
          const isLiked = likedItems[item.id] || false;
          const currentLikes = likeCounts[item.id] || item.likesCount;

          return (
            <div
              key={item.id}
              className="min-w-[280px] sm:min-w-[310px] lg:min-w-0 flex-shrink-0 lg:flex-shrink snap-start group relative bg-white/95 hover:bg-white rounded-3xl border border-purple-100/90 hover:border-purple-300 shadow-md shadow-purple-950/5 hover:shadow-2xl hover:shadow-purple-900/12 transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden cursor-pointer"
              onClick={() => {
                if (onOpenGrievanceDetail) {
                  onOpenGrievanceDetail({
                    id: item.id,
                    category: item.category,
                    title: `${item.title} ${item.titleHighlight || ''}`,
                    description: item.description || '',
                    location: item.location,
                    ward: 'Ward 4',
                    distance: item.distance,
                    status: item.status === 'URGENT' ? 'Reported' : (item.status === 'PROCESSING' ? 'Processing' : (item.status === 'RESOLVED' ? 'Resolved' : 'Reported')),
                    urgency: item.status === 'URGENT' ? 'Critical' : 'High',
                    submittedDate: item.timeAgo,
                    department: 'Municipal Works',
                    photoUrl: item.imageUrl,
                    upvotes: currentLikes,
                    timeline: [
                      { step: 'Reported by Citizen', date: item.timeAgo, completed: true },
                      { step: 'Assigned to Ward Officer', date: 'In Progress', completed: item.status !== 'REPORTED' }
                    ]
                  });
                }
              }}
            >
              {/* THUMBNAIL IMAGE CONTAINER (~55-60% HEIGHT) */}
              <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-900 shrink-0">
                
                {/* IMAGE WITH ZOOM ON HOVER & FALLBACK */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    // Fallback to stylized gradient placeholder if image fails
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.classList.add('bg-gradient-to-br');
                      item.fallbackGradient.split(' ').filter(Boolean).forEach(cls => parent.classList.add(cls));
                    }
                  }}
                />

                {/* GRADIENT OVERLAY FOR TEXT LEGIBILITY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30 pointer-events-none" />

                {/* TOP-LEFT: FEATURED / TRENDING BADGE OR STATUS */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                  {item.isFeatured && item.featuredBadgeText && (
                    <span className="bg-gradient-to-r from-[#6546D9] to-[#8062F8] text-[#FFD84D] px-2.5 py-1 rounded-full text-[9.5px] font-black tracking-wider uppercase shadow-md flex items-center gap-1 border border-white/20">
                      {item.featuredBadgeText}
                    </span>
                  )}
                  {getStatusBadge(item.status)}
                </div>

                {/* TOP-RIGHT: MORE OPTIONS ⋮ BUTTON */}
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                    title="More options"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* BOTTOM OVERLAY ON IMAGE: DISTANCE & CATEGORY */}
                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-white text-xs font-semibold">
                  <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15 text-[11px]">
                    <MapPin className="w-3 h-3 text-[#FFD84D]" />
                    {item.distance}
                  </span>
                  <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10.5px] font-medium border border-white/20">
                    {item.category}
                  </span>
                </div>

              </div>

              {/* CARD BODY CONTENT */}
              <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between gap-3">
                
                {/* CITIZEN AUTHOR ROW */}
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <div className={`w-5.5 h-5.5 rounded-full ${item.citizenAvatarBg} text-white font-bold text-[9.5px] flex items-center justify-center shadow-xs`}>
                      {item.citizenName.charAt(0)}
                    </div>
                    <span className="font-semibold text-zinc-800 text-xs truncate max-w-[140px]">
                      {item.citizenName}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400 shrink-0 font-medium">{item.timeAgo}</span>
                </div>

                {/* COMPLAINT TITLE */}
                <h3 className="font-bold text-[#111A35] text-base leading-snug group-hover:text-[#6546D9] transition-colors line-clamp-2">
                  {item.title}{' '}
                  {item.titleHighlight && (
                    <span className="text-[#6546D9] italic font-serif font-normal">
                      {item.titleHighlight}
                    </span>
                  )}
                </h3>

                {/* LOCATION METADATA */}
                <div className="text-xs font-medium text-zinc-500 flex items-center gap-1.5 truncate">
                  <span className="text-zinc-400">📍</span>
                  <span className="truncate">{item.location}</span>
                </div>

                {/* CARD FOOTER: SOCIAL ENGAGEMENT ACTION ROW */}
                <div className="pt-2.5 border-t border-purple-50/80 flex items-center justify-between text-xs">
                  
                  {/* LIKE / UPVOTE BUTTON */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => toggleLike(e, item.id)}
                      className={`flex items-center gap-1.5 transition-all cursor-pointer ${
                        isLiked ? 'text-rose-600 font-bold scale-105' : 'text-zinc-500 hover:text-rose-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 transition-transform ${isLiked ? 'fill-rose-600 text-rose-600 animate-bounce' : ''}`} />
                      <span>{currentLikes}</span>
                    </button>

                    {/* COMMENTS */}
                    <div className="flex items-center gap-1.5 text-zinc-500 hover:text-purple-600 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{item.commentsCount}</span>
                    </div>

                    {/* SHARE */}
                    <button
                      onClick={(e) => handleShare(e, item.id)}
                      className="flex items-center gap-1 text-zinc-400 hover:text-purple-600 transition-colors cursor-pointer"
                      title="Share link"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      {copiedShareId === item.id && (
                        <span className="text-[10px] text-emerald-600 font-bold animate-in fade-in">Copied!</span>
                      )}
                    </button>
                  </div>

                  {/* HOVER VIEW ACTION */}
                  <div className="text-[#6546D9] font-bold text-xs flex items-center gap-0.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <span>View</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* FOOTER ACTION & CAROUSEL NAVIGATION CONTROLS */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-purple-100/60">
        
        {/* CAROUSEL ARROWS */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleScrollLeft}
            className="w-9 h-9 rounded-full bg-white border border-purple-200/80 hover:bg-[#F4F1FF] hover:border-purple-300 text-[#111A35] flex items-center justify-center shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 text-[#6546D9]" />
          </button>
          <button
            onClick={handleScrollRight}
            className="w-9 h-9 rounded-full bg-white border border-purple-200/80 hover:bg-[#F4F1FF] hover:border-purple-300 text-[#111A35] flex items-center justify-center shadow-2xs hover:shadow-xs transition-all cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 text-[#6546D9]" />
          </button>
          <span className="text-xs text-zinc-500 font-medium ml-2">
            Swipe or use arrows to view more nearby issues
          </span>
        </div>

        {/* EXPLORE ALL COMPLAINTS PILL BUTTON */}
        <button
          onClick={() => {
            if (onOpenLodgeModal) onOpenLodgeModal();
          }}
          className="px-6 py-3 rounded-full bg-[#6546D9] text-white text-xs sm:text-sm font-bold hover:bg-[#5337C4] shadow-md shadow-purple-600/20 hover:shadow-lg hover:shadow-purple-600/30 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer group"
        >
          <span>Explore all complaints</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>

    </section>
  );
};
