import React from 'react';
import { X, Layers, Sparkles, Eye, ArrowRight } from 'lucide-react';

export default function AboutModal({ isOpen, onClose, onStartProject }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#04060d]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0c1024] border border-violet-800/40 p-6 sm:p-8 shadow-2xl shadow-violet-950/80 z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-violet-900/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <Layers className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">About RealityReplay AI</h3>
              <p className="text-xs text-slate-400 font-mono">
                Multimodal Visual Intelligence for Physical Spaces
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-6 text-sm text-slate-300 leading-relaxed max-h-[70vh] overflow-y-auto pr-2">
          {/* Tagline Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-violet-950/60 to-indigo-950/40 border border-violet-800/30">
            <p className="text-base font-semibold text-white">
              “Imagine the Change. Track the Reality.”
            </p>
            <p className="mt-1 text-xs text-slate-300">
              Transforming physical spaces is complex and prone to discrepancies between what was planned and what actually gets built. RealityReplay AI bridges this gap through ground-truth visual intelligence.
            </p>
          </div>

          {/* The Problem & Vision */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-violet-400" />
              The Challenge
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Whether renovating a home, landscaping a garden, or retrofitting a retail store, owners and project teams struggle with inconsistent progress tracking. Traditional methods rely on subjective estimates or disjointed camera rolls where angles never match.
            </p>
          </div>

          {/* The RealityReplay Solution */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              The RealityReplay Solution
            </h4>
            <div className="space-y-3 mt-3">
              <div className="p-3 rounded-lg bg-[#080b18] border border-violet-950 flex items-start gap-3">
                <span className="w-5 h-5 rounded-md bg-violet-950 text-violet-400 font-mono text-[11px] flex items-center justify-center shrink-0 border border-violet-800/40 mt-0.5">
                  1
                </span>
                <div>
                  <h5 className="font-semibold text-white text-xs">Transformation Preview</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Generates 3D-aligned visual previews of the planned space before physical work starts, confirming aesthetic and structural intent.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#080b18] border border-violet-950 flex items-start gap-3">
                <span className="w-5 h-5 rounded-md bg-violet-950 text-violet-400 font-mono text-[11px] flex items-center justify-center shrink-0 border border-violet-800/40 mt-0.5">
                  2
                </span>
                <div>
                  <h5 className="font-semibold text-white text-xs">Visual Change Tracking</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Aligns multi-temporal photos and videos across casual angles, isolating physical additions, removals, and drift over time.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#080b18] border border-violet-950 flex items-start gap-3">
                <span className="w-5 h-5 rounded-md bg-violet-950 text-violet-400 font-mono text-[11px] flex items-center justify-center shrink-0 border border-violet-800/40 mt-0.5">
                  3
                </span>
                <div>
                  <h5 className="font-semibold text-white text-xs">Progress Reports</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Synthesizes objective progress percentages and timeline milestones backed directly by verifiable visual evidence.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Status Box */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-slate-300 font-medium">Phase 1: Frontend Foundation</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500">React + Vite</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-5 border-t border-violet-900/30 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onStartProject();
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md transition-all"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
