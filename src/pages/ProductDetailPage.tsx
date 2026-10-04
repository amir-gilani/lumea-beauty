import { Icon } from '../components/ui/Icon';
import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/mockData';

export const ProductDetailPage: React.FC = () => {
  const { selectedProductId, setPath, addToCart, toggleWishlist, isInWishlist, showToast } = useStore();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState(product.images[0] || product.image);
  const [selectedVolume, setSelectedVolume] = useState<number>(30);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'review' | 'ingredients' | 'usage' | 'faq'>('review');

  useEffect(() => {
    setSelectedImage(product.images[0] || product.image);
    setSelectedVolume(30);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product.id]);

  const isFavorite = isInWishlist(product.id);

  // Price calculations based on selected volume
  const is60ml = selectedVolume === 60;
  const currentPrice = is60ml ? 1420000 : (product.volumeOptions ? product.volumeOptions[0].price : product.price);
  const currentOriginalPrice = is60ml ? 1900000 : (product.originalPrice || 1100000);
  const currentSavings = currentOriginalPrice - currentPrice;

  const handleAdd = () => {
    addToCart(product, quantity, selectedVolume);
  };

  const handleAddBundle = () => {
    // Add product 1 and product 4 (HA + Niacinamide)
    addToCart(PRODUCTS[0], 1, 30);
    addToCart(PRODUCTS[4], 1, 30);
    showToast('پکیج دوگانه طلایی دی اوردینری با ۱۰٪ تخفیف مازاد به سبد خرید اضافه شد!');
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* BREADCRUMBS SECTION */}
      <div className="w-full bg-[#fff0f2]/60 border-b border-[#d6c2c5]/30 py-3.5">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin flex items-center justify-between">
          <nav aria-label="راهنمای مسیر" className="flex items-center gap-2 text-[#514346] font-label-md text-label-md overflow-x-auto no-scrollbar whitespace-nowrap">
            <button onClick={() => setPath('home')} className="hover:text-[#884c5e] transition-colors flex items-center gap-1 cursor-pointer">
              <Icon name="home" className="text-[16px]" />
              <span>خانه</span>
            </button>
            <span className="text-[#d6c2c5] select-none">/</span>
            <button onClick={() => setPath('products')} className="hover:text-[#884c5e] transition-colors cursor-pointer">
              {product.category}
            </button>
            <span className="text-[#d6c2c5] select-none">/</span>
            <span className="text-[#884c5e] font-medium truncate max-w-xs md:max-w-md">
              {product.name}
            </span>
          </nav>
          <div className="hidden md:flex items-center gap-4 text-[#514346] font-label-sm text-label-sm">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm text-[#847376]">
              <Icon name="verified_user" className="text-[16px] text-[#745a33]" />
              کد اصالت: <span className="font-bold text-[#23191c] font-mono" dir="ltr">{product.batchCode || product.code}</span>
            </span>
          </div>
        </div>
      </div>

      {/* HERO DETAIL SECTION */}
      <section className="w-full max-w-[1360px] mx-auto px-margin-mobile lg:px-margin py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* RIGHT COLUMN: PRODUCT GALLERY & VISUALS (RTL) */}
          <div className="lg:col-span-6 flex flex-col gap-5 lg:sticky lg:top-28">
            {/* Main Media Frame */}
            <div className="relative w-full aspect-square bg-white rounded-3xl overflow-hidden shadow-sm flex items-center justify-center p-6 group border border-[#d6c2c5]/30">
              {/* Badges */}
              <div className="absolute top-5 right-5 z-10 flex flex-col gap-2 items-start">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ff9cb6] text-white font-label-sm text-label-sm font-bold shadow-sm">
                  <Icon name="local_fire_department" filled={true} className="text-[16px]" />
                  {product.badge || 'پرفروش‌ترین آبرسان ۲۰۲۵'}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#884c5e] font-label-sm text-label-sm font-semibold shadow-sm">
                  <Icon name="verified" className="text-[15px] text-[#745a33]" />
                  بچ‌کد اختصاصی کانادا
                </span>
              </div>

              {/* Action Icons (Favorite & Zoom) */}
              <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="افزودن به علاقه‌مندی‌ها"
                  className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-sm text-[#23191c] hover:text-[#884c5e] flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <Icon name="favorite" filled={isFavorite} className={`text-[22px] ${isFavorite ? 'text-[#884c5e]' : ''}`} />
                </button>
                <button
                  onClick={() => showToast('نمایش کیفیت تصویر در اندازه اصلی فعال شد')}
                  aria-label="بزرگ‌نمایی عکس"
                  className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-md shadow-sm text-[#23191c] hover:text-[#884c5e] flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <Icon name="zoom_in" className="text-[22px]" />
                </button>
              </div>

              {/* Primary Image */}
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
              />

              {/* Floating Micro-Badge */}
              <div className="absolute bottom-5 inset-x-6 flex items-center justify-between pointer-events-none">
                <span className="bg-[#f2dee2]/90 text-[#514346] backdrop-blur-md px-3 py-1 rounded-full font-label-sm text-label-sm">
                  فرمولاسیون جدید بدون چسبندگی
                </span>
                <span className="bg-[#884c5e]/90 text-white backdrop-blur-md px-3 py-1 rounded-full font-label-sm text-label-sm flex items-center gap-1">
                  <Icon name="science" className="text-[14px]" />
                  ۳ وزن مولکولی HA
                </span>
              </div>
            </div>

            {/* Thumbnails Gallery Row */}
            <div className="grid grid-cols-4 gap-3 lg:gap-4">
              {product.images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`aspect-square rounded-2xl bg-white p-1.5 shadow-sm transition-all overflow-hidden cursor-pointer ${
                    selectedImage === imgUrl ? 'ring-2 ring-[#884c5e] opacity-100' : 'opacity-70 hover:opacity-100 border border-[#d6c2c5]/30'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`تصویر شماره ${idx + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </button>
              ))}
            </div>

            {/* Authenticity Batch Verifier Pill */}
            <div className="bg-[#fff0f2] rounded-2xl p-4 flex items-center justify-between gap-4 border border-[#d6c2c5]/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffd9e1] flex items-center justify-center text-[#370a1b]">
                  <Icon name="qr_code_scanner" className="text-[22px]" />
                </div>
                <div>
                  <p className="font-label-md text-label-md text-[#23191c] font-semibold">استعلام اصالت با بچ‌کد کمپانی DECIEM</p>
                  <p className="font-label-sm text-label-sm text-[#514346]">واردات مستقیم با فاکتور رسمی از اتحادیه اروپا و کانادا</p>
                </div>
              </div>
              <button
                onClick={() => showToast(`اصالت بچ‌کد ${product.batchCode || 'CAN-89210-ORD'} در پایگاه داده DECIEM تایید شد.`)}
                className="px-3.5 py-1.5 rounded-full bg-white text-[#884c5e] hover:bg-[#884c5e] hover:text-white font-label-sm text-label-sm font-semibold transition-all shadow-sm cursor-pointer shrink-0"
              >
                بررسی بارکد
              </button>
            </div>
          </div>

          {/* LEFT COLUMN: BUY BOX & PRODUCT DETAILS (RTL) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Brand & Title Block */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setPath('products', { brand: product.brand })}
                  className="inline-flex items-center gap-1.5 text-[#884c5e] font-title text-title font-bold tracking-wide hover:underline cursor-pointer"
                >
                  <span>{product.brand.toUpperCase()}</span>
                  <Icon name="verified" filled={true} className="text-[16px] text-[#745a33]" />
                </button>
                <span className="text-[#514346] font-label-sm text-label-sm bg-[#f7e3e7] px-2.5 py-0.5 rounded-md font-medium">
                  ساخت {product.originCountry}
                </span>
              </div>
              <h1 className="font-headline-md lg:font-headline-lg text-headline-md lg:text-headline-lg text-[#23191c] font-bold leading-snug">
                {product.name}
              </h1>
              <p className="font-body-md text-body-md text-[#514346] font-en text-right" dir="ltr">
                {product.nameEn}
              </p>
            </div>

            {/* Rating & Social Validation */}
            <div className="flex flex-wrap items-center gap-4 bg-white/80 p-3.5 rounded-2xl shadow-sm border border-[#d6c2c5]/30">
              <div className="flex items-center gap-1 text-[#745a33]">
                {[...Array(5)].map((_, i) => (
                  <Icon name="star" key={i} filled={true} className="text-[20px]" />
                ))}
                <span className="font-title text-title text-[#23191c] font-bold mr-1">{product.rating}</span>
              </div>
              <span className="h-4 w-[1px] bg-[#d6c2c5]"></span>
              <a href="#reviews-section" className="font-label-md text-label-md text-[#884c5e] hover:underline">
                ({product.reviewCount} نظر تاییدشده خریداران)
              </a>
              <span className="h-4 w-[1px] bg-[#d6c2c5]"></span>
              <span className="inline-flex items-center gap-1 font-label-md text-label-md text-[#94445c] font-medium">
                <Icon name="thumb_up" className="text-[16px]" />
                ۹۸٪ رضایت خریداران
              </span>
            </div>

            {/* Key Formula Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-[#fff0f2] text-[#514346]">
                  <Icon name={idx === 0 ? 'water_drop' : idx === 1 ? 'shield' : idx === 2 ? 'spa' : 'eco'} className="text-[#884c5e] text-[20px]" />
                  <span className="font-label-md text-label-md font-medium">{feat}</span>
                </div>
              ))}
            </div>

            {/* Pricing Block */}
            <div className="bg-white p-6 rounded-3xl shadow-sm space-y-4 border border-[#d6c2c5]/30">
              <div className="flex items-baseline justify-between flex-wrap gap-2">
                <div className="space-y-1">
                  <span className="font-label-md text-label-md text-[#847376] line-through block">
                    {currentOriginalPrice.toLocaleString('fa-IR')} تومان
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-headline-lg text-headline-lg text-[#884c5e] font-bold">
                      {currentPrice.toLocaleString('fa-IR')}
                    </span>
                    <span className="font-title text-title text-[#23191c] font-medium">تومان</span>
                    <span className="px-2.5 py-1 rounded-full bg-[#94445c] text-white font-label-md text-label-md font-bold">
                      ۲۴٪ تخفیف
                    </span>
                  </div>
                </div>
                <div className="text-left bg-[#f7e3e7] px-3 py-1.5 rounded-xl">
                  <span className="block font-label-sm text-label-sm text-[#7a2f47]">سود شما از این خرید:</span>
                  <span className="font-title text-title text-[#94445c] font-bold">
                    {currentSavings.toLocaleString('fa-IR')} تومان
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[#745a33] font-label-md text-label-md pt-2 border-t border-[#d6c2c5]/30">
                <Icon name="inventory_2" className="text-[18px]" />
                <span>موجود در انبار لومیا بیوتی — آماده ارسال امروز با پیک اکسپرس</span>
              </div>
            </div>

            {/* Volume Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-title text-title text-[#23191c] font-semibold">حجم محصول:</span>
                <span className="font-label-md text-label-md text-[#514346]">
                  {is60ml ? '۶۰ میلی‌لیتر (ارزش خرید بالا)' : '۳۰ میلی‌لیتر (سایز استاندارد)'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  onClick={() => setSelectedVolume(30)}
                  className={`flex items-center justify-between p-4 rounded-2xl bg-white shadow-sm text-right transition-all cursor-pointer ${
                    !is60ml ? 'ring-2 ring-[#884c5e]' : 'hover:bg-[#fff0f2] border border-[#d6c2c5]/30'
                  }`}
                >
                  <div>
                    <span className="font-title text-title text-[#23191c] font-bold block">۳۰ میلی‌لیتر</span>
                    <span className="font-label-sm text-label-sm text-[#514346]">دوره مصرف ۴۵ روزه</span>
                  </div>
                  <span className="font-label-md text-label-md text-[#884c5e] font-semibold">۸۴۰,۰۰۰ تومان</span>
                </button>

                <button
                  onClick={() => setSelectedVolume(60)}
                  className={`flex items-center justify-between p-4 rounded-2xl bg-white shadow-sm text-right transition-all cursor-pointer ${
                    is60ml ? 'ring-2 ring-[#884c5e]' : 'hover:bg-[#fff0f2] border border-[#d6c2c5]/30'
                  }`}
                >
                  <div>
                    <span className="font-title text-title text-[#23191c] font-bold flex items-center gap-1.5">
                      ۶۰ میلی‌لیتر
                      <span className="bg-[#ffddb1] text-[#291800] font-label-sm text-label-sm px-1.5 py-0.5 rounded text-[10px]">
                        به‌صرفه‌تر
                      </span>
                    </span>
                    <span className="font-label-sm text-label-sm text-[#514346]">دوره مصرف ۹۰ روزه</span>
                  </div>
                  <span className="font-label-md text-label-md text-[#23191c] font-semibold">۱,۴۲۰,۰۰۰ تومان</span>
                </button>
              </div>
            </div>

            {/* Add To Cart & Quantity Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Stepper */}
              <div className="flex items-center justify-between bg-white rounded-full p-1.5 shadow-sm sm:w-36 shrink-0 border border-[#d6c2c5]/30">
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="افزایش تعداد"
                  className="w-10 h-10 rounded-full bg-[#fff0f2] hover:bg-[#fde9ed] text-[#23191c] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Icon name="add" className="text-[18px]" />
                </button>
                <span className="font-title text-title font-bold text-[#23191c] px-2">
                  {quantity.toLocaleString('fa-IR')}
                </span>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="کاهش تعداد"
                  className="w-10 h-10 rounded-full bg-[#fff0f2] hover:bg-[#fde9ed] text-[#23191c] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Icon name="remove" className="text-[18px]" />
                </button>
              </div>

              {/* Main CTA */}
              <button
                onClick={handleAdd}
                className="flex-1 h-14 rounded-full bg-[#884c5e] hover:bg-[#94445c] text-white font-title text-title font-bold shadow-lg shadow-[#884c5e]/20 flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-98 cursor-pointer"
              >
                <Icon name="shopping_bag" className="text-[22px]" />
                <span>افزودن به سبد خرید</span>
              </button>
            </div>

            {/* Free Delivery Banner */}
            <div className="p-4 rounded-2xl bg-[#f7e3e7]/60 flex items-center gap-3 border border-[#d6c2c5]/30">
              <Icon name="local_shipping" className="text-[#94445c] text-[24px]" />
              <p className="font-body-md text-body-md text-[#514346]">
                ارسال رایگان این محصول با سفارش بالای ۱ میلیون تومان به تمام نقاط ایران با بسته‌بندی لوکس محافظت‌شده.
              </p>
            </div>

            {/* 4-Pillar Trust Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="bg-white p-3.5 rounded-2xl text-center shadow-sm space-y-1 border border-[#d6c2c5]/30">
                <Icon name="verified" className="text-[#884c5e] text-[24px]" />
                <p className="font-label-md text-label-md font-semibold text-[#23191c]">ضمانت ۱۰۰٪ اصالت</p>
                <p className="font-label-sm text-label-sm text-[#847376]">امکان استعلام بچ‌کد</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl text-center shadow-sm space-y-1 border border-[#d6c2c5]/30">
                <Icon name="rocket_launch" className="text-[#884c5e] text-[24px]" />
                <p className="font-label-md text-label-md font-semibold text-[#23191c]">ارسال فوری</p>
                <p className="font-label-sm text-label-sm text-[#847376]">تحویل ۳ ساعته در تهران</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl text-center shadow-sm space-y-1 border border-[#d6c2c5]/30">
                <Icon name="cached" className="text-[#884c5e] text-[24px]" />
                <p className="font-label-md text-label-md font-semibold text-[#23191c]">۷ روز ضمانت بازگشت</p>
                <p className="font-label-sm text-label-sm text-[#847376]">در صورت هرگونه مغایرت</p>
              </div>
              <div className="bg-white p-3.5 rounded-2xl text-center shadow-sm space-y-1 border border-[#d6c2c5]/30">
                <Icon name="support_agent" className="text-[#884c5e] text-[24px]" />
                <p className="font-label-md text-label-md font-semibold text-[#23191c]">مشاوره پوستی</p>
                <p className="font-label-sm text-label-sm text-[#847376]">راهنمایی بیوتی‌تراپیست</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLINICAL STUDY & METRICS SECTION */}
      <section className="w-full bg-white py-16 border-y border-[#d6c2c5]/30">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-label-md text-label-md text-[#884c5e] font-bold uppercase tracking-wider">
              نتایج کلینیکی تاییدشده
            </span>
            <h2 className="font-headline-lg text-headline-lg text-[#23191c] font-bold">
              اثربخشی اثبات‌شده در لابراتوارهای تخصصی
            </h2>
            <p className="font-body-lg text-body-lg text-[#514346]">
              بررسی نتایج آزمایشگاهی بر روی ۱۲۰ داوطلب با پوست‌های مختلف پس از ۲ هفته استفاده روزانه مداوم
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Metric Card 1 */}
            <div className="bg-[#fff0f2] rounded-3xl p-8 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#d6c2c5]/30"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-[#884c5e] transition-all duration-1000"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="94, 100"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
                <span className="absolute font-headline-lg text-headline-lg font-bold text-[#884c5e]">۹۴٪</span>
              </div>
              <h3 className="font-title text-title font-bold text-[#23191c]">افزایش ماندگار رطوبت سلولی</h3>
              <p className="font-body-md text-body-md text-[#514346]">
                نفوذ اسید هیالورونیک به لایه‌های اپیدرم عمقی و ایجاد شادابی پایدار در تمام طول شبانه‌روز.
              </p>
            </div>

            {/* Metric Card 2 */}
            <div className="bg-[#fff0f2] rounded-3xl p-8 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#d6c2c5]/30"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-[#94445c] transition-all duration-1000"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="89, 100"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
                <span className="absolute font-headline-lg text-headline-lg font-bold text-[#94445c]">۸۹٪</span>
              </div>
              <h3 className="font-title text-title font-bold text-[#23191c]">بهبود نرمی، بافت و انعطاف‌پذیری</h3>
              <p className="font-body-md text-body-md text-[#514346]">
                کاهش خطوط ریز ناشی از بی‌آبی (دهیدراتاسیون) و نرم‌شدن سطح خشن پوست.
              </p>
            </div>

            {/* Metric Card 3 */}
            <div className="bg-[#fff0f2] rounded-3xl p-8 text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#d6c2c5]/30"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="text-[#745a33] transition-all duration-1000"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="91, 100"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
                <span className="absolute font-headline-lg text-headline-lg font-bold text-[#745a33]">۹۱٪</span>
              </div>
              <h3 className="font-title text-title font-bold text-[#23191c]">تقویت سد دفاعی و جلوگیری از خشکی</h3>
              <p className="font-body-md text-body-md text-[#514346]">
                حفاظت در برابر استرس‌های محیطی، آلودگی شهری و کاهش قرمزی‌های فصلی پوست.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE SPECIFICATION TABS */}
      <section className="w-full max-w-[1360px] mx-auto px-margin-mobile lg:px-margin py-12 lg:py-16">
        <div className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm space-y-8 border border-[#d6c2c5]/30">
          {/* Tab Bar Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-[#d6c2c5]/30 pb-4">
            <button
              onClick={() => setActiveTab('review')}
              className={`px-5 py-2.5 rounded-full font-title text-title font-semibold transition-all cursor-pointer ${
                activeTab === 'review'
                  ? 'bg-[#884c5e] text-white shadow-sm'
                  : 'text-[#514346] hover:text-[#884c5e]'
              }`}
            >
              نقد و بررسی تخصصی
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`px-5 py-2.5 rounded-full font-title text-title font-semibold transition-all cursor-pointer ${
                activeTab === 'ingredients'
                  ? 'bg-[#884c5e] text-white shadow-sm'
                  : 'text-[#514346] hover:text-[#884c5e]'
              }`}
            >
              ترکیبات فعال و فرمولاسیون
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`px-5 py-2.5 rounded-full font-title text-title font-semibold transition-all cursor-pointer ${
                activeTab === 'usage'
                  ? 'bg-[#884c5e] text-white shadow-sm'
                  : 'text-[#514346] hover:text-[#884c5e]'
              }`}
            >
              نحوه استفاده در روتین
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-5 py-2.5 rounded-full font-title text-title font-semibold transition-all cursor-pointer ${
                activeTab === 'faq'
                  ? 'bg-[#884c5e] text-white shadow-sm'
                  : 'text-[#514346] hover:text-[#884c5e]'
              }`}
            >
              پرسش‌های متداول خریداران
            </button>
          </div>

          {/* Tab 1: Review */}
          {activeTab === 'review' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4 text-[#23191c]">
                  <h3 className="font-headline-sm text-headline-sm font-bold text-[#884c5e]">
                    معجزه آبرسانی با وزن‌های مولکولی چندگانه
                  </h3>
                  <p className="font-body-lg text-body-lg text-[#514346] leading-relaxed text-justify">
                    سرم هیالورونیک اسید ۲٪ به همراه ویتامین B5 برند کانادایی The Ordinary یکی از تحسین‌شده‌ترین محصولات تاریخ مراقبت از پوست جهان است. بر خلاف سرم‌های ارزان‌قیمت که تنها حاوی یک وزن مولکولی از هیالورونیک اسید هستند و روی لایه سطحی پوست باقی می‌مانند، این فرمولاسیون انقلابی از سه نوع هیالورونیک اسید با وزن‌های مولکولی کم، متوسط و بالا بهره می‌برد.
                  </p>
                  <p className="font-body-lg text-body-lg text-[#514346] leading-relaxed text-justify">
                    وزن مولکولی بالا رطوبت را در سطح اپیدرم نگه داشته و درخششی مخملی ایجاد می‌کند، در حالی که مولکول‌های ریزتر به عمق منافذ و بافت پوستی نفوذ کرده و سلول‌ها را از درون پرآب می‌سازند. حضور پروویتامین B5 (پانتنول) به عنوان یک تسکین‌دهنده طبیعی، فرایند ترمیم بافت پوست و بازسازی چربی‌های مفید دفاعی را به بالاترین سطح ممکن می‌رساند.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-[#fff0f2]">
                      <span className="font-title text-title font-bold text-[#23191c] block">نوع بافت:</span>
                      <span className="font-body-md text-body-md text-[#514346]">ژل-سرم سبک و زلال آب‌رسان</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#fff0f2]">
                      <span className="font-title text-title font-bold text-[#23191c] block">زمان جذب:</span>
                      <span className="font-body-md text-body-md text-[#514346]">زیر ۳۰ ثانیه بدون چسبندگی</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#fff0f2]">
                      <span className="font-title text-title font-bold text-[#23191c] block">مناسب برای:</span>
                      <span className="font-body-md text-body-md text-[#514346]">پوست‌های خشک، چرب، کدر یا دهیدراته</span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 rounded-2xl overflow-hidden bg-[#fff0f2] p-4 text-center">
                  <img
                    alt="Detailed dropper texture"
                    className="w-full h-64 object-cover rounded-xl shadow-sm mb-4"
                    src="/images/products/ordinary-texture.jpg"
                  />
                  <p className="font-label-sm text-label-sm text-[#847376]">
                    بافت ژلی کریستالی بدون ایجاد پیلینگ زیر کرم‌پودر
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Ingredients */}
          {activeTab === 'ingredients' && (
            <div className="space-y-6">
              <h3 className="font-headline-sm text-headline-sm font-bold text-[#884c5e]">
                شناسنامه فرمولاسیون و ترکیبات کلیدی
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#fff0f2] space-y-2">
                  <div className="flex items-center gap-2 text-[#884c5e] font-title text-title font-bold">
                    <Icon name="water_drop" className="" />
                    <span className="font-en">Sodium Hyaluronate</span>
                  </div>
                  <p className="font-body-md text-body-md text-[#514346]">
                    پلیمر پیشرفته هیالورونیک اسید متقاطع که تا ۵ برابر بیشتر از هیالورونیک اسید ساده آب را درون بافت نگه می‌دارد.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#fff0f2] space-y-2">
                  <div className="flex items-center gap-2 text-[#884c5e] font-title text-title font-bold">
                    <Icon name="medication" className="" />
                    <span className="font-en">Panthenol (B5)</span>
                  </div>
                  <p className="font-body-md text-body-md text-[#514346]">
                    ویتامین B5 بازسازی‌کننده خطوط، تسکین‌دهنده التهابات سطحی و التیام‌بخش تحریکات بعد از شستشوی صورت.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#fff0f2] space-y-2">
                  <div className="flex items-center gap-2 text-[#884c5e] font-title text-title font-bold">
                    <Icon name="forest" className="" />
                    <span className="font-en">Ahnfeltia Concinna</span>
                  </div>
                  <p className="font-body-md text-body-md text-[#514346]">
                    عصاره جلبک قرمز طبیعی هاوایی غنی از مواد معدنی که باعث الاستیسیته و تقویت چرخه سلولی می‌گردد.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#f7e3e7]/50 font-body-md text-body-md text-[#514346] leading-relaxed">
                <strong className="text-[#23191c] block mb-1">فهرست کامل ترکیبات (INCI):</strong>
                Aqua (Water), Sodium Hyaluronate, Pentylene Glycol, Propanediol, Sodium Hyaluronate Crosspolymer, Panthenol, Ahnfeltia Concinna Extract, Glycerin, Trisodium Ethylenediamine Disuccinate, Citric Acid, Isoceteth-20, Ethoxydiglycol, Ethylhexylglycerin, Hexylene Glycol, 1,2-Hexanediol, Phenoxyethanol, Caprylyl Glycol.
              </div>
            </div>
          )}

          {/* Tab 3: Usage */}
          {activeTab === 'usage' && (
            <div className="space-y-6">
              <h3 className="font-headline-sm text-headline-sm font-bold text-[#884c5e]">
                چگونه این سرم را در روتین روز و شب قرار دهیم؟
              </h3>
              <p className="font-body-lg text-body-lg text-[#514346]">
                برای کسب حداکثر اثربخشی از هیالورونیک اسید، رعایت قانون طلایی پوست مرطوب الزامی است:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#fff0f2] relative space-y-3">
                  <span className="w-8 h-8 rounded-full bg-[#884c5e] text-white flex items-center justify-center font-bold text-title">۱</span>
                  <h4 className="font-title text-title font-bold text-[#23191c]">پاک‌سازی پوست</h4>
                  <p className="font-body-md text-body-md text-[#514346]">صورت خود را با ژل شستشوی ملایم شسته و تمیز کنید.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#f7e3e7] relative space-y-3">
                  <span className="w-8 h-8 rounded-full bg-[#94445c] text-white flex items-center justify-center font-bold text-title">۲</span>
                  <h4 className="font-title text-title font-bold text-[#23191c]">پوست نمدار (حیاتی)</h4>
                  <p className="font-body-md text-body-md text-[#514346]">پوست را کاملا خشک نکنید. ۲ الی ۳ قطره از سرم را روی صورت مرطوب ماساژ دهید.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#fff0f2] relative space-y-3">
                  <span className="w-8 h-8 rounded-full bg-[#884c5e] text-white flex items-center justify-center font-bold text-title">۳</span>
                  <h4 className="font-title text-title font-bold text-[#23191c]">قفل رطوبت</h4>
                  <p className="font-body-md text-body-md text-[#514346]">حتماً از یک کرم مرطوب‌کننده برای حبس شدن رطوبت درون منافذ استفاده کنید.</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#fff0f2] relative space-y-3">
                  <span className="w-8 h-8 rounded-full bg-[#884c5e] text-white flex items-center justify-center font-bold text-title">۴</span>
                  <h4 className="font-title text-title font-bold text-[#23191c]">ضدآفتاب (روزانه)</h4>
                  <p className="font-body-md text-body-md text-[#514346]">در روتین صبح در آخرین مرحله از ضدآفتاب طیف گسترده با SPF بالای ۳۰ بهره ببرید.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <h3 className="font-headline-sm text-headline-sm font-bold text-[#884c5e]">پرسش‌های پرتکرار مشتریان</h3>
              <div className="space-y-3">
                <details className="bg-[#fff0f2] rounded-2xl p-4 cursor-pointer group" open>
                  <summary className="font-title text-title font-bold text-[#23191c] flex items-center justify-between">
                    <span>آیا این سرم باعث جوش یا مسدود شدن منافذ می‌شود؟</span>
                    <Icon name="expand_more" className="text-[#884c5e] group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="font-body-md text-body-md text-[#514346] pt-3 leading-relaxed">
                    خیر؛ این محصول کاملاً فاقد چربی (Oil-Free) و غیرکومدون‌زا (Non-Comedogenic) است و پایه آب دارد، بنابراین حتی برای پوست‌های مستعد آکنه نیز بسیار ایده‌آل است.
                  </p>
                </details>
                <details className="bg-[#fff0f2] rounded-2xl p-4 cursor-pointer group">
                  <summary className="font-title text-title font-bold text-[#23191c] flex items-center justify-between">
                    <span>آیا می‌توان همزمان با سرم نیاسینامید یا ویتامین C استفاده کرد؟</span>
                    <Icon name="expand_more" className="text-[#884c5e] group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="font-body-md text-body-md text-[#514346] pt-3 leading-relaxed">
                    بله! هیالورونیک اسید هیچ‌گونه تداخل با نیاسینامید، ویتامین C، رتینول یا اسیدهای لایه‌بردار ندارد و به عنوان یک آبرسان پایه‌ای، جذب سایر محصولات درمانی را آسان‌تر می‌سازد.
                  </p>
                </details>
                <details className="bg-[#fff0f2] rounded-2xl p-4 cursor-pointer group">
                  <summary className="font-title text-title font-bold text-[#23191c] flex items-center justify-between">
                    <span>چرا گاهی بعد از استفاده احساس چسبندگی ایجاد می‌شود؟</span>
                    <Icon name="expand_more" className="text-[#884c5e] group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="font-body-md text-body-md text-[#514346] pt-3 leading-relaxed">
                    احساس چسبندگی زمانی رخ می‌دهد که سرم را روی پوست کاملاً خشک بزنید یا مقدار زیادی (بیش از ۳ قطره) استفاده کنید. کافیست پوست را مرطوب نگه داشته و بلافاصله کرم مرطوب‌کننده خود را اعمال کنید.
                  </p>
                </details>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ROUTINE BUNDLE SECTION (COMPLETE THE REGIMEN) */}
      <section className="w-full bg-[#fff0f2] py-16 border-t border-[#d6c2c5]/30">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-md text-label-md text-[#884c5e] font-bold">روتین هم‌افزا</span>
              <h2 className="font-headline-lg text-headline-lg text-[#23191c] font-bold">
                محصولات مکمل برای روتین درخشش شیشه‌ای (Glass Skin)
              </h2>
            </div>
            <p className="font-body-md text-body-md text-[#514346] max-w-md">
              ترکیب پیشنهادی متخصصان لومیا برای کنترل چربی، بستن منافذ و آبرسانی فوق‌العاده در طول روز
            </p>
          </div>

          {/* 4 Cross-sells Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.slice(1, 5).map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl p-4 flex flex-col justify-between shadow-sm hover:-translate-y-1 transition-all duration-300 group border border-[#d6c2c5]/30"
              >
                <div>
                  <div
                    onClick={() => setPath('product-detail', { productId: p.id })}
                    className="relative aspect-square rounded-2xl bg-[#fff0f2] overflow-hidden mb-4 p-2 flex items-center justify-center cursor-pointer"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#884c5e] font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold">
                      مکمل روتین
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-[#847376] block">{p.brand}</span>
                  <h3
                    onClick={() => setPath('product-detail', { productId: p.id })}
                    className="font-title text-title font-bold text-[#23191c] line-clamp-1 group-hover:text-[#884c5e] transition-colors cursor-pointer"
                  >
                    {p.name}
                  </h3>
                  <p className="font-body-md text-body-md text-[#514346] line-clamp-2 mt-1">
                    {p.shortDescription}
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-[#d6c2c5]/30 mt-4">
                  <span className="font-title text-title font-bold text-[#884c5e]">
                    {p.price.toLocaleString('fa-IR')} تومان
                  </span>
                  <button
                    onClick={() => addToCart(p)}
                    className="w-9 h-9 rounded-full bg-[#f7e3e7] hover:bg-[#884c5e] hover:text-white text-[#23191c] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Icon name="add_shopping_cart" className="text-[18px]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bundle Discount Promo Bar */}
          <div className="bg-gradient-to-r from-[#fde9ed] to-[#f7e3e7] p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-4 border border-[#d6c2c5]/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#884c5e] text-white flex items-center justify-center shrink-0">
                <Icon name="loyalty" className="text-[26px]" />
              </div>
              <div>
                <h4 className="font-title text-title font-bold text-[#23191c]">
                  خرید همزمان سرم هیالورونیک اسید + سرم نیاسینامید با ۱۰٪ تخفیف مازاد
                </h4>
                <p className="font-body-md text-body-md text-[#514346]">
                  ست طلایی دوتایی دی اوردینری برای آب‌رسانی و پاکسازی منافذ پوست در یک پکیج شکیل لومیا.
                </p>
              </div>
            </div>
            <button
              onClick={handleAddBundle}
              className="px-6 py-3 rounded-full bg-[#23191c] text-[#fff8f8] font-title text-title font-semibold hover:bg-[#884c5e] transition-colors shadow-md whitespace-nowrap cursor-pointer active:scale-95"
            >
              افزودن پکیج دوگانه (۱,۴۵۸,۰۰۰ تومان)
            </button>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS & RATINGS SECTION */}
      <section className="w-full max-w-[1360px] mx-auto px-margin-mobile lg:px-margin py-16" id="reviews-section">
        <div className="space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 lg:p-10 rounded-3xl shadow-sm border border-[#d6c2c5]/30">
            <div className="lg:col-span-4 text-center lg:text-right border-b lg:border-b-0 lg:border-l border-[#d6c2c5]/30 pb-6 lg:pb-0 lg:pl-8 space-y-2">
              <span className="font-display text-display font-bold text-[#884c5e] block leading-none">
                {product.rating}
              </span>
              <div className="flex items-center justify-center lg:justify-start gap-1 text-[#745a33]">
                {[...Array(5)].map((_, i) => (
                  <Icon name="star" key={i} filled={true} className="text-[24px]" />
                ))}
              </div>
              <p className="font-body-md text-body-md text-[#514346]">
                بر اساس {product.reviewCount} دیدگاه تاییدشده کاربران
              </p>
              <div className="pt-3">
                <button
                  onClick={() => showToast('فرم ثبت نظر برای خریداران این کالا باز شد.')}
                  className="px-5 py-2.5 rounded-full bg-[#ffd9e1] text-[#370a1b] font-title text-title font-semibold hover:bg-[#884c5e] hover:text-white transition-colors cursor-pointer"
                >
                  ثبت تجربه و نظر شما
                </button>
              </div>
            </div>

            {/* Rating Histogram */}
            <div className="lg:col-span-8 space-y-2.5">
              <div className="flex items-center gap-3">
                <span className="font-label-md text-label-md text-[#23191c] w-12">۵ ستاره</span>
                <div className="flex-1 h-3 rounded-full bg-[#fde9ed] overflow-hidden">
                  <div className="h-full bg-[#884c5e] rounded-full" style={{ width: '88%' }}></div>
                </div>
                <span className="font-label-md text-label-md text-[#514346] w-10 text-left">۸۸٪</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-label-md text-label-md text-[#23191c] w-12">۴ ستاره</span>
                <div className="flex-1 h-3 rounded-full bg-[#fde9ed] overflow-hidden">
                  <div className="h-full bg-[#e9a0b3] rounded-full" style={{ width: '9%' }}></div>
                </div>
                <span className="font-label-md text-label-md text-[#514346] w-10 text-left">۹٪</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-label-md text-label-md text-[#23191c] w-12">۳ ستاره</span>
                <div className="flex-1 h-3 rounded-full bg-[#fde9ed] overflow-hidden">
                  <div className="h-full bg-[#d1af81] rounded-full" style={{ width: '2%' }}></div>
                </div>
                <span className="font-label-md text-label-md text-[#514346] w-10 text-left">۲٪</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-label-md text-label-md text-[#23191c] w-12">۲ ستاره</span>
                <div className="flex-1 h-3 rounded-full bg-[#fde9ed] overflow-hidden">
                  <div className="h-full bg-[#d6c2c5] rounded-full" style={{ width: '1%' }}></div>
                </div>
                <span className="font-label-md text-label-md text-[#514346] w-10 text-left">۱٪</span>
              </div>
            </div>
          </div>

          {/* User Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm space-y-4 border border-[#d6c2c5]/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#ffd9e1] flex items-center justify-center font-bold text-[#370a1b]">
                    س‌ر
                  </div>
                  <div>
                    <h4 className="font-title text-title font-bold text-[#23191c]">سارا رستمی</h4>
                    <div className="flex items-center gap-1 text-[#745a33]">
                      {[...Array(5)].map((_, i) => (
                        <Icon name="star" key={i} filled={true} className="text-[16px]" />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-[#847376]">۳ روز پیش</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#fde9ed] font-label-sm text-label-sm text-[#514346]">خریدار تاییدشده لومیا</span>
                <span className="px-2.5 py-0.5 rounded-md bg-[#ffd9e0] font-label-sm text-label-sm text-[#3f011a]">پوست دهیدراته و حساس</span>
              </div>
              <p className="font-body-md text-body-md text-[#514346] leading-relaxed">
                بچ‌کد محصول رو در سایت CheckFresh چک کردم و با تاریخ تولید کاملاً جدید مطابقت داشت. بعد از شستن صورتم روی پوست کمی خیس می‌زنم و روش مرطوب‌کننده می‌کشم. تمام پوسته‌پوسته‌های کناره‌های بینیم کاملاً از بین رفته و آرایش خیلی تمیز می‌شینه.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm space-y-4 border border-[#d6c2c5]/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#ffddb1] flex items-center justify-center font-bold text-[#291800]">
                    ن‌م
                  </div>
                  <div>
                    <h4 className="font-title text-title font-bold text-[#23191c]">نیلوفر معتمدی</h4>
                    <div className="flex items-center gap-1 text-[#745a33]">
                      {[...Array(5)].map((_, i) => (
                        <Icon name="star" key={i} filled={true} className="text-[16px]" />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-[#847376]">۱ هفته پیش</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#fde9ed] font-label-sm text-label-sm text-[#514346]">خریدار تاییدشده لومیا</span>
                <span className="px-2.5 py-0.5 rounded-md bg-[#ffd9e0] font-label-sm text-label-sm text-[#3f011a]">پوست مختلط و چرب</span>
              </div>
              <p className="font-body-md text-body-md text-[#514346] leading-relaxed">
                فرمول جدید اصلاً حالت صابونی یا چسبنده نداره. جذبش فوق‌العاده بالاست و مهم‌ترین نکته اینه که کوچک‌ترین جوشی باهاش نزدم. بسته‌بندی لومیا بیوتی هم واقعاً برازنده یک فروشگاه معتبر بود.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY MOBILE QUICK-BUY FLOATING ACTION BAR */}
      <div className="fixed bottom-16 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#d6c2c5]/30 py-3 px-4 shadow-2xl md:hidden flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            alt={product.name}
            className="w-11 h-11 rounded-xl object-contain bg-[#fff0f2] p-1"
            src={product.image}
          />
          <div>
            <span className="font-label-sm text-label-sm text-[#23191c] font-bold block truncate max-w-[150px]">
              {product.name}
            </span>
            <span className="font-title text-title text-[#884c5e] font-bold">
              {currentPrice.toLocaleString('fa-IR')} تومان
            </span>
          </div>
        </div>
        <button
          onClick={handleAdd}
          className="px-5 py-2.5 rounded-full bg-[#884c5e] text-white font-title text-title font-bold flex items-center gap-2 shadow-md cursor-pointer active:scale-95"
        >
          <Icon name="shopping_bag" className="text-[18px]" />
          <span>خرید سریع</span>
        </button>
      </div>
    </div>
  );
};
