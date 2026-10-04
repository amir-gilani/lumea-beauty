import React, { useState } from 'react';
import { Icon } from '../components/ui/Icon';
import { useStore } from '../store/useStore';

export const AboutPage: React.FC = () => {
  const { setPath, showToast } = useStore();
  const [newsletterInput, setNewsletterInput] = useState('');

  const milestones = [
    {
      year: '۱۳۹۸',
      title: 'تولد لومیا در پاریس',
      desc: 'آغاز گزینش مستقیم برندهای نیش فرانسوی و واردات محدود معتبرترین سرم‌های ویتامینه و اسیدهای جوانساز با استانداردهای دارویی اروپا.',
      badge: 'تعهد: اولین محموله به ایران',
    },
    {
      year: '۱۴۰۰',
      title: 'تاسیس اولین بوتیک حسی',
      desc: 'افتتاح سالن مشاوره حضوری و سامانه مشاوره تخصصی تلفنی با بهره‌گیری از متخصصین آموزش‌دیده جهت بررسی نیازهای روز و تفسیر.',
      badge: 'شعبه فرشته تهران',
    },
    {
      year: '۱۴۰۲',
      title: 'انبار سردخانه هوشمند',
      desc: 'تجهیز زیرساخت لجستیک به سردخانه‌های کنترل دما و رطوبت جهت نگهداری از پپتیدها، رتینول‌های خالص و سرم‌های ناپایدار بدون افت اثر.',
      badge: 'حفظ کیفیت سرمایش استاندارد',
    },
    {
      year: '۱۴۰۳',
      title: 'پلتفرم هوشمند Skin-AI',
      desc: 'طراحی سیستم آنالیز و پیشنهاد خودکار مراقبت متناسب با تست پوست آنلاین با بیش از پنجاه هزار کاربر فعال و همراه همیشگی لومیا.',
      badge: '+۵۰,۰۰۰ همراه وفادار',
    },
  ];

  const coreValues = [
    {
      title: 'اصالت بی‌قیدوشرط',
      icon: 'verified_user',
      desc: 'تمامی محصولات همراه با برچسب‌های بین‌المللی معتبر و قابل استعلام در سامانه‌های جهانی نظیر CheckFresh عرضه می‌شوند. عدم وجود حتی یک قلم کالای فیک یا تاریخ گذشته، تعهد قطعی ماست.',
      actionText: 'استعلام هوشمند بچ‌کد',
    },
    {
      title: 'فرمولاسیون پاک و اثربخش',
      icon: 'flare',
      desc: 'گزینش محصولاتی چون سرم‌های حاوی پپتید، نیاسینامید و بدون تست‌های حیوانی، فرمولاسیون‌هایی که با اقلیم جغرافیایی، آفتاب خاورمیانه و تیپ‌های پوستی مختلف ایرانیان تطبیق کامل دارند.',
      actionText: 'استانداردهای Clean Beauty',
    },
    {
      title: 'همراهی و مشاوره پزشکی',
      icon: 'person',
      desc: 'شما در انتخاب روتینتان تنها نیستید. تیم مشاورین لومیا با سابقه درماتولوژی با آنالیز دقیق جنس پوست، سبک زندگی و سن، اختصاصی‌ترین پروتکل مراقبت را طراحی می‌کنند.',
      actionText: 'دریافت مشاوره رایگان',
    },
  ];

  const standards = [
    {
      title: 'نگهداری در دمای کنترل‌شده ۱۸ الی ۲۲ درجه',
      desc: 'انبارش استاندارد تمامی محصولات حاوی ویتامین C، نیاسینامید، رتینول و اسید هیالورونیک.',
      icon: 'ac_unit',
    },
    {
      title: 'بارکد اختصاصی و هولوگرام اصالت کالا',
      desc: 'امکان اسکن آنی توسط تلفن همراه برای دریافت مشخصات پلات‌فرم تولید، تاریخ تولید و انقضای دقیق.',
      icon: 'qr_code_scanner',
    },
    {
      title: '۷ روز ضمانت تعویض و عودت بی‌قیدوشرط',
      desc: 'در صورت هرگونه مغایرت بسته‌بندی با آنچه در اصالت کالا فوراً مرجوع و مبلغ واریز می‌گردد.',
      icon: 'replay',
    },
  ];

  const experts = [
    {
      name: 'دکتر سارا رادمنش',
      role: 'متخصص درماتولوژی و مشاور ارشد',
      bio: 'فارغ‌التحصیل دانشگاه پاریس دکارت با ۱۲ سال سابقه در داروسازی روتین‌های ضدپیری و ترمیم سد پوستی.',
      image: '/images/team/expert-dermatologist.jpg',
    },
    {
      name: 'نیلوفر صادقی',
      role: 'بیوتی‌تراپیست و متخصص فیشیال',
      bio: 'کارشناس مدشناسی و بیان لایه‌بندی و لک‌های مقاوم متناسب با متدهای تفصیلی لول‌های روز دنیا.',
      image: '/images/team/expert-therapist.jpg',
    },
    {
      name: 'کیان شمس',
      role: 'مدیر کنترل کیفیت و اصالت‌سنجی',
      bio: 'سرپرست بازرسی زنجیره تامین مستقیم اروپا، بررسی و اعتبارسنجی مدارک گمرکی و بچ‌کدهای رسمی کمپانی‌ها.',
      image: '/images/team/expert-chemist.jpg',
    },
    {
      name: 'پریا معتمد',
      role: 'کارشناس سبک و میک‌آپ آرتیست نچرال',
      bio: 'مشاور تطبیق بافت‌های آرایشی لومیا، گریدبندی شیدها و هایلایترهای سبک با فلسفه نو-میکاپ (No-Makeup Look).',
      image: '/images/team/expert-makeup-artist.jpg',
    },
  ];

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterInput.trim()) {
      showToast('لطفاً شماره تماس یا ایمیل خود را وارد نمایید.');
      return;
    }
    showToast('عضویت شما در خبرنامه زیبایی لومیا با موفقیت ثبت شد.');
    setNewsletterInput('');
  };

  return (
    <div className="bg-[#fff8f8] min-h-screen text-[#23191c] pb-24 selection:bg-[#ffd9e1] selection:text-[#6b3545]">
      
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
          <span className="text-[#884c5e] font-semibold">درباره ما</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. HERO STORY & PHILOSOPHY                                      */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fde9ed] text-[#884c5e] text-xs font-semibold mb-4 border border-[#ffd4de]">
            <span className="w-2 h-2 rounded-full bg-[#884c5e]"></span>
            <span>اصالت درخشش و هنر مراقبت پوستی</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#23191c] leading-tight">
            داستان لومیا؛ تجلی اصالت، هنر مراقبت و
            <span className="block mt-1 font-medium not-italic text-[#884c5e] tracking-normal font-['Vazirmatn',sans-serif]">
              درخشش طبیعی
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#665457] leading-relaxed mt-4">
            روایتی از عشق به زیبایی خالص و دسترسی بی‌واسطه به اصیل‌ترین فرمولاسیون‌های مراقبت از پوست و آرایش فاخر جهان. ما باور داریم زیبایی حقیقی، ناشی از هماهنگی سلامتی باطنی و انتخابی آگاهانه است.
          </p>
        </div>

        {/* Visual Collage Grid */}
        <div className="mt-10 relative">
          
          {/* Floating Top Badge */}
          <div className="absolute -top-4 right-6 sm:right-12 z-20 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#f2dee2] shadow-sm flex items-center gap-2 text-xs font-bold text-[#23191c]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#884c5e]"></span>
            <span>تأسیس ۱۳۹۸ | تهران و پاریس</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Left Model: Glow Skin (5 cols) */}
            <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-sm border border-[#f2dee2] bg-white aspect-[4/3] lg:aspect-auto">
              <img
                src="/images/banners/about-model-glow.jpg"
                alt="درخشش پاک پوست"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#884c5e] shadow-xs">
                درخشش پاک پوست
              </div>
            </div>

            {/* Right Model: Skincare Routine & Laboratory (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              <div className="relative rounded-3xl overflow-hidden shadow-sm border border-[#f2dee2] bg-white aspect-[16/9] lg:aspect-[16/10]">
                <img
                  src="/images/banners/about-model-routine.jpg"
                  alt="تکنولوژی روز جهان"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#884c5e] shadow-xs">
                  تکنولوژی روز جهان
                </div>
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-[11px] font-semibold text-[#23191c] border border-[#f2dee2] shadow-xs flex items-center gap-2">
                  <Icon name="verified" size={15} className="text-[#884c5e]" />
                  <span>ضمانت اصالت فیزیکی، مستقیم از پاریس و لندن</span>
                </div>
              </div>

              {/* Quote Card */}
              <div className="bg-[#fde9ed] rounded-3xl p-6 border border-[#ffd4de] flex items-start gap-4 shadow-xs">
                <div className="w-10 h-10 rounded-2xl bg-white text-[#884c5e] flex items-center justify-center shrink-0 shadow-xs">
                  <Icon name="auto_stories" size={20} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#23191c] leading-relaxed italic">
                    «زیبایی با تحمیل لایه‌های سنگین آغاز نمی‌شود؛ با احترام به توازن سلولی و آبرسانی عمیق پوست متولد می‌گردد.»
                  </p>
                  <span className="block text-[11px] text-[#884c5e] font-bold mt-2">
                    منشور اخلاقی لومیا | پاک، وگان و دوستدار محیط‌زیست
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. WHY TRUST LUMEA (چرا لومیا مرجع قابل اعتماد است؟)             */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold text-[#884c5e] block mb-1">
            ارتباط‌های بنیادین لومیا
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#23191c]">
            چرا لومیا مرجع قابل اعتماد بانوان فرهیخته است؟
          </h2>
          <p className="text-xs text-[#665457] mt-2 leading-relaxed">
            ما در لومیا واسطه‌ها را حذف کرده‌ایم تا هر محصول مانند هدیه‌ای تازه و اصیل، مستقیماً از آزمایشگاه‌های معتبر جهانی به دست شما برسد.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-[#f2dee2] shadow-xs flex flex-col justify-between hover:border-[#884c5e] hover:shadow-md transition-all group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#fff0f2] text-[#884c5e] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Icon name={val.icon} size={24} />
                </div>
                <h3 className="font-bold text-base text-[#23191c] mb-3 group-hover:text-[#884c5e] transition-colors">
                  {val.title}
                </h3>
                <p className="text-xs text-[#665457] leading-relaxed">
                  {val.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#f2dee2]/60 flex items-center justify-between text-xs font-bold text-[#884c5e]">
                <span>{val.actionText}</span>
                <span className="text-sm font-bold group-hover:-translate-x-1 transition-transform">←</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. TIMELINE / MILESTONES (روایت تکامل یک رویا)                   */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold text-[#884c5e] block mb-1">
            مسیر درخشش ما
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#23191c]">
            روایت تکامل یک رویا در جهان زیبایی
          </h2>
          <p className="text-xs text-[#665457] mt-2 leading-relaxed">
            از یک ایده کوچک میان دو دوست در پاریس تا ساختن بزرگ‌ترین اجتماع دوست‌داران زیبایی طبیعی و سلامت پوست در ایران.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-[#f2dee2] shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div>
                <span className="text-3xl font-black text-[#884c5e] font-mono block mb-3">
                  {m.year}
                </span>
                <h3 className="font-bold text-sm text-[#23191c] mb-2">
                  {m.title}
                </h3>
                <p className="text-xs text-[#665457] leading-relaxed">
                  {m.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#f2dee2]/60 text-[11px] text-[#847376] flex items-center gap-1.5 font-medium">
                <Icon name="verified" size={14} className="text-[#884c5e]" />
                <span>{m.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. LUXURY PACKAGING & STORAGE STANDARDS                        */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#fff0f2]/60 rounded-[32px] p-6 sm:p-10 lg:p-12 border border-[#fbd4dd]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold text-[#884c5e] block mb-1">
              تعهد بی‌شائبه کیفیت
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#23191c]">
              استانداردهای مراقبت و توزیع کالای لوکس
            </h2>
            <p className="text-xs text-[#665457] mt-2 leading-relaxed">
              ما می‌دانیم که فرمولاسیون‌های باکیفیت مراقبت از پوست، تا چه میزان به نور خورشید و گرما حساس هستند. به همین دلیل هر سفارش در لومیا با احترامی برازنده یک اثر هنری بسته‌بندی می‌شود.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Points (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              {standards.map((st, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 border border-[#f2dee2] shadow-xs flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#fde9ed] text-[#884c5e] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name={st.icon} size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#23191c]">
                      {st.title}
                    </h4>
                    <p className="text-xs text-[#665457] leading-relaxed mt-1">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Photo: Open Gift Box (6 cols) */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="/images/banners/luxury-packaging-box.jpg"
                  alt="باکس لوکس محصولات لومیا"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#f2dee2] shadow-lg max-w-xs flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#fff0f2] text-[#884c5e] flex items-center justify-center shrink-0">
                  <Icon name="spa" size={18} />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-[#23191c]">بسته‌بندی عایق حرارت</h5>
                  <p className="text-[11px] text-[#665457] leading-relaxed mt-0.5">
                    باکس‌های دوجداره و فوم‌های ضدضربه برای حفظ درخشش فعال سرم‌های اکتیو شیشه‌ای در طول دوران حمل و نقل.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. DERMATOLOGY & SCIENTIFIC TEAM (شورای علمی و تخصصی لومیا)      */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold text-[#884c5e] block mb-1">
            شورای علمی و تخصصی لومیا
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#23191c]">
            همراهی نام‌های معتبر پوست و زیبایی
          </h2>
          <p className="text-xs text-[#665457] mt-2 leading-relaxed">
            دست‌اندرکاران انتخاب، تست کلینیکال و تایید سبد کالایی لومیا بیوتی متشکل از پزشکان متخصص و مجرب‌ترین آرایشگران کشورمان هستند.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experts.map((exp, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-[#f2dee2] shadow-xs flex flex-col justify-between hover:border-[#884c5e] hover:shadow-md transition-all group"
            >
              <div>
                <div className="aspect-square overflow-hidden bg-[#faf5f6]">
                  <img
                    src={exp.image}
                    alt={exp.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-sm text-[#23191c] group-hover:text-[#884c5e] transition-colors">
                    {exp.name}
                  </h3>
                  <span className="text-[11px] text-[#884c5e] font-semibold block mt-1">
                    {exp.role}
                  </span>
                  <p className="text-xs text-[#665457] leading-relaxed mt-2.5">
                    {exp.bio}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setPath('contact')}
                  className="w-full py-2.5 rounded-xl bg-[#fff0f2] hover:bg-[#ffe5ea] text-[#884c5e] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>مشاوره با متخصص</span>
                  <Icon name="favorite" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. KEY METRICS & ACCOMPLISHMENTS (۴ آمار افتخارآمیز)           */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          
          <div className="bg-white rounded-3xl p-6 border border-[#f2dee2] shadow-xs">
            <span className="text-3xl sm:text-4xl font-black text-[#884c5e] font-mono block">
              +۵۰k
            </span>
            <h4 className="font-bold text-xs sm:text-sm text-[#23191c] mt-2">
              همراه وفادار و راضی
            </h4>
            <p className="text-[11px] text-[#847376] mt-1">
              اعتماد بانوانی که زیبایی طبیعی را ترجیح می‌دهند
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#f2dee2] shadow-xs">
            <span className="text-3xl sm:text-4xl font-black text-[#884c5e] font-mono block">
              +۱۲۰
            </span>
            <h4 className="font-bold text-xs sm:text-sm text-[#23191c] mt-2">
              برند مطرح جهانی
            </h4>
            <p className="text-[11px] text-[#847376] mt-1">
              گزیده‌شده از فرانسه، انگلستان، ژاپن و کره
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#f2dee2] shadow-xs">
            <span className="text-3xl sm:text-4xl font-black text-[#884c5e] font-mono block">
              ۹۹.۴٪
            </span>
            <h4 className="font-bold text-xs sm:text-sm text-[#23191c] mt-2">
              رضایت از نتایج روتین‌ها
            </h4>
            <p className="text-[11px] text-[#847376] mt-1">
              بر اساس نظرسنجی دوره‌ای ۲ ماهه مشتریان
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#f2dee2] shadow-xs">
            <span className="text-3xl sm:text-4xl font-black text-[#884c5e] font-mono block">
              ۲۴h
            </span>
            <h4 className="font-bold text-xs sm:text-sm text-[#23191c] mt-2">
              ارسال سریع سراسری
            </h4>
            <p className="text-[11px] text-[#847376] mt-1">
              تحویل ویژه اکسپرس با محافظت از حرارت
            </p>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. BOUTIQUE VISIT INVITATION                                   */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-[32px] p-6 sm:p-10 lg:p-12 border border-[#f2dee2] shadow-xs">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-[11px] font-bold text-[#884c5e] block mb-1">
              تجربه لمس اصالت از نزدیک
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#23191c]">
              مشتاق میزبانی شما در بوتیک اختصاصی یا مشاوره آنلاین هستیم
            </h2>
            <p className="text-xs text-[#665457] leading-relaxed mt-3">
              در بوتیک لومیا، می‌توانید بافت محصولات را تست کرده، از اسکن رایگان با دستگاه آنالیز پیشرفته پوست بهره‌مند شوید و در فضایی آرامش‌بخش، نوبت مشاوره فردی دریافت کنید.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-5">
              <button
                onClick={() => setPath('contact')}
                className="h-11 px-7 rounded-xl bg-[#884c5e] hover:bg-[#723b4c] text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm shadow-[#884c5e]/20"
              >
                <span>رزرو مشاوره حضوری رایگان</span>
                <Icon name="arrow_back" size={14} />
              </button>

              <button
                onClick={() => setPath('products')}
                className="h-11 px-6 rounded-xl bg-white hover:bg-[#fff0f2] text-[#23191c] border border-[#f2dee2] font-bold text-xs flex items-center transition-colors cursor-pointer"
              >
                <span>مشاهده کالکشن جدید محصولات</span>
              </button>
            </div>
          </div>

          {/* 4 Location Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#f2dee2]/60">
            
            <div className="rounded-2xl overflow-hidden relative aspect-[16/10] bg-[#faf5f6] border border-[#f2dee2]">
              <img
                src="/images/banners/boutique-interior.jpg"
                alt="شوروم مرکزی لومیا بیوتی"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-lg text-[10px] font-bold">
                شوروم مرکزی لومیا بیوتی
              </span>
            </div>

            <div className="bg-[#faf5f6] rounded-2xl p-4 border border-[#f2dee2] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fff0f2] text-[#884c5e] flex items-center justify-center shrink-0">
                <Icon name="location_on" size={20} />
              </div>
              <div>
                <h5 className="font-bold text-xs text-[#23191c]">تهران، خیابان فرشته</h5>
                <p className="text-[11px] text-[#847376] mt-0.5">مجتمع سام سنتر، طبقه دوم، پلاک ۲۴</p>
              </div>
            </div>

            <div className="bg-[#faf5f6] rounded-2xl p-4 border border-[#f2dee2] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fff0f2] text-[#884c5e] flex items-center justify-center shrink-0">
                <Icon name="schedule" size={20} />
              </div>
              <div>
                <h5 className="font-bold text-xs text-[#23191c]">ساعات پذیرایی حضوری</h5>
                <p className="text-[11px] text-[#847376] mt-0.5">شنبه تا پنج‌شنبه: ۱۱:۰۰ الی ۲۱:۳۰</p>
              </div>
            </div>

            <div className="bg-[#faf5f6] rounded-2xl p-4 border border-[#f2dee2] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fff0f2] text-[#884c5e] flex items-center justify-center shrink-0">
                <Icon name="near_me" size={20} />
              </div>
              <div>
                <h5 className="font-bold text-xs text-[#23191c]">مشاهده روی نقشه و مسیریابی سریع</h5>
                <p className="text-[11px] text-[#847376] mt-0.5">دسترسی آسان با پارکینگ اختصاصی سام سنتر</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. NEWSLETTER / CLUB BAR                                       */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#fde9ed] rounded-3xl p-6 sm:p-8 border border-[#ffd4de] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-right w-full md:w-auto">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#884c5e] flex items-center justify-center shrink-0 shadow-xs">
              <Icon name="favorite" size={24} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-[#23191c]">
                به خانواده درخشان لومیا بپیوندید
              </h4>
              <p className="text-xs text-[#665457] mt-0.5">
                مجله زیبایی، روتین‌های روز و تخفیف‌های محرمانه اعضای باشگاه
              </p>
            </div>
          </div>

          <form onSubmit={handleNewsletter} className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="شماره تماس یا ایمیل شما..."
              value={newsletterInput}
              onChange={(e) => setNewsletterInput(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#f2dee2] text-xs text-[#23191c] placeholder-gray-400 focus:outline-hidden focus:border-[#884c5e] w-full sm:w-64"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#23191c] hover:bg-[#392d30] text-white font-bold text-xs shrink-0 transition-colors cursor-pointer"
            >
              عضویت
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
