import { NextResponse } from "next/server";
import { merchantModel } from "@/lib/models/merchant";
import { anzsicMappingModel } from "@/lib/models/anzsic-mapping";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type?: "debit" | "credit";
  balance?: number;
  category?: string;
}

interface ProcessedTransaction extends Transaction {
  merchantName: string;
  anzsicCode: string;
  anzsicDescription: string;
  atoCategory: string;
  isDeductible: boolean;
  confidence: number;
}

// Helper function to determine transaction type based on amount and description
function determineTransactionType(
  amount: number,
  description: string
): "credit" | "debit" {
  // Primary logic: use amount sign
  if (amount > 0) {
    return "credit"; // Positive amounts are credits (income/deposits)
  } else {
    return "debit"; // Negative amounts are debits (expenses/withdrawals)
  }
}

// Helper function to normalize transaction amounts and set types
function normalizeTransaction(transaction: Transaction): Transaction {
  const rawAmount = transaction.amount;
  const description = transaction.description || "";

  // Determine type based on amount sign
  const type = determineTransactionType(rawAmount, description);

  // Normalize amount based on type for consistency
  let normalizedAmount: number;
  if (type === "credit") {
    normalizedAmount = Math.abs(rawAmount); // Credits should be positive
  } else {
    normalizedAmount = -Math.abs(rawAmount); // Debits should be negative
  }

  return {
    ...transaction,
    amount: normalizedAmount,
    type,
  };
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const bank = formData.get("bank") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!bank) {
      return NextResponse.json({ error: "No bank specified" }, { status: 400 });
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "File must be a PDF" },
        { status: 400 }
      );
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 }
      );
    }

    const dataBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(dataBuffer);

    let transactions: Transaction[] = [];

    const bankLower = bank.toLowerCase();

    if (["westpac", "amex", "anz", "cba", "nab"].includes(bankLower)) {
      const { randomUUID } = await import("crypto");
      const { spawn } = await import("child_process");
      const { promises: fs } = await import("fs");
      const path = await import("path");

      const tmpFile = path.join("/tmp", `${randomUUID()}.pdf`);
      await fs.writeFile(tmpFile, buffer);

      let scriptPath = `./app/api/parsers/parse_pdf_${bankLower}.py`;
      let stdout = "";
      let stderr = "";

      const runPython = async (script: string) => {
        const process = spawn("python", [script, tmpFile]);

        stdout = "";
        stderr = "";

        process.stdout.on("data", (data) => {
          stdout += data.toString();
        });
        process.stderr.on("data", (data) => {
          stderr += data.toString();
        });

        const exitCode = await new Promise<number>((resolve) => {
          process.on("close", resolve);
        });

        return { exitCode, stdout, stderr };
      };

      // Run primary script
      let { exitCode } = await runPython(scriptPath);

      // For westpac, fallback if no transactions
      if (bankLower === "westpac") {
        const parsed = JSON.parse(stdout || "[]");
        if (parsed.length === 0) {
          console.log(
            "Primary Westpac script returned no transactions, trying fallback..."
          );
          scriptPath = "./app/api/parsers/parse_pdf_westpac_credit_card.py";
          ({ exitCode } = await runPython(scriptPath));
        }
      }

      await fs.unlink(tmpFile);

      if (exitCode !== 0) {
        console.error(`Python error for ${bank}:`, stderr);
        return NextResponse.json(
          { success: false, error: stderr || "Python process failed" },
          { status: 500 }
        );
      }

      transactions = JSON.parse(stdout);
    } else {
      const pdfParse = (await import("pdf-parse")).default;
      const pdfData = await pdfParse(buffer, {
        max: 0,
        normalizeWhitespace: false,
        disableCombineTextItems: false,
      });

      const fullText = pdfData.text;

      switch (bankLower) {
        case "amex":
          ({ transactions } = parseAmexOptimized(fullText));
          break;
        case "anz":
          ({ transactions } = parseAnzOptimized(fullText));
          break;
        case "cba":
          ({ transactions } = parseCbaOptimized(fullText));
          break;
        default:
          return NextResponse.json(
            { error: `No parser available for bank: ${bank}` },
            { status: 400 }
          );
      }
    }

    console.log(`🚀 Processing ${transactions.length} transactions...`);
    const startTime = Date.now();

    // Normalize transactions and set types based on amount sign
    const normalizedTransactions = transactions.map(normalizeTransaction);

    // Filter out any transactions with "balance" and process
    const processedTransactions: ProcessedTransaction[] = normalizedTransactions
      .filter((t) => !(t.description || "").toLowerCase().includes("balance"))
      .map((transaction) => {
        const merchantResult = merchantModel.extractFromDescription(
          transaction.description || "Unknown"
        );
        const anzsicMapping = anzsicMappingModel.findByCode(
          merchantResult.anzsicCode
        );

        return {
          ...transaction,
          merchantName: merchantResult.merchantName,
          anzsicCode: merchantResult.anzsicCode,
          anzsicDescription: anzsicMapping?.anzsicDescription || "Unknown",
          atoCategory: anzsicMapping?.atoCategory || "Other",
          isDeductible: anzsicMapping?.isDeductible || false,
          confidence: merchantResult.confidence,
        };
      });

    const processingTime = Date.now() - startTime;
    const deductibleTransactions = processedTransactions.filter(
      (t) => t.isDeductible
    );
    const totalDeductibleAmount = deductibleTransactions.reduce(
      (sum, t) => sum + Math.abs(t.amount),
      0
    );

    // Log transaction type distribution for debugging
    const creditCount = processedTransactions.filter(
      (t) => t.type === "credit"
    ).length;
    const debitCount = processedTransactions.filter(
      (t) => t.type === "debit"
    ).length;

    console.log("🟢 Transaction type distribution:", {
      total: processedTransactions.length,
      credits: creditCount,
      debits: debitCount,
      sample: processedTransactions.slice(0, 3).map((t) => ({
        description: t.description,
        amount: t.amount,
        type: t.type,
      })),
    });

    return NextResponse.json(
      {
        success: true,
        bank: bank.toUpperCase(),
        transactionCount: transactions.length,
        transactions: processedTransactions,
        summary: {
          totalTransactions: transactions.length,
          deductibleTransactions: deductibleTransactions.length,
          totalDeductibleAmount: Math.round(totalDeductibleAmount * 100) / 100,
          processingTimeMs: processingTime,
          unknownMerchants: processedTransactions.filter(
            (t) => t.anzsicCode === "9999"
          ).length,
          transactionTypes: {
            credits: creditCount,
            debits: debitCount,
          },
        },
        metadata: {
          processingDate: new Date().toISOString(),
          fileName: file.name,
          fileSize: file.size,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        success: false,
        error: (err as Error).message,
        stack:
          process.env.NODE_ENV === "development"
            ? (err as Error).stack
            : undefined,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const merchantStats = await merchantModel.getStats();
  const anzsicStats = await anzsicMappingModel.getStats();

  return NextResponse.json(
    {
      message: "PDF Parser API is working",
      timestamp: new Date().toISOString(),
      methods: ["GET", "POST"],
      status: "ready",
      supportedBanks: ["amex", "anz", "cba", "westpac", "nab"],
      dataStats: {
        merchants: merchantStats.totalMerchants,
        anzsicMappings: anzsicStats.totalMappings,
        dataSource: "flat-files",
      },
      usage: {
        endpoint: "/api/process-pdf",
        method: "POST",
        contentType: "multipart/form-data",
        fields: {
          file: "PDF file",
          bank: "amex|anz|cba|westpac|nab",
        },
      },
    },
    { status: 200 }
  );
}

// Placeholder functions - you'll need to implement these if they don't exist
function parseAmexOptimized(text: string): { transactions: Transaction[] } {
  // Your existing AMEX parsing logic
  return { transactions: [] };
}

function parseAnzOptimized(text: string): { transactions: Transaction[] } {
  // Your existing ANZ parsing logic
  return { transactions: [] };
}

function parseCbaOptimized(text: string): { transactions: Transaction[] } {
  // Your existing CBA parsing logic
  return { transactions: [] };
}
