import React, { useState } from 'react';
import { Sparkles, ArrowRight, Compass, Eye, ShieldCheck, CheckCircle2, Camera } from 'lucide-react';

export default function HeroSection({ onStartProject, onExploreHowItWorks }) {
  const [activeStage, setActiveStage] = useState('progress'); // 'baseline', 'plan', 'progress'

  const stages = [
    { id: 'baseline', label: '1. Baseline Capture', time: 'Day 0', tag: 'Visual Ground Truth' },
    { id: 'plan', label: '2. AI Transformation Plan', time: 'Blueprint', tag: 'Target Vision' },
    { id: 'progress', label: '3. Progress Replay', time: 'Day 28', tag: '68% Verified Match' },
  ];

  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background radial gradients for subtle violet glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges & Announcement */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-violet-950/50 border border-violet-500/30 text-violet-300 text-xs font-medium mb-8 backdrop-blur-md shadow-sm shadow-violet-900/20">
            <Sparkles className="w-3.5 h-3.5 text-violet-400 animate-pulse" />
            <span>Multimodal Space Transformation Intelligence</span>
            <span className="w-1 h-1 rounded-full bg-violet-400" />
            <span className="text-violet-200/80 hidden sm:inline">Rooms • Gardens • Retail • Renovations</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl">
            Imagine the Change.{' '}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Track the Reality.
            </span>
          </h1>

          {/* Short Description */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            A multimodal AI platform to visualize planned spatial transformations and track physical real-world progress over time from visual evidence. Propose transformations, align multi-angle photos and videos, identify visible changes, and generate audit-ready progress reports.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={onStartProject}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-base text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:from-violet-500 hover:via-indigo-500 hover:to-violet-600 shadow-xl shadow-violet-950/60 hover:shadow-violet-800/40 border border-violet-400/30 transition-all duration-200 active:scale-[0.98] group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onExploreHowItWorks}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-base text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-violet-800/30 hover:border-violet-600/50 shadow-md transition-all duration-200 active:scale-[0.98]"
            >
              <Compass className="w-4 h-4 text-violet-400" />
              <span>Explore How It Works</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
              Multimodal Temporal Vision
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
              Perspective Drift Alignment
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
              Objective Visual Milestone Audits
            </span>
          </div>
        </div>

        {/* Hero Interactive Showcase / Replay Canvas */}
        <div className="mt-16 sm:mt-20 max-w-5xl mx-auto">
          <div className="relative rounded-2xl p-1 bg-gradient-to-b from-violet-500/30 via-violet-900/20 to-transparent shadow-2xl shadow-violet-950/80">
            <div className="rounded-[15px] bg-[#0c1022] border border-violet-800/30 overflow-hidden">
              {/* Window Header */}
              <div className="px-4 py-3.5 bg-[#090d1c] border-b border-violet-900/30 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />
                  <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                    <span className="text-white font-semibold">Project Space:</span>
                    <span>Downtown Loft • Open Kitchen & Studio Conversion</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-semibold uppercase tracking-wider">
                    Interactive Demo Simulation
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-violet-950/80 text-violet-300 border border-violet-700/40">
                    Spatial Replay Canvas
                  </span>
                </div>
              </div>

              {/* Stage Switcher Tabs */}
              <div className="px-4 py-2.5 bg-[#0e1329] border-b border-violet-900/25 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1 sm:gap-2">
                  {stages.map((stage) => {
                    const isActive = activeStage === stage.id;
                    return (
                      <button
                        key={stage.id}
                        onClick={() => setActiveStage(stage.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-violet-600 text-white shadow-sm shadow-violet-800/50'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }`}
                      >
                        <span>{stage.label}</span>
                        <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${isActive ? 'bg-violet-700 text-violet-100' : 'bg-slate-800 text-slate-400'}`}>
                          {stage.time}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>State: {stages.find(s => s.id === activeStage)?.tag}</span>
                </div>
              </div>

              {/* Interactive Visual Canvas Content */}
              <div className="relative min-h-[340px] sm:min-h-[420px] p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#0c1022] via-[#090d1c] to-[#0d1226]">
                {/* Perspective coordinate grid lines */}
                <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

                {/* Simulated spatial transformation view based on active stage */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Left Column: Visual Space Reconstruction Frame */}
                  <div className="md:col-span-7">
                    <div className="relative rounded-xl border border-violet-500/20 bg-[#080b18]/90 p-5 shadow-inner overflow-hidden min-h-[260px] flex flex-col justify-between">
                      {/* Top spatial coordinates badge */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span className="flex items-center gap-1.5 text-violet-300">
                          <Camera className="w-3.5 h-3.5 text-violet-400" />
                          Viewpoint A (Focal Angle: 74° FOV)
                        </span>
                        <span className="text-slate-500">Coord: [X: +1.42, Y: +2.88, Z: 0.00]</span>
                      </div>

                      {/* Dynamic stage representation */}
                      <div className="my-6 space-y-3">
                        {activeStage === 'baseline' && (
                          <div className="space-y-3 animate-in fade-in duration-300">
                            <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
                              <div className="flex items-center justify-between font-semibold text-slate-200 mb-1">
                                <span>Day 0: Initial Space Ingestion</span>
                                <span className="text-amber-400 font-mono">Untransformed</span>
                              </div>
                              <p className="text-slate-400 text-[11px]">
                                Original 1990s partition wall, vinyl flooring, fluorescent lighting fixture. Spatial baseline established with 14 multi-angle viewpoints.
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                              <div className="p-2 rounded bg-slate-900/60 border border-slate-800/80 text-slate-400">
                                Dimension: 28.4 ft × 18.2 ft
                              </div>
                              <div className="p-2 rounded bg-slate-900/60 border border-slate-800/80 text-slate-400">
                                Lighting: 320 Lux (Overcast)
                              </div>
                            </div>
                          </div>
                        )}

                        {activeStage === 'plan' && (
                          <div className="space-y-3 animate-in fade-in duration-300">
                            <div className="p-3.5 rounded-lg bg-violet-950/50 border border-violet-700/50 text-xs text-violet-200">
                              <div className="flex items-center justify-between font-semibold text-white mb-1">
                                <span>AI Generative Transformation Target</span>
                                <span className="text-violet-300 font-mono">Target Blueprint</span>
                              </div>
                              <p className="text-violet-300/80 text-[11px]">
                                Proposed layout: Partition wall removed, monolithic quartzite kitchen island, flush cabinetry, matte industrial concrete micro-cement flooring.
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                              <div className="p-2 rounded bg-violet-950/40 border border-violet-800/50 text-violet-300">
                                Key Milestones: 4 Planned
                              </div>
                              <div className="p-2 rounded bg-violet-950/40 border border-violet-800/50 text-violet-300">
                                Target Horizon: 6 Weeks
                              </div>
                            </div>
                          </div>
                        )}

                        {activeStage === 'progress' && (
                          <div className="space-y-3 animate-in fade-in duration-300">
                            <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-700/40 text-xs text-emerald-200">
                              <div className="flex items-center justify-between font-semibold text-white mb-1">
                                <span>Temporal Check-In: Day 28 Audit</span>
                                <span className="text-emerald-400 font-mono">68% Completion</span>
                              </div>
                              <p className="text-emerald-200/80 text-[11px]">
                                Visible modifications identified: Partition wall demolition complete (100%), electrical conduit roughed in (100%), island cabinetry carcass assembled (85%). Countertop and fixtures pending.
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                              <div className="p-2 rounded bg-slate-900/60 border border-emerald-900/40 text-emerald-300">
                                Delta Verification: 3/4 Milestones
                              </div>
                              <div className="p-2 rounded bg-slate-900/60 border border-emerald-900/40 text-emerald-300">
                                Drift Alignment: ±0.3° Conformed
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Perspective alignment tags */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/60 text-[10px] font-mono text-slate-400">
                        <span className="px-2 py-0.5 rounded bg-violet-950/60 border border-violet-800/40 text-violet-300">
                          Anchor: Structural Pier #1
                        </span>
                        <span className="px-2 py-0.5 rounded bg-violet-950/60 border border-violet-800/40 text-violet-300">
                          Anchor: North Wall Datum
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 text-slate-400">
                          Replay Sequence: Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: AI Visual Intelligence Telemetry */}
                  <div className="md:col-span-5 space-y-3">
                    <div className="p-4 rounded-xl bg-[#090e21] border border-violet-900/40">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-slate-400 font-medium flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-violet-400" />
                          Transformation Tracking
                        </span>
                        <span className="text-violet-300 font-mono text-[11px]">
                          {activeStage === 'baseline' ? '0%' : activeStage === 'plan' ? 'Target' : '68% Complete'}
                        </span>
                      </div>

                      {/* Progress meter bar */}
                      <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                          style={{
                            width: activeStage === 'baseline' ? '5%' : activeStage === 'plan' ? '100%' : '68%',
                          }}
                        />
                      </div>
                    </div>

                    {/* Milestone Checklist */}
                    <div className="p-4 rounded-xl bg-[#090e21] border border-violet-900/40 space-y-2.5">
                      <h4 className="text-xs font-semibold text-slate-200 tracking-wide uppercase flex items-center justify-between">
                        <span>Milestone Verification</span>
                        <span className="text-[10px] font-mono text-slate-400">Visual Evidence</span>
                      </h4>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-start gap-2.5 text-slate-300">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeStage === 'progress' ? 'text-emerald-400' : 'text-slate-600'}`} />
                          <div className="flex-1">
                            <p className="font-medium text-white text-[12px]">Demolition & Framing</p>
                            <p className="text-[11px] text-slate-400">Partition cleared; space opened</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-slate-300">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${activeStage === 'progress' ? 'text-emerald-400' : 'text-slate-600'}`} />
                          <div className="flex-1">
                            <p className="font-medium text-white text-[12px]">Rough-In Infrastructure</p>
                            <p className="text-[11px] text-slate-400">Plumbing & electrical verified</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <p className="font-medium text-slate-400 text-[12px]">Countertops & Surfaces</p>
                            <p className="text-[11px] text-slate-500">Scheduled for Check-in #4</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Notice pill */}
                    <div className="p-3 rounded-lg bg-violet-950/30 border border-violet-800/30 flex items-center gap-2.5 text-[11px] text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-violet-400 shrink-0" />
                      <span>Evidence-backed. Zero subjective estimations.</span>
                    </div>
                  </div>
                </div>

                {/* Bottom notification indicator */}
                <div className="relative z-10 mt-6 pt-4 border-t border-violet-900/30 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-violet-400">● RealityReplay AI Engine</span>
                    <span className="text-slate-600">|</span>
                    <span>Multi-temporal photo & video comparison</span>
                  </div>

                  <div className="text-[11px] text-violet-300/80">
                    Concept Preview: Switch stages to see how audits are framed. Create a project to run live photo audits.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
