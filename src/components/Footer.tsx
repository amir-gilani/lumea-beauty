import { Icon } from './ui/Icon';
import React from 'react';
import { useStore } from '../store/useStore';

export const Footer: React.FC = () => {
  const { setPath, showToast } = useStore();

  return (
    <footer className="w-full bg-[#1c1215] text-[#fff8f8] pt-16 pb-8 border-t border-[#2a1b1f]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12">
          
          {/* Branding & About (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-wider text-white">
                LUMÉA BEAUTY
              </span>
            </div>
            
            <p className="text-xs text-[#e9d5d9] leading-relaxed max-w-sm text-justify">
              فروشگاه آنلاین محصولات آرایشی و زیبایی با تمرکز بر انتخاب‌های باکیفیت و تجربه خرید ساده.
            </p>

            <div className="pt-1">
              <span className="text-xs text-[#ffd9e1] font-medium">
                «زیبایی، با انتخاب درست شروع می‌شود.»
              </span>
            </div>

            <div className="pt-2 space-y-1.5 text-xs text-[#e9d5d9]">
              <div className="flex items-center gap-2">
                <Icon name="call" className="text-[#e9a0b3] text-[18px]" />
                <span>پشتیبانی شبانه‌روزی: ۰۲۱-۸۸۸۸۰۰۰۰</span>
              </div>
            </div>
          </div>

          {/* Column 1: Categories */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">
              دسته‌بندی‌ها
            </h4>
            <ul className="space-y-2.5 text-xs text-[#e9d5d9]">
              <li>
                <button
                  onClick={() => setPath('products', { categorySlug: 'skincare' })}
                  className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
                >
                  مراقبت پوست
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPath('products', { categorySlug: 'face-makeup' })}
                  className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
                >
                  آرایش صورت
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPath('products', { categorySlug: 'haircare' })}
                  className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
                >
                  مراقبت مو
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPath('products', { categorySlug: 'fragrance' })}
                  className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
                >
                  عطر و ادکلن
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPath('products', { categorySlug: 'tools' })}
                  className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
                >
                  ابزار آرایشی
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Guide */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">
              راهنمای مشتریان
            </h4>
            <ul className="space-y-2.5 text-xs text-[#e9d5d9]">
              <li>
                <button
                  onClick={() => setPath('profile')}
                  className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
                >
                  پیگیری سفارش
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPath('faq')}
                  className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
                >
                  روش‌های ارسال
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPath('about-us')}
                  className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
                >
                  ضمانت اصالت کالا
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPath('faq')}
                  className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
                >
                  شرایط مرجوعی
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPath('faq')}
                  className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
                >
                  پرسش‌های متداول
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: About LUMÉA */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">
              درباره لومیا
            </h4>
            <ul className="space-y-2.5 text-xs text-[#e9d5d9]">
              <li>
                <button
                  onClick={() => setPath('about-us')}
                  className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
                >
                  داستان ما
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPath('contact-us')}
                  className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
                >
                  تماس با ما
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('فرصت‌های شغلی لومیا به زودی اعلام می‌شود.')}
                  className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
                >
                  فرصت‌های شغلی
                </button>
              </li>
              <li>
                <button
                  onClick={() => showToast('ورود به مجله تخصصی زیبایی لومیا')}
                  className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
                >
                  مجله زیبایی لومیا
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPath('profile')}
                  className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
                >
                  باشگاه مشتریان
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Social Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© ۲۰۲۵ تمامی حقوق برای فروشگاه لومیا بیوتی (LUMÉA) محفوظ است.</p>
          <div className="flex items-center gap-6 text-gray-300">
            <button
              onClick={() => showToast('صفحه رسمی اینستاگرام لومیا: @lumeabeauty')}
              className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
            >
              اینستاگرام
            </button>
            <button
              onClick={() => showToast('کانال تلگرام لومیا: @lumea_official')}
              className="hover:text-[#ffd9e1] transition-colors cursor-pointer"
            >
              تلگرام
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
