import { Icon } from '../components/ui/Icon';
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/mockData';

export const CartCheckoutPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponDiscount,
    selectedGift,
    setSelectedGift,
    setPath,
    showToast,
    addOrder,
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('14-18');
  const [paymentMethod, setPaymentMethod] = useState<'shaparak' | 'snappay' | 'card'>('shaparak');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [newCreatedOrderNumber, setNewCreatedOrderNumber] = useState('');

  // Sample luxury gifts to choose from
  const luxuryGifts = [
    {
      id: 'gift-1',
      title: 'مینی پرفیوم شکوفه گیلاس لومیا (۵ میل)',
      subtitle: 'رایحه ملایم و لوکس بهاری',
      image: '/images/products/gift-cherry-blossom.jpg',
    },
    {
      id: 'gift-2',
      title: 'سرم ریکاوری شب لومیا (۷ میل)',
      subtitle: 'ترمیم‌کننده و مغذی سد دفاعی پوست',
      image: '/images/products/gift-night-serum.jpg',
    },
    {
      id: 'gift-3',
      title: 'پد پنبه‌ای ارگانیک و آینه کیفی لومیا',
      subtitle: '۱۰۰٪ پنبه خالص دست‌ساز',
      image: '/images/products/gift-cotton-mirror.jpg',
    },
  ];

  // Calculation
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 1000000 || subtotal === 0 ? 0 : 45000;
  const calculatedDiscount = appliedCoupon ? Math.min(couponDiscount || Math.round(subtotal * 0.15), 500000) : 0;
  const grandTotal = Math.max(0, subtotal - calculatedDiscount + shippingFee);

  // Free shipping progress
  const freeShippingThreshold = 1000000;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const success = applyCoupon(inputCoupon.trim());
    if (success) {
      setInputCoupon('');
    }
  };

  const handleCompleteOrder = () => {
    if (cart.length === 0) {
      showToast('سبد خرید شما خالی است.');
      return;
    }

    setIsCheckingOut(true);

    // Simulate payment gateway delay
    setTimeout(() => {
      const orderNum = 'LM-' + Math.floor(10000 + Math.random() * 90000);
      setNewCreatedOrderNumber(orderNum);

      // Create new order record
      const newOrder = {
        id: 'ord-' + Date.now(),
        orderNumber: orderNum,
        date: new Intl.DateTimeFormat('fa-IR', { dateStyle: 'long' }).format(new Date()),
        status: 'processing' as const,
        totalAmount: grandTotal,
        items: cart.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        })),
        estimatedDelivery: 'پنج‌شنبه ۲۶ مهر - ساعت ۱۴ الی ۱۸',
        shippingAddress: 'تهران، خیابان ولیعصر، بالاتر از پارک وی، کوچه گلستان، پلاک ۱۲',
      };

      addOrder(newOrder);
      clearCart();
      setIsCheckingOut(false);
      setIsSuccessModalOpen(true);

      // Launch celebration confetti
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#884c5e', '#e9a0b3', '#ffd9e1', '#d4af37'],
        });
      } catch (err) {
        // Fallback gracefully
      }
    }, 1500);
  };

  if (cart.length === 0 && !isSuccessModalOpen) {
    return (
      <div className="bg-[#fcf8f8] min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 text-center border border-[#f2dede] shadow-[0_4px_24px_rgba(136,76,94,0.06)]">
          <div className="w-20 h-20 rounded-full bg-[#fff2f4] text-[#884c5e] flex items-center justify-center mx-auto mb-6">
            <Icon name="shopping_bag" className="text-4xl" />
          </div>
          <h2 className="text-xl font-bold text-[#1b1c1d] mb-2">سبد خرید شما خالی است</h2>
          <p className="text-sm text-[#524345] max-w-md mx-auto leading-relaxed mb-8">
            شما هنوز هیچ محصولی را به سبد خرید خود اضافه نکرده‌اید. جدیدترین محصولات پوستی و آرایشی لومیا را در کاتالوگ ببینید.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setPath('/products')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#884c5e] text-white font-bold text-sm hover:bg-[#723b4c] transition-all shadow-md"
            >
              مشاهده فروشگاه و خرید
            </button>
            <button
              onClick={() => setPath('/')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-[#d6a9b4] text-[#884c5e] font-bold text-sm hover:bg-[#fff0f2] transition-colors"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcf8f8] min-h-screen text-[#1b1c1d] pb-24">
      {/* Breadcrumb Header */}
      <div className="border-b border-[#f2dede]/70 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs text-[#524345]">
          <button onClick={() => setPath('/')} className="hover:text-[#884c5e] transition-colors">
            خانه
          </button>
          <span>/</span>
          <span className="text-[#884c5e] font-semibold">سبد خرید و تکمیل سفارش</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* ============================================================== */}
          {/* MAIN CART CONTENT (ITEMS & CHECKOUT DETAILS)                   */}
          {/* ============================================================== */}
          <div className="w-full lg:w-7/12 xl:w-8/12 space-y-6">
            {/* Free Shipping Progress Banner */}
            <div className="bg-white rounded-2xl p-5 border border-[#f2dede] shadow-[0_2px_12px_rgba(136,76,94,0.04)]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-[#1b1c1d] flex items-center gap-2">
                  <Icon name="local_shipping" className="text-[#884c5e] text-[20px]" />
                  {subtotal >= freeShippingThreshold ? (
                    <span className="text-emerald-700 font-bold">تبریک! سفارش شما شامل ارسال کاملاً رایگان شد.</span>
                  ) : (
                    <span>
                      تنها <strong className="text-[#884c5e]">{remainingForFreeShipping.toLocaleString('fa-IR')} تومان</strong> تا ارسال رایگان
                    </span>
                  )}
                </span>
                <span className="font-bold text-[#884c5e]">{freeShippingProgress}٪</span>
              </div>
              <div className="w-full bg-[#fcecee] h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-l from-[#884c5e] to-[#e9a0b3] h-full rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-2xl border border-[#f2dede] overflow-hidden shadow-[0_2px_12px_rgba(136,76,94,0.04)]">
              <div className="p-5 border-b border-[#f2dede]/80 flex items-center justify-between">
                <h2 className="font-bold text-base text-[#1b1c1d] flex items-center gap-2">
                  <Icon name="shopping_bag" className="text-[#884c5e]" />
                  کالاهای انتخابی شما ({cart.reduce((s, i) => s + i.quantity, 0)} عدد)
                </h2>
                <button
                  onClick={() => {
                    clearCart();
                    showToast('سبد خرید با موفقیت خالی شد.');
                  }}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1"
                >
                  <Icon name="delete_sweep" className="text-[16px]" />
                  خالی کردن سبد
                </button>
              </div>

              <div className="divide-y divide-[#f2dede]/70">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-20 h-20 rounded-2xl bg-[#faf5f6] border border-[#f2dede] overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#884c5e] bg-[#fff0f2] px-2 py-0.5 rounded">
                          {product.brand}
                        </span>
                        <h3
                          onClick={() => setPath('/product/' + product.id)}
                          className="font-bold text-sm text-[#1b1c1d] mt-1 hover:text-[#884c5e] cursor-pointer transition-colors"
                        >
                          {product.name}
                        </h3>
                        <p className="text-[11px] text-gray-500 font-mono mt-0.5">{product.nameEn}</p>
                        <span className="text-xs text-emerald-700 font-medium mt-1 inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          موجود در انبار اختصاصی لومیا (ارسال فوری)
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#d6a9b4] rounded-xl bg-white p-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[#884c5e] hover:bg-[#fff0f2] transition-colors"
                        >
                          <Icon name="add" className="text-[16px]" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#1b1c1d] font-mono">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[#884c5e] hover:bg-[#fff0f2] transition-colors"
                        >
                          <Icon name={quantity === 1 ? 'delete' : 'remove'} className="text-[16px]" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-left min-w-[110px]">
                        <div className="font-bold text-sm text-[#1b1c1d]">
                          {(product.price * quantity).toLocaleString('fa-IR')} تومان
                        </div>
                        {quantity > 1 && (
                          <div className="text-[11px] text-gray-400">
                            هر عدد: {product.price.toLocaleString('fa-IR')} ت
                          </div>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => {
                          removeFromCart(product.id);
                          showToast(`«${product.name}» از سبد حذف شد.`);
                        }}
                        className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                        title="حذف کالا"
                      >
                        <Icon name="close" className="text-[20px]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Luxury Gift Sample Selection (Exclusive feature) */}
            <div className="bg-white rounded-2xl p-5 border border-[#f2dede] shadow-[0_2px_12px_rgba(136,76,94,0.04)]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-sm text-[#1b1c1d] flex items-center gap-2">
                    <Icon name="redeem" className="text-amber-500" />
                    هدیه اختصاصی لومیا (انتخاب رایگان با هر خرید)
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">یک نمونه لوکس مینیاتوری به عنوان هدیه همراه سفارش شما ارسال می‌شود.</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  ۱۰۰٪ رایگان
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {luxuryGifts.map((gift) => (
                  <div
                    key={gift.id}
                    onClick={() => {
                      setSelectedGift(gift.title);
                      showToast(`هدیه «${gift.title}» انتخاب شد.`);
                    }}
                    className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center gap-3 ${
                      selectedGift === gift.title
                        ? 'border-[#884c5e] bg-[#fff5f7] ring-2 ring-[#884c5e]/30'
                        : 'border-[#f2dede] hover:border-[#884c5e]/50 bg-white'
                    }`}
                  >
                    <img
                      src={gift.image}
                      alt={gift.title}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#1b1c1d] truncate">{gift.title}</div>
                      <div className="text-[10px] text-gray-500 truncate">{gift.subtitle}</div>
                    </div>
                    {selectedGift === gift.title && (
                      <Icon name="check_circle" className="text-[#884c5e] text-[20px]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Address & Time Slot */}
            <div className="bg-white rounded-2xl p-5 border border-[#f2dede] shadow-[0_2px_12px_rgba(136,76,94,0.04)] space-y-4">
              <h3 className="font-bold text-sm text-[#1b1c1d] flex items-center gap-2">
                <Icon name="location_on" className="text-[#884c5e]" />
                آدرس تحویل سفارش
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setSelectedAddressIndex(0)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedAddressIndex === 0
                      ? 'border-[#884c5e] bg-[#fff5f7] ring-2 ring-[#884c5e]/20'
                      : 'border-[#f2dede] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span>منزل شخصی (پیش‌فرض)</span>
                    {selectedAddressIndex === 0 && (
                      <span className="text-[10px] text-[#884c5e]">انتخاب شده</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    تهران، خیابان ولیعصر، بالاتر از پارک وی، کوچه گلستان، پلاک ۱۲، زنگ ۴
                  </p>
                  <span className="text-[11px] text-gray-400 block mt-2">گیرنده: فرناز کمالی - ۰۹۱۲۳۴۵۶۷۸۹</span>
                </div>

                <div
                  onClick={() => setSelectedAddressIndex(1)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedAddressIndex === 1
                      ? 'border-[#884c5e] bg-[#fff5f7] ring-2 ring-[#884c5e]/20'
                      : 'border-[#f2dede] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span>دفتر کار سعادت‌آباد</span>
                    {selectedAddressIndex === 1 && (
                      <span className="text-[10px] text-[#884c5e]">انتخاب شده</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    تهران، سعادت‌آباد، خیابان صرافها، برج تجاری لوتوس، طبقه ۷، واحد ۷۰۲
                  </p>
                  <span className="text-[11px] text-gray-400 block mt-2">گیرنده: فرناز کمالی - ۰۹۱۲۳۴۵۶۷۸۹</span>
                </div>
              </div>

              {/* Time slot selector */}
              <div className="pt-2">
                <label className="text-xs font-bold text-[#524345] block mb-2">انتخاب بازه زمانی تحویل:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '09-13', label: 'صبح (۹ تا ۱۳)' },
                    { id: '14-18', label: 'بعدازظهر (۱۴ تا ۱۸)' },
                    { id: '19-22', label: 'شب (۱۹ تا ۲۲)' },
                  ].map((slot) => (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() => setDeliveryTimeSlot(slot.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                        deliveryTimeSlot === slot.id
                          ? 'bg-[#884c5e] text-white border-[#884c5e]'
                          : 'bg-[#faf5f6] text-[#524345] border-[#f2dede] hover:bg-[#f2dede]'
                      }`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Gateway Options */}
            <div className="bg-white rounded-2xl p-5 border border-[#f2dede] shadow-[0_2px_12px_rgba(136,76,94,0.04)] space-y-3">
              <h3 className="font-bold text-sm text-[#1b1c1d] flex items-center gap-2">
                <Icon name="credit_card" className="text-[#884c5e]" />
                شیوه پرداخت
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  onClick={() => setPaymentMethod('shaparak')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                    paymentMethod === 'shaparak'
                      ? 'border-[#884c5e] bg-[#fff5f7] ring-2 ring-[#884c5e]/20'
                      : 'border-[#f2dede] bg-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Icon name="verified_user" className="text-[18px]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-[#1b1c1d]">درگاه شاپرک امن</div>
                    <div className="text-[10px] text-gray-500">تمامی کارت‌های بانکی شتاب</div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('snappay')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                    paymentMethod === 'snappay'
                      ? 'border-[#884c5e] bg-[#fff5f7] ring-2 ring-[#884c5e]/20'
                      : 'border-[#f2dede] bg-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                    ۴x
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-[#1b1c1d]">اسنپ‌پی (۴ قسط)</div>
                    <div className="text-[10px] text-gray-500">بدون کارمزد و ضامن</div>
                  </div>
                </div>

                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                    paymentMethod === 'card'
                      ? 'border-[#884c5e] bg-[#fff5f7] ring-2 ring-[#884c5e]/20'
                      : 'border-[#f2dede] bg-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Icon name="cached" className="text-[18px]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-[#1b1c1d]">کارت به کارت فوری</div>
                    <div className="text-[10px] text-gray-500">تایید در ۱۰ دقیقه</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SIDEBAR: ORDER SUMMARY & PAYMENT CTA                           */}
          {/* ============================================================== */}
          <div className="w-full lg:w-5/12 xl:w-4/12 space-y-6 lg:sticky lg:top-24">
            {/* Promo Code Card */}
            <div className="bg-white rounded-2xl p-5 border border-[#f2dede] shadow-[0_2px_12px_rgba(136,76,94,0.04)]">
              <h3 className="font-bold text-xs text-[#524345] mb-3 flex items-center gap-1.5">
                <Icon name="sell" className="text-[#884c5e] text-[18px]" />
                کد تخفیف یا کارت هدیه لومیا
              </h3>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-2">
                    <Icon name="check_circle" className="text-emerald-600 text-[18px]" />
                    <div>
                      <span className="text-xs font-bold text-emerald-800 font-mono">{appliedCoupon}</span>
                      <span className="text-[10px] text-emerald-600 block">۱۵٪ تخفیف طلایی اعمال شد</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      removeCoupon();
                      showToast('کد تخفیف حذف شد.');
                    }}
                    className="text-xs text-rose-600 hover:underline font-bold"
                  >
                    حذف
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="مثال: LUMEA-GLOW"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="flex-1 px-3 py-2.5 rounded-xl border border-[#d6a9b4] text-xs focus:outline-none focus:ring-2 focus:ring-[#884c5e] uppercase font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#884c5e] text-white text-xs font-bold hover:bg-[#723b4c] transition-colors"
                  >
                    اعمال کد
                  </button>
                </form>
              )}
            </div>

            {/* Financial Summary Box */}
            <div className="bg-white rounded-2xl p-6 border border-[#f2dede] shadow-[0_4px_20px_rgba(136,76,94,0.06)] space-y-4">
              <h3 className="font-bold text-base text-[#1b1c1d] pb-3 border-b border-[#f2dede]">
                خلاصه صورت‌حساب
              </h3>

              <div className="space-y-3 text-xs text-[#524345]">
                <div className="flex justify-between">
                  <span>قیمت کل محصولات ({cart.reduce((s, i) => s + i.quantity, 0)} کالا):</span>
                  <span className="font-bold text-[#1b1c1d] font-mono">
                    {subtotal.toLocaleString('fa-IR')} تومان
                  </span>
                </div>

                {calculatedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span className="flex items-center gap-1">
                      <Icon name="percent" className="text-[16px]" />
                      تخفیف ویژه کد اختصاصی:
                    </span>
                    <span className="font-bold font-mono">
                      - {calculatedDiscount.toLocaleString('fa-IR')} تومان
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span>هزینه بسته‌بندی لوکس و ارسال:</span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      رایگان
                    </span>
                  ) : (
                    <span className="font-mono text-[#1b1c1d]">{shippingFee.toLocaleString('fa-IR')} تومان</span>
                  )}
                </div>

                {selectedGift && (
                  <div className="flex justify-between text-[#884c5e] text-[11px] pt-1">
                    <span>هدیه ویژه انتخابی:</span>
                    <span className="font-bold">رایگان (۱ قلم)</span>
                  </div>
                )}

                <div className="pt-4 border-t border-[#f2dede] flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1b1c1d]">مبلغ نهایی قابل پرداخت:</span>
                  <div className="text-left">
                    <span className="font-extrabold text-lg text-[#884c5e] font-mono">
                      {grandTotal.toLocaleString('fa-IR')}
                    </span>
                    <span className="text-xs text-gray-500 mr-1">تومان</span>
                  </div>
                </div>
              </div>

              {/* Checkout CTA Button */}
              <button
                disabled={isCheckingOut}
                onClick={handleCompleteOrder}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#884c5e] to-[#6b3545] text-white font-bold text-sm hover:brightness-105 transition-all shadow-lg shadow-[#884c5e]/25 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    در حال اتصال امن به درگاه بانکی...
                  </>
                ) : (
                  <>
                    <Icon name="lock" className="text-[20px]" />
                    پرداخت امن و ثبت نهایی سفارش
                  </>
                )}
              </button>

              <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-gray-400">
                <span className="flex items-center gap-1">
                  <Icon name="verified" className="text-[14px] text-emerald-600" />
                  درگاه رمزگذاری شده SSL
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="security" className="text-[14px] text-emerald-600" />
                  تضمین ۷ روزه لومیا
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SUCCESS CONFIRMATION MODAL                                    */}
      {/* ============================================================== */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center border border-[#f2dede] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
              <Icon name="check_circle" className="text-4xl" />
            </div>

            <h3 className="text-xl font-bold text-[#1b1c1d] mb-2">سفارش شما با موفقیت ثبت شد!</h3>
            <p className="text-xs text-[#524345] leading-relaxed mb-4">
              پرداخت شما با موفقیت تایید گردید. سفارش شما جهت بسته‌بندی ویژه و ارسال اختصاصی به انبار مرکزی لومیا ارسال شد.
            </p>

            <div className="bg-[#faf5f6] p-4 rounded-2xl border border-[#f2dede] mb-6 text-xs text-right space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-gray-500 font-sans">شماره سفارش:</span>
                <span className="font-bold text-[#884c5e]">{newCreatedOrderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-sans">مبلغ پرداختی:</span>
                <span className="font-bold text-gray-800">{grandTotal.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-sans">زمان تقریبی تحویل:</span>
                <span className="font-bold text-emerald-700 font-sans">پنج‌شنبه ۲۶ مهر</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  setPath('/profile');
                }}
                className="w-full py-3.5 rounded-xl bg-[#884c5e] text-white font-bold text-xs hover:bg-[#723b4c] transition-all shadow-md"
              >
                مشاهده وضعیت سفارش در پروفایل
              </button>
              <button
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  setPath('/');
                }}
                className="w-full py-3.5 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors"
              >
                بازگشت به صفحه اصلی فروشگاه
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
