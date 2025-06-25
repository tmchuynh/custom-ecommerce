# Development Guide

This comprehensive guide covers development best practices, coding standards, testing strategies, and workflows for contributing to the Custom E-Commerce Platform.

## 📋 Overview

This guide is designed to help developers understand the codebase structure, development workflows, and best practices for maintaining high code quality and consistency across the project.

## 🛠️ Development Environment Setup

### Prerequisites

**Required Software**
- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher (or yarn/pnpm/bun)
- **Git**: Latest version
- **VS Code**: Recommended IDE with extensions

**Recommended VS Code Extensions**
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "github.copilot",
    "ms-playwright.playwright"
  ]
}
```

### Initial Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd custom-ecommerce
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Edit environment variables
   nano .env.local
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Verify Setup**
   - Open http://localhost:3000
   - Check that all pages load correctly
   - Verify API connections are working

## 📁 Project Structure Deep Dive

### Source Code Organization

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Route groups for auth pages
│   ├── (dashboard)/       # Protected dashboard routes
│   ├── (public)/          # Public routes
│   ├── api/               # API routes
│   ├── context/           # React Context providers
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── loading.tsx        # Loading UI
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── features/         # Feature-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   ├── utils.ts          # General utilities
│   ├── constants/        # Application constants
│   ├── types/            # TypeScript type definitions
│   ├── interfaces/       # TypeScript interfaces
│   └── api/              # API client functions
└── styles/               # Additional styling
```

### File Naming Conventions

**Components**
- Use PascalCase: `ProductCard.tsx`
- Include component type: `ProductForm.tsx`, `UserModal.tsx`
- Use descriptive names: `NavigationHeader.tsx` not `Header.tsx`

**Hooks**
- Prefix with "use": `useProductSearch.ts`
- Be descriptive: `useShoppingCart.ts` not `useCart.ts`

**Utilities**
- Use camelCase: `formatCurrency.ts`
- Group related functions: `dateUtils.ts`, `stringUtils.ts`

**Types and Interfaces**
- Use PascalCase: `Product.ts`, `UserProfile.ts`
- Suffix interfaces with "Interface" if needed: `ApiResponseInterface.ts`

## 🎨 Coding Standards

### TypeScript Best Practices

**Type Definitions**
```typescript
// Define clear interfaces
interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  inStock: boolean;
  images: ProductImage[];
  variants?: ProductVariant[];
  metadata?: Record<string, unknown>;
}

// Use union types for known values
type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

// Use generic types for reusability
interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}

// Use utility types
type CreateProductRequest = Omit<Product, 'id' | 'metadata'>;
type UpdateProductRequest = Partial<Pick<Product, 'name' | 'price' | 'category'>>;
```

**Function Declarations**
```typescript
// Use descriptive parameter names and return types
async function fetchProductsByCategory(
  categoryId: string,
  options: {
    page?: number;
    limit?: number;
    sortBy?: 'name' | 'price' | 'rating';
    sortOrder?: 'asc' | 'desc';
  } = {}
): Promise<ApiResponse<Product[]>> {
  // Implementation
}

// Use proper error handling
async function createOrder(orderData: CreateOrderData): Promise<Order> {
  try {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw new OrderCreationError(error.message, error.code);
    }
    throw new Error('Failed to create order');
  }
}
```

### React Component Patterns

**Component Structure**
```typescript
// Component with proper typing and documentation
interface ProductCardProps {
  /** The product to display */
  product: Product;
  /** Whether to show the add to cart button */
  showAddToCart?: boolean;
  /** Callback fired when product is clicked */
  onProductClick?: (product: Product) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * ProductCard displays a product with its image, name, price, and actions.
 * 
 * @example
 * <ProductCard 
 *   product={product} 
 *   showAddToCart={true}
 *   onProductClick={handleProductClick}
 * />
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showAddToCart = true,
  onProductClick,
  className
}) => {
  // Hooks at the top
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  
  // Event handlers
  const handleAddToCart = useCallback(() => {
    addToCart(product);
  }, [addToCart, product]);

  const handleProductClick = useCallback(() => {
    onProductClick?.(product);
  }, [onProductClick, product]);

  // Render
  return (
    <Card className={cn('product-card', className)}>
      {/* Component JSX */}
    </Card>
  );
};

// Default export
export default ProductCard;
```

**Custom Hooks Pattern**
```typescript
// Custom hook with proper typing and error handling
interface UseProductSearchOptions {
  initialQuery?: string;
  debounceMs?: number;
  enableAutoSearch?: boolean;
}

interface UseProductSearchReturn {
  query: string;
  results: Product[];
  isLoading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  clearResults: () => void;
}

export function useProductSearch(
  options: UseProductSearchOptions = {}
): UseProductSearchReturn {
  const {
    initialQuery = '',
    debounceMs = 300,
    enableAutoSearch = true
  } = options;

  // State
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced search
  const debouncedQuery = useDebounce(query, debounceMs);

  // Search function
  const search = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await searchProducts(searchQuery);
      setResults(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto search effect
  useEffect(() => {
    if (enableAutoSearch && debouncedQuery) {
      search(debouncedQuery);
    }
  }, [debouncedQuery, enableAutoSearch, search]);

  return {
    query,
    results,
    isLoading,
    error,
    search,
    clearResults: () => setResults([])
  };
}
```

### CSS and Styling Guidelines

**Tailwind CSS Best Practices**
```typescript
// Use consistent spacing scale
const spacing = {
  xs: 'p-1',      // 4px
  sm: 'p-2',      // 8px
  md: 'p-4',      // 16px
  lg: 'p-6',      // 24px
  xl: 'p-8',      // 32px
};

// Use semantic color classes
const colorClasses = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  success: 'bg-green-600 text-white',
  warning: 'bg-yellow-600 text-white',
  error: 'bg-red-600 text-white',
};

// Responsive design patterns
const responsiveGrid = cn(
  'grid',
  'grid-cols-1',      // Mobile: 1 column
  'sm:grid-cols-2',   // Small: 2 columns
  'md:grid-cols-3',   // Medium: 3 columns
  'lg:grid-cols-4',   // Large: 4 columns
  'xl:grid-cols-5'    // Extra large: 5 columns
);

// Use CSS variables for dynamic styles
const dynamicStyles = {
  '--progress-width': `${progress}%`,
  '--primary-hue': primaryHue,
} as React.CSSProperties;
```

**Component Styling**
```typescript
// Use the cn utility for conditional classes
import { cn } from '@/lib/utils';

const Button = ({ variant, size, className, ...props }) => {
  return (
    <button
      className={cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:opacity-50 disabled:pointer-events-none',
        
        // Variant styles
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
          'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
          'border border-input hover:bg-accent hover:text-accent-foreground': variant === 'outline',
        },
        
        // Size styles
        {
          'h-10 px-4 py-2': size === 'default',
          'h-9 px-3': size === 'sm',
          'h-11 px-8': size === 'lg',
        },
        
        // Additional classes
        className
      )}
      {...props}
    />
  );
};
```

## 🧪 Testing Strategy

### Unit Testing with Jest

**Component Testing**
```typescript
// ProductCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '@/components/ProductCard';
import { mockProduct } from '@/lib/test/mockData';

describe('ProductCard', () => {
  const defaultProps = {
    product: mockProduct,
    onProductClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product information correctly', () => {
    render(<ProductCard {...defaultProps} />);
    
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByAltText(mockProduct.name)).toBeInTheDocument();
  });

  it('calls onProductClick when card is clicked', () => {
    render(<ProductCard {...defaultProps} />);
    
    fireEvent.click(screen.getByRole('button', { name: /view product/i }));
    
    expect(defaultProps.onProductClick).toHaveBeenCalledWith(mockProduct);
  });

  it('shows add to cart button when showAddToCart is true', () => {
    render(<ProductCard {...defaultProps} showAddToCart={true} />);
    
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  it('hides add to cart button when showAddToCart is false', () => {
    render(<ProductCard {...defaultProps} showAddToCart={false} />);
    
    expect(screen.queryByRole('button', { name: /add to cart/i })).not.toBeInTheDocument();
  });
});
```

**Hook Testing**
```typescript
// useProductSearch.test.ts
import { renderHook, act } from '@testing-library/react';
import { useProductSearch } from '@/hooks/useProductSearch';

// Mock the API
jest.mock('@/lib/api', () => ({
  searchProducts: jest.fn(),
}));

import { searchProducts } from '@/lib/api';

describe('useProductSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with empty state', () => {
    const { result } = renderHook(() => useProductSearch());
    
    expect(result.current.query).toBe('');
    expect(result.current.results).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('performs search and updates results', async () => {
    const mockResults = [mockProduct];
    (searchProducts as jest.Mock).mockResolvedValue({ data: mockResults });

    const { result } = renderHook(() => useProductSearch());

    await act(async () => {
      await result.current.search('test query');
    });

    expect(searchProducts).toHaveBeenCalledWith('test query');
    expect(result.current.results).toEqual(mockResults);
    expect(result.current.isLoading).toBe(false);
  });

  it('handles search errors', async () => {
    const errorMessage = 'Search failed';
    (searchProducts as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useProductSearch());

    await act(async () => {
      await result.current.search('test query');
    });

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.results).toEqual([]);
  });
});
```

### Integration Testing

**API Integration Tests**
```typescript
// api.integration.test.ts
import { fetchProducts, createOrder } from '@/lib/api';

describe('API Integration', () => {
  it('fetches products successfully', async () => {
    const products = await fetchProducts();
    
    expect(Array.isArray(products.data)).toBe(true);
    expect(products.data.length).toBeGreaterThan(0);
    
    const product = products.data[0];
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
  });

  it('creates order with valid data', async () => {
    const orderData = {
      items: [{ productId: '1', quantity: 2 }],
      customerInfo: {
        name: 'Test User',
        email: 'test@example.com',
      },
    };

    const order = await createOrder(orderData);
    
    expect(order).toHaveProperty('id');
    expect(order).toHaveProperty('status');
    expect(order.items).toEqual(orderData.items);
  });
});
```

### End-to-End Testing with Playwright

**E2E Test Setup**
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

**E2E Test Example**
```typescript
// e2e/shopping-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Shopping Flow', () => {
  test('complete shopping journey', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    
    // Search for products
    await page.fill('[data-testid="search-input"]', 'laptop');
    await page.press('[data-testid="search-input"]', 'Enter');
    
    // Verify search results
    await expect(page.locator('[data-testid="product-card"]')).toHaveCount(10, { timeout: 5000 });
    
    // Click on first product
    await page.locator('[data-testid="product-card"]').first().click();
    
    // Add to cart
    await page.click('[data-testid="add-to-cart-button"]');
    
    // Verify cart update
    await expect(page.locator('[data-testid="cart-count"]')).toContainText('1');
    
    // Go to cart
    await page.click('[data-testid="cart-icon"]');
    
    // Verify cart contents
    await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(1);
    
    // Proceed to checkout (if authentication is implemented)
    await page.click('[data-testid="checkout-button"]');
    
    // Fill checkout form
    await page.fill('[data-testid="customer-name"]', 'Test User');
    await page.fill('[data-testid="customer-email"]', 'test@example.com');
    
    // Submit order
    await page.click('[data-testid="place-order-button"]');
    
    // Verify order confirmation
    await expect(page.locator('[data-testid="order-confirmation"]')).toBeVisible();
  });
});
```

## 🔄 Git Workflow

### Branch Naming Convention

```bash
# Feature branches
feature/add-product-search
feature/implement-payment-integration
feature/user-authentication

# Bug fix branches
bugfix/fix-cart-calculation
bugfix/resolve-mobile-navigation
hotfix/critical-security-fix

# Improvement branches
improvement/optimize-product-loading
improvement/enhance-accessibility
refactor/modernize-api-layer
```

### Commit Message Convention

**Format**: `type(scope): description`

**Types**:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples**:
```bash
feat(cart): add quantity update functionality
fix(auth): resolve token expiration handling
docs(api): update endpoint documentation
style(components): format ProductCard component
refactor(hooks): simplify useProductSearch logic
test(cart): add unit tests for cart operations
chore(deps): update dependencies to latest versions
```

### Pull Request Process

**PR Template**
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update

## How Has This Been Tested?
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing
- [ ] E2E tests

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

## 📊 Performance Guidelines

### Code Splitting

**Route-based Splitting**
```typescript
// Lazy load pages
const ProductPage = lazy(() => import('@/app/products/[id]/page'));
const CheckoutPage = lazy(() => import('@/app/checkout/page'));
const DashboardPage = lazy(() => import('@/app/dashboard/page'));

// Use Suspense for loading states
<Suspense fallback={<PageSkeleton />}>
  <ProductPage />
</Suspense>
```

**Component-based Splitting**
```typescript
// Lazy load heavy components
const ProductReviews = lazy(() => import('@/components/ProductReviews'));
const AdvancedFilters = lazy(() => import('@/components/AdvancedFilters'));

// Use dynamic imports for conditional components
const AdminPanel = dynamic(() => import('@/components/AdminPanel'), {
  loading: () => <AdminPanelSkeleton />,
  ssr: false
});
```

### Optimization Strategies

**React Performance**
```typescript
// Use React.memo for expensive components
const ProductCard = React.memo(({ product }) => {
  // Component implementation
}, (prevProps, nextProps) => {
  // Custom comparison function
  return prevProps.product.id === nextProps.product.id;
});

// Use useMemo for expensive calculations
const ProductStats = ({ products }) => {
  const stats = useMemo(() => {
    return {
      totalValue: products.reduce((sum, p) => sum + p.price, 0),
      averagePrice: products.length > 0 ? totalValue / products.length : 0,
      categories: [...new Set(products.map(p => p.category))]
    };
  }, [products]);

  return <div>{/* Render stats */}</div>;
};

// Use useCallback for event handlers
const ProductList = ({ products, onProductSelect }) => {
  const handleProductClick = useCallback((product) => {
    onProductSelect(product);
  }, [onProductSelect]);

  return (
    <div>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={handleProductClick}
        />
      ))}
    </div>
  );
};
```

## 🚀 Development Tools

### Useful Scripts

**Development Scripts**
```json
{
  "scripts": {
    "dev": "next dev",
    "dev:turbo": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "analyze": "ANALYZE=true npm run build",
    "dev:inspect": "NODE_OPTIONS='--inspect' npm run dev",
    "clean": "rm -rf .next node_modules/.cache",
    "reset": "rm -rf .next node_modules package-lock.json && npm install"
  }
}
```

### Debugging

**VS Code Debug Configuration** (`.vscode/launch.json`)
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js: debug server-side",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "Next.js: debug client-side",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "console": "integratedTerminal",
      "skipFiles": ["<node_internals>/**"]
    },
    {
      "name": "Next.js: debug full stack",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/next",
      "args": ["dev"],
      "console": "integratedTerminal",
      "serverReadyAction": {
        "pattern": "started server on .+, url: (https?://.+)",
        "uriFormat": "%s",
        "action": "debugWithChrome"
      }
    }
  ]
}
```

## 📝 Documentation Standards

### Code Documentation

**JSDoc Comments**
```typescript
/**
 * Calculates the total price of items in the cart including tax and shipping.
 * 
 * @param items - Array of cart items
 * @param taxRate - Tax rate as a decimal (e.g., 0.08 for 8%)
 * @param shippingCost - Fixed shipping cost
 * @returns Object containing subtotal, tax, shipping, and total
 * 
 * @example
 * ```typescript
 * const total = calculateCartTotal(cartItems, 0.08, 9.99);
 * console.log(total.total); // Final total price
 * ```
 */
function calculateCartTotal(
  items: CartItem[],
  taxRate: number,
  shippingCost: number
): CartTotals {
  // Implementation
}
```

**README Documentation**
- Keep README files up to date
- Include code examples
- Document breaking changes
- Provide troubleshooting guides

## 🔧 Troubleshooting

### Common Issues

**Development Server Issues**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for port conflicts
lsof -ti:3000
kill -9 <PID>
```

**TypeScript Errors**
```bash
# Check TypeScript configuration
npx tsc --showConfig

# Run type checking
npm run type-check

# Clear TypeScript cache
rm -rf node_modules/.cache
```

**Build Issues**
```bash
# Analyze bundle size
npm run analyze

# Check for circular dependencies
npx madge --circular src/

# Verify environment variables
printenv | grep NEXT_PUBLIC
```

This development guide provides comprehensive coverage of development practices, standards, and workflows for maintaining high-quality code in the Custom E-Commerce Platform.
