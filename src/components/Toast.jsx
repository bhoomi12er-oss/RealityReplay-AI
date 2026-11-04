import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    info: <Info className="w-5 h-5 text-violet-400 shrink-0" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-start gap-3 p-4 rounded-xl bg-[#0e1428] border border-violet-500/30 shadow-2xl shadow-violet-950/40 text-slate-200 backdrop-blur-md">
        {icons[toast.type] || icons.info}
        <div className="flex-1 pr-2">
          {toast.title && <h4 className="text-sm font-semibold text-white mb-0.5">{toast.title}</h4>}
          <p className="text-xs text-slate-300 leading-relaxed">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
