import { describe, it, expect, vi } from 'vitest'
import { GET } from '@/app/api/health/route'
import { NextResponse } from 'next/server'

// Mock NextResponse
vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((data, options) => ({
      json: async () => data,
      status: options?.status || 200,
    })),
  },
}))

describe('Health Check Endpoint', () => {
  it('should return 200 status with healthy response', async () => {
    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.status).toBe('healthy')
    expect(data.version).toBeDefined()
    expect(data.environment).toBeDefined()
    expect(data.timestamp).toBeDefined()
    expect(data.uptime).toBeDefined()
    expect(data.memory).toBeDefined()
  })

  it('should include memory usage information', async () => {
    const response = await GET()
    const data = await response.json()

    expect(data.memory).toHaveProperty('used')
    expect(data.memory).toHaveProperty('total')
    expect(typeof data.memory.used).toBe('number')
    expect(typeof data.memory.total).toBe('number')
  })

  it('should return ISO timestamp', async () => {
    const response = await GET()
    const data = await response.json()

    // Check if timestamp is valid ISO string
    const timestamp = new Date(data.timestamp)
    expect(timestamp.toISOString()).toBe(data.timestamp)
  })
})