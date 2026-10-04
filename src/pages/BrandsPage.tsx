import { Icon } from '../components/ui/Icon';
import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/mockData';

export const BrandsPage: React.FC = () => {
  const { setPath, setSelectedBrand } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const brands = [
    {
      name: 'The Ordinary',
      nameEn: 'The Ordinary',
      country: 'کانادا',
      category: 'مراقبت تخصصی از پوست و سرم‌های اکتیو',
      logo: '/images/brands/brand-ordinary.jpg',
      description: 'فرمولاسیون‌های بالینی و صادقانه با غلظت بالای مواد فعال دارویی و قیمت مناسب.',
      itemCount: 18,
      isFeatured: true,
    },
    {
      name: 'Dior',
      nameEn: 'Dior Beauty',
      country: 'فرانسه',
      category: 'آرایش لوکس، مراقبت و عطرهای اشرافی',
      logo: '/images/brands/brand-dior.jpg',
      description: 'میراث باشکوه مد و زیبایی پاریسی با جلوه‌های درخشان و بافت‌های ابریشمی مجلل.',
      itemCount: 24,
      isFeatured: true,
    },
    {
      name: 'Charlotte Tilbury',
      nameEn: 'Charlotte Tilbury',
      country: 'انگلستان',
      category: 'لوازم آرایشی سلبریتی و جلوه درخشان Pillow Talk',
      logo: '/images/brands/brand-charlotte-tilbury.jpg',
      description: 'جادوی درخشش فرش قرمز هالیوود و فرمول‌های بدون نقص میکاپ آرتیست‌های حرفه‌ای.',
      itemCount: 15,
      isFeatured: true,
    },
    {
      name: 'Rare Beauty',
      nameEn: 'Rare Beauty by Selena Gomez',
      country: 'آمریکا',
      category: 'رژگونه‌های مایع سبک، کرم‌پودر و وگان',
      logo: '/images/brands/brand-rare-beauty.jpg',
      description: 'زیبایی طبیعی، حس پذیرش خویشتن و بافت‌های فوق‌العاده سبک با ماندگاری طولانی.',
      itemCount: 12,
      isFeatured: true,
    },
    {
      name: 'NARS',
      nameEn: 'NARS Cosmetics',
      country: 'فرانسه / آمریکا',
      category: 'رنگدانه‌های فوق‌العاده قوی و کانسیلرهای آیکونیک',
      logo: '/images/brands/brand-nars.jpg',
      description: 'پیشرو در رنگ‌های جسورانه، کانسیلر محبوب کرمی و رژگونه ارگاسم جاودانه فرانسوا نارس.',
      itemCount: 16,
      isFeatured: false,
    },
    {
      name: 'CeraVe',
      nameEn: 'CeraVe Skincare',
      country: 'آمریکا',
      category: 'درماتولوژی بالینی و ۳ سرامید ضروری پوست',
      logo: '/images/brands/brand-cerave.jpg',
      description: 'طراحی شده توسط متخصصان پوست با فناوری MVE جهت آبرسانی پیوسته ۲۴ ساعته.',
      itemCount: 20,
      isFeatured: true,
    },
    {
      name: 'Fenty Beauty',
      nameEn: 'Fenty Beauty by Rihanna',
      country: 'آمریکا',
      category: 'هایلایترهای براق، کرم‌پودر ۵۰ رنگ و رژ لب‌های شاینی',
      logo: '/images/brands/brand-fenty.jpg',
      description: 'انقلاب تنوع رنگی با بیش از ۵۰ طیف کرم‌پودر و درخشش جذاب متالیک ریحانا.',
      itemCount: 19,
      isFeatured: true,
    },
    {
      name: 'LUMÉA Beauté',
      nameEn: 'LUMÉA Paris',
      country: 'فرانسه',
      category: 'فرمولاسیون‌های اختصاصی خاویار و گل سرخ',
      logo: '/images/brands/brand-lumea.jpg',
      description: 'امضای انحصاری لومیا پاریس با عصاره خاویار و اسیدهای آمینه کمیاب برای درخشش سلطنتی.',
      itemCount: 8,
      isFeatured: true,
    },
  ];

  const alphabet = ['A', 'C', 'D', 'F', 'L', 'N', 'R', 'T'];

  const filteredBrands = brands.filter((brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.category.includes(searchQuery);

    const matchesLetter = selectedLetter ? brand.nameEn.toUpperCase().startsWith(selectedLetter) : true;

    return matchesSearch && matchesLetter;
  });

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    setPath('/products');
  };

  return (
    <div className="bg-[#fcf8f8] min-h-screen text-[#1b1c1d] pb-24">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-[#fff5f6] to-[#fcf8f8] border-b border-[#f2dede]/70 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#ffd9e1] text-[#6b3545] border border-[#e9a0b3] inline-block mb-3">
            اصالت تضمین‌شده از مبدا کمپانی
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1b1c1d] tracking-tight">
            برندهای بین‌المللی LUMÉA
          </h1>
          <p className="text-sm text-[#524345] max-w-2xl mx-auto mt-3 leading-relaxed">
            مجموعه‌ای برگزیده از پرآوازه‌ترین خانه‌های زیبایی و لابراتوارهای پیشگام مراقبت از پوست پاریس، لندن، نیویورک و تورنتو
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto mt-6 relative">
            <Icon name="search" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]" />
            <input
              type="text"
              placeholder="جستجوی نام برند (انگلیسی یا فارسی)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-11 pl-4 py-3 rounded-2xl bg-white border border-[#d6a9b4] text-xs focus:outline-none focus:ring-2 focus:ring-[#884c5e] shadow-sm"
            />
          </div>

          {/* Alphabet Index */}
          <div className="flex items-center justify-center gap-1.5 mt-5 flex-wrap">
            <button
              onClick={() => setSelectedLetter(null)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                selectedLetter === null ? 'bg-[#884c5e] text-white' : 'bg-white text-gray-600 hover:bg-[#fff0f2]'
              }`}
            >
              همه
            </button>
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                  selectedLetter === letter ? 'bg-[#884c5e] text-white' : 'bg-white text-gray-600 hover:bg-[#fff0f2]'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand, idx) => (
            <div
              key={idx}
              onClick={() => handleBrandClick(brand.name)}
              className="bg-white rounded-3xl p-6 border border-[#f2dede] hover:border-[#884c5e] transition-all hover:shadow-[0_8px_30px_rgba(136,76,94,0.08)] cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#faf5f6] border border-[#f2dede] p-2 flex items-center justify-center overflow-hidden">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] text-gray-400 block">کشور مبدا</span>
                    <span className="text-xs font-bold text-[#884c5e]">{brand.country}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[#1b1c1d] group-hover:text-[#884c5e] transition-colors">
                    {brand.name}
                  </h3>
                  {brand.isFeatured && (
                    <Icon name="verified" className="text-amber-500 text-[18px]" title="برند برگزیده" />
                  )}
                </div>
                <div className="text-xs text-gray-400 font-mono mb-2">{brand.nameEn}</div>
                <p className="text-xs text-[#524345] leading-relaxed mb-4">{brand.description}</p>
              </div>

              <div className="pt-4 border-t border-[#f2dede]/70 flex items-center justify-between text-xs">
                <span className="text-gray-500">{brand.itemCount} محصول در فروشگاه</span>
                <span className="font-bold text-[#884c5e] flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
                  مشاهده محصولات
                  <Icon name="arrow_back" className="text-[16px]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
