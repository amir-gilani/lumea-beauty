import { Icon } from '../components/ui/Icon';
import React, { useState, useMemo } from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS, CATEGORIES } from '../data/mockData';

export const ProductsCatalogPage: React.FC = () => {
  const {
    setPath,
    addToCart,
    toggleWishlist,
    isInWishlist,
    searchQuery,
    setSearchQuery,
    selectedCategorySlug,
    selectedBrand,
    openQuiz,
  } = useStore();

  const [activeCategory, setActiveCategory] = useState<string | null>(selectedCategorySlug || null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    selectedBrand ? [selectedBrand] : ['The Ordinary', 'Charlotte Tilbury', 'Rare Beauty', 'DIOR', 'NARS', 'CeraVe']
  );
  const [maxPrice, setMaxPrice] = useState<number>(3500000);
  const [selectedSkinType, setSelectedSkinType] = useState<string | null>(null);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(true);
  const [onlyDiscounted, setOnlyDiscounted] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popular' | 'bestselling' | 'newest' | 'cheapest' | 'expensive' | 'discount'>('popular');
  const [isListView, setIsListView] = useState<boolean>(false);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.includes(q) ||
          p.description.includes(q)
      );
    }

    if (activeCategory) {
      list = list.filter((p) => p.categorySlug === activeCategory);
    }

    if (selectedBrands.length > 0) {
      list = list.filter((p) =>
        selectedBrands.some((b) => p.brand.toLowerCase().includes(b.toLowerCase()))
      );
    }

    if (maxPrice) {
      list = list.filter((p) => p.price <= maxPrice);
    }

    if (selectedSkinType) {
      list = list.filter((p) => p.skinTypes.includes(selectedSkinType));
    }

    if (onlyInStock) {
      list = list.filter((p) => p.inStock);
    }

    if (onlyDiscounted) {
      list = list.filter((p) => (p.discountPercent || 0) > 0);
    }

    // Sort
    if (sortBy === 'cheapest') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'expensive') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'discount') {
      list.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    } else if (sortBy === 'popular') {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      list.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return list;
  }, [
    searchQuery,
    activeCategory,
    selectedBrands,
    maxPrice,
    selectedSkinType,
    onlyInStock,
    onlyDiscounted,
    sortBy,
  ]);

  const handleBrandToggle = (brandName: string) => {
    if (selectedBrands.includes(brandName)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brandName));
    } else {
      setSelectedBrands([...selectedBrands, brandName]);
    }
  };

  const handleResetFilters = () => {
    setActiveCategory(null);
    setSelectedBrands([]);
    setMaxPrice(4500000);
    setSelectedSkinType(null);
    setOnlyInStock(false);
    setOnlyDiscounted(false);
    setSearchQuery('');
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Breadcrumb */}
      <section className="w-full bg-[#fff0f2]/50 py-space-sm border-b border-[#d6c2c5]/30">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin">
          <nav aria-label="مسیر راهنما" className="flex items-center gap-2 font-label-md text-label-md text-[#514346]">
            <button onClick={() => setPath('home')} className="hover:text-[#884c5e] transition-colors flex items-center gap-1 cursor-pointer">
              <Icon name="home" className="text-[16px]" />
              <span>خانه</span>
            </button>
            <span className="text-[#d6c2c5]">/</span>
            <span className="text-[#884c5e] font-semibold">محصولات</span>
            <span className="text-[#d6c2c5]">/</span>
            <span className="text-[#884c5e] font-semibold">همه محصولات</span>
          </nav>
        </div>
      </section>

      {/* Editorial Catalog Hero Header */}
      <section className="w-full py-space-md lg:py-space-lg relative overflow-hidden bg-gradient-to-b from-[#fff0f2]/40 to-transparent">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-space-md">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd9e1]/60 text-[#370a1b] font-label-sm text-label-sm">
                <Icon name="auto_awesome" className="text-[14px]" />
                <span>انتخاب اصیل و بدون واسطه از معتبرترین خانه‌های زیبایی دنیا</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg font-bold text-[#23191c] tracking-tight">
                همه محصولات لومیا بیوتی
              </h1>
              <p className="font-body-md text-body-md text-[#514346] leading-relaxed">
                مجموعه‌ای منتخب از موثرترین فرمولاسیون‌های مراقبت از پوست، مو و آرایش اختصاصی با تضمین ۱۰۰٪ اصالت و برگه آزمایشگاهی معتبر.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white shadow-sm text-[#23191c] border border-[#d6c2c5]/30">
                <span className="w-2.5 h-2.5 rounded-full bg-[#94445c] animate-pulse"></span>
                <span className="font-label-md text-label-md font-semibold text-[#94445c]">
                  {filteredProducts.length.toLocaleString('fa-IR')} محصول یافت شد
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-[#514346] font-label-sm text-label-sm">
                <Icon name="verified" className="text-[18px] text-[#745a33]" />
                <span>اصالت تضمینی</span>
              </div>
            </div>
          </div>

          {/* Quick Category Visual Pills */}
          <div className="pt-space-xs overflow-x-auto pb-2 no-scrollbar flex items-center gap-2.5">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-5 py-2.5 rounded-full font-label-md text-label-md font-semibold shadow-sm transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeCategory === null
                  ? 'bg-[#884c5e] text-white'
                  : 'bg-white text-[#514346] hover:text-[#884c5e] hover:bg-[#f7e3e7]'
              }`}
            >
              <span>همه محصولات</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] ${activeCategory === null ? 'bg-white/20 text-white' : 'bg-[#fde9ed] text-[#514346]'}`}>
                ۱۲۸
              </span>
            </button>

            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(isActive ? null : cat.slug)}
                  className={`px-5 py-2.5 rounded-full font-label-md text-label-md shrink-0 shadow-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#884c5e] text-white font-semibold'
                      : 'bg-white text-[#514346] hover:text-[#884c5e] hover:bg-[#f7e3e7]'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] ${isActive ? 'bg-white/20 text-white' : 'bg-[#fde9ed] text-[#514346]'}`}>
                    {cat.itemCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Catalog Architecture */}
      <section className="w-full pb-space-xl">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            
            {/* SIDEBAR FILTERS (Column 1-3 on RTL Desktop = Right Side) */}
            <aside className="lg:col-span-3 space-y-4 lg:sticky lg:top-24">
              <div className="bg-white rounded-3xl p-5 shadow-sm space-y-6 border border-[#d6c2c5]/30">
                {/* Filter Header & Reset */}
                <div className="flex items-center justify-between pb-3 border-b border-[#f2dee2]">
                  <div className="flex items-center gap-2 text-[#23191c] font-title text-title font-bold">
                    <Icon name="tune" className="text-[20px] text-[#884c5e]" />
                    <span>فیلترهای پیشرفته</span>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="font-label-md text-label-md text-[#94445c] hover:text-[#884c5e] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Icon name="refresh" className="text-[16px]" />
                    <span>پاک کردن</span>
                  </button>
                </div>

                {/* In-catalog Search */}
                <div className="space-y-2">
                  <label className="font-label-md text-label-md text-[#23191c] font-semibold block">جستجو در نتایج</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="نام محصول، ترکیب یا برند..."
                      className="w-full h-11 pr-10 pl-3 rounded-xl bg-[#fff0f2]/70 text-[#23191c] font-body-md text-body-md placeholder:text-[#847376]/70 border border-[#d6c2c5]/30 focus:ring-2 focus:ring-[#884c5e]/30 transition-all outline-none"
                    />
                    <Icon name="search" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#847376]/70 text-[18px]" />
                  </div>
                </div>

                {/* Category Accordion */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-label-md text-label-md font-semibold text-[#23191c]">
                    <span>دسته‌بندی‌ها</span>
                    <Icon name="expand_less" className="text-[18px] text-[#847376]" />
                  </div>
                  <div className="space-y-2 font-body-md text-body-md text-[#514346]">
                    {CATEGORIES.slice(0, 5).map((cat) => (
                      <label key={cat.id} className="flex items-center justify-between cursor-pointer group">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={activeCategory === cat.slug}
                            onChange={() => setActiveCategory(activeCategory === cat.slug ? null : cat.slug)}
                            className="rounded w-4 h-4 text-[#884c5e] focus:ring-[#884c5e]/20 accent-[#884c5e]"
                          />
                          <span className="group-hover:text-[#884c5e] transition-colors">{cat.name}</span>
                        </div>
                        <span className="font-label-sm text-label-sm text-[#847376] px-2 py-0.5 rounded-full bg-[#fde9ed]">
                          {cat.itemCount}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand Selection */}
                <div className="space-y-3 pt-2 border-t border-[#f2dee2]">
                  <div className="flex items-center justify-between font-label-md text-label-md font-semibold text-[#23191c]">
                    <span>برندهای معتبر</span>
                    <span className="font-label-sm text-label-sm text-[#94445c]">{selectedBrands.length} برند منتخب</span>
                  </div>
                  <div className="space-y-2.5 font-body-md text-body-md text-[#514346] max-h-48 overflow-y-auto pr-1">
                    {['The Ordinary', 'Dior Beauté', 'Charlotte Tilbury', 'CeraVe', 'Rare Beauty', 'NARS', 'LUMÉA Sublime'].map(
                      (b, i) => (
                        <label key={i} className="flex items-center justify-between cursor-pointer group">
                          <span className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedBrands.includes(b)}
                              onChange={() => handleBrandToggle(b)}
                              className="rounded w-4 h-4 text-[#884c5e] focus:ring-[#884c5e]/20 accent-[#884c5e]"
                            />
                            <span className="group-hover:text-[#884c5e]">{b}</span>
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3 pt-2 border-t border-[#f2dee2]">
                  <div className="flex items-center justify-between font-label-md text-label-md font-semibold text-[#23191c]">
                    <span>محدوده قیمت</span>
                    <span className="font-label-sm text-label-sm text-[#745a33]">تومان</span>
                  </div>
                  <div className="pt-2">
                    <input
                      type="range"
                      min={350000}
                      max={4500000}
                      step={50000}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-[#884c5e] h-1.5 bg-[#fde9ed] rounded-lg cursor-pointer"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 text-label-sm font-label-sm">
                    <div className="bg-[#fff0f2] px-2.5 py-1.5 rounded-lg text-center flex-1">
                      <span className="text-[#847376] block text-[10px]">از</span>
                      <span className="font-semibold text-[#23191c]">۳۵۰,۰۰۰</span>
                    </div>
                    <span className="text-[#847376]">-</span>
                    <div className="bg-[#fff0f2] px-2.5 py-1.5 rounded-lg text-center flex-1">
                      <span className="text-[#847376] block text-[10px]">تا</span>
                      <span className="font-semibold text-[#23191c]">{maxPrice.toLocaleString('fa-IR')}</span>
                    </div>
                  </div>
                </div>

                {/* Skin Type Pills */}
                <div className="space-y-3 pt-2 border-t border-[#f2dee2]">
                  <div className="flex items-center justify-between font-label-md text-label-md font-semibold text-[#23191c]">
                    <span>سازگاری با نوع پوست</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['خشک و کم‌آب', 'مختلط', 'چرب و مستعد آکنه', 'حساس و قرمز', 'نرمال'].map((type) => {
                      const isSel = selectedSkinType === type;
                      return (
                        <button
                          key={type}
                          onClick={() => setSelectedSkinType(isSel ? null : type)}
                          className={`px-2.5 py-1 rounded-full text-[12px] transition-colors cursor-pointer ${
                            isSel
                              ? 'bg-[#ffd9e1] text-[#370a1b] font-bold'
                              : 'bg-[#fff0f2] text-[#514346] hover:bg-[#fde9ed]'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Toggles (In Stock & Discount) */}
                <div className="space-y-3 pt-2 border-t border-[#f2dee2]">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-medium text-[#23191c]">
                      فقط کالاهای موجود در انبار
                    </span>
                    <input
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={(e) => setOnlyInStock(e.target.checked)}
                      className="rounded w-4 h-4 text-[#884c5e] accent-[#884c5e]"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-medium text-[#23191c]">
                      فقط محصولات دارای تخفیف
                    </span>
                    <input
                      type="checkbox"
                      checked={onlyDiscounted}
                      onChange={(e) => setOnlyDiscounted(e.target.checked)}
                      className="rounded w-4 h-4 text-[#884c5e] accent-[#884c5e]"
                    />
                  </div>
                </div>

                <button
                  onClick={() => {}}
                  className="w-full h-11 bg-[#884c5e] text-white rounded-xl font-label-md text-label-md font-semibold hover:bg-[#94445c] transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Icon name="check_circle" className="text-[18px]" />
                  <span>اعمال فیلترها ({filteredProducts.length} کالا)</span>
                </button>
              </div>

              {/* Editorial Small Banner in Sidebar */}
              <div className="rounded-3xl p-5 bg-gradient-to-br from-[#ffd9e1]/40 via-[#fde9ed] to-[#fff0f2] shadow-sm space-y-3 border border-[#d6c2c5]/30">
                <span className="font-label-sm text-label-sm text-[#94445c] font-bold uppercase tracking-wider">
                  سرویس VIP لومیا
                </span>
                <h4 className="font-headline-sm text-headline-sm font-bold text-[#23191c]">
                  مشاوره تشخیص تیپ پوست
                </h4>
                <p className="font-body-md text-body-md text-[#514346] leading-relaxed text-xs">
                  پرسشنامه ۲ دقیقه‌ای را تکمیل کنید تا مشاوران تخصصی، محصولات کاملاً متناسب با ساختار ژنتیکی پوست شما را پیشنهاد دهند.
                </p>
                <button
                  onClick={openQuiz}
                  className="inline-flex items-center gap-1.5 font-label-md text-label-md font-semibold text-[#884c5e] hover:text-[#94445c] pt-1 cursor-pointer"
                >
                  <span>شروع تست رایگان</span>
                  <Icon name="arrow_back" className="text-[16px]" />
                </button>
              </div>
            </aside>

            {/* MAIN PRODUCT FEED (Column 4-12 on RTL Desktop = Left Side) */}
            <main className="lg:col-span-9 space-y-6">
              {/* Toolbar */}
              <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 border border-[#d6c2c5]/30">
                <div className="flex items-center gap-2 text-[#514346] font-label-md text-label-md flex-wrap">
                  <Icon name="sort" className="text-[20px] text-[#884c5e]" />
                  <span className="font-semibold text-[#23191c]">مرتب‌سازی بر اساس:</span>
                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
                    {[
                      { key: 'popular', label: 'محبوب‌ترین' },
                      { key: 'bestselling', label: 'پرفروش‌ترین' },
                      { key: 'newest', label: 'جدیدترین' },
                      { key: 'cheapest', label: 'ارزان‌ترین' },
                      { key: 'expensive', label: 'گران‌ترین' },
                      { key: 'discount', label: 'بیشترین تخفیف' },
                    ].map((s) => (
                      <button
                        key={s.key}
                        onClick={() => setSortBy(s.key as any)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                          sortBy === s.key
                            ? 'bg-[#ffd9e1] text-[#370a1b]'
                            : 'text-[#514346] hover:text-[#884c5e]'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                  <span className="font-label-sm text-label-sm text-[#847376] hidden sm:inline">
                    نمایش {filteredProducts.length} محصول
                  </span>
                  <div className="flex items-center bg-[#fff0f2] rounded-lg p-1 border border-[#d6c2c5]/30">
                    <button
                      onClick={() => setIsListView(false)}
                      className={`p-1 rounded cursor-pointer ${
                        !isListView ? 'text-[#884c5e] bg-white shadow-sm' : 'text-[#847376]'
                      }`}
                    >
                      <Icon name="grid_view" className="text-[18px]" />
                    </button>
                    <button
                      onClick={() => setIsListView(true)}
                      className={`p-1 rounded cursor-pointer ${
                        isListView ? 'text-[#884c5e] bg-white shadow-sm' : 'text-[#847376]'
                      }`}
                    >
                      <Icon name="view_agenda" className="text-[18px]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products List or Grid */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-[#d6c2c5]/30">
                  <Icon name="search_off" className="text-[48px] text-[#884c5e]" />
                  <h3 className="font-title text-title font-bold text-[#23191c]">محصولی با این مشخصات یافت نشد</h3>
                  <p className="text-xs text-[#514346]">لطفاً فیلترهای اعمال‌شده یا عبارت جستجو را تغییر دهید.</p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-[#884c5e] text-white rounded-full text-xs font-bold mt-2 cursor-pointer"
                  >
                    حذف همه فیلترها
                  </button>
                </div>
              ) : (
                <div className={isListView ? 'flex flex-col gap-4' : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'}>
                  {filteredProducts.map((product) => {
                    const isFav = isInWishlist(product.id);
                    return (
                      <article
                        key={product.id}
                        className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex border border-[#d6c2c5]/30 ${
                          isListView ? 'flex-col sm:flex-row items-center p-3 gap-4' : 'flex-col justify-between'
                        }`}
                      >
                        <div
                          className={`relative bg-[#fff0f2]/60 overflow-hidden flex items-center justify-center p-3 cursor-pointer ${
                            isListView ? 'w-full sm:w-44 aspect-square shrink-0 rounded-xl' : 'aspect-[4/3] w-full'
                          }`}
                          onClick={() => setPath('product-detail', { productId: product.id })}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10">
                            {product.badge && (
                              <span className="bg-[#884c5e] text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                                {product.badge}
                              </span>
                            )}
                            {product.discountPercent && (
                              <span className="bg-[#ffd9e0] text-[#3f011a] font-semibold text-[11px] px-2 py-0.5 rounded-full">
                                {product.discountPercent}٪ تخفیف
                              </span>
                            )}
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(product.id);
                            }}
                            className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur text-[#23191c] hover:text-[#884c5e] flex items-center justify-center shadow-sm transition-transform active:scale-95 cursor-pointer"
                          >
                            <Icon name="favorite" filled={isFav} className={`text-[18px] ${isFav ? 'text-[#884c5e]' : ''}`} />
                          </button>
                        </div>

                        <div className="p-4 space-y-3 flex-1 flex flex-col justify-between w-full">
                          <div>
                            <div className="flex items-center justify-between text-[11px] text-[#847376] pb-1 font-label-sm">
                              <span className="uppercase tracking-wider font-semibold text-[#884c5e]">{product.brand}</span>
                              <div className="flex items-center gap-1 text-[#745a33]">
                                <Icon name="star" filled={true} className="text-[14px]" />
                                <span>{product.rating} ({product.reviewCount})</span>
                              </div>
                            </div>
                            <h3
                              onClick={() => setPath('product-detail', { productId: product.id })}
                              className="font-title text-title font-semibold text-[#23191c] group-hover:text-[#884c5e] transition-colors line-clamp-1 cursor-pointer"
                            >
                              {product.name}
                            </h3>
                            <p className="font-body-md text-body-md text-[#514346] text-xs line-clamp-1 pt-1">
                              {product.shortDescription}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-[#f2dee2] space-y-3">
                            <div className="flex items-baseline justify-between">
                              {product.originalPrice && (
                                <span className="text-xs text-[#847376] line-through">
                                  {product.originalPrice.toLocaleString('fa-IR')}
                                </span>
                              )}
                              <div className="text-left">
                                <span className="font-headline-sm text-headline-sm font-bold text-[#23191c]">
                                  {product.price.toLocaleString('fa-IR')}
                                </span>
                                <span className="text-xs font-normal text-[#514346] mr-1">تومان</span>
                              </div>
                            </div>
                            <button
                              onClick={() => addToCart(product)}
                              className="w-full h-10 rounded-xl bg-[#fde9ed] text-[#23191c] group-hover:bg-[#884c5e] group-hover:text-white transition-colors font-label-md text-label-md font-medium flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                            >
                              <Icon name="shopping_bag" className="text-[18px]" />
                              <span>افزودن به سبد خرید</span>
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Mid-Grid Editorial Promotional Showcase (High-End Breakout) */}
              <div className="my-space-md rounded-3xl bg-gradient-to-l from-[#392d30] via-[#2d2225] to-[#392d30] text-[#fff8f8] overflow-hidden shadow-xl p-6 sm:p-8 lg:p-10 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
                  <div className="lg:col-span-8 space-y-3 text-right">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#884c5e]/20 text-[#ffd9e1] font-label-sm text-label-sm border border-[#884c5e]/30">
                      <Icon name="psychology_alt" className="text-[16px] text-[#e9a0b3]" />
                      <span>هوش پوست و روتین هوشمند لومیا</span>
                    </div>
                    <h3 className="font-headline-md text-headline-md font-bold text-[#fff8f8] leading-snug">
                      آیا هنوز مطمئن نیستید کدام سرم یا کرم برای پوست شما موثر است؟
                    </h3>
                    <p className="font-body-md text-body-md text-[#e9d5d9] max-w-xl leading-relaxed">
                      با پاسخ به ۵ پرسش بالینی درباره رژیم پوستی و دغدغه‌های فعلی، برنامه شخصی‌سازی شده به همراه تخفیف اختصاصی اولین خرید را فوراً دریافت کنید.
                    </p>
                    <div className="pt-3 flex flex-wrap items-center gap-4">
                      <button
                        onClick={openQuiz}
                        className="px-6 py-3 rounded-full bg-[#884c5e] text-white font-label-md text-label-md font-semibold hover:bg-[#94445c] transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                      >
                        <span>شروع تست ۲ دقیقه‌ای آنلاین</span>
                        <Icon name="arrow_back" className="text-[18px]" />
                      </button>
                      <span className="text-[#ffddb1] font-label-sm text-label-sm flex items-center gap-1.5">
                        <Icon name="health_and_safety" className="text-[16px]" />
                        <span>تنظیم شده توسط متخصصین درماتولوژی</span>
                      </span>
                    </div>
                  </div>
                  <div className="lg:col-span-4 flex justify-center lg:justify-end">
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                      <img
                        alt="مشاوره نوع پوست لومیا"
                        className="w-full h-full object-cover"
                        src="/images/banners/luxury-gift-box.png"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#392d30]/60 via-transparent to-transparent"></div>
                      <span className="absolute bottom-2 inset-x-2 text-center font-label-sm text-label-sm text-[#fff8f8] bg-[#392d30]/70 backdrop-blur py-1 rounded-lg">
                        روتین ۱۰۰٪ سفارشی
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#f2dee2]">
                <div className="text-[#514346] font-label-md text-label-md">
                  نمایش ردیف اول تا دوازدهم از مجموع ۱۲۸ محصول لومیا
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="w-10 h-10 rounded-xl bg-white text-[#847376] opacity-40 flex items-center justify-center cursor-not-allowed border border-[#d6c2c5]/30" disabled>
                    <Icon name="chevron_right" className="text-[20px]" />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-[#884c5e] text-white font-semibold flex items-center justify-center shadow-sm">
                    ۱
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-white text-[#23191c] hover:bg-[#f7e3e7] transition-colors font-medium flex items-center justify-center border border-[#d6c2c5]/30 cursor-pointer">
                    ۲
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-white text-[#23191c] hover:bg-[#f7e3e7] transition-colors font-medium flex items-center justify-center border border-[#d6c2c5]/30 cursor-pointer">
                    ۳
                  </button>
                  <span className="px-2 text-[#847376]">...</span>
                  <button className="w-10 h-10 rounded-xl bg-white text-[#23191c] hover:bg-[#f7e3e7] transition-colors font-medium flex items-center justify-center border border-[#d6c2c5]/30 cursor-pointer">
                    ۱۱
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-white text-[#23191c] hover:bg-[#f7e3e7] transition-colors flex items-center justify-center shadow-sm border border-[#d6c2c5]/30 cursor-pointer">
                    <Icon name="chevron_left" className="text-[20px]" />
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="w-full bg-white py-space-lg border-t border-[#f2dee2]">
        <div className="max-w-[1360px] mx-auto px-margin-mobile lg:px-margin">
          <div className="text-center max-w-xl mx-auto mb-space-md space-y-1">
            <span className="font-label-sm text-label-sm font-bold text-[#94445c] uppercase tracking-widest">
              تعهدات و استانداردهای لومیا
            </span>
            <h2 className="font-headline-sm text-headline-sm font-bold text-[#23191c]">
              آرامش خاطر در هر خرید آرایشی و درمانی
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#fff0f2]/50 border border-[#d6c2c5]/30">
              <div className="w-12 h-12 rounded-2xl bg-[#ffd9e1] flex items-center justify-center text-[#884c5e] shrink-0 shadow-sm">
                <Icon name="verified_user" className="text-[26px]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-title text-title font-semibold text-[#23191c]">ضمانت ۱۰۰٪ اصالت</h4>
                <p className="font-body-md text-body-md text-[#514346] text-xs leading-relaxed">
                  واردات مستقیم از مراجع رسمی کمپانی‌ها با بارکد قابل ردیابی و اصالت کالا.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#fff0f2]/50 border border-[#d6c2c5]/30">
              <div className="w-12 h-12 rounded-2xl bg-[#ffddb1] flex items-center justify-center text-[#745a33] shrink-0 shadow-sm">
                <Icon name="local_shipping" className="text-[26px]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-title text-title font-semibold text-[#23191c]">ارسال سریع و رایگان</h4>
                <p className="font-body-md text-body-md text-[#514346] text-xs leading-relaxed">
                  ارسال اکسپرس در بسته‌بندی نفیس لومیا برای کلیه سفارش‌های بالای ۸۰۰ هزار تومان.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#fff0f2]/50 border border-[#d6c2c5]/30">
              <div className="w-12 h-12 rounded-2xl bg-[#ffd9e0] flex items-center justify-center text-[#94445c] shrink-0 shadow-sm">
                <Icon name="assignment_return" className="text-[26px]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-title text-title font-semibold text-[#23191c]">ضمانت بازگشت ۷ روزه</h4>
                <p className="font-body-md text-body-md text-[#514346] text-xs leading-relaxed">
                  امکان استرداد و تعویض آسان کالا در صورت عدم تطابق مشخصات یا نقص فیزیکی.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#fff0f2]/50 border border-[#d6c2c5]/30">
              <div className="w-12 h-12 rounded-2xl bg-[#e9a0b3] flex items-center justify-center text-[#6b3545] shrink-0 shadow-sm">
                <Icon name="support_agent" className="text-[26px]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-title text-title font-semibold text-[#23191c]">مشاوره تخصصی پوست</h4>
                <p className="font-body-md text-body-md text-[#514346] text-xs leading-relaxed">
                  پاسخگویی آنلاین کارشناسان خبره پوست و مو در تمام طول هفته برای خریدی آگاهانه.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
