#!/usr/bin/env python3

import sys
import pdfplumber
import re
import json
import uuid

if len(sys.argv) < 2:
    print("Usage: parse_pdf_cba.py /path/to/file.pdf", file=sys.stderr)
    sys.exit(1)

pdf_path = sys.argv[1]

MONTH_MAP = {
    "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
    "May": "05", "Jun": "06", "Jul": "07", "Aug": "08",
    "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
}

date_pattern = re.compile(r"(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)", re.IGNORECASE)
amount_pattern = re.compile(r"\d{1,3}(?:,\d{3})*\.\d{2}")

exclude_keywords = (
    "closing balance",
    "total debits",
    "total credits",
    "account fee",
    "staff assisted withdrawals",
    "cheques written",
    "transaction type",
    "free chargeable unit fee",
    "credit interest rate",
)

def determine_sign(description):
    desc = description.lower()
    if any(keyword in desc for keyword in [
        "transfer to",
        "loan repayment",
        "direct debit",
        "card",
        "cash out",
        "purchase",
        "withdrawal",
        "atm",
        "debit interest",
        "bpay",
        "cardless cash",
        "fee"
    ]):
        return -1
    elif any(keyword in desc for keyword in [
        "transfer from",
        "direct credit",
        "deposit",
        "cash deposit",
        "return"
    ]):
        return 1
    else:
        return 1

def clean_description(text):
    text = re.sub(r"\b(CR|DR)\b", "", text)
    text = re.sub(r"Value Date:.*", "", text)
    text = re.sub(r"\d{1,2}\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)", "", text, flags=re.IGNORECASE)
    text = re.sub(r"\s+\$+", "", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()

transactions = []
previous_balance = None

try:
    with pdfplumber.open(pdf_path) as pdf:
        last_date = None
        block = []

        for page_num, page in enumerate(pdf.pages, start=1):
            text = page.extract_text()
            if not text:
                continue

            lines = [line.strip() for line in text.splitlines() if line.strip()]

            for line in lines:
                # Skip headers, footers, non-transaction lines
                if any(h in line for h in (
                    "Date Transaction", "Transaction Summary", "(Page",
                    "General Manager", "Yours sincerely",
                    "Account Number", "Closing Balance", "Card Number",
                    "Smart Access", "Dear", "Proceeds of cheques",
                    "Any pending transactions", "Statement", "Credit Interest Rate",
                )):
                    continue

                # Capture opening balance
                if "opening balance" in line.lower():
                    amounts = amount_pattern.findall(line)
                    if amounts:
                        previous_balance = float(amounts[-1].replace(",", ""))
                    continue

                date_match = date_pattern.match(line)
                if date_match:
                    # Process previous block if exists
                    if block:
                        joined = " ".join(block)
                        if any(kw in joined.lower() for kw in exclude_keywords):
                            block = []
                        else:
                            amounts = amount_pattern.findall(joined)
                            if len(amounts) >= 2:
                                balance = float(amounts[-1].replace(",", ""))
                                amount_value = float(amounts[-2].replace(",", ""))
                                desc = clean_description(amount_pattern.sub("", joined))
                                if previous_balance is not None:
                                    sign = 1 if balance > previous_balance else -1
                                else:
                                    sign = determine_sign(desc)
                                transactions.append({
                                    "id": str(uuid.uuid4()),
                                    "date": last_date,
                                    "description": desc,
                                    "amount": round(sign * amount_value, 2)
                                })
                                previous_balance = balance
                        block = []

                    # Start new block
                    day, mon = date_match.groups()
                    month = MONTH_MAP.get(mon.capitalize())
                    year = "2024"  # Update as needed
                    last_date = f"{year}-{month}-{day.zfill(2)}"
                    block = [line]
                else:
                    if block:
                        block.append(line)

            # Handle any final block at end of page
            if block:
                joined = " ".join(block)
                if not any(kw in joined.lower() for kw in exclude_keywords):
                    amounts = amount_pattern.findall(joined)
                    if len(amounts) >= 2:
                        balance = float(amounts[-1].replace(",", ""))
                        amount_value = float(amounts[-2].replace(",", ""))
                        desc = clean_description(amount_pattern.sub("", joined))
                        if previous_balance is not None:
                            sign = 1 if balance > previous_balance else -1
                        else:
                            sign = determine_sign(desc)
                        transactions.append({
                            "id": str(uuid.uuid4()),
                            "date": last_date,
                            "description": desc,
                            "amount": round(sign * amount_value, 2)
                        })
                        previous_balance = balance
                block = []

    print(json.dumps(transactions, indent=2))
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
