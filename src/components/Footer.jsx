import { Layers } from 'lucide-react';

const CURRENT_YEAR = 2026;

export default function Footer({ setActiveView, onOpenAbout }) {

  return (
    <footer className="border-t border-violet-900/30 bg-[#050711] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 p-0.5 flex items-center justify-center shadow-lg shadow-violet-900/30">
                <div className="w-full h-full bg-[#090d1f] rounded-[10px] flex items-center justify-center">
                  <Layers className="w-4 h-4 text-violet-400" />
                </div>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                RealityReplay <span className="text-violet-400">AI</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Multimodal AI to visualize planned space transformations and track physical progress over time from visual evidence.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>System Status: Frontend Operational</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveView('landing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveView('dashboard');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  My Projects Workspace
                </button>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveView('landing');
                    setTimeout(() => {
                      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </a >
              </li>
              <li>
                <a
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveView('landing');
                    setTimeout(() => {
                      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-white transition-colors"
                >
                  Feature Pillars
                </a >
              </li>
            </ul>
          </div>

          {/* Technical Info & About */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">Architecture & Vision</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designed for homeowners, architects, landscapers, and contractors. Built on React 19, Vite, and cutting-edge spatial visual models.
            </p>
            <div className="pt-1">
              <button
                onClick={onOpenAbout}
                className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
              >
                <span>Read Architecture Roadmap</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="mt-12 pt-8 border-t border-violet-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {CURRENT_YEAR} RealityReplay AI. All rights reserved.</p>
          <p className="italic text-slate-400">
            Frontend Foundation Step • AI Multimodal Ingestion Staged
          </p>
        </div>
      </div>
    </footer>
  );
}
