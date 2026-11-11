import React from 'react';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { PROCESS_STEPS } from '../data/processData';

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-[#080a0f] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="text-xs uppercase tracking-widest font-semibold text-cyan-400 mb-2">
            Прозрачный рабочий процесс
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight text-balance">
            От идеи до готового сайта
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
            Четкая последовательность шагов без сюрпризов. На каждом этапе вы точно знаете, что происходит и какой результат согласуется.
          </p>
        </div>

        {/* 4 Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((step, index) => (
            <div
              key={step.step}
              className="relative rounded-2xl bg-[#0c1017] border border-white/[0.08] hover:border-cyan-500/30 p-7 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl"
            >
              <div>
                {/* Step Number & Duration */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-cyan-400/90 font-mono">
                    {step.step}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/[0.05]">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{step.duration}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {step.shortDesc}
                </p>
              </div>

              {/* Deliverables */}
              <div className="pt-4 border-t border-white/[0.06] space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Результат этапа:
                </div>
                {step.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Subtle connector indicator on desktop */}
              {index < PROCESS_STEPS.length - 1 && (
                <div
                  className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#080a0f] border border-white/[0.1] z-20 flex items-center justify-center text-slate-500 pointer-events-none"
                  aria-hidden="true"
                >
                  <ArrowRight className="w-3 h-3 text-cyan-400" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
