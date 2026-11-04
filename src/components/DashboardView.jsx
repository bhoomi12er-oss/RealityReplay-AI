import React, { useState, useEffect, useRef } from 'react';
import {
  FolderPlus,
  Sparkles,
  Camera,
  Layers,
  Eye,
  Trash2,
  Search,
  Info,
  RotateCcw,
  ImageIcon,
} from 'lucide-react';

export default function DashboardView({
  projects,
  onOpenNewProject,
  onSelectProject,
  onDeleteProject,
  onLoadSampleProjects,
  onClearProjects,
  onOpenCheckIn,
  showToast: _showToast,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // When a project is added, reset search and category filters so the new project is shown immediately
  const prevCountRef = useRef(projects.length);
  useEffect(() => {
    if (projects.length > prevCountRef.current) {
      setSearchQuery('');
      setSelectedCategory('All');
    }
    prevCountRef.current = projects.length;
  }, [projects.length]);

  const categories = [
    'All',
    'Living Room',
    'Kitchen & Dining',
    'Garden & Outdoor',
    'Bedroom & Suite',
    'Retail & Commercial',
    'Full Renovation',
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });


  return (
    <div className="py-10 md:py-16 min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Heading & Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-violet-900/25">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-800/40 text-violet-300 text-xs font-mono uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5 text-violet-400" />
              <span>Workspace & Projects</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome to RealityReplay
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
              Manage your spaces, review baseline visual records, and track real-world transformation milestones over time.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {projects.length > 0 ? (
              <button
                onClick={onClearProjects}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-red-300 hover:bg-red-950/20 border border-slate-800 hover:border-red-900/40 transition-colors"
                title="Reset to empty state to view first-time user experience"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Empty State</span>
              </button>
            ) : (
              <button
                onClick={onLoadSampleProjects}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-violet-300 bg-violet-950/40 hover:bg-violet-900/40 border border-violet-800/40 transition-colors"
                title="Preview sample projects layout"
              >
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                <span>Load Sample Project</span>
              </button>
            )}

            <button
              onClick={onOpenNewProject}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-950/60 border border-violet-400/20 transition-all duration-200"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Create New Project</span>
            </button>
          </div>
        </div>

        {/* Informative Pipeline Staging Banner */}
        <div className="mt-6 p-4 rounded-xl bg-violet-950/30 border border-violet-900/30 flex items-start gap-3 text-xs text-slate-300">
          <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold text-white">Visual Baseline & Meta Model API Audits Active: </span>
            <span className="text-slate-300">
              Upload initial space photos and record check-ins to run side-by-side multimodal vision comparison, perspective drift analysis, and milestone progress audits.
            </span>
          </div>
        </div>

        {/* If Projects Exist: Search & Filters */}
        {projects.length > 0 && (
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#080b18] border border-violet-900/30 focus:border-violet-500 text-xs text-white placeholder-slate-500 outline-none transition-all"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        {projects.length === 0 ? (
          /* EMPTY-PROJECT STATE FOR FIRST-TIME USERS */
          <div className="mt-12">
            <div className="rounded-2xl border border-dashed border-violet-900/50 bg-gradient-to-b from-[#0e1428]/80 to-[#080b18]/80 p-8 sm:p-14 text-center max-w-3xl mx-auto shadow-2xl shadow-violet-950/40">
              {/* Empty state visual icon */}
              <div className="relative mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-violet-950/40 border border-violet-500/30 flex items-center justify-center mb-6 shadow-inner">
                <FolderPlus className="w-9 h-9 text-violet-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-violet-400 rounded-full blur-[2px] opacity-80" />
              </div>

              {/* Title & Description */}
              <h2 className="text-2xl font-bold text-white tracking-tight">
                No transformation projects yet
              </h2>
              <p className="mt-3 text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Welcome to your visual transformation workspace! Begin by creating your first space project to upload initial baseline photos and track real-world physical changes.
              </p>

              {/* Primary Actions */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={onOpenNewProject}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-xl shadow-violet-950/50 border border-violet-400/20 transition-all active:scale-[0.98]"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Create Your First Project</span>
                </button>

                <button
                  onClick={onLoadSampleProjects}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-violet-900/30 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span>Preview Sample Projects</span>
                </button>
              </div>

              {/* Educational cards on what users will track */}
              <div className="mt-12 pt-10 border-t border-violet-900/25 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-violet-950">
                  <span className="text-[10px] font-mono text-violet-400 font-semibold uppercase">Use Case 01</span>
                  <h4 className="text-xs font-bold text-white mt-1">Home & Room Renovation</h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Kitchens, living rooms, and bathrooms: upload Day 0 photos and track drywall, cabinetry, and tile.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-violet-950">
                  <span className="text-[10px] font-mono text-indigo-400 font-semibold uppercase">Use Case 02</span>
                  <h4 className="text-xs font-bold text-white mt-1">Garden & Landscaping</h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Grading, hardscaping, patio build-out, plant growth, and seasonal garden transformations.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-violet-950">
                  <span className="text-[10px] font-mono text-purple-400 font-semibold uppercase">Use Case 03</span>
                  <h4 className="text-xs font-bold text-white mt-1">Commercial & Retail Fit-out</h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Storefront refits, studio acoustic treatments, and commercial showroom evolutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* POPULATED PROJECTS GRID */
          <div className="mt-8">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-16 bg-[#0c1024]/40 rounded-xl border border-violet-900/20">
                <p className="text-sm text-slate-400">No projects match your search criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-3 text-xs text-violet-400 hover:underline"
                >
                  Clear search filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group rounded-2xl bg-[#0c1024]/90 border border-violet-900/30 hover:border-violet-600/50 p-6 shadow-xl hover:shadow-2xl hover:shadow-violet-950/60 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Visual Baseline Thumbnail Header */}
                      {project.imageUrl ? (
                        <div
                          onClick={() => onSelectProject(project)}
                          className="relative h-44 w-full rounded-xl overflow-hidden mb-4 border border-violet-800/40 bg-[#080b18] cursor-pointer group/thumb"
                        >
                          <img
                            src={project.imageUrl}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0c1024] via-transparent to-black/30 pointer-events-none" />

                          {/* Top Badges over photo */}
                          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#090d1f]/85 backdrop-blur-md border border-violet-500/30 text-[10px] font-mono text-violet-300 font-semibold shadow-md">
                            <Camera className="w-3 h-3 text-violet-400" />
                            <span>Day 0 Baseline</span>
                          </div>

                          {project.imageMetadata?.formattedSize && (
                            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] font-mono text-slate-300">
                              {project.imageMetadata.formattedSize}
                            </div>
                          )}

                          <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-md bg-violet-950/80 backdrop-blur-sm border border-violet-700/40 text-[10px] font-mono text-violet-200 opacity-0 group-hover/thumb:opacity-100 transition-opacity">
                            View Image
                          </div>
                        </div>
                      ) : (
                        <div className="relative h-24 w-full rounded-xl overflow-hidden mb-4 border border-violet-900/30 bg-gradient-to-r from-violet-950/20 to-slate-900/40 flex items-center justify-center text-slate-500">
                          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                            <ImageIcon className="w-4 h-4 text-violet-400/60" />
                            <span>Awaiting Initial Visual Capture</span>
                          </div>
                        </div>
                      )}

                      {/* Category & Date */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold bg-violet-950/80 text-violet-300 border border-violet-700/30">
                          {project.category}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {project.createdAt}
                        </span>
                      </div>

                      {/* Project Name */}
                      <h3
                        onClick={() => onSelectProject(project)}
                        className="text-lg font-bold text-white group-hover:text-violet-200 transition-colors line-clamp-1 cursor-pointer"
                      >
                        {project.name}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Status / Evidence Indicator */}
                      <div className="mt-4 p-3 rounded-xl bg-[#080b18] border border-violet-950/60 space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 font-medium">Progress Audit</span>
                          <span className="text-violet-300 font-mono font-semibold">
                            {project.progress > 0
                              ? `${project.progress}% Verified`
                              : project.checkInsCount > 0
                              ? '0% (Pending AI Audit)'
                              : '0% (Baseline Staged)'}
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500"
                            style={{ width: `${Math.max(project.progress || 0, 4)}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1">
                          <span>
                            {project.checkInsCount} Visual Check-in{project.checkInsCount === 1 ? '' : 's'}
                            {project.latestCheckIn?.isDemoFallback ? ' (Demo)' : ''}
                          </span>
                          <span className="text-slate-500">{project.targetTimeline}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-5 pt-4 border-t border-violet-900/20 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-300 hover:text-white transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onOpenCheckIn ? onOpenCheckIn(project) : onSelectProject(project)}
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-violet-950/60 hover:bg-violet-900/60 text-violet-300 border border-violet-800/40 transition-colors flex items-center gap-1"
                          title="Capture visual evidence and audit changes"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Check-in</span>
                        </button>

                        <button
                          onClick={() => onDeleteProject(project.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                          title="Delete project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
