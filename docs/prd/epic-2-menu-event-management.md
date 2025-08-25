# Epic 2: Menu & Event Management

**Epic Goal**: Enable administrators to fully configure their organization, create and manage events, build custom menus with categories and pricing, and control the event lifecycle. This epic transforms the hardcoded MVP into a configurable system ready for multiple organizations.

### Story 2.1: Organization Setup and Management

**As an** administrator,  
**I want** to configure my organization's details and manage access,  
**so that** the system is customized for our specific needs.

**Acceptance Criteria:**
1. Organization setup form captures: name, logo upload (optional), timezone, currency symbol
2. Organization settings persisted and associated with admin user account
3. Admin can invite other users via email with role pre-selection
4. Invited users join organization automatically upon first login
5. Admin can view list of all users with their assigned roles
6. Admin can remove users or change their roles (except cannot remove self)
7. Organization data isolated - users cannot see other organizations' data
8. Maximum file size of 2MB enforced for logo uploads with image format validation

### Story 2.2: Event Creation and Lifecycle

**As an** administrator,  
**I want** to create events and control when they are active,  
**so that** the system is ready for our specific event dates and times.

**Acceptance Criteria:**
1. Create event form captures: name, date, start time, end time, description (optional)
2. Event list shows all events with status badges (Upcoming, Active, Completed)
3. Admin can manually start event (changes status to Active) making it available for orders
4. Admin can end event (changes status to Completed) preventing new orders
5. Only one event can be active at a time per organization
6. Automatic event activation if current time matches start time (optional setting)
7. Warning prompt when ending event with open orders (in "New" or "In Progress" status)
8. Event selection required for waiters/kitchen when multiple events exist
9. Completed events remain in list for historical reference but clearly marked

### Story 2.3: Menu Item Management

**As an** administrator,  
**I want** to create and organize menu items with categories and prices,  
**so that** waiters can select from our actual menu instead of hardcoded items.

**Acceptance Criteria:**
1. Menu item form captures: name, category (starter/main/drink/dessert), price, description (optional)
2. Price input validates for positive numbers with two decimal places
3. Menu items list grouped by category with expand/collapse sections
4. Edit existing items with changes reflected immediately in order entry
5. Soft delete items (hidden from new orders but preserved in historical orders)
6. Bulk import from CSV with template download and validation feedback
7. Menu items can be marked as "unavailable" temporarily without deletion
8. Sort items within category by name or manually ordered with drag-and-drop
9. Price changes don't affect already-submitted orders (price captured at order time)

### Story 2.4: Menu Templates and Duplication

**As an** administrator,  
**I want** to save menu configurations and reuse them across events,  
**so that** I don't have to recreate common menus for recurring events.

**Acceptance Criteria:**
1. Save current menu as template with custom name
2. Template list shows all saved templates with item counts and last used date
3. Apply template to current event replaces all existing items (with confirmation)
4. Clone template to create variation without affecting original
5. Delete unused templates with confirmation prompt
6. Templates store all item details including categories, prices, and availability
7. "Quick setup" option with pre-built templates (BBQ, Breakfast, Drinks Only, etc.)
8. Preview template items before applying to current event

### Story 2.5: Dynamic Menu Display Integration

**As a** waiter,  
**I want** the order entry screen to show the actual configured menu items,  
**so that** I can create orders with the correct items and current prices.

**Acceptance Criteria:**
1. Order entry fetches menu items for current active event
2. Categories display as tabs or sections based on screen size
3. Unavailable items shown but disabled with visual indication
4. Prices display in organization's configured currency format
5. Menu updates reflect within 2 seconds when admin makes changes
6. Empty state message when no items configured directing to contact admin
7. Search/filter box for quick item lookup on large menus (>20 items)
8. Recent/popular items section for faster access (based on order history)
