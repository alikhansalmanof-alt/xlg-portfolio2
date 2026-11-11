import React from 'react';
import {
  Sparkles,
  Smartphone,
  Compass,
  LayoutTemplate,
  Gauge,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { WHY_US_ITEMS } from '../data/processData';

export const WhyUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-cyan-400" />;
      case 'LayoutTemplate':
        return <LayoutTemplate className="w-5 h-5 text-cyan-400" />;
      case 'Gauge':
        return <Gauge className="w-5 h-5 text-cyan-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-cyan-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="why-us" className="py-24 bg-[#07090e] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="text-xs uppercase tracking-widest font-semibold text-cyan-400 mb-2">
            Принципы работы
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight text-balance">
            Почему XLG
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
            Мы делаем ставку на инженерное качество, чистый код и глубокое понимание задач бизнеса — без шаблонных решений и фальшивых обещаний.
          </p>
        </div>

        {/* Bento Grid layout for advantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_US_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl bg-[#0c0f17]/90 border border-white/[0.07] hover:border-cyan-500/30 transition-all duration-300 flex flex-col justify-between group ${
                idx === 0 ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#0c101a] via-[#0c0f17] to-[#0a0d14]' : ''
              }`}
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.04] text-xs font-mono text-slate-500 flex items-center justify-between">
                <span>Стандарт XLG</span>
                <span>0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
