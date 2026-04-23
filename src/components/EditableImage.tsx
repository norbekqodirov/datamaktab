import React, { useRef, useState } from 'react';
import { useEditMode } from '../context/EditModeContext';
import { Camera, Upload } from 'lucide-react';

interface EditableImageProps {
  src: string;
  alt: string;
  onSave: (url: string) => void;
  className?: string;
  imgClassName?: string;
}

export default function EditableImage({
  src,
  alt,
  onSave,
  className = '',
  imgClassName = '',
}: EditableImageProps) {
  const { isEditMode } = useEditMode();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      await onSave(data.url);
    } catch {
      alert('Yuklashda xatolik');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  if (!isEditMode) {
    return (
      <div className={className}>
        <img src={src} alt={alt} className={imgClassName} />
      </div>
    );
  }

  return (
    <div className={`${className} relative group cursor-pointer`} onClick={() => inputRef.current?.click()}>
      <img src={src} alt={alt} className={`${imgClassName} transition-all duration-300 group-hover:brightness-75`} />
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-inherit">
        {uploading ? (
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white" />
        ) : (
          <>
            <Camera size={28} className="text-white mb-2" />
            <span className="text-white text-xs font-bold px-3 py-1 bg-[#03caff] rounded-full flex items-center gap-1">
              <Upload size={12} /> Rasm almashtirish
            </span>
          </>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleUpload} />
    </div>
  );
}
