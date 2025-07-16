#!/usr/bin/env python3

import sys
import pdfplumber
import re
import uuid
from datetime import datetime
import json

if len(sys.argv) < 2:
    print("Usage: parse_pdf.py /path/to/file.pdf", file=sys.stderr)
    sys.exit(1)

pdf_path = sys.argv[1]
transactions = []

try:
    # Read the entire text
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text += text + "\n"

    lines = full_text.splitlines()

    i = 0
    while i < len(lines):
        line = lines[i].strip()

        # If line starts with date
        if re.match(r"^\d{2}/\d{2}/\d{2}", line):
            merged_line = line

            # Append next line if it doesn't start with date
            if i + 1 < len(lines):
                next_line = lines[i + 1].strip()
                if not re.match(r"^\d{2}/\d{2}/\d{2}", next_line):
                    merged_line += " " + next_line
                    i += 1

            # Extract date
            date_match = re.match(r"^(\d{2}/\d{2}/\d{2})", merged_line)
            if not date_match:
                i += 1
                continue

            raw_date = date_match.group(1)
            parsed_date = datetime.strptime(raw_date, "%d/%m/%y").strftime("%Y-%m-%d")

            # Find all amounts
            amounts = re.findall(r"(\d{1,3}(?:,\d{3})*\.\d{2})", merged_line)

            # Remove date and amounts to get description
            desc_without_date = merged_line[len(raw_date):].strip()
            desc_without_amounts = re.sub(r"(\d{1,3}(?:,\d{3})*\.\d{2})", "", desc_without_date).strip()

            # Skip Opening Balance and Closing Balance
            if "OPENING BALANCE" in desc_without_amounts.upper() or "CLOSING BALANCE" in desc_without_amounts.upper():
                i += 1
                continue

            # Determine amount (debit/credit)
            amount = None
            if len(amounts) >= 1:
                value = float(amounts[0].replace(",", ""))
                if "Deposit" in desc_without_amounts or "Refund" in desc_without_amounts:
                    amount = value
                else:
                    amount = -value

            if amount is None:
                i += 1
                continue

            transactions.append({
                "id": str(uuid.uuid4()),
                "date": parsed_date,
                "description": desc_without_amounts,
                "amount": amount
            })

        i += 1

    print(json.dumps(transactions, indent=2))

except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
