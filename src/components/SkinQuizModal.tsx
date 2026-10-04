import { Icon } from './ui/Icon';
import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/mockData';

export const SkinQuizModal: React.FC = () => {
  const { isQuizOpen, closeQuiz, setPath } = useStore();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    skinType: '',
    concern: '',
    sensitivity: '',
    preference: '',
  });

  if (!isQuizOpen) return null;

  const handleSelect = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
    if (step < 4) {
      setStep(step + 1);
    } else {
      setStep(5); // Result
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ skinType: '', concern: '', sensitivity: '', preference: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={closeQuiz} />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#fff8f8] rounded-3xl p-6 shadow-2xl z-10 border border-[#d6c2c5]/40 text-right overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#e9a0b3]/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#ffddb1]/30 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#d6c2c5]/30 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#884c5e] text-white flex items-center justify-center">
              <Icon name="psychology" className="text-[18px]" />
            </div>
            <div>
              <h3 className="font-title text-title font-bold text-[#23191c]">آنالیز هوشمند بیولوژی پوست لومیا</h3>
              <span className="text-[11px] text-[#847376]">بر اساس هوش درماتولوژی تخصصی لومیا</span>
            </div>
          </div>
          <button
            onClick={closeQuiz}
            className="w-8 h-8 rounded-full bg-[#fde9ed] flex items-center justify-center text-[#23191c] hover:bg-[#884c5e] hover:text-white transition-colors cursor-pointer"
          >
            <Icon name="close" className="text-[18px]" />
          </button>
        </div>

        {/* Stepper indicator */}
        {step <= 4 && (
          <div className="py-3 flex items-center justify-between text-xs text-[#847376] font-medium border-b border-[#d6c2c5]/20">
            <span>مرحله {step} از ۴</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4].map((i) => (
                <span
                  key={i}
                  className={`w-6 h-1.5 rounded-full transition-all ${
                    step >= i ? 'bg-[#884c5e]' : 'bg-[#e9d5d9]'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 1 */}
        {step === 1 && (
          <div className="py-4 space-y-3 relative z-10">
            <h4 className="font-title text-title font-bold text-[#23191c]">نوع پوست شما معمولاً چگونه است؟</h4>
            <div className="grid grid-cols-1 gap-2 pt-1">
              {[
                { title: 'خشک و کشیده', desc: 'احساس کشیدگی و پوسته‌پوسته شدن به ویژه بعد شستشو' },
                { title: 'چرب و براق', desc: 'برق افتادن ناحیه T و ایجاد جوش و منافذ باز' },
                { title: 'مختلط', desc: 'پیشانی و بینی چرب ولی گونه‌ها خشک یا معمولی' },
                { title: 'نرمال و متعادل', desc: 'بدون احساس کشیدگی یا چربی اضافه' },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleSelect('skinType', item.title)}
                  className="p-3.5 rounded-2xl bg-white border border-[#d6c2c5]/40 hover:border-[#884c5e] hover:bg-[#fff0f2] transition-all text-right flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-sm text-[#23191c] block">{item.title}</span>
                    <span className="text-xs text-[#847376]">{item.desc}</span>
                  </div>
                  <Icon name="chevron_left" className="text-[#884c5e]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="py-4 space-y-3 relative z-10">
            <h4 className="font-title text-title font-bold text-[#23191c]">مهم‌ترین دغدغه و نیاز فعلی پوستت چیه؟</h4>
            <div className="grid grid-cols-1 gap-2 pt-1">
              {[
                { title: 'کم‌آبی و دهیدراتاسیون شدید', desc: 'نیاز به آبرسانی عمقی سلولی و شفافیت' },
                { title: 'جوش، منافذ باز و ترشح سبوم', desc: 'پاکسازی منافذ و تنظیم چربی' },
                { title: 'لک‌های تیره و کدری پوست', desc: 'روشن‌کنندگی و یکدست شدن تناژ صورت' },
                { title: 'خطوط ریز و جوانسازی', desc: 'تقویت ساخت کلاژن و لیفتینگ' },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleSelect('concern', item.title)}
                  className="p-3.5 rounded-2xl bg-white border border-[#d6c2c5]/40 hover:border-[#884c5e] hover:bg-[#fff0f2] transition-all text-right flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-sm text-[#23191c] block">{item.title}</span>
                    <span className="text-xs text-[#847376]">{item.desc}</span>
                  </div>
                  <Icon name="chevron_left" className="text-[#884c5e]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="py-4 space-y-3 relative z-10">
            <h4 className="font-title text-title font-bold text-[#23191c]">آیا پوست شما به محصولات جدید واکنش و قرمزی نشان می‌دهد؟</h4>
            <div className="grid grid-cols-1 gap-2 pt-1">
              {[
                { title: 'بله، سریعاً قرمز یا ملتهب می‌شود', desc: 'پوست به شدت حساس و نیازمند فرمول ملایم' },
                { title: 'گاهی در فصل سرما یا تغییر آب و هوا', desc: 'حساسیت فصلی و دوره‌ای' },
                { title: 'خیر، پوست مقاوم و بدون حساسیتی دارم', desc: 'امکان استفاده از ترکیبات اکتیو قوی' },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleSelect('sensitivity', item.title)}
                  className="p-3.5 rounded-2xl bg-white border border-[#d6c2c5]/40 hover:border-[#884c5e] hover:bg-[#fff0f2] transition-all text-right flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-sm text-[#23191c] block">{item.title}</span>
                    <span className="text-xs text-[#847376]">{item.desc}</span>
                  </div>
                  <Icon name="chevron_left" className="text-[#884c5e]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="py-4 space-y-3 relative z-10">
            <h4 className="font-title text-title font-bold text-[#23191c]">چه نوع بافت محصولی را ترجیح می‌دهید؟</h4>
            <div className="grid grid-cols-1 gap-2 pt-1">
              {[
                { title: 'سرم سبک آبی و زودجذب', desc: 'بدون هیچ گونه حس چربی یا چسبندگی' },
                { title: 'کرم غنی مخملی', desc: 'احساس رطوبت و محافظت سنگین‌تر روی پوست' },
                { title: 'امولسیون فلوئیدی رقیق', desc: 'تعادل بین سرم و کرم' },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => handleSelect('preference', item.title)}
                  className="p-3.5 rounded-2xl bg-white border border-[#d6c2c5]/40 hover:border-[#884c5e] hover:bg-[#fff0f2] transition-all text-right flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <span className="font-bold text-sm text-[#23191c] block">{item.title}</span>
                    <span className="text-xs text-[#847376]">{item.desc}</span>
                  </div>
                  <Icon name="chevron_left" className="text-[#884c5e]" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Result */}
        {step === 5 && (
          <div className="py-4 space-y-4 relative z-10">
            <div className="text-center space-y-1">
              <span className="inline-block p-2 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                تطابق ۹۸٪ بیولوژیک
              </span>
              <h4 className="font-headline-sm text-headline-sm font-bold text-[#23191c]">
                پکیج روتین اختصاصی شما آماده است ✨
              </h4>
              <p className="text-xs text-[#514346]">
                بر اساس پاسخ‌های شما ({answers.skinType} - {answers.concern})، ترکیب زیر بهترین بازدهی درمانی را خواهد داشت:
              </p>
            </div>

            {/* Recommended Product Card */}
            <div className="p-4 rounded-2xl bg-white border border-[#d6c2c5]/40 shadow-sm flex items-center gap-3">
              <img
                src={PRODUCTS[0].image}
                alt={PRODUCTS[0].name}
                className="w-16 h-16 object-contain bg-[#fff8f8] rounded-xl"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold text-[#745a33]">{PRODUCTS[0].brand}</span>
                <h5 className="font-bold text-xs text-[#23191c] truncate">{PRODUCTS[0].name}</h5>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-[#884c5e]">
                    {PRODUCTS[0].price.toLocaleString('fa-IR')} تومان
                  </span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                    سازگارترین آبرسان
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#ffd9e1]/40 border border-[#884c5e]/20 text-xs text-[#514346] flex items-center gap-2">
              <Icon name="local_offer" className="text-[#884c5e]" />
              <span>کد تخفیف اختصاصی شما: <strong>LUMEA-FIRST</strong> (۱۵۰,۰۰۰ تومان کسر خرید)</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  closeQuiz();
                  setPath('product-detail', { productId: PRODUCTS[0].id });
                }}
                className="flex-1 py-3 px-4 rounded-full bg-[#884c5e] text-white font-bold text-xs hover:bg-[#94445c] transition-colors shadow-sm cursor-pointer"
              >
                مشاهده محصول و خرید با تخفیف
              </button>
              <button
                onClick={handleReset}
                className="py-3 px-4 rounded-full bg-white text-[#514346] border border-[#d6c2c5] font-semibold text-xs hover:bg-[#fde9ed] transition-colors cursor-pointer"
              >
                تست مجدد
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
