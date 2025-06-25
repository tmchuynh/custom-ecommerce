# Custom Hooks Documentation

This document provides comprehensive documentation for all custom React hooks used in the Custom E-Commerce Platform.

## 📋 Overview

Custom hooks encapsulate reusable logic and provide a clean way to share stateful logic between components. Our application uses custom hooks for responsive design, authentication guards, order management, clipboard operations, and various utility functions.

## 🏗️ Hooks Structure

```
src/hooks/
├── use-copy-to-clipboard.ts    # Clipboard operations
├── use-large-screen.ts         # Large screen detection
├── use-media-query.ts          # Media query handling
├── use-mobile.ts               # Mobile device detection
├── use-mounted.ts              # Component mount status
├── use-tablet.ts               # Tablet device detection
├── useAuthGuard.ts             # Authentication protection
├── useOrderManagement.ts       # Order operations
├── useOrderNotifications.ts    # Order notification system
├── useProtectedAction.ts       # Protected action execution
└── usePurchaseHistory.ts       # Purchase history management
```

## 📱 Responsive Design Hooks

### useMediaQuery (`use-media-query.ts`)
Core hook for responsive design and media query handling.

**Purpose**: Provides a React hook for matching CSS media queries in JavaScript.

**Implementation**:
```typescript
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    
    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    } 
    // Legacy browsers
    else {
      media.addListener(listener);
      return () => media.removeListener(listener);
    }
  }, [matches, query]);

  return matches;
}
```

**Usage**:
```jsx
import { useMediaQuery } from '@/hooks/use-media-query';

const ResponsiveComponent = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isDark = useMediaQuery('(prefers-color-scheme: dark)');
  
  return (
    <div>
      {isDesktop ? <DesktopLayout /> : <MobileLayout />}
      <p>User prefers {isDark ? 'dark' : 'light'} theme</p>
    </div>
  );
};
```

**Common Media Queries**:
- `(min-width: 768px)` - Tablet and up
- `(min-width: 1024px)` - Desktop and up
- `(max-width: 767px)` - Mobile only
- `(prefers-color-scheme: dark)` - Dark mode preference
- `(orientation: landscape)` - Landscape orientation

### useMobile (`use-mobile.ts`)
Detects mobile devices and provides mobile-specific functionality.

**Implementation**:
```typescript
import { useMediaQuery } from './use-media-query';

export function useMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

export function useMobileOrTablet(): boolean {
  return useMediaQuery('(max-width: 1023px)');
}

export function useTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouch;
}
```

**Usage**:
```jsx
import { useMobile, useTouchDevice } from '@/hooks/use-mobile';

const NavigationMenu = () => {
  const isMobile = useMobile();
  const isTouch = useTouchDevice();
  
  return (
    <nav>
      {isMobile ? (
        <MobileMenu touchEnabled={isTouch} />
      ) : (
        <DesktopMenu />
      )}
    </nav>
  );
};
```

### useTablet (`use-tablet.ts`)
Specific hook for tablet device detection.

**Implementation**:
```typescript
import { useMediaQuery } from './use-media-query';

export function useTablet(): boolean {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
}

export function useTabletOrLarger(): boolean {
  return useMediaQuery('(min-width: 768px)');
}
```

### useLargeScreen (`use-large-screen.ts`)
Detects large screen devices for enhanced layouts.

**Implementation**:
```typescript
import { useMediaQuery } from './use-media-query';

export function useLargeScreen(): boolean {
  return useMediaQuery('(min-width: 1024px)');
}

export function useExtraLargeScreen(): boolean {
  return useMediaQuery('(min-width: 1280px)');
}

export function useUltraWideScreen(): boolean {
  return useMediaQuery('(min-width: 1920px)');
}
```

**Usage**:
```jsx
import { useLargeScreen, useUltraWideScreen } from '@/hooks/use-large-screen';

const ProductGrid = ({ products }) => {
  const isLarge = useLargeScreen();
  const isUltraWide = useUltraWideScreen();
  
  const getColumns = () => {
    if (isUltraWide) return 6;
    if (isLarge) return 4;
    return 2;
  };
  
  return (
    <div className={`grid grid-cols-${getColumns()} gap-4`}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

## 🔒 Authentication Hooks

### useAuthGuard (`useAuthGuard.ts`)
Protects routes and components from unauthorized access.

**Implementation**:
```typescript
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/authContext';

interface UseAuthGuardOptions {
  redirectTo?: string;
  requiredRole?: string[];
  requireMembership?: boolean;
  onUnauthorized?: () => void;
}

export function useAuthGuard(options: UseAuthGuardOptions = {}) {
  const { 
    redirectTo = '/login',
    requiredRole = [],
    requireMembership = false,
    onUnauthorized
  } = options;

  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    // Check authentication
    if (!isAuthenticated) {
      onUnauthorized?.();
      router.push(redirectTo);
      return;
    }

    // Check role requirements
    if (requiredRole.length > 0 && !requiredRole.includes(user?.role)) {
      onUnauthorized?.();
      router.push('/forbidden');
      return;
    }

    // Check membership requirements
    if (requireMembership && user?.membershipTier === 'basic') {
      onUnauthorized?.();
      router.push('/membership');
      return;
    }
  }, [isAuthenticated, isLoading, user, requiredRole, requireMembership]);

  return {
    isAuthorized: isAuthenticated && 
      (requiredRole.length === 0 || requiredRole.includes(user?.role)) &&
      (!requireMembership || user?.membershipTier !== 'basic'),
    user,
    isLoading
  };
}
```

**Usage**:
```jsx
import { useAuthGuard } from '@/hooks/useAuthGuard';

const AdminDashboard = () => {
  const { isAuthorized, isLoading } = useAuthGuard({
    requiredRole: ['admin'],
    redirectTo: '/login',
    onUnauthorized: () => {
      toast.error('Admin access required');
    }
  });

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthorized) return null;

  return <AdminDashboardContent />;
};

// Protected page component
const PremiumFeature = () => {
  useAuthGuard({
    requireMembership: true,
    redirectTo: '/membership'
  });

  return <PremiumContent />;
};
```

### useProtectedAction (`useProtectedAction.ts`)
Wraps actions that require authentication or specific permissions.

**Implementation**:
```typescript
import { useCallback } from 'react';
import { useAuth } from '@/app/context/authContext';
import { toast } from 'sonner';

interface ProtectedActionOptions {
  requireAuth?: boolean;
  requiredRole?: string[];
  requireMembership?: boolean;
  showLoginPrompt?: boolean;
  onUnauthorized?: () => void;
}

export function useProtectedAction(options: ProtectedActionOptions = {}) {
  const {
    requireAuth = true,
    requiredRole = [],
    requireMembership = false,
    showLoginPrompt = true,
    onUnauthorized
  } = options;

  const { user, isAuthenticated } = useAuth();

  const executeAction = useCallback(
    <T extends any[], R>(
      action: (...args: T) => R,
      unauthorizedMessage?: string
    ) => {
      return (...args: T): R | null => {
        // Check authentication
        if (requireAuth && !isAuthenticated) {
          if (showLoginPrompt) {
            toast.error('Please log in to continue');
          }
          onUnauthorized?.();
          return null;
        }

        // Check role requirements
        if (requiredRole.length > 0 && !requiredRole.includes(user?.role)) {
          toast.error(unauthorizedMessage || 'Insufficient permissions');
          onUnauthorized?.();
          return null;
        }

        // Check membership requirements
        if (requireMembership && user?.membershipTier === 'basic') {
          toast.error('Premium membership required');
          onUnauthorized?.();
          return null;
        }

        // Execute the action
        return action(...args);
      };
    },
    [isAuthenticated, user, requireAuth, requiredRole, requireMembership]
  );

  return {
    executeAction,
    canExecute: isAuthenticated &&
      (requiredRole.length === 0 || requiredRole.includes(user?.role)) &&
      (!requireMembership || user?.membershipTier !== 'basic')
  };
}
```

**Usage**:
```jsx
import { useProtectedAction } from '@/hooks/useProtectedAction';

const ProductActions = ({ product }) => {
  const { executeAction, canExecute } = useProtectedAction({
    requireAuth: true,
    showLoginPrompt: true
  });

  const handleAddToWishlist = executeAction(
    (productId: string) => {
      // Add to wishlist logic
      addToWishlist(productId);
      toast.success('Added to wishlist');
    },
    'Please log in to add items to your wishlist'
  );

  const handleAddToCart = executeAction((productId: string, quantity: number) => {
    // Add to cart logic
    addToCart(productId, quantity);
  });

  return (
    <div>
      <button onClick={() => handleAddToCart(product.id, 1)}>
        Add to Cart
      </button>
      <button 
        onClick={() => handleAddToWishlist(product.id)}
        disabled={!canExecute}
      >
        Add to Wishlist
      </button>
    </div>
  );
};
```

## 🛒 E-commerce Hooks

### useOrderManagement (`useOrderManagement.ts`)
Comprehensive order management functionality.

**Implementation**:
```typescript
import { useState, useCallback } from 'react';
import { useAuth } from '@/app/context/authContext';
import { useCart } from '@/app/context/cartContext';

interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  createdAt: Date;
  // ... other order properties
}

type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export function useOrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const { clearCart } = useCart();

  const createOrder = useCallback(async (orderData: CreateOrderData): Promise<Order> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();
      setOrders(prev => [order, ...prev]);
      clearCart();
      
      return order;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user, clearCart]);

  const cancelOrder = useCallback(async (orderId: string, reason: string) => {
    setIsLoading(true);
    
    try {
      await fetch(`/api/orders/${orderId}/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify({ reason })
      });

      setOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { ...order, status: 'cancelled' }
            : order
        )
      );
    } catch (err) {
      setError('Failed to cancel order');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const trackOrder = useCallback(async (orderNumber: string) => {
    try {
      const response = await fetch(`/api/orders/track/${orderNumber}`);
      return await response.json();
    } catch (err) {
      setError('Failed to track order');
      throw err;
    }
  }, []);

  const reorder = useCallback(async (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) throw new Error('Order not found');

    // Add order items back to cart
    order.items.forEach(item => {
      addToCart(item.product, item.quantity);
    });
  }, [orders]);

  return {
    orders,
    isLoading,
    error,
    createOrder,
    cancelOrder,
    trackOrder,
    reorder
  };
}
```

**Usage**:
```jsx
import { useOrderManagement } from '@/hooks/useOrderManagement';

const CheckoutPage = () => {
  const { createOrder, isLoading } = useOrderManagement();
  const { items, total } = useCart();

  const handlePlaceOrder = async (shippingInfo, paymentInfo) => {
    try {
      const order = await createOrder({
        items,
        shippingAddress: shippingInfo,
        paymentMethod: paymentInfo,
        total
      });
      
      router.push(`/orders/${order.id}/confirmation`);
    } catch (error) {
      toast.error('Failed to place order');
    }
  };

  return (
    <CheckoutForm 
      onSubmit={handlePlaceOrder}
      loading={isLoading}
    />
  );
};
```

### usePurchaseHistory (`usePurchaseHistory.ts`)
Manages user's purchase history and analytics.

**Implementation**:
```typescript
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/context/authContext';

interface PurchaseStats {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  favoriteCategories: string[];
  yearlySpending: Record<string, number>;
}

export function usePurchaseHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<PurchaseStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user, isAuthenticated } = useAuth();

  const fetchPurchaseHistory = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/users/${user?.id}/orders`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });

      const data = await response.json();
      setOrders(data.orders);
      setStats(calculateStats(data.orders));
    } catch (err) {
      setError('Failed to fetch purchase history');
    } finally {
      setIsLoading(false);
    }
  }, [user, isAuthenticated]);

  const calculateStats = useCallback((orders: Order[]): PurchaseStats => {
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

    // Calculate favorite categories
    const categoryCount: Record<string, number> = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        const category = item.product.category;
        categoryCount[category] = (categoryCount[category] || 0) + item.quantity;
      });
    });

    const favoriteCategories = Object.entries(categoryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([category]) => category);

    // Calculate yearly spending
    const yearlySpending: Record<string, number> = {};
    orders.forEach(order => {
      const year = new Date(order.createdAt).getFullYear().toString();
      yearlySpending[year] = (yearlySpending[year] || 0) + order.total;
    });

    return {
      totalOrders,
      totalSpent,
      averageOrderValue,
      favoriteCategories,
      yearlySpending
    };
  }, []);

  useEffect(() => {
    fetchPurchaseHistory();
  }, [fetchPurchaseHistory]);

  const getOrdersByStatus = useCallback((status: OrderStatus) => {
    return orders.filter(order => order.status === status);
  }, [orders]);

  const getOrdersByDateRange = useCallback((startDate: Date, endDate: Date) => {
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= startDate && orderDate <= endDate;
    });
  }, [orders]);

  return {
    orders,
    stats,
    isLoading,
    error,
    getOrdersByStatus,
    getOrdersByDateRange,
    refetch: fetchPurchaseHistory
  };
}
```

### useOrderNotifications (`useOrderNotifications.ts`)
Handles order-related notifications and updates.

**Implementation**:
```typescript
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/app/context/authContext';
import { toast } from 'sonner';

interface OrderNotification {
  id: string;
  orderId: string;
  type: 'status_update' | 'delivery' | 'refund' | 'reminder';
  message: string;
  timestamp: Date;
  read: boolean;
}

export function useOrderNotifications() {
  const [notifications, setNotifications] = useState<OrderNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user, isAuthenticated } = useAuth();

  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch(`/api/users/${user?.id}/notifications/orders`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });

      const data = await response.json();
      setNotifications(data.notifications);
      setUnreadCount(data.notifications.filter(n => !n.read).length);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  }, [user, isAuthenticated]);

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });

      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, read: true } : n
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }, [user]);

  const markAllAsRead = useCallback(async () => {
    try {
      await fetch(`/api/users/${user?.id}/notifications/mark-all-read`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${user?.token}`
        }
      });

      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  }, [user]);

  // Listen for real-time notifications
  useEffect(() => {
    if (!isAuthenticated) return;

    // Simulated WebSocket connection for order updates
    const eventSource = new EventSource(`/api/orders/events?userId=${user?.id}`);
    
    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
      
      // Show toast notification
      toast.info(notification.message, {
        action: {
          label: 'View',
          onClick: () => markAsRead(notification.id)
        }
      });
    };

    return () => {
      eventSource.close();
    };
  }, [user, isAuthenticated]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications
  };
}
```

## 🔧 Utility Hooks

### useMounted (`use-mounted.ts`)
Prevents hydration mismatches in Next.js by tracking component mount status.

**Implementation**:
```typescript
import { useState, useEffect } from 'react';

export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
```

**Usage**:
```jsx
import { useMounted } from '@/hooks/use-mounted';

const ClientOnlyComponent = () => {
  const mounted = useMounted();

  if (!mounted) {
    return <div>Loading...</div>; // Or return null
  }

  return (
    <div>
      {/* Client-side only content */}
      <ThemeToggle />
      <UserPreferences />
    </div>
  );
};
```

### useCopyToClipboard (`use-copy-to-clipboard.ts`)
Provides clipboard copy functionality with success feedback.

**Implementation**:
```typescript
import { useState, useCallback } from 'react';

type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): [CopyFn, boolean] {
  const [isCopied, setIsCopied] = useState(false);

  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      
      // Reset after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
      
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setIsCopied(false);
      return false;
    }
  }, []);

  return [copy, isCopied];
}
```

**Usage**:
```jsx
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

const ShareComponent = ({ url }) => {
  const [copy, isCopied] = useCopyToClipboard();

  const handleCopy = () => {
    copy(url);
  };

  return (
    <button onClick={handleCopy}>
      {isCopied ? 'Copied!' : 'Copy Link'}
    </button>
  );
};

const OrderConfirmation = ({ orderNumber }) => {
  const [copy, isCopied] = useCopyToClipboard();

  return (
    <div>
      <p>Order Number: {orderNumber}</p>
      <button onClick={() => copy(orderNumber)}>
        {isCopied ? '✓ Copied' : 'Copy Order Number'}
      </button>
    </div>
  );
};
```

## 🧪 Testing Custom Hooks

### Testing Setup
```typescript
import { renderHook, act } from '@testing-library/react';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('copies text to clipboard', async () => {
    const { result } = renderHook(() => useCopyToClipboard());
    const [copy] = result.current;

    await act(async () => {
      const success = await copy('test text');
      expect(success).toBe(true);
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
  });

  it('sets isCopied to true after successful copy', async () => {
    const { result } = renderHook(() => useCopyToClipboard());
    const [copy] = result.current;

    await act(async () => {
      await copy('test text');
    });

    const [, isCopied] = result.current;
    expect(isCopied).toBe(true);
  });
});
```

### Testing Hooks with Context
```typescript
import { renderHook } from '@testing-library/react';
import { AuthProvider } from '@/context/authContext';
import { useAuthGuard } from '@/hooks/useAuthGuard';

const wrapper = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('useAuthGuard', () => {
  it('redirects unauthenticated users', () => {
    const mockPush = jest.fn();
    jest.mock('next/navigation', () => ({
      useRouter: () => ({ push: mockPush })
    }));

    renderHook(() => useAuthGuard(), { wrapper });
    
    expect(mockPush).toHaveBeenCalledWith('/login');
  });
});
```

## 🚀 Future Hook Enhancements

### Planned Additions
- **useDebounce**: Debounce user input for search and forms
- **useLocalStorage**: Enhanced local storage with type safety
- **useSessionStorage**: Session storage with automatic serialization
- **useEventListener**: Simplified event listener management
- **useIntersectionObserver**: Intersection observer for lazy loading
- **useFetch**: Simplified data fetching with caching
- **useWebSocket**: Real-time communication hook
- **useGeolocation**: Location-based features
- **useNotifications**: Push notification management
- **useAnalytics**: User behavior tracking

### Performance Optimizations
- **Memoization**: Automatic memoization for expensive computations
- **Lazy Evaluation**: Defer expensive operations until needed
- **Cleanup**: Automatic cleanup for subscriptions and timers
- **Error Boundaries**: Integrated error handling for hooks
- **Type Safety**: Enhanced TypeScript support for all hooks
