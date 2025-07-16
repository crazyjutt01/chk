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
  westpac: {
    datePattern: /^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{2})/,
    amountPattern: /(\d[\d,]*\.\d{2})\s*(-?)$/
  }
};

const MONTH_MAP: Record<string, string> = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12"
};

function parseWestpacOptimized(text: string): { transactions: Transaction[]; accountInfo: any } {
  const transactions: Transaction[] = [];
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const { datePattern, amountPattern } = COMPILED_PATTERNS.westpac;

  for (const line of lines) {
    const dateMatch = datePattern.exec(line);
    if (dateMatch) {
      const day = dateMatch[1].padStart(2, "0");
      const month = MONTH_MAP[dateMatch[2]];
      const year = `20${dateMatch[3]}`;
      const dateStr = `${year}-${month}-${day}`;

      const amountMatch = amountPattern.exec(line);
      if (amountMatch) {
        const amountStr = amountMatch[1].replace(/,/g, "");
        const isCredit = amountMatch[2] === "-";
        const amount = parseFloat(amountStr);
        const signedAmount = isCredit ? -amount : amount;

        transactions.push({
          id: uuidv4(),
          date: dateStr,
          description: "Transaction", // You can enhance this later
          amount: signedAmount,
          type: isCredit ? "credit" : "debit"
        });
      }
    }
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

    const { transactions, accountInfo } = parseWestpacOptimized(fullText);

    const startTime = Date.now();

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
        bank: "WESTPAC",
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
        rawTextPreview: fullText.slice(0, 1000) + (fullText.length > 1000 ? "..." : ""),
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
      message: "Westpac PDF parser ready.",
      timestamp: new Date().toISOString(),
      methods: ["GET", "POST"],
      status: "ready",
      supportedBanks: ["westpac"],
      usage: {
        endpoint: "/api/parse-westpac",
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
