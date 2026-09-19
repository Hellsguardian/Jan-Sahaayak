import { GrievanceItem, ProblemCategory, MapMarker, AreaScoreItem, CivicUpdateItem } from '../types';

export const PROBLEM_CATEGORIES: ProblemCategory[] = [
  {
    id: 'potholes',
    title: 'Potholes',
    titleMain: 'Potholes',
    titleAccent: 'Need fixing?',
    description: 'Report damaged roads and deep potholes in your ward.',
    iconName: 'Cone',
    cardBg: 'bg-[#DCCBFF]', // Light Lavender (reference style)
    textColor: 'text-[#111A35]',
    descColor: 'text-[#4B436E]',
    buttonBg: 'bg-[#6046E8]',
    buttonTextColor: 'text-white',
    patternType: 'rings',
    badgeText: 'Priority'
  },
  {
    id: 'street-lights',
    title: 'Street Lights',
    titleMain: 'Street',
    titleAccent: 'Lights',
    description: 'Report lights that are broken, dark, or flickering.',
    iconName: 'Lightbulb',
    cardBg: 'bg-[#6046E8]', // Rich Purple (reference style)
    textColor: 'text-white',
    descColor: 'text-[#DCD1FF]',
    buttonBg: 'bg-white',
    buttonTextColor: 'text-[#6046E8]',
    patternType: 'wavy',
    badgeText: 'Frequent'
  },
  {
    id: 'water-leakage',
    title: 'Water Leakage',
    titleMain: 'Water',
    titleAccent: 'Leakage',
    description: 'Report leaking main pipes, hydrants or public taps.',
    iconName: 'Droplets',
    cardBg: 'bg-[#FFD34F]', // Warm Yellow (reference style)
    textColor: 'text-[#111A35]',
    descColor: 'text-[#5C4D13]',
    buttonBg: 'bg-white',
    buttonTextColor: 'text-[#111A35]',
    patternType: 'dots'
  },
  {
    id: 'waterlogging',
    title: 'Waterlogging',
    titleMain: 'Water',
    titleAccent: 'logging',
    description: 'Report rainwater accumulated on streets and underpasses.',
    iconName: 'Waves',
    cardBg: 'bg-[#BFD8FF]', // Soft Sky Blue
    textColor: 'text-[#111A35]',
    descColor: 'text-[#304B78]',
    buttonBg: 'bg-[#6046E8]',
    buttonTextColor: 'text-white',
    patternType: 'waves'
  },
  {
    id: 'garbage-dump',
    title: 'Garbage Dump',
    titleMain: 'Garbage',
    titleAccent: 'Dump',
    description: 'Report uncollected waste, trash piles, or dumpster overflow.',
    iconName: 'Trash2',
    cardBg: 'bg-[#BDEFD9]', // Soft Mint
    textColor: 'text-[#111A35]',
    descColor: 'text-[#20523C]',
    buttonBg: 'bg-[#6046E8]',
    buttonTextColor: 'text-white',
    patternType: 'starburst',
    badgeText: 'Urgent'
  },
  {
    id: 'broken-footpath',
    title: 'Broken Footpath',
    titleMain: 'Broken',
    titleAccent: 'Footpath',
    description: 'Report broken paving slabs, hazards, or blocked walkways.',
    iconName: 'Footprints',
    cardBg: 'bg-[#FFB7A8]', // Soft Coral
    textColor: 'text-[#111A35]',
    descColor: 'text-[#5C2B20]',
    buttonBg: 'bg-white',
    buttonTextColor: 'text-[#111A35]',
    patternType: 'dots'
  },
  {
    id: 'open-manhole',
    title: 'Open Manhole',
    titleMain: 'Open',
    titleAccent: 'Manhole',
    description: 'Report uncovered manholes, drains or missing chamber lids.',
    iconName: 'CircleDot',
    cardBg: 'bg-[#F5C5E8]', // Soft Pink
    textColor: 'text-[#111A35]',
    descColor: 'text-[#5C214E]',
    buttonBg: 'bg-[#6046E8]',
    buttonTextColor: 'text-white',
    patternType: 'rings',
    badgeText: 'Hazard'
  },
  {
    id: 'traffic-signal',
    title: 'Traffic Signal',
    titleMain: 'Traffic',
    titleAccent: 'Signal',
    description: 'Report non-functional lights, broken timer or signal damage.',
    iconName: 'ShieldAlert',
    cardBg: 'bg-[#432EB5]', // Deep Royal Purple
    textColor: 'text-white',
    descColor: 'text-[#D3C7FF]',
    buttonBg: 'bg-[#FFD34F]',
    buttonTextColor: 'text-[#111A35]',
    patternType: 'wavy'
  },
  {
    id: 'drainage-issue',
    title: 'Drainage Issue',
    titleMain: 'Drainage',
    titleAccent: 'Issue',
    description: 'Report blocked gutters, sewer line overflow or foul odor.',
    iconName: 'Pipette',
    cardBg: 'bg-[#FFD34F]', // Warm Yellow
    textColor: 'text-[#111A35]',
    descColor: 'text-[#5C4D13]',
    buttonBg: 'bg-[#6046E8]',
    buttonTextColor: 'text-white',
    patternType: 'grid'
  },
  {
    id: 'road-damage',
    title: 'Road Damage',
    titleMain: 'Road',
    titleAccent: 'Damage',
    description: 'Report road cave-ins, trench cuts or unfinished asphalt.',
    iconName: 'Construction',
    cardBg: 'bg-[#DCCBFF]', // Lavender
    textColor: 'text-[#111A35]',
    descColor: 'text-[#4B436E]',
    buttonBg: 'bg-[#6046E8]',
    buttonTextColor: 'text-white',
    patternType: 'dots'
  },
  {
    id: 'illegal-dumping',
    title: 'Illegal Dumping',
    titleMain: 'Illegal',
    titleAccent: 'Dumping',
    description: 'Report unauthorized construction debris or hazardous dumping.',
    iconName: 'Dumpster',
    cardBg: 'bg-[#FFD1B8]', // Peach
    textColor: 'text-[#111A35]',
    descColor: 'text-[#5B331A]',
    buttonBg: 'bg-[#6046E8]',
    buttonTextColor: 'text-white',
    patternType: 'starburst'
  },
  {
    id: 'public-toilet',
    title: 'Public Toilet',
    titleMain: 'Public',
    titleAccent: 'Toilet',
    description: 'Report unhygienic conditions, broken locks or lack of water.',
    iconName: 'Bath',
    cardBg: 'bg-[#BFD8FF]', // Soft Blue
    textColor: 'text-[#111A35]',
    descColor: 'text-[#304B78]',
    buttonBg: 'bg-[#6046E8]',
    buttonTextColor: 'text-white',
    patternType: 'wavy'
  },
  {
    id: 'stray-animals',
    title: 'Stray Animals',
    titleMain: 'Stray',
    titleAccent: 'Animals',
    description: 'Report aggressive strays, cattle obstruction or animal rescue.',
    iconName: 'Dog',
    cardBg: 'bg-[#BDEFD9]', // Mint
    textColor: 'text-[#111A35]',
    descColor: 'text-[#20523C]',
    buttonBg: 'bg-[#6046E8]',
    buttonTextColor: 'text-white',
    patternType: 'rings'
  },
  {
    id: 'fallen-tree',
    title: 'Fallen Tree',
    titleMain: 'Fallen',
    titleAccent: 'Tree',
    description: 'Report uprooted trees or dangerous branches blocking roads.',
    iconName: 'Trees',
    cardBg: 'bg-[#FFD34F]', // Warm Yellow
    textColor: 'text-[#111A35]',
    descColor: 'text-[#5C4D13]',
    buttonBg: 'bg-[#6046E8]',
    buttonTextColor: 'text-white',
    patternType: 'dots'
  },
  {
    id: 'noise-complaint',
    title: 'Noise Complaint',
    titleMain: 'Noise',
    titleAccent: 'Complaint',
    description: 'Report illegal loudspeakers, late-night industrial noise.',
    iconName: 'VolumeX',
    cardBg: 'bg-[#F5C5E8]', // Soft Pink
    textColor: 'text-[#111A35]',
    descColor: 'text-[#5C214E]',
    buttonBg: 'bg-[#6046E8]',
    buttonTextColor: 'text-white',
    patternType: 'waves'
  },
  {
    id: 'other-issue',
    title: 'Other Issue',
    titleMain: 'Other',
    titleAccent: 'Issue',
    description: 'Report any other civic problem not listed above.',
    iconName: 'HelpCircle',
    cardBg: 'bg-[#6046E8]', // Rich Purple
    textColor: 'text-white',
    descColor: 'text-[#DCD1FF]',
    buttonBg: 'bg-white',
    buttonTextColor: 'text-[#6046E8]',
    patternType: 'starburst'
  }
];

export const INITIAL_GRIEVANCES: GrievanceItem[] = [
  {
    id: 'GRV-2026-001245',
    category: 'Water Supply',
    title: 'Turbid & Dirty Tap Water Supply',
    description: 'Brownish water coming from domestic taps during morning supply hours.',
    location: 'Block C, House #142 to #180, Sector 12',
    ward: 'Ward 14 - Civil Lines',
    status: 'Processing',
    urgency: 'High',
    submittedDate: 'Aug 10, 2026',
    expectedDate: 'Aug 12, 2026',
    assignedOfficer: 'Er. Rajesh Kumar (J.E. Water Board)',
    department: 'Jal Board & Public Health Engineering',
    photoUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=600&auto=format&fit=crop&q=80',
    upvotes: 18,
    timeline: [
      { step: 'Grievance Registered', date: 'Aug 10, 08:30 AM', completed: true, note: 'System ticket generated automatically' },
      { step: 'Department Verification', date: 'Aug 10, 10:15 AM', completed: true, note: 'Assigned to Jal Board Engineer Sector 12' },
      { step: 'On-site Pipeline Inspection', date: 'Aug 10, 02:00 PM', completed: true, note: 'Valve leakage identified near main booster pump' },
      { step: 'Repair & Pipeline Flushing', date: 'Est. Aug 11, 04:00 PM', completed: false, note: 'Excavation team dispatched' },
      { step: 'Resolution Verified', date: 'Est. Aug 12, 10:00 AM', completed: false }
    ]
  },
  {
    id: 'GRV-2026-001198',
    category: 'Pothole',
    title: 'Deep Dangerous Pothole near School Gate',
    description: 'Large 2-foot wide crater posing threat to school buses and two-wheelers during peak rain hours.',
    location: 'Main Gate, St. Xavier School Road, Sector 8',
    ward: 'Ward 8 - North Campus',
    status: 'Reported',
    urgency: 'Critical',
    submittedDate: 'Aug 10, 2026',
    expectedDate: 'Aug 13, 2026',
    assignedOfficer: 'Pending Assignment',
    department: 'Municipal Road Maintenance Board',
    photoUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80',
    upvotes: 32,
    timeline: [
      { step: 'Grievance Registered', date: 'Aug 10, 11:00 AM', completed: true, note: 'Flagged with critical priority due to school zone' },
      { step: 'Department Verification', date: 'In Progress', completed: false, note: 'Queued for Ward 8 engineer signoff' },
      { step: 'Asphalt Patching Dispatch', date: 'Pending', completed: false },
      { step: 'Resolution Verified', date: 'Pending', completed: false }
    ]
  },
  {
    id: 'GRV-2026-001012',
    category: 'Broken Street Light',
    title: 'Dark Alley Streetlight Failure',
    description: '4 consecutive sodium street lights out of service on Park Avenue lane, making night transit unsafe.',
    location: 'Park Avenue, Pocket 3, Sector 12',
    ward: 'Ward 14 - Civil Lines',
    status: 'Resolved',
    urgency: 'Medium',
    submittedDate: 'Aug 08, 2026',
    resolvedDate: 'Aug 09, 2026',
    assignedOfficer: 'Anil Sharma (Electrical Sub-Engineer)',
    department: 'Municipal Electrical Department',
    beforePhotoUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600&auto=format&fit=crop&q=80',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&auto=format&fit=crop&q=80',
    upvotes: 24,
    timeline: [
      { step: 'Grievance Registered', date: 'Aug 08, 07:10 PM', completed: true },
      { step: 'Department Verification', date: 'Aug 09, 09:00 AM', completed: true },
      { step: 'LED Driver Replacement', date: 'Aug 09, 01:30 PM', completed: true },
      { step: 'Resolution Verified', date: 'Aug 09, 03:00 PM', completed: true, note: 'Verified by local resident association' }
    ]
  },
  {
    id: 'GRV-2026-000981',
    category: 'Garbage',
    title: 'Overflowing Community Dustbin Dump',
    description: 'Waste bin overflowing on main market corner for 3 days attracting stray animals.',
    location: 'Central Market Road, Block A, Sector 12',
    ward: 'Ward 14 - Civil Lines',
    status: 'Resolved',
    urgency: 'High',
    submittedDate: 'Aug 07, 2026',
    resolvedDate: 'Aug 08, 2026',
    assignedOfficer: 'Suresh Verma (Sanitation Inspector)',
    department: 'Solid Waste Management Dept',
    beforePhotoUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80',
    afterPhotoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    upvotes: 41,
    timeline: [
      { step: 'Grievance Registered', date: 'Aug 07, 02:15 PM', completed: true },
      { step: 'Sanitation Truck Dispatched', date: 'Aug 07, 04:00 PM', completed: true },
      { step: 'Area Cleared & Disinfected', date: 'Aug 08, 08:30 AM', completed: true },
      { step: 'Resolution Verified', date: 'Aug 08, 10:00 AM', completed: true }
    ]
  }
];

export const MAP_MARKERS: MapMarker[] = [
  {
    id: 'm1',
    title: 'Deep Pothole near School Gate',
    category: 'Pothole',
    status: 'Reported',
    x: 28,
    y: 34,
    timeAgo: '2h ago',
    distance: '250m away',
    location: 'St. Xavier School Gate',
    upvotes: 32
  },
  {
    id: 'm2',
    title: 'Dirty Water Supply In Pipeline',
    category: 'Water Supply',
    status: 'Processing',
    x: 45,
    y: 52,
    timeAgo: '4h ago',
    distance: '350m away',
    location: 'Block C, Sector 12',
    upvotes: 18
  },
  {
    id: 'm3',
    title: 'Street Light Bulb Replaced',
    category: 'Broken Street Light',
    status: 'Resolved',
    x: 68,
    y: 28,
    timeAgo: '1d ago',
    distance: '500m away',
    location: 'Park Avenue Pocket 3',
    upvotes: 24
  },
  {
    id: 'm4',
    title: 'Clogged Storm Drain Cleared',
    category: 'Waterlogging',
    status: 'Resolved',
    x: 74,
    y: 65,
    timeAgo: '5h ago',
    distance: '620m away',
    location: 'Sector 12 Service Road',
    upvotes: 15
  },
  {
    id: 'm5',
    title: 'Fallen Tree Branch Obstructing Lane',
    category: 'Fallen Tree',
    status: 'Processing',
    x: 32,
    y: 72,
    timeAgo: '3h ago',
    distance: '400m away',
    location: 'Library Corner Lane',
    upvotes: 9
  },
  {
    id: 'm6',
    title: 'You are here',
    category: 'Location',
    status: 'Processing',
    x: 50,
    y: 48,
    timeAgo: 'Live',
    distance: '0m',
    location: 'Sector 12 Civic Center',
    upvotes: 0
  }
];

export const AREA_SCORE_ITEMS: AreaScoreItem[] = [
  { service: 'Roads & Pavements', status: 'average', score: 68, color: '#FFC83D', icon: 'Construction' },
  { service: 'Water Quality & Supply', status: 'good', score: 85, color: '#35B96B', icon: 'Droplets' },
  { service: 'Waste Management', status: 'average', score: 72, color: '#FFC83D', icon: 'Trash2' },
  { service: 'Street Lighting', status: 'good', score: 91, color: '#35B96B', icon: 'Lightbulb' },
  { service: 'Drainage & Stormwater', status: 'poor', score: 54, color: '#FF4D4D', icon: 'Waves' }
];

export const CIVIC_UPDATES: CivicUpdateItem[] = [
  {
    id: 'up-1',
    title: 'Scheduled Water Supply Maintenance',
    department: 'Jal Board Division 4',
    date: 'Aug 11, 2026',
    time: '10:00 AM - 02:00 PM',
    summary: 'Main line valve maintenance in Sector 12 & Civil Lines. Water pressure may remain low during these hours.',
    type: 'Maintenance',
    affectedAreas: ['Sector 12', 'Civil Lines', 'Block C']
  },
  {
    id: 'up-2',
    title: 'Pre-Monsoon Storm Drain Cleaning Drive',
    department: 'Municipal Drainage Dept',
    date: 'Aug 12 - Aug 15',
    time: '08:00 AM - 05:00 PM',
    summary: 'Heavy machinery will clear stormwater channels along Main Market road. Please avoid parking near drain grills.',
    type: 'Notice',
    affectedAreas: ['Main Market', 'Sector 8', 'Sector 12']
  },
  {
    id: 'up-3',
    title: 'Night Road Resurfacing Drive',
    department: 'Public Works Dept (PWD)',
    date: 'Aug 11 Night',
    time: '11:00 PM - 05:00 AM',
    summary: 'Asphalt paving on Ring Road junction. Light traffic diversion through Pocket B internal lanes.',
    type: 'Alert',
    affectedAreas: ['Ring Road', 'Pocket B']
  }
];
