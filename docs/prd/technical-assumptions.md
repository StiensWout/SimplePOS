# Technical Assumptions

### Repository Structure: Monorepo

The application will use a monorepo structure with the complete Simple POS application contained in a `simple-pos` subfolder. This approach simplifies deployment, dependency management, and ensures all components stay synchronized during development and updates.

### Service Architecture

**Serverless architecture with real-time capabilities** - The system will use Convex's serverless functions for all backend logic, with built-in real-time subscriptions for instant updates across devices. This eliminates server management overhead and provides automatic scaling. The architecture consists of:
- Serverless API functions for CRUD operations
- Real-time subscriptions for order status updates
- WebSocket connections for kitchen display synchronization
- Stateless function execution with database-backed persistence

### Testing Requirements

**Comprehensive testing pyramid with emphasis on integration** - Given the volunteer-facing nature and need for reliability:
- Unit tests for business logic (order calculations, validation rules)
- Integration tests for critical user flows (order creation → kitchen display → completion)
- End-to-end tests for complete scenarios using Playwright
- Manual testing convenience methods for volunteer training scenarios
- Real-device testing on actual phones/tablets before deployment
- Load testing to verify 30 concurrent user support

### Additional Technical Assumptions and Requests

- **Frontend Framework**: Next.js 14+ with TypeScript for type safety and developer experience
- **UI Components**: shadcn/ui for consistent, accessible component library
- **Backend Platform**: Convex for serverless backend with real-time subscriptions
- **Authentication**: Clerk for user management and role-based access control
- **Hosting**: Vercel for Next.js application hosting with edge functions
- **Database**: Convex's built-in database with ACID transactions
- **State Management**: React Query with Convex hooks for server state
- **Form Handling**: React Hook Form with Zod validation
- **Responsive Design**: Tailwind CSS for utility-first responsive styling
- **Error Monitoring**: Sentry for production error tracking
- **Development Workflow**: ESLint, Prettier, Husky for code quality
- **Browser Support**: Modern browsers only (no IE11 support)
- **Performance Budget**: Core Web Vitals targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- **API Design**: Type-safe RPC via Convex functions, no REST layer needed
- **Security**: HTTPS only, secure cookie-based sessions via Clerk
- **Data Export**: Built-in CSV generation without external dependencies
