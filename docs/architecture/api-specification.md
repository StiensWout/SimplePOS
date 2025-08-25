# API Specification

### Convex RPC Functions

The API uses Convex's type-safe RPC pattern with automatic client generation. All functions are defined in the `convex/` directory and are accessible through the generated client.

#### Authentication Functions
```typescript
// convex/auth/mutations.ts
export const linkUserToOrganization = mutation({
  args: {
    organizationId: v.id("organizations"),
    role: v.union(
      v.literal("admin"),
      v.literal("waiter"),
      v.literal("kitchen"),
      v.literal("cashier")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new ConvexError("Not authenticated")
    
    // Create or update user record
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", q => q.eq("clerkId", identity.subject))
      .unique()
    
    if (existing) {
      return await ctx.db.patch(existing._id, {
        organizationId: args.organizationId,
        role: args.role,
        lastActiveAt: Date.now(),
      })
    }
    
    return await ctx.db.insert("users", {
      clerkId: identity.subject,
      email: identity.email!,
      name: identity.name || identity.email!,
      organizationId: args.organizationId,
      role: args.role,
      isActive: true,
      lastActiveAt: Date.now(),
      createdAt: Date.now(),
    })
  },
})
```

#### Order Management Functions
```typescript
// convex/orders/mutations.ts
export const createOrder = mutation({
  args: {
    eventId: v.id("events"),
    tableNumber: v.string(),
    items: v.array(v.object({
      menuItemId: v.id("menuItems"),
      quantity: v.number(),
      specialInstructions: v.optional(v.string()),
    })),
    specialInstructions: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Implementation with auth, validation, and audit logging
  },
})

export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("in_progress"),
      v.literal("ready"),
      v.literal("completed")
    ),
  },
  handler: async (ctx, args) => {
    // Role-based status transitions with timestamps
  },
})
```

#### Real-Time Subscriptions
```typescript
// convex/orders/queries.ts
export const subscribeToKitchenOrders = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    // Returns orders grouped by status
    // Automatically updates when orders change
  },
})

export const subscribeToTableOrders = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    // Returns table-grouped orders with status
  },
})
```

#### Menu Management Functions
```typescript
// convex/menuItems/mutations.ts
export const createMenuItem = mutation({
  args: {
    organizationId: v.id("organizations"),
    eventId: v.optional(v.id("events")),
    name: v.string(),
    category: v.union(
      v.literal("starter"),
      v.literal("main"),
      v.literal("drink"),
      v.literal("dessert"),
      v.literal("other")
    ),
    price: v.number(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Create menu item with validation
  },
})

export const bulkImportMenuItems = mutation({
  args: {
    organizationId: v.id("organizations"),
    items: v.array(/* menu item schema */),
  },
  handler: async (ctx, args) => {
    // Bulk import with transaction
  },
})
```
