import React, { useState } from 'react';
import { X, Smartphone, Monitor, Check, Calendar, ArrowRight, Shield, Clock, Phone, Sparkles } from 'lucide-react';
import { ConceptProject } from '../types';
import { CONTACTS_CONFIG } from '../config/contacts';

interface ConceptModalProps {
  concept: ConceptProject | null;
  onClose: () => void;
  onRequestSimilar: (conceptTitle: string) => void;
}

export const ConceptModal: React.FC<ConceptModalProps> = ({
  concept,
  onClose,
  onRequestSimilar,
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  
  // Specific interactive demo state for Auto Detailing
  const [detailingCarClass, setDetailingCarClass] = useState<'sedan' | 'suv' | 'luxury'>('sedan');
  const [selectedPackage, setSelectedPackage] = useState<string>('ceramic');
  
  // Specific interactive demo state for Clinic
  const [clinicCategory, setClinicCategory] = useState<'face' | 'hardware' | 'injections'>('hardware');
  
  // Specific interactive demo state for Restaurant
  const [restaurantGuests, setRestaurantGuests] = useState<number>(2);
  const [restaurantTime, setRestaurantTime] = useState<string>('19:30');
  const [reservationSuccess, setReservationSuccess] = useState<boolean>(false);

  if (!concept) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#0b0e14] border border-white/[0.12] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#080a0f] border-b border-white/[0.08] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-cyan-400 font-mono tracking-wider">
              ДЕМО-ПРЕВЬЮ
            </span>
            <span className="text-slate-500 text-xs hidden sm:inline">|</span>
            <span className="text-xs sm:text-sm font-semibold text-white truncate max-w-[200px] sm:max-w-xs">
              {concept.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Viewport switch: Desktop / Mobile */}
            <div className="flex items-center bg-white/[0.04] p-1 rounded-lg border border-white/[0.06]">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-all ${
                  viewMode === 'desktop'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Режим компьютера"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ПК</span>
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-all ${
                  viewMode === 'mobile'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Мобильный режим"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Мобильный</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Закрыть окно"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Interactive Content */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 flex-1 bg-[#090b10]">
          
          <div
            className={`mx-auto transition-all duration-300 ${
              viewMode === 'mobile' ? 'max-w-[390px] border border-white/[0.1] rounded-2xl p-4 bg-[#0a0d14] shadow-2xl' : 'max-w-4xl'
            }`}
          >
            {/* Concept Header Notice */}
            <div className="mb-6 p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs text-cyan-200">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  Интерактивный демонстрационный концепт XLG. Оцените верстку, цветовую гамму и логику взаимодействия.
                </span>
              </div>
              <button
                onClick={() => onRequestSimilar(concept.title)}
                className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors shrink-0"
              >
                Хочу такой сайт
              </button>
            </div>

            {/* CONCEPT #1: AUTO DETAILING */}
            {concept.id === 'auto-detailing' && (
              <div className="space-y-6">
                {/* Hero preview */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-white/[0.1] bg-black">
                  <img
                    src={concept.imageSrc}
                    alt="Apex Detailing Concept"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
                    <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 mb-1">
                      Детейлинг-центр в Алматы
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-black text-white">
                      Премиальный уход за вашим авто
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
                      Керамические покрытия 9H, полировка кузова и бронирование плёнкой SunTek.
                    </p>
                  </div>
                </div>

                {/* Interactive Car Class Selector & Packages */}
                <div className="p-5 rounded-xl bg-[#0e121a] border border-white/[0.08]">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Интерактивный выбор авто и услуг
                  </div>
                  
                  {/* Car class buttons */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { id: 'sedan', label: 'Седан' },
                      { id: 'suv', label: 'Кроссовер' },
                      { id: 'luxury', label: 'Внедорожник' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setDetailingCarClass(item.id as any)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                          detailingCarClass === item.id
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Package cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        id: 'polish',
                        title: 'Полировка кузова',
                        basePrice: 45000,
                        desc: 'Устранение до 95% мелких царапин и паутинки, зеркальный блеск.',
                      },
                      {
                        id: 'ceramic',
                        title: 'Керамика 9H + Полировка',
                        basePrice: 85000,
                        desc: '3 слоя гидрофобного состава, защита от реагентов и УФ-лучей.',
                      },
                      {
                        id: 'film',
                        title: 'Бронирование пленкой',
                        basePrice: 240000,
                        desc: 'Оклейка зоны риска (капот, бампер, фары, зеркала) пленкой 200 микрон.',
                      },
                    ].map((pkg) => {
                      const multiplier = detailingCarClass === 'luxury' ? 1.3 : detailingCarClass === 'suv' ? 1.15 : 1;
                      const calculatedPrice = Math.round((pkg.basePrice * multiplier) / 1000) * 1000;
                      const isSelected = selectedPackage === pkg.id;

                      return (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackage(pkg.id)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-cyan-950/20 border-cyan-400 shadow-md shadow-cyan-950/40'
                              : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15]'
                          }`}
                        >
                          <div className="text-sm font-bold text-white mb-1">{pkg.title}</div>
                          <div className="text-cyan-400 font-mono font-bold text-base mb-2">
                            {calculatedPrice.toLocaleString('ru-RU')} ₸
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{pkg.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* WhatsApp Booking Simulator */}
                  <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-xs text-slate-400">
                      Выбран пакет: <span className="text-white font-medium">{selectedPackage === 'ceramic' ? 'Керамика 9H' : selectedPackage === 'polish' ? 'Полировка' : 'Бронепленка'}</span> для кузова <span className="text-white font-medium">{detailingCarClass === 'sedan' ? 'Седан' : detailingCarClass === 'suv' ? 'Кроссовер' : 'Внедорожник'}</span>
                    </div>
                    <a
                      href={`https://wa.me/${CONTACTS_CONFIG.whatsappRawNumber}?text=${encodeURIComponent(`Здравствуйте! Интересует пакет детейлинга "${selectedPackage === 'ceramic' ? 'Керамика 9H' : selectedPackage === 'polish' ? 'Полировка' : 'Бронепленка'}" для кузова ${detailingCarClass === 'sedan' ? 'Седан' : detailingCarClass === 'suv' ? 'Кроссовер' : 'Внедорожник'}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Записаться через WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* CONCEPT #2: AESTHETIC CLINIC */}
            {concept.id === 'aesthetic-clinic' && (
              <div className="space-y-6">
                {/* Hero banner */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-[#e2d9cf]/40 bg-[#fbf9f6]">
                  <img
                    src={concept.imageSrc}
                    alt="Lumière Clinic Concept"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent flex flex-col justify-end p-6">
                    <span className="text-xs uppercase tracking-widest text-amber-200 mb-1">
                      Эстетическая медицина · Алматы
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-bold text-white">
                      Естественная молодость и здоровье кожи
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-md">
                      Премиальное аппаратное омоложение на сертифицированном оборудовании.
                    </p>
                  </div>
                </div>

                {/* Clinic Services Showcase */}
                <div className="p-5 rounded-xl bg-[#12161f] border border-white/[0.08]">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Направления процедур
                    </div>
                    <div className="flex gap-1.5">
                      {[
                        { id: 'hardware', label: 'Аппараты' },
                        { id: 'injections', label: 'Инъекции' },
                        { id: 'face', label: 'Уход и пилинги' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setClinicCategory(tab.id as any)}
                          className={`px-3 py-1 text-xs rounded-md transition-all ${
                            clinicCategory === tab.id
                              ? 'bg-amber-200 text-stone-950 font-bold'
                              : 'bg-white/[0.04] text-slate-400 hover:text-white'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Procedures list */}
                  <div className="space-y-2.5">
                    {[
                      {
                        category: 'hardware',
                        name: 'SMAS-лифтинг Ultraformer III',
                        desc: 'Безоперационная подтяжка мышечно-апоневротического слоя лица',
                        time: '60 мин',
                        price: '95 000 ₸',
                      },
                      {
                        category: 'hardware',
                        name: 'Фракционное лазерное омоложение',
                        desc: 'Выравнивание микрорельефа, сужение пор и устранение пигментации',
                        time: '45 мин',
                        price: '65 000 ₸',
                      },
                      {
                        category: 'injections',
                        name: 'Биоревитализация Profhilo',
                        desc: 'Глубокое увлажнение гиалуроновой кислотой ультрачистой концентрации',
                        time: '30 мин',
                        price: '75 000 ₸',
                      },
                      {
                        category: 'face',
                        name: 'Атравматическая чистка HydroPeel',
                        desc: 'Очищение пор вакуумной гидродермабразией с пептидными сыворотками',
                        time: '50 мин',
                        price: '28 000 ₸',
                      },
                    ]
                      .filter((p) => p.category === clinicCategory || clinicCategory === 'hardware')
                      .slice(0, 3)
                      .map((proc, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-between gap-3 hover:bg-white/[0.04] transition-colors"
                        >
                          <div>
                            <div className="text-sm font-semibold text-white">{proc.name}</div>
                            <div className="text-xs text-slate-400">{proc.desc}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xs text-amber-200 font-mono font-bold">{proc.price}</div>
                            <div className="text-[10px] text-slate-500">{proc.time}</div>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs text-slate-400">Врачебный прием по предварительной записи</span>
                    <a
                      href={`https://wa.me/${CONTACTS_CONFIG.whatsappRawNumber}?text=${encodeURIComponent('Здравствуйте! Хочу записаться на первичную консультацию в косметологическую клинику.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-amber-200 hover:bg-amber-100 text-stone-950 font-bold text-xs transition-colors"
                    >
                      Записаться на консультацию
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* CONCEPT #3: RESTAURANT */}
            {concept.id === 'premium-restaurant' && (
              <div className="space-y-6">
                {/* Hero banner */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-white/[0.1] bg-black">
                  <img
                    src={concept.imageSrc}
                    alt="Aura Restaurant Concept"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-6">
                    <span className="text-xs uppercase tracking-widest text-amber-400 mb-1">
                      Авторская кухня · Медеуский район
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-serif text-white">
                      Aura Gastronomy & Wine
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
                      Сезонные блюда из локальных продуктов, коллекция редких вин и вид на горы.
                    </p>
                  </div>
                </div>

                {/* Table Reservation Demo Widget */}
                <div className="p-5 rounded-xl bg-[#11141c] border border-white/[0.08]">
                  <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3">
                    Интерактивное бронирование стола
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1.5">Количество персон</label>
                      <div className="flex gap-2">
                        {[1, 2, 4, 6, 8].map((n) => (
                          <button
                            key={n}
                            onClick={() => setRestaurantGuests(n)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                              restaurantGuests === n
                                ? 'bg-amber-400 text-stone-950 border-amber-400'
                                : 'bg-white/[0.02] border-white/[0.08] text-slate-300 hover:text-white'
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1.5">Время вечера</label>
                      <div className="flex gap-2">
                        {['18:00', '19:30', '21:00', '22:30'].map((time) => (
                          <button
                            key={time}
                            onClick={() => setRestaurantTime(time)}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                              restaurantTime === time
                                ? 'bg-amber-400 text-stone-950 border-amber-400'
                                : 'bg-white/[0.02] border-white/[0.08] text-slate-300 hover:text-white'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="text-xs text-slate-400">
                      Столик на {restaurantGuests} персон на {restaurantTime}
                    </div>
                    <button
                      onClick={() => {
                        setReservationSuccess(true);
                        setTimeout(() => setReservationSuccess(false), 4000);
                      }}
                      className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs transition-colors"
                    >
                      {reservationSuccess ? '✓ Стол забронирован!' : 'Забронировать стол'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Deliverables Strip */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-1 font-semibold">Целевая аудитория:</span>
                <span className="text-slate-200">{concept.details.targetAudience}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1 font-semibold">Технологический стек:</span>
                <div className="flex flex-wrap gap-1.5">
                  {concept.details.techStack.map((tech, idx) => (
                    <span key={idx} className="text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#080a0f] border-t border-white/[0.08] flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            XLG Studio · Демонстрационная реализация
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-400 hover:text-white text-xs font-medium transition-colors"
            >
              Закрыть
            </button>
            <button
              onClick={() => onRequestSimilar(concept.title)}
              className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-lg shadow-cyan-500/20"
            >
              <span>Обсудить похожий проект</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
