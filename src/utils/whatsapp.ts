import { LeadFormData, FormErrors, ProjectType, BudgetRange } from '../types';
import { CONTACTS_CONFIG, isWhatsAppReady } from '../config/contacts';

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  landing: 'Landing Page (Одностраничный сайт)',
  business: 'Бизнес-сайт компании',
  service: 'Сайт для услуг и записи клиентов',
  custom: 'Индивидуальная разработка',
  other: 'Другое / Требуется консультация',
};

export const BUDGET_LABELS: Record<BudgetRange, string> = {
  up_to_70k: 'до 70 000 ₸',
  '70k_120k': '70 000 – 120 000 ₸',
  '120k_200k': '120 000 – 200 000 ₸',
  discuss: 'Обсудим индивидуально',
};

/**
 * Очищает номер телефона до цифр
 */
export function sanitizePhone(input: string): string {
  return input.replace(/[^\d+]/g, '');
}

/**
 * Валидация формы заявки
 */
export function validateLeadForm(data: LeadFormData): FormErrors {
  const errors: FormErrors = {};

  const trimmedName = data.name.trim();
  if (!trimmedName) {
    errors.name = 'Пожалуйста, укажите ваше имя';
  } else if (trimmedName.length < 2) {
    errors.name = 'Имя должно содержать не менее 2 символов';
  }

  const digits = data.phone.replace(/\D/g, '');
  if (!data.phone.trim()) {
    errors.phone = 'Пожалуйста, укажите контактный номер';
  } else if (digits.length < 10) {
    errors.phone = 'Укажите корректный номер (минимум 10 цифр)';
  }

  return errors;
}

/**
 * Формирует аккуратный текст сообщения для отправки в WhatsApp
 */
export function buildWhatsAppMessage(data: LeadFormData): string {
  const lines: string[] = [
    `👋 Здравствуйте! Заявка с сайта ${CONTACTS_CONFIG.brandName}:`,
    '',
    `👤 Имя: ${data.name.trim()}`,
    `📱 Телефон: ${data.phone.trim()}`,
    `📌 Тип проекта: ${PROJECT_TYPE_LABELS[data.projectType] || data.projectType}`,
    `💰 Ориентировочный бюджет: ${BUDGET_LABELS[data.budget] || data.budget}`,
  ];

  if (data.description && data.description.trim().length > 0) {
    lines.push('', `📝 Описание задачи:`, data.description.trim());
  }

  lines.push('', `📍 География: ${CONTACTS_CONFIG.geoFull}`);
  return lines.join('\n');
}

/**
 * Создаёт прямую ссылку на wa.me
 */
export function buildWhatsAppUrl(
  message: string,
  config: { whatsappRawNumber?: string; isConfigured?: boolean } = CONTACTS_CONFIG
): { url: string; isConfigured: boolean } {
  const configured = isWhatsAppReady(config);
  const cleanNumber = (config.whatsappRawNumber || '').replace(/\D/g, '');
  const encodedText = encodeURIComponent(message);
  
  const targetNumber = configured ? cleanNumber : '77000000000';
  return {
    url: `https://wa.me/${targetNumber}?text=${encodedText}`,
    isConfigured: configured,
  };
}

/**
 * Простой калькулятор базовой оценки стоимости
 */
export interface CalculatorOptions {
  type: ProjectType;
  pagesCount: number; // 1 for landing, 3-10 for business
  needDesign: boolean;
  needMobileAdaptive: boolean;
  needCms: boolean;
  needSpeedOptimization: boolean;
  urgency: 'standard' | 'express';
}

export function calculateEstimate(options: CalculatorOptions): number {
  let base = 70000;

  switch (options.type) {
    case 'landing':
      base = 70000;
      break;
    case 'service':
      base = 95000;
      break;
    case 'business':
      base = 120000;
      break;
    case 'custom':
      base = 160000;
      break;
    default:
      base = 70000;
  }

  // Страницы свыше базового объёма
  if (options.pagesCount > 1) {
    base += (options.pagesCount - 1) * 12000;
  }

  if (options.needCms) {
    base += 30000;
  }

  if (options.urgency === 'express') {
    base = Math.round(base * 1.25);
  }

  return base;
}
