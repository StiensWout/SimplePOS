# Tech Stack

### Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|------------|---------|---------|-----------|
| Frontend Language | TypeScript | 5.5+ | Type-safe development | Catches errors at compile time, essential for volunteer-facing reliability |
| Frontend Framework | Next.js | 14.2+ | React meta-framework | App Router, RSC, edge runtime for optimal performance |
| UI Component Library | shadcn/ui | Latest | Accessible components | Radix UI primitives with Tailwind styling, fully customizable |
| State Management | Convex Hooks + React Query | 1.26+ / 5+ | Server state sync | Real-time subscriptions with caching and optimistic updates |
| Backend Language | TypeScript | 5.5+ | Type-safe backend | Shared types between frontend and backend |
| Backend Framework | Convex | 1.26+ | Serverless functions | Built-in real-time, transactions, and scaling |
| API Style | Convex RPC | 1.26+ | Type-safe API | Auto-generated client with real-time subscriptions |
| Database | Convex DB | Built-in | Document database | ACID transactions with real-time queries |
| Cache | Convex Built-in | N/A | Query caching | Automatic query result caching |
| File Storage | Convex Storage | Built-in | File uploads | Organization logos and exports |
| Authentication | Clerk | 6.31+ | Identity management | Multi-tenant auth with role-based access |
| Frontend Testing | Vitest + Testing Library | 2.0+ / 16+ | Unit/integration tests | Fast, ESM-native testing with React utils |
| Backend Testing | Convex Test | Built-in | Function testing | Isolated backend function tests |
| E2E Testing | Playwright | 1.49+ | End-to-end testing | Cross-browser testing with mobile emulation |
| Build Tool | Vite (via Next.js) | 5.0+ | Module bundling | Fast HMR and optimized production builds |
| Bundler | Turbopack | Beta | Development bundler | Faster development builds (Next.js built-in) |
| IaC Tool | Vercel CLI | Latest | Deployment config | Infrastructure as code for Vercel |
| CI/CD | GitHub Actions | N/A | Automation | Integrated with GitHub, free for public repos |
| Monitoring | Sentry | 8.45+ | Error tracking | Real-time error monitoring with source maps |
| Logging | Convex Logs | Built-in | Function logs | Structured logging for debugging |
| CSS Framework | Tailwind CSS | 4.0+ | Utility CSS | Rapid styling with excellent mobile support |
