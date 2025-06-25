# API Documentation

This document covers the API layer and data fetching mechanisms used in the Custom E-Commerce Platform.

## 📋 Overview

The application uses a combination of external APIs and client-side data management to provide a complete e-commerce experience without requiring a backend database. All data persistence is handled through local storage and external API services.

## 🔗 External APIs

### DummyJSON API
**Base URL**: `https://dummyjson.com`

The primary data source for products, users, and other e-commerce data.

#### Products API
- **GET /products** - Fetch all products
- **GET /products/{id}** - Fetch single product
- **GET /products/categories** - Fetch product categories
- **GET /products/category/{category}** - Fetch products by category
- **GET /products/search?q={query}** - Search products

#### Users API
- **POST /auth/login** - User authentication
- **GET /users/{id}** - Fetch user profile
- **GET /users** - Fetch all users (admin)

#### Carts API
- **GET /carts** - Fetch all carts
- **GET /carts/{id}** - Fetch single cart
- **POST /carts/add** - Add new cart
- **PUT /carts/{id}** - Update cart
- **DELETE /carts/{id}** - Delete cart

## 🏗️ API Layer Structure

```
src/api/
├── index.ts          # Main API configuration and base client
├── products.ts       # Product-related API calls
├── users.ts          # User authentication and profile API calls
└── carts.ts          # Shopping cart API calls
```

### Base API Configuration (`src/api/index.ts`)

```typescript
// Base API client configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dummyjson.com';

// Common headers and configurations
export const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
};

// Error handling utilities
export const handleApiError = (error: any) => {
  // Error handling logic
};
```

### Products API (`src/api/products.ts`)

Handles all product-related API calls:

- **fetchProducts()** - Get all products with pagination
- **fetchProductById(id)** - Get single product details
- **fetchProductsByCategory(category)** - Get products by category
- **searchProducts(query)** - Search products by name/description
- **fetchCategories()** - Get all available categories

### Users API (`src/api/users.ts`)

Manages user authentication and profile data:

- **authenticateUser(credentials)** - Login user
- **fetchUserProfile(id)** - Get user profile
- **updateUserProfile(id, data)** - Update user information

### Carts API (`src/api/carts.ts`)

Handles shopping cart operations:

- **fetchUserCart(userId)** - Get user's cart
- **addToCart(productId, quantity)** - Add product to cart
- **updateCartItem(itemId, quantity)** - Update cart item
- **removeFromCart(itemId)** - Remove item from cart

## 🔄 Data Flow

### 1. Product Data Flow
```
DummyJSON API → Products API → React Components → UI Display
```

### 2. Authentication Flow
```
User Input → Users API → DummyJSON Auth → JWT Token → Local Storage
```

### 3. Cart Management Flow
```
User Action → Cart Context → Local Storage ↔ Carts API → DummyJSON
```

## 💾 Local Storage Management

Since the application doesn't use a backend database, certain data is persisted locally:

### Stored Data
- **User Authentication**: JWT tokens and user session
- **Shopping Cart**: Cart items and quantities
- **Wishlist**: Saved products
- **User Preferences**: Theme, currency, language
- **Order History**: Completed orders (mock data)

### Storage Keys
```typescript
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'ecommerce_auth_token',
  USER_DATA: 'ecommerce_user_data',
  CART_ITEMS: 'ecommerce_cart',
  WISHLIST: 'ecommerce_wishlist',
  USER_PREFERENCES: 'ecommerce_preferences',
  ORDER_HISTORY: 'ecommerce_orders',
};
```

## 🔐 Authentication & Authorization

### JWT Token Management
The application uses JWT tokens for authentication:

1. **Login Process**:
   - Send credentials to DummyJSON auth endpoint
   - Receive JWT token
   - Store token in local storage
   - Use token for subsequent API calls

2. **Token Validation**:
   - Check token expiration
   - Refresh token when needed
   - Clear token on logout

3. **Protected Routes**:
   - Verify token before accessing protected pages
   - Redirect to login if unauthorized

### Example Implementation
```typescript
// Authentication utility
export const auth = {
  login: async (credentials: LoginCredentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    
    if (data.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data.user));
    }
    
    return data;
  },
  
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },
  
  getToken: () => localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
  
  isAuthenticated: () => !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
};
```

## 🚀 API Performance Optimization

### Caching Strategy
- **Product Data**: Cache frequently accessed products
- **Category Data**: Cache category list for navigation
- **User Profile**: Cache user data after login

### Request Optimization
- **Debounced Search**: Prevent excessive search API calls
- **Pagination**: Load products in chunks
- **Lazy Loading**: Load additional data as needed

### Error Handling
- **Retry Logic**: Automatically retry failed requests
- **Fallback Data**: Use cached data when API is unavailable
- **User Feedback**: Show appropriate error messages

## 🧪 Testing API Integration

### Mock Data for Development
```typescript
// Mock product data for testing
export const mockProducts = [
  {
    id: 1,
    title: "Sample Product",
    price: 29.99,
    category: "electronics",
    // ... other properties
  },
];

// Mock API responses for testing
export const mockApiResponses = {
  products: mockProducts,
  user: mockUser,
  cart: mockCart,
};
```

### API Testing Utilities
- **API Response Validation**: Ensure data matches expected schema
- **Error Scenario Testing**: Test network failures and API errors
- **Performance Testing**: Monitor API response times

## 📊 API Monitoring

### Analytics Integration
- Track API response times
- Monitor error rates
- Analyze user interaction patterns

### Performance Metrics
- **Average Response Time**: Track API performance
- **Success Rate**: Monitor API reliability
- **User Engagement**: Track feature usage

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
NEXT_PUBLIC_API_TIMEOUT=10000

# Authentication
JWT_SECRET=your_jwt_secret_here

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_CACHING=true
```

### API Rate Limiting
The application implements client-side rate limiting to respect API constraints:
- Maximum 100 requests per minute
- Automatic backoff on rate limit errors
- Queue management for burst requests

## 🚨 Error Handling

### Common Error Scenarios
1. **Network Errors**: Connection failures, timeouts
2. **Authentication Errors**: Invalid tokens, expired sessions
3. **Validation Errors**: Invalid input data
4. **Rate Limiting**: Too many requests
5. **Server Errors**: API service unavailable

### Error Recovery Strategies
- **Automatic Retry**: Retry failed requests with exponential backoff
- **Graceful Degradation**: Show cached data when API is unavailable
- **User Notification**: Inform users of issues with clear messages
- **Fallback Options**: Provide alternative actions when features fail

## 📈 Future Enhancements

### Planned API Improvements
- **GraphQL Integration**: More efficient data fetching
- **Real-time Updates**: WebSocket connections for live data
- **Advanced Caching**: Redis or similar for better performance
- **API Versioning**: Support for multiple API versions
- **Microservices**: Split functionality into separate services

### Additional External Services
- **Payment Processing**: Stripe, PayPal integration
- **Email Services**: SendGrid, Mailgun for notifications
- **Image CDN**: Cloudinary for optimized product images
- **Analytics**: Google Analytics, Mixpanel for user tracking
