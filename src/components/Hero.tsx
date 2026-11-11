import React from 'react';
import { ArrowUpRight, ChevronDown, CheckCircle2, Shield, Zap, Sparkles } from 'lucide-react';
import { CONTACTS_CONFIG } from '../config/contacts';

interface HeroProps {
  onOpenContact: () => void;
  onExplorePortfolio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onExplorePortfolio }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Ambient background glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-transparent blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-20 w-[380px] h-[300px] bg-cyan-500/10 blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Trust Kicker without pills - clean unboxed editorial typography */}
            <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-cyan-400/90 tracking-wide">
              <span>{CONTACTS_CONFIG.brandName} Studio</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">{CONTACTS_CONFIG.geoFull}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Сайты для бизнеса</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08] text-balance">
              Создаём сайты, которые превращают{' '}
              <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                интерес в клиентов
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              Разрабатываем современные сайты для бизнеса. Продуманный дизайн, удобство использования и функциональность — от первой идеи до запуска.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-base transition-all duration-200 shadow-xl shadow-cyan-500/20 hover:shadow-cyan-400/30 active:scale-[0.99] whitespace-nowrap"
              >
                <span>Обсудить проект</span>
                <ArrowUpRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExplorePortfolio}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.12] hover:border-white/[0.24] font-semibold text-base transition-all duration-200 active:scale-[0.99] whitespace-nowrap"
              >
                <span>Посмотреть работы</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Quiet Value Markers (Clean text without pill badges) */}
            <div className="pt-4 border-t border-white/[0.07] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Запуск от 3–5 дней</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>100% Mobile First адаптив</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Фиксированная цена</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition / Studio Mockup Frame (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer Graphite Card with Subtle Hairline Border */}
              <div className="relative rounded-2xl bg-[#0c1017]/90 border border-white/[0.1] shadow-2xl shadow-black/80 overflow-hidden backdrop-blur-xl group">
                
                {/* Browser / Workstation Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#090c12] border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 px-3 py-0.5 rounded bg-white/[0.03] border border-white/[0.04]">
                    xlg.studio/showcase
                  </div>
                  <div className="text-[11px] text-cyan-400 font-mono flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    <span>Fast</span>
                  </div>
                </div>

                {/* Hero Showcase Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src="/src/assets/images/hero_xlg_workspace_1794418820972.jpg"
                    alt="Рабочее пространство веб-разработки XLG"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Micro-Card 1: High Performance */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#080b11]/90 backdrop-blur-md border border-white/[0.1] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Качественная сборка</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Чистый код без мусора и конструкторов
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-cyan-400 font-mono">
                        от 70 000 ₸
                      </div>
                      <div className="text-[10px] text-slate-400">
                        старт проекта
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Spec Strip */}
                <div className="p-4 grid grid-cols-3 gap-2 text-center bg-[#090d14]/70 border-t border-white/[0.04]">
                  <div className="p-2 rounded-lg bg-white/[0.02]">
                    <div className="text-sm font-bold text-white font-mono">100%</div>
                    <div className="text-[10px] text-slate-400">Адаптивность</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02]">
                    <div className="text-sm font-bold text-cyan-400 font-mono">&lt; 1.2s</div>
                    <div className="text-[10px] text-slate-400">Загрузка</div>
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.02]">
                    <div className="text-sm font-bold text-emerald-400 font-mono">WhatsApp</div>
                    <div className="text-[10px] text-slate-400">Заявки</div>
                  </div>
                </div>
              </div>

              {/* Decorative Accent Glow Behind Frame */}
              <div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl -z-10 opacity-70"
                aria-hidden="true"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
