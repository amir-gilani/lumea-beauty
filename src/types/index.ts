export interface Product {
  id: string;
  name: string;
  nameEn: string;
  brand: string;
  brandEn: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  code: string;
  batchCode?: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
  badgeType?: 'primary' | 'secondary' | 'tertiary' | 'luxury' | 'discount';
  description: string;
  shortDescription: string;
  features: string[];
  inStock: boolean;
  volumeOptions?: { volume: number; label: string; price: number; savings: number }[];
  skinTypes: string[];
  isCrueltyFree?: boolean;
  isOilFree?: boolean;
  isAlcoholFree?: boolean;
  originCountry: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVolume?: number;
}

export interface OrderItem {
  product?: Product;
  productId?: string;
  name?: string;
  image?: string;
  quantity: number;
  price: number;
  selectedVolume?: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  trackingCode?: string;
  rrn?: string;
  date: string;
  totalAmount: number;
  discountAmount?: number;
  status: 'processing' | 'delivered' | 'cancelled';
  statusLabel?: string;
  items: OrderItem[];
  giftItem?: {
    name: string;
    description: string;
    originalPrice: number;
  };
  recipient?: {
    name: string;
    phone: string;
    address: string;
    postalCode: string;
  };
  deliveryMethod?: string;
  deliveryEstimate?: string;
  estimatedDelivery?: string;
  shippingAddress?: string;
  currentStep?: number; // 1: Paid, 2: Packaging, 3: Dispatch, 4: Delivered
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  itemCount: number;
  image?: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  image: string;
}
