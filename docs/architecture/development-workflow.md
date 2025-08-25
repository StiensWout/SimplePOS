# Development Workflow

### Local Development Setup

#### Prerequisites
```bash
# Required software
node --version  # v20.0.0 or higher
npm --version   # v10.0.0 or higher
git --version   # v2.0.0 or higher

# Recommended VS Code extensions
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
```

#### Initial Setup
```bash
# Clone repository
git clone https://github.com/your-org/SimplePOS.git
cd SimplePOS/simple-pos

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Configure Clerk
# 1. Create account at https://clerk.com
# 2. Create application
# 3. Copy keys to .env.local

# Configure Convex
npx convex dev
# This will:
# - Create Convex project
# - Generate environment variables
# - Start development server

# Start development server
npm run dev
```

#### Development Commands
```bash
# Start all services
npm run dev

# Start frontend only
npm run next:dev

# Start backend only
npx convex dev

# Run tests
npm run test        # Unit tests
npm run test:e2e    # E2E tests
npm run test:watch  # Watch mode

# Code quality
npm run lint        # ESLint
npm run type-check  # TypeScript
npm run format      # Prettier

# Database
npx convex run seed # Seed test data
npx convex dashboard # Open Convex dashboard
```

### Environment Configuration

#### Required Environment Variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
NEXT_PUBLIC_CONVEX_URL=https://xxx.convex.site
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx

# Backend (.env)
CLERK_SECRET_KEY=sk_test_xxx
CONVEX_DEPLOYMENT=dev:xxx
SENTRY_AUTH_TOKEN=xxx

# Shared
NODE_ENV=development
```
