import React, { useState, useRef } from 'react';
import { useEditMode } from '../context/EditModeContext';
import { Check, X, Pencil } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onSave: (val: string) => void;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  multiline?: boolean;
  children?: React.ReactNode;
}

export default function EditableText({
  value,
  onSave,
  className = '',
  as: Tag = 'span',
  multiline = false,
  children,
}: EditableTextProps) {
  const { isEditMode } = useEditMode();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);

  if (!isEditMode) {
    return <Tag className={className}>{children ?? value}</Tag>;
  }

  const handleOpen = () => {
    setDraft(value);
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleSave = async () => {
    await onSave(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(value);
    setEditing(false);
  };

  if (editing) {
    return (
      <span className="inline-flex flex-col gap-1 relative group">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            rows={3}
            className={`${className} bg-white/90 border-2 border-[#03caff] rounded-lg outline-none resize-none px-2 py-1 text-[#062bad] shadow-xl min-w-[200px]`}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            className={`${className} bg-white/90 border-2 border-[#03caff] rounded-lg outline-none px-2 py-1 text-[#062bad] shadow-xl min-w-[200px]`}
          />
        )}
        <span className="flex gap-1 mt-1">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-[#03caff] text-white rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-[#02b5e6] shadow"
          >
            <Check size={12} /> Saqlash
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-white/80 border text-slate-600 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-slate-50 shadow"
          >
            <X size={12} /> Bekor
          </button>
        </span>
      </span>
    );
  }

  return (
    <Tag
      className={`${className} relative cursor-pointer group`}
      onClick={handleOpen}
      title="Bosib tahrirlash"
    >
      {children ?? value}
      <span className="absolute -top-2 -right-2 bg-[#03caff] text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none z-50">
        <Pencil size={10} />
      </span>
    </Tag>
  );
}
