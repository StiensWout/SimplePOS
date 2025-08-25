# Clerk Role Claims Setup Guide

## Setting Up Custom Roles in Clerk Dashboard

### Step 1: Access Clerk Dashboard
1. Go to https://dashboard.clerk.com
2. Select your SimplePOS application

### Step 2: Configure Custom Session Claims

1. In the left sidebar, look for **Configure** section
2. Click on **Sessions**
3. In the Sessions page, find the **Customize session token** section
4. Click on **Edit**
5. Add the following custom claims to expose user metadata in the session:

```json
{
  "role": "{{user.public_metadata.role}}",
  "organizationId": "{{user.public_metadata.organizationId}}"
}
```

4. Click **Save**

### Step 3: Understanding User Metadata in Clerk

**Note:** Clerk doesn't have a global metadata schema setting. Instead:
- Metadata is stored per user as JSON objects
- You can set it programmatically via the API or manually per user
- There are three types:
  - **Public metadata**: Accessible on both client and server
  - **Private metadata**: Only accessible on the server
  - **Unsafe metadata**: Can be modified by the user (not recommended for roles)

To manually set metadata for testing:
1. Go to **Users** in Clerk Dashboard
2. Click on a specific user
3. Scroll down to **Metadata** section
4. Edit **Public metadata** and add:

```json
{
  "role": "admin",
  "organizationId": "org_123"
}
```

### Step 4: Create Role Assignment Flow

Since Clerk doesn't have built-in role management, we handle this in our application:

1. **During Onboarding** (`/onboarding` page):
   - User selects their role
   - We update their public metadata using Clerk's Backend API

2. **Implementation in Code**:

Create a server action to update user roles:

```typescript
// app/actions/updateUserRole.ts
'use server';

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function updateUserRole(role: 'admin' | 'waiter' | 'kitchen' | 'cashier') {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      role
    }
  });

  return { success: true };
}
```

### Step 5: Protect Routes Based on Roles

Create a middleware to check roles:

```typescript
// middleware.ts
import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"],
  afterAuth(auth, req) {
    // If user is signed in and on onboarding, allow
    if (auth.userId && req.nextUrl.pathname === "/onboarding") {
      return NextResponse.next();
    }

    // If user is signed in but has no role, redirect to onboarding
    if (auth.userId && !auth.sessionClaims?.role && req.nextUrl.pathname !== "/onboarding") {
      const onboardingUrl = new URL("/onboarding", req.url);
      return NextResponse.redirect(onboardingUrl);
    }

    // Role-based access control
    const role = auth.sessionClaims?.role as string;
    const path = req.nextUrl.pathname;

    // Define role permissions
    const rolePermissions = {
      admin: ['/dashboard', '/admin', '/events', '/settings', '/orders', '/kitchen', '/cashier'],
      waiter: ['/dashboard', '/orders', '/tables'],
      kitchen: ['/dashboard', '/kitchen'],
      cashier: ['/dashboard', '/cashier', '/orders']
    };

    // Check if user has access to the current path
    if (auth.userId && role) {
      const allowedPaths = rolePermissions[role as keyof typeof rolePermissions] || [];
      const hasAccess = allowedPaths.some(allowedPath => path.startsWith(allowedPath));
      
      if (!hasAccess && path !== '/unauthorized') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    return NextResponse.next();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

### Step 6: Test Role Assignment

1. Sign up a new user
2. On the onboarding page, select a role
3. Check Clerk Dashboard → Users to verify the public metadata was set
4. Try accessing different routes to verify role-based access control

## Available Roles

| Role | Access Level | Primary Functions |
|------|-------------|-------------------|
| **Admin** | Full Access | • Manage events<br>• Configure settings<br>• View all areas<br>• Manage users |
| **Waiter** | Order Management | • Take orders<br>• Manage tables<br>• View order status |
| **Kitchen** | Kitchen Display | • View incoming orders<br>• Update order status<br>• Mark items complete |
| **Cashier** | Payment Processing | • Process payments<br>• Close orders<br>• Handle refunds |

## Troubleshooting

### Role Not Appearing in Session
- Ensure the session token claims are configured correctly
- User may need to sign out and sign back in for changes to take effect
- Check that public metadata is enabled in Clerk dashboard

### User Stuck Without Role
- Direct them to `/onboarding` to select a role
- Admin can manually set role via Clerk Dashboard → Users → Edit User → Public Metadata

### Testing Different Roles
- Create multiple test accounts
- Assign different roles to each
- Use incognito/private browsing to test multiple sessions