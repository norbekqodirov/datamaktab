import React, { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function EnrollModal() {
  const { t } = useLanguage();
  const em = t.enroll;
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-enroll-modal', handleOpen);
    return () => window.removeEventListener('open-enroll-modal', handleOpen);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);

    const parentName = (formData.get('parent_name') as string) || '';
    const childName = (formData.get('child_name') as string) || '';
    const phone = (formData.get('phone') as string) || '';
    const grade = (formData.get('grade') as string) || '';
    const language = (formData.get('language') as string) || '';
    const source = (formData.get('source') as string) || '';
    const email = (formData.get('email') as string) || '';
    const message = (formData.get('message') as string) || '';

    const nameParts = parentName.trim().split(/\s+/);
    const firstName = nameParts[0] || parentName;
    const lastName = nameParts.slice(1).join(' ') || '';

    const descParts = [
      `O'quvchi: ${childName}`,
      `Sinf: ${grade}`,
      `Ta'lim tili: ${language}`,
      source ? `Manba: ${source}` : '',
      email ? `Email: ${email}` : '',
      message ? `Xabar: ${message}` : '',
    ].filter(Boolean);

    const crmBody = {
      firstName,
      phone,
      lastName,
      description: descParts.join(' | '),
    };

    try {
      const res = await fetch('/api/crm/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(crmBody),
      });

      if (res.ok || res.status === 201) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsOpen(false);
          setIsSuccess(false);
        }, 3000);
      } else {
        const errText = await res.text();
        console.error('CRM error:', res.status, errText);
        alert(em.error);
      }
    } catch (err) {
      console.error(err);
      alert(em.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="p-12 text-center flex flex-col items-center justify-center h-full">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{em.success_title}</h2>
            <p className="text-slate-600 text-lg">{em.success_desc}</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="bg-primary p-8 text-white shrink-0">
              <h2 className="text-3xl font-bold mb-2">{em.title}</h2>
              <p className="text-blue-100">{em.subtitle}</p>
            </div>

            <div className="p-8 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{em.child_name} *</label>
                    <input type="text" name="child_name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50" placeholder="Abdullayev Alisher" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{em.birth_date} *</label>
                    <input type="date" name="birth_date" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{em.grade_label} *</label>
                    <select name="grade" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50">
                      <option value="">{em.grade_placeholder}</option>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={`${n}-sinf`}>{n}-{em.grade_option}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{em.lang_label} *</label>
                    <select name="language" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50">
                      <option value="">{em.lang_placeholder}</option>
                      <option value={em.lang_uz}>{em.lang_uz}</option>
                      <option value={em.lang_ru}>{em.lang_ru}</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{em.parent_name} *</label>
                    <input type="text" name="parent_name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50" placeholder={em.parent_placeholder} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{em.phone} *</label>
                    <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50" placeholder="+998 90 123 45 67" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{em.email}</label>
                    <input type="email" name="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50" placeholder="example@mail.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{em.source_label} *</label>
                    <select name="source" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50">
                      <option value="">{em.source_placeholder}</option>
                      <option value="Instagram">Instagram</option>
                      <option value={em.source_friend}>{em.source_friend}</option>
                      <option value="Google">Google</option>
                      <option value={em.source_other}>{em.source_other}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{em.message_label}</label>
                  <textarea name="message" rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50 resize-none" placeholder={em.message_placeholder}></textarea>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-blue-900/20 disabled:opacity-60">
                  {loading ? em.submitting : em.submit}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
