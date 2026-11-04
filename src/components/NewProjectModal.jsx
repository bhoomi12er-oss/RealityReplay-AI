import React, { useState, useRef } from 'react';
import {
  X,
  FolderPlus,
  UploadCloud,
  Info,
  AlertCircle,
  Trash2,
  RefreshCw,
  CheckCircle2,
  ImageIcon,
} from 'lucide-react';
import { processAndOptimizeImage, validateImageFile } from '../utils/imageUtils';

export default function NewProjectModal({ isOpen, onClose, onCreateProject, showToast }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Living Room');
  const [description, setDescription] = useState('');
  const [targetTimeline, setTargetTimeline] = useState('6 Weeks');
  const [error, setError] = useState('');

  // Image Upload State
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageError, setImageError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const nameInputRef = useRef(null);

  if (!isOpen) return null;

  const categories = [
    'Living Room',
    'Kitchen & Dining',
    'Garden & Outdoor',
    'Bedroom & Suite',
    'Retail & Commercial',
    'Full Renovation',
  ];

  const handleFileProcess = async (file) => {
    if (!file) return;

    setImageError('');
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setImageError(validation.error);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    setIsProcessing(true);
    try {
      const processed = await processAndOptimizeImage(file);
      setSelectedImage(processed);
      setImageError('');

      // Auto-suggest project name from photo filename if name is currently empty
      if (!name.trim()) {
        const derived = file.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]+/g, ' ')
          .trim();
        if (derived) {
          const formatted = derived
            .split(' ')
            .filter(Boolean)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
          setName(formatted);
          if (error) setError('');
        }
      }
    } catch (err) {
      setImageError(err.message || 'Failed to process image. Please try another file.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleTriggerPicker = () => {
    fileInputRef.current?.click();
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setError('');
    setSelectedImage(null);
    setImageError('');
    setIsDragging(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Determine project name with reliable fallback from image or category
    let projectName = name.trim();
    if (!projectName) {
      if (selectedImage?.name) {
        projectName = selectedImage.name
          .replace(/\.[^/.]+$/, '')
          .replace(/[-_]+/g, ' ')
          .trim()
          .split(' ')
          .filter(Boolean)
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
      }
      if (!projectName) {
        projectName = `${category} Transformation`;
      }
      setName(projectName);
    }

    const hasImage = Boolean(selectedImage?.dataUrl);

    const newProject = {
      id: 'proj-' + Date.now(),
      name: projectName,
      category,
      description: description.trim() || 'No additional transformation details specified.',
      targetTimeline,
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      progress: 0,
      status: hasImage ? 'Day 0 Baseline Registered' : 'Awaiting Initial Baseline Capture',
      checkInsCount: 0,
      imageUrl: selectedImage?.dataUrl || null,
      imageMetadata: selectedImage
        ? {
            name: selectedImage.name,
            size: selectedImage.size,
            formattedSize: selectedImage.formattedSize,
            uploadedAt: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
          }
        : null,
      milestones: [
        {
          name: 'Baseline Spatial Ground Truth',
          status: hasImage ? 'completed' : 'pending',
          auditStatus: hasImage ? 'Observed' : 'Not Yet Observed',
          visualEvidence: hasImage ? 'Day 0 initial spatial reference photo registered.' : 'No photo attached.',
        },
        { name: 'Site Clearing & Initial Demolition', status: 'pending', auditStatus: 'Not Yet Observed' },
        { name: 'Infrastructure Rough-In', status: 'pending', auditStatus: 'Not Yet Observed' },
        { name: 'Surfaces, Fixtures & Final Detailing', status: 'pending', auditStatus: 'Not Yet Observed' },
      ],
    };

    try {
      onCreateProject(newProject);
      showToast({
        type: 'success',
        title: hasImage ? 'Project Created with Baseline Photo' : 'Project Initialized',
        message: `"${projectName}" added to your workspace${hasImage ? ' with verified visual baseline.' : '.'}`,
      });

      resetForm();
      onClose();
    } catch (submitErr) {
      console.error('Failed to create project:', submitErr);
      setError(submitErr.message || 'Unable to create project. Please try again.');
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
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0c1024] border border-violet-800/40 p-6 sm:p-8 shadow-2xl shadow-violet-950/80 z-10 animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-violet-900/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <FolderPlus className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Create New Project</h3>
              <p className="text-xs text-slate-400">Initialize a space to track its transformation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/50 flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Space Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Space / Project Name *
            </label>
            <input
              ref={nameInputRef}
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g., Downtown Loft Kitchen, Backyard Garden Pergola"
              className="w-full px-4 py-2.5 rounded-xl bg-[#080b18] border border-violet-900/40 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-sm text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Space Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#080b18] border border-violet-900/40 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-sm text-white outline-none transition-all"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#0c1024] text-slate-200">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Transformation Goals */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Transformation Objective / Planned Changes
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe what you plan to change (e.g. remove partition wall, install quartz countertops, replace flooring, add ambient ceiling LEDs)..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#080b18] border border-violet-900/40 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-sm text-white placeholder-slate-500 outline-none transition-all resize-none"
            />
          </div>

          {/* Target Timeline */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Target Completion Horizon
            </label>
            <select
              value={targetTimeline}
              onChange={(e) => setTargetTimeline(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#080b18] border border-violet-900/40 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-sm text-white outline-none transition-all"
            >
              <option value="2 Weeks" className="bg-[#0c1024]">2 Weeks (Fast Makeover)</option>
              <option value="4-6 Weeks" className="bg-[#0c1024]">4-6 Weeks (Medium Renovation)</option>
              <option value="3 Months" className="bg-[#0c1024]">3 Months (Major Overhaul)</option>
              <option value="6+ Months" className="bg-[#0c1024]">6+ Months (Full Architectural Build)</option>
              <option value="Ongoing" className="bg-[#0c1024]">Ongoing Landscape / Maintenance</option>
            </select>
          </div>

          {/* REAL INITIAL VISUAL EVIDENCE PHOTO UPLOAD */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Initial Visual Evidence</span>
              <span className="text-[10px] font-mono text-violet-400">
                {selectedImage ? 'Photo Attached' : 'Photo Upload Ready'}
              </span>
            </label>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Image Validation Error */}
            {imageError && (
              <div className="mb-3 p-3 rounded-lg bg-red-950/50 border border-red-800/60 flex items-center gap-2 text-xs text-red-300 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{imageError}</span>
              </div>
            )}

            {!selectedImage ? (
              /* Dropzone when no image is selected */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleTriggerPicker}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 group ${
                  isDragging
                    ? 'border-violet-400 bg-violet-950/40 scale-[1.01]'
                    : 'border-violet-800/40 hover:border-violet-500/70 bg-slate-950/40 hover:bg-violet-950/20'
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-violet-950/60 border border-violet-800/50 flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                  {isProcessing ? (
                    <RefreshCw className="w-6 h-6 text-violet-400 animate-spin" />
                  ) : (
                    <UploadCloud className="w-6 h-6 text-violet-400" />
                  )}
                </div>

                <p className="text-sm font-semibold text-white">
                  {isProcessing ? 'Processing photo...' : 'Upload Initial Space Photo'}
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  Drag and drop a room, garden, shop, or renovation photo, or{' '}
                  <span className="text-violet-400 font-medium underline underline-offset-2">
                    click to browse
                  </span>
                </p>

                <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#080b18] border border-violet-900/40 text-[11px] font-mono text-slate-400">
                  <span>JPG, PNG, WEBP • Max 5 MB</span>
                </div>

                {/* Honest AI notice */}
                <p className="text-[11px] text-slate-400 mt-3 max-w-sm mx-auto leading-relaxed italic">
                  Upload your Day 0 visual baseline photo. Once created, use the Check-In modal to compare subsequent photos and run Meta Vision progress audits.
                </p>
              </div>
            ) : (
              /* Image Preview Box when photo is selected */
              <div className="rounded-xl border border-violet-700/50 bg-[#080b18] p-4 space-y-3 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-violet-900/30">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Baseline Photo Attached</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40">
                    Day 0 Reference
                  </span>
                </div>

                {/* Image Preview Thumbnail */}
                <div className="relative rounded-lg overflow-hidden border border-violet-900/50 bg-black/40 max-h-56 flex items-center justify-center">
                  <img
                    src={selectedImage.dataUrl}
                    alt={selectedImage.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-[#080b18]/85 backdrop-blur-md border border-violet-900/40 text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-violet-400" />
                    <span className="max-w-[180px] sm:max-w-xs truncate">{selectedImage.name}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-violet-300">{selectedImage.formattedSize}</span>
                  </div>
                </div>

                {/* Action Buttons for Replace / Remove */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleTriggerPicker}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-violet-900/40 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-violet-400" />
                    <span>Replace Photo</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/50 border border-red-900/40 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Photo</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Informative Note */}
          <div className="p-3 rounded-lg bg-violet-950/30 border border-violet-900/30 flex items-start gap-2.5 text-xs text-slate-400">
            <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <span className="text-[11px]">
              Creating a project establishes the digital container for your space baselines, transformation blueprints, and audit checkpoints.
            </span>
          </div>

          {/* Error notice before actions if present */}
          {error && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/50 flex items-center gap-2 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-violet-900/30">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-950/50 border border-violet-400/30 transition-all disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
