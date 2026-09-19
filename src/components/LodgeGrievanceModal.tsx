import React, { useState, useEffect, useRef } from 'react';
import { GrievanceItem, UrgencyLevel } from '../types';
import { 
  X, 
  MapPin, 
  Camera, 
  Upload, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Flame,
  Check,
  RefreshCw,
  Image as ImageIcon,
  Copy,
  Clock,
  Layers,
  Edit3,
  GripVertical,
  Plus
} from 'lucide-react';

interface LodgeGrievanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitNewGrievance: (newGrievance: GrievanceItem) => void;
  preFillData?: {
    category?: string;
    description?: string;
    suggestedTitle?: string;
    urgency?: UrgencyLevel;
  };
}

interface CategoryThemeConfig {
  badgeLabel: string;
  badgeSymbol: string;
  badgeBg: string;
  badgeText: string;
  primaryBtnClass: string;
  primaryTextClass: string;
  primaryAccentHex: string;
  lightBg: string;
  lightBorder: string;
  step1Title: string;
  step1Subtitle: string;
  step2Title: string;
  step2Subtitle: string;
  step3Title: string;
  step3Subtitle: string;
  optionsLabel: string;
  options: { id: string; label: string; desc: string; defaultUrgency: UrgencyLevel }[];
}

const CATEGORY_THEMES: Record<string, CategoryThemeConfig> = {
  Potholes: {
    badgeLabel: 'POTHOLE',
    badgeSymbol: '⚠️',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-[#6546D9]',
    primaryBtnClass: 'bg-[#6546D9] hover:bg-[#5337C4]',
    primaryTextClass: 'text-[#6546D9]',
    primaryAccentHex: '#6546D9',
    lightBg: 'bg-[#FAF8FF]',
    lightBorder: 'border-purple-200/90',
    step1Title: 'Show us the pothole.',
    step1Subtitle: 'Take a clear photo of the damaged road.',
    step2Title: 'Where is the pothole?',
    step2Subtitle: 'We automatically locate your GPS ward to route road repair teams.',
    step3Title: 'How serious is the pothole?',
    step3Subtitle: 'Select the severity level to calculate response urgency.',
    optionsLabel: 'How serious is the pothole?',
    options: [
      { id: 'small', label: 'Small surface dip', desc: 'Minor asphalt cracking or shallow dip', defaultUrgency: 'Low' },
      { id: 'moderate', label: 'Moderate crater', desc: 'Noticeable pothole, forces vehicles to slow down', defaultUrgency: 'Medium' },
      { id: 'dangerous', label: 'Dangerous deep hole', desc: 'Severe crater, high accident risk for vehicles', defaultUrgency: 'High' }
    ]
  },
  'Street Lights': {
    badgeLabel: 'STREET LIGHT',
    badgeSymbol: '💡',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-[#6046E8]',
    primaryBtnClass: 'bg-[#6046E8] hover:bg-[#4D33D0]',
    primaryTextClass: 'text-[#6046E8]',
    primaryAccentHex: '#6046E8',
    lightBg: 'bg-[#F8F6FF]',
    lightBorder: 'border-indigo-200/90',
    step1Title: 'Show us the street light.',
    step1Subtitle: 'A photo helps us identify the pole number & defect.',
    step2Title: 'Where is the street light?',
    step2Subtitle: 'We automatically locate nearest pole GPS coordinates in Ward 14.',
    step3Title: "What's wrong with the street light?",
    step3Subtitle: 'Select the lighting fault to calculate priority.',
    optionsLabel: "What's wrong with the street light?",
    options: [
      { id: 'not-working', label: 'Completely dark', desc: 'Light does not turn on at night', defaultUrgency: 'Medium' },
      { id: 'flickering', label: 'Flickering bulb', desc: 'Unstable illumination or wiring fault', defaultUrgency: 'Medium' },
      { id: 'damaged-pole', label: 'Damaged pole or wires', desc: 'Pole bent or dangerous exposed wiring', defaultUrgency: 'Critical' },
      { id: 'daytime-on', label: 'ON during daytime', desc: 'Energy wastage during daytime', defaultUrgency: 'Low' }
    ]
  },
  'Water Leakage': {
    badgeLabel: 'WATER LEAKAGE',
    badgeSymbol: '💧',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-[#B47000]',
    primaryBtnClass: 'bg-[#D98A00] hover:bg-[#B87500]',
    primaryTextClass: 'text-[#D98A00]',
    primaryAccentHex: '#D98A00',
    lightBg: 'bg-[#FFFDF2]',
    lightBorder: 'border-amber-200/90',
    step1Title: 'Show us the leak.',
    step1Subtitle: 'Capture the leaking pipe, tap, valve or affected area.',
    step2Title: 'Where is the leak?',
    step2Subtitle: 'Locating nearest pipeline zone & municipal water supply unit.',
    step3Title: 'How severe is the water leak?',
    step3Subtitle: 'Select leak rate and impact to calculate dispatch priority.',
    optionsLabel: 'How severe is the water leak?',
    options: [
      { id: 'minor-drip', label: 'Minor tap or valve leak', desc: 'Slow constant dripping from public fixture', defaultUrgency: 'Low' },
      { id: 'pipe-burst', label: 'Main pipe burst / gusher', desc: 'Heavy pressurized drinking water wastage', defaultUrgency: 'Critical' },
      { id: 'sewage-leak', label: 'Sewage pipeline overflow', desc: 'Foul water spilling onto public road', defaultUrgency: 'High' },
      { id: 'low-pressure', label: 'No water supply in block', desc: 'Water supply interrupted in neighborhood', defaultUrgency: 'Medium' }
    ]
  },
  Waterlogging: {
    badgeLabel: 'WATERLOGGING',
    badgeSymbol: '🌊',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-[#1D4ED8]',
    primaryBtnClass: 'bg-[#2563EB] hover:bg-[#1D4ED8]',
    primaryTextClass: 'text-[#2563EB]',
    primaryAccentHex: '#2563EB',
    lightBg: 'bg-[#F0F7FF]',
    lightBorder: 'border-blue-200/90',
    step1Title: 'Show us the waterlogging.',
    step1Subtitle: 'Capture the affected road or flooded area.',
    step2Title: 'Where is the waterlogging?',
    step2Subtitle: 'Locating flooded street segment & storm drain sector.',
    step3Title: 'How deep is the water?',
    step3Subtitle: 'Select accumulation depth to calculate dispatch urgency.',
    optionsLabel: 'How deep is the accumulated water?',
    options: [
      { id: 'ankle', label: 'Ankle deep water', desc: 'Pedestrians struggling to cross sidewalk', defaultUrgency: 'Low' },
      { id: 'knee', label: 'Knee deep water', desc: 'Two-wheelers stalling and traffic delayed', defaultUrgency: 'High' },
      { id: 'severe', label: 'Flooded underpass / road', desc: 'Vehicles stranded, traffic completely blocked', defaultUrgency: 'Critical' }
    ]
  },
  'Garbage Dump': {
    badgeLabel: 'GARBAGE DUMP',
    badgeSymbol: '🗑️',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-[#047857]',
    primaryBtnClass: 'bg-[#059669] hover:bg-[#047857]',
    primaryTextClass: 'text-[#059669]',
    primaryAccentHex: '#059669',
    lightBg: 'bg-[#F0FDF4]',
    lightBorder: 'border-emerald-200/90',
    step1Title: 'Show us the waste problem.',
    step1Subtitle: 'Capture the overflowing or illegally dumped waste.',
    step2Title: 'Where is the waste dumped?',
    step2Subtitle: 'Locating nearest sanitation sector & collection unit.',
    step3Title: "What's the waste problem?",
    step3Subtitle: 'Select the garbage issue to dispatch sanitation crew.',
    optionsLabel: "What's the waste issue?",
    options: [
      { id: 'overflowing', label: 'Overflowing public bins', desc: 'Garbage spilling out onto footpaths & roads', defaultUrgency: 'High' },
      { id: 'missed-door', label: 'Missed door-to-door vehicle', desc: 'Sanitation truck did not collect waste today', defaultUrgency: 'Medium' },
      { id: 'illegal-dump', label: 'Illegal construction debris', desc: 'Building materials dumped in public space', defaultUrgency: 'Medium' },
      { id: 'foul-smell', label: 'Health hazard / rotting waste', desc: 'High foul smell requiring urgent sanitization', defaultUrgency: 'Critical' }
    ]
  },
  'Broken Footpath': {
    badgeLabel: 'BROKEN FOOTPATH',
    badgeSymbol: '🧱',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-[#C2410C]',
    primaryBtnClass: 'bg-[#EA580C] hover:bg-[#C2410C]',
    primaryTextClass: 'text-[#EA580C]',
    primaryAccentHex: '#EA580C',
    lightBg: 'bg-[#FFF7ED]',
    lightBorder: 'border-orange-200/90',
    step1Title: 'Show us the broken footpath.',
    step1Subtitle: 'Capture the broken tiles, hazard, or paving.',
    step2Title: 'Where is the damaged footpath?',
    step2Subtitle: 'Locating pedestrian walkway segment in Ward 14.',
    step3Title: "What's wrong with the footpath?",
    step3Subtitle: 'Select walkway hazard type to calculate priority.',
    optionsLabel: "What's wrong with the footpath?",
    options: [
      { id: 'loose-tiles', label: 'Loose or cracked tiles', desc: 'Tripping hazard for pedestrians and elderly', defaultUrgency: 'Low' },
      { id: 'missing-slabs', label: 'Missing pavement slabs', desc: 'Deep gaps in walkway causing fall hazard', defaultUrgency: 'Medium' },
      { id: 'blocked-walkway', label: 'Encroached or blocked path', desc: 'Walkway obstructed, forcing citizens onto road', defaultUrgency: 'High' }
    ]
  },
  'Open Manhole': {
    badgeLabel: 'OPEN MANHOLE',
    badgeSymbol: '🕳️',
    badgeBg: 'bg-pink-100',
    badgeText: 'text-[#BE185D]',
    primaryBtnClass: 'bg-[#DB2777] hover:bg-[#BE185D]',
    primaryTextClass: 'text-[#DB2777]',
    primaryAccentHex: '#DB2777',
    lightBg: 'bg-[#FDF2F8]',
    lightBorder: 'border-pink-200/90',
    step1Title: 'Show us the open manhole.',
    step1Subtitle: 'Take a photo from a safe distance.',
    step2Title: 'Where is the open manhole?',
    step2Subtitle: 'Locating hazard point for emergency sewer team dispatch.',
    step3Title: "What's the manhole hazard?",
    step3Subtitle: 'Select danger severity to alert emergency crew.',
    optionsLabel: "What's the manhole hazard?",
    options: [
      { id: 'uncovered', label: 'Completely open sewer lid', desc: 'Uncovered sewer lid posing deadly fall risk', defaultUrgency: 'Critical' },
      { id: 'cracked-cover', label: 'Broken or wobbly lid', desc: 'Chamber lid cracked or unstable under foot', defaultUrgency: 'High' },
      { id: 'sinking', label: 'Sinking drain frame', desc: 'Manhole frame depressed into road surface', defaultUrgency: 'Medium' }
    ]
  },
  'Traffic Signal': {
    badgeLabel: 'TRAFFIC SIGNAL',
    badgeSymbol: '🚦',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-[#3730A3]',
    primaryBtnClass: 'bg-[#432EB5] hover:bg-[#342396]',
    primaryTextClass: 'text-[#432EB5]',
    primaryAccentHex: '#432EB5',
    lightBg: 'bg-[#EEF2FF]',
    lightBorder: 'border-indigo-200/90',
    step1Title: 'Show us the traffic signal.',
    step1Subtitle: 'A photo helps identify the signal junction & defect.',
    step2Title: 'Where is the traffic signal?',
    step2Subtitle: 'Locating traffic intersection in Ward 14.',
    step3Title: "What's the signal fault?",
    step3Subtitle: 'Select traffic signal issue to dispatch electrical team.',
    optionsLabel: "What's the signal fault?",
    options: [
      { id: 'dark-signal', label: 'Signal lights completely OFF', desc: 'Intersection unmonitored, severe traffic chaos', defaultUrgency: 'Critical' },
      { id: 'stuck-red', label: 'Stuck on single light color', desc: 'Timer malfunction causing long vehicle pileup', defaultUrgency: 'High' },
      { id: 'damaged-box', label: 'Physical signal box damage', desc: 'Pole or control panel physically damaged', defaultUrgency: 'Medium' }
    ]
  },
  'Drainage Issue': {
    badgeLabel: 'DRAINAGE ISSUE',
    badgeSymbol: '🧪',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-[#B47000]',
    primaryBtnClass: 'bg-[#D98A00] hover:bg-[#B87500]',
    primaryTextClass: 'text-[#D98A00]',
    primaryAccentHex: '#D98A00',
    lightBg: 'bg-[#FFFDF2]',
    lightBorder: 'border-amber-200/90',
    step1Title: 'Show us the drainage issue.',
    step1Subtitle: 'Capture the blocked gutter, sewer overflow or drain.',
    step2Title: 'Where is the drainage issue?',
    step2Subtitle: 'Locating drainage line & sewage treatment sector.',
    step3Title: "What's wrong with the drainage?",
    step3Subtitle: 'Select gutter defect to calculate priority.',
    optionsLabel: "What's wrong with the drainage?",
    options: [
      { id: 'clogged-drain', label: 'Clogged drain / choked gutter', desc: 'Sludge accumulation blocking water flow', defaultUrgency: 'Medium' },
      { id: 'sewage-spill', label: 'Sewage water spilling', desc: 'Foul wastewater overflowing onto street', defaultUrgency: 'High' },
      { id: 'foul-odor', label: 'Severe foul odor / gas', desc: 'Strong sewer gas leak affecting nearby homes', defaultUrgency: 'Medium' }
    ]
  }
};

const DEFAULT_CATEGORY_THEME: CategoryThemeConfig = {
  badgeLabel: 'PUBLIC GRIEVANCE',
  badgeSymbol: '📌',
  badgeBg: 'bg-purple-100',
  badgeText: 'text-[#6546D9]',
  primaryBtnClass: 'bg-[#6546D9] hover:bg-[#5337C4]',
  primaryTextClass: 'text-[#6546D9]',
  primaryAccentHex: '#6546D9',
  lightBg: 'bg-[#FAF8FF]',
  lightBorder: 'border-purple-200/90',
  step1Title: "Show us what's wrong.",
  step1Subtitle: 'Take a photo or upload one so we can understand the issue faster.',
  step2Title: 'Where is the problem?',
  step2Subtitle: 'We automatically locate your GPS ward to route to the correct municipal team.',
  step3Title: 'Tell us a bit more',
  step3Subtitle: 'Select issue details to calculate response priority.',
  optionsLabel: 'What is the primary issue detail?',
  options: [
    { id: 'urgent-repair', label: 'Urgent repair needed', desc: 'Poses immediate inconvenience or safety risk', defaultUrgency: 'High' },
    { id: 'routine-maint', label: 'Routine maintenance', desc: 'Standard civic repair or replacement', defaultUrgency: 'Medium' },
    { id: 'safety-hazard', label: 'Critical safety hazard', desc: 'High risk of harm or property damage', defaultUrgency: 'Critical' }
  ]
};

function getCategoryTheme(catName: string): CategoryThemeConfig {
  if (CATEGORY_THEMES[catName]) return CATEGORY_THEMES[catName];
  
  const norm = (catName || '').toLowerCase().trim();
  if (norm.includes('pothole')) return CATEGORY_THEMES['Potholes'];
  if (norm.includes('light')) return CATEGORY_THEMES['Street Lights'];
  if (norm.includes('leak')) return CATEGORY_THEMES['Water Leakage'];
  if (norm.includes('logging') || norm.includes('flood')) return CATEGORY_THEMES['Waterlogging'];
  if (norm.includes('garbage') || norm.includes('waste') || norm.includes('dump')) return CATEGORY_THEMES['Garbage Dump'];
  if (norm.includes('footpath') || norm.includes('walkway') || norm.includes('pavement')) return CATEGORY_THEMES['Broken Footpath'];
  if (norm.includes('manhole') || norm.includes('drain cover')) return CATEGORY_THEMES['Open Manhole'];
  if (norm.includes('signal') || norm.includes('traffic')) return CATEGORY_THEMES['Traffic Signal'];
  if (norm.includes('drain')) return CATEGORY_THEMES['Drainage Issue'];

  return DEFAULT_CATEGORY_THEME;
}

// Sample realistic images for quick sample attach
const SAMPLE_CATEGORY_IMAGES: Record<string, string> = {
  Potholes: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
  'Street Lights': 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80',
  'Water Leakage': 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600&q=80',
  'Garbage Dump': 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
  Waterlogging: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=600&q=80',
  'Public Safety': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80'
};

export const LodgeGrievanceModal: React.FC<LodgeGrievanceModalProps> = ({
  isOpen,
  onClose,
  onSubmitNewGrievance,
  preFillData
}) => {
  // Wizard Step: 1 = Photo, 2 = Location, 3 = Details & Priority, 4 = Review, 5 = Success
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [category, setCategory] = useState<string>('Potholes');
  const [photos, setPhotos] = useState<string[]>([]);
  const [locationAddress, setLocationAddress] = useState<string>('Sector 12, Civil Lines, Ward 14');
  const [landmark, setLandmark] = useState<string>('Near St. Xavier School Gate');
  const [isChangingLocation, setIsChangingLocation] = useState<boolean>(false);

  // Category specific options state
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [urgency, setUrgency] = useState<UrgencyLevel>('High');
  const [isUrgencyManuallyChanged, setIsUrgencyManuallyChanged] = useState<boolean>(false);
  const [showUrgencyPicker, setShowUrgencyPicker] = useState<boolean>(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const theme = getCategoryTheme(category);

  // Drag & drop state for photo reordering
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleReorderPhotos = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    setPhotos(prev => {
      const updated = [...prev];
      const [movedItem] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedItem);
      return updated;
    });
  };

  // Synchronize state when modal opens or preFillData changes
  useEffect(() => {
    if (isOpen) {
      const initCategory = preFillData?.category || 'Potholes';
      setCategory(initCategory);
      setStep(1);
      setPhotos([]);
      setDraggedIndex(null);
      setDragOverIndex(null);
      setCustomNotes(preFillData?.description || '');
      setLocationAddress('Sector 12, Civil Lines, Ward 14');
      setLandmark('Near St. Xavier School Gate');
      setIsChangingLocation(false);
      setSubmittedCode(null);
      setCopiedCode(false);
      setIsUrgencyManuallyChanged(false);
      setShowUrgencyPicker(false);

      // Set default option for category
      const currentTheme = getCategoryTheme(initCategory);
      if (currentTheme.options.length > 0) {
        setSelectedOptionId(currentTheme.options[0].id);
        setUrgency(preFillData?.urgency || currentTheme.options[0].defaultUrgency);
      } else {
        setUrgency(preFillData?.urgency || 'High');
      }
    }
  }, [isOpen, preFillData]);

  // Update urgency when option changes (unless user explicitly overrode it)
  const handleSelectOption = (optionId: string, defaultUrgency: UrgencyLevel) => {
    setSelectedOptionId(optionId);
    if (!isUrgencyManuallyChanged) {
      setUrgency(defaultUrgency);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              setPhotos(prev => [...prev, reader.result as string]);
            }
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleAttachSamplePhoto = () => {
    const sample = SAMPLE_CATEGORY_IMAGES[category] || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80';
    if (!photos.includes(sample)) {
      setPhotos(prev => [...prev, sample]);
    }
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const code = `GRV-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const selectedOptionObj = theme.options.find(o => o.id === selectedOptionId);

      const titleText = selectedOptionObj 
        ? `${category}: ${selectedOptionObj.label}`
        : `${category} reported in ${locationAddress}`;

      const descText = customNotes || (selectedOptionObj ? selectedOptionObj.desc : 'Citizen reported issue details.');

      const newGrievanceItem: GrievanceItem = {
        id: code,
        category: category,
        title: titleText,
        description: descText,
        location: locationAddress,
        ward: 'Ward 14 - Civil Lines',
        distance: '150m away',
        status: 'Reported',
        urgency: urgency,
        submittedDate: 'Just now',
        expectedDate: '3-4 business days',
        assignedOfficer: 'Queued for Ward Inspection',
        department: category === 'Water Leakage' || category === 'Waterlogging' 
          ? 'Water & Sanitation Board'
          : category === 'Street Lights'
          ? 'Electrical Maintenance Division'
          : category === 'Garbage Dump'
          ? 'Solid Waste Management Cell'
          : 'Municipal Public Works Board',
        photoUrl: photos[0] || SAMPLE_CATEGORY_IMAGES[category] || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
        upvotes: 1,
        timeline: [
          { step: 'Grievance Registered', date: 'Just now', completed: true, note: 'Unique tracking code issued' },
          { step: 'Ward Officer Verification', date: 'Pending', completed: false },
          { step: 'Field Inspection & Repair', date: 'Pending', completed: false },
          { step: 'Resolution Verified', date: 'Pending', completed: false }
        ]
      };

      onSubmitNewGrievance(newGrievanceItem);
      setIsSubmitting(false);
      setSubmittedCode(code);
      setStep(5);
    }, 1000);
  };

  const copyToClipboard = () => {
    if (submittedCode && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(submittedCode).catch(() => {});
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  if (!isOpen) return null;

  const selectedOptionObj = theme.options.find(o => o.id === selectedOptionId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-[28px] sm:rounded-[36px] border border-purple-100 shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden relative">
        
        {/* MODAL HEADER WITH BRAND BADGE, CLOSE BUTTON & STEP PROGRESS */}
        <div className={`px-5 sm:px-8 pt-5 sm:pt-6 pb-4 border-b ${theme.lightBorder} ${theme.lightBg} shrink-0`}>
          
          <div className="flex items-center justify-between mb-3.5">
            
            {/* JAN SAHAYAK BRAND BADGE */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-black uppercase tracking-wider`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Jan Sahaayak Assistant</span>
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-500 hover:text-[#111A35] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* MINIMAL STEP PROGRESS BREADCRUMBS */}
          {step < 5 && (
            <div className="flex items-center justify-between gap-1 sm:gap-2">
              {[
                { num: 1, label: '01 Photo' },
                { num: 2, label: '02 Location' },
                { num: 3, label: '03 Details' },
                { num: 4, label: '04 Submit' }
              ].map((s) => {
                const isActive = step === s.num;
                const isCompleted = step > s.num;

                return (
                  <button
                    key={s.num}
                    onClick={() => {
                      if (isCompleted) setStep(s.num as any);
                    }}
                    disabled={!isCompleted}
                    style={isActive ? { backgroundColor: theme.primaryAccentHex } : undefined}
                    className={`flex-1 py-1.5 sm:py-2 px-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isActive
                        ? 'text-white shadow-sm'
                        : isCompleted
                        ? `${theme.badgeBg} ${theme.badgeText} cursor-pointer hover:opacity-80`
                        : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <span className="opacity-90">{s.label}</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

        </div>

        {/* MODAL BODY CONTENT */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: PHOTO FIRST */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
              
              {/* CATEGORY BADGE & STEP HEADING */}
              <div className="space-y-1.5">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText}`}>
                  <span className="text-sm">{theme.badgeSymbol}</span>
                  <span>{theme.badgeLabel}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#111A35] tracking-tight">
                  {theme.step1Title}
                </h2>
                <p className="text-zinc-600 text-sm font-medium">
                  {theme.step1Subtitle}
                </p>
              </div>

              {/* UPLOAD & TAKE PHOTO DROPZONE */}
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {/* 1. BEFORE ANY IMAGE IS UPLOADED: LARGE DASHED UPLOAD DROPZONE */}
                {photos.length === 0 ? (
                  <div className={`border-2 border-dashed ${theme.lightBorder} rounded-3xl p-6 sm:p-8 ${theme.lightBg} hover:opacity-95 transition-all duration-300 text-center flex flex-col items-center justify-center gap-4`}>
                    
                    <div className={`w-14 h-14 rounded-2xl ${theme.badgeBg} ${theme.badgeText} flex items-center justify-center shadow-xs`}>
                      <Camera className="w-7 h-7" />
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm sm:text-base font-bold text-[#111A35]">
                        Take a photo or upload from gallery
                      </p>
                      <p className="text-xs text-zinc-500 font-medium">
                        High-quality photos help ward teams inspect & fix issues faster.
                      </p>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={`px-4 py-2.5 rounded-full ${theme.primaryBtnClass} text-white text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]`}
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Take Photo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className={`px-4 py-2.5 rounded-full bg-white border ${theme.lightBorder} text-[#111A35] text-xs font-bold hover:bg-zinc-50 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]`}
                      >
                        <Upload className={`w-3.5 h-3.5 ${theme.primaryTextClass}`} />
                        <span>Upload Photo</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleAttachSamplePhoto}
                        className={`px-3 py-2 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-semibold hover:opacity-80 transition-colors cursor-pointer`}
                      >
                        + Use sample photo
                      </button>
                    </div>

                  </div>
                ) : (
                  /* 2. AFTER FIRST IMAGE IS UPLOADED: COMPACT UPLOAD CONTROL */
                  <div className={`border border-dashed ${theme.lightBorder} rounded-2xl p-3 sm:p-3.5 ${theme.lightBg} transition-all duration-300 flex items-center justify-between gap-3 shadow-2xs`}>
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-9 h-9 rounded-xl ${theme.badgeBg} ${theme.badgeText} flex items-center justify-center shrink-0`}>
                        <Camera className="w-4.5 h-4.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-black text-[#111A35]">
                            + Add more photos
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${theme.badgeBg} ${theme.badgeText}`}>
                            {photos.length}/5 uploaded
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 font-medium truncate">
                          Up to 5 photos
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {photos.length < 5 && (
                        <>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className={`px-3 py-1.5 rounded-full ${theme.primaryBtnClass} text-white text-xs font-bold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.02]`}
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Take Photo</span>
                            <span className="sm:hidden">+ Photo</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className={`px-2.5 py-1.5 rounded-full bg-white border ${theme.lightBorder} text-[#111A35] text-xs font-bold hover:bg-zinc-50 transition-all flex items-center gap-1 cursor-pointer`}
                            title="Upload from gallery"
                          >
                            <Upload className={`w-3.5 h-3.5 ${theme.primaryTextClass}`} />
                            <span className="hidden sm:inline">Upload</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* 3. UPLOADED IMAGE GALLERY WITH DRAG & DROP REORDERING */}
                {photos.length > 0 && (
                  <div className="space-y-2.5 animate-in fade-in duration-300">
                    
                    {/* GALLERY HELPER TEXT */}
                    <div className="flex items-center justify-between text-xs px-1">
                      <div className="flex items-center gap-1.5 text-zinc-600">
                        <GripVertical className="w-3.5 h-3.5 text-purple-600 animate-pulse shrink-0" />
                        <span className="text-[11px] sm:text-xs font-medium text-zinc-600">
                          Drag to reorder • <span className="font-bold text-[#111A35]">First image is your thumbnail</span>
                        </span>
                      </div>
                    </div>

                    {/* HORIZONTAL COMPACT GALLERY */}
                    <div className="flex items-center gap-3.5 overflow-x-auto pb-3 pt-1 px-1">
                      {photos.map((src, idx) => {
                        const isPrimary = idx === 0;
                        const isDragging = draggedIndex === idx;
                        const isDragOver = dragOverIndex === idx;

                        return (
                          <div
                            key={idx}
                            draggable
                            onDragStart={(e) => {
                              setDraggedIndex(idx);
                              e.dataTransfer.effectAllowed = 'move';
                            }}
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.dataTransfer.dropEffect = 'move';
                              setDragOverIndex(idx);
                            }}
                            onDragEnter={() => setDragOverIndex(idx)}
                            onDragLeave={() => setDragOverIndex(null)}
                            onDragEnd={() => {
                              setDraggedIndex(null);
                              setDragOverIndex(null);
                            }}
                            onDrop={(e) => {
                              e.preventDefault();
                              if (draggedIndex !== null && draggedIndex !== idx) {
                                handleReorderPhotos(draggedIndex, idx);
                              }
                              setDraggedIndex(null);
                              setDragOverIndex(null);
                            }}
                            className={`relative shrink-0 rounded-2xl transition-all duration-200 group cursor-grab active:cursor-grabbing select-none ${
                              isPrimary
                                ? 'w-32 h-32 sm:w-36 sm:h-36 ring-2 ring-purple-600 ring-offset-2 shadow-md'
                                : 'w-24 h-24 sm:w-28 sm:h-28 border border-purple-200/80 shadow-2xs hover:shadow-md hover:scale-[1.02]'
                            } ${
                              isDragging ? 'opacity-40 scale-95 shadow-2xl ring-2 ring-dashed ring-purple-400' : ''
                            } ${
                              isDragOver && !isDragging ? 'ring-2 ring-purple-500 scale-105' : ''
                            }`}
                          >
                            {/* IMAGE PREVIEW */}
                            <img
                              src={src}
                              alt={isPrimary ? 'Primary Complaint Thumbnail' : `Supporting photo ${idx + 1}`}
                              className="w-full h-full object-cover rounded-2xl pointer-events-none"
                            />

                            {/* GRADIENT OVERLAY */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 rounded-2xl pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />

                            {/* PRIMARY IMAGE BADGE */}
                            {isPrimary ? (
                              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#6546D9] text-white text-[10px] font-black uppercase tracking-wider shadow-xs flex items-center gap-1 z-10 animate-in fade-in">
                                <Sparkles className="w-2.5 h-2.5" />
                                <span>Thumbnail</span>
                              </div>
                            ) : (
                              <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-black/50 backdrop-blur-xs text-white text-[9px] font-bold z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                                Supporting
                              </div>
                            )}

                            {/* REMOVE BUTTON */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemovePhoto(idx);
                              }}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors shadow-xs z-20 cursor-pointer"
                              title="Remove photo"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>

                            {/* HOVER DRAG INDICATOR */}
                            <div className="absolute bottom-1.5 right-1.5 p-1 rounded-md bg-black/40 backdrop-blur-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                              <GripVertical className="w-3 h-3" />
                            </div>

                            {/* HOVER QUICK 'MAKE THUMBNAIL' BUTTON FOR SUPPORTING IMAGES */}
                            {!isPrimary && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleReorderPhotos(idx, 0);
                                }}
                                className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-white/90 text-[#111A35] text-[9px] font-extrabold shadow-xs hover:bg-[#6546D9] hover:text-white transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
                                title="Make this image the main thumbnail"
                              >
                                Make Thumbnail
                              </button>
                            )}
                          </div>
                        );
                      })}

                      {/* INLINE + ADD BUTTON IN GALLERY */}
                      {photos.length < 5 && (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-dashed ${theme.lightBorder} ${theme.lightBg} hover:border-purple-400 hover:bg-purple-50 flex flex-col items-center justify-center gap-1 text-zinc-500 hover:${theme.primaryTextClass} transition-all cursor-pointer shrink-0 shadow-2xs group`}
                        >
                          <div className={`w-7 h-7 rounded-full ${theme.badgeBg} ${theme.badgeText} group-hover:scale-110 flex items-center justify-center transition-transform`}>
                            <Plus className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-bold">+ Add Photo</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* STEP 1 FOOTER ACTIONS */}
              <div className={`pt-4 border-t ${theme.lightBorder} flex items-center justify-between gap-3`}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs font-bold text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
                >
                  Skip for now
                </button>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`px-6 py-3 rounded-full ${theme.primaryBtnClass} text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: SMART LOCATION */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-2 duration-200">
              
              {/* HEADING & BADGE */}
              <div className="space-y-1">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText}`}>
                  <span className="text-xs">{theme.badgeSymbol}</span>
                  <span>{theme.badgeLabel}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[#111A35] tracking-tight">
                  {theme.step2Title}
                </h2>
                <p className="text-xs text-zinc-500 font-normal">
                  Confirm the detected location.
                </p>
              </div>

              {/* SIMPLIFIED LOCATION CARD */}
              <div className={`${theme.lightBg} border ${theme.lightBorder} rounded-2xl p-4 sm:p-5 space-y-3.5 relative overflow-hidden`}>
                
                {/* STATUS BADGE & ADDRESS INFO */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Location detected</span>
                  </div>

                  {!isChangingLocation ? (
                    <div className="space-y-0.5">
                      <p className="text-base sm:text-lg font-semibold text-[#111A35] leading-snug">
                        {locationAddress}
                      </p>
                      <p className="text-xs font-normal text-zinc-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                        <span>{landmark}</span>
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 pt-1">
                      <div>
                        <label className="block text-xs font-medium text-zinc-600 mb-1">
                          Address / Area Name
                        </label>
                        <input
                          type="text"
                          value={locationAddress}
                          onChange={(e) => setLocationAddress(e.target.value)}
                          className={`w-full px-3.5 py-2 rounded-xl bg-white border ${theme.lightBorder} text-xs font-medium text-[#111A35] focus:outline-none focus:ring-1 focus:ring-purple-400`}
                          placeholder="Enter street or area name"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-zinc-600 mb-1">
                          Landmark (Optional)
                        </label>
                        <input
                          type="text"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                          className={`w-full px-3.5 py-2 rounded-xl bg-white border ${theme.lightBorder} text-xs font-medium text-[#111A35] focus:outline-none focus:ring-1 focus:ring-purple-400`}
                          placeholder="Near gate, pillar or shop number"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsChangingLocation(false)}
                        className={`px-3.5 py-1.5 rounded-full ${theme.badgeBg} ${theme.badgeText} text-xs font-semibold hover:opacity-80 transition-colors cursor-pointer`}
                      >
                        Save Location
                      </button>
                    </div>
                  )}
                </div>

                {/* SIMPLIFIED MAP VISUAL */}
                <div className="relative w-full h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 flex items-center justify-center">
                  
                  {/* CLEAN LIGHT MAP BACKDROP */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-100" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:20px_20px] opacity-50" />
                  <div className="absolute inset-0 bg-[radial-gradient(#818cf8_0.75px,transparent_0.75px)] [background-size:12px_12px] opacity-20" />
                  
                  {/* SIMULATED ROADS */}
                  <div className="absolute w-full h-3 bg-white/80 top-1/2 -translate-y-1/2 -rotate-12 border-y border-slate-200/60" />
                  <div className="absolute h-full w-3 bg-white/80 left-1/2 -translate-x-1/2 rotate-12 border-x border-slate-200/60" />

                  {/* PULSING GPS LOCATION PIN */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-purple-400/30 animate-ping absolute" />
                      <div className={`w-8 h-8 rounded-full ${theme.primaryBtnClass} text-white flex items-center justify-center shadow-md border-2 border-white`}>
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* SMALL STATUS BADGE */}
                  <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-emerald-700 text-[10px] font-medium px-2 py-0.5 rounded-full border border-emerald-200/80 shadow-2xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>GPS Signal Strong</span>
                  </div>

                </div>

              </div>

              {/* LOCATION CONFIRMATION BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={`w-full sm:flex-1 py-3 px-5 rounded-full ${theme.primaryBtnClass} text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]`}
                >
                  <Check className="w-4 h-4" />
                  <span>Use this location</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsChangingLocation(!isChangingLocation)}
                  className={`w-full sm:w-auto py-3 px-5 rounded-full bg-white border ${theme.lightBorder} text-[#111A35] text-xs font-semibold hover:bg-zinc-50 transition-all flex items-center justify-center gap-2 cursor-pointer`}
                >
                  <Edit3 className={`w-3.5 h-3.5 ${theme.primaryTextClass}`} />
                  <span>{isChangingLocation ? 'Done editing' : 'Change location'}</span>
                </button>
              </div>

              {/* STEP 2 FOOTER BACK BUTTON */}
              <div className={`pt-2 border-t ${theme.lightBorder} flex items-center justify-between`}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-medium text-zinc-500 hover:text-zinc-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Photo</span>
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: SMART DETAILS & AUTOMATIC PRIORITY */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-200">
              
              {/* HEADING & BADGE */}
              <div className="space-y-1.5">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText}`}>
                  <span className="text-sm">{theme.badgeSymbol}</span>
                  <span>{theme.badgeLabel}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#111A35] tracking-tight">
                  {theme.step3Title}
                </h2>
                <p className="text-zinc-600 text-sm font-medium">
                  {theme.optionsLabel}
                </p>
              </div>

              {/* TAILORED CATEGORY OPTIONS */}
              <div className="space-y-2.5">
                {theme.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id, opt.defaultUrgency)}
                      style={isSelected ? { borderColor: theme.primaryAccentHex } : undefined}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${
                        isSelected
                          ? `${theme.lightBg} shadow-xs`
                          : `bg-white ${theme.lightBorder} hover:bg-zinc-50`
                      }`}
                    >
                      <div 
                        style={isSelected ? { backgroundColor: theme.primaryAccentHex, borderColor: theme.primaryAccentHex } : undefined}
                        className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                          isSelected ? 'text-white' : 'border-zinc-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>

                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-xs sm:text-sm text-[#111A35]">
                            {opt.label}
                          </span>
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            opt.defaultUrgency === 'Critical' ? 'bg-rose-100 text-rose-700' :
                            opt.defaultUrgency === 'High' ? `${theme.badgeBg} ${theme.badgeText}` :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {opt.defaultUrgency}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 font-medium">
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* OPTIONAL NOTES */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-zinc-700">
                  Anything else we should know? <span className="text-zinc-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  placeholder="e.g. Near school gate, morning rush hour traffic delay..."
                  className={`w-full p-3 rounded-2xl ${theme.lightBg} border ${theme.lightBorder} text-xs font-medium text-[#111A35] focus:outline-none resize-none`}
                />
              </div>

              {/* SMART SUGGESTED PRIORITY */}
              <div className={`${theme.lightBg} border ${theme.lightBorder} rounded-2xl p-4 flex items-center justify-between gap-3`}>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${theme.badgeBg} ${theme.badgeText} flex items-center justify-center shrink-0`}>
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-500 font-bold uppercase tracking-wider block">Suggested Priority</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-[#111A35] flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          urgency === 'Critical' ? 'bg-rose-600' : urgency === 'High' ? 'bg-purple-600' : 'bg-amber-500'
                        }`} />
                        {urgency} Priority
                      </span>
                      <span className="text-[11px] text-zinc-400 font-medium">(Auto-calculated)</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowUrgencyPicker(!showUrgencyPicker)}
                  className={`text-xs font-bold ${theme.primaryTextClass} hover:underline cursor-pointer shrink-0`}
                >
                  Change
                </button>
              </div>

              {/* MANUAL PRIORITY OVERRIDE SELECTOR */}
              {showUrgencyPicker && (
                <div className={`bg-white p-3 rounded-2xl border ${theme.lightBorder} space-y-2 animate-in fade-in`}>
                  <span className="text-xs font-bold text-zinc-700 block">Select Priority Level:</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['Low', 'Medium', 'High', 'Critical'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => {
                          setUrgency(lvl);
                          setIsUrgencyManuallyChanged(true);
                          setShowUrgencyPicker(false);
                        }}
                        style={urgency === lvl ? { backgroundColor: theme.primaryAccentHex } : undefined}
                        className={`py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                          urgency === lvl
                            ? 'text-white shadow-xs'
                            : `${theme.badgeBg} ${theme.badgeText} hover:opacity-80`
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3 FOOTER */}
              <div className={`pt-4 border-t ${theme.lightBorder} flex items-center justify-between`}>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs font-bold text-zinc-500 hover:text-zinc-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Location</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className={`px-6 py-3 rounded-full ${theme.primaryBtnClass} text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer`}
                >
                  <span>Continue to Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 4: REVIEW & SUBMIT */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-200">
              
              {/* HEADING & BADGE */}
              <div className="space-y-1.5">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider ${theme.badgeBg} ${theme.badgeText}`}>
                  <span className="text-sm">{theme.badgeSymbol}</span>
                  <span>{theme.badgeLabel}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-[#111A35] tracking-tight">
                  Ready to report?
                </h2>
                <p className="text-zinc-600 text-sm font-medium">
                  Review your summary before lodging this grievance with Ward 14 Municipal Board.
                </p>
              </div>

              {/* SUMMARY GRID (2x2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* 1. EVIDENCE */}
                <div className={`${theme.lightBg} border ${theme.lightBorder} rounded-2xl p-4 flex items-center gap-3`}>
                  <div className={`w-12 h-12 rounded-xl ${theme.badgeBg} ${theme.badgeText} flex items-center justify-center shrink-0 overflow-hidden`}>
                    {photos.length > 0 ? (
                      <img src={photos[0]} alt="Evidence" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className={`w-5 h-5 ${theme.primaryTextClass}`} />
                    )}
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">01 Evidence</span>
                    <span className="text-xs font-extrabold text-[#111A35] block">
                      {photos.length > 0 ? `${photos.length} Photo Attached` : 'No Photo (Skipped)'}
                    </span>
                  </div>
                </div>

                {/* 2. LOCATION */}
                <div className={`${theme.lightBg} border ${theme.lightBorder} rounded-2xl p-4 flex items-center gap-3`}>
                  <div className={`w-10 h-10 rounded-xl ${theme.badgeBg} ${theme.badgeText} flex items-center justify-center shrink-0`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">02 Location</span>
                    <span className="text-xs font-extrabold text-[#111A35] truncate block">
                      {locationAddress}
                    </span>
                  </div>
                </div>

                {/* 3. ISSUE */}
                <div className={`${theme.lightBg} border ${theme.lightBorder} rounded-2xl p-4 flex items-center gap-3`}>
                  <div className={`w-10 h-10 rounded-xl ${theme.badgeBg} ${theme.badgeText} flex items-center justify-center shrink-0`}>
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">03 Issue Detail</span>
                    <span className="text-xs font-extrabold text-[#111A35] truncate block">
                      {category}: {selectedOptionObj?.label || 'Issue reported'}
                    </span>
                  </div>
                </div>

                {/* 4. PRIORITY */}
                <div className={`${theme.lightBg} border ${theme.lightBorder} rounded-2xl p-4 flex items-center gap-3`}>
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">04 Urgency</span>
                    <span className="text-xs font-extrabold text-[#111A35] block">
                      {urgency} Priority
                    </span>
                  </div>
                </div>

              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-full ${theme.primaryBtnClass} text-white text-sm font-black shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      Registering with Ward Municipal Board...
                    </span>
                  ) : (
                    <>
                      <span>Submit Grievance →</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="text-xs font-bold text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer"
                  >
                    ← Edit details
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* STEP 5: SUCCESS SCREEN */}
          {step === 5 && (
            <div className="text-center py-6 sm:py-8 space-y-6 animate-in zoom-in-95 duration-300">
              
              {/* SUCCESS ICON */}
              <div className="relative inline-flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
              </div>

              {/* SUCCESS TEXT */}
              <div className="space-y-1.5 max-w-md mx-auto">
                <h3 className="text-2xl sm:text-3xl font-black text-[#111A35] tracking-tight">
                  🎉 Report submitted!
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-zinc-600">
                  Your grievance has been registered successfully with Ward 14 Municipal Office.
                </p>
              </div>

              {/* TRACKING CODE BOX */}
              <div className={`${theme.lightBg} border ${theme.lightBorder} rounded-3xl p-5 max-w-md mx-auto space-y-2`}>
                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block">
                  UNIQUE TRACKING CODE
                </span>
                
                <div className="flex items-center justify-center gap-3">
                  <span className={`text-2xl sm:text-3xl font-black ${theme.primaryTextClass} font-mono tracking-wider`}>
                    {submittedCode}
                  </span>
                  <button
                    type="button"
                    onClick={copyToClipboard}
                    className={`p-2 rounded-xl bg-white border ${theme.lightBorder} text-zinc-600 hover:${theme.primaryTextClass} transition-colors cursor-pointer`}
                    title="Copy tracking code"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {copiedCode && (
                  <span className="text-[11px] font-bold text-emerald-600 block animate-in fade-in">
                    Copied to clipboard!
                  </span>
                )}

                <div className="pt-2 flex items-center justify-center gap-2 text-xs font-extrabold text-amber-700">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Status: 🟡 Processing (Assigned to Ward Inspector)</span>
                </div>
              </div>

              {/* DONE / TRACK BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className={`w-full sm:flex-1 py-3.5 px-6 rounded-full ${theme.primaryBtnClass} text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer`}
                >
                  Track Complaint →
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className={`w-full sm:w-auto py-3.5 px-6 rounded-full bg-white border ${theme.lightBorder} text-[#111A35] text-xs font-bold hover:bg-zinc-50 transition-all cursor-pointer`}
                >
                  Done
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
