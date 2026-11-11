# XLG — Премиальный сайт веб-разработки для бизнеса

Современный, быстрый и конверсионный веб-сайт digital-бренда **XLG** (Алматы, Казахстан). Разработан на стеке React 19, TypeScript, Vite и Tailwind CSS.

---

## 🚀 1. Как запустить сайт локально

1. Убедитесь, что установлен Node.js версии 18 или новее.
2. Перейдите в папку проекта:
   ```bash
   cd xlg-website
   ```
3. Установите зависимости (если еще не установлены):
   ```bash
   npm install
   ```
4. Запустите сервер разработки:
   ```bash
   npm run dev
   ```
5. Откройте в браузере адрес: `http://localhost:3000` (или порт, указанный в терминале).

---

## 📱 2. Где заменить номер телефона и WhatsApp

Все контактные данные вынесены в **один центральный конфигурационный файл**:

👉 **Файл:** `src/config/contacts.ts`

Внутри файла:
```typescript
export const CONTACTS_CONFIG = {
  brandName: 'XLG',
  city: 'Алматы',
  country: 'Казахстан',
  
  // 1. Отображаемый номер на сайте:
  phoneDisplay: '+7 (777) 123-45-67',
  
  // 2. Номер WhatsApp в международном формате (только цифры без плюса и скобок):
  whatsappRawNumber: '77771234567',
  
  // 3. Переключите флаг на true, когда укажете реальный номер:
  isConfigured: true,
  
  // ...
};
```

Как только вы установите `isConfigured: true`, сайт автоматически:
- Будет открывать прямую ссылку `https://wa.me/77771234567?text=...` при отправке формы;
- Активирует кнопку прямого звонка `tel:+77771234567`;
- Активирует кнопку «Написать в WhatsApp».

Пока `isConfigured: false`, сайт честно показывает окно предварительного просмотра сообщения без фиктивной отправки.

---

## ✍️ 3. Как изменить тексты и цены

Все данные вынесены в понятные структурированные файлы в папке `src/data/`:

- **Услуги и цены:** `src/data/servicesData.ts`  
  Здесь редактируются названия услуг, описание, списки преимуществ, сроки и стоимость (например, «от 70 000 ₸»).
- **Этапы работы:** `src/data/processData.ts`  
  Здесь настраиваются шаги от 01 до 04 и список преимуществ в блоке «Почему XLG».
- **Частые вопросы (FAQ):** `src/data/faqData.ts`  
  Здесь можно редактировать вопросы и ответы.
- **Базовый калькулятор цен:** `src/utils/whatsapp.ts` (функция `calculateEstimate`).

---

## 💼 4. Как добавить новые проекты в портфолио

Файл с проектами: `src/data/portfolioData.ts`

Чтобы добавить новый кейс или концепт, добавьте новый объект в массив `PORTFOLIO_CONCEPTS`:

```typescript
{
  id: 'my-new-project',
  title: 'Название проекта',
  clientBrand: 'Бренд',
  category: 'Сфера бизнеса',
  tag: 'Кейс XLG',
  headline: 'Заголовок проекта',
  description: 'Краткое описание задачи и решения.',
  imageSrc: '/src/assets/images/your-image.jpg',
  highlights: [
    'Ключевая особенность 1',
    'Ключевая особенность 2'
  ],
  theme: 'dark',
  mockupUrl: 'https://example.com',
  details: {
    targetAudience: 'Целевая аудитория',
    keyFeatures: ['Функция 1', 'Функция 2'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    deliverables: ['Результат 1', 'Результат 2']
  }
}
```

Изображения сохраняются в папку `src/assets/images/`.

---

## 📦 5. Как собрать production-версию

Чтобы получить оптимизированную статическую сборку для публикации:

```bash
npm run build
```

Готовые файлы появятся в папке `dist/`. Сборка полностью автономна, не требует Node.js на сервере и готова к раздаче через любой CDN или веб-сервер (Nginx, Caddy, Apache).

Для проверки собранной версии локально:
```bash
npm run preview
```

---

## 🌐 6. Как разместить сайт на Cloudflare Pages (Бесплатно)

Сайт идеально подходит для бесплатного хостинга на **Cloudflare Pages** с высокой скоростью и встроенной защитой от DDoS:

### Способ 1: Через GitHub репозиторий (Рекомендуется)
1. Создайте репозиторий на GitHub и загрузите в него проект:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for XLG"
   git remote add origin https://github.com/ВАШ_АККАУНТ/xlg-site.git
   git push -u origin main
   ```
2. Зайдите в панель [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → вкладка **Pages**.
3. Нажмите **Connect to Git** и выберите репозиторий `xlg-site`.
4. В настройках сборки (**Build settings**) укажите:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Нажмите **Save and Deploy**. Через ~1 минуту сайт будет доступен на быстром домене `*.pages.dev`.
6. Во вкладке **Custom domains** можно в 1 клик привязать собственный домен (например, `xlg.kz`).

### Способ 2: Прямая загрузка через Wrangler CLI
```bash
npx wrangler pages deploy dist --project-name=xlg-website
```

---

## 🛡️ Особенности архитектуры

- **Zero-backend зависимость:** Заявки передаются напрямую через WhatsApp API протокол, исключая затраты на серверную базу данных.
- **Mobile First:** Все кнопки и формы протестированы на смартфонах и планшетах.
- **SEO & OpenGraph:** В `index.html` прописаны метатеги, адаптивный viewport и шрифты.
- **High Performance:** Минимальный бандл без тяжелых неиспользуемых библиотек.
