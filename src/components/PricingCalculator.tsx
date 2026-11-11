import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { CONTACTS_CONFIG } from '../config/contacts';
import { ProjectType } from '../types';
import { calculateEstimate, CalculatorOptions } from '../utils/whatsapp';

interface PricingCalculatorProps {
  onApplyEstimate: (data: { type: ProjectType; calculatedPrice: number; details: string }) => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onApplyEstimate }) => {
  const [siteType, setSiteType] = useState<ProjectType>('landing');
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [needCms, setNeedCms] = useState<boolean>(false);
  const [urgency, setUrgency] = useState<'standard' | 'express'>('standard');

  const options: CalculatorOptions = {
    type: siteType,
    pagesCount,
    needDesign: true,
    needMobileAdaptive: true,
    needCms,
    needSpeedOptimization: true,
    urgency,
  };

  const calculatedTotal = calculateEstimate(options);

  const handleApply = () => {
    const details = `Калькулятор: тип ${siteType}, страниц: ${pagesCount}, CMS: ${needCms ? 'Да' : 'Нет'}, режим: ${urgency === 'express' ? 'Срочный' : 'Стандартный'}`;
    onApplyEstimate({
      type: siteType,
      calculatedPrice: calculatedTotal,
      details,
    });
  };

  return (
    <section id="pricing" className="py-24 bg-[#07090e] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="text-xs uppercase tracking-widest font-semibold text-cyan-400 mb-2">
            Прозрачная смета
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight text-balance">
            Стоимость разработки
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
            Понятное ценообразование без скрытых комиссий. В стоимость входят только согласованные работы.
          </p>
        </div>

        {/* Pricing Baseline Card + Interactive Calculator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Transparent Price Tiers (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Highlighted starting card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0e131d] to-[#090c13] border border-cyan-500/30 shadow-xl relative overflow-hidden">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                Базовый порог входа
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight mb-3">
                от {CONTACTS_CONFIG.startingPriceDisplay}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Стартовая стоимость полноценного продающего Landing Page с мобильной версией, чистым кодом и привязкой мессенджеров.
              </p>

              <div className="space-y-3 pt-4 border-t border-white/[0.08] text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Индивидуальный дизайн первого экрана и блоков</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>100% мобильная верстка под все смартфоны</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Интеграция заявок с WhatsApp / Telegram</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Установка счетчиков Google Аналитики</span>
                </div>
              </div>
            </div>

            {/* Note on pricing honesty */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-200 font-medium block mb-1">
                  Фиксация условий в договоре/смете
                </span>
                Итоговая цена формируется исходя из сложности, объема контента и необходимых интеграций. Никаких доплат после утверждения технического задания.
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Price Estimator (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0c1017] border border-white/[0.08] shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Calculator className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Интерактивный расчет стоимости</h3>
                <p className="text-xs text-slate-400">Ориентировочная оценка для формирования предварительной заявки</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* 1. Site Type Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  1. Формат и тип сайта
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'landing', label: 'Landing Page', start: 'от 70 тыс. ₸' },
                    { id: 'service', label: 'Сайт услуг', start: 'от 95 тыс. ₸' },
                    { id: 'business', label: 'Бизнес-сайт', start: 'от 120 тыс. ₸' },
                    { id: 'custom', label: 'Индивидуальный', start: 'от 160 тыс. ₸' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        setSiteType(type.id as ProjectType);
                        if (type.id === 'landing') setPagesCount(1);
                        else if (pagesCount === 1) setPagesCount(3);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        siteType === type.id
                          ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-sm'
                          : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold leading-tight">{type.label}</div>
                      <div className="text-[10px] text-cyan-400/90 font-mono mt-1">{type.start}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Number of pages/screens */}
              {siteType !== 'landing' && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-semibold text-slate-300">
                      2. Примерное количество страниц
                    </label>
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {pagesCount} {pagesCount === 1 ? 'страница' : pagesCount < 5 ? 'страницы' : 'страниц'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    step="1"
                    value={pagesCount}
                    onChange={(e) => setPagesCount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>2 страницы</span>
                    <span>5 страниц</span>
                    <span>10 страниц</span>
                  </div>
                </div>
              )}

              {/* 3. Additional options */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  {siteType !== 'landing' ? '3.' : '2.'} Дополнительные опции
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer hover:bg-white/[0.04] transition-colors">
                    <input
                      type="checkbox"
                      checked={needCms}
                      onChange={(e) => setNeedCms(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 border-slate-700 bg-slate-900"
                    />
                    <div>
                      <div className="text-xs font-semibold text-white">Админ-панель (CMS)</div>
                      <div className="text-[10px] text-slate-400">Для самостоятельного редактирования текстов</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] cursor-pointer hover:bg-white/[0.04] transition-colors">
                    <input
                      type="checkbox"
                      checked={urgency === 'express'}
                      onChange={(e) => setUrgency(e.target.checked ? 'express' : 'standard')}
                      className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 border-slate-700 bg-slate-900"
                    />
                    <div>
                      <div className="text-xs font-semibold text-white">Срочный запуск</div>
                      <div className="text-[10px] text-slate-400">Приоритетная разработка в сжатые сроки</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Calculated price output strip */}
              <div className="p-4 rounded-xl bg-[#080b11] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">Предварительная оценка стоимости:</div>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
                    ~ {calculatedTotal.toLocaleString('ru-RU')} ₸
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Точная смета фиксируется после уточнения деталей
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleApply}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 whitespace-nowrap"
                >
                  <span>Зафиксировать расчет</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
