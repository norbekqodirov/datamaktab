import React from 'react';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'save' | 'publish' | 'delete';
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Ha, tasdiqlash',
  cancelLabel = 'Bekor qilish',
  onConfirm,
  onCancel,
  variant = 'save',
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const colors = {
    save: { icon: <CheckCircle size={28} className="text-emerald-500" />, btn: 'bg-emerald-500 hover:bg-emerald-600' },
    publish: { icon: <CheckCircle size={28} className="text-[#062bad]" />, btn: 'bg-[#062bad] hover:bg-blue-800' },
    delete: { icon: <AlertTriangle size={28} className="text-red-500" />, btn: 'bg-red-500 hover:bg-red-600' },
  }[variant];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-90 duration-200">
        {/* Close */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
            {colors.icon}
          </div>
          <h2 className="text-lg font-extrabold text-slate-900 mb-2">{title}</h2>
          <p className="text-slate-500 text-sm leading-relaxed">{message}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 text-white rounded-xl font-bold text-sm transition-colors ${colors.btn}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
