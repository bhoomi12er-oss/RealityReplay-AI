import React from 'react';
import { Sparkles, Eye, BarChart3, Check, Layers } from 'lucide-react';

export default function FeaturesSection({ onFeatureSelect: _onFeatureSelect }) {
  const features = [
    {
      id: 'transformation-preview',
      number: '01',
      title: 'Transformation Preview',
      subtitle: 'Generative Spatial Blueprinting',
      description:
        'Propose and visualize high-fidelity transformations before lifting a hammer or committing budget. Explore spatial layouts, fixtures, materials, and architectural updates calibrated to your room, garden, or shop’s precise dimensions.',
      icon: Sparkles,
      iconColor: 'text-violet-400',
      badge: 'Step 1: Visualization',
      highlights: [
        'Perspective-accurate layout generation',
        'Material & lighting exploration',
        'Physical feasibility alignment',
      ],
      callout: 'Eliminate guesswork before buying materials or beginning teardown.',
    },
    {
      id: 'visual-change-tracking',
      number: '02',
      title: 'Visual Change Tracking',
      subtitle: 'Multi-Temporal Difference Detection',
      description:
        'Upload walkthrough video or casual mobile snapshots over time. RealityReplay AI reconciles inconsistent viewpoints, lighting changes, and camera angles to automatically isolate physical progress and detect structural changes.',
      icon: Eye,
      iconColor: 'text-indigo-400',
      badge: 'Step 2: Monitoring',
      highlights: [
        'Automatic camera perspective compensation',
        'Object-level and surface delta isolation',
        'Visual timeline scrubbing from Day 0',
      ],
      callout: 'Spot unnoticed discrepancies and structural evolution effortlessly.',
    },
    {
      id: 'progress-reports',
      number: '03',
      title: 'Progress Reports',
      subtitle: 'Evidence-Based Milestone Auditing',
      description:
        'Replace subjective estimates with verified visual data. Automatically compute milestone completion percentages, compare actual progress against target schedules, and generate audit-ready progress dossiers backed by ground-truth imagery.',
      icon: BarChart3,
      iconColor: 'text-purple-400',
      badge: 'Step 3: Verification',
      highlights: [
        'Objective milestone verification percentage',
        'Side-by-side evidence comparison logs',
        'Exportable reports for owners & teams',
      ],
      callout: 'Clear, transparent documentation for owners, clients, and contractors.',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-800/40 text-violet-300 text-xs font-mono uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5 text-violet-400" />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Bridging Conceptual Vision & Physical Reality
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            A three-pillar multimodal architecture designed specifically to manage real-world physical changes from start to finish.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative rounded-2xl bg-gradient-to-b from-[#11162d]/90 to-[#0a0e1e]/90 border border-violet-900/30 hover:border-violet-600/50 p-8 shadow-xl hover:shadow-2xl hover:shadow-violet-950/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Subtle top glow highlight on hover */}
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Badge and Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-violet-950/80 border border-violet-800/40 flex items-center justify-center group-hover:bg-violet-900/60 transition-colors">
                      <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <span className="text-2xl font-mono font-bold text-slate-700 group-hover:text-violet-400/50 transition-colors">
                      {feature.number}
                    </span>
                  </div>

                  {/* Feature Title */}
                  <div className="mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold">
                      {feature.subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 group-hover:text-violet-200 transition-colors">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                    {feature.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-violet-900/25">
                    {feature.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Callout box at bottom */}
                <div className="mt-4 pt-4 border-t border-violet-950 flex items-center justify-between text-xs text-slate-400 bg-slate-950/40 p-3 rounded-lg border border-violet-900/20">
                  <span className="italic text-[11px] leading-tight text-slate-400">{feature.callout}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
