# Requirements

### Functional Requirements

**FR1:** The system shall provide role-based access with distinct interfaces for Admin, Waiter, Kitchen, and Cashier roles  
**FR2:** Waiters shall be able to create orders by selecting menu items, specifying quantities, and assigning table numbers  
**FR3:** The system shall display real-time order status progression (new → in-progress → completed) on kitchen screens  
**FR4:** Menu items shall support categorization (starters, mains, drinks) with configurable names and prices  
**FR5:** Orders shall track payment method (cash vs. card) for financial reconciliation  
**FR6:** The system shall calculate order totals automatically with real-time updates during item selection  
**FR7:** Kitchen staff shall be able to mark orders as in-progress and completed with visual status updates  
**FR8:** Administrators shall be able to export all transaction data to CSV format for accounting  
**FR9:** The system shall support concurrent use by at least 30 users per event  
**FR10:** Table management shall allow orders to be tracked and retrieved by table number  

### Non-Functional Requirements

**NFR1:** Page load time shall not exceed 2 seconds on 4G mobile connections  
**NFR2:** Order submission response time shall be under 500ms to maintain responsive feel  
**NFR3:** Real-time updates between devices shall have less than 1 second latency  
**NFR4:** The interface shall be accessible on mobile browsers (iOS 14+, Android 10+) without app installation  
**NFR5:** New volunteers shall complete their first transaction within 2 minutes of initial system exposure  
**NFR6:** The system shall maintain 99.9% uptime during active event periods  
**NFR7:** All financial calculations shall be accurate to two decimal places with proper rounding  
**NFR8:** The system shall isolate data between different organizations for security  
**NFR9:** Authentication shall be handled securely through Clerk with proper session management  
**NFR10:** The UI shall use consistent, large touch targets suitable for quick interaction on mobile devices  
