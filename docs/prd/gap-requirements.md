# SimplePOS PRD Gap Requirements Document

## Executive Summary

This document addresses the critical gaps identified in the Product Owner's validation report for SimplePOS. It provides detailed requirements for project initialization, testing infrastructure, menu data transition, and documentation generation to ensure development success.

## 1. Project Initialization Requirements (Story 1.1 Enhancement)

### 1.1 Development Environment Prerequisites

**Requirement ID:** INIT-001  
**Priority:** Critical  
**Story:** 1.1

Before project creation, developers must verify the following tools are installed:

- **Node.js:** Version 18.17+ or 20.5+ (LTS recommended)
- **npm:** Version 9+ (comes with Node.js)
- **Git:** Version 2.38+ for version control
- **VS Code:** Latest stable version with recommended extensions

**Acceptance Criteria:**
- Developer runs `node --version` and confirms version >= 18.17
- Developer runs `npm --version` and confirms version >= 9.0
- Developer runs `git --version` and confirms installation
- VS Code extensions installed: ESLint, Prettier, Tailwind CSS IntelliSense

### 1.2 Project Scaffolding Steps

**Requirement ID:** INIT-002  
**Priority:** Critical  
**Story:** 1.1

Execute the following commands in sequence to create the project:

```bash
# Step 1: Create Next.js application with optimal configuration
npx create-next-app@latest simple-pos --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"

# Step 2: Navigate to project directory
cd simple-pos

# Step 3: Initialize git repository (if not auto-initialized)
git init

# Step 4: Create initial commit
git add .
git commit -m "feat: initial Next.js 14 project setup with TypeScript and Tailwind"

# Step 5: Install additional core dependencies
npm install clsx tailwind-merge class-variance-authority
npm install -D @types/node

# Step 6: Set up environment variables template
cp .env.local.example .env.local
```

**Acceptance Criteria:**
- Project created in `simple-pos` subfolder
- TypeScript configuration verified with `tsconfig.json`
- Tailwind CSS configured with `tailwind.config.ts`
- ESLint configured with modern ruleset
- App Router structure created (`app/` directory)
- Git repository initialized with clean first commit
- `.env.local.example` template created with placeholders

### 1.3 Convex Backend Integration

**Requirement ID:** INIT-003  
**Priority:** Critical  
**Story:** 1.1

Set up Convex backend with proper configuration:

```bash
# Step 1: Install Convex
npm install convex

# Step 2: Initialize Convex in the project
npx convex dev --once

# Step 3: Follow interactive setup:
# - Choose "create a new project"
# - Name the project "simple-pos-[environment]"
# - Select team or create new
```

**Acceptance Criteria:**
- Convex installed as dependency
- `convex/` directory created with initial files
- `.env.local` updated with CONVEX_DEPLOYMENT and NEXT_PUBLIC_CONVEX_URL
- `convex/_generated` directory exists with TypeScript definitions
- Development server connects successfully to Convex

### 1.4 Clerk Authentication Setup

**Requirement ID:** INIT-004  
**Priority:** Critical  
**Story:** 1.1

Configure Clerk for authentication:

```bash
# Step 1: Install Clerk NextJS SDK
npm install @clerk/nextjs

# Step 2: Install Clerk themes for better UI
npm install @clerk/themes

# Step 3: Create middleware.ts in root
touch middleware.ts

# Step 4: Create auth configuration
mkdir -p app/api/auth
touch app/api/auth/[...clerk]/route.ts
```

**Environment Variables Required:**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

**Acceptance Criteria:**
- Clerk SDK installed and configured
- Middleware protects routes appropriately
- Environment variables documented in `.env.local.example`
- Sign-in and sign-up pages route correctly
- Clerk webhook endpoint configured for user sync

### 1.5 shadcn/ui Component Library Setup

**Requirement ID:** INIT-005  
**Priority:** Critical  
**Story:** 1.1

Initialize shadcn/ui with proper configuration:

```bash
# Step 1: Initialize shadcn/ui
npx shadcn@latest init

# Step 2: Configure with these options:
# - Would you like to use TypeScript? → Yes
# - Which style would you like to use? → Default
# - Which color would you like to use as base color? → Slate
# - Where is your global CSS file? → app/globals.css
# - Configure CSS variables? → Yes
# - Where is your tailwind.config.ts? → tailwind.config.ts
# - Configure components.json? → Yes
# - Are you using React Server Components? → Yes

# Step 3: Install initial components
npx shadcn@latest add button card form input label toast
npx shadcn@latest add dropdown-menu dialog alert table
npx shadcn@latest add tabs badge skeleton spinner
```

**Acceptance Criteria:**
- `components.json` configured correctly
- `components/ui/` directory created
- Base components installed and TypeScript compliant
- CSS variables configured in `globals.css`
- Tailwind config updated with shadcn requirements
- Component imports working correctly

## 2. Testing Infrastructure Requirements (New Story 1.1.5)

### Story 1.1.5: Testing Framework Setup

**As a** developer,  
**I want** comprehensive testing infrastructure configured from the start,  
**so that** I can write tests alongside features and maintain quality.

### 2.1 Vitest and Testing Library Installation

**Requirement ID:** TEST-001  
**Priority:** Critical  
**Story:** 1.1.5

Install and configure testing frameworks:

```bash
# Step 1: Install testing dependencies
npm install -D vitest @vitejs/plugin-react jsdom 
npm install -D @testing-library/react @testing-library/dom @testing-library/user-event
npm install -D @testing-library/jest-dom vite-tsconfig-paths

# Step 2: Create Vitest configuration
touch vitest.config.mts

# Step 3: Create test setup file
mkdir -p test
touch test/setup.ts

# Step 4: Update package.json scripts
```

**Vitest Configuration (`vitest.config.mts`):**
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        '.next/',
        'convex/_generated/',
      ]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './')
    }
  }
})
```

**Test Setup (`test/setup.ts`):**
```typescript
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))
```

**Acceptance Criteria:**
- All testing packages installed successfully
- Vitest configuration file created and valid
- Test setup file handles cleanup and mocks
- Package.json includes test scripts:
  - `"test": "vitest"`
  - `"test:ui": "vitest --ui"`
  - `"test:coverage": "vitest --coverage"`
- First passing test created in `app/__tests__/`

### 2.2 E2E Testing with Playwright

**Requirement ID:** TEST-002  
**Priority:** High  
**Story:** 1.1.5

Configure Playwright for end-to-end testing:

```bash
# Step 1: Install Playwright
npm install -D @playwright/test

# Step 2: Initialize Playwright
npx playwright install

# Step 3: Create Playwright config
touch playwright.config.ts

# Step 4: Create E2E test directory
mkdir -p e2e
touch e2e/homepage.spec.ts
```

**Playwright Configuration:**
```typescript
import { defineConfig, devices } from '@playwright/test'

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
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

**Acceptance Criteria:**
- Playwright installed with browsers
- Configuration supports mobile and desktop testing
- E2E test directory structure created
- Initial smoke test passes
- Scripts added to package.json:
  - `"test:e2e": "playwright test"`
  - `"test:e2e:ui": "playwright test --ui"`

### 2.3 GitHub Actions CI/CD Pipeline

**Requirement ID:** TEST-003  
**Priority:** High  
**Story:** 1.1.5

Set up continuous integration:

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run type checking
        run: npm run type-check
      
      - name: Run linting
        run: npm run lint
      
      - name: Run unit tests
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/coverage-final.json
      
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          CI: true
      
      - name: Build application
        run: npm run build
```

**Acceptance Criteria:**
- GitHub Actions workflow file created
- CI runs on push and pull requests
- All test types execute in pipeline
- Coverage reports generated
- Build verification included
- Pipeline passes on main branch

## 3. Menu Data Transition Requirements

### 3.1 Seed Data Strategy

**Requirement ID:** MENU-001  
**Priority:** High  
**Story:** 1.3 Enhancement

Clarify the hardcoded to dynamic menu progression:

**Epic 1 - Hardcoded Demo Menu:**
```typescript
// convex/seed.ts - Demo data for Epic 1
export const DEMO_MENU_ITEMS = [
  { 
    id: 'demo-1',
    name: 'Burger',
    category: 'mains',
    price: 1250, // cents
    description: 'Demo item for testing',
    isDemo: true
  },
  { 
    id: 'demo-2',
    name: 'Fries',
    category: 'sides',
    price: 350,
    description: 'Demo item for testing',
    isDemo: true
  },
  // ... more demo items
] as const

// This data is used in Epic 1 for testing order flow
// Will be replaced with dynamic data in Epic 2
```

**Epic 2 - Migration to Dynamic:**
```typescript
// convex/migrations/menuTransition.ts
export const migrateFromDemoToRealMenu = mutation({
  handler: async (ctx) => {
    // 1. Check if demo data exists
    const demoItems = await ctx.db
      .query("menuItems")
      .filter(q => q.eq(q.field("isDemo"), true))
      .collect()
    
    // 2. Archive demo items (soft delete)
    for (const item of demoItems) {
      await ctx.db.patch(item._id, {
        isArchived: true,
        archivedAt: Date.now(),
        archivedReason: "Replaced with real menu data"
      })
    }
    
    // 3. Log migration completion
    await ctx.db.insert("migrations", {
      name: "demo_to_real_menu",
      executedAt: Date.now(),
      affectedRecords: demoItems.length
    })
  }
})
```

**Acceptance Criteria:**
- Demo menu items clearly marked with `isDemo: true` flag
- Migration script created for Epic 2 transition
- Demo data preserved but archived (not deleted)
- Clear comments explaining progression in code
- Admin UI shows banner when using demo data

### 3.2 Menu Template System

**Requirement ID:** MENU-002  
**Priority:** Medium  
**Story:** 2.4 Enhancement

Define starter templates for quick setup:

```typescript
// convex/menuTemplates.ts
export const MENU_TEMPLATES = {
  bbq: {
    name: "BBQ Event",
    items: [
      { name: "Hamburger", category: "mains", price: 800 },
      { name: "Cheeseburger", category: "mains", price: 900 },
      { name: "Hot Dog", category: "mains", price: 600 },
      { name: "Pulled Pork Sandwich", category: "mains", price: 1000 },
      { name: "Coleslaw", category: "sides", price: 300 },
      { name: "Potato Salad", category: "sides", price: 300 },
      { name: "Soda", category: "drinks", price: 200 },
      { name: "Water", category: "drinks", price: 100 }
    ]
  },
  breakfast: {
    name: "Breakfast Service",
    items: [
      { name: "Pancakes", category: "mains", price: 700 },
      { name: "French Toast", category: "mains", price: 750 },
      { name: "Eggs & Bacon", category: "mains", price: 900 },
      { name: "Coffee", category: "drinks", price: 250 },
      { name: "Orange Juice", category: "drinks", price: 300 }
    ]
  },
  // ... more templates
}
```

**Acceptance Criteria:**
- At least 5 menu templates defined
- Templates cover common event types
- Template application preserves custom pricing ability
- Templates stored in version control
- Import process validates data integrity

## 4. API Documentation Requirements

### 4.1 Convex Function Documentation

**Requirement ID:** DOCS-001  
**Priority:** Medium  
**Story:** 1.5 Enhancement

Generate and maintain API documentation:

```typescript
// convex/README.md
# Convex API Documentation

## Authentication Functions

### `auth.getUserRole`
Returns the current user's role within the organization.

**Arguments:**
- None (uses authenticated context)

**Returns:**
```typescript
{
  role: "admin" | "waiter" | "kitchen" | "cashier"
  organizationId: string
  permissions: string[]
}
```

**Example:**
```typescript
const userRole = await ctx.runQuery(api.auth.getUserRole)
```

## Order Management Functions

### `orders.create`
Creates a new order with items.

**Arguments:**
```typescript
{
  tableNumber: number
  items: Array<{
    menuItemId: string
    quantity: number
    specialInstructions?: string
  }>
  eventId: string
}
```

**Returns:**
```typescript
{
  orderId: string
  orderNumber: number
  status: "new"
  createdAt: number
  total: number
}
```

// ... continue for all functions
```

**Acceptance Criteria:**
- README.md in convex/ directory
- All public functions documented
- TypeScript types included
- Usage examples provided
- Error codes documented
- Auto-generation script created

### 4.2 Component Documentation

**Requirement ID:** DOCS-002  
**Priority:** Medium  
**Story:** Throughout Development

Document component interfaces:

```typescript
// components/README.md
# Component Documentation

## OrderEntry Component

### Props
```typescript
interface OrderEntryProps {
  eventId: string
  waiterId: string
  onOrderComplete: (orderId: string) => void
  menuItems: MenuItem[]
}
```

### Usage
```tsx
<OrderEntry 
  eventId={currentEvent.id}
  waiterId={user.id}
  onOrderComplete={(id) => router.push(`/orders/${id}`)}
  menuItems={menuItems}
/>
```

### State Management
- Uses local state for current order building
- Syncs with Convex on submission
- Implements optimistic updates

// ... continue for all components
```

**Acceptance Criteria:**
- Component documentation template created
- Props, state, and methods documented
- Usage examples included
- Accessibility notes added
- Testing considerations documented

## 5. Deployment Documentation Requirements

### 5.1 Deployment Guide

**Requirement ID:** DOCS-003  
**Priority:** High  
**Story:** 1.8 Enhancement

Create comprehensive deployment documentation:

```markdown
# SimplePOS Deployment Guide

## Prerequisites
- Vercel account
- Convex account
- Clerk account
- GitHub repository

## Environment Variables
Required for production:
- NEXT_PUBLIC_CONVEX_URL
- CONVEX_DEPLOYMENT
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
- CLERK_SECRET_KEY
- CLERK_WEBHOOK_SECRET

## Deployment Steps

### 1. Vercel Setup
1. Connect GitHub repository
2. Configure build settings:
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`
3. Add environment variables
4. Deploy

### 2. Convex Production Setup
1. Create production deployment
2. Set up production environment variables
3. Configure webhooks for Clerk sync
4. Enable backup schedule

### 3. Clerk Production Configuration
1. Create production instance
2. Configure OAuth providers
3. Set up webhook endpoints
4. Configure roles and permissions

## Post-Deployment Checklist
- [ ] Verify all environment variables
- [ ] Test authentication flow
- [ ] Confirm real-time updates working
- [ ] Check mobile responsiveness
- [ ] Validate payment workflows
- [ ] Test data export functionality
```

**Acceptance Criteria:**
- Step-by-step deployment instructions
- Environment variable documentation
- Troubleshooting section included
- Rollback procedures defined
- Monitoring setup documented

## Implementation Timeline Impact

These requirements add the following to Epic 1:

- **Project Initialization:** +2 hours (comprehensive setup)
- **Testing Infrastructure:** +3 hours (framework setup and initial tests)
- **Documentation:** +2 hours (templates and initial docs)
- **Total Addition:** ~7 hours to Epic 1

However, this investment will:
- Prevent 10-15 hours of debugging and rework
- Enable parallel testing during development
- Reduce onboarding time for new developers
- Ensure consistent project structure

## Validation Checklist

Before considering these requirements complete:

- [ ] All initialization commands tested in clean environment
- [ ] Testing framework runs successfully with example tests
- [ ] CI/CD pipeline passes on main branch
- [ ] Menu transition strategy clear to all stakeholders
- [ ] API documentation template populated with first functions
- [ ] Deployment guide validated with test deployment

## Next Steps

1. **Immediate Actions:**
   - Update Story 1.1 with detailed initialization steps
   - Create Story 1.1.5 for testing infrastructure
   - Add comments to Story 1.3 about demo data

2. **Documentation Tasks:**
   - Create documentation templates during Epic 1
   - Establish documentation standards early
   - Set up auto-generation where possible

3. **Communication:**
   - Brief development team on testing requirements
   - Clarify menu progression strategy
   - Review deployment prerequisites with DevOps

---

*This document addresses all critical gaps identified in the PO validation report and provides actionable requirements for successful SimplePOS development.*