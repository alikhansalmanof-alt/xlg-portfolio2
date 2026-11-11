import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  AlertCircle,
  CheckCircle2,
  Copy,
  Info,
  ExternalLink,
} from 'lucide-react';
import { CONTACTS_CONFIG, isWhatsAppReady, getCallHref } from '../config/contacts';
import {
  LeadFormData,
  FormErrors,
  ProjectType,
  BudgetRange,
} from '../types';
import {
  validateLeadForm,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  PROJECT_TYPE_LABELS,
  BUDGET_LABELS,
} from '../utils/whatsapp';

interface ContactSectionProps {
  prefilledType?: ProjectType;
  prefilledDescription?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledType,
  prefilledDescription,
}) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    projectType: prefilledType || 'landing',
    budget: '70k_120k',
    description: prefilledDescription || '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // State for placeholder notice dialog
  const [placeholderNotice, setPlaceholderNotice] = useState<{
    show: boolean;
    generatedMessage: string;
    targetUrl: string;
  } | null>(null);

  const [submittedSuccessUrl, setSubmittedSuccessUrl] = useState<string | null>(null);

  // Sync prefilled props if user clicked "Обсудить" in services or calculator
  useEffect(() => {
    if (prefilledType) {
      setFormData((prev) => ({ ...prev, projectType: prefilledType }));
    }
    if (prefilledDescription) {
      setFormData((prev) => ({
        ...prev,
        description: prev.description
          ? `${prev.description}\n${prefilledDescription}`
          : prefilledDescription,
      }));
    }
  }, [prefilledType, prefilledDescription]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLeadForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const message = buildWhatsAppMessage(formData);
    const { url, isConfigured } = buildWhatsAppUrl(message, CONTACTS_CONFIG);

    if (isConfigured) {
      // Real configured number: store link and open WhatsApp
      setSubmittedSuccessUrl(url);
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
    } else {
      // Placeholder mode: show honest configuration feedback
      setIsSubmitting(false);
      setPlaceholderNotice({
        show: true,
        generatedMessage: message,
        targetUrl: url,
      });
    }
  };

  const copyGeneratedText = () => {
    if (placeholderNotice?.generatedMessage) {
      navigator.clipboard.writeText(placeholderNotice.generatedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const isConfigured = isWhatsAppReady(CONTACTS_CONFIG);

  return (
    <section id="contacts" className="py-24 bg-[#06080d] relative border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="text-xs uppercase tracking-widest font-semibold text-cyan-400 mb-2">
            Связь и заявка
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight text-balance">
            Есть идея для проекта? Давайте обсудим
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
            Заполните короткую форму или напишите нам напрямую. Мы проанализируем ваши задачи и предложим оптимальное решение по структуре и бюджету.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Direct Contacts & Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-[#0c1017] border border-white/[0.08] shadow-xl space-y-6">
              
              {/* Brand Wordmark & Tagline */}
              <div>
                <div className="text-2xl font-black text-white tracking-tight font-display flex items-center gap-2">
                  <span>{CONTACTS_CONFIG.brandName}</span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  {CONTACTS_CONFIG.brandTagline}
                </div>
              </div>

              {/* Contact details list */}
              <div className="space-y-4 pt-4 border-t border-white/[0.06] text-sm">
                
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Контактный телефон</span>
                    <a
                      href={getCallHref(CONTACTS_CONFIG)}
                      className="text-base font-bold text-white hover:text-cyan-400 transition-colors font-mono"
                    >
                      {CONTACTS_CONFIG.phoneDisplay}
                    </a>
                    {!isConfigured && (
                      <span className="text-[11px] text-amber-400/90 block mt-0.5">
                        (временный placeholder, настраивается в файле)
                      </span>
                    )}
                  </div>
                </div>

                {/* Geography */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Локация</span>
                    <div className="text-white font-medium">{CONTACTS_CONFIG.geoFull}</div>
                    <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {CONTACTS_CONFIG.workScope}
                    </div>
                  </div>
                </div>

                {/* Working hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 text-cyan-400 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Режим работы</span>
                    <div className="text-white font-medium">{CONTACTS_CONFIG.workingHours}</div>
                  </div>
                </div>

              </div>

              {/* Direct Quick Action Buttons: WhatsApp & Call */}
              <div className="pt-4 border-t border-white/[0.06] space-y-3">
                <a
                  href={
                    isConfigured
                      ? `https://wa.me/${CONTACTS_CONFIG.whatsappRawNumber.replace(/\D/g, '')}?text=${encodeURIComponent('Здравствуйте! Хочу проконсультироваться по созданию сайта.')}`
                      : '#contacts'
                  }
                  target={isConfigured ? '_blank' : undefined}
                  rel={isConfigured ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    if (!isConfigured) {
                      e.preventDefault();
                      setPlaceholderNotice({
                        show: true,
                        generatedMessage: 'Здравствуйте! Хочу проконсультироваться по созданию сайта в XLG.',
                        targetUrl: 'https://wa.me/77718721766',
                      });
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-500/20 active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Написать в WhatsApp</span>
                </a>

                <a
                  href={getCallHref(CONTACTS_CONFIG)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.1] font-semibold text-sm transition-all duration-200 active:scale-[0.99]"
                >
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>Позвонить</span>
                </a>
              </div>

            </div>

            {/* Config instruction notice for developer */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-400 leading-relaxed flex items-start gap-3">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-cyan-300 font-medium block mb-0.5">Единая настройка контактов:</span>
                Номер WhatsApp и телефон хранятся в файле{' '}
                <code className="text-cyan-300 font-mono bg-white/[0.05] px-1 py-0.5 rounded">
                  src/config/contacts.ts
                </code>
                . Замените плейсхолдер на реальный номер в одном месте.
              </div>
            </div>

          </div>

          {/* Right Column: Full Lead Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0c1017] border border-white/[0.08] shadow-2xl relative">
              <h3 className="text-xl font-bold text-white mb-2">Форма заявки на проект</h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                После заполнения заявка формируется в удобное сообщение и направляется в WhatsApp без задержек.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                
                {/* 1. Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Ваше имя <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Например, Ерлан или Айгуль"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-[#080b11] border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all ${
                      errors.name ? 'border-rose-500 ring-1 ring-rose-500/50' : 'border-white/[0.1]'
                    }`}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* 2. Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Номер телефона (WhatsApp) <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+7 7XX XXX XX XX"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-[#080b11] border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all ${
                      errors.phone ? 'border-rose-500 ring-1 ring-rose-500/50' : 'border-white/[0.1]'
                    }`}
                  />
                  {errors.phone && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phone}</span>
                    </div>
                  )}
                </div>

                {/* 3. Project Type */}
                <div>
                  <label htmlFor="projectType" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Тип проекта
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#080b11] border border-white/[0.1] text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  >
                    <option value="landing">Landing Page (от 70 000 ₸)</option>
                    <option value="service">Сайт для услуг / автосервис / клиника (от 95 000 ₸)</option>
                    <option value="business">Бизнес-сайт компании (от 120 000 ₸)</option>
                    <option value="custom">Индивидуальная разработка (от 160 000 ₸)</option>
                    <option value="other">Другое / Нужна консультация</option>
                  </select>
                </div>

                {/* 4. Budget Range */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Ориентировочный бюджет
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'up_to_70k', label: 'до 70 000 ₸' },
                      { id: '70k_120k', label: '70k–120k ₸' },
                      { id: '120k_200k', label: '120k–200k ₸' },
                      { id: 'discuss', label: 'Обсудим' },
                    ].map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, budget: b.id as BudgetRange }))}
                        className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                          formData.budget === b.id
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                            : 'bg-white/[0.02] border-white/[0.08] text-slate-400 hover:text-white'
                        }`}
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Description */}
                <div>
                  <label htmlFor="description" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Краткое описание задачи (необязательно)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    placeholder="Например: нужен сайт для детейлинг-студии в Алматы с прайсом и записью через WhatsApp..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#080b11] border border-white/[0.1] text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all resize-y"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-base transition-all duration-200 shadow-xl shadow-cyan-500/20 hover:shadow-cyan-400/30 active:scale-[0.99] disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>Отправить заявку</span>
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Нажимая кнопку, вы переходите к отправке сообщения разработчику в WhatsApp
                  </p>
                  {submittedSuccessUrl && (
                    <div className="mt-4 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>
                          Заявка сформирована для WhatsApp ({CONTACTS_CONFIG.phoneDisplay})
                        </span>
                      </div>
                      <a
                        href={submittedSuccessUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs whitespace-nowrap shrink-0 flex items-center gap-1.5 transition-colors"
                      >
                        <span>Открыть WhatsApp</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

              </form>
            </div>
          </div>

        </div>

      </div>

      {/* Modal / Dialog when in Placeholder Mode */}
      {placeholderNotice?.show && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#0e121a] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Режим предварительного просмотра</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Номер телефона в конфигурации пока установлен как плейсхолдер: <code className="text-cyan-300 font-mono">{CONTACTS_CONFIG.phoneDisplay}</code>
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300 space-y-1.5">
              <div className="font-semibold text-white">Как подключить реальный номер:</div>
              <p className="text-slate-400 leading-relaxed">
                Откройте файл <code className="text-cyan-300 font-mono">src/config/contacts.ts</code> и укажите ваш рабочий телефон и флаг <code className="text-cyan-300 font-mono">isConfigured: true</code>.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="font-semibold text-white">Сформированное сообщение для WhatsApp:</span>
                <button
                  type="button"
                  onClick={copyGeneratedText}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Скопировано!' : 'Скопировать'}</span>
                </button>
              </div>
              <pre className="p-3.5 rounded-xl bg-[#07090e] border border-white/[0.08] text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {placeholderNotice.generatedMessage}
              </pre>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setPlaceholderNotice(null)}
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-semibold transition-colors"
              >
                Закрыть
              </button>
              <a
                href={placeholderNotice.targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-1/2 py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Тест ссылки wa.me</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
