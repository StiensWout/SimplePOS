# Frontend Architecture

### Component Architecture

#### Component Organization
```
components/
├── ui/                    # shadcn/ui base components
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ...
├── features/             # Feature-specific components
│   ├── orders/
│   │   ├── OrderBuilder.tsx
│   │   ├── OrderCard.tsx
│   │   └── OrderSummary.tsx
│   ├── kitchen/
│   │   ├── KitchenDisplay.tsx
│   │   └── OrderQueue.tsx
│   └── payments/
│       ├── PaymentForm.tsx
│       └── ReceiptModal.tsx
└── layouts/
    ├── DashboardLayout.tsx
    └── MobileLayout.tsx
```

#### Component Template
```typescript
// components/features/orders/OrderBuilder.tsx
"use client"

import { useState } from "react"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface OrderBuilderProps {
  eventId: Id<"events">
  onSuccess?: (orderId: Id<"orders">) => void
}

export function OrderBuilder({ eventId, onSuccess }: OrderBuilderProps) {
  const [items, setItems] = useState<OrderItem[]>([])
  const [tableNumber, setTableNumber] = useState("")
  
  const menuItems = useQuery(api.menuItems.getByEvent, { eventId })
  const createOrder = useMutation(api.orders.create)
  const { toast } = useToast()
  
  const handleSubmit = async () => {
    try {
      const orderId = await createOrder({
        eventId,
        tableNumber,
        items,
      })
      toast({ title: "Order created successfully" })
      onSuccess?.(orderId)
    } catch (error) {
      toast({ 
        title: "Failed to create order",
        variant: "destructive" 
      })
    }
  }
  
  return (
    <div className="space-y-4">
      {/* Component implementation */}
    </div>
  )
}
```

### State Management Architecture

#### State Structure
```typescript
// Global state managed by Convex subscriptions
interface AppState {
  // User & Auth State (from Clerk)
  user: ClerkUser | null
  organization: Organization | null
  
  // Real-time Data (from Convex)
  activeEvent: Event | null
  menuItems: MenuItem[]
  orders: Order[]
  tables: TableStatus[]
  
  // UI State (local)
  selectedRole: UserRole | null
  orderBuilder: {
    items: OrderItem[]
    tableNumber: string
  }
}
```

#### State Management Patterns
- Server State: Convex queries with real-time subscriptions
- Local State: React useState for UI-only state
- Form State: React Hook Form with Zod validation
- Optimistic Updates: Update UI before server confirmation

### Routing Architecture

#### Route Organization
```
app/
├── (auth)/
│   ├── sign-in/
│   └── sign-up/
├── (dashboard)/
│   ├── layout.tsx         # Role-based layout
│   ├── admin/
│   │   ├── events/
│   │   ├── menu/
│   │   └── reports/
│   ├── waiter/
│   │   ├── orders/
│   │   └── tables/
│   ├── kitchen/
│   │   └── display/
│   └── cashier/
│       └── checkout/
└── api/
    └── health/
```

#### Protected Route Pattern
```typescript
// app/(dashboard)/layout.tsx
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { userId, sessionClaims } = await auth()
  
  if (!userId) {
    redirect("/sign-in")
  }
  
  const userRole = sessionClaims?.role as UserRole
  
  return (
    <div className="min-h-screen">
      <Navigation role={userRole} />
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  )
}
```

### Frontend Services Layer

#### API Client Setup
```typescript
// lib/convex.ts
import { ConvexProvider, ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ClerkProvider, useAuth } from "@clerk/nextjs"

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!
)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  )
}
```

#### Service Example
```typescript
// hooks/use-orders.ts
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

export function useOrders(eventId: Id<"events">) {
  const orders = useQuery(api.orders.getByEvent, { eventId })
  const createOrder = useMutation(api.orders.create)
  const updateStatus = useMutation(api.orders.updateStatus)
  
  return {
    orders,
    createOrder,
    updateStatus,
    isLoading: orders === undefined,
  }
}

export function useKitchenDisplay(eventId: Id<"events">) {
  // Real-time subscription to kitchen orders
  return useQuery(api.orders.subscribeToKitchenOrders, { eventId })
}
```
