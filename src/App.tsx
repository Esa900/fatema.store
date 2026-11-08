import React, { useState, useEffect } from 'react';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { QuickOrderProvider } from './contexts/QuickOrderContext';

// Core Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { DeliveryAreaModal } from './components/DeliveryAreaModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { FloatingCartButton } from './components/FloatingCartButton';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { AuthPage } from './pages/AuthPage';
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { FaqPage } from './pages/FaqPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { StoreService } from './services/store';

function getInitialNavState(): { view: string; param?: string } {
  if (typeof window === 'undefined') return { view: 'home' };
  try {
    const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    const hash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();

    // 1. Direct path check for domain/admin or domain/admin/...
    if (rawPath === 'admin' || rawPath.startsWith('admin/')) {
      const parts = rawPath.split('/');
      const param = parts.slice(1).join('/') ? decodeURIComponent(parts.slice(1).join('/')) : undefined;
      return { view: 'admin', param };
    }

    // 2. Direct hash check for domain/#admin or domain/#/admin
    if (hash === 'admin' || hash.startsWith('admin/')) {
      const parts = hash.split('/');
      const param = parts.slice(1).join('/') ? decodeURIComponent(parts.slice(1).join('/')) : undefined;
      return { view: 'admin', param };
    }

    // 3. Other hash routes (e.g. #shop, #category-products/honey, #cart, #checkout)
    if (hash) {
      const parts = hash.split('/');
      const view = parts[0];
      const param = parts.slice(1).join('/') ? decodeURIComponent(parts.slice(1).join('/')) : undefined;
      if (view) return { view, param };
    }

    // 4. Other pathname routes (e.g. /shop, /cart, /checkout)
    if (rawPath && rawPath !== '') {
      const parts = rawPath.split('/');
      const view = parts[0];
      const param = parts.slice(1).join('/') ? decodeURIComponent(parts.slice(1).join('/')) : undefined;
      if (view) return { view, param };
    }

    // 5. Session storage fallback (never auto-restore 'admin' unless explicitly in the URL)
    const saved = sessionStorage.getItem('khan_store_view');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.view && parsed.view !== 'admin') return parsed;
    }
  } catch (e) {
    // fallback
  }
  return { view: 'home' };
}

function MainApp() {
  const initialNav = getInitialNavState();
  // Navigation State
  const [currentView, setCurrentView] = useState<string>(initialNav.view);
  const [viewParam, setViewParam] = useState<string | undefined>(initialNav.param);

  // Sync URL changes (e.g. typing domain/admin, browser back/forward or hash changes)
  useEffect(() => {
    const handleUrlChange = () => {
      const nav = getInitialNavState();
      // If user navigates away from admin via URL / back button
      if (currentView === 'admin' && nav.view !== 'admin') {
        StoreService.setAdminSession(false);
      }
      setCurrentView(nav.view);
      setViewParam(nav.param);
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, [currentView]);

  // Global Modals State
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isAreaModalOpen, setIsAreaModalOpen] = useState(false);

  // Real-time Global Store Version (Auto-triggers instantaneous re-render across the entire website on any Admin update)
  const [storeVersion, setStoreVersion] = useState(0);

  useEffect(() => {
    const unsub = StoreService.subscribeToStore(() => {
      setStoreVersion((v) => v + 1);
    });
    return unsub;
  }, []);

  // Dynamic Browser Tab Title & Store Name Synchronization
  useEffect(() => {
    const s = StoreService.getSettings();
    const storeName = s.storeName || 'KHAN store';

    if (currentView === 'home') {
      document.title = `${storeName} | ${s.brandTagline || '100% Organic, Fresh & Pure Food in Bangladesh'}`;
    } else if (currentView === 'product-detail' && viewParam) {
      const prod = StoreService.getProductBySlug(viewParam);
      document.title = prod ? `${prod.name} | ${storeName}` : `Product Details | ${storeName}`;
    } else if (currentView === 'admin') {
      document.title = `Admin Dashboard | ${storeName}`;
    } else if (currentView === 'cart') {
      document.title = `Shopping Cart | ${storeName}`;
    } else if (currentView === 'checkout') {
      document.title = `Checkout | ${storeName}`;
    } else if (currentView === 'track-order') {
      document.title = `Track Order | ${storeName}`;
    } else if (currentView === 'category-products') {
      const cat = StoreService.getCategoryBySlug(viewParam || '');
      document.title = cat ? `${cat.name} | ${storeName}` : `Category | ${storeName}`;
    } else {
      const formatted = currentView.charAt(0).toUpperCase() + currentView.slice(1).replace(/-/g, ' ');
      document.title = `${formatted} | ${storeName}`;
    }
  }, [currentView, viewParam, storeVersion]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView, viewParam]);

  // Record visitor on app load
  useEffect(() => {
    StoreService.recordVisitor();
  }, []);

  const handleNavigate = (view: string, param?: string) => {
    // When leaving the admin panel to visit the live store or another page:
    // Lock admin session so returning requires password again ("admin panal theke ber hoile pore abar admin panal e dhukte pass lagbi")
    if (currentView === 'admin' && view !== 'admin') {
      StoreService.setAdminSession(false);
    }

    setCurrentView(view);
    setViewParam(param);

    try {
      sessionStorage.setItem('khan_store_view', JSON.stringify({ view, param }));
      
      if (view === 'admin') {
        const targetPath = param ? `/admin/${encodeURIComponent(param)}` : '/admin';
        if (window.location.pathname !== targetPath) {
          window.history.pushState(null, '', targetPath);
        }
      } else {
        // If navigating to regular storefront view, clear /admin from pathname
        const newHash = param ? `#${view}/${encodeURIComponent(param)}` : (view === 'home' ? '' : `#${view}`);
        const targetUrl = newHash ? `/${newHash}` : '/';
        if (window.location.pathname !== '/' || window.location.hash !== newHash) {
          window.history.pushState(null, '', targetUrl);
        }
      }
    } catch (e) {
      // ignore
    }
  };

  const handleOrderPlaced = (orderNumber: string) => {
    setCurrentView('order-confirmation');
    setViewParam(orderNumber);
  };

  // Determine if Admin view is active
  const isAdminView = currentView === 'admin';

  return (
    <QuickOrderProvider onOrderSuccess={handleOrderPlaced}>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
        {/* Header is hidden in admin view for a completely isolated and focused admin experience */}
        {!isAdminView && (
          <Header
            currentView={currentView}
            viewParam={viewParam}
            onNavigate={handleNavigate}
            onOpenAreaModal={() => setIsAreaModalOpen(true)}
          />
        )}

      {/* Main Content Area */}
      <main className={isAdminView ? "flex-1 w-full bg-slate-100" : "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6"}>
        {currentView === 'home' && (
          <HomePage 
            onNavigate={handleNavigate} 
            onOpenAreaModal={() => setIsAreaModalOpen(true)}
          />
        )}

        {(currentView === 'shop' || currentView === 'category-products') && (
          <ShopPage
            initialCategory={viewParam}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'product-detail' && (
          <ProductDetailPage
            slug={viewParam || ''}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'cart' && (
          <CartPage
            onNavigate={handleNavigate}
            onOpenAreaModal={() => setIsAreaModalOpen(true)}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            onNavigate={handleNavigate}
            onOrderPlaced={handleOrderPlaced}
          />
        )}

        {currentView === 'order-confirmation' && (
          <OrderConfirmationPage
            orderNumber={viewParam || ''}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'track-order' && (
          <TrackOrderPage
            initialOrderNumber={viewParam}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'login' && (
          <AuthPage onNavigate={handleNavigate} />
        )}

        {currentView === 'customer-dashboard' && (
          <CustomerDashboardPage onNavigate={handleNavigate} />
        )}

        {currentView === 'admin' && (
          <AdminDashboard onNavigate={handleNavigate} />
        )}

        {(currentView === 'about' || currentView === 'about-us') && (
          <AboutUsPage />
        )}

        {currentView === 'faq' && (
          <FaqPage />
        )}

        {(currentView === 'contact' || currentView === 'contact-us') && (
          <ContactUsPage />
        )}

        {currentView === 'return-refund' && (
          <PoliciesPage type="return-refund" />
        )}

        {currentView === 'privacy' && (
          <PoliciesPage type="privacy" />
        )}

        {currentView === 'terms' && (
          <PoliciesPage type="terms" />
        )}
      </main>

      {/* Footer (hidden on full-screen admin view for cleaner workspace) */}
      {!isAdminView && (
        <Footer onNavigate={handleNavigate} />
      )}

      {/* Mobile Sticky Bottom Bar (hidden on admin view) */}
      {!isAdminView && (
        <MobileBottomNav
          activeView={currentView}
          onNavigate={handleNavigate}
          onOpenCart={() => setIsCartDrawerOpen(true)}
        />
      )}

      {/* Floating Right Cart Badge Widget (matching reference screenshot) */}
      {!isAdminView && (
        <>
          <FloatingCartButton />
          <FloatingWhatsAppButton />
        </>
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        onNavigate={handleNavigate}
        onOpenAreaModal={() => setIsAreaModalOpen(true)}
      />

      {/* Zone Delivery Modal */}
      <DeliveryAreaModal
        isOpen={isAreaModalOpen}
        onClose={() => setIsAreaModalOpen(false)}
      />
    </div>
  </QuickOrderProvider>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <MainApp />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
