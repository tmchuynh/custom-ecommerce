# Components Documentation

This document provides comprehensive documentation for all reusable UI components in the Custom E-Commerce Platform.

## 📋 Overview

The application uses a component-based architecture with reusable, accessible, and well-documented components. All components are built using TypeScript, Tailwind CSS, and follow modern React patterns.

## 🏗️ Component Structure

```
src/components/
├── buttons/              # Button components
│   └── ThemeToggle.tsx  # Dark/light theme toggle
├── currency/            # Currency-related components
│   └── CurrencyStatus.tsx # Currency display and selection
├── filters/             # Product filtering components
│   └── FilterSidebar.tsx # Product filter sidebar
├── navigation/          # Navigation components
│   ├── breadcrumb-dynamic.tsx # Dynamic breadcrumb navigation
│   ├── CartIcon.tsx     # Shopping cart icon with badge
│   ├── Header.tsx       # Main navigation header
│   ├── UserMenu.tsx     # User account dropdown menu
│   └── WishlistIcon.tsx # Wishlist icon with badge
├── products/            # Product display components
│   └── ProductGrid.tsx  # Product grid layout
└── ui/                  # Base UI components (shadcn/ui)
    ├── accordion.tsx    # Collapsible content sections
    ├── alert-dialog.tsx # Modal dialog for confirmations
    ├── alert.tsx        # Notification alerts
    ├── avatar.tsx       # User avatar display
    ├── badge.tsx        # Status badges and labels
    ├── banner.tsx       # Promotional banners
    ├── breadcrumb.tsx   # Breadcrumb navigation
    ├── button.tsx       # Base button component
    ├── calendar.tsx     # Date picker calendar
    ├── card.tsx         # Content cards
    ├── carousel.tsx     # Image/content carousel
    └── ...              # Additional UI components
```

## 🎯 Component Categories

### 1. Navigation Components

#### Header Component (`navigation/Header.tsx`)
Main navigation header with responsive design.

**Features:**
- Responsive navigation menu
- User authentication status
- Cart and wishlist icons
- Search functionality
- Logo and branding

**Props:**
```typescript
interface HeaderProps {
  className?: string;
  showSearch?: boolean;
  sticky?: boolean;
}
```

**Usage:**
```jsx
<Header showSearch={true} sticky={true} />
```

#### Breadcrumb Dynamic (`navigation/breadcrumb-dynamic.tsx`)
Dynamic breadcrumb navigation that updates based on the current route.

**Features:**
- Automatic route detection
- Customizable separators
- Click navigation
- Accessibility support

**Props:**
```typescript
interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}
```

#### Cart Icon (`navigation/CartIcon.tsx`)
Shopping cart icon with item count badge.

**Features:**
- Real-time cart count
- Badge notifications
- Cart dropdown preview
- Responsive design

**Props:**
```typescript
interface CartIconProps {
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
  onClick?: () => void;
}
```

#### User Menu (`navigation/UserMenu.tsx`)
User account dropdown menu with authentication options.

**Features:**
- User profile display
- Authentication status
- Account management links
- Logout functionality

**Props:**
```typescript
interface UserMenuProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onProfile?: () => void;
}
```

#### Wishlist Icon (`navigation/WishlistIcon.tsx`)
Wishlist icon with item count badge.

**Features:**
- Real-time wishlist count
- Badge notifications
- Quick access to wishlist
- Heart animation on add/remove

**Props:**
```typescript
interface WishlistIconProps {
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
  animated?: boolean;
}
```

### 2. Product Components

#### Product Grid (`products/ProductGrid.tsx`)
Responsive grid layout for displaying products.

**Features:**
- Responsive grid layout
- Product card display
- Loading states
- Pagination support
- Filter integration

**Props:**
```typescript
interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  columns?: 2 | 3 | 4 | 5;
  showPagination?: boolean;
  onProductClick?: (product: Product) => void;
}
```

**Usage:**
```jsx
<ProductGrid 
  products={products} 
  columns={4} 
  loading={isLoading}
  onProductClick={handleProductClick}
/>
```

### 3. Filter Components

#### Filter Sidebar (`filters/FilterSidebar.tsx`)
Comprehensive product filtering sidebar.

**Features:**
- Category filtering
- Price range selection
- Brand filtering
- Rating filtering
- Clear all filters
- Responsive design

**Props:**
```typescript
interface FilterSidebarProps {
  categories: Category[];
  brands: Brand[];
  priceRange: [number, number];
  onFilterChange: (filters: ProductFilters) => void;
  activeFilters: ProductFilters;
  isOpen?: boolean;
  onClose?: () => void;
}

interface ProductFilters {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  sortBy: string;
}
```

### 4. Button Components

#### Theme Toggle (`buttons/ThemeToggle.tsx`)
Toggle button for switching between light and dark themes.

**Features:**
- Smooth theme transitions
- System preference detection
- Persistent theme storage
- Icon animations

**Props:**
```typescript
interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  showLabel?: boolean;
}
```

### 5. Currency Components

#### Currency Status (`currency/CurrencyStatus.tsx`)
Display current currency and provide currency selection.

**Features:**
- Current currency display
- Currency conversion rates
- Currency selection dropdown
- Real-time rate updates

**Props:**
```typescript
interface CurrencyStatusProps {
  currentCurrency: Currency;
  availableCurrencies: Currency[];
  onCurrencyChange: (currency: Currency) => void;
  showRates?: boolean;
}

interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}
```

## 🎨 UI Components (shadcn/ui)

### Base Components

#### Button (`ui/button.tsx`)
Versatile button component with multiple variants and sizes.

**Variants:**
- `default` - Primary button style
- `destructive` - For dangerous actions
- `outline` - Outlined button
- `secondary` - Secondary button style
- `ghost` - Minimal button style
- `link` - Link-styled button

**Sizes:**
- `sm` - Small button
- `md` - Medium button (default)
- `lg` - Large button
- `icon` - Icon-only button

**Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  asChild?: boolean;
  loading?: boolean;
}
```

#### Card (`ui/card.tsx`)
Container component for grouped content.

**Sub-components:**
- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Description text
- `CardContent` - Main content area
- `CardFooter` - Footer section

**Usage:**
```jsx
<Card>
  <CardHeader>
    <CardTitle>Product Title</CardTitle>
    <CardDescription>Product description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Product details...</p>
  </CardContent>
  <CardFooter>
    <Button>Add to Cart</Button>
  </CardFooter>
</Card>
```

#### Alert (`ui/alert.tsx`)
Alert component for notifications and messages.

**Variants:**
- `default` - Information alert
- `destructive` - Error alert
- `warning` - Warning alert
- `success` - Success alert

**Props:**
```typescript
interface AlertProps {
  variant?: 'default' | 'destructive' | 'warning' | 'success';
  className?: string;
  children: React.ReactNode;
}
```

#### Badge (`ui/badge.tsx`)
Small status indicators and labels.

**Variants:**
- `default` - Primary badge
- `secondary` - Secondary badge
- `destructive` - Error badge
- `outline` - Outlined badge

**Usage:**
```jsx
<Badge variant="secondary">New</Badge>
<Badge variant="destructive">Out of Stock</Badge>
```

#### Dialog (`ui/dialog.tsx`)
Modal dialog component for overlays and forms.

**Sub-components:**
- `Dialog` - Root component
- `DialogTrigger` - Trigger element
- `DialogContent` - Main content
- `DialogHeader` - Header section
- `DialogTitle` - Dialog title
- `DialogDescription` - Description
- `DialogFooter` - Footer section

#### Accordion (`ui/accordion.tsx`)
Collapsible content sections.

**Types:**
- `single` - Only one item can be open
- `multiple` - Multiple items can be open

**Usage:**
```jsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Form Components

#### Input (`ui/input.tsx`)
Base input component with validation support.

#### Select (`ui/select.tsx`)
Dropdown selection component.

#### Checkbox (`ui/checkbox.tsx`)
Checkbox input with custom styling.

#### Radio Group (`ui/radio-group.tsx`)
Radio button group component.

#### Switch (`ui/switch.tsx`)
Toggle switch component.

## 🔧 Component Development Guidelines

### 1. Component Structure
```typescript
// ComponentName.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentNameProps {
  // Props interface
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  // Destructured props with defaults
}) => {
  // Component logic
  
  return (
    // JSX structure
  );
};

export default ComponentName;
```

### 2. Styling Guidelines
- Use Tailwind CSS for styling
- Follow the design system colors and spacing
- Use the `cn()` utility for conditional classes
- Support dark mode with appropriate classes

### 3. Accessibility Requirements
- Include proper ARIA labels
- Support keyboard navigation
- Maintain color contrast ratios
- Use semantic HTML elements

### 4. TypeScript Best Practices
- Define clear prop interfaces
- Use generic types when appropriate
- Provide proper JSDoc comments
- Export prop types for documentation

### 5. Testing Guidelines
- Write unit tests for all components
- Test accessibility features
- Test responsive behavior
- Mock external dependencies

## 🧪 Component Testing

### Unit Testing Example
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByText('Delete');
    expect(button).toHaveClass('bg-destructive');
  });
});
```

### Accessibility Testing
```typescript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Component Accessibility', () => {
  it('should not have any accessibility violations', async () => {
    const { container } = render(<YourComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

## 📊 Component Performance

### Optimization Strategies
1. **Memoization**: Use `React.memo()` for expensive renders
2. **Code Splitting**: Lazy load heavy components
3. **Bundle Analysis**: Monitor component bundle sizes
4. **Re-render Prevention**: Optimize prop passing

### Performance Monitoring
- Use React DevTools Profiler
- Monitor component render times
- Track memory usage
- Analyze bundle impact

## 🚀 Future Enhancements

### Planned Component Additions
- **DataTable**: Advanced table with sorting and filtering
- **VirtualList**: Virtualized list for large datasets
- **RichTextEditor**: WYSIWYG editor for content
- **ImageGallery**: Advanced image gallery with zoom
- **Calendar**: Full calendar component for events

### Component Library Evolution
- **Storybook Integration**: Visual component documentation
- **Design Tokens**: Systematic design system
- **Animation Library**: Standardized animations
- **Responsive Utilities**: Advanced responsive helpers
- **Theme Customization**: Advanced theming options
