import { create } from 'zustand';
import { Product, CartItem, Order } from '../types';
import { PRODUCTS, INITIAL_ORDERS } from '../data/mockData';

interface AppState {
  // Navigation & Routing
  currentPath: string;
  selectedProductId: string;
  selectedCategorySlug: string | null;
  selectedBrand: string | null;
  searchQuery: string;
  setSelectedBrand: (brand: string | null) => void;
  setPath: (path: string, options?: { productId?: string; categorySlug?: string; brand?: string }) => void;
  setSearchQuery: (query: string) => void;

  // Cart State
  cart: CartItem[];
  appliedCoupon: string | null;
  couponDiscount: number;
  selectedGift: string; // 'niacinamide-mini' | 'floral-sample'
  addToCart: (product: Product, quantity?: number, volume?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  setSelectedGift: (giftId: string) => void;

  // Computed Cart Stats
  getCartTotal: () => {
    rawTotal: number;
    discountTotal: number;
    couponDiscountAmount: number;
    finalTotal: number;
    itemCount: number;
  };

  // Wishlist State
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders State
  orders: Order[];
  latestOrder: Order | null;
  createOrderFromCart: () => Order;
  addOrder: (order: Order) => void;

  // UI Interactive States
  toastMessage: string | null;
  showToast: (message: string) => void;
  hideToast: () => void;

  isQuizOpen: boolean;
  openQuiz: () => void;
  closeQuiz: () => void;

  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  currentPath: 'home',
  selectedProductId: 'ordinary-hyaluronic-acid',
  selectedCategorySlug: null,
  selectedBrand: null,
  searchQuery: '',

  setSelectedBrand: (brand) => set({ selectedBrand: brand }),

  setPath: (path, options) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let prodId = options?.productId;
    if (path.startsWith('/product/') && path.length > 9) {
      prodId = path.replace('/product/', '');
    } else if (path.startsWith('product/') && path.length > 8) {
      prodId = path.replace('product/', '');
    }

    set({
      currentPath: path,
      ...(prodId && { selectedProductId: prodId }),
      ...(options?.categorySlug !== undefined && { selectedCategorySlug: options.categorySlug }),
      ...(options?.brand !== undefined && { selectedBrand: options.brand }),
      isMobileMenuOpen: false
    });
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  // Cart with initial items matching the Stitch Cart screen (Ordinary HA, Rare Beauty blush, Charlotte Tilbury cream)
  cart: [
    { product: PRODUCTS[0], quantity: 1, selectedVolume: 30 },
    { product: PRODUCTS[1], quantity: 1 },
    { product: PRODUCTS[2], quantity: 1, selectedVolume: 50 },
  ],
  appliedCoupon: 'LUMEA-GLOW',
  couponDiscount: 550000,
  selectedGift: 'niacinamide-mini',

  addToCart: (product, quantity = 1, volume) => {
    const { cart, showToast } = get();
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      set({ cart: updated });
    } else {
      set({ cart: [...cart, { product, quantity, selectedVolume: volume }] });
    }
    showToast(`«${product.name.slice(0, 30)}...» به سبد خرید اضافه شد!`);
  },

  removeFromCart: (productId) => {
    const { cart } = get();
    set({ cart: cart.filter((item) => item.product.id !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    const { cart } = get();
    if (quantity <= 0) {
      set({ cart: cart.filter((item) => item.product.id !== productId) });
      return;
    }
    set({
      cart: cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    });
  },

  clearCart: () => set({ cart: [] }),

  applyCoupon: (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'LUMEA-GLOW' || cleanCode === 'THANKYOU15' || cleanCode === 'LUMEA-FIRST') {
      const discount = cleanCode === 'LUMEA-FIRST' ? 150000 : 550000;
      set({ appliedCoupon: cleanCode, couponDiscount: discount });
      get().showToast(`کد تخفیف ${cleanCode} با موفقیت اعمال شد.`);
      return true;
    }
    get().showToast('کد تخفیف وارد شده معتبر نمی‌باشد.');
    return false;
  },

  removeCoupon: () => set({ appliedCoupon: null, couponDiscount: 0 }),

  setSelectedGift: (giftId) => set({ selectedGift: giftId }),

  getCartTotal: () => {
    const { cart, couponDiscount } = get();
    let rawTotal = 0;
    let actualTotal = 0;
    let itemCount = 0;

    cart.forEach((item) => {
      const unitOriginal = item.product.originalPrice || item.product.price;
      const unitPrice = item.product.price;
      rawTotal += unitOriginal * item.quantity;
      actualTotal += unitPrice * item.quantity;
      itemCount += item.quantity;
    });

    const itemDiscount = Math.max(0, rawTotal - actualTotal);
    const finalTotal = Math.max(0, actualTotal - couponDiscount);

    return {
      rawTotal,
      discountTotal: itemDiscount,
      couponDiscountAmount: couponDiscount,
      finalTotal,
      itemCount,
    };
  },

  // Wishlist with 3 default items as seen in headers (badge: '۳')
  wishlist: ['ordinary-hyaluronic-acid', 'rare-beauty-soft-pinch', 'dior-rouge-satin-lipstick'],

  toggleWishlist: (productId) => {
    const { wishlist, showToast } = get();
    const exists = wishlist.includes(productId);
    if (exists) {
      set({ wishlist: wishlist.filter((id) => id !== productId) });
      showToast('محصول از لیست علاقه‌مندی‌ها حذف شد.');
    } else {
      set({ wishlist: [...wishlist, productId] });
      showToast('محصول به لیست علاقه‌مندی‌ها اضافه شد.');
    }
  },

  isInWishlist: (productId) => {
    return get().wishlist.includes(productId);
  },

  orders: INITIAL_ORDERS,
  latestOrder: INITIAL_ORDERS[0],

  createOrderFromCart: () => {
    const { cart, getCartTotal, orders } = get();
    const totals = getCartTotal();
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `LUM-2025-${Math.floor(10000 + Math.random() * 90000)}`,
      trackingCode: `LUM-2025-${Math.floor(10000 + Math.random() * 90000)}`,
      rrn: `TRX-${Math.floor(100000000 + Math.random() * 900000000)}`,
      date: 'لحظاتی پیش',
      totalAmount: totals.finalTotal,
      discountAmount: totals.discountTotal + totals.couponDiscountAmount,
      status: 'processing',
      statusLabel: 'آماده‌سازی و کنترل کیفی در انبار اکسپرس',
      currentStep: 2,
      deliveryMethod: 'پیک ویژه اکسپرس لومیا (امروز)',
      deliveryEstimate: 'فردا بعد از ظهر بین ساعت ۱۴ الی ۱۸',
      recipient: {
        name: 'خانم فرناز کمالی',
        phone: '۰۹۱۲ - ۳۴۵ ۶۷۸۹',
        address: 'تهران، سعادت‌آباد، میدان کاج، بلوار سرو غربی، خیابان صدف، پلاک ۱۸، واحد ۴',
        postalCode: '۱۹۹۷۸۵۴۳۲۱',
      },
      items: cart.map((c) => ({
        product: c.product,
        quantity: c.quantity,
        price: c.product.price,
        selectedVolume: c.selectedVolume,
      })),
      giftItem: {
        name: 'مینی سرم نیاسینامید ۱۰٪ + زینک ۱٪ دی اوردینری (۱۵ میل)',
        description: 'بسته‌بندی مسافرتی به همراه کیف آرایشی مخمل لومیا',
        originalPrice: 420000,
      },
    };

    set({
      orders: [newOrder, ...orders],
      latestOrder: newOrder,
      cart: [],
      currentPath: 'order-success',
    });

    return newOrder;
  },

  addOrder: (order) => {
    const { orders } = get();
    set({ orders: [order, ...orders], latestOrder: order });
  },

  // Toast
  toastMessage: null,
  showToast: (message) => {
    set({ toastMessage: message });
    setTimeout(() => {
      set({ toastMessage: null });
    }, 3200);
  },
  hideToast: () => set({ toastMessage: null }),

  // Quiz Modal
  isQuizOpen: false,
  openQuiz: () => set({ isQuizOpen: true }),
  closeQuiz: () => set({ isQuizOpen: false }),

  // Mobile drawer
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
}));
