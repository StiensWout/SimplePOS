# SimplePOS

A volunteer-first point-of-sale system designed for small local organizations running fundraising and social events.

## 🚀 Tech Stack

- **Frontend:** Next.js 15.5+ with App Router, TypeScript 5+
- **Backend:** Convex 1.26+ (serverless with real-time)
- **Database:** Convex DB (document database with ACID transactions)
- **Authentication:** Clerk 6.31+ (multi-tenant RBAC)
- **UI Components:** shadcn/ui with Radix UI primitives
- **Styling:** Tailwind CSS 4.0+
- **Testing:** Vitest 2.0+ with Testing Library
- **Deployment:** Vercel + Convex Cloud

## 📋 Prerequisites

- Node.js 18.17+ or 20.5+ (LTS recommended)
- npm 9.0+
- Git 2.38+

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/SimplePOS.git
cd SimplePOS/simple-pos
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

1. Copy the environment template:
```bash
cp .env.local.example .env.local
```

2. Configure your environment variables:

#### Convex Setup
- Go to [Convex Dashboard](https://dashboard.convex.dev)
- Create a new project or select existing
- Copy the deployment URL and update:
  - `CONVEX_DEPLOYMENT`
  - `NEXT_PUBLIC_CONVEX_URL`

#### Clerk Setup
- Go to [Clerk Dashboard](https://dashboard.clerk.com)
- Create a new application
- Copy your API keys and update:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`
- Configure the following URLs in Clerk dashboard:
  - Sign-in URL: `/sign-in`
  - Sign-up URL: `/sign-up`
  - After sign-in URL: `/dashboard`
  - After sign-up URL: `/onboarding`

### 4. Initialize Convex Backend

```bash
npx convex dev
```

This will:
- Connect to your Convex deployment
- Push the schema to the backend
- Set up real-time subscriptions

## 🏃 Local Development

### Start Development Server

Run all services concurrently:

```bash
# Terminal 1: Start Next.js dev server
npm run dev

# Terminal 2: Start Convex dev server (if not already running)
npx convex dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Convex Dashboard: https://dashboard.convex.dev

### Available Scripts

- `npm run dev` - Start Next.js development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests with Vitest
- `npm run test:coverage` - Run tests with coverage report

## 📁 Project Structure

```
simple-pos/
├── app/                   # Next.js App Router
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # Main app routes
│   ├── api/              # API routes
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   └── features/        # Feature components
├── convex/              # Backend functions
│   ├── _generated/      # Auto-generated types
│   └── schema.ts        # Database schema
├── hooks/               # Custom React hooks
├── lib/                 # Utilities
└── public/             # Static assets
```

## 🔑 User Roles

SimplePOS supports four distinct user roles:

1. **Admin** - Full system access, event management, reporting
2. **Waiter** - Order entry, table management
3. **Kitchen** - Order processing, status updates
4. **Cashier** - Payment processing, order completion

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

### Test Structure

- `__tests__/unit/` - Unit tests for components and utilities
- `__tests__/integration/` - Integration tests for features
- `e2e/` - End-to-end tests (Playwright)

## 🚀 Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. Configure environment variables in Vercel dashboard
4. Enable automatic deployments from main branch

### Production Environment Variables

Ensure all environment variables are configured in your production environment:
- Convex production deployment
- Clerk production keys
- Production URLs

## 🐛 Troubleshooting

### Common Issues

#### Convex Connection Issues
- Ensure `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` are correct
- Check if Convex dev server is running
- Verify network connectivity

#### Clerk Authentication Issues
- Verify API keys are correct
- Check Clerk dashboard for proper URL configuration
- Ensure middleware is properly configured

#### Build Errors
- Clear `.next` directory: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (must be 18.17+)

## 📚 Documentation

For more detailed documentation, see:
- [Product Requirements](../docs/prd/)
- [Technical Architecture](../docs/architecture/)
- [API Documentation](../docs/api/)

## 🤝 Contributing

Please read our contributing guidelines before submitting PRs.

## 📄 License

[License information to be added]

---

Built with ❤️ for local communities
