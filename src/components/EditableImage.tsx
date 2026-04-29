import React, { useRef, useState, useEffect, useId } from 'react';
import { useEditMode } from '../context/EditModeContext';
import { Camera, Upload, Move, ZoomIn, X, RotateCcw } from 'lucide-react';

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

export default function EditableImage({
  src,
  alt,
  onSave,
  className = '',
  imgClassName = '',
}: EditableImageProps) {
  const { isEditMode, registerPendingSave, unregisterPendingSave } = useEditMode();
  const instanceId = useId();
  const [uploading, setUploading] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { url: initialUrl, style: initialStyle } = decodeSrc(src);
  const [imgUrl, setImgUrl] = useState(initialUrl);
  const [style, setStyle] = useState<ImageStyle>(initialStyle);

  // Track if there are local unsaved changes
  const [hasPending, setHasPending] = useState(false);

  useEffect(() => {
    const { url: u, style: s } = decodeSrc(src);
    setImgUrl(u);
    setStyle(s);
    setHasPending(false);
  }, [src]);

  // Unregister on unmount so pending saves don't leak
  useEffect(() => {
    return () => {
      unregisterPendingSave(instanceId);
    };
  }, [instanceId, unregisterPendingSave]);

  const queueSave = (url: string, s: ImageStyle) => {
    const encoded = encodeSrc(url, s);
    registerPendingSave(instanceId, async () => {
      await onSave(encoded);
    });
    setHasPending(true);
  };

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

  const updateStyle = (patch: Partial<ImageStyle>) => {
    const newStyle = { ...style, ...patch };
    setStyle(newStyle);
    queueSave(imgUrl, newStyle);
  };

  const handleRevert = () => {
    const { url: u, style: s } = decodeSrc(src);
    setImgUrl(u);
    setStyle(s);
    setHasPending(false);
    unregisterPendingSave(instanceId);
  };

  const handleReset = () => {
    const resetStyle: ImageStyle = { scale: 1, posX: 50, posY: 50, rotation: 0 };
    setStyle(resetStyle);
    queueSave(imgUrl, resetStyle);
  };

  const imgStyle: React.CSSProperties = {
    objectPosition: `${style.posX}% ${style.posY}%`,
    transform: `scale(${style.scale}) rotate(${style.rotation || 0}deg)`,
    transformOrigin: `${style.posX}% ${style.posY}%`,
  };

  if (!isEditMode) {
    return (
      <div className={`${className} overflow-hidden`}>
        <img src={imgUrl} alt={alt} className={imgClassName} style={imgStyle} />
      </div>
    );
  }

  return (
    <div className={`${className} relative group overflow-hidden`} style={{ isolate: 'isolate', clipPath: 'inset(0)' }}>
      <img src={imgUrl} alt={alt} className={imgClassName} style={imgStyle} />

      {/* Pending indicator dot */}
      {hasPending && (
        <span className="absolute top-2 left-2 z-20 w-2.5 h-2.5 rounded-full bg-orange-400 border-2 border-white shadow" title="Saqlanmagan o'zgarish bor" />
      )}

      {/* Upload overlay on hover */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 cursor-pointer z-10"
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white" />
        ) : (
          <span className="text-white text-xs font-bold px-3 py-1.5 bg-[#03caff] rounded-full flex items-center gap-1 shadow-lg">
            <Upload size={12} /> Rasm almashtirish
          </span>
        )}
      </div>

      {/* Toggle panel button */}
      <button
        type="button"
        onClick={e => { e.stopPropagation(); setShowPanel(p => !p); }}
        className="absolute top-2 right-2 z-20 bg-white/90 hover:bg-white text-slate-700 rounded-full p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-all"
        title="Rasm sozlamalari"
      >
        {showPanel ? <X size={14} /> : <Move size={14} />}
      </button>

      {/* Floating control panel */}
      {showPanel && (
        <div
          className="absolute bottom-0 left-0 right-0 z-30 bg-black/85 backdrop-blur-sm text-white p-3 space-y-2"
          onClick={e => e.stopPropagation()}
        >
          {/* Scale */}
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

          {/* X Pan */}
          <div className="flex items-center gap-2">
            <Move size={13} className="text-[#03caff] shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-widest w-14 shrink-0">↔ X</span>
            <input
              type="range" min={0} max={100} step={1}
              value={style.posX}
              onChange={e => updateStyle({ posX: parseFloat(e.target.value) })}
              className="flex-1 accent-[#03caff] cursor-pointer"
            />
            <span className="text-[10px] w-8 text-right shrink-0">{style.posX}%</span>
          </div>

          {/* Y Pan */}
          <div className="flex items-center gap-2">
            <Move size={13} className="text-[#03caff] shrink-0 rotate-90" />
            <span className="text-[10px] font-bold uppercase tracking-widest w-14 shrink-0">↕ Y</span>
            <input
              type="range" min={0} max={100} step={1}
              value={style.posY}
              onChange={e => updateStyle({ posY: parseFloat(e.target.value) })}
              className="flex-1 accent-[#03caff] cursor-pointer"
            />
            <span className="text-[10px] w-8 text-right shrink-0">{style.posY}%</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => updateStyle({ rotation: ((style.rotation || 0) + 90) % 360 })}
              className="text-[10px] font-bold bg-[#062bad] hover:bg-[#051fa0] text-white px-3 py-1.5 rounded-lg flex items-center justify-center transition-colors"
              title="Aylantirish (Rotate)"
            >
              <RotateCcw size={11} className="scale-[-1]" /> 90°
            </button>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex-1 text-[10px] font-bold bg-[#03caff] hover:bg-[#00b8e6] text-slate-900 px-2 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-colors"
            >
              <Camera size={11} /> 
            </button>
            {hasPending && (
              <button
                type="button"
                onClick={handleRevert}
                title="Bekor qilish"
                className="text-[10px] font-bold bg-red-500/70 hover:bg-red-500/90 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center justify-center"
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
