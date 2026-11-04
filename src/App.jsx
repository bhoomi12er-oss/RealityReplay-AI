import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import DashboardView from './components/DashboardView';
import NewProjectModal from './components/NewProjectModal';
import ProjectDetailsModal from './components/ProjectDetailsModal';
import CheckInModal from './components/CheckInModal';
import AboutModal from './components/AboutModal';
import Footer from './components/Footer';
import Toast from './components/Toast';
import {
  hydrateProjectsWithImages,
  saveProjectsSafely,
  deleteProjectImage,
  clearAllProjectImages,
} from './utils/storageUtils';

export default function App() {
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'dashboard'
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [checkInProject, setCheckInProject] = useState(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Projects state initialized from localStorage or empty for first-time user state
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('realityreplay_projects');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading stored projects from localStorage:', e);
    }
    return []; // Default empty state for first-time users as specified!
  });

  // Hydrate photo baselines from IndexedDB on initial mount
  useEffect(() => {
    let isMounted = true;
    hydrateProjectsWithImages(projects).then((hydrated) => {
      if (!isMounted) return;
      const hasRestoredImages = hydrated.some(
        (p, idx) => p.imageUrl && !projects[idx]?.imageUrl
      );
      if (hasRestoredImages) {
        setProjects(hydrated);
      }
    });
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync projects with resilient storage (IndexedDB for images + localStorage for metadata)
  useEffect(() => {
    saveProjectsSafely(projects).then(({ quotaExceeded }) => {
      if (quotaExceeded) {
        console.info('Projects metadata synced to localStorage; photos preserved in IndexedDB.');
      }
    }).catch((err) => {
      console.warn('Storage sync issue:', err);
    });
  }, [projects]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = ({ type = 'info', title, message }) => {
    setToast({ type, title, message });
  };

  const handleStartProject = () => {
    setActiveView('dashboard');
    setIsNewProjectModalOpen(true);
  };

  const handleCreateProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    setActiveView('dashboard');
  };

  const handleDeleteProject = (projectId) => {
    const proj = projects.find((p) => p.id === projectId);
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    deleteProjectImage(projectId).catch(() => {});
    showToast({
      type: 'info',
      title: 'Project Removed',
      message: proj ? `"${proj.name}" has been removed.` : 'Project deleted.',
    });
  };

  const handleOpenCheckIn = (project) => {
    if (!project.imageUrl) {
      showToast({
        type: 'error',
        title: 'Day 0 Baseline Required',
        message: `"${project.name}" requires an initial baseline photo before check-ins can be audited.`,
      });
      return;
    }
    setCheckInProject(project);
  };

  const handleSaveCheckIn = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
    if (selectedProject?.id === updatedProject.id) {
      setSelectedProject(updatedProject);
    }
  };

  const handleLoadSampleProjects = () => {
    const samples = [
      {
        id: 'sample-1',
        name: 'Downtown Loft Kitchen & Open Living',
        category: 'Kitchen & Dining',
        description:
          'Convert enclosed galley kitchen into an open-concept entertaining space with quartzite waterfall island, flush black matte cabinetry, and integrated ceiling tracks.',
        targetTimeline: '6 Weeks',
        createdAt: 'Oct 14, 2026',
        progress: 68,
        checkInsCount: 4,
        status: 'Active Replay Tracking',
        imageUrl:
          'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
        imageMetadata: {
          name: 'loft_kitchen_baseline_day0.jpg',
          size: 1420500,
          formattedSize: '1.4 MB',
          uploadedAt: 'Oct 14, 2026',
        },
        milestones: [
          { name: 'Demolition & Partition Wall Clearout', status: 'completed' },
          { name: 'Electrical & Plumbing Rough-In', status: 'completed' },
          { name: 'Cabinetry Carcass & Drywall Finishing', status: 'completed' },
          { name: 'Quartz Countertops & Fixture Install', status: 'pending' },
        ],
      },
      {
        id: 'sample-2',
        name: 'Backyard Cedar Deck & Zen Pergola',
        category: 'Garden & Outdoor',
        description:
          'Transform uneven sloped grass yard into a multi-tier cedar entertainment deck with drought-tolerant native plantings, ambient ground sconces, and gravel firepit zone.',
        targetTimeline: '3 Months',
        createdAt: 'Oct 18, 2026',
        progress: 35,
        checkInsCount: 2,
        status: 'Active Replay Tracking',
        imageUrl:
          'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
        imageMetadata: {
          name: 'garden_baseline_angle_east.jpg',
          size: 2150300,
          formattedSize: '2.1 MB',
          uploadedAt: 'Oct 18, 2026',
        },
        milestones: [
          { name: 'Site Clearing & Grading Baseline', status: 'completed' },
          { name: 'Deck Post Foundation Concrete Pour', status: 'completed' },
          { name: 'Cedar Joists & Decking Installation', status: 'pending' },
          { name: 'Pergola Framing & Softscape Landscaping', status: 'pending' },
        ],
      },
    ];

    setProjects(samples);
    showToast({
      type: 'success',
      title: 'Sample Projects Loaded',
      message: 'Explore how spaces appear with active baseline photos and progress data.',
    });
  };

  const handleClearProjects = () => {
    setProjects([]);
    clearAllProjectImages().catch(() => {});
    showToast({
      type: 'info',
      title: 'Workspace Reset',
      message: 'Workspace returned to first-time empty state.',
    });
  };

  const handleExploreHowItWorks = () => {
    if (activeView !== 'landing') {
      setActiveView('landing');
      setTimeout(() => {
        document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans selection:bg-violet-600 selection:text-white relative">
      {/* Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onStartProject={handleStartProject}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {activeView === 'landing' ? (
          <div>
            {/* Hero Section */}
            <HeroSection
              onStartProject={handleStartProject}
              onExploreHowItWorks={handleExploreHowItWorks}
            />

            {/* Features Section */}
            <FeaturesSection
              onFeatureSelect={() => {
                showToast({
                  type: 'info',
                  title: 'Multimodal Vision Architecture',
                  message: 'Meta Model API vision comparison is active. Upload a baseline photo and add check-ins to run audits.',
                });
              }}
            />

            {/* How It Works Section */}
            <HowItWorksSection onStartProject={handleStartProject} />
          </div>
        ) : (
          <DashboardView
            projects={projects}
            onOpenNewProject={() => setIsNewProjectModalOpen(true)}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onDeleteProject={handleDeleteProject}
            onLoadSampleProjects={handleLoadSampleProjects}
            onClearProjects={handleClearProjects}
            onOpenCheckIn={handleOpenCheckIn}
            showToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveView={setActiveView}
        onOpenAbout={() => setIsAboutModalOpen(true)}
      />

      {/* Modals & Dialogs */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreateProject={handleCreateProject}
        showToast={showToast}
      />

      <ProjectDetailsModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        onCheckInClick={(proj) => {
          setSelectedProject(null);
          handleOpenCheckIn(proj);
        }}
      />

      <CheckInModal
        isOpen={!!checkInProject}
        project={checkInProject}
        onClose={() => setCheckInProject(null)}
        onSaveCheckIn={handleSaveCheckIn}
        showToast={showToast}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        onStartProject={handleStartProject}
      />

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
