/**
 * Центральный конфигурационный файл контактов бренда XLG.
 * 
 * ВНИМАНИЕ ДЛЯ ВЛАДЕЛЬЦА САЙТА:
 * Чтобы подключить ваш реальный номер телефона:
 * 1. Замените значение в `phone` на ваш номер в читаемом виде: например, '+7 (777) 123-45-67'
 * 2. Замените `whatsappRawNumber` на номер в международном формате БЕЗ плюса и пробелов: например, '77771234567'
 * 3. Поменяйте `isConfigured` на true.
 */

export const CONTACTS_CONFIG = {
  brandName: 'XLG',
  brandTagline: 'Современная веб-разработка для бизнеса',
  
  // География
  city: 'Алматы',
  country: 'Казахстан',
  geoFull: 'Алматы, Казахстан',
  workScope: 'Работаем с клиентами в Алматы, по всему Казахстану и удалённо по СНГ и миру',
  
  // Контакты разработчика
  phoneDisplay: '+7 771 872-17-66',
  whatsappRawNumber: '77718721766',
  whatsappUrl: 'https://wa.me/77718721766',
  callHref: 'tel:+77718721766',
  
  // Флаг настройки: активирует прямую отправку в WhatsApp и звонки
  isConfigured: true,

  // Рабочие часы
  workingHours: 'Пн–Сб: 10:00 – 20:00 (GMT+5)',
  
  // Базовая стоимость разработки
  startingPriceNumber: 70000,
  startingPriceDisplay: '70 000 ₸',
  currency: '₸',
};

/**
 * Проверяет, настроен ли реальный номер WhatsApp
 */
export function isWhatsAppReady(config: { whatsappRawNumber?: string; isConfigured?: boolean } = CONTACTS_CONFIG): boolean {
  if (!config.isConfigured) return false;
  const raw = config.whatsappRawNumber || '';
  const num = raw.replace(/\D/g, '');
  if (num.length < 10) return false;
  if (raw.toUpperCase().includes('X')) return false;
  return true;
}

/**
 * Возвращает прямую ссылку на звонок
 */
export function getCallHref(config: { whatsappRawNumber?: string; isConfigured?: boolean; callHref?: string } = CONTACTS_CONFIG): string {
  if (!isWhatsAppReady(config)) {
    return '#contacts';
  }
  if ('callHref' in config && config.callHref) {
    return config.callHref;
  }
  const digits = (config.whatsappRawNumber || '').replace(/\D/g, '');
  return `tel:+${digits}`;
}
