import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useEditMode } from '../context/EditModeContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { Plus, Trash2, X, ChevronLeft, ChevronRight } from 'lucide-react';

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
      savePhotos([...photos, data.url]);
    } catch {
      alert('Yuklashda xatolik');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = (idx: number) => savePhotos(photos.filter((_, i) => i !== idx));

  const openLightbox = (idx: number) => { if (!isEditMode) setLightboxIdx(idx); };
  const closeLightbox = () => setLightboxIdx(null);
  const prevPhoto = (e: React.MouseEvent) => { e.stopPropagation(); setLightboxIdx(i => (i !== null && i > 0 ? i - 1 : photos.length - 1)); };
  const nextPhoto = (e: React.MouseEvent) => { e.stopPropagation(); setLightboxIdx(i => (i !== null && i < photos.length - 1 ? i + 1 : 0)); };

  if (!isEditMode && photos.length === 0) return null;

  const titleText = t.about?.gallery_title ?? 'Fotogaleriya';
  const badgeText = t.about?.gallery_badge ?? 'Maktab hayoti';

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">

        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-5">
            {badgeText}
          </span>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary">
            {titleText}
          </h2>
        </div>

        {isEditMode && (
          <div className="flex justify-center mb-8">
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
        )}

        {photos.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4">
            {photos.map((src, i) => (
              <div
                key={i}
                className="break-inside-avoid mb-3 md:mb-4 rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
                onClick={() => openLightbox(i)}
              >
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                {isEditMode && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-start justify-end p-3">
                    <button
                      onClick={e => { e.stopPropagation(); handleRemove(i); }}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl shadow-lg transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
                {!isEditMode && (
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 rounded-2xl pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        ) : (
          isEditMode && (
            <div className="text-center text-slate-400 py-16 border-2 border-dashed border-slate-200 rounded-3xl">
              Hozircha rasmlar yo'q. Yuqoridagi tugmadan rasm qo'shing.
            </div>
          )
        )}
      </div>

      {lightboxIdx !== null && photos[lightboxIdx] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
            onClick={closeLightbox}
          >
            <X size={28} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={prevPhoto}
          >
            <ChevronLeft size={32} />
          </button>

          <img
            src={photos[lightboxIdx]}
            alt=""
            className="max-w-[90vw] max-h-[90vh] rounded-xl object-contain select-none"
            onClick={e => e.stopPropagation()}
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            onClick={nextPhoto}
          >
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
