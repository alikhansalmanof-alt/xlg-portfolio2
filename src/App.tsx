import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { WhyUs } from './components/WhyUs';
import { Process } from './components/Process';
import { PricingCalculator } from './components/PricingCalculator';
import { Faq } from './components/Faq';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConceptModal } from './components/ConceptModal';
import { ConceptProject, ProjectType } from './types';

export default function App() {
  const [activeConcept, setActiveConcept] = useState<ConceptProject | null>(null);
  const [prefilledType, setPrefilledType] = useState<ProjectType | undefined>(undefined);
  const [prefilledDescription, setPrefilledDescription] = useState<string | undefined>(undefined);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = (projectType?: string, description?: string) => {
    if (projectType) {
      if (['landing', 'business', 'service', 'custom'].includes(projectType)) {
        setPrefilledType(projectType as ProjectType);
      } else {
        setPrefilledType('other');
      }
    }
    if (description) {
      setPrefilledDescription(description);
    }
    scrollToSection('contacts');
  };

  const handleSelectService = (serviceId: ProjectType) => {
    setPrefilledType(serviceId);
    scrollToSection('contacts');
  };

  const handleApplyEstimate = (data: { type: ProjectType; calculatedPrice: number; details: string }) => {
    setPrefilledType(data.type);
    setPrefilledDescription(`Расчет из калькулятора: ~${data.calculatedPrice.toLocaleString('ru-RU')} ₸. ${data.details}`);
    scrollToSection('contacts');
  };

  const handleRequestSimilar = (conceptTitle: string) => {
    setActiveConcept(null);
    setPrefilledDescription(`Интересует разработка сайта в концепции "${conceptTitle}".`);
    scrollToSection('contacts');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-[#e2e8f0] flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Fixed Navigation Header */}
      <Header onOpenContact={() => handleOpenContact()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenContact={() => handleOpenContact()}
          onExplorePortfolio={() => scrollToSection('portfolio')}
        />

        {/* 2. Services Section */}
        <Services onSelectService={handleSelectService} />

        {/* 3. Portfolio Showcase Section */}
        <Portfolio
          onOpenConcept={(concept) => setActiveConcept(concept)}
          onOpenContact={(category) => handleOpenContact(undefined, `Интересует проект в категории: ${category}`)}
        />

        {/* 4. Why XLG Section */}
        <WhyUs />

        {/* 5. Work Process Section */}
        <Process />

        {/* 6. Transparent Pricing & Interactive Calculator */}
        <PricingCalculator onApplyEstimate={handleApplyEstimate} />

        {/* 7. Realistic FAQ */}
        <Faq />

        {/* 8. Dedicated Contact Section with WhatsApp Integration */}
        <ContactSection
          prefilledType={prefilledType}
          prefilledDescription={prefilledDescription}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Concept Showcase Modal */}
      <ConceptModal
        concept={activeConcept}
        onClose={() => setActiveConcept(null)}
        onRequestSimilar={handleRequestSimilar}
      />
    </div>
  );
}
