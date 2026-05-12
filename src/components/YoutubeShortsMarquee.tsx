import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useEditMode } from '../context/EditModeContext';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { Plus, Trash2 } from 'lucide-react';

// Extract the Video ID to form a proper embed URL (e.g. for YouTube Shorts)
function extractYouTubeEmbedUrl(url: string) {
  let videoId = '';
  try {
    if (url.includes('youtube.com/shorts/')) {
      videoId = url.split('youtube.com/shorts/')[1].split('?')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/watch')) {
      const urlObj = new URL(url);
      videoId = urlObj.searchParams.get('v') || '';
    } else {
      videoId = url;
    }
  } catch (e) {
    // If invalid URL, return empty
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

export default function YoutubeShortsMarquee() {
  const { t } = useLanguage();
  const { get, saveKey } = useSiteSettings();
  const { isEditMode } = useEditMode();

  const titleText = t.home?.youtube_shorts_title ?? 'Ota-onalar fikri';
  const titleWords = titleText.split(' ');
  const titleMain = titleWords.slice(0, -1).join(' ');
  const titleAccent = titleWords[titleWords.length - 1];
  
  const [newUrl, setNewUrl] = useState('');

  const urlsStr = get('youtube_shorts_urls_img', '[]');
  const urls: string[] = (() => {
    try {
      const parsed = JSON.parse(urlsStr);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  })();

  const handleAdd = () => {
    if (!newUrl.trim()) return;
    const embed = extractYouTubeEmbedUrl(newUrl.trim());
    const updated = [...urls, embed];
    saveKey('youtube_shorts_urls_img', JSON.stringify(updated));
    setNewUrl('');
  };

  const handleRemove = (idx: number) => {
    const updated = urls.filter((_, i) => i !== idx);
    saveKey('youtube_shorts_urls_img', JSON.stringify(updated));
  };

  if (!isEditMode && urls.length === 0) return null;

  // Ensure at least 6 items for smooth seamless marquee loop.
  const MIN_ITEMS = 6;
  const renderList: string[] = urls.length > 0
    ? Array.from({ length: Math.ceil(MIN_ITEMS / urls.length) }, () => urls).flat().slice(0, Math.max(urls.length, MIN_ITEMS))
    : [];

  return (
    <section className="pt-4 pb-10 md:pt-6 md:pb-14 bg-surface overflow-hidden">

      {/* Admin panel */}
      {isEditMode && (
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6">
            <h3 className="font-bold text-slate-700 mb-3">Admin: YouTube Short Linklarini Boshqarish</h3>
            <div className="flex gap-3 mb-4">
              <input 
                type="text" 
                value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
                placeholder="https://www.youtube.com/shorts/..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-secondary"
              />
              <button 
                onClick={handleAdd}
                className="bg-[#03caff] text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#00b8e6] transition-colors"
              >
                <Plus size={16} /> Qo'shish
              </button>
            </div>
            
            {urls.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {urls.map((url, i) => (
                  <div key={i} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600">
                    <span className="truncate max-w-[200px]">{url}</span>
                    <button onClick={() => handleRemove(i)} className="text-red-500 hover:text-red-700 p-1 bg-red-50 hover:bg-red-100 rounded-md transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {urls.length > 0 ? (
        <>
          {/* Title — directly above the videos */}
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 mb-8">
            <span className="inline-block px-4 py-1.5 text-[10px] font-extrabold tracking-[0.25em] text-[#062bad] bg-[#03caff]/10 rounded-full uppercase mb-3">
              {t.home?.youtube_shorts_subtitle}
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tighter leading-tight">
              {titleMain} <span className="text-[#03caff]">{titleAccent}</span>
            </h2>
          </div>

          {/* Video marquee */}
          <div className="relative w-full flex overflow-hidden py-4 -mx-4 px-4" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
            <div className="flex gap-6 w-full group">
              {/* Strip 1 */}
              <div className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused] pr-6 flex-shrink-0">
                {renderList.map((url, i) => (
                  <div key={`s1-${i}`} className="w-[240px] h-[420px] rounded-[2rem] overflow-hidden shadow-2xl flex-shrink-0 bg-slate-100 relative transition-transform duration-300 hover:scale-[1.03]">
                    <iframe 
                      src={url} 
                      title={`Parent Testimonial ${i + 1}`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="absolute inset-0 pointer-events-none rounded-[2rem] border-2 border-transparent hover:border-[#03caff]/40 transition-colors" />
                  </div>
                ))}
              </div>
              {/* Strip 2 — aria-hidden duplicate for seamless loop */}
              <div className="flex gap-6 animate-marquee group-hover:[animation-play-state:paused] pr-6 flex-shrink-0" aria-hidden="true">
                {renderList.map((url, i) => (
                  <div key={`s2-${i}`} className="w-[240px] h-[420px] rounded-[2rem] overflow-hidden shadow-2xl flex-shrink-0 bg-slate-100 relative transition-transform duration-300 hover:scale-[1.03]">
                    <iframe 
                      src={url} 
                      title={`Parent Testimonial ${i + 1}`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="absolute inset-0 pointer-events-none rounded-[2rem] border-2 border-transparent hover:border-[#03caff]/40 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        isEditMode && (
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 text-center text-slate-400 py-10 border-2 border-dashed border-slate-200 rounded-3xl">
            Hozircha slaydlar uchun videolar yo'q. Tepadagi paneldan yangi YouTube Shorts havolasini qo'shing.
          </div>
        )
      )}
    </section>
  );
}
