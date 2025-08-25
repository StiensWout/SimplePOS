# External APIs

### Clerk API
- **Purpose:** User authentication and session management
- **Documentation:** https://clerk.com/docs
- **Base URL(s):** https://api.clerk.com
- **Authentication:** Secret key in environment variables
- **Rate Limits:** 10,000 requests per minute

**Key Endpoints Used:**
- `POST /oauth/token` - Token exchange for authentication
- `GET /users/{user_id}` - Retrieve user profile
- `POST /organizations/{org_id}/invitations` - Invite users

**Integration Notes:** Webhook integration for user sync, JWT validation on backend

### Sentry API
- **Purpose:** Error tracking and performance monitoring
- **Documentation:** https://docs.sentry.io
- **Base URL(s):** https://sentry.io/api/
- **Authentication:** DSN in client configuration
- **Rate Limits:** Based on plan (10K events/month for free tier)

**Key Endpoints Used:**
- `POST /envelope/` - Send error events
- `POST /monitor/` - Performance metrics

**Integration Notes:** Source map upload during build, user context attachment
