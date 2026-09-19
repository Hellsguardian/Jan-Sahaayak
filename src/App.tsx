import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhatNeedsFixing } from './components/WhatNeedsFixing';
import { CivicCommunityFeed } from './components/CivicCommunityFeed';
import { CivicAreaBento } from './components/CivicAreaBento';
import { YourGrievances } from './components/YourGrievances';
import { AISahaayakSection } from './components/AISahaayakSection';
import { CommunityImpact } from './components/CommunityImpact';
import { Footer } from './components/Footer';

import { LodgeGrievanceModal } from './components/LodgeGrievanceModal';
import { GrievanceDetailModal } from './components/GrievanceDetailModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';

import { INITIAL_GRIEVANCES, MAP_MARKERS } from './data/civicData';
import { GrievanceItem, MapMarker, UrgencyLevel } from './types';

export default function App() {
  const [grievances, setGrievances] = useState<GrievanceItem[]>(INITIAL_GRIEVANCES);
  const [mapMarkers, setMapMarkers] = useState<MapMarker[]>(MAP_MARKERS);
  
  // UI Modal & Drawer States
  const [isLodgeModalOpen, setIsLodgeModalOpen] = useState(false);
  const [lodgePreFill, setLodgePreFill] = useState<{
    category?: string;
    description?: string;
    suggestedTitle?: string;
    urgency?: UrgencyLevel;
  }>({});

  const [selectedGrievanceDetail, setSelectedGrievanceDetail] = useState<GrievanceItem | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [currentLang, setCurrentLang] = useState('EN');
  const [activeSection, setActiveSection] = useState('hero');

  // Compute live statistics for Civic Pulse
  const reportedCount = grievances.filter(g => g.status === 'Reported').length;
  const processingCount = grievances.filter(g => g.status === 'Processing').length;
  const solvedCount = grievances.filter(g => g.status === 'Resolved').length + 83; // baseline solved history

  const resolvedGrievances = grievances.filter(g => g.status === 'Resolved');

  // Smooth Navigation
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handlers
  const handleOpenLodgeWithCategory = (categoryTitle: string) => {
    setLodgePreFill({ category: categoryTitle });
    setIsLodgeModalOpen(true);
  };

  const handlePreFillFromAI = (data: { category?: string; description?: string; suggestedTitle?: string; urgency?: UrgencyLevel }) => {
    setLodgePreFill(data);
    setIsLodgeModalOpen(true);
  };

  const handleAddNewGrievance = (newItem: GrievanceItem) => {
    setGrievances(prev => [newItem, ...prev]);
    
    // Also add a new marker to the interactive map
    const newMarker: MapMarker = {
      id: `m-${Date.now()}`,
      title: newItem.title,
      category: newItem.category,
      status: 'Reported',
      x: Math.floor(25 + Math.random() * 50),
      y: Math.floor(25 + Math.random() * 50),
      timeAgo: 'Just now',
      distance: 'In your ward',
      location: newItem.location,
      upvotes: 1
    };

    setMapMarkers(prev => [newMarker, ...prev]);
  };

  const handleUpvoteGrievance = (id: string) => {
    setGrievances(prev => prev.map(g => {
      if (g.id === id) {
        return { ...g, upvotes: g.upvotes + 1 };
      }
      return g;
    }));
  };

  const handleSelectMapMarker = (marker: MapMarker) => {
    const matchingGrievance = grievances.find(g => g.title.toLowerCase().includes(marker.title.toLowerCase()) || g.category === marker.category);
    if (matchingGrievance) {
      setSelectedGrievanceDetail(matchingGrievance);
    } else {
      setSelectedGrievanceDetail({
        id: marker.id,
        category: marker.category,
        title: marker.title,
        description: `Civic issue logged at ${marker.location}`,
        location: marker.location,
        ward: 'Sector 12 Ward Office',
        status: marker.status,
        urgency: 'Medium',
        submittedDate: 'Today',
        assignedOfficer: 'Ward Officer',
        department: 'Public Works Department',
        upvotes: marker.upvotes,
        timeline: [
          { step: 'Logged on Map', date: marker.timeAgo, completed: true }
        ]
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9FF] text-[#111A35] selection:bg-[#FFD84D] selection:text-[#111A35]">
      
      {/* HEADER / FLOATING NAVBAR */}
      <Header
        onOpenLodgeModal={() => {
          setLodgePreFill({});
          setIsLodgeModalOpen(true);
        }}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadNotificationsCount={unreadNotifications}
        currentLang={currentLang}
        onChangeLang={setCurrentLang}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* MAIN BODY SECTIONS */}
      <main className="flex-1 space-y-4 sm:space-y-6">
        
        {/* HERO SECTION */}
        <Hero
          onOpenLodgeModal={() => scrollToSection('what-needs-fixing')}
          onNavigateToTrack={() => scrollToSection('your-grievances')}
          reportedCount={reportedCount}
          processingCount={processingCount}
          solvedCount={solvedCount}
        />

        {/* WHAT NEEDS FIXING? CATEGORY GRID */}
        <WhatNeedsFixing
          onSelectCategory={handleOpenLodgeWithCategory}
          onOpenLodgeModal={() => {
            setLodgePreFill({});
            setIsLodgeModalOpen(true);
          }}
        />

        {/* YOUR CIVIC AREA - MAJOR 100VH BENTO SECTION ("Civic Pulse") */}
        <CivicAreaBento
          markers={mapMarkers}
          resolvedGrievances={resolvedGrievances}
          onSelectMarker={handleSelectMapMarker}
          onLodgeNewHere={() => {
            setLodgePreFill({ description: 'Issue reported at current GPS location Sector 12.' });
            setIsLodgeModalOpen(true);
          }}
          onViewResolvedClick={() => scrollToSection('your-grievances')}
          onOpenGrievanceDetail={setSelectedGrievanceDetail}
        />

        {/* CIVIC COMMUNITY SOCIAL FEED ("What's happening around you?") */}
        <CivicCommunityFeed
          onOpenGrievanceDetail={setSelectedGrievanceDetail}
          onOpenLodgeModal={() => {
            setLodgePreFill({});
            setIsLodgeModalOpen(true);
          }}
        />

        {/* YOUR COMPLAINTS DASHBOARD WITH CIVIC UPDATES */}
        <YourGrievances
          grievances={grievances}
          onOpenLodgeModal={() => {
            setLodgePreFill({});
            setIsLodgeModalOpen(true);
          }}
          onOpenTrackModal={setSelectedGrievanceDetail}
          onUpvoteGrievance={handleUpvoteGrievance}
        />

        {/* AI SAHAAYAK ASSISTANT */}
        <AISahaayakSection
          onPreFillGrievance={handlePreFillFromAI}
        />

        {/* COMMUNITY IMPACT */}
        <CommunityImpact />

      </main>

      {/* FOOTER */}
      <Footer
        onNavigate={scrollToSection}
        onOpenLodgeModal={() => {
          setLodgePreFill({});
          setIsLodgeModalOpen(true);
        }}
      />

      {/* MODALS & DRAWERS */}
      <LodgeGrievanceModal
        isOpen={isLodgeModalOpen}
        onClose={() => setIsLodgeModalOpen(false)}
        onSubmitNewGrievance={handleAddNewGrievance}
        preFillData={lodgePreFill}
      />

      <GrievanceDetailModal
        item={selectedGrievanceDetail}
        onClose={() => setSelectedGrievanceDetail(null)}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onClearUnread={() => setUnreadNotifications(0)}
      />

    </div>
  );
}
