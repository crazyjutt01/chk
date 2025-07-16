#!/usr/bin/env python3

import sys
import pdfplumber
import re
import uuid
from datetime import datetime
import json

if len(sys.argv) < 2:
    print("Usage: parse_pdf_anz.py /path/to/file.pdf", file=sys.stderr)
    sys.exit(1)

pdf_path = sys.argv[1]

month_map = {
    "JAN": "01", "FEB": "02", "MAR": "03", "APR": "04",
    "MAY": "05", "JUN": "06", "JUL": "07", "AUG": "08",
    "SEP": "09", "OCT": "10", "NOV": "11", "DEC": "12",
}

year = "2023"  # Adjust as needed

def parse_balance(s):
    s = s.replace(",", "").strip()
    if s.endswith("DR"):
        return -float(s[:-2])
    else:
        return float(s)

def first_parser(lines):
    results = []
    current_txn = None
    previous_balance = None

    for line in lines:
        line = line.strip()
        if not line:
            continue

        # Detect opening balance
        if "OPENING BALANCE" in line.upper():
            numbers_match = re.findall(r"(\d{1,3}(?:,\d{3})*\.\d{2}(?:DR)?)", line)
            if numbers_match:
                previous_balance = parse_balance(numbers_match[-1])
            continue

        # Match date line
        date_match = re.match(r"^(\d{2})\s+([A-Z]{3})\s+(.*)", line)
        numbers_match = re.findall(r"(\d{1,3}(?:,\d{3})*\.\d{2}(?:DR)?)", line)

        if date_match:
            if current_txn and "amount" not in current_txn:
                current_txn["amount"] = 0.0
                results.append(current_txn)

            day, mon, rest = date_match.groups()
            date_iso = f"{year}-{month_map[mon]}-{day.zfill(2)}"

            current_txn = {
                "id": str(uuid.uuid4()),
                "date": date_iso,
                "description": rest.strip()
            }

            if len(numbers_match) >= 1:
                if len(numbers_match) == 2:
                    amount_value = float(numbers_match[0].replace(",", ""))
                    balance_value = parse_balance(numbers_match[1])

                    desc_upper = current_txn["description"].upper()
                    if "REVERSAL" in desc_upper or "REFUND" in desc_upper:
                        signed_amount = abs(amount_value)
                    else:
                        if previous_balance is not None:
                            signed_amount = round(balance_value - previous_balance, 2)
                        else:
                            signed_amount = amount_value

                    previous_balance = balance_value

                elif len(numbers_match) == 3:
                    w = float(numbers_match[0].replace(",", ""))
                    d = float(numbers_match[1].replace(",", ""))
                    balance_value = parse_balance(numbers_match[2])
                    if d > 0:
                        signed_amount = d
                    else:
                        signed_amount = -w
                    previous_balance = balance_value
                else:
                    signed_amount = 0.0

                current_txn["amount"] = signed_amount
                results.append(current_txn)
                current_txn = None

        elif current_txn:
            current_txn["description"] += " " + line.strip()

            if len(numbers_match) >= 1:
                if len(numbers_match) == 2:
                    amount_value = float(numbers_match[0].replace(",", ""))
                    balance_value = parse_balance(numbers_match[1])

                    desc_upper = current_txn["description"].upper()
                    if "REVERSAL" in desc_upper or "REFUND" in desc_upper:
                        signed_amount = abs(amount_value)
                    else:
                        if previous_balance is not None:
                            signed_amount = round(balance_value - previous_balance, 2)
                        else:
                            signed_amount = amount_value

                    previous_balance = balance_value

                elif len(numbers_match) == 3:
                    w = float(numbers_match[0].replace(",", ""))
                    d = float(numbers_match[1].replace(",", ""))
                    balance_value = parse_balance(numbers_match[2])
                    if d > 0:
                        signed_amount = d
                    else:
                        signed_amount = -w
                    previous_balance = balance_value
                else:
                    signed_amount = 0.0

                current_txn["amount"] = signed_amount
                results.append(current_txn)
                current_txn = None

    if current_txn and "amount" not in current_txn:
        current_txn["amount"] = 0.0
        results.append(current_txn)

    return results

def second_parser(lines):
    results = []

    transaction_pattern = re.compile(
        r"^(\d{2}/\d{2}/\d{4})\s+"
        r"(\d{2}/\d{2}/\d{4})\s+"
        r"(\d{4})\s+"
        r"(.+?)\s+"
        r"\$?(-?\d{1,3}(?:,\d{3})*\.\d{2})\s*(C\s*R)?\s+"
        r"\$?(-?\d{1,3}(?:,\d{3})*\.\d{2})$"
    )

    for line in lines:
        line = line.strip()
        if not line:
            continue

        m = transaction_pattern.match(line)
        if m:
            date_processed = m.group(1)
            description_text = m.group(4).strip()
            amount_str = m.group(5).replace(",", "")
            amount_cr = m.group(6)

            amount_raw = float(amount_str)
            amount = amount_raw * (-1)
            if amount_cr:
                amount = abs(amount_raw)

            date_obj = datetime.strptime(date_processed, "%d/%m/%Y")
            date_iso = date_obj.strftime("%Y-%m-%d")

            txn = {
                "id": str(uuid.uuid4()),
                "date": date_iso,
                "description": description_text,
                "amount": amount
            }
            results.append(txn)

    return results

# === Read PDF text ===
lines = []
try:
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                lines.extend(text.splitlines())
except Exception as e:
    print(f"Error reading PDF: {e}", file=sys.stderr)
    sys.exit(1)

# === Try first parser ===
transactions = first_parser(lines)

# === Fallback to second parser if no results ===
if not transactions:
    transactions = second_parser(lines)

# === Output JSON ===
print(json.dumps(transactions, indent=2))
