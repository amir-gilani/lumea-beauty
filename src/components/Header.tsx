import React from 'react';
import { useStore } from '../store/useStore';
import { Icon } from './ui/Icon';

export const Header: React.FC = () => {
  const {
    currentPath,
    setPath,
    cart,
    wishlist,
    setMobileMenuOpen,
  } = useStore();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const isNavActive = (path: string) => {
    const p = currentPath.toLowerCase().trim();
    if (path === 'home') return p === 'home' || p === '/' || p === '';
    if (path === 'products') return p === 'products' || p === '/products';
    if (path === 'categories') return p === 'categories' || p === '/categories' || p.startsWith('category');
    if (path === 'about') return p === 'about' || p === '/about' || p === 'about-us' || p === '/about-us';
    if (path === 'contact') return p === 'contact' || p === '/contact' || p === 'contact-us' || p === '/contact-us';
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#f2dede] transition-all">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 lg:gap-6">
        
        {/* RIGHT SIDE: LOGO + DESKTOP NAV LINKS */}
        <div className="flex items-center gap-4 lg:gap-8 shrink-0">
          {/* Mobile Menu Trigger (only on small screens < lg) */}
          <button
            aria-label="منوی دسترسی"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-[#1b1c1d] hover:bg-[#fff0f2] transition-colors"
          >
            <Icon name="menu" size={22} />
          </button>

          {/* LUMÉA Brand Logo */}
          <button
            onClick={() => setPath('home')}
            className="flex items-center gap-2 group cursor-pointer text-right"
          >
            <span className="font-extrabold text-2xl lg:text-[26px] tracking-wider text-[#1b1c1d] flex items-center">
              LUMÉA
              <span className="w-1.5 h-1.5 rounded-full bg-[#884c5e] inline-block mr-1" />
            </span>
            <span className="text-[10px] font-bold text-[#884c5e] bg-[#ffe8ed] px-1.5 py-0.5 rounded uppercase hidden sm:inline-block">
              Beauty
            </span>
          </button>

          {/* Desktop Navigation Links (Visible on lg and desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm font-medium">
            <button
              onClick={() => setPath('home')}
              className={`py-2 transition-colors cursor-pointer relative ${
                isNavActive('home')
                  ? 'text-[#884c5e] font-bold'
                  : 'text-[#524345] hover:text-[#884c5e]'
              }`}
            >
              خانه
              {isNavActive('home') && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#884c5e] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setPath('products')}
              className={`py-2 transition-colors cursor-pointer relative ${
                isNavActive('products')
                  ? 'text-[#884c5e] font-bold'
                  : 'text-[#524345] hover:text-[#884c5e]'
              }`}
            >
              محصولات
              {isNavActive('products') && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#884c5e] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setPath('about-us')}
              className={`py-2 transition-colors cursor-pointer relative ${
                isNavActive('about')
                  ? 'text-[#884c5e] font-bold'
                  : 'text-[#524345] hover:text-[#884c5e]'
              }`}
            >
              درباره ما
              {isNavActive('about') && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#884c5e] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setPath('contact-us')}
              className={`py-2 transition-colors cursor-pointer relative ${
                isNavActive('contact')
                  ? 'text-[#884c5e] font-bold'
                  : 'text-[#524345] hover:text-[#884c5e]'
              }`}
            >
              تماس با ما
              {isNavActive('contact') && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#884c5e] rounded-full" />
              )}
            </button>
          </nav>
        </div>

        {/* LEFT SIDE: WISHLIST, CART, AND LOGIN/PROFILE BUTTON */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Wishlist Button */}
          <button
            aria-label="علاقه‌مندی‌ها"
            onClick={() => setPath('wishlist')}
            className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#fff0f2] transition-colors text-[#524345] hover:text-[#884c5e] cursor-pointer"
          >
            <Icon name="favorite" size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#884c5e] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                {wishlistCount.toLocaleString('fa-IR')}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            aria-label="سبد خرید"
            onClick={() => setPath('cart')}
            className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#fff0f2] transition-colors text-[#524345] hover:text-[#884c5e] cursor-pointer"
          >
            <Icon name="shopping_bag" size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#884c5e] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                {cartCount.toLocaleString('fa-IR')}
              </span>
            )}
          </button>

          {/* User Account / Profile Button */}
          <button
            aria-label="حساب کاربری"
            onClick={() => setPath('profile')}
            className="flex items-center gap-1.5 h-10 px-3.5 sm:px-4 rounded-full border border-[#d6a9b4] hover:bg-[#fff0f2] text-[#1b1c1d] hover:text-[#884c5e] transition-all text-xs font-bold cursor-pointer"
          >
            <Icon name="person" size={17} />
            <span className="hidden sm:inline">ورود / ثبت‌نام</span>
          </button>
        </div>

      </div>
    </header>
  );
};
