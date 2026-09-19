export type GrievanceStatus = 'Reported' | 'Processing' | 'Resolved';

export type UrgencyLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface GrievanceItem {
  id: string;
  category: string;
  title: string;
  description: string;
  location: string;
  ward: string;
  distance?: string;
  status: GrievanceStatus;
  urgency: UrgencyLevel;
  submittedDate: string;
  expectedDate?: string;
  resolvedDate?: string;
  assignedOfficer?: string;
  department: string;
  photoUrl?: string;
  beforePhotoUrl?: string;
  afterPhotoUrl?: string;
  upvotes: number;
  timeline: {
    step: string;
    date: string;
    completed: boolean;
    note?: string;
  }[];
}

export interface ProblemCategory {
  id: string;
  title: string;
  titleMain: string;
  titleAccent: string;
  description: string;
  iconName: string;
  cardBg: string;
  textColor: string;
  descColor: string;
  buttonBg: string;
  buttonTextColor: string;
  patternType: 'rings' | 'wavy' | 'dots' | 'starburst' | 'waves' | 'grid';
  badgeText?: string;
  rotationClass?: string;
}

export interface MapMarker {
  id: string;
  title: string;
  category: string;
  status: GrievanceStatus;
  x: number; // percentage on map
  y: number; // percentage on map
  timeAgo: string;
  distance: string;
  location: string;
  upvotes: number;
}

export interface AreaScoreItem {
  service: string;
  status: 'good' | 'average' | 'poor';
  score: number;
  color: string;
  icon: string;
}

export interface CivicUpdateItem {
  id: string;
  title: string;
  department: string;
  date: string;
  time: string;
  summary: string;
  type: 'Maintenance' | 'Alert' | 'Schedule' | 'Notice';
  affectedAreas: string[];
}

export interface AISahaayakResponse {
  category: string;
  suggestedTitle: string;
  summary: string;
  urgency: UrgencyLevel;
  department: string;
  actionSteps: string[];
  aiResponse: string;
}
