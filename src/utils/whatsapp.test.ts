import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateLeadForm,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  calculateEstimate,
  sanitizePhone,
} from './whatsapp';
import { isWhatsAppReady, CONTACTS_CONFIG, getCallHref } from '../config/contacts';

test('validateLeadForm identifies invalid names and phones', () => {
  const invalidResult = validateLeadForm({
    name: 'A',
    phone: '123',
    projectType: 'landing',
    budget: 'up_to_70k',
    description: '',
  });
  assert.ok(invalidResult.name, 'Name should be invalid if 1 char');
  assert.ok(invalidResult.phone, 'Phone should be invalid if fewer than 10 digits');

  const validResult = validateLeadForm({
    name: 'Арман',
    phone: '+7 701 555 12 34',
    projectType: 'business',
    budget: '70k_120k',
    description: 'Нужен сайт для строительной компании',
  });
  assert.equal(Object.keys(validResult).length, 0, 'Valid form should produce zero errors');
});

test('sanitizePhone cleans non-digit characters', () => {
  assert.equal(sanitizePhone('+7 (777) 123-45-67'), '+77771234567');
  assert.equal(sanitizePhone('8 705 999 88 77'), '87059998877');
});

test('buildWhatsAppMessage produces formatted Russian text with all lead details', () => {
  const msg = buildWhatsAppMessage({
    name: 'Елена',
    phone: '+7 777 000 11 22',
    projectType: 'service',
    budget: '70k_120k',
    description: 'Интересует сайт для косметологического кабинета в Алматы',
  });

  assert.ok(msg.includes('Елена'));
  assert.ok(msg.includes('+7 777 000 11 22'));
  assert.ok(msg.includes('Сайт для услуг'));
  assert.ok(msg.includes('70 000 – 120 000 ₸'));
  assert.ok(msg.includes('косметологического кабинета'));
});

test('buildWhatsAppUrl detects placeholder mode accurately', () => {
  const mockUnconfigured = {
    brandName: 'XLG',
    brandTagline: 'Test',
    city: 'Алматы',
    country: 'Казахстан',
    geoFull: 'Алматы',
    workScope: 'Тест',
    phoneDisplay: '+7 (XXX) XXX-XX-XX',
    whatsappRawNumber: '7XXXXXXXXXX',
    isConfigured: false,
    workingHours: '10:00 - 20:00',
    startingPriceNumber: 70000,
    startingPriceDisplay: '70 000 ₸',
    currency: '₸',
  };

  assert.equal(isWhatsAppReady(mockUnconfigured), false);
  const result = buildWhatsAppUrl('Тестовое сообщение', mockUnconfigured);
  assert.equal(result.isConfigured, false);

  const mockConfigured = {
    ...mockUnconfigured,
    isConfigured: true,
    whatsappRawNumber: '77011234567',
  };
  assert.equal(isWhatsAppReady(mockConfigured), true);
  const configuredResult = buildWhatsAppUrl('Привет', mockConfigured);
  assert.equal(configuredResult.isConfigured, true);
  assert.ok(configuredResult.url.includes('77011234567'));
});

test('calculateEstimate gives correct tiered pricing', () => {
  const landingBase = calculateEstimate({
    type: 'landing',
    pagesCount: 1,
    needDesign: true,
    needMobileAdaptive: true,
    needCms: false,
    needSpeedOptimization: true,
    urgency: 'standard',
  });
  assert.equal(landingBase, 70000);

  const businessWithCms = calculateEstimate({
    type: 'business',
    pagesCount: 4,
    needDesign: true,
    needMobileAdaptive: true,
    needCms: true,
    needSpeedOptimization: true,
    urgency: 'standard',
  });
  // 120,000 base + 3 * 12,000 extra pages + 30,000 CMS = 186,000
  assert.equal(businessWithCms, 186000);
});

test('CONTACTS_CONFIG has real XLG phone and WhatsApp numbers configured', () => {
  assert.equal(CONTACTS_CONFIG.isConfigured, true);
  assert.equal(CONTACTS_CONFIG.phoneDisplay, '+7 771 872-17-66');
  assert.equal(CONTACTS_CONFIG.whatsappRawNumber, '77718721766');
  assert.equal(CONTACTS_CONFIG.whatsappUrl, 'https://wa.me/77718721766');
  assert.equal(getCallHref(CONTACTS_CONFIG), 'tel:+77718721766');

  const { url, isConfigured } = buildWhatsAppUrl('Тест заявки');
  assert.equal(isConfigured, true);
  assert.ok(url.startsWith('https://wa.me/77718721766?text='));
});

