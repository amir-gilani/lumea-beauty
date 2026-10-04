import { Icon } from './ui/Icon';
import React from 'react';
import { useStore } from '../store/useStore';

export const MobileBottomNav: React.FC = () => {
  const { currentPath, setPath, cart } = useStore();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-[max(12px,env(safe-area-inset-bottom,12px))] bg-white/95 backdrop-blur-xl border-t border-[#f2dee2] shadow-[0_-4px_24px_rgba(32,20,23,0.08)] xl:hidden">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {/* Home */}
        <button
          onClick={() => setPath('home')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] h-full transition-colors cursor-pointer ${
            currentPath === 'home' || currentPath === '/' ? 'text-[#884c5e]' : 'text-[#514346] hover:text-[#884c5e]'
          }`}
        >
          <Icon name="home" filled={currentPath === 'home' || currentPath === '/'} className="text-[24px]" />
          <span className="text-[11px] font-bold tracking-tight">خانه</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => setPath('categories')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] h-full transition-colors cursor-pointer ${
            currentPath === 'categories' ? 'text-[#884c5e]' : 'text-[#514346] hover:text-[#884c5e]'
          }`}
        >
          <Icon name="category" filled={currentPath === 'categories'} className="text-[24px]" />
          <span className="text-[11px] font-medium tracking-tight">دسته‌بندی‌ها</span>
        </button>

        {/* Magazine */}
        <button
          onClick={() => setPath('magazine')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] h-full transition-colors cursor-pointer ${
            currentPath === 'magazine' ? 'text-[#884c5e]' : 'text-[#514346] hover:text-[#884c5e]'
          }`}
        >
          <Icon name="auto_stories" filled={currentPath === 'magazine'} className="text-[24px]" />
          <span className="text-[11px] font-medium tracking-tight">مجله لومیا</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setPath('cart')}
          className={`relative flex flex-col items-center justify-center gap-1 min-w-[56px] h-full transition-colors cursor-pointer ${
            currentPath === 'cart' ? 'text-[#884c5e]' : 'text-[#514346] hover:text-[#884c5e]'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <Icon name="shopping_bag" filled={currentPath === 'cart'} className="text-[24px]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 min-w-[16px] h-[16px] px-1 bg-[#884c5e] text-white rounded-full text-[9.5px] font-bold flex items-center justify-center ring-2 ring-white">
                {cartCount.toLocaleString('fa-IR')}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium tracking-tight">سبد خرید</span>
        </button>

        {/* Account / Profile */}
        <button
          onClick={() => setPath('profile')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[56px] h-full transition-colors cursor-pointer ${
            currentPath === 'profile' || currentPath === 'orders' ? 'text-[#884c5e]' : 'text-[#514346] hover:text-[#884c5e]'
          }`}
        >
          <Icon name="person" filled={currentPath === 'profile' || currentPath === 'orders'} className="text-[24px]" />
          <span className="text-[11px] font-medium tracking-tight">حساب من</span>
        </button>
      </div>
    </nav>
  );
};
