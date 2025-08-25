# Project Brief: Simple POS

## Executive Summary

Simple POS is a free, web-based point-of-sale system designed specifically for small local organizations running events. The system enables volunteers to efficiently manage food and drink sales through mobile devices, eliminating paper-based chaos while providing real-time kitchen communication and transparent financial reporting.

**Primary Problem:** Local organizations struggle with unprofessional, error-prone cash handling at events using paper tickets and manual tracking, leading to long customer wait times, kitchen confusion, and difficult financial reconciliation.

**Target Market:** Small local organizations (churches, schools, sports clubs, community centers) that run periodic fundraising or social events with volunteer staff.

**Key Value Proposition:** Transform chaotic volunteer-run event operations into smooth, professional experiences through extreme simplicity, mobile-first design, and real-time order flow from table to kitchen—all without licensing costs or hardware requirements.

## Problem Statement

Local organizations running events face significant operational challenges that impact both volunteer efficiency and attendee experience:

**Current State:** Organizations rely on paper order tickets, manual price calculations, and cash boxes. Volunteers struggle with handwritten orders, runners physically carry tickets to the kitchen, and treasurers spend hours reconciling cash after events. The lack of professional systems makes organizations appear disorganized and creates stress for volunteers who fear making mistakes.

**Impact:** Based on typical community events:
- 20-30% longer wait times due to manual order processing
- 5-10% revenue loss from calculation errors and missed orders
- 2-3 hours of post-event reconciliation work
- High volunteer stress leading to recruitment challenges
- Poor customer experience reflecting negatively on the organization

**Why Existing Solutions Fall Short:**
- Traditional POS systems are too expensive for occasional use
- Complex interfaces require extensive training for rotating volunteers
- Hardware dependencies (registers, printers) create setup barriers
- Feature overload designed for retail/restaurant professionals

**Urgency:** As community events become more important for local fundraising and social connection post-pandemic, organizations need professional tools that match their volunteer-driven operational model.

## Proposed Solution

Simple POS reimagines event point-of-sale through a volunteer-first, web-only approach that prioritizes simplicity without sacrificing professionalism.

**Core Concept:** A browser-based POS system where volunteers use their own phones to take orders tableside, orders flow instantly to kitchen display screens, and all data syncs in real-time to a central system—no apps, no hardware, no complexity.

**Key Differentiators:**
- **Zero Hardware Requirements:** Runs entirely in web browsers on existing devices
- **Role-Based Simplicity:** Different interfaces for different volunteers (waiter, kitchen, cashier, admin)
- **Real-Time Order Flow:** Orders go directly from table to kitchen displays
- **Table Management:** Track orders by table with QR codes for customer status viewing
- **Instant Onboarding:** Volunteers productive in under 2 minutes

**Why This Solution Will Succeed:**
- Designed specifically for volunteer operations, not adapted from commercial systems
- Mobile-first approach leverages devices volunteers already carry
- Free model (sponsored) removes budget barriers
- Cloud-based architecture enables instant deployment

**High-Level Vision:** Become the default POS solution for community organizations, enabling them to run professional events that strengthen community bonds while raising funds effectively.

## Target Users

### Primary User Segment: Event Volunteers

**Profile:**
- Age: 16-70 years old
- Tech skill: Basic smartphone users
- Availability: 2-4 hours per event
- Motivation: Supporting their community organization

**Current Behaviors:**
- Use paper order pads and manual calculations
- Physically run orders to kitchen
- Handle cash with manual change calculation
- Often work only 1-2 events per year

**Specific Needs:**
- Foolproof interface that prevents errors
- Clear visual feedback for every action
- Minimal buttons and options
- Ability to quickly fix mistakes

**Goals:**
- Complete transactions without errors
- Avoid holding up lines
- Feel confident helping their organization
- Minimize stress during busy periods

### Secondary User Segment: Event Organizers

**Profile:**
- Role: Volunteer coordinators, committee chairs
- Experience: Organizing 4-12 events annually
- Tech skill: Comfortable with basic software
- Pain tolerance: Low for complex systems

**Current Behaviors:**
- Create paper menus and price lists
- Train volunteers individually before events
- Manually count cash and reconcile sales
- Use spreadsheets for basic tracking

**Specific Needs:**
- Quick event setup and configuration
- Real-time visibility into sales
- Simple volunteer onboarding
- Accurate financial reporting

**Goals:**
- Run smooth, professional events
- Minimize volunteer training time
- Provide accurate financial reports
- Reduce post-event administrative work

## Goals & Success Metrics

### Business Objectives
- Launch MVP with 3 pilot organizations within 2 months
- Achieve 90% volunteer satisfaction rating in first events
- Reduce average transaction time by 40% compared to paper methods
- Enable accurate financial reporting within 15 minutes of event end
- Support 10 local organizations within 6 months

### User Success Metrics
- Volunteers complete first transaction within 2 minutes of training
- Zero critical errors requiring organizer intervention per event
- 95% of orders successfully flow from entry to kitchen
- Customer wait time reduced by 30% or more
- 100% accurate daily financial reconciliation

### Key Performance Indicators (KPIs)
- **Time to First Transaction:** Target < 2 minutes for new volunteers
- **Order Accuracy Rate:** Target > 98% correct orders
- **System Uptime During Events:** Target 99.9% availability
- **Volunteer Error Rate:** Target < 1 error per 50 transactions
- **Financial Reconciliation Time:** Target < 15 minutes post-event

## MVP Scope

### Core Features (Must Have)
- **Basic Item Management:** Create menu items with names, categories (starters, mains, drinks), and prices
- **Order Entry Interface:** Add/remove items, see running total, complete transaction
- **Kitchen Display System:** Real-time order queue showing new orders, in-progress, and completed
- **Table Management:** Assign orders to table numbers for tracking
- **Payment Tracking:** Record cash vs. card payments separately
- **Role-Based Access:** Different interfaces for admin, waiter, kitchen, cashier roles
- **Data Export:** CSV export of all transactions for accounting

### Out of Scope for MVP
- QR code generation for tables
- Customer-facing order status screens
- Inventory management
- Receipt printing
- Card payment processing integration
- Multi-location support
- Historical analytics and reporting
- Offline mode functionality
- Custom branding/theming

### MVP Success Criteria

The MVP will be considered successful when a single organization can run a complete event using only Simple POS for order management, achieving:
- All volunteers able to use system with minimal training
- Orders flowing smoothly from tables to kitchen
- Accurate financial summary available immediately post-event
- No fallback to paper systems required

## Post-MVP Vision

### Phase 2 Features

Following successful MVP validation, the next priority features include:
- **QR Code Table Tracking:** Generate QR codes for each table allowing customers to view order status
- **Order Modifiers:** Add-ons and modifications (sauces, sides, special requests)
- **Enhanced Reporting:** Daily/event analytics with visual dashboards
- **Multi-Event Support:** Run multiple concurrent service points
- **Basic Inventory Tracking:** Stock level monitoring and alerts

### Long-term Vision

Over the next 1-2 years, Simple POS will evolve into a comprehensive event management platform:
- **Pre-Event Capabilities:** Online menu planning, volunteer scheduling, equipment checklists
- **Customer Engagement:** Pre-ordering for pickup, reservation system for seated events
- **Financial Integration:** Direct deposit of funds, automated treasurer reports
- **Community Features:** Shared menu templates, best practices library
- **Scale Support:** Multi-organization management for diocese/district coordination

### Expansion Opportunities

- **Adjacent Markets:** Food trucks, farmers markets, pop-up shops
- **Vertical Integration:** Volunteer hour tracking, donation management
- **Geographic Expansion:** Localization for international communities
- **Platform Services:** Payment processing partnership revenue
- **Enterprise Offering:** Paid tier for larger organizations with advanced needs

## Technical Considerations

### Platform Requirements

- **Target Platforms:** Modern web browsers (Chrome, Safari, Firefox, Edge)
- **Browser/OS Support:** Mobile browsers on iOS 14+ and Android 10+, Desktop browsers from 2020+
- **Performance Requirements:** 
  - Page load < 2 seconds on 4G connection
  - Order submission < 500ms response time
  - Support 30 concurrent users per event
  - Real-time updates < 1 second latency

### Technology Preferences

- **Frontend:** Next.js 14+ with TypeScript, shadcn/ui component library for consistent design
- **Backend:** Convex for real-time data sync and serverless backend
- **Database:** Convex's built-in database with real-time subscriptions
- **Authentication:** Clerk for user management and role-based access control
- **Hosting/Infrastructure:** Vercel for Next.js hosting, Convex cloud for backend

### Architecture Considerations

- **Repository Structure:** Monorepo with simple-pos subfolder containing full application
- **Service Architecture:** Serverless functions via Convex, real-time subscriptions for live updates
- **Integration Requirements:** 
  - CSV export capability
  - Future: Receipt printer protocols
  - Future: Payment terminal APIs
- **Security/Compliance:** 
  - No payment card data storage (PCI compliance not required for MVP)
  - Role-based access control via Clerk
  - Secure authentication for admin functions
  - Data isolation between organizations

## Constraints & Assumptions

### Constraints

- **Budget:** Zero monetary budget - development sponsored by local business
- **Timeline:** 2-week MVP development sprint, 2-month pilot program
- **Resources:** Single developer initially, volunteer testers from partner organizations
- **Technical:** 
  - Must work on limited bandwidth (event venue WiFi)
  - No ability to install software on user devices
  - Cannot require specific hardware

### Key Assumptions

- Organizations have basic internet connectivity at event venues
- Volunteers have access to smartphones with data plans
- 30 concurrent users is sufficient for target organization events
- Organizations prefer simplicity over feature completeness
- Free pricing (via sponsorship) is sustainable long-term
- Kitchen staff can view a tablet/laptop screen for orders

## Risks & Open Questions

### Key Risks

- **Internet Dependency:** System requires connectivity; venue WiFi failure would halt operations
- **Device Compatibility:** Older volunteer phones may have browser compatibility issues
- **User Adoption:** Volunteers resistant to technology may refuse to use system
- **Support Burden:** Free product may generate unsustainable support requests
- **Scope Creep:** Organizations requesting features that complicate the simple interface

### Open Questions

- How to handle offline scenarios when internet connectivity is lost?
- Should organizations be able to customize receipt formats?
- What level of menu customization is needed for different event types?
- How much historical data should be retained for organizations?
- Should there be limits on number of events or transactions?

### Areas Needing Further Research

- Optimal UI patterns for elderly volunteers with limited tech experience
- Receipt printer integration options that don't require drivers
- Legal requirements for financial record keeping by non-profits
- Competitive analysis of similar free/low-cost solutions
- User testing with actual volunteer demographics

## Appendices

### A. Research Summary

**From Brainstorming Session (2025-08-24):**
- Generated 76 ideas across multiple perspectives
- Identified mobile-to-kitchen ordering as killer feature
- Validated need for extreme simplicity
- Confirmed role-based interfaces as critical requirement
- Established that hardware elimination is key differentiator

### B. References

- Brainstorming Session Results: `/docs/brainstorming-session-results.md`
- Technical Stack Setup: `/simple-pos/` directory
- Next.js Documentation: https://nextjs.org/docs
- Convex Documentation: https://docs.convex.dev
- Clerk Documentation: https://clerk.com/docs
- shadcn/ui Components: https://ui.shadcn.com

## Next Steps

### Immediate Actions

1. Review and finalize this project brief with stakeholders
2. Set up development environment with Next.js, Convex, and Clerk
3. Create basic data schema for organizations, events, items, and orders
4. Design mobile-first UI mockups for order entry screen
5. Implement core order flow: entry → kitchen display → completion
6. Recruit 2-3 pilot organizations for testing
7. Schedule MVP demonstration with first pilot organization

### PM Handoff

This Project Brief provides the full context for Simple POS. Please start in 'PRD Generation Mode', review the brief thoroughly to work with the user to create the PRD section by section as the template indicates, asking for any necessary clarification or suggesting improvements.