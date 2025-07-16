import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import pdf from "pdf-parse";

// Helper to get Buffer from uploaded file
async function getFileBuffer(req: Request): Promise<Buffer> {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file || !(file instanceof Blob)) {
    throw new Error("File is missing or invalid");
  }
  return Buffer.from(await file.arrayBuffer());
}

export async function POST(req: Request) {
  const transactions: any[] = [];

  try {
    const rawData = await getFileBuffer(req);
    const data = await pdf(rawData);
    const text = data.text;

    const lineStartPattern = /^\s*(\d{1,2}\s+[A-Za-z]{3}\s+\d{2})\s+(.*)$/;
    const amountPattern = /([\d,]+\.\d{2})/g;

    const lines = text.split(/\r?\n/);

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const lineMatch = line.match(lineStartPattern);
  if (!lineMatch) continue;

  const dateStr = lineMatch[1];
  const restOfLine = lineMatch[2];

  const amountsFound = Array.from(restOfLine.matchAll(amountPattern));
  if (amountsFound.length === 0) continue;

  const amountStr = amountsFound[amountsFound.length - 1][1];
  const lastAmountPos = restOfLine.lastIndexOf(amountStr);
  let description = restOfLine.slice(0, lastAmountPos).trim();

  // If no description or it's just a number, try previous line
  if (!description || /^\d+(\.\d+)?$/.test(description)) {
    const prevLine = i > 0 ? lines[i - 1].trim() : "";

    const isFooterText =
      /mastercard|incorporated|qantas|disclaimer|credit|payment/i.test(prevLine);

    if (
      prevLine === "" ||
      /^\d+(\.\d+)?$/.test(prevLine) ||
      lineStartPattern.test(prevLine) ||
      isFooterText
    ) {
      description = "-";
    } else {
      description = prevLine;
    }
  }

  let formattedDate = "";
  try {
    const [day, monthText, year] = dateStr.split(/\s+/);
    const monthMap: Record<string, string> = {
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
      Dec: "12",
    };
    const month = monthMap[monthText];
    if (!month) continue;
    formattedDate = `20${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  } catch {
    continue;
  }

  let amount = parseFloat(amountStr.replace(/,/g, ""));
  if (!description.includes("CRED VOUCHER")) {
    amount *= -1;
  }

  transactions.push({
    id: uuidv4(),
    date: formattedDate,
    description: description.replace(/\s{2,}/g, " "),
    amount,
  });
}


    return NextResponse.json({
      success: true,
      transactions,
    });
  } catch (error: any) {
    console.error("Error parsing PDF:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
