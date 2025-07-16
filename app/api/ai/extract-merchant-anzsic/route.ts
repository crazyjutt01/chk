import { NextResponse } from "next/server"
import { merchantModel } from "@/lib/models/merchant"
import { anzsicMappingModel } from "@/lib/models/anzsic-mapping";

export async function POST(req: Request) {
  try {
    const { descriptions } = await req.json()

    if (!Array.isArray(descriptions)) {
      return NextResponse.json({ error: "Descriptions array is required" }, { status: 400 })
    }

    const results: Record<string, any> = {}
    const startTime = Date.now()

    // Process descriptions using flat file lookups only
    for (const description of descriptions) {
      // Step 1: Extract merchant and get ANZSIC code from merchant table
      const { merchantName, anzsicCode } = merchantModel.extractFromDescription(description)

      // Step 2: LEFT JOIN with ANZSIC table to get category info
      const anzsicMapping = anzsicMappingModel.findByCode(anzsicCode)

      results[description] = {
        merchantName,
        anzsicCode,
        anzsicDescription: anzsicMapping?.anzsicDescription || "Unknown",
        atoCategory: anzsicMapping?.atoCategory || "Other",
        isDeductible: anzsicMapping?.isDeductible || false,
        confidence: anzsicCode === "9999" ? 30 : 85,
        source: "flat-file",
      }
    }

    const processingTime = Date.now() - startTime
    const deductibleCount = Object.values(results).filter((r: any) => r.isDeductible).length

    return NextResponse.json({
      success: true,
      results,
      stats: {
        totalProcessed: descriptions.length,
        deductibleCount,
        processingTime: `${processingTime}ms`,
        source: "flat-file-only",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Extraction failed",
        results: {},
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  const merchantStats = merchantModel.getStats()
  const anzsicStats = anzsicMappingModel.getStats()

  return NextResponse.json({
    merchants: merchantStats.totalMerchants,
    anzsicMappings: anzsicStats.totalMappings,
    status: "flat-file-ready",
    dataSource: "static-files-only",
  })
}
