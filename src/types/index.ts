export type ProjectType = 'landing' | 'business' | 'service' | 'custom' | 'other';

export type BudgetRange = 'up_to_70k' | '70k_120k' | '120k_200k' | 'discuss';

export interface LeadFormData {
  name: string;
  phone: string;
  projectType: ProjectType;
  budget: BudgetRange;
  description: string;
}

export interface FormErrors {
  name?: string;
  phone?: string;
  general?: string;
}

export interface ServiceItem {
  id: ProjectType;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  timeline: string;
  startingPrice: string;
  iconName: string;
}

export interface ConceptProject {
  id: string;
  title: string;
  clientBrand: string;
  category: string;
  tag: string;
  headline: string;
  description: string;
  imageSrc: string;
  highlights: string[];
  theme: 'dark' | 'light' | 'moody';
  mockupUrl: string;
  details: {
    targetAudience: string;
    keyFeatures: string[];
    techStack: string[];
    deliverables: string[];
  };
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  shortDesc: string;
  duration: string;
  deliverables: string[];
}
