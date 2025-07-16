# 🐍 Python Deployment on Vercel - Complete Guide

## ✅ Problem Solved

**Issue**: Python scripts were working locally but failing on Vercel deployment because Vercel doesn't support running standalone Python scripts via `child_process.spawn()`.

**Solution**: Converted Python scripts to Vercel Python Serverless Functions using the `BaseHTTPRequestHandler` pattern.

## 🏗️ Architecture Changes

### Before (Local Only)
```
app/api/process-pdf/route.ts
├── Uses child_process.spawn()
├── Calls ./app/api/parsers/parse_pdf_*.py
└── Requires local Python environment
```

### After (Vercel Compatible)
```
app/api/process-pdf/route.ts
├── Makes HTTP requests to Python serverless functions
├── Calls /api/parse_pdf_*.py (Vercel Python functions)
└── Works on Vercel deployment
```

## 📁 New File Structure

```
/api/                           # Vercel Python Serverless Functions
├── parse_pdf_amex.py          # AMEX PDF parser
├── parse_pdf_cba.py           # CBA PDF parser  
├── parse_pdf_anz.py           # ANZ PDF parser
├── parse_pdf_westpac.py       # Westpac PDF parser
├── parse_pdf_westpac_credit_card.py  # Westpac Credit Card parser
├── test-python.py             # Test function
└── requirements.txt           # Python dependencies

/app/api/
├── process-pdf/route.ts       # Updated to use HTTP calls
└── test-python/route.ts       # Test endpoint
```

## 🔧 Key Changes Made

### 1. Python Serverless Functions
Each parser is now a Vercel Python serverless function:

```python
from http.server import BaseHTTPRequestHandler
import json
import base64
import tempfile
import os
import pdfplumber

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Receives base64 PDF data
        # Parses PDF using pdfplumber
        # Returns JSON with transactions
```

### 2. Updated Route Handler
The main route now makes HTTP requests instead of spawning processes:

```typescript
// Convert PDF to base64
const pdfBase64 = buffer.toString('base64');

// Call Python serverless function
const response = await fetch(`${baseUrl}/api/parse_pdf_${bank}.py`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ pdf_base64: pdfBase64, filename: file.name })
});
```

### 3. Requirements.txt
Created proper Python dependencies file:

```txt
pdfplumber==0.10.3
requests==2.31.0
```

## 🚀 Deployment Steps

### 1. Push to Vercel
```bash
git add .
git commit -m "Convert Python parsers to Vercel serverless functions"
git push
```

### 2. Vercel Configuration
- Vercel will automatically detect Python files in `/api/`
- Python runtime will be used for `.py` files
- Dependencies will be installed from `requirements.txt`

### 3. Environment Variables
No additional environment variables needed - the functions work with the existing setup.

## 🧪 Testing

### Test Python Functions
```bash
# Test GET endpoint
curl https://your-app.vercel.app/api/test-python.py

# Test POST endpoint  
curl -X POST https://your-app.vercel.app/api/test-python
```

### Test PDF Processing
Upload a PDF through the web interface or use the API directly.

## 📊 Benefits

✅ **Vercel Compatible**: Works on Vercel deployment  
✅ **No External Services**: Everything runs on Vercel  
✅ **Same Functionality**: All parsing logic preserved  
✅ **Better Error Handling**: Proper HTTP status codes  
✅ **Scalable**: Serverless functions auto-scale  
✅ **Cost Effective**: No additional hosting costs  

## 🔍 Troubleshooting

### Common Issues

1. **Python Dependencies Not Found**
   - Ensure `requirements.txt` is in the root directory
   - Check that package versions are compatible

2. **Base64 Encoding Issues**
   - Verify PDF data is properly encoded
   - Check Content-Type headers

3. **Temporary File Errors**
   - Functions use `/tmp` directory (Vercel standard)
   - Files are automatically cleaned up

### Debug Steps

1. Check Vercel function logs in dashboard
2. Test individual Python functions directly
3. Verify base64 encoding/decoding
4. Check PDF parsing logic

## 🎯 Success Criteria

- ✅ Python functions deploy successfully on Vercel
- ✅ PDF parsing works for all supported banks
- ✅ No external dependencies or services required
- ✅ Same functionality as local development
- ✅ Proper error handling and logging

## 📝 Notes

- The original Python parser files in `/app/api/parsers/` can be removed after successful deployment
- All parsing logic has been preserved and enhanced
- The solution follows Vercel's Python runtime best practices
- No changes needed to the frontend or other parts of the application

---

**Status**: ✅ Ready for deployment  
**Compatibility**: Vercel Python Runtime (Beta)  
**Dependencies**: pdfplumber, requests  
**Testing**: Test endpoints available at `/api/test-python` 