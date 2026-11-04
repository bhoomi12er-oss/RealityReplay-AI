import React from 'react';
import { Camera, Cpu, BarChart2, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function HowItWorksSection({ onStartProject }) {
  const steps = [
    {
      step: '01',
      title: 'Upload Initial Space & Define Vision',
      tagline: 'Establish Baseline Reference',
      description:
        'Walk through your room, backyard garden, commercial retail space, or renovation site and record a quick video or take several photos. Provide your desired transformation criteria, inspiration, or architectural goals.',
      icon: Camera,
      details: [
        'Supports standard smartphone camera photos & walkthrough video',
        'Auto-identifies persistent spatial anchors (walls, doors, structural columns)',
        'Creates an immutable Day 0 baseline coordinate reference',
      ],
      mockupTag: 'Visual Intake Phase',
    },
    {
      step: '02',
      title: 'Generate AI Transformation Blueprint',
      tagline: 'Spatial Geometry & Target Plan',
      description:
        'RealityReplay AI evaluates your spatial geometry and proposes high-resolution transformation concepts. It establishes key construction or decorating milestones calibrated to your actual environment.',
      icon: Cpu,
      details: [
        'Proposes layout and finishes mapped to your physical dimensions',
        'Generates milestone checkpoints (e.g. Demolition, Rough-In, Fixtures)',
        'Defines expected visual delta criteria for each milestone phase',
      ],
      mockupTag: 'Target Blueprint Synthesis',
    },
    {
      step: '03',
      title: 'Capture Check-Ins & Replay Evolution',
      tagline: 'Temporal Difference & Progress Reports',
      description:
        'As physical work happens, snap quick check-in photos whenever convenient. RealityReplay AI compensates for differing camera perspectives and lighting, isolates visible changes, and generates progress reports.',
      icon: BarChart2,
      details: [
        'Reconciles casual check-in angles against original Day 0 baseline',
        'Highlights additions, removals, and structural alterations',
        'Produces objective completion percentages and verifiable logs',
      ],
      mockupTag: 'Visual Delta & Audit Reports',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative bg-[#070a16] border-t border-b border-violet-900/20">
      {/* Background soft ambient glow */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 bg-violet-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-800/40 text-violet-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Workflow Lifecycle</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How RealityReplay AI Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            From initial messy reality to final transformation — a seamless 3-step visual loop.
          </p>
        </div>

        {/* 3 Step Process List */}
        <div className="space-y-8 lg:space-y-12">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={item.step}
                className="relative rounded-2xl bg-[#0c1024]/80 border border-violet-900/30 p-6 sm:p-8 lg:p-10 shadow-xl backdrop-blur-sm hover:border-violet-700/40 transition-all duration-300"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Left Column: Text & Step Info */}
                  <div className={`lg:col-span-7 space-y-4 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-600/20 text-violet-400 font-mono font-bold text-lg border border-violet-500/30">
                        {item.step}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-wider text-violet-400 font-semibold">
                        {item.tagline}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 space-y-2">
                      {item.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Visual Process Card / Blueprint */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="rounded-xl bg-[#080b18] border border-violet-800/30 p-5 shadow-lg relative overflow-hidden">
                      <div className="flex items-center justify-between pb-3 border-b border-violet-900/30 text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-2 text-violet-300">
                          <Icon className="w-4 h-4 text-violet-400" />
                          {item.mockupTag}
                        </span>
                        <span className="text-slate-500 font-mono">Stage {item.step}/03</span>
                      </div>

                      {/* Mockup visual simulation */}
                      <div className="py-6 space-y-3">
                        {index === 0 && (
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center text-slate-400">
                              <span>Raw Visual Streams:</span>
                              <span className="text-violet-300 font-mono">24 Photos / 1 Video</span>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-400 space-y-1">
                              <div>✓ Extraction of 3D feature keypoints</div>
                              <div>✓ Ambient illumination normalized</div>
                              <div>✓ Floor plane & boundary walls indexed</div>
                            </div>
                          </div>
                        )}

                        {index === 1 && (
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center text-slate-400">
                              <span>AI Generative Target:</span>
                              <span className="text-violet-300 font-mono">Precision Concept</span>
                            </div>
                            <div className="p-3 rounded-lg bg-violet-950/40 border border-violet-800/40 font-mono text-[11px] text-violet-300 space-y-1">
                              <div>✓ Target geometry fitted to space limits</div>
                              <div>✓ 4 Key milestone phases established</div>
                              <div>✓ Milestone 1: Structural clear-out</div>
                            </div>
                          </div>
                        )}

                        {index === 2 && (
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center text-slate-400">
                              <span>Temporal Replay Engine:</span>
                              <span className="text-emerald-400 font-mono">Active Verification</span>
                            </div>
                            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 font-mono text-[11px] text-emerald-300 space-y-1">
                              <div>✓ Perspective auto-registered: ±0.3° match</div>
                              <div>✓ Discovered modifications: 18 elements</div>
                              <div>✓ Milestone 1 & 2 verified from evidence</div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-violet-900/20 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Multimodal Model Pipeline</span>
                        <span className="text-violet-400 font-semibold">Step {item.step}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={onStartProject}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-base text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-xl shadow-violet-950/60 border border-violet-400/20 transition-all duration-200"
          >
            <span>Ready to Transform Your Space?</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
