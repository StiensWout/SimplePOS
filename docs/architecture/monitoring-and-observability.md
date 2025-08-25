# Monitoring and Observability

### Monitoring Stack

- **Frontend Monitoring:** Sentry for error tracking, Web Vitals for performance
- **Backend Monitoring:** Convex dashboard for function metrics
- **Error Tracking:** Sentry with source maps and user context
- **Performance Monitoring:** Vercel Analytics for Core Web Vitals

### Key Metrics

**Frontend Metrics:**
- Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- JavaScript errors per session
- API response times p50/p95/p99
- User interaction success rate

**Backend Metrics:**
- Request rate per function
- Error rate by type
- Response time percentiles
- Database query performance
- WebSocket connection count
- Real-time subscription lag
