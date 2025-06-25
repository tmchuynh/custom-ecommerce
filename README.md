# Custom E-Commerce Platform

A modern, full-featured e-commerce platform built with Next.js 15, React 19, TypeScript, and external APIs. This application provides a comprehensive shopping experience with user authentication, shopping cart, wishlist, order management, membership tiers, and administrative features using API-based data management.

## 🚀 Features

### 🛍️ Core E-Commerce Features
- **Product Catalog**: Browse products by categories with advanced filtering and search
- **Shopping Cart**: Add, remove, and manage items with persistent cart state
- **Wishlist**: Save favorite products for later purchase
- **User Authentication**: Secure login/register system with JWT tokens
- **Order Management**: Complete order processing with tracking capabilities
- **Payment Integration**: Support for multiple payment methods (Visa, MasterCard, American Express, Discover)

### 👥 User Experience
- **Membership Tiers**: Premium membership system with exclusive benefits and discounts
- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Theme toggle with system preference detection
- **Breadcrumb Navigation**: Clear navigation paths throughout the application
- **Currency Support**: Multi-currency display options
- **Google Maps Integration**: Store locations and shipping address validation

### 🎨 Modern UI/UX
- **Radix UI Components**: Accessible, customizable component library
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Framer Motion**: Smooth animations and transitions
- **Responsive Charts**: Data visualization with Recharts
- **Toast Notifications**: User feedback with Sonner

### 🔧 Developer Experience
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting and formatting
- **Component Documentation**: Organized documentation for all major components
- **Custom Hooks**: Reusable logic for common operations
- **Error Boundaries**: Graceful error handling

## 🏗️ Project Structure

```
src/
├── api/                    # API layer and data fetching
├── app/                    # Next.js App Router pages and layouts
│   ├── context/           # React Context providers
│   ├── providers/         # Application providers
│   └── [routes]/          # Page components and nested routes
├── components/            # Reusable UI components
│   ├── buttons/          # Button components
│   ├── currency/         # Currency-related components
│   ├── filters/          # Product filtering components
│   ├── navigation/       # Navigation and header components
│   ├── products/         # Product display components
│   └── ui/              # Base UI components (shadcn/ui)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
│   ├── constants/        # Application constants
│   ├── interfaces/       # TypeScript interfaces
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Helper functions
└── public/              # Static assets
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with concurrent features
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Animation library
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation

### APIs & Data Management
- **DummyJSON API**: External product data source
- **JSON Web Tokens (JWT)**: Authentication and session management
- **Local Storage**: Client-side data persistence
- **RESTful APIs**: External service integration

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Vercel Analytics**: Performance monitoring
- **Bundle Analyzer**: Bundle size optimization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd custom-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # JWT Secret
   JWT_SECRET=your_jwt_secret_key
   
   # Google Maps API (optional)
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   
   # External API Configuration
   NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Documentation

Comprehensive documentation for all aspects of the project:

- **[API Documentation](./docs/api/README.md)** - External API integration, data fetching, and local storage management
- **[Components Documentation](./docs/components/README.md)** - Reusable UI components, navigation, and product display
- **[Context & State Management](./docs/context/README.md)** - React Context providers for auth, cart, wishlist, and orders
- **[Custom Hooks Documentation](./docs/hooks/README.md)** - Responsive design, authentication guards, and utility hooks
- **[UI Components Library](./docs/ui-components/README.md)** - Shadcn/ui component implementation and styling guide
- **[Deployment Guide](./docs/deployment/README.md)** - Production deployment, environment setup, and performance optimization
- **[Development Guide](./docs/development/README.md)** - Coding standards, testing strategies, and development workflows

### Quick Navigation

| Category             | Description                  | Key Features                              |
| -------------------- | ---------------------------- | ----------------------------------------- |
| **API Layer**        | External service integration | DummyJSON API, Local Storage, JWT Auth    |
| **Components**       | UI building blocks           | Navigation, Products, Filters, Currency   |
| **State Management** | Application state            | Auth, Cart, Wishlist, Orders, Currency    |
| **Hooks**            | Custom React hooks           | Responsive design, Auth guards, Utilities |
| **UI Library**       | Design system                | Shadcn/ui, Tailwind CSS, Accessibility    |
| **Deployment**       | Production setup             | Vercel, Docker, Security, Performance     |
| **Development**      | Coding practices             | TypeScript, Testing, Git workflow         |

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (cleans .next directory first)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Key Features Breakdown

### Authentication System
- JWT-based authentication
- Secure password handling
- Protected routes and actions
- User profile management

### Shopping Experience
- Advanced product filtering and search
- Real-time cart updates
- Wishlist management
- Order tracking and history

### Membership System
- Multiple membership tiers
- Exclusive discounts and benefits
- Membership management dashboard

### Admin Features
- Order management
- User management
- Product catalog management
- Analytics and reporting

## 🌐 API Integration

The application integrates with:
- **DummyJSON API**: External product data source
- **Local Storage**: Client-side data persistence for cart, wishlist, and user preferences
- **Google Maps API**: Location services (optional)

## 🎨 UI/UX Design

- **Design System**: Consistent component library with Radix UI
- **Accessibility**: WCAG compliant components
- **Responsive Design**: Mobile-first approach
- **Theme Support**: Dark/light mode with system preference detection
- **Performance**: Optimized images, lazy loading, and code splitting

## 📱 Mobile Experience

- Responsive design optimized for mobile devices
- Touch-friendly navigation
- Mobile-specific UI components
- Progressive Web App capabilities

## 🔒 Security Features

- JWT token authentication
- Protected API routes
- Input validation with Zod schemas
- XSS protection
- Client-side data encryption for sensitive information

## 🚀 Performance Optimizations

- Next.js App Router for optimal performance
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Bundle analysis and optimization
- Vercel Analytics integration

## 📈 Analytics & Monitoring

- Vercel Analytics for performance tracking
- Speed Insights for Core Web Vitals
- Error tracking and logging
- User behavior analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing React framework
- **Radix UI**: For accessible component primitives
- **Tailwind CSS**: For the utility-first CSS framework
- **Vercel**: For hosting and deployment platform
- **DummyJSON**: For providing test product data

## 📞 Support

For support and questions:
- Check the [documentation](./docs/)
- Open an issue on GitHub
- Contact the development team

---

Built with ❤️ using Next.js, React, and TypeScript
