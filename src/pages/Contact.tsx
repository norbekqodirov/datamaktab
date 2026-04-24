import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, MapPin, Mail, Send, MessageSquare, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const nameParts = form.name.trim().split(/\s+/);
      const firstName = nameParts[0] || form.name;
      const lastName = nameParts.slice(1).join(' ') || '';

      const res = await fetch('/api/crm/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          phone: form.phone,
          lastName,
          description: `[Sayt Xabar] ${form.message}`,
        }),
      });

      if (res.ok || res.status === 201) {
        setSent(true);
        setForm({ name: '', phone: '', message: '' });
      } else {
        alert("Xatolik yuz berdi, qayta urinib ko'ring");
      }
    } catch {
      alert("Xatolik yuz berdi, qayta urinib ko'ring");
    } finally {
      setSending(false);
    }
  };

  const infoCards = [
    { icon: <Phone size={20} />, label: c.phone, val: '+998 55 602 00 55', href: 'tel:+998556020055', color: 'from-primary to-[#041c80]' },
    { icon: <MapPin size={20} />, label: c.address, val: "Xorazm vil., Urganch tum., Oyoqbog' MFY, Xiva shox ko'cha", href: 'https://yandex.com/maps/', color: 'from-[#03caff] to-primary' },
    { icon: <Mail size={20} />, label: 'Email', val: 'info@datamaktab.uz', href: 'mailto:info@datamaktab.uz', color: 'from-[#041c80] to-secondary' },
    { icon: <Clock size={20} />, label: c.hours, val: c.hours_val, href: null, color: 'from-secondary to-primary' },
  ];

  return (
    <div className="bg-surface font-body text-on-surface">
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[320px] overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#041c80] to-secondary" />
        <div className="absolute top-12 right-16 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16 relative z-10 pb-14">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-[11px] font-extrabold tracking-[0.25em] text-secondary uppercase mb-4">DATA Maktabi</span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white tracking-tighter">{c.title}</h1>
          </motion.div>
        </div>
      </section>

      {/* Info Cards + Form */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Info cards */}
            <div className="space-y-5">
              {infoCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-2xl p-6 border border-primary/5 flex items-start gap-5 hover:shadow-lg transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${card.color} shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform text-white`}>
                    {card.icon}
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-on-surface-muted mb-1">{card.label}</p>
                    {card.href ? (
                      <a href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                        className="font-semibold text-primary hover:text-secondary transition-colors leading-snug">
                        {card.val}
                      </a>
                    ) : (
                      <p className="font-semibold text-primary leading-snug">{card.val}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Social Links */}
              <div className="glass-card rounded-2xl p-6 border border-primary/5">
                <p className="text-xs font-extrabold uppercase tracking-widest text-on-surface-muted mb-4">Ijtimoiy tarmoqlar</p>
                <div className="flex gap-3">
                  {[
                    { icon: 'instagram', label: 'Instagram', href: 'https://instagram.com/data_maktabi' },
                    { icon: 'telegram', label: 'Telegram', href: 'https://t.me/data_maktabi' },
                    { icon: 'facebook', label: 'Facebook', href: 'https://facebook.com/data_maktabi' },
                  ].map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-primary/10 hover:bg-primary hover:text-white hover:border-primary text-primary transition-all text-sm font-bold">
                      <span className="material-symbols-outlined text-base">{s.icon === 'telegram' ? 'send' : s.icon === 'instagram' ? 'photo_camera' : 'thumb_up'}</span>
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-8 md:p-10 border border-primary/10 shadow-xl"
            >
              {sent ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Send size={28} className="text-green-600" />
                  </div>
                  <h3 className="font-headline font-extrabold text-2xl text-primary mb-2">{c.form_success}</h3>
                  <p className="text-on-surface-muted">Tez orada siz bilan bog'lanamiz.</p>
                  <button onClick={() => setSent(false)} className="mt-8 px-6 py-2.5 bg-primary text-white rounded-full font-bold text-sm hover:bg-primary/90 transition-colors">
                    Yangi xabar
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                      <MessageSquare size={18} className="text-white" />
                    </div>
                    <h2 className="font-headline font-extrabold text-2xl text-primary">Xabar yuborish</h2>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                      { key: 'name', label: c.form_name, type: 'text', placeholder: 'Ism Familiya' },
                      { key: 'phone', label: c.form_phone, type: 'tel', placeholder: '+998 90 123 45 67' },
                    ].map(field => (
                      <div key={field.key}>
                        <label className="block text-xs font-extrabold uppercase tracking-widest text-on-surface-muted mb-2">{field.label}</label>
                        <input
                          type={field.type}
                          required
                          placeholder={field.placeholder}
                          value={(form as any)[field.key]}
                          onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#062bad]/30 focus:border-[#062bad] outline-none transition-all bg-white"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-widest text-on-surface-muted mb-2">{c.form_message}</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Xabaringizni yozing..."
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-[#062bad]/30 focus:border-[#062bad] outline-none resize-none transition-all bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
                    >
                      <Send size={16} />
                      {sending ? 'Yuklanmoqda...' : c.form_submit}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-10 pb-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-100 h-[400px]">
            <iframe
              src="https://yandex.com/map-widget/v1/?um=constructor%3A&ll=60.633558%2C41.553197&z=16&l=map"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              title={c.map_title}
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
