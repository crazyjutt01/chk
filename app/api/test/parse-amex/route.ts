import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import pdfParse from "pdf-parse";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type?: "debit" | "credit";
}

interface ProcessedTransaction extends Transaction {
  merchantName: string;
  anzsicCode: string;
  anzsicDescription: string;
  atoCategory: string;
  isDeductible: boolean;
  confidence: number;
}

const COMPILED_PATTERNS = {
  amex: {
    datePattern:
      /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:,)?(?:\s+\d{4})?$/,
    amountPattern: /^-?\d+\.\d{2}$/
  }
};

const MONTH_MAP: Record<string, string> = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12"
};

function parseAmexOptimized(text: string): { transactions: Transaction[]; accountInfo: any } {
  const transactions: Transaction[] = [];

  const lines = text
    .split(/\r?\n|\s{2,}/) // Split on newlines OR 2+ spaces
    .map((line) => line.trim())
    .filter(Boolean);

  const { datePattern, amountPattern } = COMPILED_PATTERNS.amex;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const dateMatch = datePattern.exec(line);

    if (dateMatch) {
      const monthName = dateMatch[1];
      const day = dateMatch[2].padStart(2, "0");
      const dateStr = `2025-${MONTH_MAP[monthName]}-${day}`;

      i++;
      if (i >= lines.length) break;

      const description = lines[i];
      let amount = 0;

      const maxLookahead = Math.min(3, lines.length - i - 1);
      for (let j = 1; j <= maxLookahead; j++) {
        const amountCandidate = lines[i + j].replace(/,/g, "");
        if (amountPattern.test(amountCandidate)) {
          amount = Math.abs(Number.parseFloat(amountCandidate));
          i += j;
          break;
        }
      }

      if (amount > 0) {
        transactions.push({
          id: uuidv4(),
          date: dateStr,
          description,
          amount,
          type: "debit"
        });
      }
    }
    i++;
  }

  return { transactions, accountInfo: {} };
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "File must be a PDF" }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be <10MB" }, { status: 400 });
    }

    const dataBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(dataBuffer);

    const pdfData = await pdfParse(buffer);
    const fullText = pdfData.text;

    const { transactions, accountInfo } = parseAmexOptimized(fullText);

    const startTime = Date.now();

    // Build processed transactions with placeholder enrichment
    const processedTransactions: ProcessedTransaction[] = transactions.map((t) => ({
      ...t,
      merchantName: "Unknown",
      anzsicCode: "9999",
      anzsicDescription: "Unknown",
      atoCategory: "Other",
      isDeductible: false,
      confidence: 0
    }));

    const processingTime = Date.now() - startTime;
    const deductibleTransactions = processedTransactions.filter((t) => t.isDeductible);
    const totalDeductibleAmount = deductibleTransactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);

    return NextResponse.json(
      {
        success: true,
        bank: "AMEX",
        pageCount: pdfData.numpages,
        transactionCount: transactions.length,
        accountInfo,
        transactions: processedTransactions,
        summary: {
          totalTransactions: transactions.length,
          deductibleTransactions: deductibleTransactions.length,
          totalDeductibleAmount: Math.round(totalDeductibleAmount * 100) / 100,
          processingTimeMs: processingTime,
          unknownMerchants: processedTransactions.length
        },
        rawTextPreview: fullText.substring(0, 1000) + (fullText.length > 1000 ? "..." : ""),
        metadata: {
          processingDate: new Date().toISOString(),
          fileName: file.name,
          textLength: fullText.length,
          fileSize: file.size
        }
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: (err as Error).message,
        stack: process.env.NODE_ENV === "development" ? (err as Error).stack : undefined,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      message: "AMEX PDF parser ready.",
      timestamp: new Date().toISOString(),
      methods: ["GET", "POST"],
      status: "ready",
      supportedBanks: ["amex"],
      usage: {
        endpoint: "/api/parse-amex",
        method: "POST",
        contentType: "multipart/form-data",
        fields: {
          file: "PDF file"
        }
      }
    },
    { status: 200 }
  );
}
