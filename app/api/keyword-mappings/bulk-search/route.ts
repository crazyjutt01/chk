import { NextResponse } from "next/server"

// Comprehensive merchant mappings with fuzzy matching support
const MERCHANT_MAPPINGS = new Map([
  // Fuel & Transport (High Priority - Most Common)
  [
    "shell",
    {
      merchantName: "Shell",
      anzsicCode: "4613",
      atoCategory: "Vehicles, Travel & Transport",
      isDeductible: true,
      priority: 10,
    },
  ],
  [
    "bp",
    {
      merchantName: "BP",
      anzsicCode: "4613",
      atoCategory: "Vehicles, Travel & Transport",
      isDeductible: true,
      priority: 10,
    },
  ],
  [
    "caltex",
    {
      merchantName: "Caltex",
      anzsicCode: "4613",
      atoCategory: "Vehicles, Travel & Transport",
      isDeductible: true,
      priority: 10,
    },
  ],
  [
    "mobil",
    {
      merchantName: "Mobil",
      anzsicCode: "4613",
      atoCategory: "Vehicles, Travel & Transport",
      isDeductible: true,
      priority: 10,
    },
  ],
  [
    "7-eleven",
    {
      merchantName: "7-Eleven",
      anzsicCode: "4613",
      atoCategory: "Vehicles, Travel & Transport",
      isDeductible: true,
      priority: 9,
    },
  ],
  [
    "ampol",
    {
      merchantName: "Ampol",
      anzsicCode: "4613",
      atoCategory: "Vehicles, Travel & Transport",
      isDeductible: true,
      priority: 9,
    },
  ],
  [
    "liberty",
    {
      merchantName: "Liberty",
      anzsicCode: "4613",
      atoCategory: "Vehicles, Travel & Transport",
      isDeductible: true,
      priority: 8,
    },
  ],
  [
    "puma",
    {
      merchantName: "Puma Energy",
      anzsicCode: "4613",
      atoCategory: "Vehicles, Travel & Transport",
      isDeductible: true,
      priority: 8,
    },
  ],

  // Transport Services
  [
    "uber",
    {
      merchantName: "Uber",
      anzsicCode: "7220",
      atoCategory: "Vehicles, Travel & Transport",
      isDeductible: true,
      priority: 10,
    },
  ],
  [
    "taxi",
    {
      merchantName: "Taxi",
      anzsicCode: "7220",
      atoCategory: "Vehicles, Travel & Transport",
      isDeductible: true,
      priority: 9,
    },
  ],
  [
    "ola",
    {
      merchantName: "Ola",
      anzsicCode: "7220",
      atoCategory: "Vehicles, Travel & Transport",
      isDeductible: true,
      priority: 8,
    },
  ],
  [
    "cabcharge",
    {
      merchantName: "Cabcharge",
      anzsicCode: "7220",
      atoCategory: "Vehicles, Travel & Transport",
      isDeductible: true,
      priority: 8,
    },
  ],

  // Food & Dining (Work-Related)
  [
    "mcdonald",
    {
      merchantName: "McDonald's",
      anzsicCode: "5621",
      atoCategory: "Meals & Entertainment (Work-Related)",
      isDeductible: true,
      priority: 9,
    },
  ],
  [
    "kfc",
    {
      merchantName: "KFC",
      anzsicCode: "5621",
      atoCategory: "Meals & Entertainment (Work-Related)",
      isDeductible: true,
      priority: 9,
    },
  ],
  [
    "subway",
    {
      merchantName: "Subway",
      anzsicCode: "5621",
      atoCategory: "Meals & Entertainment (Work-Related)",
      isDeductible: true,
      priority: 8,
    },
  ],
  [
    "dominos",
    {
      merchantName: "Domino's",
      anzsicCode: "5621",
      atoCategory: "Meals & Entertainment (Work-Related)",
      isDeductible: true,
      priority: 8,
    },
  ],
  [
    "pizza hut",
    {
      merchantName: "Pizza Hut",
      anzsicCode: "5621",
      atoCategory: "Meals & Entertainment (Work-Related)",
      isDeductible: true,
      priority: 8,
    },
  ],
  [
    "hungry jack",
    {
      merchantName: "Hungry Jack's",
      anzsicCode: "5621",
      atoCategory: "Meals & Entertainment (Work-Related)",
      isDeductible: true,
      priority: 8,
    },
  ],
  [
    "red rooster",
    {
      merchantName: "Red Rooster",
      anzsicCode: "5621",
      atoCategory: "Meals & Entertainment (Work-Related)",
      isDeductible: true,
      priority: 7,
    },
  ],

  // Coffee & Cafes
  [
    "starbucks",
    {
      merchantName: "Starbucks",
      anzsicCode: "5621",
      atoCategory: "Meals & Entertainment (Work-Related)",
      isDeductible: true,
      priority: 9,
    },
  ],
  [
    "gloria jean",
    {
      merchantName: "Gloria Jean's",
      anzsicCode: "5621",
      atoCategory: "Meals & Entertainment (Work-Related)",
      isDeductible: true,
      priority: 8,
    },
  ],
  [
    "coffee club",
    {
      merchantName: "Coffee Club",
      anzsicCode: "5621",
      atoCategory: "Meals & Entertainment (Work-Related)",
      isDeductible: true,
      priority: 8,
    },
  ],
  [
    "cafe",
    {
      merchantName: "Cafe",
      anzsicCode: "5621",
      atoCategory: "Meals & Entertainment (Work-Related)",
      isDeductible: true,
      priority: 7,
    },
  ],

  // Hardware & Tools (High Deductibility)
  [
    "bunnings",
    {
      merchantName: "Bunnings",
      anzsicCode: "4521",
      atoCategory: "Equipment & Tools",
      isDeductible: true,
      priority: 10,
    },
  ],
  [
    "mitre 10",
    { merchantName: "Mitre 10", anzsicCode: "4521", atoCategory: "Equipment & Tools", isDeductible: true, priority: 9 },
  ],
  [
    "masters",
    { merchantName: "Masters", anzsicCode: "4521", atoCategory: "Equipment & Tools", isDeductible: true, priority: 8 },
  ],
  [
    "home depot",
    {
      merchantName: "Home Depot",
      anzsicCode: "4521",
      atoCategory: "Equipment & Tools",
      isDeductible: true,
      priority: 8,
    },
  ],

  // Electronics & Office
  [
    "officeworks",
    {
      merchantName: "Officeworks",
      anzsicCode: "4252",
      atoCategory: "Equipment & Tools",
      isDeductible: true,
      priority: 10,
    },
  ],
  [
    "jb hi-fi",
    { merchantName: "JB Hi-Fi", anzsicCode: "4252", atoCategory: "Equipment & Tools", isDeductible: true, priority: 9 },
  ],
  [
    "harvey norman",
    {
      merchantName: "Harvey Norman",
      anzsicCode: "4252",
      atoCategory: "Equipment & Tools",
      isDeductible: true,
      priority: 9,
    },
  ],
  [
    "dick smith",
    {
      merchantName: "Dick Smith",
      anzsicCode: "4252",
      atoCategory: "Equipment & Tools",
      isDeductible: true,
      priority: 8,
    },
  ],
  [
    "apple store",
    {
      merchantName: "Apple Store",
      anzsicCode: "4252",
      atoCategory: "Equipment & Tools",
      isDeductible: true,
      priority: 9,
    },
  ],

  // Telecommunications (Essential Services)
  [
    "telstra",
    { merchantName: "Telstra", anzsicCode: "5910", atoCategory: "Phone & Internet", isDeductible: true, priority: 10 },
  ],
  [
    "optus",
    { merchantName: "Optus", anzsicCode: "5910", atoCategory: "Phone & Internet", isDeductible: true, priority: 10 },
  ],
  [
    "vodafone",
    { merchantName: "Vodafone", anzsicCode: "5910", atoCategory: "Phone & Internet", isDeductible: true, priority: 10 },
  ],
  [
    "tpg",
    { merchantName: "TPG", anzsicCode: "5910", atoCategory: "Phone & Internet", isDeductible: true, priority: 9 },
  ],
  [
    "iinet",
    { merchantName: "iiNet", anzsicCode: "5910", atoCategory: "Phone & Internet", isDeductible: true, priority: 9 },
  ],
  [
    "belong",
    { merchantName: "Belong", anzsicCode: "5910", atoCategory: "Phone & Internet", isDeductible: true, priority: 8 },
  ],
  [
    "boost",
    {
      merchantName: "Boost Mobile",
      anzsicCode: "5910",
      atoCategory: "Phone & Internet",
      isDeductible: true,
      priority: 8,
    },
  ],

  // Banking & Financial Services
  ["atm", { merchantName: "ATM", anzsicCode: "6220", atoCategory: "Bank Fees", isDeductible: true, priority: 9 }],
  [
    "westpac",
    { merchantName: "Westpac", anzsicCode: "6220", atoCategory: "Bank Fees", isDeductible: true, priority: 9 },
  ],
  [
    "commonwealth",
    {
      merchantName: "Commonwealth Bank",
      anzsicCode: "6220",
      atoCategory: "Bank Fees",
      isDeductible: true,
      priority: 9,
    },
  ],
  ["anz", { merchantName: "ANZ", anzsicCode: "6220", atoCategory: "Bank Fees", isDeductible: true, priority: 9 }],
  ["nab", { merchantName: "NAB", anzsicCode: "6220", atoCategory: "Bank Fees", isDeductible: true, priority: 9 }],
  [
    "bendigo",
    { merchantName: "Bendigo Bank", anzsicCode: "6220", atoCategory: "Bank Fees", isDeductible: true, priority: 8 },
  ],

  // Supermarkets (Generally Non-Deductible)
  [
    "woolworths",
    { merchantName: "Woolworths", anzsicCode: "4711", atoCategory: "Other", isDeductible: false, priority: 10 },
  ],
  ["coles", { merchantName: "Coles", anzsicCode: "4711", atoCategory: "Other", isDeductible: false, priority: 10 }],
  ["iga", { merchantName: "IGA", anzsicCode: "4711", atoCategory: "Other", isDeductible: false, priority: 9 }],
  ["aldi", { merchantName: "ALDI", anzsicCode: "4711", atoCategory: "Other", isDeductible: false, priority: 9 }],
  [
    "foodworks",
    { merchantName: "Foodworks", anzsicCode: "4711", atoCategory: "Other", isDeductible: false, priority: 8 },
  ],
  ["spar", { merchantName: "SPAR", anzsicCode: "4711", atoCategory: "Other", isDeductible: false, priority: 8 }],

  // Retail (Generally Non-Deductible)
  ["target", { merchantName: "Target", anzsicCode: "4251", atoCategory: "Other", isDeductible: false, priority: 8 }],
  ["kmart", { merchantName: "Kmart", anzsicCode: "4251", atoCategory: "Other", isDeductible: false, priority: 8 }],
  ["big w", { merchantName: "Big W", anzsicCode: "4251", atoCategory: "Other", isDeductible: false, priority: 8 }],
  ["myer", { merchantName: "Myer", anzsicCode: "4251", atoCategory: "Other", isDeductible: false, priority: 7 }],
  [
    "david jones",
    { merchantName: "David Jones", anzsicCode: "4251", atoCategory: "Other", isDeductible: false, priority: 7 },
  ],
])

// Advanced fuzzy matching with Levenshtein distance
function levenshteinDistance(str1: string, str2: string): number {
  const matrix = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null))

  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator, // substitution
      )
    }
  }

  return matrix[str2.length][str1.length]
}

// Ultra-optimized matching with multiple strategies
function findBestMatch(description: string): {
  merchant: any
  matchScore: number
  matchType: string
} | null {
  const desc = description.toLowerCase().trim()
  const words = desc.split(/\s+/).filter((word) => word.length >= 3)

  let bestMatch: any = null
  let highestScore = 0
  let matchType = "none"

  // Strategy 1: Exact substring matching (highest priority)
  for (const [keyword, mapping] of MERCHANT_MAPPINGS) {
    if (desc.includes(keyword)) {
      const score = 95 + (mapping.priority || 5)
      if (score > highestScore) {
        bestMatch = {
          ...mapping,
          confidence: 95,
        }
        highestScore = score
        matchType = "exact"
      }
    }
  }

  // Strategy 2: Word-level matching
  if (!bestMatch) {
    for (const word of words) {
      for (const [keyword, mapping] of MERCHANT_MAPPINGS) {
        if (keyword.includes(word) || word.includes(keyword)) {
          const score = 80 + (mapping.priority || 5)
          if (score > highestScore) {
            bestMatch = {
              ...mapping,
              confidence: 80,
            }
            highestScore = score
            matchType = "word"
          }
        }
      }
    }
  }

  // Strategy 3: Fuzzy matching for typos and variations
  if (!bestMatch) {
    for (const [keyword, mapping] of MERCHANT_MAPPINGS) {
      const distance = levenshteinDistance(desc, keyword)
      const similarity = 1 - distance / Math.max(desc.length, keyword.length)

      if (similarity > 0.7) {
        // 70% similarity threshold
        const score = similarity * 70 + (mapping.priority || 5)
        if (score > highestScore) {
          bestMatch = {
            ...mapping,
            confidence: Math.round(similarity * 70),
          }
          highestScore = score
          matchType = "fuzzy"
        }
      }
    }
  }

  return bestMatch
    ? {
        merchant: bestMatch,
        matchScore: bestMatch.confidence,
        matchType,
      }
    : null
}

// Performance-optimized cache
const resultCache = new Map<string, { result: any; timestamp: number; hits: number }>()
const CACHE_TTL = 15 * 60 * 1000 // 15 minutes
const MAX_CACHE_SIZE = 1000

function getCachedResult(key: string): any {
  const cached = resultCache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    cached.hits++
    return cached.result
  }
  resultCache.delete(key)
  return null
}

function setCachedResult(key: string, result: any): void {
  // Evict old entries if cache is full
  if (resultCache.size >= MAX_CACHE_SIZE) {
    const entries = Array.from(resultCache.entries())
    entries.sort((a, b) => a[1].hits - b[1].hits) // Sort by hit count

    // Remove bottom 20%
    const toRemove = Math.floor(MAX_CACHE_SIZE * 0.2)
    for (let i = 0; i < toRemove; i++) {
      resultCache.delete(entries[i][0])
    }
  }

  resultCache.set(key, {
    result,
    timestamp: Date.now(),
    hits: 1,
  })
}

export async function POST(req: Request) {
  const startTime = Date.now()

  try {
    const { descriptions } = await req.json()

    if (!Array.isArray(descriptions)) {
      return NextResponse.json({ error: "Descriptions array is required" }, { status: 400 })
    }

    const results: Record<string, any> = {}
    let cacheHits = 0
    let exactMatches = 0
    let fuzzyMatches = 0
    let wordMatches = 0

    // Process all descriptions with optimized matching
    for (const description of descriptions) {
      const cacheKey = description.toLowerCase().trim()

      // Check cache first
      const cached = getCachedResult(cacheKey)
      if (cached) {
        results[description] = cached
        cacheHits++
        continue
      }

      // Find best match using multiple strategies
      const match = findBestMatch(description)

      if (match) {
        const result = {
          merchantName: match.merchant.merchantName,
          anzsicCode: match.merchant.anzsicCode,
          atoCategory: match.merchant.atoCategory,
          isDeductible: match.merchant.isDeductible,
          confidence: match.matchScore,
          matchType: match.matchType,
          source: "ultra-optimized-keyword",
        }

        results[description] = result
        setCachedResult(cacheKey, result)

        // Track match types
        switch (match.matchType) {
          case "exact":
            exactMatches++
            break
          case "fuzzy":
            fuzzyMatches++
            break
          case "word":
            wordMatches++
            break
        }
      } else {
        // No match found
        const fallback = {
          merchantName: "Unknown Merchant",
          anzsicCode: "9999",
          atoCategory: "Other",
          isDeductible: false,
          confidence: 0,
          matchType: "none",
          source: "fallback",
        }

        results[description] = fallback
        setCachedResult(cacheKey, fallback)
      }
    }

    const processingTime = Date.now() - startTime
    const deductibleCount = Object.values(results).filter((r: any) => r.isDeductible).length

    return NextResponse.json({
      success: true,
      results,
      stats: {
        totalProcessed: descriptions.length,
        cacheHits,
        exactMatches,
        wordMatches,
        fuzzyMatches,
        deductibleCount,
        processingTime: `${processingTime}ms`,
        averagePerDescription: `${(processingTime / descriptions.length).toFixed(2)}ms`,
        cacheHitRate: `${((cacheHits / descriptions.length) * 100).toFixed(1)}%`,
        source: "ultra-optimized-keyword-search",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Search failed",
        results: {},
      },
      { status: 500 },
    )
  }
}

// Performance monitoring endpoint
export async function GET() {
  return NextResponse.json({
    cache: {
      size: resultCache.size,
      totalHits: Array.from(resultCache.values()).reduce((sum, entry) => sum + entry.hits, 0),
    },
    mappings: MERCHANT_MAPPINGS.size,
  })
}
