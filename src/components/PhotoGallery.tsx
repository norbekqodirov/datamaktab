import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useEditMode } from '../context/EditModeContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { Plus, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import EditableImage from './EditableImage';

function decodePhotoSrc(raw: string) {
  const def = { scale: 1, posX: 50, posY: 50, rotation: 0 };
  if (!raw) return { url: raw, style: def };
  const idx = raw.indexOf('||scale=');
  if (idx === -1) return { url: raw, style: def };
  const url = raw.slice(0, idx);
  const m = raw.slice(idx + 2).match(/scale=([\d.]+),x=([\d.]+),y=([\d.]+)(?:,r=([-]?\d+))?/);
  if (!m) return { url, style: def };
  return {
    url,
    style: {
      scale: parseFloat(m[1]),
      posX: parseFloat(m[2]),
      posY: parseFloat(m[3]),
      rotation: m[4] ? parseInt(m[4], 10) : 0,
    },
  };
}

const cardCls = "w-[300px] h-[200px] rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 relative group/card cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.04] hover:z-10";
const imgCls  = "w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110";

export default function PhotoGallery() {
  const { t } = useLanguage();
  const { get, saveKey } = useSiteSettings();
  const { isEditMode } = useEditMode();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const photosStr = get('gallery_photos_img', '[]');
  const photos: string[] = (() => {
    try {
      const parsed = JSON.parse(photosStr);
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  })();

  // Ref so onSave callbacks always see the latest photos array
  const photosRef = useRef(photos);
  photosRef.current = photos;

  const savePhotos = (arr: string[]) => saveKey('gallery_photos_img', JSON.stringify(arr));

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      savePhotos([...photosRef.current, data.url]);
    } catch {
      alert('Yuklashda xatolik');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = (idx: number) => savePhotos(photos.filter((_, i) => i !== idx));
  const closeLightbox = () => setLightboxIdx(null);
  const prevPhoto = (e: React.MouseEvent) => { e.stopPropagation(); setLightboxIdx(i => (i != null ? (i > 0 ? i - 1 : photos.length - 1) : 0)); };
  const nextPhoto = (e: React.MouseEvent) => { e.stopPropagation(); setLightboxIdx(i => (i != null ? (i < photos.length - 1 ? i + 1 : 0) : 0)); };

  if (!isEditMode && photos.length === 0) return null;

  const titleText = t.about?.gallery_title ?? 'Fotogaleriya';
  const badgeText = t.about?.gallery_badge ?? 'Maktab hayoti';

  const fill = (arr: string[]) =>
    arr.length === 0
      ? []
      : Array.from({ length: Math.ceil(5 / arr.length) }, () => arr).flat().slice(0, Math.max(arr.length, 5));

  const row1 = fill(photos);
  const row2 = fill([...photos].reverse());

  const openLightbox = (encodedSrc: string) => {
    const idx = photos.indexOf(encodedSrc);
    setLightboxIdx(idx >= 0 ? idx : 0);
  };

  const strip = (srcs: string[], keyPrefix: string, onClick?: (src: string) => void) =>
    srcs.map((encodedSrc, i) => {
      const { url, style } = decodePhotoSrc(encodedSrc);
      const imgStyle: React.CSSProperties = {
        objectPosition: `${style.posX}% ${style.posY}%`,
        transform: `scale(${style.scale}) rotate(${style.rotation}deg)`,
        transformOrigin: `${style.posX}% ${style.posY}%`,
      };
      return (
        <div key={`${keyPrefix}-${i}`} className={cardCls} onClick={() => onClick?.(encodedSrc)}>
          <img src={url} alt="" className={imgCls} style={imgStyle} loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none" />
        </div>
      );
    });

  const lightboxEncoded = lightboxIdx !== null ? photos[lightboxIdx] : null;
  const lightboxUrl = lightboxEncoded ? decodePhotoSrc(lightboxEncoded).url : '';

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-5">
            {badgeText}
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">
            {titleText}
          </h2>
        </div>

        {/* Admin panel */}
        {isEditMode && (
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="bg-[#03caff] text-white px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#00b8e6] transition-colors shadow-lg disabled:opacity-60"
              >
                {uploading
                  ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : <Plus size={16} />}
                Rasm qo'shish
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handleUpload} />
            </div>

            {photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {photos.map((encodedSrc, i) => (
                  <div key={i} className="relative group aspect-[3/2] rounded-xl overflow-hidden bg-slate-100 shadow-sm">
                    <EditableImage
                      src={encodedSrc}
                      alt={`Gallery ${i + 1}`}
                      onSave={(encoded) => {
                        const cur = photosRef.current;
                        const updated = [...cur];
                        updated[i] = encoded;
                        savePhotos(updated);
                      }}
                      className="absolute inset-0"
                      imgClassName="w-full h-full object-cover"
                    />
                    {/* Delete — z-40 stays above EditableImage's isolated stacking context */}
                    <button
                      onClick={() => handleRemove(i)}
                      className="absolute top-2 left-2 z-40 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg shadow opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={13} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 z-40 bg-black/40 text-white text-[10px] font-bold text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      #{i + 1}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-400 py-12 border-2 border-dashed border-slate-200 rounded-3xl">
                Hozircha rasmlar yo'q.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Marquee — only in view mode */}
      {!isEditMode && photos.length > 0 && (
        <div
          className="relative mt-2"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}
        >
          {/* Row 1 — scrolls LEFT at 40s */}
          <div className="flex mb-4 group/r1 py-2">
            <div className="flex gap-4 animate-marquee group-hover/r1:[animation-play-state:paused] flex-shrink-0 pr-4" style={{ animationDuration: '40s' }}>
              {strip(row1, 'r1a', openLightbox)}
            </div>
            <div className="flex gap-4 animate-marquee group-hover/r1:[animation-play-state:paused] flex-shrink-0 pr-4" style={{ animationDuration: '40s' }} aria-hidden>
              {strip(row1, 'r1b')}
            </div>
          </div>

          {/* Row 2 — scrolls RIGHT at 52s */}
          <div className="flex group/r2 py-2">
            <div
              className="flex gap-4 animate-marquee group-hover/r2:[animation-play-state:paused] flex-shrink-0 pr-4"
              style={{ animationDirection: 'reverse', animationDuration: '52s' }}
            >
              {strip(row2, 'r2a', openLightbox)}
            </div>
            <div
              className="flex gap-4 animate-marquee group-hover/r2:[animation-play-state:paused] flex-shrink-0 pr-4"
              style={{ animationDirection: 'reverse', animationDuration: '52s' }}
              aria-hidden
            >
              {strip(row2, 'r2b')}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && lightboxUrl && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeLightbox}>
          <button className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors" onClick={closeLightbox}>
            <X size={28} />
          </button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors" onClick={prevPhoto}>
            <ChevronLeft size={32} />
          </button>
          <img
            src={lightboxUrl}
            alt=""
            className="max-w-[90vw] max-h-[90vh] rounded-xl object-contain select-none"
            onClick={e => e.stopPropagation()}
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors" onClick={nextPhoto}>
            <ChevronRight size={32} />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/50 text-sm font-bold tabular-nums">
            {lightboxIdx + 1} / {photos.length}
          </div>
        </div>
      )}
    </section>
  );
}
