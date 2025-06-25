# Deployment Guide

This comprehensive guide covers deployment strategies, configurations, and best practices for the Custom E-Commerce Platform.

## 📋 Overview

The Custom E-Commerce Platform is designed for easy deployment across various hosting platforms, with Vercel being the primary recommendation due to its seamless Next.js integration and automatic optimizations.

## 🚀 Deployment Platforms

### Vercel (Recommended)

**Why Vercel?**
- Seamless Next.js integration and optimizations
- Automatic deployments from Git
- Built-in CDN and edge caching
- Environment variable management
- Analytics and performance monitoring
- Zero-configuration deployments

#### Vercel Deployment Steps

1. **Connect Repository**
   ```bash
   # Install Vercel CLI (optional)
   npm install -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from project directory
   vercel
   ```

2. **Environment Variables Setup**
   ```env
   # Production environment variables
   JWT_SECRET=your_production_jwt_secret_here
   NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
   NEXT_PUBLIC_ENABLE_ANALYTICS=true
   ```

3. **Vercel Configuration** (`vercel.json`)
   ```json
   {
     "framework": "nextjs",
     "buildCommand": "npm run build",
     "devCommand": "npm run dev",
     "installCommand": "npm install",
     "outputDirectory": ".next",
     "regions": ["iad1", "sfo1"],
     "functions": {
       "src/pages/api/**/*.js": {
         "runtime": "@vercel/node"
       }
     },
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "X-Frame-Options",
             "value": "DENY"
           },
           {
             "key": "X-Content-Type-Options",
             "value": "nosniff"
           },
           {
             "key": "Referrer-Policy",
             "value": "strict-origin-when-cross-origin"
           }
         ]
       }
     ],
     "redirects": [
       {
         "source": "/shop",
         "destination": "/shopping",
         "permanent": true
       }
     ],
     "rewrites": [
       {
         "source": "/api/health",
         "destination": "/api/health"
       }
     ]
   }
   ```

4. **Custom Domains**
   ```bash
   # Add custom domain via Vercel CLI
   vercel domains add yourdomain.com
   
   # Or configure in Vercel dashboard
   # Settings → Domains → Add Domain
   ```

### Netlify

**Netlify Configuration** (`netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

[context.production.environment]
  NODE_ENV = "production"
  NEXT_PUBLIC_API_BASE_URL = "https://dummyjson.com"
```

### AWS Amplify

**Amplify Configuration** (`amplify.yml`)
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### Docker Deployment

**Dockerfile**
```dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

**Docker Compose** (`docker-compose.yml`)
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped
```

**Nginx Configuration** (`nginx.conf`)
```nginx
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:3000;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=general:10m rate=30r/s;

    server {
        listen 80;
        server_name yourdomain.com www.yourdomain.com;
        
        # Redirect HTTP to HTTPS
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name yourdomain.com www.yourdomain.com;

        # SSL Configuration
        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
        ssl_prefer_server_ciphers off;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

        # Gzip compression
        gzip on;
        gzip_vary on;
        gzip_min_length 1024;
        gzip_proxied expired no-cache no-store private must-revalidate auth;
        gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

        # Rate limiting
        limit_req zone=general burst=20 nodelay;
        
        location /api/ {
            limit_req zone=api burst=5 nodelay;
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        location / {
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Static file caching
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            proxy_pass http://app;
        }
    }
}
```

## 🔧 Build Optimization

### Next.js Configuration

**Enhanced `next.config.ts`**
```typescript
import type { NextConfig } from 'next';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    serverComponentsExternalPackages: ['mysql2'],
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Image optimization
  images: {
    domains: ['cdn.dummyjson.com', 'i.dummyjson.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/shop',
        destination: '/shopping',
        permanent: true,
      },
      {
        source: '/products',
        destination: '/shopping',
        permanent: true,
      },
    ];
  },

  // Bundle optimization
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Optimize bundle size
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };

    // Bundle splitting
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          reuseExistingChunk: true,
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    };

    return config;
  },

  // Output configuration
  output: 'standalone',
  
  // TypeScript configuration
  typescript: {
    tsconfigPath: './tsconfig.json',
  },

  // ESLint configuration
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: false,
  },

  // PWA support
  async rewrites() {
    return [
      {
        source: '/sw.js',
        destination: '/_next/static/sw.js',
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
```

### Build Scripts

**Enhanced `package.json` scripts**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "build:analyze": "ANALYZE=true npm run build",
    "build:production": "NODE_ENV=production npm run build",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "docker:build": "docker build -t ecommerce-app .",
    "docker:run": "docker run -p 3000:3000 ecommerce-app",
    "deploy:vercel": "vercel --prod",
    "health-check": "curl -f http://localhost:3000/api/health || exit 1"
  }
}
```

## 🌍 Environment Configuration

### Environment Variables by Stage

**Development (`.env.local`)**
```env
# Development environment
NODE_ENV=development
NEXT_PUBLIC_APP_ENV=development

# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
NEXT_PUBLIC_API_TIMEOUT=10000

# Authentication
JWT_SECRET=dev_jwt_secret_key

# External Services
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_dev_google_maps_key

# Analytics (disabled in dev)
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=

# Debug flags
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_SHOW_PERFORMANCE_METRICS=true
```

**Staging (`.env.staging`)**
```env
# Staging environment
NODE_ENV=production
NEXT_PUBLIC_APP_ENV=staging

# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
NEXT_PUBLIC_API_TIMEOUT=8000

# Authentication
JWT_SECRET=staging_jwt_secret_key

# External Services
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_staging_google_maps_key

# Analytics
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_staging_analytics_id

# Debug flags
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_SHOW_PERFORMANCE_METRICS=true
```

**Production (`.env.production`)**
```env
# Production environment
NODE_ENV=production
NEXT_PUBLIC_APP_ENV=production

# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
NEXT_PUBLIC_API_TIMEOUT=5000

# Authentication
JWT_SECRET=production_jwt_secret_key

# External Services
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_production_google_maps_key

# Analytics
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_production_analytics_id

# Security
NEXT_PUBLIC_ENABLE_CSP=true
NEXT_PUBLIC_ENABLE_RATE_LIMITING=true

# Performance
NEXT_PUBLIC_ENABLE_COMPRESSION=true
NEXT_PUBLIC_CACHE_TTL=3600

# Debug flags (disabled in production)
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_SHOW_PERFORMANCE_METRICS=false
```

## 🔒 Security Configuration

### Content Security Policy

**CSP Configuration**
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Content Security Policy
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' https://cdn.dummyjson.com https://i.dummyjson.com data: blob:;
    connect-src 'self' https://dummyjson.com https://api.vercel.com https://vitals.vercel-insights.com;
    frame-src 'none';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s+/g, ' ').trim();

  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

## 📊 Monitoring and Analytics

### Health Check Endpoint

**API Health Check** (`src/app/api/health/route.ts`)
```typescript
import { NextResponse } from 'next/server';

export async function GET() {
  const healthcheck = {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    status: 'OK',
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '1.0.0',
    memory: process.memoryUsage(),
    checks: {
      api: 'OK',
      database: 'N/A', // Since we're using external APIs
      externalServices: await checkExternalServices(),
    },
  };

  return NextResponse.json(healthcheck, { status: 200 });
}

async function checkExternalServices() {
  try {
    const response = await fetch('https://dummyjson.com/test', {
      method: 'GET',
      timeout: 5000,
    });
    return response.ok ? 'OK' : 'ERROR';
  } catch (error) {
    return 'ERROR';
  }
}
```

### Performance Monitoring

**Vercel Analytics Setup**
```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

## 🚨 Error Handling and Logging

### Global Error Boundary

**Error Boundary Component**
```typescript
// src/components/ErrorBoundary.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    
    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // Send to logging service
      this.logErrorToService(error, errorInfo);
    }
  }

  logErrorToService = (error: Error, errorInfo: React.ErrorInfo) => {
    // Implement logging to external service
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error.message,
        stack: error.stack,
        errorInfo,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    }).catch(console.error);
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-muted-foreground mb-4 text-center max-w-md">
            We're sorry, but something unexpected happened. Please try refreshing the page.
          </p>
          <Button onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## 🔄 Continuous Deployment

### GitHub Actions Workflow

**CI/CD Pipeline** (`.github/workflows/deploy.yml`)
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '18'

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run type check
        run: npm run type-check
      
      - name: Run linting
        run: npm run lint
      
      - name: Run tests
        run: npm run test:coverage
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_API_BASE_URL: ${{ secrets.NEXT_PUBLIC_API_BASE_URL }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Deployment Checklist

**Pre-deployment Checklist**
- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] DNS records configured
- [ ] CDN configured
- [ ] Monitoring setup
- [ ] Error tracking enabled
- [ ] Performance monitoring active
- [ ] Security headers configured
- [ ] Rate limiting implemented
- [ ] Backup strategy in place

**Post-deployment Verification**
- [ ] Application loads correctly
- [ ] All pages accessible
- [ ] API endpoints functioning
- [ ] Authentication working
- [ ] External integrations active
- [ ] Performance metrics acceptable
- [ ] Error rates normal
- [ ] Security scan passed

## 🚀 Performance Optimization

### Lighthouse Optimization

**Target Metrics**
- Performance: 90+
- Accessibility: 100
- Best Practices: 90+
- SEO: 100

**Optimization Strategies**
1. **Image Optimization**: WebP/AVIF formats, lazy loading
2. **Code Splitting**: Dynamic imports, route-based splitting
3. **Caching**: Static asset caching, API response caching
4. **Compression**: Gzip/Brotli compression
5. **CDN**: Global content delivery network
6. **Preloading**: Critical resource preloading

### Bundle Analysis

**Analyze Bundle Size**
```bash
# Generate bundle analysis
npm run build:analyze

# View bundle analysis
open .next/analyze/client.html
```

## 📈 Scaling Considerations

### Horizontal Scaling
- **Load Balancing**: Multiple application instances
- **CDN**: Global content distribution
- **Database Scaling**: Read replicas, sharding
- **Caching**: Redis, Memcached
- **Microservices**: Service decomposition

### Vertical Scaling
- **Server Resources**: CPU, memory, storage
- **Database Optimization**: Indexing, query optimization
- **Application Optimization**: Code efficiency, memory management

## 🔧 Troubleshooting

### Common Deployment Issues

**Build Failures**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules
rm -rf node_modules
npm install

# Check TypeScript errors
npm run type-check

# Check for linting errors
npm run lint
```

**Runtime Errors**
- Check environment variables
- Verify external API connectivity
- Review application logs
- Check browser console for client-side errors

**Performance Issues**
- Analyze bundle size
- Check Core Web Vitals
- Review server response times
- Optimize database queries

This deployment guide provides comprehensive coverage of deploying the Custom E-Commerce Platform across various hosting environments with security, performance, and reliability best practices.
