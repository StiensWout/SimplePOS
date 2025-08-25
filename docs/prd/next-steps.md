# Next Steps

### UX Expert Prompt

Review the SimplePOS PRD and create comprehensive UX/UI designs for this volunteer-first point-of-sale system. Focus on mobile-first interfaces with extreme simplicity for users aged 16-70 with varying tech skills. Prioritize large touch targets, clear visual feedback, and role-specific workflows that prevent errors. Design must support single-thumb operation and enable first transaction within 2 minutes.

### Architect Prompt

Create the technical architecture for SimplePOS using the PRD specifications. Build on Next.js 14+, Convex, Clerk, and shadcn/ui stack. Design for serverless deployment supporting 30 concurrent users with sub-second real-time updates. Focus on implementing the three epics sequentially: Foundation & Core Order Flow, Menu & Event Management, and Complete Transaction Workflow. Ensure data isolation between organizations and maintain audit trails for financial compliance.