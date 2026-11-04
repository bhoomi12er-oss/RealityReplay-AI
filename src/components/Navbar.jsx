import React, { useState } from 'react';
import { Layers, Sparkles, FolderKanban, Info, Menu, X } from 'lucide-react';

export default function Navbar({ activeView, setActiveView, onOpenAbout, onStartProject }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view, e) => {
    e?.preventDefault();
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHowItWorksClick = (e) => {
    e.preventDefault();
    if (activeView !== 'landing') {
      setActiveView('landing');
      setTimeout(() => {
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('how-it-works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#070913]/85 border-b border-violet-900/25 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <button
            onClick={(e) => handleNavClick('landing', e)}
            className="flex items-center gap-3.5 group text-left focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-800 p-0.5 shadow-lg shadow-violet-900/30 group-hover:shadow-violet-600/40 transition-all duration-300">
              <div className="w-full h-full bg-[#090d1f] rounded-[10px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-violet-400 group-hover:text-violet-300 transition-colors" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-violet-400 rounded-full blur-[2px] opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-white group-hover:text-slate-100 transition-colors">
                  RealityReplay
                </span>
                <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 uppercase font-semibold">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide hidden sm:block">
                Spatial Visual Intelligence
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={(e) => handleNavClick('landing', e)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === 'landing'
                  ? 'text-white bg-violet-950/60 border border-violet-600/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              Home
            </button>
            <button
              onClick={(e) => handleNavClick('dashboard', e)}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                activeView === 'dashboard'
                  ? 'text-white bg-violet-950/60 border border-violet-600/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <FolderKanban className="w-4 h-4 text-violet-400" />
              My Projects
            </button>
            <button
              onClick={handleHowItWorksClick}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900/60 transition-all"
            >
              How It Works
            </button>
            <button
              onClick={() => {
                onOpenAbout();
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900/60 transition-all"
            >
              About
            </button>
          </nav>

          {/* Right Action & Status */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-violet-900/40 text-[11px] text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
              <span>Foundation v0.1</span>
            </div>

            <button
              onClick={onStartProject}
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-md shadow-violet-900/30 hover:shadow-violet-700/50 transition-all duration-200 border border-violet-400/20 active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-violet-200" />
              <span>Start a Project</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 border border-violet-900/40 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-violet-900/30 bg-[#0a0e20]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={(e) => handleNavClick('landing', e)}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium ${
              activeView === 'landing'
                ? 'bg-violet-950/70 text-violet-200 border border-violet-800/40'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Home
          </button>
          <button
            onClick={(e) => handleNavClick('dashboard', e)}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium flex items-center justify-between ${
              activeView === 'dashboard'
                ? 'bg-violet-950/70 text-violet-200 border border-violet-800/40'
                : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            <span>My Projects</span>
            <FolderKanban className="w-4 h-4 text-violet-400" />
          </button>
          <button
            onClick={handleHowItWorksClick}
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900"
          >
            How It Works
          </button>
          <button
            onClick={() => {
              onOpenAbout();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900 flex items-center justify-between"
          >
            <span>About RealityReplay AI</span>
            <Info className="w-4 h-4 text-violet-400" />
          </button>

          <div className="pt-3 border-t border-violet-900/25">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartProject();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-900/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start a Project</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
