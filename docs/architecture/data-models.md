# Data Models

### Organization
**Purpose:** Top-level tenant for complete data isolation

**Key Attributes:**
- _id: Id<"organizations"> - Unique identifier
- name: string - Organization display name
- slug: string - URL-safe identifier for routing
- logo: string (optional) - Uploaded logo URL
- timezone: string - For event scheduling
- currency: string - Financial display format
- settings: object - Configurable preferences
- createdAt: number - Unix timestamp
- createdBy: string - Clerk user ID of creator

**TypeScript Interface:**
```typescript
interface Organization {
  _id: Id<"organizations">
  name: string
  slug: string
  logo?: string
  timezone: string
  currency: "USD" | "EUR" | "GBP" | "CAD"
  settings: {
    maxConcurrentEvents: number
    defaultEventDuration: number
  }
  createdAt: number
  updatedAt: number
  createdBy: string
}
```

**Relationships:**
- Has many Users
- Has many Events
- Has many MenuItems
- Has many Orders

### User
**Purpose:** System users with role-based permissions tied to organizations

**Key Attributes:**
- _id: Id<"users"> - Unique identifier
- clerkId: string - External auth identifier
- email: string - User email
- name: string - Display name
- organizationId: Id<"organizations"> - Tenant association
- role: enum - Permission level
- isActive: boolean - Account status
- lastActiveAt: number - Activity tracking

**TypeScript Interface:**
```typescript
interface User {
  _id: Id<"users">
  clerkId: string
  email: string
  name: string
  organizationId: Id<"organizations">
  role: "admin" | "waiter" | "kitchen" | "cashier"
  isActive: boolean
  lastActiveAt: number
  createdAt: number
}
```

**Relationships:**
- Belongs to one Organization
- Creates many Orders
- Creates many AuditLogs

### Event
**Purpose:** Time-bound selling session for an organization

**Key Attributes:**
- _id: Id<"events"> - Unique identifier
- organizationId: Id<"organizations"> - Parent organization
- name: string - Event display name
- startTime: number - Scheduled start
- endTime: number - Scheduled end
- status: enum - Lifecycle state
- settings: object - Event-specific configuration

**TypeScript Interface:**
```typescript
interface Event {
  _id: Id<"events">
  organizationId: Id<"organizations">
  name: string
  description?: string
  startTime: number
  endTime: number
  status: "draft" | "active" | "paused" | "completed"
  settings: {
    allowOrderModifications: boolean
    autoCloseOrders: boolean
    maxTablesCount: number
  }
  createdAt: number
  createdBy: string
}
```

**Relationships:**
- Belongs to one Organization
- Has many MenuItems (optional event-specific)
- Has many Orders

### MenuItem
**Purpose:** Products available for sale with pricing and categorization

**Key Attributes:**
- _id: Id<"menuItems"> - Unique identifier
- organizationId: Id<"organizations"> - Parent organization
- eventId: Id<"events"> (optional) - Event-specific item
- name: string - Display name
- category: enum - Menu section
- price: number - Price in cents
- isAvailable: boolean - Availability status
- sortOrder: number - Display ordering

**TypeScript Interface:**
```typescript
interface MenuItem {
  _id: Id<"menuItems">
  organizationId: Id<"organizations">
  eventId?: Id<"events">
  name: string
  description?: string
  category: "starter" | "main" | "drink" | "dessert" | "other"
  price: number // cents to avoid float errors
  isAvailable: boolean
  sortOrder: number
  imageUrl?: string
  allergens?: string[]
  createdAt: number
  updatedAt: number
}
```

**Relationships:**
- Belongs to one Organization
- Optionally belongs to one Event
- Referenced by OrderItems

### Order
**Purpose:** Customer transaction with items, status, and payment tracking

**Key Attributes:**
- _id: Id<"orders"> - Unique identifier
- organizationId: Id<"organizations"> - Parent organization
- eventId: Id<"events"> - Parent event
- tableNumber: string - Table identifier
- status: enum - Order lifecycle state
- items: OrderItem[] - Purchased products
- total: number - Total amount in cents
- paymentStatus: enum - Payment state
- timestamps: object - State transition times

**TypeScript Interface:**
```typescript
interface Order {
  _id: Id<"orders">
  organizationId: Id<"organizations">
  eventId: Id<"events">
  tableNumber: string
  status: "new" | "in_progress" | "ready" | "completed" | "cancelled"
  items: OrderItem[]
  subtotal: number
  total: number
  paymentMethod?: "cash" | "card"
  paymentStatus: "pending" | "paid" | "refunded"
  specialInstructions?: string
  timestamps: {
    createdAt: number
    startedAt?: number
    readyAt?: number
    completedAt?: number
    cancelledAt?: number
  }
  createdBy: string
  completedBy?: string
}

interface OrderItem {
  menuItemId: Id<"menuItems">
  name: string // Snapshot at order time
  price: number // Snapshot at order time
  quantity: number
  specialInstructions?: string
}
```

**Relationships:**
- Belongs to one Organization
- Belongs to one Event
- Has many OrderItems
- Created by one User (waiter)
- Completed by one User (cashier)

### AuditLog
**Purpose:** Immutable record of all system changes for compliance

**Key Attributes:**
- _id: Id<"auditLogs"> - Unique identifier
- organizationId: Id<"organizations"> - Parent organization
- action: string - Descriptive action name
- entityType: enum - Type of changed entity
- entityId: string - ID of changed entity
- userId: string - User who made change
- previousValue: any - State before change
- newValue: any - State after change
- timestamp: number - When change occurred

**TypeScript Interface:**
```typescript
interface AuditLog {
  _id: Id<"auditLogs">
  organizationId: Id<"organizations">
  eventId?: Id<"events">
  action: string
  entityType: "order" | "menuItem" | "event" | "user"
  entityId: string
  userId: string
  previousValue?: any
  newValue?: any
  timestamp: number
  ipAddress?: string
  userAgent?: string
}
```

**Relationships:**
- Belongs to one Organization
- Optionally belongs to one Event
- References one User (actor)
- References one Entity (target)
