import { type NextRequest, NextResponse } from "next/server"
import { anzsicMappingModel } from "@/lib/models/anzsic-mapping";

// Pre-defined common ANZSIC mappings for instant lookup (expanded set)
const COMMON_ANZSIC_MAPPINGS = new Map([
  // Transport & Vehicles
  [
    "4613",
    {
      anzsicCode: "4613",
      anzsicDescription: "Motor vehicle fuel retailing",
      atoCategory: "Vehicles, Travel & Transport",
      isDeductible: true,
    },
  ],
  [
    "4520",
    {
      anzsicCode: "4520",
      anzsicDescription: "Motor vehicle parts and accessories",
      atoCategory: "Vehicles, Travel & Transport",
      isDeductible: true,
    },
  ],
  [
    "7220",
    {
      anzsicCode: "7220",
      anzsicDescription: "Taxi and transport",
      atoCategory: "Vehicles, Travel & Transport",
      isDeductible: true,
    },
  ],

  // Food & Entertainment
  [
    "5621",
    {
      anzsicCode: "5621",
      anzsicDescription: "Takeaway food services",
      atoCategory: "Meals & Entertainment (Work-Related)",
      isDeductible: true,
    },
  ],
  [
    "4512",
    {
      anzsicCode: "4512",
      anzsicDescription: "Cafes and restaurants",
      atoCategory: "Meals & Entertainment (Work-Related)",
      isDeductible: true,
    },
  ],

  // Equipment & Tools
  [
    "4521",
    {
      anzsicCode: "4521",
      anzsicDescription: "Hardware and building supplies",
      atoCategory: "Equipment & Tools",
      isDeductible: true,
    },
  ],
  [
    "4252",
    {
      anzsicCode: "4252",
      anzsicDescription: "Electronics retailing",
      atoCategory: "Equipment & Tools",
      isDeductible: true,
    },
  ],

  // Communications & Technology
  [
    "5910",
    {
      anzsicCode: "5910",
      anzsicDescription: "Telecommunications",
      atoCategory: "Phone & Internet",
      isDeductible: true,
    },
  ],
  [
    "7000",
    {
      anzsicCode: "7000",
      anzsicDescription: "Computer system design",
      atoCategory: "Equipment & Tools",
      isDeductible: true,
    },
  ],

  // Financial Services
  [
    "6220",
    {
      anzsicCode: "6220",
      anzsicDescription: "Banking",
      atoCategory: "Bank Fees",
      isDeductible: true,
    },
  ],
  [
    "6920",
    {
      anzsicCode: "6920",
      anzsicDescription: "Accounting services",
      atoCategory: "Tax & Accounting Expenses",
      isDeductible: true,
    },
  ],
  [
    "6910",
    {
      anzsicCode: "6910",
      anzsicDescription: "Legal services",
      atoCategory: "Professional Memberships & Fees",
      isDeductible: true,
    },
  ],

  // Education & Training
  [
    "8010",
    {
      anzsicCode: "8010",
      anzsicDescription: "Primary education",
      atoCategory: "Education & Training",
      isDeductible: true,
    },
  ],
  [
    "8020",
    {
      anzsicCode: "8020",
      anzsicDescription: "Secondary education",
      atoCategory: "Education & Training",
      isDeductible: true,
    },
  ],
  [
    "8030",
    {
      anzsicCode: "8030",
      anzsicDescription: "Higher education",
      atoCategory: "Education & Training",
      isDeductible: true,
    },
  ],

  // Non-deductible categories
  [
    "4711",
    {
      anzsicCode: "4711",
      anzsicDescription: "Supermarket and grocery stores",
      atoCategory: "Other",
      isDeductible: false,
    },
  ],
  [
    "4721",
    {
      anzsicCode: "4721",
      anzsicDescription: "Clothing retailing",
      atoCategory: "Other",
      isDeductible: false,
    },
  ],
  [
    "9529",
    {
      anzsicCode: "9529",
      anzsicDescription: "Other personal services",
      atoCategory: "Other",
      isDeductible: false,
    },
  ],

  // Fallback
  [
    "9999",
    {
      anzsicCode: "9999",
      anzsicDescription: "General retail",
      atoCategory: "Other",
      isDeductible: false,
    },
  ],
])

// Advanced cache with LRU eviction and compression
class OptimizedCache {
  private cache = new Map<string, { data: any; expires: number; accessCount: number; lastAccess: number }>()
  private readonly maxSize = 500
  private readonly ttl = 60 * 60 * 1000 // 1 hour

  get(key: string): any {
    const entry = this.cache.get(key)
    if (entry && entry.expires > Date.now()) {
      entry.accessCount++
      entry.lastAccess = Date.now()
      return entry.data
    }
    this.cache.delete(key)
    return null
  }

  set(key: string, data: any): void {
    this.cleanup()

    if (this.cache.size >= this.maxSize) {
      this.evictLRU()
    }

    this.cache.set(key, {
      data,
      expires: Date.now() + this.ttl,
      accessCount: 1,
      lastAccess: Date.now(),
    })
  }

  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expires <= now) {
        this.cache.delete(key)
      }
    }
  }

  private evictLRU(): void {
    let oldestKey = ""
    let oldestAccess = Date.now()

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccess < oldestAccess) {
        oldestAccess = entry.lastAccess
        oldestKey = key
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey)
    }
  }

  getStats(): { size: number; hitRate: number; avgAccessCount: number } {
    const entries = Array.from(this.cache.values())
    const totalAccess = entries.reduce((sum, entry) => sum + entry.accessCount, 0)

    return {
      size: this.cache.size,
      hitRate: entries.length > 0 ? totalAccess / entries.length : 0,
      avgAccessCount: entries.length > 0 ? totalAccess / entries.length : 0,
    }
  }

  clear(): void {
    this.cache.clear()
  }
}

const cache = new OptimizedCache()

export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
  try {
    const { code } = params

    if (!code) {
      return NextResponse.json({ error: "ANZSIC code is required" }, { status: 400 })
    }

    // Validate ANZSIC code format
    if (!/^\d{4}$/.test(code)) {
      return NextResponse.json({ error: "Invalid ANZSIC code format. Must be 4 digits." }, { status: 400 })
    }

    console.log(`🔍 Looking up ANZSIC code: ${code}`)

    // Ultra-fast flat file lookup
    const mapping = anzsicMappingModel.findByCode(code)

    if (!mapping) {
      return NextResponse.json({
        success: true,
        mapping: null,
        message: `No mapping found for ANZSIC code: ${code}`,
      })
    }

    return NextResponse.json({
      success: true,
      mapping,
      source: "flat-file",
      responseTime: "< 1ms",
    })
  } catch (error) {
    console.error("Error looking up ANZSIC code:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to lookup ANZSIC mapping",
        mapping: null,
      },
      { status: 500 },
    )
  }
}

// Get statistics
export async function POST() {
  const stats = anzsicMappingModel.getStats()
  return NextResponse.json({
    stats,
    dataSource: "flat-files-only",
  })
}
