/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileDrawer } from './components/MobileDrawer';
import { SkinQuizModal } from './components/SkinQuizModal';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { ProductsCatalogPage } from './pages/ProductsCatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProfileDashboardPage } from './pages/ProfileDashboardPage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';
import { BrandsPage } from './pages/BrandsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';

export default function App() {
  const { currentPath, setPath } = useStore();

  // Scroll to top on path change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  // Handle browser back / forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setPath(path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setPath]);

  // Determine which page to render based on path
  const renderCurrentPage = () => {
    const p = currentPath.toLowerCase().trim();

    // 1. Home Page
    if (p === '/' || p === '' || p === 'home' || p === '/home') {
      return <HomePage />;
    }

    // 2. Product Detail Page
    if (
      p === 'product-detail' ||
      p === '/product-detail' ||
      p === 'product' ||
      p === '/product' ||
      p.startsWith('/product/') ||
      p.startsWith('product/')
    ) {
      return <ProductDetailPage />;
    }

    // 3. Products Catalog / Shop / Categories
    if (
      p === 'products' ||
      p === '/products' ||
      p === 'shop' ||
      p === '/shop' ||
      p === 'categories' ||
      p === '/categories' ||
      p.startsWith('/category/') ||
      p.startsWith('category/') ||
      p.startsWith('/categories')
    ) {
      return <ProductsCatalogPage />;
    }

    // 4. User Profile & Orders Dashboard
    if (
      p === 'profile' ||
      p === '/profile' ||
      p === 'orders' ||
      p === '/orders' ||
      p === 'dashboard' ||
      p === '/dashboard' ||
      p === 'account' ||
      p === '/account' ||
      p === 'wishlist' ||
      p === '/wishlist'
    ) {
      return <ProfileDashboardPage />;
    }

    // 5. Cart & Luxury Checkout
    if (
      p === 'cart' ||
      p === '/cart' ||
      p === 'checkout' ||
      p === '/checkout' ||
      p === 'bag' ||
      p === '/bag' ||
      p === 'order-success'
    ) {
      return <CartCheckoutPage />;
    }

    // 6. Luxury Brands Directory
    if (p === 'brands' || p === '/brands' || p === 'brand' || p === '/brand') {
      return <BrandsPage />;
    }

    // 7. About LUMÉA Beauty
    if (
      p === 'about' ||
      p === '/about' ||
      p === 'about-us' ||
      p === '/about-us' ||
      p === 'story'
    ) {
      return <AboutPage />;
    }

    // 8. Contact & Concierge Support
    if (
      p === 'contact' ||
      p === '/contact' ||
      p === 'contact-us' ||
      p === '/contact-us' ||
      p === 'support'
    ) {
      return <ContactPage />;
    }

    // 9. FAQ Page
    if (p === 'faq' || p === '/faq' || p === 'help' || p === '/help') {
      return <FAQPage />;
    }

    // Default to Home Page
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf8f8] text-[#1b1c1d] selection:bg-[#ffd9e1] selection:text-[#6b3545]">
      {/* Sticky Premium Header */}
      <Header />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* High-end Footer */}
      <Footer />

      {/* Mobile Sticky Bottom Navigation (only on mobile screens) */}
      <MobileBottomNav />

      {/* Mobile Navigation Drawer */}
      <MobileDrawer />

      {/* Interactive Skin Diagnosis / Quiz Modal */}
      <SkinQuizModal />

      {/* Toast Notification Alert */}
      <Toast />
    </div>
  );
}
