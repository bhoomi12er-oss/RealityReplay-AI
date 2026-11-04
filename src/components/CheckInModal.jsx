import React, { useState, useRef } from 'react';
import {
  X,
  Camera,
  UploadCloud,
  RefreshCw,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Clock,
  CircleDashed,
  Compass,
  ArrowRight,
  ShieldCheck,
  ImageIcon,
} from 'lucide-react';
import { processAndOptimizeImage, validateImageFile } from '../utils/imageUtils';

export default function CheckInModal({
  isOpen,
  project,
  onClose,
  onSaveCheckIn,
  showToast,
}) {
  const [checkInImage, setCheckInImage] = useState(null);
  const [imageError, setImageError] = useState('');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [notes, setNotes] = useState('');
  const [checkInLabel, setCheckInLabel] = useState(`Check-In #${(project?.checkInsCount || 0) + 1}`);

  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);

  const fileInputRef = useRef(null);

  if (!isOpen || !project) return null;

  const handleFileProcess = async (file) => {
    if (!file) return;
    setImageError('');
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setImageError(validation.error);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsProcessingImage(true);
    try {
      const processed = await processAndOptimizeImage(file);
      setCheckInImage(processed);
      setImageError('');
      // Reset previous analysis when new image is uploaded
      setAnalysisResult(null);
      setAnalysisError(null);
    } catch (err) {
      setImageError(err.message || 'Failed to process image file.');
    } finally {
      setIsProcessingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileProcess(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileProcess(file);
  };

  const handleRunAnalysis = async () => {
    if (!checkInImage?.dataUrl) {
      setImageError('Please attach a check-in photo before running the audit.');
      return;
    }

    if (!project.imageUrl) {
      setAnalysisError('This project does not have a baseline Day 0 photo to compare against.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await fetch('/api/analyze-checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          baselineImage: project.imageUrl,
          checkInImage: checkInImage.dataUrl,
          projectName: project.name,
          projectCategory: project.category,
          projectGoals: project.description,
          milestones: project.milestones || [],
          notes,
          daysElapsed: checkInLabel,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}. Ensure the backend server is running.`);
      }

      const data = await response.json();
      if (!data.success && !data.analysis) {
        throw new Error(data.error || 'Failed to analyze check-in image.');
      }

      setAnalysisResult(data);
      showToast?.({
        type: data.isDemoFallback ? 'info' : 'success',
        title: data.isDemoFallback ? 'Demo Fallback Audit Generated' : 'Meta Vision Audit Complete',
        message: data.isDemoFallback
          ? 'API key not configured in .env. Displaying structured schema evaluation.'
          : 'Multimodal changes analyzed and verified against Day 0 baseline.',
      });
    } catch (err) {
      console.warn('Check-in analysis failed:', err);
      setAnalysisError(
        `${err.message}. If running locally, make sure to launch the backend server using "npm run server".`
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = () => {
    if (!analysisResult?.analysis) return;

    const isDemo = Boolean(analysisResult.isDemoFallback);
    // Never allow demo mode to save a fabricated progress percentage
    const verifiedProgress = isDemo
      ? (project.progress || 0)
      : Math.round(analysisResult.analysis.overallProgress ?? project.progress ?? 0);

    // Update milestone statuses
    const updatedMilestones = (project.milestones || []).map((m) => {
      if (isDemo) {
        // In demo mode, milestones remain unverified
        return {
          ...m,
          auditStatus: 'Not Yet Verified',
          visualEvidence: 'Awaiting live Meta Vision analysis.',
        };
      }
      const matched = analysisResult.analysis.milestoneAudits?.find(
        (audit) => audit.name.toLowerCase() === m.name.toLowerCase()
      );
      if (matched) {
        return {
          ...m,
          status: matched.status === 'Observed' ? 'completed' : 'pending',
          auditStatus: matched.status,
          visualEvidence: matched.visualEvidence,
        };
      }
      return m;
    });

    const newCheckInRecord = {
      id: 'checkin-' + Date.now(),
      label: checkInLabel,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      imageUrl: checkInImage.dataUrl,
      notes,
      progress: verifiedProgress,
      isVerified: !isDemo,
      isDemoFallback: isDemo,
      provider: analysisResult.provider,
      perspectiveDriftAssessment: analysisResult.analysis.perspectiveDriftAssessment,
      summaryOfChanges: analysisResult.analysis.summaryOfChanges,
      milestoneAudits: analysisResult.analysis.milestoneAudits,
      unplannedObservations: analysisResult.analysis.unplannedObservations,
    };

    onSaveCheckIn({
      ...project,
      // Preserve existing real progress; do not fabricate progress in demo mode
      progress: verifiedProgress,
      checkInsCount: (project.checkInsCount || 0) + 1,
      milestones: updatedMilestones,
      latestCheckIn: newCheckInRecord,
      checkInsHistory: [newCheckInRecord, ...(project.checkInsHistory || [])],
    });

    showToast?.({
      type: isDemo ? 'info' : 'success',
      title: isDemo ? 'Check-In Evidence Saved (Demo Mode)' : 'Progress Audit Saved',
      message: isDemo
        ? 'Photo saved to project records. It will remain unverified until live Meta Vision analysis is run.'
        : `Verified progress updated to ${verifiedProgress}% based on visual evidence.`,
    });

    onClose();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Observed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/50">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Observed</span>
          </span>
        );
      case 'Partially Observed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950 text-amber-300 border border-amber-800/50">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Partially Observed</span>
          </span>
        );
      case 'Needs Review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-950 text-purple-300 border border-purple-800/50">
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
            <span>Needs Review</span>
          </span>
        );
      case 'Not Yet Verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950/60 text-amber-300 border border-amber-800/50">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Not Yet Verified</span>
          </span>
        );
      case 'Not Yet Observed':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-900 text-slate-400 border border-slate-800">
            <CircleDashed className="w-3.5 h-3.5 text-slate-400" />
            <span>Not Yet Observed</span>
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#04060d]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#0c1024] border border-violet-800/40 p-5 sm:p-8 shadow-2xl shadow-violet-950/90 z-10 animate-in fade-in zoom-in-95 duration-200 my-6 max-h-[92vh] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-violet-900/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <Camera className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Add Visual Check-In
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-950 text-violet-300 border border-violet-800/40">
                  {project.category}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Compare new visual evidence against Day 0 baseline for <span className="text-white font-medium">{project.name}</span>
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

        {/* Scrollable Modal Content */}
        <div className="mt-4 overflow-y-auto space-y-6 pr-1 flex-1">
          {/* SIDE-BY-SIDE VISUAL EVIDENCE COMPARISON CANVAS */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Visual Evidence Alignment</span>
              <span className="text-[11px] font-mono text-violet-400">
                Ground-Truth Baseline vs. Progress Snapshot
              </span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Day 0 Baseline Frame */}
              <div className="rounded-xl border border-violet-900/50 bg-[#080b18] p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span className="text-violet-300 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Day 0 Reference Baseline
                  </span>
                  <span className="text-[10px] text-slate-500">{project.createdAt}</span>
                </div>

                <div className="relative rounded-lg overflow-hidden border border-violet-950 bg-black/60 h-48 flex items-center justify-center">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt="Baseline"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-500 font-mono">
                      No initial baseline photo attached to this space.
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-slate-300 border border-slate-800">
                    Baseline Spatial Anchor
                  </div>
                </div>

                <p className="mt-2 text-[11px] text-slate-400 line-clamp-1">
                  {project.description || 'Initial physical space recording'}
                </p>
              </div>

              {/* Latest Check-In Frame (Uploadable) */}
              <div className="rounded-xl border border-violet-700/40 bg-[#080b18] p-3 flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <span className="text-white font-semibold flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-violet-400" />
                    Latest Progress Evidence
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    {checkInImage ? 'Photo Loaded' : 'Awaiting Capture'}
                  </span>
                </div>

                {/* Hidden input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!checkInImage ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-lg h-48 flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-200 group ${
                      isDragging
                        ? 'border-violet-400 bg-violet-950/40'
                        : 'border-violet-800/50 hover:border-violet-500/70 bg-slate-950/40 hover:bg-violet-950/20'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-violet-950/60 border border-violet-800/50 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                      {isProcessingImage ? (
                        <RefreshCw className="w-5 h-5 text-violet-400 animate-spin" />
                      ) : (
                        <UploadCloud className="w-5 h-5 text-violet-400" />
                      )}
                    </div>
                    <p className="text-xs font-semibold text-white">
                      {isProcessingImage ? 'Optimizing photo...' : 'Upload Check-In Photo'}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Drag & drop new photo or{' '}
                      <span className="text-violet-400 underline">browse</span>
                    </p>
                    <span className="text-[10px] font-mono text-slate-500 mt-2">
                      JPG, PNG, WEBP (Max 5MB)
                    </span>
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden border border-violet-800/50 bg-black/60 h-48 flex items-center justify-center group/preview">
                    <img
                      src={checkInImage.dataUrl}
                      alt="Check-in Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-slate-300 border border-slate-800 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-violet-400" />
                      <span className="truncate max-w-[120px]">{checkInImage.name}</span>
                    </div>

                    <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-90">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="p-1.5 rounded-lg bg-black/80 hover:bg-black text-slate-300 hover:text-white border border-slate-700 transition-colors"
                        title="Replace Photo"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-violet-300" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCheckInImage(null)}
                        className="p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800/60 transition-colors"
                        title="Remove Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {imageError && (
                  <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{imageError}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* CHECK-IN METADATA & FIELD NOTES */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Check-In Label
              </label>
              <input
                type="text"
                value={checkInLabel}
                onChange={(e) => setCheckInLabel(e.target.value)}
                placeholder="e.g. Day 14 Audit, Post-Demo"
                className="w-full px-3 py-2 rounded-xl bg-[#080b18] border border-violet-900/40 text-xs text-white outline-none focus:border-violet-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Physical Notes / Scope Observed
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe what work occurred (e.g. removed wall, rough wiring completed)..."
                className="w-full px-3 py-2 rounded-xl bg-[#080b18] border border-violet-900/40 text-xs text-white outline-none focus:border-violet-500"
              />
            </div>
          </div>

          {/* AUDIT TRIGGER BUTTON */}
          {!analysisResult && (
            <div className="pt-2">
              <button
                type="button"
                onClick={handleRunAnalysis}
                disabled={!checkInImage || isAnalyzing || isProcessingImage}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:from-violet-500 hover:via-indigo-500 hover:to-violet-600 shadow-xl shadow-violet-950/60 border border-violet-400/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Auditing Physical Evidence via Meta Model API...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-violet-300" />
                    <span>Compare Baseline & Compute Verified Progress</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* ANALYSIS ERROR NOTICE */}
          {analysisError && (
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/50 flex items-start gap-2.5 text-xs text-red-300 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-200">Analysis Error</p>
                <p className="mt-0.5 text-[11px] text-red-300/90 leading-relaxed">{analysisError}</p>
              </div>
            </div>
          )}

          {/* STRUCTURED REAL/FALLBACK ANALYSIS RESULTS */}
          {analysisResult?.analysis && (
            <div className="space-y-4 pt-2 animate-in fade-in zoom-in-98 duration-300">
              {/* TRANSPARENT DEMO FALLBACK BANNER IF KEY NOT STORED */}
              {analysisResult.isDemoFallback && (
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-600/40 flex items-start gap-2.5 text-xs text-amber-200">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-amber-300 uppercase tracking-wide text-[10px]">
                        Demo Mode (Unverified Schema)
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-amber-200/90 leading-relaxed">
                      {analysisResult.fallbackReason || 'Meta Model API key not detected in .env. No fabricated progress percentages, camera drift measurements, or unsupported visual claims are generated.'}
                    </p>
                  </div>
                </div>
              )}

              {/* OVERALL METRICS HEADER */}
              {analysisResult.isDemoFallback ? (
                /* Demo Mode: No fabricated metrics */
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-700/40 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-amber-400 font-semibold">
                      Verification Status
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-amber-300 font-mono mt-0.5">
                      Pending AI Audit
                    </div>
                    <div className="text-[10px] text-amber-400/80 font-mono mt-0.5">
                      Progress: Unverified (0%)
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                        Meta Model API Status
                      </span>
                      <span className="text-amber-300 font-mono text-[11px]">
                        Awaiting META_API_KEY
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                      <div className="h-full bg-amber-500/30 w-full" />
                    </div>
                    <p className="text-[10px] text-slate-400 italic">
                      Zero fabricated metrics. Live visual verification requires active Meta Model API credentials.
                    </p>
                  </div>
                </div>
              ) : (
                /* Live Meta Vision Real Metrics */
                <div className="p-4 rounded-xl bg-[#090e22] border border-violet-800/40 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-400">
                      Verified Physical Completion
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mt-0.5 flex items-baseline gap-1.5">
                      <span>{analysisResult.analysis.overallProgress}%</span>
                      {analysisResult.analysis.uncertaintyMargin && (
                        <span className="text-xs text-slate-400 font-normal">
                          ±{analysisResult.analysis.uncertaintyMargin}% margin
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                        Visual Evidence Confidence
                      </span>
                      <span className="text-violet-300 font-mono text-[11px]">
                        {analysisResult.analysis.confidenceScore}% Correlated
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-emerald-400"
                        style={{ width: `${analysisResult.analysis.overallProgress || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PERSPECTIVE DRIFT & RECONCILIATION */}
              <div className="p-3.5 rounded-xl bg-[#080b18] border border-violet-900/30 text-xs">
                <div className="flex items-center gap-1.5 text-violet-300 font-semibold mb-1 font-mono text-[11px]">
                  <Compass className="w-3.5 h-3.5 text-violet-400" />
                  <span>Perspective & Camera Compensation</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {analysisResult.analysis.perspectiveDriftAssessment}
                </p>
              </div>

              {/* SUMMARY OF CHANGES */}
              <div className="p-3.5 rounded-xl bg-[#080b18] border border-violet-900/30 text-xs">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
                  Evidence-Based Audit Summary
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {analysisResult.analysis.summaryOfChanges}
                </p>
              </div>

              {/* STRICT 4-CATEGORY MILESTONE AUDITS */}
              <div>
                <h5 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>Milestone Trajectory Verification</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {analysisResult.isDemoFallback ? 'Demo Mode (Unverified)' : 'Verified Evidence'}
                  </span>
                </h5>

                <div className="space-y-2">
                  {analysisResult.analysis.milestoneAudits?.map((milestone, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#080b18] border border-violet-900/20 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-white">{milestone.name}</span>
                        {getStatusBadge(milestone.status)}
                      </div>
                      <p className="text-[11px] text-slate-300">
                        <span className="text-slate-400 font-medium">Visual Evidence: </span>
                        {milestone.visualEvidence}
                      </p>
                      {milestone.uncertaintyFactor && (
                        <p className="text-[10px] text-slate-400 italic">
                          <span>Uncertainty Factor: </span>
                          {milestone.uncertaintyFactor}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* UNPLANNED OBSERVATIONS / ANGLE ADVICE */}
              {analysisResult.analysis.suggestedNextCheckInAngles?.length > 0 && (
                <div className="p-3 rounded-xl bg-violet-950/20 border border-violet-900/30 text-[11px] text-slate-300 space-y-1">
                  <span className="font-semibold text-violet-300">
                    Recommended Camera Framing:
                  </span>
                  <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                    {analysisResult.analysis.suggestedNextCheckInAngles.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-5 pt-4 border-t border-violet-900/30 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            Cancel
          </button>

          {analysisResult?.analysis ? (
            <button
              type="button"
              onClick={handleSave}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-lg ${
                analysisResult.isDemoFallback
                  ? 'bg-amber-700 hover:bg-amber-600 border border-amber-500/40 shadow-amber-950/40'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border border-emerald-400/30 shadow-emerald-950/50'
              }`}
            >
              <span>{analysisResult.isDemoFallback ? 'Save Check-In Evidence (Unverified)' : 'Accept & Save Verified Audit'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <span className="text-[11px] text-slate-500 font-mono">
              Audit must be executed before saving.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

