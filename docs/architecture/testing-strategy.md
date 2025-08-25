# Testing Strategy

### Testing Pyramid
```
        E2E Tests (10%)
       /              \
    Integration Tests (30%)
   /                      \
Unit Tests (60%)    Unit Tests
(Frontend)          (Backend)
```

### Test Organization

#### Frontend Tests
```
__tests__/
├── unit/
│   ├── components/
│   └── hooks/
├── integration/
│   └── features/
└── e2e/
    └── flows/
```

#### Backend Tests
```
convex/__tests__/
├── unit/
│   └── lib/
├── integration/
│   └── mutations/
└── fixtures/
    └── data.ts
```

#### E2E Tests
```
e2e/
├── auth.spec.ts
├── order-flow.spec.ts
├── kitchen-display.spec.ts
└── payment.spec.ts
```

### Test Examples

#### Frontend Component Test
```typescript
// __tests__/unit/components/OrderBuilder.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { OrderBuilder } from '@/components/features/orders/OrderBuilder'
import { ConvexProvider } from 'convex/react'

describe('OrderBuilder', () => {
  it('should add items to cart', () => {
    render(
      <ConvexProvider client={mockClient}>
        <OrderBuilder eventId="event123" />
      </ConvexProvider>
    )
    
    const addButton = screen.getByText('Add to Order')
    fireEvent.click(addButton)
    
    expect(screen.getByText('1 item')).toBeInTheDocument()
  })
})
```

#### Backend API Test
```typescript
// convex/__tests__/integration/orders.test.ts
import { convexTest } from 'convex-test'
import { api } from '../_generated/api'

describe('Order Mutations', () => {
  it('should create order with valid data', async () => {
    const t = convexTest(schema)
    
    await t.mutation(api.orders.create, {
      eventId: 'event123',
      tableNumber: '5',
      items: [
        { menuItemId: 'item1', quantity: 2 }
      ]
    })
    
    const orders = await t.query(api.orders.getByEvent, {
      eventId: 'event123'
    })
    
    expect(orders).toHaveLength(1)
    expect(orders[0].tableNumber).toBe('5')
  })
})
```

#### E2E Test
```typescript
// e2e/order-flow.spec.ts
import { test, expect } from '@playwright/test'

test('complete order flow', async ({ page }) => {
  // Login as waiter
  await page.goto('/sign-in')
  await page.fill('[name="email"]', 'waiter@test.com')
  await page.fill('[name="password"]', 'password')
  await page.click('button[type="submit"]')
  
  // Create order
  await page.goto('/waiter/orders')
  await page.click('[data-testid="menu-item-1"]')
  await page.fill('[name="tableNumber"]', '5')
  await page.click('button:has-text("Submit Order")')
  
  // Verify success
  await expect(page.locator('.toast')).toContainText('Order created')
})
```
