import React from 'react';
import { Zap, Building2, Briefcase, Code2, ArrowUpRight, Check, Clock } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { ProjectType } from '../types';

interface ServicesProps {
  onSelectService: (serviceId: ProjectType) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-cyan-400" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-cyan-400" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-cyan-400" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-cyan-400" />;
      default:
        return <Zap className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#07090e] relative border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="text-xs uppercase tracking-widest font-semibold text-cyan-400 mb-2">
            Направления разработки
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight text-balance">
            Что мы создаём
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg leading-relaxed">
            Каждый сайт строится под задачи конкретного бизнеса: привлекать клиентов, презентовать компанию или автоматизировать прием заявок.
          </p>
        </div>

        {/* 4 Cards Grid (2x2 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="relative rounded-2xl bg-[#0d1017]/80 border border-white/[0.08] hover:border-cyan-500/30 transition-all duration-300 p-8 sm:p-10 flex flex-col justify-between group hover:shadow-2xl hover:shadow-cyan-950/20"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getIcon(service.iconName)}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Стоимость</span>
                    <span className="text-lg font-bold text-white font-mono">{service.startingPrice}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm font-medium text-cyan-400/90 mb-4">
                  {service.subtitle}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="space-y-2.5 pt-4 border-t border-white/[0.06] mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Срок: {service.timeline}</span>
                </div>

                <button
                  onClick={() => onSelectService(service.id)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.05] hover:bg-cyan-500 text-slate-200 hover:text-slate-950 font-semibold text-xs transition-all duration-200 border border-white/[0.08] hover:border-cyan-400"
                >
                  <span>Обсудить</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
