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
      <span className="inline-flex flex-col gap-1 relative group w-full">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={handleSave}
            rows={3}
            className={`${className} bg-white/95 border-2 border-dashed border-[#03caff] rounded-lg outline-none resize-none px-2 py-1 text-[#062bad] shadow-xl min-w-[200px] w-full`}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={draft}
            onChange={e => setDraft(e.target.value)}
            onBlur={handleSave}
            onKeyDown={e => { if (e.key === 'Enter') handleSave(); }}
            className={`${className} bg-white/95 border-2 border-dashed border-[#03caff] rounded-lg outline-none px-2 py-1 text-[#062bad] shadow-xl min-w-[200px] w-full`}
          />
        )}
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
