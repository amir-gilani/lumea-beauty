import { Icon } from '../components/ui/Icon';
import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { CATEGORIES, PRODUCTS, ARTICLES } from '../data/mockData';

export const HomePage: React.FC = () => {
  const { setPath, addToCart, toggleWishlist, isInWishlist, openQuiz, showToast } = useStore();

  // Countdown timer for weekend campaign
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 38,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // 8 Specific categories shown in screen.png
  const categoriesList = [
    { id: '1', name: 'آرایش صورت', slug: 'face-makeup', icon: 'face' },
    { id: '2', name: 'آرایش چشم', slug: 'eye-makeup', icon: 'visibility' },
    { id: '3', name: 'آرایش لب', slug: 'lip-makeup', icon: 'favorite' },
    { id: '4', name: 'مراقبت پوست', slug: 'skincare', icon: 'water_drop' },
    { id: '5', name: 'مراقبت مو', slug: 'haircare', icon: 'flare' },
    { id: '6', name: 'عطر و ادکلن', slug: 'fragrance', icon: 'science' },
    { id: '7', name: 'ابزار آرایشی', slug: 'tools', icon: 'brush' },
    { id: '8', name: 'بهداشت و زیبایی', slug: 'hygiene', icon: 'spa' },
  ];

  // 4 Top popular products shown in screen.png
  const popularProducts = [
    {
      id: 'ordinary-hyaluronic-acid',
      name: 'سرم آبرسان عمیق هیالورونیک ۲٪ + B5',
      brand: 'LUMÉA PARIS',
      price: 785000,
      originalPrice: 920000,
      rating: 5.0,
      reviewCount: 128,
      badge: 'پرفروش',
      badgeColor: 'bg-[#884c5e] text-white',
      image: '/images/products/ordinary-hyaluronic.jpg',
    },
    {
      id: 'lumea-caviar-cream',
      name: 'کرم ضدپیری و سفت‌کننده خاویار طلایی',
      brand: 'LUMÉA SUBLIME',
      price: 1450000,
      originalPrice: 1850000,
      rating: 5.0,
      reviewCount: 94,
      badge: 'تخفیف ویژه ۲۳٪',
      badgeColor: 'bg-[#e9a0b3] text-[#6b3545]',
      image: '/images/products/lumea-caviar-cream.jpg',
    },
    {
      id: 'rare-beauty-soft-pinch',
      name: 'رژ لب ساتین مات شماره ۱۰۲ رز نود',
      brand: 'RARE BEAUTY',
      price: 590000,
      rating: 4.8,
      reviewCount: 210,
      badge: 'انتخاب ادیتور',
      badgeColor: 'bg-[#ffddb1] text-[#5a421e]',
      image: '/images/products/rare-beauty-lipstick.jpg',
    },
    {
      id: 'ordinary-hair-serum',
      name: 'روغن ترمیم‌کننده موهای آسیب‌دیده',
      brand: 'THE ORDINARY',
      price: 395000,
      originalPrice: 450000,
      rating: 4.7,
      reviewCount: 86,
      badge: 'جدید',
      badgeColor: 'bg-[#884c5e] text-white',
      image: '/images/products/ordinary-hair-serum.jpg',
    },
  ];

  // 6 Skin need cards shown in screen.png
  const skinNeeds = [
    {
      title: 'پوست خشک و کم‌آب',
      icon: 'water_drop',
      description: 'تغذیه عمیق سلولی، بازسازی سد دفاعی و جلوگیری از پوسته‌پوسته شدن با سرم‌های سرامید و روغن جوجوبا.',
      count: 24,
    },
    {
      title: 'پوست چرب و مختلط',
      icon: 'flare',
      description: 'کنترل ترشح چربی و براقیت ناخواسته، جمع‌کننده منافذ با سالیسیلیک اسید و نیاسینامید ملایم.',
      count: 31,
    },
    {
      title: 'پوست حساس و مستعد قرمزی',
      icon: 'spa',
      description: 'التیام‌بخش فوری، فاقد الکل و پارابن و اسانس‌های مصنوعی جهت تسکین التهابات روزانه.',
      count: 18,
    },
    {
      title: 'آبرسانی و رفع کدر بودن',
      icon: 'sunny',
      description: 'ایجاد درخشش طبیعی، شبنم‌گونه (Dewy) و شاداب به کمک ویتامین C پایدار و آنتی‌اکسیدان‌ها.',
      count: 19,
    },
    {
      title: 'ضدجوش و لک‌های قدیمی',
      icon: 'center_focus_strong',
      description: 'پاکسازی عمقی منافذ، رفع تیرگی جای جوش و یکدست‌کننده رنگ پوست با آلفا آربوتین و اسید آزالائیک.',
      count: 27,
    },
    {
      title: 'ضدآفتاب و محافظت شهری',
      icon: 'shield',
      description: 'فلوئیدهای نامرئی با SPF50 بدون رد سفیدی، ضد آلودگی هوا و نور آبی نمایشگرها با بافت سبک.',
      count: 22,
    },
  ];

  // 8 Brands in screen.png
  const brandsList = [
    'DIOR',
    'CHANEL',
    '.The Ordinary',
    'CeraVe',
    'Rare Beauty',
    'NARS',
    'Charlotte Tilbury',
    "L'ORÉAL",
  ];

  // 3 New Arrivals shown in screen.png
  const newArrivals = [
    {
      id: 'new-1',
      title: 'لب‌گلاس شاین درخشان لومیا',
      price: 420000,
      tag1: 'بافت ابریشمی تازه',
      tag2: 'حاوی روغن جوجوبا',
      image: '/images/products/lip-gloss-shine.jpg',
    },
    {
      id: 'new-2',
      title: 'میست آبرسان آلوئه‌ورا و گل رز',
      price: 360000,
      tag1: 'آرامش‌بخش روزانه',
      tag2: 'مناسب داخل کیف',
      image: '/images/products/mist-aloe-rose.jpg',
    },
    {
      id: 'new-3',
      title: 'براش دوطرفه کرم‌پودر و کانتور',
      price: 280000,
      tag1: 'الیاف وگان نرم',
      tag2: 'بخش یکنواخت و حرفه‌ای',
      image: '/images/products/dual-contour-brush.jpg',
    },
  ];

  // 4 Magazine Articles shown in screen.png
  const articlesList = [
    {
      id: 'art-1',
      badge: 'راهنمای پایه',
      readTime: 'خواندن در ۵ دقیقه',
      title: 'چطور روتین پوستی مناسب خودمان را پیدا کنیم؟',
      excerpt: 'راهنمای گام‌به‌گام تعیین دقیق تیپ پوستی، چیدمان صبح و شب محصولات و پرهیز از...',
      image: '/images/articles/article-skincare-routine.jpg',
    },
    {
      id: 'art-2',
      badge: 'سلامت',
      readTime: 'خواندن در ۶ دقیقه',
      title: '۵ اشتباه رایج در مراقبت از پوست که مانع شادابی می‌شوند',
      excerpt: 'از لایه‌برداری بیش از حد گرفته تا شست‌وشو با آب داغ؛ چه عواملی سد دفاعی پوستت...',
      image: '/images/articles/article-skincare-mistakes.jpg',
    },
    {
      id: 'art-3',
      badge: 'آرایش و مد',
      readTime: 'خواندن در ۴ دقیقه',
      title: 'چطور رنگ مناسب رژ لب را با توجه به تناژ پوست انتخاب کنیم؟',
      excerpt: 'تفاوت آندرتون گرم، سرد و خنثی؛ و راهکارهای ساده برای پیدا کردن رژ لب نود...',
      image: '/images/articles/article-lipstick-shades.jpg',
    },
    {
      id: 'art-4',
      badge: 'تاثیر آفتاب',
      readTime: 'خواندن در ۳ دقیقه',
      title: 'محافظت از پوست در برابر آفتاب و نور آبی صفحه نمایش',
      excerpt: 'آیا نور مانیتور و گوشی واقعاً باعث پیری زودرس می‌شود؟ بررسی آخرین پژوهش‌ها...',
      image: '/images/articles/article-sun-protection.jpg',
    },
  ];

  // 3 Customer Reviews in screen.png
  const customerReviews = [
    {
      author: 'سارا محمدی',
      location: 'خریدار تایید شده • تهران',
      initials: 'س م',
      avatarBg: 'bg-[#ffd9e1] text-[#6b3545]',
      text: '«سرم آبرسان لومیا واقعاً فراتر از انتظارم بود. پوستم همیشه در فصل پاییز کدر و خشک می‌شد اما از وقتی به توصیه‌ی مشاوره آنلاین لومیا استفاده کردم شادابی و درخشش فوق‌العاده‌ای پیدا کرده.»',
    },
    {
      author: 'نیلوفر پروانه',
      location: 'خریدار تایید شده • اصفهان',
      initials: 'ن پ',
      avatarBg: 'bg-[#fcecee] text-[#884c5e]',
      text: '«بسته‌بندی محصول مثل هدیه‌ای از یک بوتیک پاریسی بود! بوی گل رز داخل جعبه و سلامت کامل کالاها نشون میده چقدر به مشتری احترام می‌گذارید. حتماً خریدهای بعدیم هم از لومیاست.»',
    },
    {
      author: 'مهسا عباسی',
      location: 'خریدار تایید شده • تبریز',
      initials: 'م ع',
      avatarBg: 'bg-[#ffd9e1] text-[#6b3545]',
      text: '«همیشه نگران اصالت محصولات برند اوردینری بودم چون نمونه‌های تقلبی زیادی تو بازار هست. با استعلام بارکد و بچ‌کد محصول خریده شده از لومیا خیالم کاملاً راحت شد، ممنون از صداقتتون.»',
    },
  ];

  // 6 FAQs in screen.png
  const homeFaqs = [
    {
      q: 'چگونه می‌توانم از اصالت محصولات در لومیا مطمئن شوم؟',
      a: 'تمامی محصولات لومیا دارای برچسب اصالت، بچ‌کد معتبر جهانی و فاکتور رسمی هستند و به صورت مستقیم از دفاتر رسمی برندها در فرانسه، کانادا و انگلستان تامین می‌شوند.',
    },
    {
      q: 'مدت زمان ارسال سفارش‌ها در تهران و سایر شهرها چقدر است؟',
      a: 'در شهر تهران، سفارش‌ها در همان روز یا حداکثر ۲۴ ساعت آینده تحویل می‌شوند. برای سایر شهرها، ارسال از طریق پست پیشتاز طی ۲ تا ۳ روز کاری انجام می‌پذیرد.',
    },
    {
      q: 'شرایط بازگرداندن کالا (مرجوعی) به چه صورت است؟',
      a: 'در صورتی که پلمپ کالا باز نشده باشد یا محصول با مشخصات سایت مغایرت داشته باشد، تا ۷ روز ضمانت بازگشت بی‌قید و شرط وجود دارد.',
    },
    {
      q: 'چگونه می‌توانم از مشاوره تخصصی رایگان لومیا استفاده کنم؟',
      a: 'می‌توانید با کلیک روی دکمه «آنالیز آنلاین پوست» در سایت فرم تست را پر کنید یا از طریق چت آنلاین و خط ویژه تلفنی با بیوتی‌تراپیست‌های ما گفتگو نمایید.',
    },
    {
      q: 'آیا ارسال سفارش‌ها رایگان است؟',
      a: 'بله، برای تمامی سفارش‌های بالای ۱,۰۰۰,۰۰۰ تومان در سراسر کشور، بسته‌بندی لوکس و ارسال با پست پیشتاز یا پیک کاملاً رایگان است.',
    },
    {
      q: 'چطور سفارش خود را پس از پرداخت رهگیری کنم؟',
      a: 'بلافاصله پس از ثبت سفارش، کد رهگیری پیامک می‌شود و با مراجعه به بخش «حساب کاربری > سفارش‌های من» می‌توانید روند ۵ مرحله‌ای آماده‌سازی و ارسال را مشاهده کنید.',
    },
  ];

  return (
    <div className="bg-[#fcf8f8] text-[#1b1c1d] pb-16 selection:bg-[#ffd9e1] selection:text-[#6b3545]">
      
      {/* ============================================================== */}
      {/* 1. HERO SECTION (EXACT LAYOUT FROM SCREEN.PNG)                 */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-[#fff5f6] rounded-[32px] p-6 sm:p-8 lg:p-12 border border-[#f5e3e6] shadow-[0_4px_30px_rgba(136,76,94,0.03)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Right Column: Editorial Text & CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start text-right space-y-4 lg:space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffe8ed] text-[#884c5e] text-xs font-semibold border border-[#ffd4de]">
                <Icon name="auto_awesome" className="text-[15px]" />
                <span>مجموعه جدید ۲۰۲۴ • انتخاب تخصصی بیوتی ادیتورها</span>
              </div>

              {/* Main Heading with Berry Accent */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1c1d] leading-[1.25] tracking-tight">
                زیبایی، با <span className="text-[#884c5e]">انتخاب درست</span> شروع می‌شود.
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm lg:text-base text-[#524345] leading-relaxed max-w-xl">
                محصولات محبوب آرایشی و مراقبت از پوست را با وسواسی متخصصان لومیا انتخاب کن، تا اطمینان کامل به کار آید و درخشش طبیعی روزمره‌ات را کامل‌تر از همیشه جشن بگیری.
              </p>

              {/* Two CTA Buttons */}
              <div className="flex items-center gap-3 pt-2 flex-wrap">
                <button
                  onClick={() => setPath('products')}
                  className="h-12 px-7 rounded-full bg-[#884c5e] text-white text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-[#723b4c] active:scale-95 transition-all shadow-md shadow-[#884c5e]/20 cursor-pointer"
                >
                  <span>مشاهده محصولات</span>
                  <Icon name="arrow_back" className="text-[18px]" />
                </button>

                <button
                  onClick={() => setPath('products')}
                  className="h-12 px-6 rounded-full bg-white text-[#1b1c1d] border border-[#e2d0d4] text-xs sm:text-sm font-bold flex items-center hover:bg-[#fff0f2] active:scale-95 transition-colors cursor-pointer"
                >
                  <span>محصولات جدید فصل</span>
                </button>
              </div>

              {/* 3 Trust Indicators */}
              <div className="flex items-center gap-6 sm:gap-8 pt-4 text-xs font-medium text-[#524345] border-t border-[#f2dede]/80 w-full flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Icon name="check_circle" className="text-emerald-600 text-[18px]" />
                  ۱۰۰٪ اصالت کالا
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="local_shipping" className="text-[#884c5e] text-[18px]" />
                  ارسال رایگان
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="support_agent" className="text-amber-600 text-[18px]" />
                  مشاوره تخصصی پوست
                </span>
              </div>
            </div>

            {/* Left Column: Luxury Skincare Showcase Image */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="/images/banners/hero-model-girl.png"
                  alt="کالکشن اختصاصی زیبایی لومیا"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-bold text-[#1b1c1d] shadow-sm border border-white">
                برنده جایزه زیبایی سال ۲۰۲۴
              </div>

              {/* Floating Bottom Card */}
              <div className="absolute -bottom-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#f2dede] flex items-center gap-3 max-w-[210px]">
                <div className="w-9 h-9 rounded-xl bg-[#ffe8ed] text-[#884c5e] flex items-center justify-center flex-shrink-0">
                  <Icon name="thumb_up" className="text-[20px]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1b1c1d]">سرم شب و کرم لوکس</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">۹۸٪ رضایت خریداران فعال</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. "دنبال چه چیزی هستی؟" CATEGORIES ROW                         */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1b1c1d]">دنبال چه چیزی هستی؟</h2>
          <p className="text-xs sm:text-sm text-[#765b61] mt-2">
            محبوب‌ترین دسته‌ها برای کشف آسان‌ترین مسیر به سمت شادابی پوست
          </p>
        </div>

        {/* 8 Categories in a single desktop row */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setPath('products', { categorySlug: cat.slug })}
              className="bg-white border border-[#f2dede] hover:border-[#884c5e] rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-center gap-2 group transition-all hover:shadow-md cursor-pointer aspect-square"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#fff2f4] group-hover:bg-[#ffe8ed] text-[#884c5e] flex items-center justify-center transition-colors">
                <Icon name={cat.icon} className="text-[22px] sm:text-[24px]" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-[#1b1c1d] group-hover:text-[#884c5e] transition-colors truncate w-full text-center">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. "محبوب‌ترین محصولات" (MOST POPULAR - 4 CARDS)               */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#884c5e] block mb-1">
              — منتخب بیوتی ادیتورها
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1b1c1d]">
              محبوب‌ترین محصولات
            </h2>
            <p className="text-xs text-[#765b61] mt-1">
              انتخاب‌هایی که بیشترین میزان رضایت و بازخورد مثبت خریداران لومیا را داشته‌اند.
            </p>
          </div>

          <button
            onClick={() => setPath('products')}
            className="text-xs font-bold text-[#884c5e] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>مشاهده همه محصولات</span>
            <Icon name="arrow_back" className="text-[16px]" />
          </button>
        </div>

        {/* 4 Cards in 4-columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-[#f2dede] overflow-hidden p-3.5 flex flex-col justify-between hover:border-[#884c5e] hover:shadow-[0_8px_25px_rgba(136,76,94,0.08)] transition-all group relative"
            >
              <div>
                {/* Image & Badges */}
                <div
                  onClick={() => setPath('product-detail', { productId: p.id })}
                  className="relative aspect-square rounded-xl bg-[#faf5f6] overflow-hidden mb-3 cursor-pointer flex items-center justify-center p-3"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  {p.badge && (
                    <span
                      className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-sm ${p.badgeColor}`}
                    >
                      {p.badge}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(p.id);
                    }}
                    className={`absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-white/90 shadow-sm flex items-center justify-center transition-colors ${
                      isInWishlist(p.id) ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'
                    }`}
                  >
                    <Icon name={isInWishlist(p.id) ? 'favorite' : 'favorite_border'} className="text-[16px]" />
                  </button>
                </div>

                {/* Brand & Title */}
                <span className="text-[10px] font-bold text-[#884c5e] uppercase tracking-wider block">
                  {p.brand}
                </span>
                <h3
                  onClick={() => setPath('product-detail', { productId: p.id })}
                  className="text-xs font-bold text-[#1b1c1d] mt-1 line-clamp-2 hover:text-[#884c5e] transition-colors cursor-pointer"
                >
                  {p.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1.5 text-xs text-amber-500 mt-2">
                  <div className="flex text-amber-400">
                    <Icon name="star" className="text-[16px]" />
                  </div>
                  <span className="font-bold text-[#1b1c1d] text-[11px]">{p.rating}</span>
                  <span className="text-gray-400 text-[10px]">({p.reviewCount} نظر)</span>
                </div>
              </div>

              {/* Price & Quick Add */}
              <div className="mt-4 pt-3 border-t border-[#f2dede]/70 flex items-center justify-between">
                <div>
                  <div className="text-xs font-extrabold text-[#1b1c1d]">
                    {p.price.toLocaleString('fa-IR')} <span className="font-normal text-[10px] text-gray-500">تومان</span>
                  </div>
                  {p.originalPrice && (
                    <div className="text-[10px] text-gray-400 line-through">
                      {p.originalPrice.toLocaleString('fa-IR')}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    const fullProd = PRODUCTS.find((x) => x.id === p.id) || PRODUCTS[0];
                    addToCart(fullProd);
                    showToast(`«${p.name}» به سبد خرید اضافه شد.`);
                  }}
                  className="w-9 h-9 rounded-full bg-[#ffe8ed] text-[#884c5e] hover:bg-[#884c5e] hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  title="افزودن به سبد خرید"
                >
                  <Icon name="shopping_bag" className="text-[18px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SPECIAL WEEKEND CAMPAIGN BANNER                             */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-[#ffe8ed] rounded-[32px] p-6 sm:p-10 lg:p-12 border border-[#fbd4dd] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Gift Box Image */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border-2 border-white bg-white">
                <img
                  src="/images/banners/gift-box-powder.jpg"
                  alt="گیفت باکس لومیا"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm text-xs font-bold text-[#884c5e] border border-[#f2dede]">
                <span className="block text-[10px] text-gray-400 font-normal">هدیه ویژه لومیا</span>
                پودر برنز طلایی
              </div>
            </div>

            {/* Right Column: Copy & Countdown */}
            <div className="lg:col-span-7 flex flex-col items-start text-right space-y-4 order-1 lg:order-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#884c5e] text-white">
                تخفیف محدود آخر هفته
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1c1d] leading-tight">
                وقتشه یه انتخاب تازه برای پوستت داشته باشی
              </h2>

              <p className="text-xs sm:text-sm text-[#524345] leading-relaxed max-w-lg">
                مجموعه‌ای از پرفروش‌ترین محصولات مراقبت و شادابی با تخفیف ویژه تا ۴۰٪ به همراه یک گیفت‌باکس لوکس.
              </p>

              {/* Countdown Timer */}
              <div className="flex items-center gap-2 pt-2" dir="ltr">
                <div className="bg-white rounded-xl px-3 py-2 shadow-sm text-center min-w-[55px]">
                  <span className="block font-bold text-base text-[#884c5e] font-mono">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-gray-500 font-sans">روز</span>
                </div>
                <span className="text-[#884c5e] font-bold">:</span>
                <div className="bg-white rounded-xl px-3 py-2 shadow-sm text-center min-w-[55px]">
                  <span className="block font-bold text-base text-[#884c5e] font-mono">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-gray-500 font-sans">ساعت</span>
                </div>
                <span className="text-[#884c5e] font-bold">:</span>
                <div className="bg-white rounded-xl px-3 py-2 shadow-sm text-center min-w-[55px]">
                  <span className="block font-bold text-base text-[#884c5e] font-mono">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-gray-500 font-sans">دقیقه</span>
                </div>
                <span className="text-[#884c5e] font-bold">:</span>
                <div className="bg-white rounded-xl px-3 py-2 shadow-sm text-center min-w-[55px]">
                  <span className="block font-bold text-base text-[#884c5e] font-mono">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] text-gray-500 font-sans">ثانیه</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setPath('products')}
                className="mt-3 h-12 px-8 rounded-full bg-[#884c5e] text-white text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-[#723b4c] active:scale-95 transition-all shadow-md shadow-[#884c5e]/20 cursor-pointer"
              >
                <span>مشاهده تخفیف‌ها و دریافت هدیه</span>
                <Icon name="arrow_back" className="text-[18px]" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. "برای نیاز پوستت انتخاب کن" (6 SKIN NEEDS)                 */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#884c5e] block mb-1">
            شخصی‌سازی شده برای پوست شما
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1b1c1d]">
            برای نیاز پوستت انتخاب کن
          </h2>
          <p className="text-xs text-[#765b61] mt-2 leading-relaxed">
            ما به جای سردرگمی میان صدها محصول، فرمولاسیون‌ها را بر اساس دغدغه واقعی پوستت دسته‌بندی کرده‌ایم.
          </p>
        </div>

        {/* 6 Cards in 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skinNeeds.map((need, idx) => (
            <div
              key={idx}
              onClick={() => setPath('products')}
              className="bg-white rounded-2xl p-6 border border-[#f2dede] hover:border-[#884c5e] transition-all hover:shadow-[0_4px_20px_rgba(136,76,94,0.06)] cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#fff2f4] text-[#884c5e] flex items-center justify-center mb-4 group-hover:bg-[#884c5e] group-hover:text-white transition-colors">
                  <Icon name={need.icon} className="text-[22px]" />
                </div>
                <h3 className="text-sm font-bold text-[#1b1c1d] group-hover:text-[#884c5e] transition-colors">
                  {need.title}
                </h3>
                <p className="text-xs text-[#524345] leading-relaxed mt-2">
                  {need.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#f2dede]/70 flex items-center justify-between text-xs text-[#884c5e] font-bold">
                <span>مشاهده {need.count} محصول مناسب</span>
                <Icon name="arrow_back" className="text-[16px] group-hover:-translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. BRANDS ROW                                                  */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-base sm:text-lg font-bold text-[#1b1c1d]">
            برندهای بین‌المللی با ضمانت اصالت ۱۰۰٪
          </h2>
          <button
            onClick={() => setPath('brands')}
            className="text-xs font-bold text-[#884c5e] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>مشاهده همه ۴۸ برند</span>
            <Icon name="arrow_back" className="text-[16px]" />
          </button>
        </div>

        {/* 8 Clean Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {brandsList.map((brand, idx) => (
            <button
              key={idx}
              onClick={() => setPath('brands')}
              className="h-14 rounded-2xl bg-white border border-[#f2dede] hover:border-[#884c5e] flex items-center justify-center p-3 text-xs sm:text-sm font-bold text-[#1b1c1d] hover:text-[#884c5e] transition-all shadow-xs hover:shadow-sm cursor-pointer"
            >
              {brand}
            </button>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. "تازه‌واردهای لومیا" (NEW ARRIVALS - 3 CARDS)               */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-[#884c5e] block mb-1">
              مجموعه پاییز و زمستان ۲۰۲۴
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1b1c1d]">
              تازه‌واردهای لومیا
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('صفحه قبل')}
              className="w-9 h-9 rounded-full border border-[#f2dede] bg-white text-[#524345] hover:text-[#884c5e] flex items-center justify-center cursor-pointer"
            >
              <Icon name="chevron_right" className="text-[18px]" />
            </button>
            <button
              onClick={() => showToast('صفحه بعد')}
              className="w-9 h-9 rounded-full border border-[#f2dede] bg-white text-[#524345] hover:text-[#884c5e] flex items-center justify-center cursor-pointer"
            >
              <Icon name="chevron_left" className="text-[18px]" />
            </button>
          </div>
        </div>

        {/* 3 Horizontal Mini Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newArrivals.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#f2dede] p-4 flex items-center gap-4 hover:border-[#884c5e] transition-all hover:shadow-md cursor-pointer"
            >
              <div className="w-20 h-20 rounded-xl bg-[#faf5f6] overflow-hidden flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-gray-500 block truncate">{item.tag1}</span>
                <h3 className="text-xs font-bold text-[#1b1c1d] truncate mt-0.5">{item.title}</h3>
                <span className="text-xs font-extrabold text-[#884c5e] block mt-1 font-mono">
                  {item.price.toLocaleString('fa-IR')} تومان
                </span>

                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="text-gray-400">{item.tag2}</span>
                  <button
                    onClick={() => {
                      showToast(`«${item.title}» به سبد خرید اضافه شد.`);
                    }}
                    className="text-[#884c5e] font-bold hover:underline"
                  >
                    خرید سریع
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. "مجله تخصصی زیبایی لومیا" (MAGAZINE ARTICLES)               */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#884c5e] block mb-1">
              دانستنی‌ها و ترندها
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1b1c1d]">
              مجله تخصصی زیبایی لومیا
            </h2>
            <p className="text-xs text-[#765b61] mt-1">
              مقالاتی خواندنی از معتبرترین متخصصان پوست و میک‌آپ آرتیست‌های پیشرو.
            </p>
          </div>

          <button
            onClick={() => showToast('صفحه مقالات مجله باز شد.')}
            className="text-xs font-bold text-[#884c5e] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>ورود به مجله زیبایی</span>
            <Icon name="arrow_back" className="text-[16px]" />
          </button>
        </div>

        {/* 4 Columns Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articlesList.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl border border-[#f2dede] overflow-hidden flex flex-col justify-between hover:border-[#884c5e] transition-all hover:shadow-md cursor-pointer group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-[#1b1c1d] shadow-sm">
                    {art.badge}
                  </span>
                </div>

                <div className="p-4">
                  <span className="text-[10px] text-gray-400 flex items-center gap-1 mb-2">
                    <Icon name="schedule" className="text-[14px]" />
                    {art.readTime}
                  </span>
                  <h3 className="text-xs font-bold text-[#1b1c1d] leading-snug group-hover:text-[#884c5e] transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-[11px] text-[#524345] line-clamp-2 mt-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <span className="text-xs font-bold text-[#884c5e] flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
                  ادامه مطلب
                  <Icon name="arrow_back" className="text-[14px]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. 4 TRUST GUARANTEE BOXES                                     */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white rounded-2xl p-5 border border-[#f2dede] flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#fff2f4] text-[#884c5e] flex items-center justify-center flex-shrink-0">
              <Icon name="verified" className="text-[20px]" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1b1c1d]">ضمانت ۱۰۰٪ اصالت</h3>
              <p className="text-[11px] text-[#524345] leading-relaxed mt-1">
                تأمین مستقیم از معتبرترین نمایندگی‌های بین‌المللی با فاکتور رسمی.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#f2dede] flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#fff2f4] text-[#884c5e] flex items-center justify-center flex-shrink-0">
              <Icon name="inventory_2" className="text-[20px]" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1b1c1d]">بسته‌بندی امن و اکسپرس</h3>
              <p className="text-[11px] text-[#524345] leading-relaxed mt-1">
                بسته‌بندی اختصاصی با عطر ملایم و بالشتک‌های محافظ ضدضربه برای سفارشات.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#f2dede] flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#fff2f4] text-[#884c5e] flex items-center justify-center flex-shrink-0">
              <Icon name="support_agent" className="text-[20px]" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1b1c1d]">مشاوره تخصصی آنلاین</h3>
              <p className="text-[11px] text-[#524345] leading-relaxed mt-1">
                پاسخگویی تیم مشاوران پوست و مو برای انتخاب دقیق‌ترین محصول متناسب با شما.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#f2dede] flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#fff2f4] text-[#884c5e] flex items-center justify-center flex-shrink-0">
              <Icon name="replay" className="text-[20px]" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1b1c1d]">۷ روز ضمانت بازگشت</h3>
              <p className="text-[11px] text-[#524345] leading-relaxed mt-1">
                امکان مرجوعی کالا در صورت عدم باز شدن پلمپ، با هماهنگی سریع پشتیبانی.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. "نظر مشتری‌های لومیا" (CUSTOMER REVIEWS - 3 CARDS)          */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#884c5e] block mb-1">
            تجربه مشتریان حقیقی
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1b1c1d]">
            نظر مشتری‌های لومیا
          </h2>
          <p className="text-xs text-[#765b61] mt-2">
            شنیدن احساس خریداران پس از استفاده از محصولات، بزرگ‌ترین افتخار ماست.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customerReviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#f2dede] shadow-[0_2px_12px_rgba(136,76,94,0.03)] flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Icon name="star" key={i} className="text-[18px]" />
                  ))}
                </div>
                <p className="text-xs text-[#524345] leading-relaxed italic">
                  {rev.text}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f2dede]/70 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${rev.avatarBg} flex items-center justify-center font-bold text-xs flex-shrink-0`}>
                  {rev.initials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1b1c1d]">{rev.author}</h4>
                  <span className="text-[10px] text-gray-400">{rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 11. "سوالی درباره خرید داری؟" (FAQ ACCORDION)                  */}
      {/* ============================================================== */}
      <section className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-[#884c5e] block mb-1">
            پاسخ به سوالات پر تکرار
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1b1c1d]">
            سوالی درباره خرید داری؟
          </h2>
          <p className="text-xs text-[#765b61] mt-2">
            اگر پاسخ مورد نظرت را پیدا نکردی، تیم پشتیبانی ما به صورت ۲۴ ساعته در خدمت شماست.
          </p>
        </div>

        <div className="space-y-3">
          {homeFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#f2dede] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 hover:bg-[#fffbfc] transition-colors cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-[#1b1c1d]">
                    {faq.q}
                  </span>
                  <Icon name="keyboard_arrow_down" className={`text-[#884c5e] text-[20px] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`} />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-[#524345] leading-relaxed border-t border-[#f2dede]/60 bg-[#fffbfc]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 12. NEWSLETTER BANNER (زیبایی رو از دست نده!)                  */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-[#fff2f4] rounded-[32px] p-8 sm:p-12 text-center border border-[#fbd4dd] max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-white text-[#884c5e] flex items-center justify-center mx-auto mb-4 shadow-xs">
            <Icon name="mail" className="text-[24px]" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#1b1c1d]">
            زیبایی رو از دست نده!
          </h2>

          <p className="text-xs sm:text-sm text-[#524345] max-w-lg mx-auto mt-2 leading-relaxed">
            با عضویت در باشگاه وفاداری لومیا، ۱۰٪ تخفیف اولین خرید دریافت کنید و پیش از دیگران از موجود شدن محصولات خاص و رونمایی‌های فصل باخبر شوید.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              showToast('عضویت شما در باشگاه لومیا با موفقیت ثبت شد!');
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto mt-6"
          >
            <input
              type="text"
              required
              placeholder="آدرس ایمیل یا شماره موبایل شما..."
              className="w-full sm:flex-1 h-12 px-4 rounded-full bg-white border border-[#f2dede] text-xs focus:outline-none focus:ring-2 focus:ring-[#884c5e]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto h-12 px-6 rounded-full bg-[#884c5e] text-white text-xs font-bold hover:bg-[#723b4c] transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              عضویت در باشگاه
            </button>
          </form>

          <span className="text-[10px] text-gray-400 block mt-3">
            ما به حریم خصوصی شما احترام می‌گذاریم؛ بدون پیام‌های اسپم یا تکراری.
          </span>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 13. BOTTOM BOUTIQUE EXPERIENCE CTA BANNER                     */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-serif italic text-[#884c5e] tracking-widest block uppercase">
            LUMÉA Boutique Experience
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1b1c1d]">
            انتخاب بعدی تو منتظرته
          </h2>
          <p className="text-xs sm:text-sm text-[#524345] leading-relaxed">
            محصولات مورد علاقه‌ات را از میان دست‌چین‌های باکیفیت پیدا کن و از تجربه خریدی لوکس، آرام و سرشار از اطمینان لذت ببر.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
            <button
              onClick={() => setPath('products')}
              className="h-12 px-7 rounded-full bg-[#1b1c1d] text-white text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-[#884c5e] active:scale-95 transition-colors cursor-pointer"
            >
              <span>مشاهده تمام محصولات لومیا</span>
              <Icon name="arrow_back" className="text-[18px]" />
            </button>
            <button
              onClick={() => openQuiz()}
              className="h-12 px-6 rounded-full bg-white text-[#1b1c1d] border border-[#d6c2c5] text-xs sm:text-sm font-bold hover:bg-[#fff0f2] active:scale-95 transition-colors cursor-pointer"
            >
              گفتگو با مشاور پوست
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
