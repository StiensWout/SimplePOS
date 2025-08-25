# Vercel Deployment Guide for SimplePOS

## Prerequisites
- Vercel account (free at https://vercel.com)
- Git repository with SimplePOS code
- Environment variables from `.env.local`

## Step-by-Step Deployment Instructions

### 1. Install Vercel CLI (Optional - for CLI deployment)
```bash
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard (Recommended)

#### A. Import Project
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import your Git repository (GitHub/GitLab/Bitbucket)
4. Select the SimplePOS repository

#### B. Configure Build Settings
Vercel should auto-detect Next.js, but verify these settings:
- **Framework Preset:** Next.js
- **Root Directory:** `simple-pos` (IMPORTANT: Set this to the simple-pos subfolder)
- **Build Command:** `npm run build` or leave as default
- **Output Directory:** `.next` or leave as default
- **Install Command:** `npm install` or leave as default

#### C. Configure Environment Variables
**CRITICAL**: These environment variables MUST be added in Vercel BEFORE deploying, or the build will fail!

Add the following environment variables from your `.env.local`:

```env
# Convex (Production) - REQUIRED
CONVEX_DEPLOYMENT=dev:avid-caterpillar-749
NEXT_PUBLIC_CONVEX_URL=https://avid-caterpillar-749.convex.cloud

# Clerk - ALL REQUIRED FOR BUILD
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cXVpZXQtYmlzb24tNzUuY2xlcmsuYWNjb3VudHMuZGV2JA
CLERK_SECRET_KEY=sk_test_nLNCpN22xci2oIwAhTEPtWPkaVa2E3QX82nIRm5Add

# Clerk URLs (Add these for proper routing)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Optional - if you have separate Clerk Frontend API
CLERK_FRONTEND_API_URL=https://quiet-bison-75.clerk.accounts.dev

# App URL (Update with your Vercel URL after first deploy)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

⚠️ **BUILD WILL FAIL WITHOUT THESE VARIABLES!** The app requires at minimum:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` 
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CONVEX_URL`
- `CONVEX_DEPLOYMENT`

### 3. Deploy via CLI (Alternative Method)

If you prefer using the CLI:

```bash
# Navigate to the simple-pos directory
cd simple-pos

# Run vercel command
vercel

# Follow the prompts:
# - Link to existing project or create new
# - Confirm project settings
# - Deploy
```

### 4. Post-Deployment Configuration

#### A. Update Clerk Settings
1. Go to Clerk Dashboard (https://dashboard.clerk.com)
2. Navigate to your application
3. Add your Vercel production URL to:
   - **Allowed Origins:** `https://your-app.vercel.app`
   - **Redirect URLs:** 
     - `https://your-app.vercel.app/sign-in`
     - `https://your-app.vercel.app/sign-up`
     - `https://your-app.vercel.app/dashboard`
     - `https://your-app.vercel.app/onboarding`

#### B. Configure Webhooks (if needed)
For Clerk → Convex user sync:
1. In Clerk Dashboard, go to Webhooks
2. Add endpoint: `https://your-app.vercel.app/api/webhooks/clerk`
3. Select events: `user.created`, `user.updated`, `user.deleted`

#### C. Update Environment Variables
After first deployment, update `NEXT_PUBLIC_APP_URL` in Vercel:
1. Go to Project Settings → Environment Variables
2. Update `NEXT_PUBLIC_APP_URL` with your actual Vercel URL
3. Redeploy to apply changes

### 5. Enable Automatic Deployments

In Vercel project settings:
1. Go to Git settings
2. Ensure "Auto-deploy" is enabled for the main branch
3. Optional: Enable preview deployments for pull requests

### 6. Verify Deployment

Test your deployment:
1. Visit `https://your-app.vercel.app/api/health` - Should return 200 with system info
2. Visit `https://your-app.vercel.app` - Should show the homepage
3. Test authentication flow at `/sign-in`

## Troubleshooting

### Build Fails with "Missing publishableKey" Error
**This is the most common issue!** The error looks like:
```
Error: @clerk/clerk-react: Missing publishableKey. You can get your key at https://dashboard.clerk.com/last-active?path=api-keys.
```

**Solution:**
1. Go to Vercel project settings → Environment Variables
2. Add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` with your key from `.env.local`
3. Add `CLERK_SECRET_KEY` as well
4. Make sure variables are added to ALL environments (Production, Preview, Development)
5. Trigger a rebuild

### Build Fails (Other Reasons)
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json` (not just devDependencies)
- Verify Node.js version compatibility
- ESLint errors will fail the build - fix them locally first

### Environment Variables Not Working
- Ensure variables are added to all environments (Production, Preview, Development)
- Rebuild after adding/changing environment variables
- Check for typos in variable names
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser

### Clerk Authentication Issues
- Verify API keys are correct (use production keys for production)
- Check Clerk dashboard for proper domain configuration
- Ensure middleware.ts is properly configured
- Add your Vercel domain to Clerk's allowed origins

### Convex Connection Issues
- Verify Convex deployment URL is correct
- Check Convex dashboard for any errors
- Ensure Convex schema is deployed: `npx convex deploy`
- Run `npx convex dev` locally to sync schema changes

## Production Considerations

### For Production Deployment:
1. **Use Production Keys:** Replace test keys with production keys from Clerk
2. **Convex Production:** Consider creating a separate Convex production deployment
3. **Custom Domain:** Configure custom domain in Vercel project settings
4. **Analytics:** Consider adding Vercel Analytics or other monitoring
5. **Error Tracking:** Set up Sentry or similar error tracking service

### Security Checklist:
- [ ] Production API keys configured
- [ ] Environment variables properly scoped
- [ ] CORS settings configured in Clerk
- [ ] Rate limiting configured (if needed)
- [ ] SSL certificate active (automatic with Vercel)

## Useful Commands

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Promote to production
vercel --prod

# Pull environment variables locally
vercel env pull

# Link local project to Vercel
vercel link
```

## Support Resources

- Vercel Documentation: https://vercel.com/docs
- Next.js on Vercel: https://vercel.com/docs/frameworks/nextjs
- Clerk + Vercel Guide: https://clerk.com/docs/deployments/vercel
- Convex + Vercel: https://docs.convex.dev/production/hosting/vercel