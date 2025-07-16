#!/usr/bin/env python3

import sys
import pdfplumber
import re
from uuid import uuid4
import json

if len(sys.argv) < 2:
    print("Usage: parse_pdf_amex.py /path/to/file.pdf", file=sys.stderr)
    sys.exit(1)

pdf_path = sys.argv[1]
transactions = []

# Read PDF text
full_text = ""
with pdfplumber.open(pdf_path) as pdf:
    for page in pdf.pages:
        text = page.extract_text()
        if text:
            full_text += text + "\n"

lines = full_text.splitlines()

# Month mapping
month_map = {
    "January": "01",
    "February": "02",
    "March": "03",
    "April": "04",
    "May": "05",
    "June": "06",
    "July": "07",
    "August": "08",
    "September": "09",
    "October": "10",
    "November": "11",
    "December": "12",
}

# Regex for date + description + amount
date_line_pattern = re.compile(
    r"^(January|February|March|April|May|June|July|August|September|October|November|December)"
    r"(\d{1,2})\s+(.+?)\s+([\d,]+\.\d{2})$"
)

transactions = []

i = 0
while i < len(lines):
    line = lines[i].strip()

    m_date = date_line_pattern.match(line)
    if m_date:
        month_name = m_date.group(1)
        day = m_date.group(2).zfill(2)
        description = m_date.group(3).strip()
        amount_value = float(m_date.group(4).replace(",", ""))
        date_str = f"2025-{month_map[month_name]}-{day}"

        # Look ahead for Reference line (could contain "CR")
        j = i + 1
        reference_line = ""
        is_credit = False

        if j < len(lines):
            next_line = lines[j].strip()
            if "Reference:" in next_line:
                reference_content = next_line.split("Reference:")[1].strip()
                reference_line = reference_content
                if "CR" in reference_content:
                    is_credit = True

        # Extra rule: BPAY payment detection
        bpay_keywords = ["BPAY PAYMENT", "PAYMENT-THANK YOU"]
        if any(keyword in description.upper() for keyword in bpay_keywords):
            is_credit = True

        # Determine signed amount
        signed_amount = amount_value if is_credit else -amount_value

        # Full description
        full_description = description
        if reference_line:
            full_description += f" Ref:{reference_line}"

        transactions.append({
            "id": str(uuid4()),
            "date": date_str,
            "description": full_description,
            "amount": signed_amount
        })

        # Skip reference line
        if reference_line:
            i = j + 1
        else:
            i += 1

    else:
        i += 1

# Output JSON
print(json.dumps(transactions))
