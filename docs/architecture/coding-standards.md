# Coding Standards

### Critical Fullstack Rules
- **Type Sharing:** Always define types in convex/_generated and import from there
- **API Calls:** Never make direct HTTP calls - use Convex hooks exclusively
- **Environment Variables:** Access only through process.env with validation
- **Error Handling:** All mutations must use try-catch with proper error messages
- **State Updates:** Never mutate state directly - use proper React patterns
- **Multi-Tenancy:** Every database query must include organizationId filter
- **Audit Logging:** All mutations must create audit log entries
- **Price Handling:** Always store prices as integers (cents) to avoid float errors

### Naming Conventions

| Element | Frontend | Backend | Example |
|---------|----------|---------|---------|
| Components | PascalCase | - | `OrderBuilder.tsx` |
| Hooks | camelCase with 'use' | - | `useOrders.ts` |
| API Routes | - | camelCase | `createOrder` |
| Database Tables | - | camelCase plural | `organizations` |
| File Names | kebab-case or PascalCase | camelCase | `order-builder.tsx` |
| Constants | SCREAMING_SNAKE_CASE | SCREAMING_SNAKE_CASE | `MAX_ITEMS` |
