import React from 'react';
import { ExternalLink, Eye, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { PORTFOLIO_CONCEPTS } from '../data/portfolioData';
import { ConceptProject } from '../types';

interface PortfolioProps {
  onOpenConcept: (concept: ConceptProject) => void;
  onOpenContact: (projectType?: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenConcept, onOpenContact }) => {
  return (
    <section id="portfolio" className="py-24 bg-[#080a0f] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-cyan-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Демонстрационные концепты XLG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight text-balance">
              Работы, которые говорят сами за себя
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
              Мы честно представляем эти проекты как демонстрационные концепты XLG, созданные для демонстрации качества дизайна, верстки, логики и адаптивности.
            </p>
          </div>

          <div className="text-xs text-slate-400 max-w-xs border-l border-white/[0.1] pl-4">
            Каждый концепт можно открыть в интерактивном режиме и проверить работу элементов и мобильный вид.
          </div>
        </div>

        {/* 3 Full Concept Cards */}
        <div className="space-y-12">
          {PORTFOLIO_CONCEPTS.map((concept, index) => (
            <div
              key={concept.id}
              className="rounded-3xl bg-[#0c1017] border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 overflow-hidden shadow-2xl group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                
                {/* Visual Preview Half (7 cols) */}
                <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full overflow-hidden bg-slate-950 flex flex-col justify-end">
                  <img
                    src={concept.imageSrc}
                    alt={concept.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-[#0c1017]/30 to-transparent" />
                  
                  {/* Category and tag info banner inside image */}
                  <div className="relative p-6 sm:p-8 z-10">
                    <div className="flex items-center gap-2 text-xs font-medium text-cyan-300 mb-2">
                      <span>{concept.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-300">{concept.tag}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {concept.title}
                    </h3>
                  </div>
                </div>

                {/* Content & Details Half (5 cols) */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/[0.06]">
                  <div>
                    <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                      Проект 0{index + 1}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white mb-3">
                      {concept.headline}
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {concept.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2.5 mb-8">
                      {concept.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={() => onOpenConcept(concept)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Посмотреть проект</span>
                    </button>

                    <button
                      onClick={() => onOpenContact(concept.category)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/[0.1] text-sm font-semibold transition-colors"
                    >
                      <span>Обсудить</span>
                      <ArrowUpRight className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
