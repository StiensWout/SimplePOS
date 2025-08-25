# Unified Project Structure

```
SimplePOS/
├── .github/                    # CI/CD workflows
│   └── workflows/
│       ├── ci.yaml            # Testing and linting
│       └── deploy.yaml        # Production deployment
├── simple-pos/                 # Main application
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Authentication routes
│   │   ├── (dashboard)/      # Main app routes
│   │   ├── api/              # API routes
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Landing page
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── features/         # Feature components
│   │   └── layouts/          # Layout components
│   ├── convex/               # Backend functions
│   │   ├── _generated/       # Auto-generated
│   │   ├── auth/             # Authentication
│   │   ├── organizations/    # Org management
│   │   ├── events/           # Event management
│   │   ├── menuItems/        # Menu management
│   │   ├── orders/           # Order processing
│   │   ├── lib/              # Utilities
│   │   └── schema.ts         # Database schema
│   ├── hooks/                # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-orders.ts
│   │   └── use-organization.ts
│   ├── lib/                  # Utilities
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── validators.ts
│   ├── public/               # Static assets
│   ├── .env.example          # Environment template
│   ├── .env.local            # Local environment
│   ├── next.config.js        # Next.js config
│   ├── package.json          # Dependencies
│   ├── tailwind.config.ts    # Tailwind config
│   └── tsconfig.json         # TypeScript config
├── docs/                      # Documentation
│   ├── prd.md               # Product requirements
│   ├── architecture.md      # This document
│   └── api-docs.md          # API documentation
├── scripts/                   # Build/deploy scripts
│   ├── setup.sh             # Initial setup
│   └── seed.ts              # Database seeding
└── README.md                 # Project overview
```
