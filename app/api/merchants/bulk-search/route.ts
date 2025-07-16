import { type NextRequest, NextResponse } from "next/server"
import { merchantModel } from "@/lib/models/merchant"
import { anzsicMappingModel } from "@/lib/models/anzsic-mapping";

interface TransactionToClassify {
  id: string
  description: string
  amount: number
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body || !Array.isArray(body.transactions)) {
      return NextResponse.json({ error: "Invalid request format. Expected { transactions: [...] }" }, { status: 400 })
    }

    const transactions = body.transactions

    if (transactions.length === 0) {
      return NextResponse.json({
        success: true,
        results: [],
        merchantStats: { deductibleMerchants: 0, processingTime: "0ms" },
      })
    }

    // Validate transaction format
    for (const t of transactions) {
      if (!t.id || !t.description) {
        return NextResponse.json(
          { error: "Invalid transaction format. Each transaction must have id and description" },
          { status: 400 },
        )
      }
    }

    const startTime = Date.now()

    // Process all transactions using flat file lookups only
    const results = transactions.map((transaction: TransactionToClassify) => {
      // Step 1: Extract merchant and get ANZSIC code from merchant table
      const { merchantName, anzsicCode } = merchantModel.extractFromDescription(transaction.description)

      // Step 2: LEFT JOIN with ANZSIC table to get category info
      const anzsicMapping = anzsicMappingModel.findByCode(anzsicCode)

      return {
        id: transaction.id,
        merchantName,
        anzsicCode,
        atoCategory: anzsicMapping?.atoCategory || "Other",
        isDeductible: anzsicMapping?.isDeductible || false,
        confidence: anzsicCode === "9999" ? 30 : 85,
      }
    })

    const processingTime = Date.now() - startTime
    const deductibleMerchants = results.filter((r) => r.isDeductible).length

    return NextResponse.json({
      success: true,
      results,
      merchantStats: {
        deductibleMerchants,
        processingTime: `${processingTime}ms`,
        transactionsProcessed: results.length,
        dataSource: "flat-files-only",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Processing failed",
        results: [],
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  const merchantStats = merchantModel.getStats()
  const anzsicStats = anzsicMappingModel.getStats()

  return NextResponse.json({
    status: "operational",
    merchants: merchantStats.totalMerchants,
    anzsicMappings: anzsicStats.totalMappings,
    dataSource: "flat-files-only",
  })
}
