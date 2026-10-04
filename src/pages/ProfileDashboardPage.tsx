import { Icon } from '../components/ui/Icon';
import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS, INITIAL_ORDERS } from '../data/mockData';

export const ProfileDashboardPage: React.FC = () => {
  const {
    currentPath,
    setPath,
    wishlist,
    toggleWishlist,
    addToCart,
    showToast,
    orders,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'all' | 'processing' | 'delivered' | 'cancelled'>('all');
  const [activeSidebarNav, setActiveSidebarNav] = useState<'dashboard' | 'orders' | 'wishlist' | 'addresses' | 'messages' | 'settings'>('orders');

  useEffect(() => {
    if (currentPath === 'wishlist' || currentPath === '/wishlist') {
      setActiveSidebarNav('wishlist');
    }
  }, [currentPath]);

  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 'addr-1',
      title: 'منزل شخصی',
      isDefault: true,
      recipient: 'فرناز کمالی',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      province: 'تهران',
      city: 'تهران',
      address: 'خیابان ولیعصر، بالاتر از پارک وی، کوچه گلستان، پلاک ۱۲، زنگ ۴',
      postalCode: '۱۹۶۸۸۱۴۵۲۳',
    },
    {
      id: 'addr-2',
      title: 'دفتر کار',
      isDefault: false,
      recipient: 'فرناز کمالی',
      phone: '۰۹۱۲۳۴۵۶۷۸۹',
      province: 'تهران',
      city: 'تهران',
      address: 'خیابان سعادت‌آباد، خیابان صرافها، برج تجاری لوتوس، طبقه ۷، واحد ۷۰۲',
      postalCode: '۱۹۹۸۸۲۳۱۴۴',
    },
  ]);

  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<any>(null);

  // Filter orders based on active tab
  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'processing') return order.status === 'processing';
    if (activeTab === 'delivered') return order.status === 'delivered';
    if (activeTab === 'cancelled') return order.status === 'cancelled';
    return true;
  });

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleOpenInvoice = (order: any) => {
    setSelectedOrderForInvoice(order);
    setIsInvoiceOpen(true);
  };

  return (
    <div className="bg-[#fcf8f8] min-h-screen text-[#1b1c1d] pb-24">
      {/* Breadcrumb Bar */}
      <div className="border-b border-[#f2dede]/70 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-[#524345]">
          <button onClick={() => setPath('/')} className="hover:text-[#884c5e] transition-colors">
            خانه
          </button>
          <span>/</span>
          <button onClick={() => setPath('/profile')} className="hover:text-[#884c5e] transition-colors">
            حساب کاربری
          </button>
          <span>/</span>
          <span className="text-[#884c5e] font-semibold">
            {activeSidebarNav === 'orders' ? 'سفارش‌های من' : activeSidebarNav === 'wishlist' ? 'لیست علاقه‌مندی‌ها' : activeSidebarNav === 'addresses' ? 'دفترچه آدرس‌ها' : 'داشبورد'}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ============================================================== */}
          {/* SIDEBAR NAVIGATION (4 COLUMNS ON DESKTOP)                     */}
          {/* ============================================================== */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* User Profile Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#f2dede] shadow-[0_4px_24px_rgba(136,76,94,0.06)] relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-[#884c5e] via-[#e9a0b3] to-[#884c5e]" />

              <div className="flex items-center gap-4 mt-2">
                <div className="relative">
                  <img
                    src="/images/avatars/user-farnaz.jpg"
                    alt="فرناز کمالی"
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-[#884c5e] ring-offset-2"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white" title="آنلاین" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-base text-[#1b1c1d]">فرناز کمالی</h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ffd9e1] text-[#6b3545] border border-[#e9a0b3]">
                      عضو VIP الماس
                    </span>
                  </div>
                  <p className="text-xs text-[#524345] mt-1 font-mono">۰۹۱۲ - ۳۴۵ ۶۷۸۹</p>
                </div>
              </div>

              {/* Club Points Progress */}
              <div className="mt-5 pt-5 border-t border-[#f2dede]/80">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#524345] flex items-center gap-1 font-medium">
                    <Icon name="verified" className="text-amber-500 text-[18px]" />
                    امتیاز باشگاه لومیا
                  </span>
                  <span className="font-bold text-[#884c5e]">۱,۲۴۰ امتیاز</span>
                </div>
                <div className="w-full bg-[#fcecee] h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-l from-[#884c5e] to-[#e9a0b3] h-full rounded-full w-[78%]" />
                </div>
                <p className="text-[11px] text-[#765b61] mt-2 flex justify-between">
                  <span>تا سطح اختصاصی پلاتینیوم</span>
                  <span className="font-semibold text-[#884c5e]">۲۶۰ امتیاز دیگر</span>
                </p>
              </div>
            </div>

            {/* Sidebar Navigation Links */}
            <div className="bg-white rounded-2xl border border-[#f2dede] overflow-hidden shadow-[0_2px_16px_rgba(136,76,94,0.04)]">
              <nav className="divide-y divide-[#f2dede]/60">
                <button
                  onClick={() => setActiveSidebarNav('dashboard')}
                  className={`w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium transition-colors ${
                    activeSidebarNav === 'dashboard'
                      ? 'bg-[#fff5f6] text-[#884c5e] font-bold border-r-4 border-[#884c5e]'
                      : 'text-[#524345] hover:bg-[#fff9fa] hover:text-[#884c5e]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon name="dashboard" className="text-[20px]" />
                    داشبورد کلی
                  </span>
                  <Icon name="arrow_back_ios" className="text-[16px] text-gray-400" />
                </button>

                <button
                  onClick={() => setActiveSidebarNav('orders')}
                  className={`w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium transition-colors ${
                    activeSidebarNav === 'orders'
                      ? 'bg-[#fff5f6] text-[#884c5e] font-bold border-r-4 border-[#884c5e]'
                      : 'text-[#524345] hover:bg-[#fff9fa] hover:text-[#884c5e]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon name="package_2" className="text-[20px]" />
                    سفارش‌های من
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#ffd9e1] text-[#6b3545]">
                    {orders.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveSidebarNav('wishlist')}
                  className={`w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium transition-colors ${
                    activeSidebarNav === 'wishlist'
                      ? 'bg-[#fff5f6] text-[#884c5e] font-bold border-r-4 border-[#884c5e]'
                      : 'text-[#524345] hover:bg-[#fff9fa] hover:text-[#884c5e]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon name="favorite" className="text-[20px]" />
                    لیست علاقه‌مندی‌ها
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-600">
                    {wishlist.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveSidebarNav('addresses')}
                  className={`w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium transition-colors ${
                    activeSidebarNav === 'addresses'
                      ? 'bg-[#fff5f6] text-[#884c5e] font-bold border-r-4 border-[#884c5e]'
                      : 'text-[#524345] hover:bg-[#fff9fa] hover:text-[#884c5e]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon name="location_on" className="text-[20px]" />
                    دفترچه آدرس‌ها
                  </span>
                  <Icon name="arrow_back_ios" className="text-[16px] text-gray-400" />
                </button>

                <button
                  onClick={() => {
                    showToast('شما ۲ پیام جدید و تخفیف اختصاصی تولد دارید.');
                  }}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium text-[#524345] hover:bg-[#fff9fa] hover:text-[#884c5e] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Icon name="notifications" className="text-[20px]" />
                    پیام‌ها و اعلان‌ها
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#884c5e] animate-pulse" />
                </button>

                <button
                  onClick={() => showToast('تنظیمات حساب کاربری باز شد.')}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium text-[#524345] hover:bg-[#fff9fa] hover:text-[#884c5e] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Icon name="settings" className="text-[20px]" />
                    تنظیمات حساب
                  </span>
                  <Icon name="arrow_back_ios" className="text-[16px] text-gray-400" />
                </button>

                <button
                  onClick={() => {
                    showToast('با موفقیت از حساب کاربری خارج شدید.');
                    setPath('/');
                  }}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Icon name="logout" className="text-[20px]" />
                    خروج از حساب
                  </span>
                </button>
              </nav>
            </div>

            {/* VIP Concierge Support Card */}
            <div className="bg-gradient-to-br from-[#2a1b1f] to-[#1c1215] text-white rounded-2xl p-6 relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300 mb-4">
                  <Icon name="support_agent" className="text-[24px]" />
                </div>
                <h3 className="font-bold text-base mb-1 text-white">کانسیرژ اختصاصی لومیا</h3>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  مشاوران پوست و کارشناسان زیبایی ما ۲۴ ساعته در خدمت شما هستند.
                </p>
                <button
                  onClick={() => setPath('/contact')}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ffd9e1] to-[#fdb2c5] text-[#6b3545] font-bold text-xs hover:brightness-105 transition-all text-center"
                >
                  ارتباط مستقیم با مشاور
                </button>
              </div>
            </div>
          </aside>

          {/* ============================================================== */}
          {/* MAIN DASHBOARD CONTENT (8 COLUMNS ON DESKTOP)                 */}
          {/* ============================================================== */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-8">
            {/* Top Stat Overview Cards (Matching Stitch Image 1) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-[#f2dede] shadow-[0_2px_12px_rgba(136,76,94,0.04)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[#765b61] font-medium">سفارش‌های فعال</span>
                  <div className="w-9 h-9 rounded-xl bg-[#fff2f4] text-[#884c5e] flex items-center justify-center">
                    <Icon name="local_shipping" className="text-[20px]" />
                  </div>
                </div>
                <div className="font-bold text-xl text-[#1b1c1d]">۲ سفارش جاری</div>
                <span className="text-[11px] text-emerald-600 font-medium mt-1 block">در حال آماده‌سازی</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#f2dede] shadow-[0_2px_12px_rgba(136,76,94,0.04)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[#765b61] font-medium">امتیاز باشگاه</span>
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Icon name="award_star" className="text-[20px]" />
                  </div>
                </div>
                <div className="font-bold text-xl text-[#1b1c1d]">۱,۲۴۰ <span className="text-xs font-normal text-gray-500">امتیاز</span></div>
                <span className="text-[11px] text-[#884c5e] font-medium mt-1 block">معادل ۶۲۰,۰۰۰ ت تخفیف</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#f2dede] shadow-[0_2px_12px_rgba(136,76,94,0.04)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[#765b61] font-medium">کیف پول و هدیه</span>
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Icon name="account_balance_wallet" className="text-[20px]" />
                  </div>
                </div>
                <div className="font-bold text-xl text-[#1b1c1d]">۳۵۰,۰۰۰ <span className="text-xs font-normal text-gray-500">تومان</span></div>
                <span className="text-[11px] text-gray-500 font-medium mt-1 block">اعتبار خرید فوری</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-[#f2dede] shadow-[0_2px_12px_rgba(136,76,94,0.04)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-[#765b61] font-medium">لیست پسندیده‌ها</span>
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Icon name="favorite" className="text-[20px]" />
                  </div>
                </div>
                <div className="font-bold text-xl text-[#1b1c1d]">{wishlist.length} <span className="text-xs font-normal text-gray-500">محصول</span></div>
                <span className="text-[11px] text-rose-600 font-medium mt-1 block">آماده افزودن به سبد</span>
              </div>
            </div>

            {/* SECTION: ORDERS VIEW */}
            {activeSidebarNav === 'orders' || activeSidebarNav === 'dashboard' ? (
              <div className="space-y-6">
                {/* Orders Header & Tab Filters */}
                <div className="bg-white rounded-2xl p-5 border border-[#f2dede] shadow-[0_2px_12px_rgba(136,76,94,0.04)]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f2dede]/70">
                    <div>
                      <h1 className="text-lg font-bold text-[#1b1c1d] flex items-center gap-2">
                        <Icon name="inventory_2" className="text-[#884c5e]" />
                        تاریخچه سفارش‌های من
                      </h1>
                      <p className="text-xs text-[#765b61] mt-1">
                        جزئیات، فاکتور و رهگیری وضعیت بسته‌بندی و ارسال سفارشات لومیا
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => showToast('در حال همگام‌سازی وضعیت سفارشات با انبار مرکزی...')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#f2dede] text-xs text-[#524345] hover:bg-[#fff5f6] hover:text-[#884c5e] transition-colors"
                      >
                        <Icon name="sync" className="text-[16px]" />
                        به‌روزرسانی وضعیت
                      </button>
                    </div>
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex items-center gap-2 overflow-x-auto pt-4 no-scrollbar">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        activeTab === 'all'
                          ? 'bg-[#884c5e] text-white shadow-sm'
                          : 'bg-[#f7ecee] text-[#524345] hover:bg-[#eddfe1]'
                      }`}
                    >
                      همه سفارش‌ها ({orders.length})
                    </button>

                    <button
                      onClick={() => setActiveTab('processing')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        activeTab === 'processing'
                          ? 'bg-[#884c5e] text-white shadow-sm'
                          : 'bg-[#f7ecee] text-[#524345] hover:bg-[#eddfe1]'
                      }`}
                    >
                      در حال پردازش و ارسال ({orders.filter((o) => o.status === 'processing').length})
                    </button>

                    <button
                      onClick={() => setActiveTab('delivered')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        activeTab === 'delivered'
                          ? 'bg-[#884c5e] text-white shadow-sm'
                          : 'bg-[#f7ecee] text-[#524345] hover:bg-[#eddfe1]'
                      }`}
                    >
                      تحویل شده ({orders.filter((o) => o.status === 'delivered').length})
                    </button>

                    <button
                      onClick={() => setActiveTab('cancelled')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        activeTab === 'cancelled'
                          ? 'bg-[#884c5e] text-white shadow-sm'
                          : 'bg-[#f7ecee] text-[#524345] hover:bg-[#eddfe1]'
                      }`}
                    >
                      لغو شده یا مرجوعی ({orders.filter((o) => o.status === 'cancelled').length})
                    </button>
                  </div>
                </div>

                {/* Orders List Cards */}
                <div className="space-y-6">
                  {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center border border-[#f2dede]">
                      <Icon name="receipt_long" className="text-gray-300 text-5xl" />
                      <h3 className="text-base font-bold text-gray-700 mt-3">سفارشی در این وضعیت یافت نشد</h3>
                      <p className="text-xs text-gray-500 mt-1">می‌توانید از بخش محصولات آخرین کالکشن‌ها را مشاهده کنید.</p>
                      <button
                        onClick={() => setPath('/products')}
                        className="mt-4 px-6 py-2.5 rounded-xl bg-[#884c5e] text-white text-xs font-bold hover:bg-[#723b4c]"
                      >
                        مشاهده کاتالوگ محصولات
                      </button>
                    </div>
                  ) : (
                    filteredOrders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white rounded-2xl border border-[#f2dede] overflow-hidden shadow-[0_4px_20px_rgba(136,76,94,0.05)] transition-all hover:border-[#e9a0b3]"
                      >
                        {/* Order Header */}
                        <div className="bg-[#faf5f6] px-6 py-4 border-b border-[#f2dede] flex flex-wrap items-center justify-between gap-4">
                          <div className="flex flex-wrap items-center gap-4 text-xs">
                            <div className="flex items-center gap-1.5 font-bold text-[#1b1c1d]">
                              <Icon name="receipt" className="text-[#884c5e] text-[18px]" />
                              کد سفارش: <span className="font-mono text-sm text-[#884c5e]">{order.orderNumber}</span>
                            </div>
                            <span className="text-gray-300">|</span>
                            <span className="text-[#524345]">تاریخ ثبت: {order.date}</span>
                            <span className="text-gray-300">|</span>
                            <span className="text-[#524345]">
                              مبلغ کل: <strong className="text-[#1b1c1d] font-bold">{order.totalAmount.toLocaleString('fa-IR')} تومان</strong>
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            {order.status === 'processing' && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                در حال آماده‌سازی و بسته‌بندی لوکس
                              </span>
                            )}
                            {order.status === 'delivered' && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                <Icon name="check_circle" className="text-[15px] text-emerald-600" />
                                تحویل داده شده
                              </span>
                            )}
                            {order.status === 'cancelled' && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200">
                                لغو شده
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Order Delivery Status Timeline / Stepper (Stitch Visual Detail) */}
                        <div className="px-6 py-6 border-b border-[#f2dede]/70 bg-gradient-to-b from-white to-[#fffafb]">
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-xs font-bold text-[#1b1c1d] flex items-center gap-2">
                              <Icon name="timeline" className="text-[#884c5e] text-[18px]" />
                              مراحل آماده‌سازی و ارسال سفارش
                            </div>
                            {(order.estimatedDelivery || order.deliveryEstimate) && (
                              <div className="text-xs text-[#884c5e] font-semibold bg-[#fff0f2] px-3 py-1 rounded-lg border border-[#fbd4dd]">
                                موعد تحویل: {order.estimatedDelivery || order.deliveryEstimate}
                              </div>
                            )}
                          </div>

                          {/* 5-Step Visual Stepper */}
                          <div className="relative mt-6 mb-2">
                            <div className="hidden sm:block absolute top-1/2 left-4 right-4 h-0.5 bg-[#f0d8dd] -translate-y-1/2 z-0" />
                            <div
                              className="hidden sm:block absolute top-1/2 right-4 h-0.5 bg-[#884c5e] -translate-y-1/2 z-0 transition-all duration-500"
                              style={{
                                width:
                                  order.status === 'delivered'
                                    ? '95%'
                                    : order.status === 'processing'
                                    ? '55%'
                                    : '15%',
                              }}
                            />

                            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-5 gap-3">
                              {/* Step 1 */}
                              <div className="flex flex-col items-center text-center">
                                <div className="w-8 h-8 rounded-full bg-[#884c5e] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                  <Icon name="check" className="text-[16px]" />
                                </div>
                                <span className="text-[11px] font-bold text-[#1b1c1d] mt-2">ثبت سفارش</span>
                                <span className="text-[10px] text-gray-500">تایید آنلاین</span>
                              </div>

                              {/* Step 2 */}
                              <div className="flex flex-col items-center text-center">
                                <div className="w-8 h-8 rounded-full bg-[#884c5e] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                                  <Icon name="verified" className="text-[16px]" />
                                </div>
                                <span className="text-[11px] font-bold text-[#1b1c1d] mt-2">تایید مالی</span>
                                <span className="text-[10px] text-gray-500">تخصیص از انبار</span>
                              </div>

                              {/* Step 3 */}
                              <div className="flex flex-col items-center text-center">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                    order.status === 'delivered'
                                      ? 'bg-[#884c5e] text-white'
                                      : 'bg-[#ffd9e1] text-[#6b3545] ring-4 ring-[#ffe8ed] animate-pulse'
                                  }`}
                                >
                                  <Icon name="inventory_2" className="text-[16px]" />
                                </div>
                                <span className="text-[11px] font-bold text-[#884c5e] mt-2">بسته‌بندی اختصاصی</span>
                                <span className="text-[10px] text-gray-500">جعبه کادویی لومیا</span>
                              </div>

                              {/* Step 4 */}
                              <div className="flex flex-col items-center text-center">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                    order.status === 'delivered'
                                      ? 'bg-[#884c5e] text-white'
                                      : 'bg-gray-100 text-gray-400'
                                  }`}
                                >
                                  <Icon name="local_shipping" className="text-[16px]" />
                                </div>
                                <span className="text-[11px] font-medium text-gray-600 mt-2">تحویل به پیک</span>
                                <span className="text-[10px] text-gray-400">سفیر اختصاصی VIP</span>
                              </div>

                              {/* Step 5 */}
                              <div className="flex flex-col items-center text-center">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                    order.status === 'delivered'
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-gray-100 text-gray-400'
                                  }`}
                                >
                                  <Icon name="home" className="text-[16px]" />
                                </div>
                                <span className="text-[11px] font-medium text-gray-600 mt-2">تحویل به مشتری</span>
                                <span className="text-[10px] text-gray-400">امضا و رسید نهایی</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Order Items Preview */}
                        <div className="p-6">
                          <h4 className="text-xs font-bold text-[#524345] mb-4">اقلام خریداری شده در این سفارش:</h4>
                          <div className="divide-y divide-[#f2dede]/60">
                            {order.items.map((item, index) => {
                              const name = item.product?.name || item.name || 'محصول لومیا';
                              const img = item.product?.image || item.image || '';
                              const pId = item.product?.id || item.productId || '';
                              return (
                                <div key={index} className="py-3 flex items-center justify-between gap-4">
                                  <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-[#faf5f6] border border-[#f2dede] overflow-hidden flex-shrink-0">
                                      <img
                                        src={img}
                                        alt={name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <h5
                                        className="text-xs font-bold text-[#1b1c1d] hover:text-[#884c5e] transition-colors cursor-pointer"
                                        onClick={() => pId && setPath('/product/' + pId)}
                                      >
                                        {name}
                                      </h5>
                                      <p className="text-[11px] text-gray-500 mt-0.5">
                                        تعداد: <span className="font-semibold text-gray-700">{item.quantity} عدد</span>
                                      </p>
                                    </div>
                                  </div>

                                  <div className="text-left font-bold text-xs text-[#1b1c1d]">
                                    {(item.price * item.quantity).toLocaleString('fa-IR')} تومان
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Order Action Buttons */}
                        <div className="bg-[#faf5f6] px-6 py-4 border-t border-[#f2dede] flex flex-wrap items-center justify-between gap-3">
                          <div className="text-xs text-gray-500 flex items-center gap-1.5">
                            <Icon name="verified_user" className="text-[16px] text-emerald-600" />
                            گارانتی ۱۰۰٪ اصالت کالا و ۷ روز ضمانت بازگشت وجه
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenInvoice(order)}
                              className="px-4 py-2 rounded-xl border border-[#d6a9b4] text-xs font-bold text-[#884c5e] hover:bg-[#fff0f2] transition-colors flex items-center gap-1.5"
                            >
                              <Icon name="receipt_long" className="text-[16px]" />
                              مشاهده و چاپ فاکتور رسمی
                            </button>

                            {order.status === 'processing' && (
                              <button
                                onClick={() => showToast('موقعیت آنلاین سفیر لومیا: در مسیر انبار مرکزی به دفتر توزیع شمال تهران')}
                                className="px-4 py-2 rounded-xl bg-[#884c5e] text-white text-xs font-bold hover:bg-[#723b4c] transition-all flex items-center gap-1.5 shadow-sm"
                              >
                                <Icon name="near_me" className="text-[16px]" />
                                رهگیری زنده مرسوله
                              </button>
                            )}

                            {order.status === 'delivered' && (
                              <button
                                onClick={() => showToast('دیدگاه شما ثبت شد و ۵۰ امتیاز باشگاه به حسابتان اضافه گردید!')}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold hover:brightness-105 transition-all flex items-center gap-1.5"
                              >
                                <Icon name="rate_review" className="text-[16px]" />
                                ثبت نظر (+۵۰ امتیاز)
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : null}

            {/* SECTION: WISHLIST VIEW */}
            {activeSidebarNav === 'wishlist' && (
              <div className="bg-white rounded-2xl p-6 border border-[#f2dede] shadow-[0_2px_12px_rgba(136,76,94,0.04)]">
                <div className="flex items-center justify-between pb-4 border-b border-[#f2dede]">
                  <div>
                    <h2 className="text-base font-bold text-[#1b1c1d] flex items-center gap-2">
                      <Icon name="favorite" className="text-rose-500" />
                      کالاهای برگزیده و نشان‌شده
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">محصولاتی که برای خرید در آینده علامت‌گذاری کرده‌اید</p>
                  </div>
                  <span className="text-xs text-[#884c5e] font-bold">{wishlistProducts.length} کالا</span>
                </div>

                {wishlistProducts.length === 0 ? (
                  <div className="py-16 text-center">
                    <Icon name="favorite_border" className="text-gray-300 text-5xl" />
                    <h4 className="text-sm font-bold text-gray-700 mt-3">لیست علاقه‌مندی‌های شما خالی است</h4>
                    <p className="text-xs text-gray-500 mt-1">با کلیک روی آیکون قلب در محصولات، آن‌ها را به این لیست بیفزایید.</p>
                    <button
                      onClick={() => setPath('/products')}
                      className="mt-4 px-6 py-2 rounded-xl bg-[#884c5e] text-white text-xs font-bold"
                    >
                      مرور کاتالوگ فروشگاه
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pt-6">
                    {wishlistProducts.map((product) => (
                      <div
                        key={product.id}
                        className="rounded-2xl border border-[#f2dede] overflow-hidden bg-white hover:border-[#884c5e] transition-all group flex flex-col justify-between"
                      >
                        <div className="relative aspect-square overflow-hidden bg-[#faf5f6]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 text-rose-500 flex items-center justify-center hover:bg-rose-50 shadow-sm"
                            title="حذف از نشان‌شده‌ها"
                          >
                            <Icon name="favorite" className="text-[18px]" />
                          </button>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] text-[#884c5e] font-bold">{product.brand}</span>
                            <h4
                              onClick={() => setPath('/product/' + product.id)}
                              className="text-xs font-bold text-[#1b1c1d] mt-1 line-clamp-2 hover:text-[#884c5e] cursor-pointer"
                            >
                              {product.name}
                            </h4>
                          </div>

                          <div className="mt-4 pt-3 border-t border-[#f2dede] flex items-center justify-between">
                            <span className="text-xs font-bold text-[#1b1c1d]">
                              {product.price.toLocaleString('fa-IR')} ت
                            </span>
                            <button
                              onClick={() => {
                                addToCart(product);
                                showToast(`«${product.name}» به سبد خرید اضافه شد.`);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#884c5e] text-white text-xs font-bold hover:bg-[#723b4c]"
                            >
                              افزودن به سبد
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* SECTION: ADDRESSES VIEW */}
            {activeSidebarNav === 'addresses' && (
              <div className="bg-white rounded-2xl p-6 border border-[#f2dede] shadow-[0_2px_12px_rgba(136,76,94,0.04)]">
                <div className="flex items-center justify-between pb-4 border-b border-[#f2dede]">
                  <div>
                    <h2 className="text-base font-bold text-[#1b1c1d] flex items-center gap-2">
                      <Icon name="home_pin" className="text-[#884c5e]" />
                      آدرس‌های ثبت شده شما
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">مدیریت نشانی‌ها جهت ارسال سریع سفارشات با پیک و پست</p>
                  </div>

                  <button
                    onClick={() => showToast('فرم افزودن آدرس جدید باز شد.')}
                    className="px-4 py-2 rounded-xl bg-[#884c5e] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#723b4c]"
                  >
                    <Icon name="add" className="text-[16px]" />
                    ثبت نشانی جدید
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6">
                  {savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        addr.isDefault
                          ? 'border-[#884c5e] bg-[#fffafb] shadow-sm ring-1 ring-[#884c5e]/30'
                          : 'border-[#f2dede] bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-[#1b1c1d] flex items-center gap-1.5">
                          <Icon name="place" className="text-[#884c5e] text-[18px]" />
                          {addr.title}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ffd9e1] text-[#6b3545]">
                            آدرس پیش‌فرض
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#524345] leading-relaxed mb-3">{addr.address}</p>

                      <div className="text-[11px] text-gray-500 space-y-1 border-t border-[#f2dede]/70 pt-3">
                        <div className="flex justify-between">
                          <span>تحویل گیرنده:</span>
                          <span className="font-semibold text-[#1b1c1d]">{addr.recipient}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>شماره تماس:</span>
                          <span className="font-mono text-[#1b1c1d]">{addr.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>کد پستی:</span>
                          <span className="font-mono text-[#1b1c1d]">{addr.postalCode}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#f2dede]/70 flex items-center justify-end gap-3 text-xs">
                        <button
                          onClick={() => showToast('در حال ویرایش آدرس...')}
                          className="text-[#884c5e] hover:underline font-bold"
                        >
                          ویرایش نشانی
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ============================================================== */}
      {/* INVOICE MODAL (POPUP)                                          */}
      {/* ============================================================== */}
      {isInvoiceOpen && selectedOrderForInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-[#f2dede] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#f2dede]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#ffd9e1] text-[#6b3545] flex items-center justify-center font-bold">
                  LM
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1b1c1d]">فاکتور رسمی الکترونیک لومیا بیوتی</h3>
                  <p className="text-xs text-gray-500 font-mono">شماره سریال: {selectedOrderForInvoice.orderNumber}</p>
                </div>
              </div>
              <button
                onClick={() => setIsInvoiceOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>

            {/* Buyer & Seller Info */}
            <div className="grid grid-cols-2 gap-4 py-4 text-xs border-b border-[#f2dede]">
              <div>
                <span className="text-gray-400 block mb-1">فروشنده:</span>
                <span className="font-bold text-[#1b1c1d] block">فروشگاه بین‌المللی LUMÉA Beauty</span>
                <span className="text-gray-500 block text-[11px]">شناسه ملی: ۱۰۱۰۳۹۸۴۲۱ - تهران</span>
              </div>
              <div>
                <span className="text-gray-400 block mb-1">خریدار:</span>
                <span className="font-bold text-[#1b1c1d] block">فرناز کمالی</span>
                <span className="text-gray-500 block text-[11px]">تهران، خیابان ولیعصر - کد پستی: ۱۹۶۸۸۱۴۵۲۳</span>
              </div>
            </div>

            {/* Table */}
            <div className="py-4">
              <table className="w-full text-xs text-right">
                <thead>
                  <tr className="bg-[#faf5f6] text-[#524345]">
                    <th className="p-2.5 rounded-r-lg">شرح کالا</th>
                    <th className="p-2.5">تعداد</th>
                    <th className="p-2.5">قیمت واحد</th>
                    <th className="p-2.5 rounded-l-lg text-left">مبلغ کل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f2dede]/60">
                  {selectedOrderForInvoice.items.map((it: any, i: number) => (
                    <tr key={i}>
                      <td className="p-2.5 font-bold text-[#1b1c1d]">{it.product?.name || it.name || 'کالای لومیا'}</td>
                      <td className="p-2.5 font-mono">{it.quantity}</td>
                      <td className="p-2.5">{it.price.toLocaleString('fa-IR')} ت</td>
                      <td className="p-2.5 text-left font-bold font-mono">
                        {(it.price * it.quantity).toLocaleString('fa-IR')} ت
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Calculation */}
            <div className="bg-[#fff8f9] p-4 rounded-2xl border border-[#f2dede] space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>جمع کل اقلام:</span>
                <span className="font-mono">{selectedOrderForInvoice.totalAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>سود شما از تخفیف ویژه VIP:</span>
                <span>رایگان (۱۰۰٪ تحت پوشش لومیا)</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>هزینه بسته‌بندی لوکس و ارسال اختصاصی:</span>
                <span className="text-emerald-700 font-bold">رایگان</span>
              </div>
              <div className="pt-2 border-t border-[#f2dede] flex justify-between font-bold text-sm text-[#884c5e]">
                <span>مبلغ قابل پرداخت نهایی:</span>
                <span className="font-mono">{selectedOrderForInvoice.totalAmount.toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  showToast('نسخه PDF فاکتور با مهر و امضای دیجیتال دانلود شد.');
                  setIsInvoiceOpen(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#884c5e] text-white text-xs font-bold hover:bg-[#723b4c] flex items-center gap-1.5"
              >
                <Icon name="download" className="text-[16px]" />
                دریافت فایل PDF
              </button>
              <button
                onClick={() => setIsInvoiceOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-700 hover:bg-gray-50"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
