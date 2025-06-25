# Context & State Management Documentation

This document covers the React Context providers and state management patterns used throughout the Custom E-Commerce Platform.

## 📋 Overview

The application uses React Context API for global state management, providing a centralized way to handle user authentication, shopping cart, wishlist, currency preferences, and order management across all components.

## 🏗️ Context Structure

```
src/app/context/
├── authContext.tsx          # User authentication and session management
├── cartContext.tsx          # Shopping cart state and operations
├── currencyContext.tsx      # Currency selection and conversion
├── NotFoundContext.tsx      # 404 error handling and navigation
├── orderContext.tsx         # Order management and tracking
└── wishlistContext.tsx      # Wishlist state and operations
```

## 🔐 Authentication Context

### Overview (`authContext.tsx`)
Manages user authentication, session handling, and protected route access.

### State Structure
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  loginAttempts: number;
  lastLoginTime: Date | null;
}

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: 'customer' | 'admin';
  membershipTier: 'basic' | 'premium' | 'gold';
  preferences: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  currency: string;
  language: string;
  notifications: boolean;
}
```

### Actions
```typescript
interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<AuthResult>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  refreshToken: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}
```

### Usage Example
```jsx
import { useAuth } from '@/app/context/authContext';

const LoginComponent = () => {
  const { login, isAuthenticated, user, isLoading } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      // Redirect to dashboard
    } catch (error) {
      // Handle login error
    }
  };

  if (isAuthenticated) {
    return <div>Welcome, {user.firstName}!</div>;
  }

  return <LoginForm onSubmit={handleLogin} loading={isLoading} />;
};
```

### Features
- **JWT Token Management**: Automatic token refresh and storage
- **Session Persistence**: Remember user across browser sessions
- **Role-Based Access**: Different permissions for customers and admins
- **Login Rate Limiting**: Prevent brute force attacks
- **Password Reset**: Secure password recovery flow
- **Email Verification**: Account verification system

## 🛒 Cart Context

### Overview (`cartContext.tsx`)
Manages shopping cart state, item operations, and cart persistence.

### State Structure
```typescript
interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discounts: Discount[];
  isLoading: boolean;
  lastUpdated: Date;
}

interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  selectedVariants: ProductVariant[];
  addedAt: Date;
}

interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
  minOrderValue: number;
}
```

### Actions
```typescript
interface CartActions {
  addItem: (product: Product, quantity?: number, variants?: ProductVariant[]) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (discountCode: string) => Promise<boolean>;
  removeDiscount: (discountId: string) => void;
  updateShipping: (shippingMethod: ShippingMethod) => void;
  saveForLater: (itemId: string) => void;
  moveToCart: (savedItemId: string) => void;
}
```

### Usage Example
```jsx
import { useCart } from '@/app/context/cartContext';

const ProductPage = ({ product }) => {
  const { addItem, items, totalItems } = useCart();

  const handleAddToCart = () => {
    addItem(product, 1);
    // Show success notification
  };

  const isInCart = items.some(item => item.productId === product.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <button 
        onClick={handleAddToCart}
        disabled={isInCart}
      >
        {isInCart ? 'In Cart' : 'Add to Cart'}
      </button>
      <span>Cart: {totalItems} items</span>
    </div>
  );
};
```

### Features
- **Local Storage Persistence**: Cart survives page refreshes
- **Real-time Updates**: Instant UI updates on cart changes
- **Discount System**: Support for coupon codes and promotions
- **Shipping Calculation**: Dynamic shipping cost calculation
- **Tax Calculation**: Automatic tax computation
- **Save for Later**: Move items between cart and saved items
- **Cart Validation**: Ensure product availability and pricing

## 💝 Wishlist Context

### Overview (`wishlistContext.tsx`)
Manages user's wishlist, saved items, and sharing functionality.

### State Structure
```typescript
interface WishlistState {
  items: WishlistItem[];
  totalItems: number;
  isLoading: boolean;
  lastUpdated: Date;
  sharedLists: SharedWishlist[];
}

interface WishlistItem {
  id: string;
  productId: string;
  product: Product;
  addedAt: Date;
  notes: string;
  priority: 'low' | 'medium' | 'high';
  priceAlert: boolean;
  targetPrice?: number;
}

interface SharedWishlist {
  id: string;
  name: string;
  items: WishlistItem[];
  shareCode: string;
  isPublic: boolean;
  collaborators: string[];
}
```

### Actions
```typescript
interface WishlistActions {
  addItem: (product: Product, notes?: string) => void;
  removeItem: (itemId: string) => void;
  updateNotes: (itemId: string, notes: string) => void;
  setPriceAlert: (itemId: string, targetPrice: number) => void;
  moveToCart: (itemId: string, quantity?: number) => void;
  createSharedList: (name: string, itemIds: string[]) => Promise<string>;
  shareList: (listId: string, email: string) => Promise<void>;
  clearWishlist: () => void;
}
```

### Usage Example
```jsx
import { useWishlist } from '@/app/context/wishlistContext';

const ProductCard = ({ product }) => {
  const { addItem, removeItem, items } = useWishlist();

  const isInWishlist = items.some(item => item.productId === product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      const item = items.find(item => item.productId === product.id);
      removeItem(item.id);
    } else {
      addItem(product);
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <button 
        onClick={toggleWishlist}
        className={isInWishlist ? 'text-red-500' : 'text-gray-400'}
      >
        ♥ {isInWishlist ? 'Remove' : 'Add to Wishlist'}
      </button>
    </div>
  );
};
```

### Features
- **Persistent Storage**: Wishlist survives browser sessions
- **Price Alerts**: Notify users when items go on sale
- **Notes & Priority**: Add personal notes and priority levels
- **Shared Wishlists**: Share wishlists with friends and family
- **Quick Actions**: Move items between wishlist and cart
- **Collaborative Lists**: Multiple users can edit shared lists

## 💱 Currency Context

### Overview (`currencyContext.tsx`)
Handles currency selection, exchange rates, and price formatting across the application.

### State Structure
```typescript
interface CurrencyState {
  currentCurrency: Currency;
  availableCurrencies: Currency[];
  exchangeRates: ExchangeRates;
  isLoading: boolean;
  lastUpdated: Date;
  formatPreferences: FormatPreferences;
}

interface Currency {
  code: string; // ISO 4217 currency code
  symbol: string;
  name: string;
  flag: string;
  decimalPlaces: number;
}

interface ExchangeRates {
  base: string;
  rates: Record<string, number>;
  timestamp: number;
}

interface FormatPreferences {
  showSymbol: boolean;
  symbolPosition: 'before' | 'after';
  thousandsSeparator: string;
  decimalSeparator: string;
}
```

### Actions
```typescript
interface CurrencyActions {
  changeCurrency: (currencyCode: string) => void;
  formatPrice: (amount: number, currency?: string) => string;
  convertPrice: (amount: number, fromCurrency: string, toCurrency: string) => number;
  updateExchangeRates: () => Promise<void>;
  setFormatPreferences: (preferences: Partial<FormatPreferences>) => void;
}
```

### Usage Example
```jsx
import { useCurrency } from '@/app/context/currencyContext';

const PriceDisplay = ({ price, originalCurrency = 'USD' }) => {
  const { formatPrice, convertPrice, currentCurrency } = useCurrency();

  const convertedPrice = convertPrice(price, originalCurrency, currentCurrency.code);
  const formattedPrice = formatPrice(convertedPrice);

  return (
    <div className="price-display">
      <span className="current-price">{formattedPrice}</span>
      {originalCurrency !== currentCurrency.code && (
        <span className="original-price">
          Originally {formatPrice(price, originalCurrency)}
        </span>
      )}
    </div>
  );
};

const CurrencySelector = () => {
  const { currentCurrency, availableCurrencies, changeCurrency } = useCurrency();

  return (
    <select 
      value={currentCurrency.code} 
      onChange={(e) => changeCurrency(e.target.value)}
    >
      {availableCurrencies.map(currency => (
        <option key={currency.code} value={currency.code}>
          {currency.flag} {currency.code} - {currency.name}
        </option>
      ))}
    </select>
  );
};
```

### Features
- **Multi-Currency Support**: Support for major world currencies
- **Real-time Exchange Rates**: Automatic rate updates
- **Flexible Formatting**: Customizable price display formats
- **Localization**: Currency formatting based on locale
- **Offline Fallback**: Cached rates for offline use
- **User Preferences**: Remember user's currency choice

## 📦 Order Context

### Overview (`orderContext.tsx`)
Manages order processing, tracking, and history.

### State Structure
```typescript
interface OrderState {
  currentOrder: Order | null;
  orderHistory: Order[];
  isProcessing: boolean;
  trackingInfo: TrackingInfo | null;
  isLoading: boolean;
}

interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  customer: Customer;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  subtotal: number;
  tax: number;
  shipping: number;
  discounts: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery: Date;
}

type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  variants: ProductVariant[];
}

interface TrackingInfo {
  orderId: string;
  trackingNumber: string;
  carrier: string;
  status: string;
  estimatedDelivery: Date;
  trackingEvents: TrackingEvent[];
}
```

### Actions
```typescript
interface OrderActions {
  createOrder: (orderData: CreateOrderData) => Promise<Order>;
  cancelOrder: (orderId: string, reason: string) => Promise<void>;
  trackOrder: (orderNumber: string) => Promise<TrackingInfo>;
  requestRefund: (orderId: string, items: string[], reason: string) => Promise<void>;
  updateShippingAddress: (orderId: string, address: Address) => Promise<void>;
  reorder: (orderId: string) => Promise<void>;
  downloadInvoice: (orderId: string) => Promise<Blob>;
}
```

### Usage Example
```jsx
import { useOrder } from '@/app/context/orderContext';

const CheckoutPage = () => {
  const { createOrder, isProcessing } = useOrder();
  const { items, totalPrice } = useCart();

  const handlePlaceOrder = async (orderData) => {
    try {
      const order = await createOrder({
        items: items,
        ...orderData
      });
      
      // Redirect to order confirmation
      router.push(`/orders/${order.id}/confirmation`);
    } catch (error) {
      // Handle order creation error
    }
  };

  return (
    <div>
      <OrderSummary items={items} total={totalPrice} />
      <CheckoutForm onSubmit={handlePlaceOrder} loading={isProcessing} />
    </div>
  );
};

const OrderTracking = ({ orderNumber }) => {
  const { trackOrder, trackingInfo } = useOrder();

  useEffect(() => {
    trackOrder(orderNumber);
  }, [orderNumber]);

  return (
    <div>
      {trackingInfo && (
        <div>
          <h2>Order Status: {trackingInfo.status}</h2>
          <p>Tracking Number: {trackingInfo.trackingNumber}</p>
          <p>Estimated Delivery: {trackingInfo.estimatedDelivery}</p>
          
          <TrackingTimeline events={trackingInfo.trackingEvents} />
        </div>
      )}
    </div>
  );
};
```

### Features
- **Order Processing**: Complete order lifecycle management
- **Order Tracking**: Real-time order status and tracking
- **Order History**: Access to past orders and invoices
- **Refund Management**: Handle returns and refunds
- **Reorder Functionality**: Quick reorder from order history
- **Invoice Generation**: PDF invoice download
- **Address Management**: Update shipping addresses

## 🚫 Not Found Context

### Overview (`NotFoundContext.tsx`)
Handles 404 errors, navigation suggestions, and search functionality.

### State Structure
```typescript
interface NotFoundState {
  searchSuggestions: SearchSuggestion[];
  popularPages: PopularPage[];
  recentSearches: string[];
  isLoading: boolean;
}

interface SearchSuggestion {
  type: 'product' | 'category' | 'page';
  title: string;
  url: string;
  description: string;
  confidence: number;
}

interface PopularPage {
  title: string;
  url: string;
  visits: number;
  category: string;
}
```

### Actions
```typescript
interface NotFoundActions {
  generateSuggestions: (path: string) => Promise<SearchSuggestion[]>;
  recordSearch: (query: string) => void;
  getPopularPages: () => Promise<PopularPage[]>;
  reportBrokenLink: (url: string, referrer: string) => Promise<void>;
}
```

## 🛠️ Context Best Practices

### 1. Context Provider Setup
```jsx
// providers.tsx
import { AuthProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';
import { WishlistProvider } from './context/wishlistContext';
import { CurrencyProvider } from './context/currencyContext';
import { OrderProvider } from './context/orderContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              {children}
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}
```

### 2. Custom Hook Pattern
```typescript
// Example: useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
```

### 3. Type Safety
```typescript
// Ensure all context values are properly typed
interface ContextValue {
  state: State;
  actions: Actions;
}

const Context = createContext<ContextValue | undefined>(undefined);
```

### 4. Performance Optimization
```typescript
// Split contexts to prevent unnecessary re-renders
const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthActionsContext = createContext<AuthActions | undefined>(undefined);

// Use separate providers for state and actions
export const AuthProvider = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);
  
  const actions = useMemo(() => ({
    login: (credentials) => {/* implementation */},
    logout: () => {/* implementation */},
    // ... other actions
  }), []);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionsContext.Provider value={actions}>
        {children}
      </AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  );
};
```

## 🔄 State Synchronization

### Local Storage Integration
```typescript
// Persist context state to localStorage
const usePersistedState = <T>(key: string, defaultValue: T) => {
  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState] as const;
};
```

### Cross-Tab Synchronization
```typescript
// Sync state across browser tabs
useEffect(() => {
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'cart_state' && e.newValue) {
      setState(JSON.parse(e.newValue));
    }
  };

  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}, []);
```

## 🧪 Testing Context

### Context Testing Example
```typescript
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/context/authContext';

const TestComponent = () => {
  const { user, isAuthenticated } = useAuth();
  return (
    <div>
      <span data-testid="auth-status">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </span>
      {user && <span data-testid="user-name">{user.firstName}</span>}
    </div>
  );
};

describe('AuthContext', () => {
  it('provides authentication status', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
  });
});
```

### Mock Context for Testing
```typescript
// Create mock context for unit tests
export const createMockAuthContext = (overrides = {}) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  ...overrides,
});
```

## 🚀 Future Enhancements

### Planned Context Improvements
- **Notification Context**: Global notification system
- **Theme Context**: Advanced theme customization
- **Analytics Context**: User behavior tracking
- **Search Context**: Global search functionality
- **Chat Context**: Customer support chat system

### State Management Evolution
- **Redux Toolkit Integration**: For complex state scenarios
- **React Query Integration**: For server state management
- **Zustand Migration**: Lighter alternative for some contexts
- **State Persistence**: Advanced caching strategies
- **Real-time Updates**: WebSocket integration for live data
