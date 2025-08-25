# Epic 3: Complete Transaction Workflow

**Epic Goal**: Implement comprehensive table management, payment tracking, order modifications, and financial reconciliation capabilities with data export. This epic completes the MVP by adding the financial controls and reporting needed for event operations and post-event accounting.

### Story 3.1: Table Management System

**As a** waiter,  
**I want** to manage orders by table and view their status,  
**so that** I can track multiple tables and provide service updates.

**Acceptance Criteria:**
1. Table view shows grid/list of active tables with order status
2. Tables display color coding: empty (gray), ordered (yellow), food ready (green), needs attention (red)
3. Tap table to view all orders associated with that table number
4. Combine multiple orders for same table into single payment view
5. Transfer orders between tables with confirmation
6. Clear table option once payment completed (archives orders)
7. Visual indicator for how long table has been waiting
8. Filter to show only "my tables" for specific waiter (optional user assignment)
9. Table status updates in real-time as kitchen updates order progress

### Story 3.2: Payment Processing and Tracking

**As a** cashier,  
**I want** to process payments and track cash versus card transactions,  
**so that** we can reconcile finances accurately at event end.

**Acceptance Criteria:**
1. Payment screen shows complete order details with itemized list and total
2. Payment method selection: Cash or Card (visual toggle buttons)
3. For cash payments: enter amount tendered, calculate and display change due
4. For card payments: mark as completed (no integration required for MVP)
5. Payment confirmation screen with large "Payment Complete" message
6. Orders marked as paid with payment method, amount, timestamp, and cashier ID
7. Prevent duplicate payments with warning if order already paid
8. Ability to split payment between cash and card with separate amounts
9. Void payment option (admin only) with reason required

### Story 3.3: Order Modifications and Cancellations

**As a** waiter,  
**I want** to modify or cancel orders before kitchen completion,  
**so that** I can handle customer changes and mistakes.

**Acceptance Criteria:**
1. Edit button available on orders in "New" status only
2. Modification screen allows adding/removing items and changing quantities
3. Order history tracks all modifications with timestamp and user
4. Cancel entire order option with required reason selection
5. Cancelled orders remain in system with "Cancelled" status for audit
6. Kitchen receives notification of modified/cancelled orders
7. Modifications blocked once order status changes to "In Progress"
8. Price recalculation happens automatically after modifications
9. Special instructions field available for each order (text input, 200 char limit)

### Story 3.4: Financial Reporting and Reconciliation

**As an** administrator,  
**I want** to view sales summaries and reconcile cash at event end,  
**so that** I can account for all transactions and prepare banking.

**Acceptance Criteria:**
1. Event summary dashboard shows: total sales, order count, average order value
2. Sales breakdown by payment method (cash vs card totals)
3. Sales breakdown by category (starters, mains, drinks totals)
4. Hourly sales chart showing peak periods
5. Cash reconciliation form: expected cash (from system) vs actual cash count
6. Discrepancy tracking with notes field for explanations
7. "Close event" process requires reconciliation completion
8. Summary printable/PDF format for physical records
9. Void/cancelled orders shown separately in reports

### Story 3.5: Data Export and Integration

**As an** administrator,  
**I want** to export transaction data in standard formats,  
**so that** I can import into accounting software and maintain records.

**Acceptance Criteria:**
1. Export all orders for an event to CSV format
2. CSV includes: order ID, timestamp, table, items, quantities, prices, payment method, status
3. Separate export for menu items with sales counts
4. Financial summary export with all reconciliation data
5. Date range filtering for exports (single event or date range)
6. Download happens client-side (no server-side file generation)
7. Excel-compatible formatting with proper headers and data types
8. Export audit log showing who exported what data and when
9. Bulk export option for all events in a given month/quarter
