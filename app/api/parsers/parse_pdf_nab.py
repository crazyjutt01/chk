#!/usr/bin/env python3

import sys
import pdfplumber
import re
import uuid
import json

if len(sys.argv) < 2:
    print("Usage: parse_pdf_nab.py /path/to/file.pdf", file=sys.stderr)
    sys.exit(1)

pdf_path = sys.argv[1]

MONTH_MAP = {
    "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
    "May": "05", "Jun": "06", "Jul": "07", "Aug": "08",
    "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
}

# Regex to detect date line
date_line_pattern = re.compile(
    r"^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})(.*)"
)

amount_pattern = re.compile(r"\d{1,3}(?:,\d{3})*\.\d{2}")

def clean_description(text):
    text = re.sub(r"\s+", " ", text or "").strip()
    text = re.sub(r"\s+\d{1,2}:\d{2}(:\d{2})?$", "", text)
    return text

transactions = []
previous_balance = None
collecting = False

try:
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if not text:
                continue
            lines = [line.strip() for line in text.splitlines() if line.strip()]
            i = 0
            prev_line = None

            while i < len(lines):
                line = lines[i]

                if "Transaction Details" in line:
                    collecting = True
                    i += 1
                    continue

                if not collecting:
                    prev_line = line
                    i += 1
                    continue

                m = date_line_pattern.match(line)
                if m:
                    day, mon, year, rest_of_line = m.groups()
                    date = f"{year}-{MONTH_MAP[mon]}-{day.zfill(2)}"

                    description_parts = []
                    amounts = amount_pattern.findall(rest_of_line)

                    j = i + 1
                    while len(amounts) < 2 and j < len(lines):
                        next_line = lines[j]
                        next_amounts = amount_pattern.findall(next_line)

                        next_tokens = next_line.split()
                        next_tokens_cleaned = [t for t in next_tokens if not amount_pattern.match(t)]
                        if next_tokens_cleaned:
                            description_parts.append(" ".join(next_tokens_cleaned))

                        if next_amounts:
                            amounts.extend(next_amounts)

                        j += 1

                    desc_tokens = rest_of_line.split()
                    desc_tokens_cleaned = [t for t in desc_tokens if not amount_pattern.match(t)]
                    if desc_tokens_cleaned:
                        description_parts.insert(0, " ".join(desc_tokens_cleaned))

                    if not description_parts and prev_line:
                        description_parts.append(prev_line)

                    if len(amounts) < 2:
                        i = j
                        prev_line = line
                        continue

                    amount_value = float(amounts[0].replace(",", ""))
                    balance = float(amounts[1].replace(",", ""))

                    if previous_balance is not None:
                        sign = 1 if balance > previous_balance else -1
                    else:
                        sign = -1

                    previous_balance = balance

                    description = clean_description(" ".join(description_parts))

                    transactions.append({
                        "id": str(uuid.uuid4()),
                        "date": date,
                        "description": description,
                        "amount": round(sign * amount_value, 2)
                    })

                    i = j
                else:
                    prev_line = line
                    i += 1

    print(json.dumps(transactions, indent=2, ensure_ascii=False))

except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
