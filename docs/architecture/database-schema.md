# Database Schema

### Convex Schema Definition
```typescript
// convex/schema.ts
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  organizations: defineTable({
    name: v.string(),
    slug: v.string(),
    logo: v.optional(v.string()),
    timezone: v.string(),
    currency: v.string(),
    settings: v.object({
      maxConcurrentEvents: v.number(),
      defaultEventDuration: v.number(),
    }),
    createdAt: v.number(),
    updatedAt: v.number(),
    createdBy: v.string(),
  })
  .index("by_slug", ["slug"])
  .index("by_created_by", ["createdBy"]),

  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    organizationId: v.id("organizations"),
    role: v.union(
      v.literal("admin"),
      v.literal("waiter"),
      v.literal("kitchen"),
      v.literal("cashier")
    ),
    isActive: v.boolean(),
    lastActiveAt: v.number(),
    createdAt: v.number(),
  })
  .index("by_clerk_id", ["clerkId"])
  .index("by_organization", ["organizationId"])
  .index("by_organization_role", ["organizationId", "role"]),

  events: defineTable({
    organizationId: v.id("organizations"),
    name: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.number(),
    status: v.union(
      v.literal("draft"),
      v.literal("active"),
      v.literal("paused"),
      v.literal("completed")
    ),
    settings: v.object({
      allowOrderModifications: v.boolean(),
      autoCloseOrders: v.boolean(),
      maxTablesCount: v.number(),
    }),
    createdAt: v.number(),
    createdBy: v.string(),
  })
  .index("by_organization", ["organizationId"])
  .index("by_organization_status", ["organizationId", "status"])
  .index("by_time_range", ["startTime", "endTime"]),

  menuItems: defineTable({
    organizationId: v.id("organizations"),
    eventId: v.optional(v.id("events")),
    name: v.string(),
    description: v.optional(v.string()),
    category: v.union(
      v.literal("starter"),
      v.literal("main"),
      v.literal("drink"),
      v.literal("dessert"),
      v.literal("other")
    ),
    price: v.number(),
    isAvailable: v.boolean(),
    sortOrder: v.number(),
    imageUrl: v.optional(v.string()),
    allergens: v.optional(v.array(v.string())),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
  .index("by_organization", ["organizationId"])
  .index("by_event", ["eventId"])
  .index("by_organization_category", ["organizationId", "category"])
  .index("by_availability", ["organizationId", "isAvailable"]),

  orders: defineTable({
    organizationId: v.id("organizations"),
    eventId: v.id("events"),
    tableNumber: v.string(),
    status: v.union(
      v.literal("new"),
      v.literal("in_progress"),
      v.literal("ready"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
    items: v.array(v.object({
      menuItemId: v.id("menuItems"),
      name: v.string(),
      price: v.number(),
      quantity: v.number(),
      specialInstructions: v.optional(v.string()),
    })),
    subtotal: v.number(),
    total: v.number(),
    paymentMethod: v.optional(v.union(
      v.literal("cash"),
      v.literal("card")
    )),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("refunded")
    ),
    specialInstructions: v.optional(v.string()),
    timestamps: v.object({
      createdAt: v.number(),
      startedAt: v.optional(v.number()),
      readyAt: v.optional(v.number()),
      completedAt: v.optional(v.number()),
      cancelledAt: v.optional(v.number()),
    }),
    createdBy: v.string(),
    completedBy: v.optional(v.string()),
  })
  .index("by_organization_event", ["organizationId", "eventId"])
  .index("by_event_status", ["eventId", "status"])
  .index("by_table", ["eventId", "tableNumber"])
  .index("by_created_by", ["createdBy"])
  .index("by_timestamps", ["timestamps.createdAt"]),

  auditLogs: defineTable({
    organizationId: v.id("organizations"),
    eventId: v.optional(v.id("events")),
    action: v.string(),
    entityType: v.union(
      v.literal("order"),
      v.literal("menuItem"),
      v.literal("event"),
      v.literal("user")
    ),
    entityId: v.string(),
    userId: v.string(),
    previousValue: v.optional(v.any()),
    newValue: v.optional(v.any()),
    timestamp: v.number(),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  })
  .index("by_organization", ["organizationId"])
  .index("by_event", ["eventId"])
  .index("by_entity", ["entityType", "entityId"])
  .index("by_user", ["userId"])
  .index("by_timestamp", ["timestamp"]),
})
```
