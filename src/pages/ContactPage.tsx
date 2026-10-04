import React, { useState } from 'react';
import { Icon } from '../components/ui/Icon';
import { useStore } from '../store/useStore';

export const ContactPage: React.FC = () => {
  const { showToast, setPath } = useStore();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    subject: '',
    orderCode: '',
    skinTypeGoal: 'پوست خشک و دهیدراته',
    message: '',
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [clubInput, setClubInput] = useState('');

  const skinTypeGoals = [
    'پوست خشک و دهیدراته',
    'مستعد جوش و چرب',
    'حساس و دارای قرمزی',
    'جوان‌سازی و ضدچروک',
  ];

  const departmentExtensions = [
    {
      code: '۱۰۱',
      dept: 'پشتیبانی سفارشات',
      title: 'پیگیری و مرجوعی کالا',
      desc: 'رهگیری ارسال، تغییر آدرس و ضمانت ۷ روزه بازگشت.',
    },
    {
      code: '۱۰۲',
      dept: 'کلینیکال زیبایی',
      title: 'مشاوره تخصصی پوست و مو',
      desc: 'تحلیل روتین‌های ضدلک، ضدچروک و ترمیم سد دفاعی.',
    },
    {
      code: '۱۰۵',
      dept: 'اصالت و استاندارد',
      title: 'تامین و آزمایشگاه کیفیت',
      desc: 'استعلام بارکد بچ‌کد (Batch Code) و اصالت کمپانی‌ها.',
    },
    {
      code: '۱۱۰',
      dept: 'اعضای خاص',
      title: 'امور مشتریان VIP Club',
      desc: 'رزرو ایونت‌های رونمایی عطر و هدیه‌های فصلی اختصاصی.',
    },
  ];

  const faqs = [
    {
      q: 'چقدر طول می‌کشد تا به تیکت یا پیام مشاوره من پاسخ داده شود؟',
      a: 'پیام‌های ثبت شده در ساعات کاری (۹ الی ۲۱) معمولاً ظرف کمتر از ۲ ساعت توسط کارشناس مربوطه پاسخ داده می‌شوند. در صورت ثبت درخواست در ساعات غیرکاری، اولین اولویت پاسخگویی در صبح روز بعد متعلق به شما خواهد بود.',
    },
    {
      q: 'آیا دریافت مشاوره تخصصی نوع پوست و آنالیز چهره هزینه‌ای دارد؟',
      a: 'خیر، مشاوره تخصصی پوستی و استفاده از سامانه آنالیز هوشمند پوست لومیا هم به صورت آنلاین و هم در مراجعه به بوتیک حضوری کاملاً رایگان است.',
    },
    {
      q: 'چطور می‌توانم وضعیت سفارش و کد رهگیری پستی مرسوله خود را پیگیری کنم؟',
      a: 'بلافاصله پس از تحویل مرسوله به پست یا پیک اکسپرس، کد رهگیری ۲۴ رقمی پیامک می‌شود. همچنین در بخش «حساب کاربری > سفارش‌های من» می‌توانید لحظه‌به‌لحظه موقعیت بسته را رصد کنید.',
    },
    {
      q: 'در صورت بروز مغایرت در کالای دریافتی، روند تعویض کالا چگونه است؟',
      a: 'در صورت هرگونه مغایرت با فاکتور یا آسیب فیزیکی، کافیست ظرف ۷ روز با پشتیبانی تماس بگیرید. کالای جایگزین بدون دریافت هزینه اضافی و با پیک ویژه برای شما ارسال و کالای قبلی تحویل گرفته می‌شود.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim()) {
      showToast('لطفاً نام و شماره تماس خود را وارد نمایید.');
      return;
    }
    showToast('درخواست مشاوره شما با موفقیت ثبت شد. کارشناس مربوطه به زودی با شما تماس خواهد گرفت.');
    setFormData({
      fullName: '',
      phone: '',
      subject: '',
      orderCode: '',
      skinTypeGoal: 'پوست خشک و دهیدراته',
      message: '',
    });
  };

  const handleClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clubInput.trim()) {
      showToast('لطفاً ایمیل یا شماره موبایل خود را وارد نمایید.');
      return;
    }
    showToast('عضویت VIP شما با کد معرف LUMEA-FIRST فعال شد!');
    setClubInput('');
  };

  return (
    <div className="bg-[#fff8f8] min-h-screen text-[#23191c] pb-20 selection:bg-[#ffd9e1] selection:text-[#6b3545]">
      
      {/* ============================================================== */}
      {/* BREADCRUMB                                                     */}
      {/* ============================================================== */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <div className="flex items-center gap-2 text-xs text-[#847376]">
          <button onClick={() => setPath('home')} className="hover:text-[#884c5e] flex items-center gap-1 cursor-pointer">
            <Icon name="home" size={14} />
            <span>خانه</span>
          </button>
          <span>/</span>
          <span className="text-[#884c5e] font-semibold">تماس با ما</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* HERO SECTION                                                   */}
      {/* ============================================================== */}
      <header className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-10 text-center">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fde9ed] text-[#884c5e] text-xs font-semibold mb-4 border border-[#ffd4de]">
          <span className="w-2 h-2 rounded-full bg-[#884c5e] animate-pulse"></span>
          <span>پشتیبانی اختصاصی و ارتباط با مشاوران زیبایی</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#23191c] leading-tight">
          همواره در کنار شما؛
          <span className="block mt-2 font-medium not-italic text-[#884c5e] tracking-normal font-['Vazirmatn',sans-serif]">
            از انتخاب محصول تا مراقبت روزانه
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-xs sm:text-sm text-[#665457] leading-relaxed mt-4">
          کارشناسان زیبایی و تیم پشتیبانی لومیا بیوتی در هفت روز هفته آماده راهنمایی شما در انتخاب مناسب‌ترین روتین، پیگیری سفارش‌ها و پاسخگویی به هرگونه سوال تخصصی هستند.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-6 text-xs text-[#514346]">
          <div className="flex items-center gap-2">
            <Icon name="schedule" size={18} className="text-[#884c5e]" />
            <span>پاسخگویی سریع: زیر ۵ دقیقه</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="verified" size={18} className="text-[#884c5e]" />
            <span>مشاوران پوستی دارای گواهینامه معتبر</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="support_agent" size={18} className="text-[#884c5e]" />
            <span>پشتیبانی ۷ روز هفته، حتی ایام تعطیل</span>
          </div>
        </div>
      </header>

      {/* ============================================================== */}
      {/* 4 QUICK CONTACT CHANNELS                                       */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: VIP Call */}
          <div className="bg-white rounded-3xl p-6 border border-[#f2dee2] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#fff0f2] text-[#884c5e] flex items-center justify-center mb-4">
                <Icon name="phone" size={24} />
              </div>
              <h3 className="font-bold text-sm text-[#23191c]">تماس تلفنی و خط ویژه VIP</h3>
              <p className="font-black text-lg text-[#884c5e] font-mono mt-2 tracking-wide" dir="ltr">
                ۰۲۱-۹۱۰۰۸۸۹۹
              </p>
              <div className="text-[11px] text-[#847376] mt-3 space-y-1">
                <div>شنبه تا پنج‌شنبه: ۹:۰۰ الی ۲۱:۰۰</div>
                <div>جمعه‌ها: ۱۲:۰۰ الی ۱۸:۰۰</div>
              </div>
            </div>
            <a
              href="tel:02191008899"
              className="mt-6 w-full py-2.5 rounded-xl bg-[#fff0f2] hover:bg-[#ffe5ea] text-[#884c5e] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>تماس مستقیم</span>
              <Icon name="arrow_back" size={14} />
            </a>
          </div>

          {/* Card 2: Live Chat */}
          <div className="bg-white rounded-3xl p-6 border border-[#f2dee2] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative">
            <span className="absolute top-5 left-5 px-2.5 py-0.5 rounded-full bg-[#fde9ed] text-[#884c5e] text-[10px] font-bold border border-[#ffd4de]">
              آنلاین
            </span>
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#fff0f2] text-[#884c5e] flex items-center justify-center mb-4">
                <Icon name="chat" size={24} />
              </div>
              <h3 className="font-bold text-sm text-[#23191c]">
                گفتگوی زنده با بیوتی‌ادوایزر
                <span className="block text-xs font-normal text-[#884c5e] mt-0.5">مشاوره اختصاصی</span>
              </h3>
              <p className="text-xs text-[#665457] leading-relaxed mt-3">
                ارتباط بلادرنگ با بیوتی‌ادوایزرها جهت انتخاب رنگ، روتین درمانی و کرم‌پودر متناسب با پوست.
              </p>
            </div>
            <button
              onClick={() => showToast('پنجره چت آنلاین با بیوتی‌ادوایزر باز شد.')}
              className="mt-6 w-full py-2.5 rounded-xl bg-[#884c5e] hover:bg-[#723b4c] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-[#884c5e]/20"
            >
              <span>شروع گفتگو آنلاین</span>
              <Icon name="keyboard_arrow_down" size={16} />
            </button>
          </div>

          {/* Card 3: Telegram Support */}
          <div className="bg-white rounded-3xl p-6 border border-[#f2dee2] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#fff0f2] text-[#884c5e] flex items-center justify-center mb-4">
                <Icon name="near_me" size={24} />
              </div>
              <h3 className="font-bold text-sm text-[#23191c]">پشتیبانی تلگرام و پیام‌رسان</h3>
              <p className="font-bold text-sm text-[#884c5e] font-mono mt-2" dir="ltr">
                @Lumea_Care
              </p>
              <p className="text-xs text-[#665457] leading-relaxed mt-3">
                پاسخگویی سریع، ارسال تصویر بافت و سواچ محصولات و استعلام دقیق کد رهگیری مرسوله‌ها.
              </p>
            </div>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full py-2.5 rounded-xl bg-[#fff0f2] hover:bg-[#ffe5ea] text-[#884c5e] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>ارسال پیام تلگرام</span>
              <Icon name="arrow_back" size={14} className="rotate-45" />
            </a>
          </div>

          {/* Card 4: Corporate Inquiries */}
          <div className="bg-white rounded-3xl p-6 border border-[#f2dee2] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#fff0f2] text-[#884c5e] flex items-center justify-center mb-4">
                <Icon name="mail" size={24} />
              </div>
              <h3 className="font-bold text-sm text-[#23191c]">مکاتبه سازمانی و امور بازرگانی</h3>
              <p className="font-medium text-xs text-[#884c5e] font-mono mt-2" dir="ltr">
                care@lumeabeauty.com
              </p>
              <p className="text-xs text-[#665457] leading-relaxed mt-3">
                امور نمایندگی‌ها، تامین‌کنندگان بین‌المللی و پیشنهادات سازمانی. پاسخگویی در حداکثر ۴ ساعت کاری.
              </p>
            </div>
            <a
              href="mailto:care@lumeabeauty.com"
              className="mt-6 w-full py-2.5 rounded-xl bg-[#fff0f2] hover:bg-[#ffe5ea] text-[#884c5e] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>ارسال ایمیل رسمی</span>
              <Icon name="arrow_back" size={14} />
            </a>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* SPLIT SECTION: BOUTIQUE & LOCATION (LEFT) + FORM (RIGHT)       */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: BOUTIQUE SHOWROOM & MAP (5 COLUMNS) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Boutique Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#f2dee2] shadow-xs">
              
              {/* Photo with Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#faf5f6]">
                <img
                  src="/images/banners/boutique-interior.jpg"
                  alt="بوتیک مرکزی لومیا بیوتی"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#884c5e] text-[11px] font-bold shadow-sm">
                  اسکن رایگان پوست و مشاوره حضوری
                </div>
                <div className="absolute bottom-3 right-3 text-white font-extrabold text-base drop-shadow-md">
                  بوتیک مرکزی لومیا بیوتی
                </div>
              </div>

              {/* Boutique Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#fff0f2] text-[#884c5e] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="location_on" size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#847376] font-medium block">نشانی مجتمع بوتیک:</span>
                    <p className="text-xs font-bold text-[#23191c] leading-relaxed mt-0.5">
                      تهران، خیابان فرشته (شهید فیاضی)، مجتمع تجاری سام سنتر، طبقه دوم، پلاک ۲۴
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#f2dee2]/60">
                  <div className="w-8 h-8 rounded-lg bg-[#fff0f2] text-[#884c5e] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="schedule" size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#847376] font-medium block">ساعات پذیرش حضوری و تست رایحه:</span>
                    <p className="text-xs font-bold text-[#23191c] mt-0.5">
                      شنبه تا پنج‌شنبه: ۱۱:۰۰ الی ۲۱:۳۰ | جمعه‌ها: ۱۵:۰۰ الی ۲۱:۰۰
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-[#f2dee2]/60">
                  <div className="w-8 h-8 rounded-lg bg-[#fff0f2] text-[#884c5e] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="phone" size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#847376] font-medium block">میز رزرو مشاوره حضوری:</span>
                    <p className="text-xs font-bold text-[#884c5e] font-mono mt-0.5" dir="ltr">
                      ۰۲۱-۲۲۰۱۸۵۶۰
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Preview & Routing */}
              <div className="px-6 pb-6 pt-0">
                <div className="relative rounded-2xl overflow-hidden border border-[#f2dee2] aspect-[16/9] bg-[#faf5f6]">
                  <img
                    src="/images/banners/boutique-map.jpg"
                    alt="نقشه دسترسی به بوتیک سام سنتر فرشته"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-white/95 backdrop-blur-md py-2 px-3 border-t border-[#f2dee2] flex items-center justify-between text-[11px]">
                    <span className="text-[#665457] font-medium">مسیریابی سریع با:</span>
                    <div className="flex items-center gap-2">
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-[#fff0f2] hover:bg-[#ffe0e6] text-[#884c5e] font-bold transition-colors"
                      >
                        گوگل‌مپ
                      </a>
                      <a
                        href="https://neshan.org"
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-[#fff0f2] hover:bg-[#ffe0e6] text-[#884c5e] font-bold transition-colors"
                      >
                        نشان
                      </a>
                      <a
                        href="https://balad.ir"
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-[#fff0f2] hover:bg-[#ffe0e6] text-[#884c5e] font-bold transition-colors"
                      >
                        بلد
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Pink Promo Box: Luxury Sample Service */}
            <div className="bg-[#fde9ed] rounded-3xl p-5 border border-[#ffd4de] flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#884c5e] flex items-center justify-center shrink-0 shadow-xs">
                <Icon name="spa" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#23191c]">سرویس تست اختصاصی نمونه‌ها</h4>
                <p className="text-[11px] text-[#665457] leading-relaxed mt-1">
                  در تمام سفارش‌ها و همچنین مراجعه حضوری، ۳ عدد سمپل لوکس برندهای فرانسوی به انتخاب خودتان تقدیم می‌گردد.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: CONSULTATION & CONTACT FORM (7 COLUMNS) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#f2dee2] shadow-xs">
              
              {/* Form Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-[#f2dee2]">
                <div>
                  <span className="text-[11px] font-bold text-[#884c5e] block mb-1">
                    فرم اختصاصی ارتباط با لومیا
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-[#23191c]">
                    ارسال پیام یا درخواست مشاوره تخصصی پوست
                  </h2>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-[#fde9ed] text-[#884c5e] text-[11px] font-semibold border border-[#ffd4de] shrink-0">
                  میانگین زمان پاسخ: کمتر از ۳ ساعت
                </span>
              </div>

              <p className="text-xs text-[#665457] leading-relaxed mt-4 mb-6">
                مشخصات و نیاز درمانی یا سفارش خود را شرح دهید؛ کارشناسان ارشد لومیا پس از بررسی دقیق فرم، راهکار شخصی‌سازی شده شما را ارائه خواهند داد.
              </p>

              {/* The Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* 2-Columns Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#23191c] mb-1.5">
                      نام و نام خانوادگی <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: سارا محمدی"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#faf5f6] border border-[#f2dee2] text-xs text-[#23191c] focus:outline-hidden focus:border-[#884c5e] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#23191c] mb-1.5">
                      شماره موبایل جهت هماهنگی <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#faf5f6] border border-[#f2dee2] text-xs text-[#23191c] focus:outline-hidden focus:border-[#884c5e] focus:bg-white transition-all font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* 2-Columns Subject & Order Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#23191c] mb-1.5">
                      موضوع درخواست <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#faf5f6] border border-[#f2dee2] text-xs text-[#23191c] focus:outline-hidden focus:border-[#884c5e] focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="">انتخاب کنید...</option>
                      <option value="مشاوره روتین پوستی">مشاوره روتین پوستی و انتخاب سرم</option>
                      <option value="پیگیری سفارش">پیگیری وضعیت ارسال سفارش</option>
                      <option value="استعلام بچ‌کد و اصالت">استعلام بچ‌کد و اصالت کمپانی</option>
                      <option value="رزرو مشاوره حضوری">رزرو وقت مشاوره حضوری در سام سنتر</option>
                      <option value="همکاری و امور سازمانی">همکاری و امور سازمانی</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#23191c] mb-1.5">
                      کد پیگیری سفارش <span className="text-[#847376] font-normal">(در صورت وجود)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="LMA-10492"
                      value={formData.orderCode}
                      onChange={(e) => setFormData({ ...formData, orderCode: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-[#faf5f6] border border-[#f2dee2] text-xs text-[#23191c] focus:outline-hidden focus:border-[#884c5e] focus:bg-white transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Skin Type Goal Chips */}
                <div>
                  <label className="block text-xs font-bold text-[#23191c] mb-2">
                    نوع پوست یا هدف زیبایی شما <span className="text-[#847376] font-normal">(اختیاری جهت مشاوره دقیق‌تر)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {skinTypeGoals.map((goal) => (
                      <button
                        type="button"
                        key={goal}
                        onClick={() => setFormData({ ...formData, skinTypeGoal: goal })}
                        className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          formData.skinTypeGoal === goal
                            ? 'bg-[#884c5e] text-white shadow-xs font-bold'
                            : 'bg-[#faf5f6] text-[#514346] hover:bg-[#f2dee2] border border-[#f2dee2]'
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Textarea */}
                <div>
                  <label className="block text-xs font-bold text-[#23191c] mb-1.5">
                    متن پیام، شرح حساسیت پوستی یا سوال شما <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="لطفاً توضیحات کامل را مرقوم فرمایید تا مناسب‌ترین پاسخ را آماده سازیم..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-2xl bg-[#faf5f6] border border-[#f2dee2] text-xs text-[#23191c] focus:outline-hidden focus:border-[#884c5e] focus:bg-white transition-all leading-relaxed"
                  ></textarea>
                </div>

                {/* Submit Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    className="h-12 px-8 rounded-2xl bg-[#23191c] hover:bg-[#392d30] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <span>ارسال پیام و ثبت درخواست</span>
                    <span className="tracking-tighter">»</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#847376]">
                    <Icon name="lock" size={14} className="text-[#884c5e]" />
                    <span>اطلاعات تماس شما به شکل محرمانه محافظت می‌شود.</span>
                  </div>
                </div>

              </form>

            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* DIRECT DEPARTMENT EXTENSIONS                                   */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-[11px] font-bold text-[#884c5e] block mb-1">
              دایرکتوری مستقیم بخش‌ها
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#23191c]">
              ارتباط بدون معطلی با دپارتمان‌های لومیا
            </h2>
          </div>
          <div className="text-xs text-[#847376]">
            شماره سرشماره مرکزی: <strong className="font-mono text-[#884c5e]">۰۲۱-۹۱۰۰۸۸۹۹</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {departmentExtensions.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#f2dee2] shadow-xs flex flex-col justify-between hover:border-[#884c5e] hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-[#884c5e]">
                    {item.dept}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#fde9ed] text-[#884c5e] font-mono font-bold text-sm flex items-center justify-center">
                    {item.code}
                  </div>
                </div>
                <h3 className="font-bold text-sm text-[#23191c] group-hover:text-[#884c5e] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#665457] leading-relaxed mt-2">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#f2dee2]/60 text-xs font-bold text-[#884c5e] flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
                <span>تماس با داخلی {item.code}</span>
                <Icon name="chevron_left" size={14} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* FREQUENTLY ASKED QUESTIONS                                     */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] font-bold text-[#884c5e] block mb-1">
            پاسخ به ابهامات متداول
          </span>
          <h2 className="text-2xl font-black text-[#23191c]">
            پرسش‌های پرتکرار مشتریان لومیا
          </h2>
          <p className="text-xs text-[#665457] mt-2">
            شاید پاسخ سوال شما هم‌اکنون در یکی از گزینه‌های زیر آماده باشد:
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#f2dee2] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-[#fff9fa] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#884c5e]"></span>
                    <span className="font-bold text-xs sm:text-sm text-[#23191c]">
                      {faq.q}
                    </span>
                  </div>
                  <Icon
                    name={isOpen ? 'expand_less' : 'expand_more'}
                    size={20}
                    className="text-[#884c5e] shrink-0"
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#665457] leading-relaxed border-t border-[#f2dee2]/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================== */}
      {/* VIP CLUB CTA BANNER (LUMÉA Privilege)                           */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#23191c] rounded-[32px] p-8 sm:p-12 lg:p-14 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#884c5e]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative max-w-2xl text-right space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold backdrop-blur-md">
              ✦ دعوت به کلوپ زیبایی لومیا (LUMÉA Privilege)
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              عضویت در حلقه اختصاصی دوستداران زیبایی لوکس
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              با ثبت ایمیل یا شماره موبایل خود، نخستین فردی باشید که از رونمایی عطرهای کمیاب، آفرهای محرمانه فصلی و وبینارهای آموزش روتین با حضور پزشکان پوست مطلع می‌شوید.
            </p>

            <form onSubmit={handleClubSubmit} className="pt-3">
              <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md">
                <input
                  type="text"
                  placeholder="شماره موبایل یا ایمیل شما..."
                  value={clubInput}
                  onChange={(e) => setClubInput(e.target.value)}
                  className="w-full px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-xs text-white placeholder-gray-400 focus:outline-hidden focus:bg-white/15 focus:border-[#ffd9e1] transition-all"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-[#ffd9e1] hover:bg-white text-[#23191c] font-black text-xs shrink-0 transition-colors cursor-pointer"
                >
                  عضویت ویژه
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mt-2 font-mono">
                هدیه ورود: ۱۰٪ تخفیف اختصاصی برای اولین سفارش با کد معرف LUMEA-FIRST
              </p>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};
