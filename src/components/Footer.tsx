import React from 'react';
import { ArrowUp, MapPin, Phone, MessageCircle } from 'lucide-react';
import { CONTACTS_CONFIG, getCallHref, isWhatsAppReady } from '../config/contacts';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Главная', href: '#hero' },
    { label: 'Услуги', href: '#services' },
    { label: 'Портфолио', href: '#portfolio' },
    { label: 'Почему XLG', href: '#why-us' },
    { label: 'Процесс', href: '#process' },
    { label: 'Стоимость', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Контакты', href: '#contacts' },
  ];

  return (
    <footer className="bg-[#05060a] border-t border-white/[0.06] text-slate-400 text-xs py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white text-sm">
                X
              </div>
              <span className="font-display text-xl font-black tracking-tight text-white">
                XLG<span className="text-cyan-400">.</span>
              </span>
            </div>

            <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
              {CONTACTS_CONFIG.brandTagline}. Продуманные сайты, которые вызывают доверие и превращают посетителей в реальные заявки.
            </p>

            <div className="flex items-center gap-2 text-slate-500 pt-2">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{CONTACTS_CONFIG.geoFull} · Работаем по всему Казахстану и миру</span>
            </div>
          </div>

          {/* Nav links (4 cols) */}
          <div className="md:col-span-4">
            <div className="text-xs uppercase font-semibold text-white tracking-wider mb-4">
              Разделы сайта
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-slate-400 hover:text-cyan-400 transition-colors py-1"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Contacts (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase font-semibold text-white tracking-wider mb-4">
              Прямая связь
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Телефон:</span>
              <a
                href={getCallHref(CONTACTS_CONFIG)}
                className="text-white hover:text-cyan-400 font-mono text-sm font-semibold transition-colors"
              >
                {CONTACTS_CONFIG.phoneDisplay}
              </a>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">WhatsApp:</span>
              <a
                href={
                  isWhatsAppReady(CONTACTS_CONFIG)
                    ? `https://wa.me/${CONTACTS_CONFIG.whatsappRawNumber.replace(/\D/g, '')}`
                    : '#contacts'
                }
                target={isWhatsAppReady(CONTACTS_CONFIG) ? '_blank' : undefined}
                rel={isWhatsAppReady(CONTACTS_CONFIG) ? 'noopener noreferrer' : undefined}
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Открыть диалог в WhatsApp
              </a>
            </div>
            <div className="text-[11px] text-slate-500 pt-1">
              {CONTACTS_CONFIG.workingHours}
            </div>
          </div>

        </div>

        {/* Bottom copyright & back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <div>
            © {new Date().getFullYear()} {CONTACTS_CONFIG.brandName}. Все права защищены. Современная веб-разработка.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.04]"
          >
            <span>Наверх</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
