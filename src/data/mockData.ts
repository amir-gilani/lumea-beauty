import { Product, Category, Article, Order } from '../types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'آرایش صورت', slug: 'face-makeup', icon: 'face', itemCount: 35, image: '/images/categories/cat-face-makeup.png' },
  { id: '2', name: 'آرایش چشم', slug: 'eye-makeup', icon: 'visibility', itemCount: 28, image: '/images/categories/cat-eye-makeup.png' },
  { id: '3', name: 'آرایش لب', slug: 'lip-makeup', icon: 'brush', itemCount: 30, image: '/images/categories/cat-lip-makeup.png' },
  { id: '4', name: 'مراقبت پوست', slug: 'skincare', icon: 'clean_hands', itemCount: 42, image: '/images/categories/cat-skincare.png' },
  { id: '5', name: 'مراقبت مو', slug: 'haircare', icon: 'spa', itemCount: 19, image: '/images/categories/cat-haircare.png' },
  { id: '6', name: 'عطر و ادکلن', slug: 'fragrance', icon: 'local_florist', itemCount: 18, image: '/images/categories/cat-fragrance.png' },
  { id: '7', name: 'ابزار آرایشی', slug: 'tools', icon: 'format_paint', itemCount: 14, image: '/images/categories/cat-tools.png' },
  { id: '8', name: 'بهداشت و زیبایی', slug: 'wellness', icon: 'sanitizer', itemCount: 22, image: '/images/categories/cat-wellness.png' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'ordinary-hyaluronic-acid',
    name: 'سرم آبرسان عمیق هیالورونیک اسید ۲٪ + B5 دی اوردینری',
    nameEn: 'The Ordinary Hyaluronic Acid 2% + B5 Hydrating Serum - 30ml',
    brand: 'The Ordinary',
    brandEn: 'The Ordinary',
    category: 'مراقبت پوست',
    categorySlug: 'skincare',
    price: 840000,
    originalPrice: 1100000,
    discountPercent: 24,
    code: 'LUM-9812',
    batchCode: 'CAN-89210-ORD',
    image: '/images/products/ordinary-serum-box.png',
    images: [
      '/images/products/ordinary-serum-box.png',
      '/images/products/ordinary-hyaluronic.jpg',
      '/images/products/ordinary-texture.jpg',
      '/images/products/ordinary-dropper.jpg',
    ],
    rating: 4.9,
    reviewCount: 310,
    badge: 'پرفروش‌ترین آبرسان ۲۰۲۵',
    badgeType: 'secondary',
    description: 'سرم هیالورونیک اسید ۲٪ دی اوردینری با ۳ وزن مولکولی برای آبرسانی عمیق سلول‌های اپیدرم و ویتامین B5 جهت تقویت سد دفاعی پوست.',
    shortDescription: 'آبرسانی چندلایه‌ای با وزن‌های مولکولی ۳گانه و ویتامین B5 بدون چسبندگی.',
    features: [
      'آبرسانی چندلایه با سه وزن مولکولی HA',
      'تقویت سد دفاعی پوست با پرو-ویتامین B5',
      'مناسب انواع تیپ‌های پوستی حتی چرب و حساس',
      'وگان، بدون الکل، عطر و پارابن'
    ],
    inStock: true,
    volumeOptions: [
      { volume: 30, label: '۳۰ میلی‌لیتر (سایز استاندارد)', price: 840000, savings: 260000 },
      { volume: 60, label: '۶۰ میلی‌لیتر (ارزش خرید بالا)', price: 1420000, savings: 480000 }
    ],
    skinTypes: ['خشک و کم‌آب', 'مختلط', 'چرب و مستعد آکنه', 'حساس و قرمز', 'نرمال'],
    isCrueltyFree: true,
    isOilFree: true,
    isAlcoholFree: true,
    originCountry: 'کانادا'
  },
  {
    id: 'rare-beauty-soft-pinch',
    name: 'رژگونه مایع سافت پینچ ریر بیوتی (Rare Beauty Soft Pinch)',
    nameEn: 'Rare Beauty Soft Pinch Liquid Blush - Joy / Hope',
    brand: 'Rare Beauty',
    brandEn: 'Rare Beauty',
    category: 'آرایش صورت',
    categorySlug: 'face-makeup',
    price: 1450000,
    originalPrice: 1780000,
    discountPercent: 18,
    code: 'LUM-4420',
    batchCode: 'RB-9844-USA',
    image: '/images/products/rare-beauty-blush.png',
    images: [
      '/images/products/rare-beauty-blush.png',
      '/images/products/dual-contour-brush.jpg'
    ],
    rating: 4.9,
    reviewCount: 320,
    badge: 'پرفروش‌ترین ماه',
    badgeType: 'secondary',
    description: 'رژگونه مایع فوق‌العاده با رنگدانه غنی و ماندگاری ۱۲ ساعته با فینیش مخملی و طبیعی.',
    shortDescription: 'رنگ‌بندی Joy (هلویی درخشان) و Hope | بافت مایع با فید یکنواخت.',
    features: ['بافت سبک و بدون چربی', 'ماندگاری ۱۲ ساعته', 'فاقد تست حیوانی', 'فینیش طبیعی و مخملی'],
    inStock: true,
    skinTypes: ['مختلط', 'خشک و کم‌آب', 'نرمال'],
    isCrueltyFree: true,
    originCountry: 'آمریکا'
  },
  {
    id: 'charlotte-tilbury-magic-cream',
    name: 'کرم مرطوب‌کننده معجزه‌آسا مجیک کرم شارلوت تیلبری',
    nameEn: 'Charlotte Tilbury Magic Cream Face Moisturizer - 50ml',
    brand: 'Charlotte Tilbury',
    brandEn: 'Charlotte Tilbury',
    category: 'مراقبت پوست',
    categorySlug: 'skincare',
    price: 3290000,
    originalPrice: 4200000,
    discountPercent: 21,
    code: 'LUM-3011',
    batchCode: 'CT-7049B',
    image: '/images/products/charlotte-magic-cream.png',
    images: [
      '/images/products/charlotte-magic-cream.png'
    ],
    rating: 5.0,
    reviewCount: 180,
    badge: 'لاکچری آرایشی',
    badgeType: 'tertiary',
    description: 'کرم معجزه‌آسا شارلوت تیلبری حاوی کمپلکس پپتیدی و اسید هیالورونیک برای احیای فوری پوست کدر و پرکننده خطوط ریز.',
    shortDescription: 'حجم: ۵۰ میلی‌لیتر | زیرساز و آبرسان قوی با فرمول پپتید انگلستان.',
    features: ['تحول ۲۸ روزه پوست کدر', 'حاوی پپتید بیونیک و هیالورونیک', 'بهترین پرایمر زیر کرم پودر', 'آبرسانی عمیق'],
    inStock: true,
    skinTypes: ['خشک و کم‌آب', 'نرمال', 'حساس و قرمز'],
    originCountry: 'انگلستان'
  },
  {
    id: 'dior-rouge-satin-lipstick',
    name: 'رژ لب مخملی ساتین دیور رژ ۹۹۹ (Dior Rouge)',
    nameEn: 'Rouge Dior Satin Lipstick - Code 999 Velvet Finish',
    brand: 'DIOR',
    brandEn: 'Dior Beauté',
    category: 'آرایش لب',
    categorySlug: 'lip-makeup',
    price: 1500000,
    originalPrice: 2400000,
    discountPercent: 37,
    code: 'LUM-7619',
    batchCode: 'CD-999-FR',
    image: '/images/products/dior-rouge-lipstick.png',
    images: [
      '/images/products/dior-rouge-lipstick.png'
    ],
    rating: 4.9,
    reviewCount: 98,
    badge: 'اورجینال فرانسه',
    badgeType: 'tertiary',
    description: 'رژ لب افسانه‌ای دیور کد ۹۹۹ با فینیش مخملی و عصاره انار و گل صدتومانی با ماندگاری ۱۶ ساعته.',
    shortDescription: 'رژ لب جامد ساتین دیور ۹۹۹ | رنگ نمادین قرمز مخملی پاریس.',
    features: ['عصاره طبیعی گل صدتومانی', 'ماندگاری ۱۶ ساعته', 'بافت کرمی و ساتین', 'فاقد سرب و فلزات سنگین'],
    inStock: true,
    skinTypes: ['نرمال', 'خشک و کم‌آب'],
    originCountry: 'فرانسه'
  },
  {
    id: 'ordinary-niacinamide-zinc',
    name: 'سرم نیاسینامید ۱۰٪ + زینک ۱٪ دی اوردینری',
    nameEn: 'The Ordinary Niacinamide 10% + Zinc 1% - 30ml',
    brand: 'The Ordinary',
    brandEn: 'The Ordinary',
    category: 'مراقبت پوست',
    categorySlug: 'skincare',
    price: 600000,
    originalPrice: 890000,
    discountPercent: 32,
    code: 'LUM-1044',
    batchCode: 'CAN-7810-ORD',
    image: '/images/products/ordinary-niacinamide.png',
    images: [
      '/images/products/ordinary-niacinamide.png'
    ],
    rating: 4.9,
    reviewCount: 514,
    badge: 'کنترل چربی و منافذ',
    badgeType: 'primary',
    description: 'سرم تغلیظ‌شده نیاسینامید و زینک برای کنترل ترشح سبوم، بستن منافذ باز و روشن‌سازی لک‌های حاصل از جای جوش.',
    shortDescription: 'تنگ‌کننده منافذ باز پوست و کاهش جای جوش و لک‌های قدیمی.',
    features: ['۱۰٪ نیاسینامید خالص', '۱٪ زینک PCA ضد التهاب', 'کوچک‌کننده مشهود منافذ', 'فاقد الکل و روغن'],
    inStock: true,
    skinTypes: ['چرب و مستعد آکنه', 'مختلط'],
    isCrueltyFree: true,
    isOilFree: true,
    originCountry: 'کانادا'
  },
  {
    id: 'nars-light-reflecting-foundation',
    name: 'کرم‌پودر لایت رفلکتینگ نارس (NARS Light Reflecting)',
    nameEn: 'NARS Light Reflecting Advanced Skincare Foundation',
    brand: 'NARS',
    brandEn: 'NARS',
    category: 'آرایش صورت',
    categorySlug: 'face-makeup',
    price: 2350000,
    originalPrice: 2700000,
    discountPercent: 13,
    code: 'LUM-8819',
    batchCode: 'NARS-7721-USA',
    image: '/images/products/nars-radiant-creamy-concealer.png',
    images: [
      '/images/products/nars-radiant-creamy-concealer.png',
      '/images/products/nars-lipstick.jpg',
    ],
    rating: 4.8,
    reviewCount: 231,
    badge: 'پرفروش جهانی',
    badgeType: 'secondary',
    description: 'کرم پودر انقلابی با ۷۰٪ پایه مواد مغذی مراقبت پوستی، اثر بازتاب نور و پوشانندگی یکدست بدون حس سنگینی.',
    shortDescription: '۷۰٪ پایه مراقبت از پوست، محوکننده قوی منافذ و کاور مخملی.',
    features: ['فناوری بازتاب نور لایت رفلکتینگ', 'پوشش خطوط ریز و لک‌ها', 'بافت سبک و تنفس‌پذیر', 'مناسب عکاسی'],
    inStock: true,
    skinTypes: ['مختلط', 'خشک و کم‌آب', 'نرمال'],
    originCountry: 'آمریکا'
  },
  {
    id: 'lumea-sublime-caviar-serum',
    name: 'سرم درخشان‌کننده رادیانس خاویار و گل سرخ لومیا سوبلیم',
    nameEn: 'LUMÉA Sublime Caviar & Rose Radiance Serum',
    brand: 'LUMÉA Sublime',
    brandEn: 'LUMÉA Sublime',
    category: 'مراقبت پوست',
    categorySlug: 'skincare',
    price: 1560000,
    originalPrice: 1950000,
    discountPercent: 20,
    code: 'LUM-1100',
    batchCode: 'LUM-FR-502',
    image: '/images/products/lumea-caviar-cream.jpg',
    images: [
      '/images/products/lumea-caviar-cream.jpg',
      '/images/products/lumea-hero-cosmetics.jpg',
    ],
    rating: 4.9,
    reviewCount: 142,
    badge: 'پرفروش سال',
    badgeType: 'primary',
    description: 'فرمولاسیون اختصاصی لومیا پاریس با عصاره خاویار و گل سرخ فرانسوی برای درخشش آنی و رفع کدورت پوست.',
    shortDescription: 'آبرسانی سلولی عمیق، شفاف‌کننده آنی و رفع لک‌های سطحی.',
    features: ['عصاره خاویار و اسیدهای آمینه', 'عصاره ارگانیک گل سرخ', 'روشن‌کننده آنی', 'جذب زیر ۳۰ ثانیه'],
    inStock: true,
    skinTypes: ['خشک و کم‌آب', 'کدر و خسته', 'نرمال'],
    originCountry: 'فرانسه'
  },
  {
    id: 'cerave-moisturizing-cream',
    name: 'کرم مرطوب‌کننده و ترمیم‌کننده سد دفاعی سراوی (CeraVe)',
    nameEn: 'CeraVe Moisturizing Cream with 3 Essential Ceramides',
    brand: 'CeraVe',
    brandEn: 'CeraVe',
    category: 'مراقبت پوست',
    categorySlug: 'skincare',
    price: 990000,
    originalPrice: 1200000,
    discountPercent: 17,
    code: 'LUM-5088',
    batchCode: 'CRV-USA-341',
    image: '/images/products/cerave-hydrating-cleanser.png',
    images: [
      '/images/products/cerave-hydrating-cleanser.png'
    ],
    rating: 4.7,
    reviewCount: 420,
    badge: 'تایید درماتولوژی',
    badgeType: 'tertiary',
    description: 'کرم تخصصی سراوی حاوی ۳ سرامید ضروری (1, 3, 6-II) و اسید هیالورونیک با فناوری رهایش تدریجی MVE برای رطوبت‌رسانی ۲۴ ساعته.',
    shortDescription: 'حاوی ۳ سرامید ضروری و فناوری انتقال MVE جهت ترمیم سد دفاعی پوست.',
    features: ['فناوری رهایش تدریجی MVE', 'حاوی سرامیدهای ۱، ۳ و ۶-II', 'غیرکومدون‌زا و بدون عطر', 'مناسب پوست‌های حساس و اگزمایی'],
    inStock: true,
    skinTypes: ['خشک و کم‌آب', 'حساس و قرمز'],
    originCountry: 'آمریکا'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'glass-skin-secrets',
    title: '۵ راز داشتن پوستی شیشه‌ای و درخشان در آغاز فصل بهار',
    category: 'پوست شیشه‌ای',
    readTime: 'خواندن: ۵ دقیقه',
    date: '۲۸ فروردین',
    excerpt: 'بررسی علمی مراحل لایه‌برداری ملایم، استفاده صحیح از هیالورونیک اسید و مراقبت UV.',
    image: '/images/articles/article-skincare-routine.jpg'
  },
  {
    id: 'skin-undertone-guide',
    title: 'راهنمای جامع انتخاب کرم‌پودر بر اساس آندرتون پوست',
    category: 'میکاپ',
    readTime: 'خواندن: ۴ دقیقه',
    date: '۲۵ فروردین',
    excerpt: 'تفاوت ته‌رنگ‌های سرد، گرم و خنثی؛ تکنیک تست رگ مچ دست و نور طبیعی.',
    image: '/images/articles/article-lipstick-shades.jpg'
  },
  {
    id: 'skincare-ingredients-mixing',
    title: 'تداخل‌های دارویی پوستی: چه سرم‌هایی را نباید همزمان زد؟',
    category: 'مواد موثره',
    readTime: 'خواندن: ۶ دقیقه',
    date: '۲۰ فروردین',
    excerpt: 'بررسی ترکیب رتینول با AHA/BHA، زمان‌بندی استفاده ویتامین C و نیاسینامید.',
    image: '/images/articles/article-skincare-mistakes.jpg'
  },
  {
    id: 'niche-fragrance-trends',
    title: 'روایح گورمند و گلی: ترندهای عطر زنانه در سال جدید',
    category: 'عطر و رایحه',
    readTime: 'خواندن: ۳ دقیقه',
    date: '۱۵ فروردین',
    excerpt: 'نت‌های وانیل بوربون، شکوفه پرتقال و چوب صندل چگونه احساس آرامش خلق می‌کنند.',
    image: '/images/articles/article-fragrance-trends.jpg'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'LUM-2025-89412',
    trackingCode: 'LUM-2025-89412',
    rrn: 'TRX-982341097',
    date: '۲۴ بهمن ۱۴۰۳ - ۱۶:۴۵',
    totalAmount: 5580000,
    discountAmount: 1170000,
    status: 'processing',
    statusLabel: 'آماده‌سازی و بسته‌بندی در انبار اکسپرس',
    currentStep: 2,
    deliveryMethod: 'پیک ویژه اکسپرس لومیا (امروز)',
    deliveryEstimate: 'فردا پنج‌شنبه، ساعت ۱۴ الی ۱۸',
    recipient: {
      name: 'خانم فرناز کمالی',
      phone: '۰۹۱۲ - ۳۴۵ ۶۷۸۹',
      address: 'تهران، سعادت‌آباد، میدان کاج، بلوار سرو غربی، خیابان صدف، پلاک ۱۸، واحد ۴',
      postalCode: '۱۹۹۷۸۵۴۳۲۱'
    },
    items: [
      {
        product: PRODUCTS[0], // Ordinary HA
        quantity: 1,
        price: 840000
      },
      {
        product: PRODUCTS[1], // Rare Beauty Blush
        quantity: 1,
        price: 1450000
      },
      {
        product: PRODUCTS[2], // Charlotte Tilbury Magic Cream
        quantity: 1,
        price: 3290000
      }
    ],
    giftItem: {
      name: 'مینی سرم نیاسینامید ۱۰٪ + زینک ۱٪ دی اوردینری (۱۵ میل)',
      description: 'بسته‌بندی مسافرتی به همراه کیف آرایشی مخمل لومیا',
      originalPrice: 420000
    }
  },
  {
    id: 'ord-2',
    orderNumber: 'LUM-2025-76190',
    trackingCode: 'LUM-2025-76190',
    rrn: 'TRX-551982001',
    date: '۱۲ دی ۱۴۰۳ - ۱۱:۳۰',
    totalAmount: 2150000,
    discountAmount: 550000,
    status: 'delivered',
    statusLabel: 'تحویل‌شده موفق درب منزل',
    currentStep: 4,
    deliveryMethod: 'پست پیشتاز سراسری',
    deliveryEstimate: 'تحویل شده',
    recipient: {
      name: 'خانم فرناز کمالی',
      phone: '۰۹۱۲ - ۳۴۵ ۶۷۸۹',
      address: 'تهران، سعادت‌آباد، میدان کاج، بلوار سرو غربی، خیابان صدف، پلاک ۱۸، واحد ۴',
      postalCode: '۱۹۹۷۸۵۴۳۲۱'
    },
    items: [
      {
        product: PRODUCTS[3], // Dior Lipstick
        quantity: 1,
        price: 1550000
      },
      {
        product: PRODUCTS[4], // Ordinary Niacinamide
        quantity: 1,
        price: 600000
      }
    ]
  }
];
