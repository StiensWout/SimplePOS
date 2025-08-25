# Error Handling Strategy

### Error Flow
```mermaid
sequenceDiagram
    participant UI as Frontend
    participant API as Convex API
    participant ERR as Error Handler
    participant LOG as Audit Log
    participant MON as Sentry
    
    UI->>API: Request
    API->>API: Process
    alt Success
        API-->>UI: Response
    else Business Error
        API->>LOG: Log error
        API-->>UI: ConvexError
        UI->>UI: Show toast
    else System Error
        API->>LOG: Log error
        API->>MON: Report to Sentry
        API-->>UI: Generic error
        UI->>ERR: Handle error
        ERR->>UI: Show error UI
    end
```

### Error Response Format
```typescript
interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
    requestId: string;
  };
}
```

### Frontend Error Handling
```typescript
// lib/error-handler.ts
export function handleError(error: unknown): string {
  if (error instanceof ConvexError) {
    return error.message
  }
  
  if (error instanceof Error) {
    Sentry.captureException(error)
    return "An unexpected error occurred"
  }
  
  return "Something went wrong"
}

// Component usage
try {
  await createOrder(data)
} catch (error) {
  toast({
    title: "Error",
    description: handleError(error),
    variant: "destructive"
  })
}
```

### Backend Error Handling
```typescript
// convex/lib/errors.ts
export class BusinessError extends ConvexError {
  constructor(message: string, public code: string) {
    super(message)
  }
}

export function withErrorHandling<T extends any[], R>(
  fn: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args)
    } catch (error) {
      // Log to audit
      await logError(error)
      
      // Report to Sentry if system error
      if (!(error instanceof ConvexError)) {
        Sentry.captureException(error)
      }
      
      throw error
    }
  }
}
```
