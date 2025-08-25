# Security and Performance

### Security Requirements

**Frontend Security:**
- CSP Headers: `default-src 'self'; script-src 'self' 'unsafe-eval' clerk.com convex.cloud`
- XSS Prevention: React's automatic escaping, input sanitization
- Secure Storage: Sensitive data in httpOnly cookies only

**Backend Security:**
- Input Validation: Zod schemas on all mutations
- Rate Limiting: 10 requests per second per user
- CORS Policy: Restricted to application domains only

**Authentication Security:**
- Token Storage: Clerk manages secure session cookies
- Session Management: 24-hour sessions with refresh
- Password Policy: Enforced by Clerk (min 8 chars, complexity)

### Performance Optimization

**Frontend Performance:**
- Bundle Size Target: < 200KB initial JS
- Loading Strategy: Code splitting by route, lazy loading
- Caching Strategy: ISR with 60-second revalidation

**Backend Performance:**
- Response Time Target: < 100ms p95
- Database Optimization: Indexed queries, projection limiting
- Caching Strategy: Convex automatic query caching
