import { Icon } from './ui/Icon';
import React from 'react';
import { useStore } from '../store/useStore';
import { CATEGORIES } from '../data/mockData';

export const MobileDrawer: React.FC = () => {
  const { isMobileMenuOpen, setMobileMenuOpen, setPath, currentPath } = useStore();

  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer content (slides from right for RTL) */}
      <div className="relative w-4/5 max-w-sm bg-[#fff8f8] h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 p-5">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#d6c2c5]/30">
            <div className="flex items-center gap-2">
              <img
                src="/images/banners/lumea-logo.png"
                alt="LUMÉA Beauty"
                className="h-8 w-auto object-contain"
              />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-9 h-9 rounded-full bg-[#fde9ed] flex items-center justify-center text-[#23191c]"
            >
              <Icon name="close" className="text-[20px]" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-4 space-y-1">
            <span className="text-[11px] font-bold text-[#847376] px-2 block mb-2">منوی اصلی</span>
            <button
              onClick={() => setPath('home')}
              className={`w-full text-right px-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${
                currentPath === 'home' ? 'bg-[#ffd9e1]/60 text-[#884c5e] font-bold' : 'hover:bg-[#fde9ed] text-[#23191c]'
              }`}
            >
              <span>صفحه اصلی</span>
              <Icon name="home" className="text-[18px]" />
            </button>

            <button
              onClick={() => setPath('products')}
              className={`w-full text-right px-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${
                currentPath === 'products' ? 'bg-[#ffd9e1]/60 text-[#884c5e] font-bold' : 'hover:bg-[#fde9ed] text-[#23191c]'
              }`}
            >
              <span>همه محصولات</span>
              <Icon name="shopping_bag" className="text-[18px]" />
            </button>

            <button
              onClick={() => setPath('categories')}
              className={`w-full text-right px-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${
                currentPath === 'categories' ? 'bg-[#ffd9e1]/60 text-[#884c5e] font-bold' : 'hover:bg-[#fde9ed] text-[#23191c]'
              }`}
            >
              <span>دسته‌بندی‌های کالا</span>
              <Icon name="category" className="text-[18px]" />
            </button>

            <button
              onClick={() => setPath('brands')}
              className={`w-full text-right px-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${
                currentPath === 'brands' ? 'bg-[#ffd9e1]/60 text-[#884c5e] font-bold' : 'hover:bg-[#fde9ed] text-[#23191c]'
              }`}
            >
              <span>برندهای معتبر</span>
              <Icon name="verified" className="text-[18px]" />
            </button>

            <button
              onClick={() => setPath('cart')}
              className={`w-full text-right px-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${
                currentPath === 'cart' ? 'bg-[#ffd9e1]/60 text-[#884c5e] font-bold' : 'hover:bg-[#fde9ed] text-[#23191c]'
              }`}
            >
              <span>سبد خرید و تسویه</span>
              <Icon name="shopping_cart" className="text-[18px]" />
            </button>

            <button
              onClick={() => setPath('magazine')}
              className={`w-full text-right px-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${
                currentPath === 'magazine' ? 'bg-[#ffd9e1]/60 text-[#884c5e] font-bold' : 'hover:bg-[#fde9ed] text-[#23191c]'
              }`}
            >
              <span>مجله تخصصی زیبایی</span>
              <Icon name="auto_stories" className="text-[18px]" />
            </button>

            <button
              onClick={() => setPath('profile')}
              className={`w-full text-right px-3 py-2.5 rounded-xl font-medium text-sm flex items-center justify-between ${
                currentPath === 'profile' ? 'bg-[#ffd9e1]/60 text-[#884c5e] font-bold' : 'hover:bg-[#fde9ed] text-[#23191c]'
              }`}
            >
              <span>حساب کاربری و پیگیری سفارش</span>
              <Icon name="person" className="text-[18px]" />
            </button>
          </div>

          {/* Quick Categories */}
          <div className="py-3 border-t border-[#d6c2c5]/30">
            <span className="text-[11px] font-bold text-[#847376] px-2 block mb-2">دسته‌بندی‌های محبوب</span>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setPath('products', { categorySlug: cat.slug })}
                  className="p-2 rounded-xl bg-white text-xs font-semibold text-[#23191c] hover:text-[#884c5e] border border-[#d6c2c5]/30 text-right truncate flex items-center gap-1.5"
                >
                  <Icon name={cat.icon} className="text-[16px] text-[#884c5e]" />
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Support Hotline at bottom of drawer */}
        <div className="pt-4 border-t border-[#d6c2c5]/30 space-y-2">
          <div className="p-3 rounded-2xl bg-white border border-[#d6c2c5]/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="support_agent" className="text-[#884c5e]" />
              <div className="flex flex-col text-right">
                <span className="text-[11px] text-[#847376]">پشتیبانی تلفنی لومیا</span>
                <span className="text-xs font-bold font-mono text-[#23191c]" dir="ltr">021 - 8888 0000</span>
              </div>
            </div>
            <a
              href="tel:02188880000"
              className="px-3 py-1 bg-[#884c5e] text-white rounded-full text-xs font-bold"
            >
              تماس
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
