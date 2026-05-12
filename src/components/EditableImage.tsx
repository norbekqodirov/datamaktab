import React, { useRef, useState, useEffect, useId, useCallback } from 'react';
import { useEditMode } from '../context/EditModeContext';
import { Camera, Move, ZoomIn, X, RotateCcw } from 'lucide-react';

interface ImageStyle {
  scale: number;
  posX: number;
  posY: number;
  rotation?: number;
}

interface EditableImageProps {
  src: string;
  alt: string;
  onSave: (url: string) => void;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

function encodeSrc(url: string, style: ImageStyle) {
  return `${url}||scale=${style.scale},x=${style.posX},y=${style.posY},r=${style.rotation || 0}`;
}

function decodeSrc(raw: string): { url: string; style: ImageStyle } {
  const defaultStyle: ImageStyle = { scale: 1, posX: 50, posY: 50, rotation: 0 };
  if (!raw) return { url: raw, style: defaultStyle };
  const idx = raw.indexOf('||scale=');
  if (idx === -1) return { url: raw, style: defaultStyle };
  const url = raw.slice(0, idx);
  const params = raw.slice(idx + 2);
  const match = params.match(/scale=([\d.]+),x=([\d.]+),y=([\d.]+)(?:,r=([-]?\d+))?/);
  if (!match) return { url, style: defaultStyle };
  return {
    url,
    style: {
      scale: parseFloat(match[1]),
      posX: parseFloat(match[2]),
      posY: parseFloat(match[3]),
      rotation: match[4] ? parseInt(match[4], 10) : 0,
    }
  };
}

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }

export default function EditableImage({
  src,
  alt,
  onSave,
  className = '',
  imgClassName = '',
  priority = false,
}: EditableImageProps) {
  const { isEditMode, registerPendingSave, unregisterPendingSave } = useEditMode();
  const instanceId = useId();
  const [uploading, setUploading] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { url: initialUrl, style: initialStyle } = decodeSrc(src);
  const [imgUrl, setImgUrl] = useState(initialUrl);
  const [style, setStyle] = useState<ImageStyle>(initialStyle);
  const [hasPending, setHasPending] = useState(false);

  // Always-fresh refs for use inside native event handlers
  const styleRef = useRef(style);
  const imgUrlRef = useRef(imgUrl);
  styleRef.current = style;
  imgUrlRef.current = imgUrl;

  useEffect(() => {
    const { url: u, style: s } = decodeSrc(src);
    setImgUrl(u);
    setStyle(s);
    setHasPending(false);
  }, [src]);

  useEffect(() => {
    return () => { unregisterPendingSave(instanceId); };
  }, [instanceId, unregisterPendingSave]);

  const queueSave = useCallback((url: string, s: ImageStyle) => {
    const encoded = encodeSrc(url, s);
    registerPendingSave(instanceId, async () => { await onSave(encoded); });
    setHasPending(true);
  }, [instanceId, onSave, registerPendingSave]);

  const queueSaveRef = useRef(queueSave);
  queueSaveRef.current = queueSave;

  const updateStyle = (patch: Partial<ImageStyle>) => {
    setStyle(prev => {
      const next = { ...prev, ...patch };
      queueSave(imgUrl, next);
      return next;
    });
  };

  // ─── Upload ───────────────────────────────────────────────────────────────
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      const newStyle: ImageStyle = { scale: 1, posX: 50, posY: 50, rotation: 0 };
      setImgUrl(data.url);
      setStyle(newStyle);
      queueSave(data.url, newStyle);
    } catch {
      alert('Yuklashda xatolik');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  // ─── Drag-to-pan ──────────────────────────────────────────────────────────
  const handleOverlayMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode || e.button !== 0) return;
    // Let resize handle handle its own events
    if ((e.target as HTMLElement).closest('[data-resize]')) return;

    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startPosX = styleRef.current.posX;
    const startPosY = styleRef.current.posY;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    let moved = false;
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (!moved && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) moved = true;
      if (!moved) return;

      // Sensitivity decreases at higher zoom (more precise control)
      const sens = 1 / styleRef.current.scale;
      const newPosX = clamp(startPosX - (dx / rect.width) * 100 * sens, 0, 100);
      const newPosY = clamp(startPosY - (dy / rect.height) * 100 * sens, 0, 100);

      setStyle(prev => {
        const next = { ...prev, posX: newPosX, posY: newPosY };
        queueSaveRef.current(imgUrlRef.current, next);
        return next;
      });
    };

    const onUp = () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      if (!moved) inputRef.current?.click(); // treat as upload click
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  // ─── Corner resize handle (drag UP = zoom in, DOWN = zoom out) ────────────
  const handleCornerMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const startY = e.clientY;
    const startScale = styleRef.current.scale;

    document.body.style.cursor = 'nwse-resize';
    document.body.style.userSelect = 'none';

    const onMove = (ev: MouseEvent) => {
      const dy = startY - ev.clientY; // up = positive = zoom in
      const newScale = clamp(startScale + dy * 0.012, 0.5, 3);
      setStyle(prev => {
        const next = { ...prev, scale: newScale };
        queueSaveRef.current(imgUrlRef.current, next);
        return next;
      });
    };

    const onUp = () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  // ─── Scroll-to-zoom ───────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isEditMode) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.08 : 0.08;
      setStyle(prev => {
        const next = { ...prev, scale: clamp(prev.scale + delta, 0.5, 3) };
        queueSaveRef.current(imgUrlRef.current, next);
        return next;
      });
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [isEditMode]);

  // ─── Revert / Reset ───────────────────────────────────────────────────────
  const handleRevert = () => {
    const { url: u, style: s } = decodeSrc(src);
    setImgUrl(u); setStyle(s); setHasPending(false);
    unregisterPendingSave(instanceId);
  };

  const handleReset = () => {
    updateStyle({ scale: 1, posX: 50, posY: 50, rotation: 0 });
  };

  const imgStyle: React.CSSProperties = {
    objectPosition: `${style.posX}% ${style.posY}%`,
    transform: `scale(${style.scale}) rotate(${style.rotation || 0}deg)`,
    transformOrigin: `${style.posX}% ${style.posY}%`,
  };

  // ─── View mode ────────────────────────────────────────────────────────────
  if (!isEditMode) {
    return (
      <div className={`${className} overflow-hidden`}>
        <img
          src={imgUrl}
          alt={alt}
          className={imgClassName}
          style={imgStyle}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding={priority ? 'sync' : 'async'}
        />
      </div>
    );
  }

  const needsRelative = !className.includes('absolute') && !className.includes('fixed');

  // ─── Edit mode ────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      className={`${className} group overflow-hidden${needsRelative ? ' relative' : ''}`}
      style={{ isolation: 'isolate', clipPath: 'inset(0)' }}
    >
      <img
        src={imgUrl}
        alt={alt}
        className={imgClassName}
        style={imgStyle}
        loading={priority ? 'eager' : undefined}
      />

      {/* Unsaved indicator */}
      {hasPending && (
        <span className="absolute top-2 left-2 z-20 w-2.5 h-2.5 rounded-full bg-orange-400 border-2 border-white shadow" title="Saqlanmagan o'zgarish" />
      )}

      {/* Drag overlay — full image area, grab cursor */}
      <div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/15"
        style={{ cursor: uploading ? 'wait' : 'grab' }}
        onMouseDown={handleOverlayMouseDown}
      >
        {uploading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white" />
        ) : (
          <div className="flex flex-col items-center gap-2 pointer-events-none select-none">
            <div className="flex items-center gap-1.5 text-white/90 text-[11px] font-bold bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Move size={11} /> Surish · Scroll: zoom
            </div>
            <div className="flex items-center gap-1.5 text-white/70 text-[10px] font-semibold">
              <Camera size={10} /> Bosing — almashtirish
            </div>
          </div>
        )}
      </div>

      {/* Settings toggle button */}
      <button
        type="button"
        onClick={e => { e.stopPropagation(); setShowPanel(p => !p); }}
        className="absolute top-2 right-2 z-20 bg-white/90 hover:bg-white text-slate-700 rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-all"
        title="Sozlamalar"
      >
        {showPanel ? <X size={14} /> : <ZoomIn size={14} />}
      </button>

      {/* Corner resize handle */}
      <div
        data-resize
        className="absolute bottom-2 right-2 z-20 w-7 h-7 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ cursor: 'nwse-resize' }}
        onMouseDown={handleCornerMouseDown}
        title="Yuqoriga torting — kattalashtirish"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" className="absolute bottom-0 right-0 drop-shadow" fill="none">
          <line x1="14" y1="2" x2="2" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="7" x2="7" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="12" x2="12" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Floating settings panel */}
      {showPanel && (
        <div
          className="absolute bottom-0 left-0 right-0 z-30 bg-black/85 backdrop-blur-sm text-white p-3 space-y-2"
          onClick={e => e.stopPropagation()}
          onMouseDown={e => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            <ZoomIn size={13} className="text-[#03caff] shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-widest w-14 shrink-0">Zoom</span>
            <input
              type="range" min={0.5} max={3} step={0.05}
              value={style.scale}
              onChange={e => updateStyle({ scale: parseFloat(e.target.value) })}
              className="flex-1 accent-[#03caff] cursor-pointer"
            />
            <span className="text-[10px] w-8 text-right shrink-0">{Math.round(style.scale * 100)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Move size={13} className="text-[#03caff] shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-widest w-14 shrink-0">↔ X</span>
            <input
              type="range" min={0} max={100} step={1}
              value={style.posX}
              onChange={e => updateStyle({ posX: parseFloat(e.target.value) })}
              className="flex-1 accent-[#03caff] cursor-pointer"
            />
            <span className="text-[10px] w-8 text-right shrink-0">{Math.round(style.posX)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Move size={13} className="text-[#03caff] shrink-0 rotate-90" />
            <span className="text-[10px] font-bold uppercase tracking-widest w-14 shrink-0">↕ Y</span>
            <input
              type="range" min={0} max={100} step={1}
              value={style.posY}
              onChange={e => updateStyle({ posY: parseFloat(e.target.value) })}
              className="flex-1 accent-[#03caff] cursor-pointer"
            />
            <span className="text-[10px] w-8 text-right shrink-0">{Math.round(style.posY)}%</span>
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => updateStyle({ rotation: ((style.rotation || 0) + 90) % 360 })}
              className="text-[10px] font-bold bg-[#062bad] hover:bg-[#051fa0] text-white px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
            >
              <RotateCcw size={11} className="scale-[-1]" /> 90°
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex-1 text-[10px] font-bold bg-[#03caff] hover:bg-[#00b8e6] text-slate-900 px-2 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-colors"
            >
              <Camera size={11} /> Almashtirish
            </button>
            {hasPending && (
              <button
                type="button"
                onClick={handleRevert}
                title="Bekor qilish"
                className="text-[10px] font-bold bg-red-500/70 hover:bg-red-500/90 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center"
              >
                <X size={11} />
              </button>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="text-[10px] font-bold bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleUpload} />
    </div>
  );
}
