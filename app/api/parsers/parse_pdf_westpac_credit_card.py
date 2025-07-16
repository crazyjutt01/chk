#!/usr/bin/env python3

import sys
import pdfplumber
import re
import uuid
from datetime import datetime
import json

if len(sys.argv) < 2:
    print("Usage: parse_pdf_westpac_credit.py /path/to/file.pdf", file=sys.stderr)
    sys.exit(1)

pdf_path = sys.argv[1]

# === Read PDF text ===
full_text = ""
try:
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text += text + "\n"
except Exception as e:
    print(f"Error reading PDF: {e}", file=sys.stderr)
    sys.exit(1)

lines = full_text.splitlines()
transactions = []

# === Pattern to match transactions ===
pattern = re.compile(
    r"""^
        (\d{1,2})\s+          # Day
        ([A-Za-z]{3})\s+      # Month
        (\d{2})\s+            # Year
        (.*?)\s+              # Description (lazy match)
        ([\d,]+\.\d{2})       # Amount
        (\s*-\s*)?$           # Optional minus sign
    """,
    re.VERBOSE
)

month_map = {
    "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
    "May": "05", "Jun": "06", "Jul": "07", "Aug": "08",
    "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12",
}

# === Parse lines ===
for line in lines:
    m = pattern.match(line.strip())
    if m:
        day, mon, year_short, desc, amount_str, minus = m.groups()

        description = desc.strip()
        date_str = f"20{year_short}-{month_map[mon]}-{day.zfill(2)}"
        amount = float(amount_str.replace(",", ""))
        # Debit: negative
        if minus:
            amount = amount
        else:
            amount = -amount

        transactions.append({
            "id": str(uuid.uuid4()),
            "date": date_str,
            "description": description,
            "amount": amount
        })

# === Output JSON ===
print(json.dumps(transactions, indent=2))
