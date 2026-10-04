import { Icon } from '../components/ui/Icon';
import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export const FAQPage: React.FC = () => {
  const { setPath } = useStore();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<'all' | 'authenticity' | 'shipping' | 'returns' | 'skincare'>('all');

  const faqs = [
    {
      category: 'authenticity',
      question: 'چگونه از ۱۰۰٪ اورجینال بودن محصولات لومیا اطمینان حاصل کنم؟',
      answer:
        'تمامی محصولات لومیا بیوتی مستقیماً از نمایندگی‌های رسمی، دراگ‌استورها و کمپانی‌های مادر در اروپا، کانادا و آمریکا تامین می‌شوند. هر محصول دارای بچ‌کد (Batch Code) معتبر کارخانه‌ای قابل استعلام در سامانه‌های جهانی مانند CheckFresh و CheckCosmetic است. علاوه بر این، لومیا ضمانت ۱۰۰٪ بازگشت وجه بی‌قیدوشرط در صورت هرگونه عدم اصالت ارائه می‌دهد.',
    },
    {
      category: 'shipping',
      question: 'زمان تحویل سفارش‌ها چقدر است و هزینه ارسال چگونه محاسبه می‌شود؟',
      answer:
        'برای شهر تهران، تحویل با پیک اختصاصی لومیا در همان روز یا روز کاری بعد در بازه زمانی انتخابی شما انجام می‌پذیرد. برای سایر شهرستان‌ها، ارسال از طریق پست پیشتاز یا تیپاکس ظرف ۲ الی ۴ روز کاری انجام می‌شود. برای سفارش‌های بالای ۱,۰۰۰,۰۰۰ تومان، هزینه بسته‌بندی لوکس و ارسال در سراسر ایران کاملاً رایگان است.',
    },
    {
      category: 'skincare',
      question: 'آیا قبل از خرید می‌توانم با متخصص پوست مشاوره داشته باشم؟',
      answer:
        'بله! شما می‌توانید از ابزار رایگان «آنالیز هوشمند پوست در ۳۰ ثانیه» در سایت استفاده کنید و روتین شخصی‌سازی شده دریافت کنید. همچنین مشاوران و کارشناسان مراقبت پوست ما در بخش پشتیبانی آنلاین و تماس تلفنی آماده پاسخگویی به سوالات شما هستند.',
    },
    {
      category: 'returns',
      question: 'شرایط بازگرداندن کالا تا ۷ روز به چه صورت است؟',
      answer:
        'در صورت وجود هرگونه مغایرت کالا با توضیحات سایت، آسیب فیزیکی در حین حمل و نقل، یا پلمپ بودن و باز نشدن بسته‌بندی اصلی، تا ۷ روز تقویمی پس از دریافت می‌توانید درخواست مرجوعی خود را ثبت نمایید و هزینه در همان روز به کیف پول یا حساب بانکی شما عودت داده خواهد شد.',
    },
    {
      category: 'authenticity',
      question: 'محصولات مراقبت از پوست چگونه در انبار نگهداری می‌شوند؟',
      answer:
        'انبار مرکزی لومیا مجهز به سیستم تهویه مطبوع پیشرفته و تنظیم دمای ثابت (بین ۱۵ تا ۲۱ درجه سانتی‌گراد) و محیط ایزوله در برابر نور مستقیم خورشید است تا ترکیبات حساسی چون ویتامین C، رتینول و سرم‌های آبرسان هرگز خاصیت درمانی خود را از دست ندهند.',
    },
    {
      category: 'shipping',
      question: 'چگونه می‌توانم وضعیت سفارش خود را به صورت لحظه‌ای پیگیری کنم؟',
      answer:
        'با ورود به بخش «حساب کاربری > سفارش‌های من» می‌توانید وضعیت دقیق آماده‌سازی و کد پیگیری مرسوله پستی یا رهگیری زنده سفیر اختصاصی لومیا را در هر لحظه مشاهده فرمایید.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    if (activeCategory === 'all') return true;
    return faq.category === activeCategory;
  });

  return (
    <div className="bg-[#fcf8f8] min-h-screen text-[#1b1c1d] pb-24">
      <div className="bg-gradient-to-b from-[#fff5f6] to-[#fcf8f8] border-b border-[#f2dede]/70 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#ffd9e1] text-[#6b3545] border border-[#e9a0b3] inline-block mb-3">
            راهنمای جامع مشتریان
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1b1c1d] tracking-tight">
            پرسش‌های پرتکرار LUMÉA
          </h1>
          <p className="text-sm text-[#524345] max-w-xl mx-auto mt-3 leading-relaxed">
            پاسخ به متداول‌ترین سوالات شما درباره نحوه خرید، استعلام اصالت، شرایط ارسال و خدمات کانسیرژ
          </p>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {[
              { id: 'all', label: 'همه پرسش‌ها' },
              { id: 'authenticity', label: 'اصالت و بچ‌کد' },
              { id: 'shipping', label: 'ارسال و تحویل' },
              { id: 'skincare', label: 'مشاوره پوست و روتین' },
              { id: 'returns', label: 'ضمانت و بازگشت' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#884c5e] text-white shadow-sm'
                    : 'bg-white border border-[#f2dede] text-[#524345] hover:bg-[#fff0f2]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#f2dede] overflow-hidden transition-all shadow-[0_2px_12px_rgba(136,76,94,0.03)]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 hover:bg-[#fffcfc] transition-colors"
                >
                  <span className="font-bold text-sm text-[#1b1c1d] flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#884c5e]" />
                    {faq.question}
                  </span>
                  <Icon name="keyboard_arrow_down" className={`text-[#884c5e] text-[20px] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#524345] leading-relaxed border-t border-[#f2dede]/60 bg-[#fffbfc]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 bg-white rounded-3xl p-8 border border-[#f2dede] text-center shadow-[0_4px_20px_rgba(136,76,94,0.04)]">
          <h3 className="font-bold text-base text-[#1b1c1d] mb-2">پاسخ پرسش خود را پیدا نکردید؟</h3>
          <p className="text-xs text-[#524345] mb-5">
            کارشناسان لومیا بیوتی مشتاقانه آماده پاسخگویی و راهنمایی سریع شما هستند.
          </p>
          <button
            onClick={() => setPath('/contact')}
            className="px-6 py-3 rounded-xl bg-[#884c5e] text-white font-bold text-xs hover:bg-[#723b4c] transition-all"
          >
            تماس با مشاوران لومیا
          </button>
        </div>
      </div>
    </div>
  );
};
