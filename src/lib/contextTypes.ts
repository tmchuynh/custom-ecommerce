import {
  Currency,
  CountryTaxInfo,
  CartItem,
  ShippingAddress,
  AuthUser,
  LoginCredentials,
  SignUpCredentials,
  CreditCard,
  Payment,
  PaymentStatus,
  PaymentSubmissionData,
  ResetPasswordData,
} from "./interfaces";
import {
  ProductFilters,
  ProductType,
  ShippingMethod,
  SortOption,
} from "./types";

export interface ProductContextType {
  getProductByName: (name: string) => ProductType | undefined;
  getProductsByGender: (gender: string) => ProductType[];
  getProductsByCategory: (categoryObj: Record<string, any>) => any;
  getSubcategoriesByGender: (gender: string, category?: string) => string[];
  searchProducts: (query: string) => ProductType[];
  filterProducts: (filters: ProductFilters) => ProductType[];
  getRelatedProducts: (productName: string, limit?: number) => ProductType[];
  getFeaturedProducts: (limit?: number) => ProductType[];
  getNewArrivals: (limit?: number) => ProductType[];
  sortProducts: (products: ProductType[], sortBy: SortOption) => ProductType[];
  getProductsByPriceRange: (min: number, max: number) => ProductType[];
  convertPrice: (
    priceInUSD: number | string,
    currencyOverride?: Currency
  ) => string;
  formatPrice: (price: number, currencyCode: string) => string;
  hasDiscount: (id: string) => boolean;
  hasPriceDrop: (id: string) => boolean;
  updatePriceHistory: (id: string, newPrice: number) => void;

  // Inventory management
  getStockLevel: (productName: string) => number;
  isInStock: (productName: string) => boolean;
  isLowStock: (productName: string, threshold?: number) => boolean;

  // Ratings and reviews
  getProductRating: (productName: string) => number;
  getProductReviewCount: (productName: string) => number;

  // Analytics
  getPopularityScore: (productName: string) => number;
  getMostViewedProducts: (limit?: number) => ProductType[];
  getBestSellingProducts: (limit?: number) => ProductType[];

  // Price history stats
  getPriceHistory: (
    productName: string,
    days?: number
  ) => Array<{ date: string; price: number }>;
  getLowestPrice: (productName: string, days?: number) => number;
  getHighestPrice: (productName: string, days?: number) => number;
  getAveragePrice: (productName: string, days?: number) => number;
  getPriceDropPercentage: (productName: string) => number;

  getSalesCount: (productName: string) => number;

  updateStockLevel: (productName: string, quantity: number) => void;

  incrementViewCount: (productName: string) => void;
}

export interface CurrencyContextType {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  calculateImportFee: (value: number, countryCode: string) => number;
  getImportTaxBreakdown: (
    subtotal: number,
    country: string
  ) => {
    duty: number;
    vat: number;
    total: number;
    subtotal: number;
    grandTotal: number;
  };
  calculateImportTaxes: (
    subtotal: number,
    country: string
  ) => {
    dutyAmount: number;
    vatAmount: number;
    totalImportCharges: number;
    appliedDuty: boolean;
    appliedVAT: boolean;
  };

  // Currency conversion
  convertAmount: (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ) => number;
  formatCurrency: (amount: number, currencyCode: string) => string;

  // Currency rates management
  updateExchangeRate: (currencyCode: string, newRate: number) => void;
  getExchangeRate: (currencyCode: string) => number;

  // Currency validation
  isCurrencySupported: (currencyCode: string) => boolean;
  getAvailableCurrencies: () => Currency[];

  // Currency info
  getCurrencySymbol: (currencyCode: string) => string;
  getCurrencyName: (currencyCode: string) => string;

  getTaxInfoByCountryCode: (countryCode: string) => CountryTaxInfo | undefined;
  getTaxInfoByCountryName: (countryName: string) => CountryTaxInfo | undefined;
  getTaxInfoByCurrencyCode: (
    currencyCode: string
  ) => CountryTaxInfo | undefined;
  getTaxInfoByCurrencyName: (
    currencyName: string
  ) => CountryTaxInfo | undefined;
  getTaxInfoByCurrency: (currency: Currency) => CountryTaxInfo | undefined;
  getTaxInfoByCountry: (country: string) => CountryTaxInfo | undefined;

  // Last updated timestamp
  lastRatesUpdate: Date | null;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartItem: (name: string) => CartItem | undefined;
  updateQuantity: (id: string, quantity: number) => void;
  calculateTaxAmount: (total: number, country: string) => number;
  getTotalPrice: (country: string) => number;
  getSubTotal: () => number;
  getTotalItems: () => number;

  getShippingMethod: (totalItems: number) => ShippingMethod;
  itemExistsInCart: (name: string) => CartItem | undefined;
  applyDiscount: (code: string) => boolean;
  getDiscountedTotal: (country: string) => number;
  saveCartForLater: () => void;
  loadSavedCart: () => void;
  calculateShippingCost: (method: ShippingMethod) => number;
  getEstimatedDeliveryDate: (method: ShippingMethod) => Date;
  getDeliveryWindowDates: (
    method: ShippingMethod,
    startDate: Date,
    country: string
  ) => { windowStart: Date; windowEnd: Date };

  getDeliveryDescription: (
    shippingMethod: ShippingMethod,
    startDate: Date,
    country: string
  ) => string;
  moveToWishlist: (itemId: string) => void;
  calculateInternationalShippingFee: (
    country: string,
    method?: ShippingMethod
  ) => number;
  selectedShippingMethod: ShippingMethod;
  updateShippingMethod: (method: ShippingMethod) => void;
  getDeliveryEstimateText: (shippingCountry: string) => string;

  getProductSalesCount: (productName: string) => number;
  getSalesTrends: (days?: number) => Array<{
    date: string;
    productName: string;
    quantity: number;
  }>;
}

export interface WishlistContextType {
  wishlistItems: ProductType[];
  addToWishlist: (item: ProductType) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  getWishlistItem: (id: string) => ProductType | undefined;
  getWishlistItems: () => ProductType[];
  getWishlistCount: () => number;
  getWishlistTotalPrice: () => number;
  getWishlistItemByName: (name: string) => ProductType | undefined;
  isAuthenticated: boolean;
}

export interface CustomerContextType {
  validatePhone: (phone: string) => boolean;
  validateEmail: (email: string) => boolean;
  validateName: (name: string) => boolean;
  formatPhoneNumber: (phone: string) => string;
  validateAddress: (address: Partial<ShippingAddress>) => boolean;
  validatePostalCode: (postalCode: string, country?: string) => boolean;
  formatAddress: (address: ShippingAddress) => string;
  getDefaultShippingAddress: () => ShippingAddress | undefined;
  getCustomerAddresses: () => ShippingAddress[];
  getCustomerData: () => {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addresses: ShippingAddress[];
  } | null;
  isAuthenticated: boolean;
}

export interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  requestLoginCode: (identifier: string) => Promise<void>;
  resetPasswordRequest: (email: string) => Promise<void>;
  validateResetCode: (email: string, code: string) => Promise<boolean>;
  resetPassword: (data: ResetPasswordData) => Promise<void>;
}

export interface PaymentContextType {
  processPayment: (
    amount: number,
    cardDetails: CreditCard,
    currency?: string
  ) => Promise<Payment>;
  processingPayment: boolean;
  paymentError: string | null;
  clearPaymentError: () => void;
  getPaymentStatus: (paymentId: string) => PaymentStatus;
  lastPayment: Payment | null;
  validateCardDetails: (card: CreditCard) => boolean;
  processRefund: (paymentId: string) => Promise<Payment>;
  verifyPayment: (paymentId: string) => Promise<boolean>;
  handlePaymentSubmission: (
    data: PaymentSubmissionData
  ) => Promise<Payment | null>;
  validatePaymentSubmission: (data: PaymentSubmissionData) => boolean;
}
