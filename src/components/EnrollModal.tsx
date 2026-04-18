import React, { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export default function EnrollModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-enroll-modal', handleOpen);
    return () => window.removeEventListener('open-enroll-modal', handleOpen);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      child_name: formData.get('child_name'),
      birth_date: formData.get('birth_date'),
      grade: formData.get('grade'),
      language: formData.get('language'),
      parent_name: formData.get('parent_name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      source: formData.get('source'),
      message: formData.get('message')
    };

    try {
      const res = await fetch('/api/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsOpen(false);
          setIsSuccess(false);
        }, 3000);
      } else {
        alert("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
      }
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
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
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Arizangiz qabul qilindi!</h2>
            <p className="text-slate-600 text-lg">
              Tez orada qabul bo'limi xodimlari siz bilan bog'lanishadi.
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="bg-primary p-8 text-white shrink-0">
              <h2 className="text-3xl font-bold mb-2">Ariza qoldirish</h2>
              <p className="text-blue-100">2026-2027 o'quv yili uchun qabul</p>
            </div>
            
            <div className="p-8 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">O'quvchining F.I.O *</label>
                    <input type="text" name="child_name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50" placeholder="Abdullayev Alisher" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tug'ilgan sanasi *</label>
                    <input type="date" name="birth_date" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Qaysi sinfga? *</label>
                    <select name="grade" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50">
                      <option value="">Tanlang</option>
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={`${n}-sinf`}>{n}-sinf</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Ta'lim tili *</label>
                    <select name="language" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50">
                      <option value="">Tanlang</option>
                      <option value="O'zbek">O'zbek</option>
                      <option value="Rus">Rus</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Ota/Onaning F.I.O *</label>
                    <input type="text" name="parent_name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50" placeholder="Ism Familiya" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Telefon raqam *</label>
                    <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50" placeholder="+998 90 123 45 67" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email (ixtiyoriy)</label>
                    <input type="email" name="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50" placeholder="example@mail.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Biz haqimizda qayerdan bildingiz? *</label>
                    <select name="source" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50">
                      <option value="">Tanlang</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Do'st tavsiyasi">Do'st tavsiyasi</option>
                      <option value="Google">Google</option>
                      <option value="Boshqa">Boshqa</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Qo'shimcha xabar (ixtiyoriy)</label>
                  <textarea name="message" rows={3} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-slate-50 resize-none" placeholder="O'zingizni qiziqtirgan savollarni yozishingiz mumkin..."></textarea>
                </div>

                <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-blue-900/20">
                  Arizani yuborish
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
