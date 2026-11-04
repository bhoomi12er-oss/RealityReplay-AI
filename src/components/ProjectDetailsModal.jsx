import React from 'react';
import {
  X,
  Camera,
  ImageIcon,
  CheckCircle2,
  Clock,
  HelpCircle,
  CircleDashed,
  Compass,
  ShieldCheck,
} from 'lucide-react';

export default function ProjectDetailsModal({ project, isOpen, onClose, onCheckInClick }) {
  if (!isOpen || !project) return null;

  const getStatusBadge = (milestone) => {
    const audit = milestone.auditStatus || (milestone.status === 'completed' ? 'Observed' : 'Not Yet Observed');
    switch (audit) {
      case 'Observed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/50">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Observed</span>
          </span>
        );
      case 'Partially Observed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-950 text-amber-300 border border-amber-800/50">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Partially Observed</span>
          </span>
        );
      case 'Needs Review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-purple-950 text-purple-300 border border-purple-800/50">
            <HelpCircle className="w-3 h-3 text-purple-400" />
            <span>Needs Review</span>
          </span>
        );
      case 'Not Yet Verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-950/60 text-amber-300 border border-amber-800/50">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Not Yet Verified</span>
          </span>
        );
      case 'Not Yet Observed':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-slate-900 text-slate-400 border border-slate-800">
            <CircleDashed className="w-3 h-3 text-slate-400" />
            <span>Not Yet Observed</span>
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#04060d]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#0c1024] border border-violet-800/40 p-6 sm:p-8 shadow-2xl shadow-violet-950/80 z-10 animate-in fade-in zoom-in-95 duration-200 my-8 max-h-[90vh] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-violet-900/30 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold bg-violet-950 text-violet-300 border border-violet-700/40">
                {project.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Created: {project.createdAt}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white">{project.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-5 space-y-6 overflow-y-auto pr-1 flex-1">
          {/* VISUAL EVIDENCE SECTION: BASELINE & LATEST CHECK-IN */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-violet-400" />
                <span>Visual Transformation Evidence</span>
              </h4>
              <span className="text-[10px] font-mono text-violet-300">
                {project.latestCheckIn ? 'Baseline + Check-in Audited' : project.imageUrl ? 'Baseline Ingested' : 'Awaiting Photos'}
              </span>
            </div>

            <div className={`grid grid-cols-1 ${project.latestCheckIn ? 'sm:grid-cols-2' : ''} gap-3`}>
              {/* Baseline Frame */}
              {project.imageUrl ? (
                <div className="rounded-xl overflow-hidden border border-violet-800/40 bg-[#080b18] p-3 space-y-2">
                  <div className="relative rounded-lg overflow-hidden border border-violet-900/50 bg-black/60 h-48 flex items-center justify-center">
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-[#090d1f]/85 backdrop-blur-md border border-violet-500/30 text-[10px] font-mono text-emerald-300 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Day 0 Baseline</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                    <span className="truncate max-w-[150px]">
                      {project.imageMetadata?.name || 'Baseline_photo.jpg'}
                    </span>
                    <span className="text-violet-400">Ground Truth</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#080b18] border border-violet-900/30 flex items-center gap-3 text-xs text-slate-400">
                  <ImageIcon className="w-5 h-5 text-violet-400/60 shrink-0" />
                  <p>No initial baseline photo was attached at project creation.</p>
                </div>
              )}

              {/* Latest Check-In Frame (if present) */}
              {project.latestCheckIn && (
                <div className="rounded-xl overflow-hidden border border-violet-700/50 bg-[#080b18] p-3 space-y-2">
                  <div className="relative rounded-lg overflow-hidden border border-violet-900/50 bg-black/60 h-48 flex items-center justify-center">
                    <img
                      src={project.latestCheckIn.imageUrl}
                      alt="Latest Check-in"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-[#090d1f]/85 backdrop-blur-md border border-violet-500/30 text-[10px] font-mono text-violet-300 font-semibold flex items-center gap-1">
                      <Camera className="w-3 h-3 text-violet-400" />
                      <span>{project.latestCheckIn.label || 'Latest Check-in'}</span>
                    </div>
                    {project.latestCheckIn.isDemoFallback && (
                      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-amber-950/80 text-[9px] font-mono text-amber-300 border border-amber-800/40">
                        Demo Evaluation
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                    <span className="text-slate-300">Audited: {project.latestCheckIn.date}</span>
                    {project.latestCheckIn.isDemoFallback ? (
                      <span className="text-amber-400 font-mono text-[10px]">Evidence Saved (Unverified)</span>
                    ) : (
                      <span className="text-emerald-400 font-semibold">{project.latestCheckIn.progress}% Verified</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* LATEST AUDIT FINDINGS (IF CHECK-IN EXISTS) */}
          {project.latestCheckIn && (
            <div className="p-4 rounded-xl bg-[#090e22] border border-violet-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <ShieldCheck className={`w-4 h-4 ${project.latestCheckIn.isDemoFallback ? 'text-amber-400' : 'text-emerald-400'}`} />
                  <span>
                    {project.latestCheckIn.isDemoFallback
                      ? 'Check-In Evidence Status (Demo Mode)'
                      : 'Meta Vision Spatial Audit Findings'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  Provider: {project.latestCheckIn.provider || 'Meta Model API'}
                </span>
              </div>

              {project.latestCheckIn.summaryOfChanges && (
                <p className="text-xs text-slate-200 leading-relaxed bg-[#080b18] p-3 rounded-lg border border-violet-900/30">
                  {project.latestCheckIn.summaryOfChanges}
                </p>
              )}

              {project.latestCheckIn.perspectiveDriftAssessment && (
                <div className="flex items-start gap-2 text-[11px] text-slate-300 bg-violet-950/20 p-2.5 rounded-lg border border-violet-900/20">
                  <Compass className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                  <span>{project.latestCheckIn.perspectiveDriftAssessment}</span>
                </div>
              )}
            </div>
          )}

          {/* Project Overview */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Transformation Objective
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-[#080b18] p-4 rounded-xl border border-violet-950">
              {project.description}
            </p>
          </div>

          {/* Key Metrics / Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-[#080b18] border border-violet-900/30">
              <div className="text-[11px] font-medium text-slate-400">Target Horizon</div>
              <div className="text-sm font-semibold text-white mt-1">{project.targetTimeline}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#080b18] border border-violet-900/30">
              <div className="text-[11px] font-medium text-slate-400">Visual Evidence</div>
              <div className="text-sm font-semibold text-violet-300 mt-1 font-mono">
                {project.checkInsCount} Check-in{project.checkInsCount === 1 ? '' : 's'}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#080b18] border border-violet-900/30">
              <div className="text-[11px] font-medium text-slate-400">Progress Audited</div>
              <div className="text-sm font-semibold text-emerald-400 mt-1 font-mono">
                {project.progress > 0 ? `${project.progress}% Verified` : '0% (Pending Live Audit)'}
              </div>
            </div>
          </div>

          {/* Milestones Sequence */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Spatial Milestone Trajectory</span>
              <span className="text-[10px] font-mono text-slate-400">
                Verified against visual evidence
              </span>
            </h4>
            <div className="space-y-2.5">
              {project.milestones?.map((milestone, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[#080b18] border border-violet-900/20 text-xs text-slate-300 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-violet-950/70 text-violet-400 font-mono text-[11px] flex items-center justify-center border border-violet-800/40">
                        0{i + 1}
                      </span>
                      <span className="font-medium text-white">{milestone.name}</span>
                    </div>
                    {getStatusBadge(milestone)}
                  </div>
                  {milestone.visualEvidence && (
                    <p className="text-[11px] text-slate-400 pl-9">
                      <span className="text-slate-500">Evidence: </span>
                      {milestone.visualEvidence}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-5 pt-4 border-t border-violet-900/30 flex items-center justify-between shrink-0">
          <button
            onClick={() => onCheckInClick(project)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 border border-violet-400/30 transition-all shadow-lg shadow-violet-950/40"
          >
            <Camera className="w-4 h-4" />
            <span>Add Visual Check-in & Audit</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
