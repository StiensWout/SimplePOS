import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

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
    price: v.number(), // Price in cents
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
    totalAmount: v.number(), // Total in cents
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    createdBy: v.string(),
    completedAt: v.optional(v.number()),
    completedBy: v.optional(v.string()),
  })
    .index("by_organization", ["organizationId"])
    .index("by_event", ["eventId"])
    .index("by_organization_status", ["organizationId", "status"])
    .index("by_table", ["eventId", "tableNumber"]),

  orderItems: defineTable({
    orderId: v.id("orders"),
    menuItemId: v.id("menuItems"),
    quantity: v.number(),
    price: v.number(), // Price at time of order in cents
    notes: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_order", ["orderId"])
    .index("by_menu_item", ["menuItemId"]),

  auditLogs: defineTable({
    organizationId: v.id("organizations"),
    userId: v.string(),
    action: v.string(),
    entityType: v.string(),
    entityId: v.string(),
    metadata: v.optional(v.any()),
    timestamp: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_user", ["userId"])
    .index("by_entity", ["entityType", "entityId"])
    .index("by_timestamp", ["timestamp"]),
});