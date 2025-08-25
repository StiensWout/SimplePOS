# Epic 1: Foundation & Core Order Flow

**Epic Goal**: Establish the complete technical foundation including project setup, authentication system, and core order flow from waiter entry to kitchen display with real-time updates. This epic delivers immediate value by enabling basic order processing while establishing the infrastructure for all future features.

### Story 1.1: Project Foundation and Infrastructure

**As a** developer,  
**I want** the complete project infrastructure with Next.js, Convex, Clerk, and UI components configured,  
**so that** the application has a solid foundation with authentication, real-time data, and consistent styling.

**Acceptance Criteria:**
1. Next.js 14+ application created with TypeScript configuration in simple-pos subfolder
2. Convex backend integrated with environment variables configured and dev/prod deployments set up
3. Clerk authentication configured with sign-up/sign-in flows and role claims for Admin, Waiter, Kitchen, Cashier
4. shadcn/ui components installed with base theme and Tailwind CSS configured for responsive design
5. Git repository initialized with proper .gitignore, ESLint, and Prettier configurations
6. Development and production environment variables properly separated and documented
7. README updated with setup instructions and local development guide
8. Vercel deployment configured with automatic deployments from main branch
9. Basic health check route working at /api/health returning 200 status

### Story 1.2: Role-Based Navigation and Layout

**As a** volunteer user,  
**I want** to select my role after login and see only the interface relevant to my responsibilities,  
**so that** I can focus on my specific tasks without confusion.

**Acceptance Criteria:**
1. Role selection screen displays after authentication with large, clear buttons for each role
2. Selected role persists for the session and determines available navigation options
3. Layout component renders role-specific navigation (Waiter: orders, Kitchen: display, Admin: settings)
4. Mobile-responsive layout with collapsible menu on small screens
5. Organization name/logo displayed in header when configured
6. Logout option available that clears role selection and returns to login
7. Role switching requires logout and re-selection for security
8. Visual indicator shows current role in header/navigation

### Story 1.3: Basic Order Entry Interface

**As a** waiter,  
**I want** to create orders by selecting items and quantities,  
**so that** I can quickly capture customer requests.

**Acceptance Criteria:**
1. Order entry screen displays hardcoded menu items in grid layout with clear names and prices
2. Tapping item adds it to current order with visual feedback (color change, animation)
3. Running total displays prominently and updates in real-time as items are added
4. Quantity adjustment buttons (+/-) available for each line item in order
5. Remove item button available to correct mistakes
6. Clear entire order option with confirmation prompt
7. Table number input field (numeric) required before order submission
8. Submit order button disabled until table number entered and at least one item selected
9. Order summary shows before final submission with edit capability

### Story 1.4: Real-Time Kitchen Display

**As a** kitchen staff member,  
**I want** to see new orders immediately and update their status,  
**so that** I can manage food preparation efficiently.

**Acceptance Criteria:**
1. Kitchen display shows all orders in three columns: New, In Progress, Completed
2. New orders appear within 1 second of waiter submission with sound/visual notification
3. Each order card shows table number, items with quantities, and elapsed time since creation
4. Click/tap on "New" order moves it to "In Progress" with timestamp
5. Click/tap on "In Progress" order moves it to "Completed" with timestamp
6. Completed orders remain visible for 10 minutes then auto-archive
7. Orders sorted by age within each column (oldest at top)
8. Visual distinction between categories (starters, mains, drinks) using colors or icons
9. Display auto-refreshes and maintains state even if connection temporarily lost

### Story 1.5: Order Persistence and Data Schema

**As a** system administrator,  
**I want** orders properly stored with complete information,  
**so that** data is preserved and can be retrieved for reconciliation.

**Acceptance Criteria:**
1. Convex schema defined for organizations, events, menuItems, orders, and orderItems
2. Orders include: ID, organizationId, eventId, tableNumber, status, createdAt, updatedAt timestamps
3. Order items store: menuItemId, quantity, price at time of order, special instructions (empty for now)
4. Status transitions logged with timestamps and user who made the change
5. All prices stored as integers (cents) to avoid floating-point errors
6. Soft delete implemented for orders (never hard delete for audit trail)
7. Database indexes created for common queries (orders by event, orders by status)
8. Real-time subscriptions working for order status changes across all clients
