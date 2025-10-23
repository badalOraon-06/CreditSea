# Testing the Upload Endpoint

## Using Postman

### Test 1: Check Upload Info (GET)

1. Open Postman
2. Create new request
3. Method: GET
4. URL: `http://localhost:5000/api/upload`
5. Click Send
6. You should see upload endpoint information

Expected Response:

```json
{
  "success": true,
  "message": "Upload endpoint is ready",
  "acceptedFormats": [".xml"],
  "maxFileSize": "10MB",
  "endpoint": "POST /api/upload"
}
```

---

### Test 2: Upload XML File (POST)

1. Open Postman
2. Create new request
3. Method: POST
4. URL: `http://localhost:5000/api/upload`
5. Go to "Body" tab
6. Select "form-data"
7. Add key: `xmlFile` (must be exactly this name!)
8. Change type from "Text" to "File" (dropdown on right)
9. Click "Select Files" and choose your XML file
10. Click Send

Expected Response (Success):

```json
{
  "success": true,
  "message": "XML file uploaded successfully!",
  "data": {
    "filename": "Sagar_Ugle1-1729692345678-123456789.xml",
    "originalname": "Sagar_Ugle1.xml",
    "size": 12345,
    "path": "uploads/Sagar_Ugle1-1729692345678-123456789.xml",
    "uploadedAt": "2025-10-23T..."
  }
}
```

---

### Test 3: Upload Non-XML File (Should Fail)

1. Same as Test 2, but select a .txt or .pdf file
2. Expected Response:

```json
{
  "success": false,
  "message": "Only XML files are allowed!"
}
```

---

### Test 4: Upload Without File (Should Fail)

1. POST request to `http://localhost:5000/api/upload`
2. Don't attach any file
3. Expected Response:

```json
{
  "success": false,
  "message": "No file uploaded. Please select an XML file."
}
```

---

## Using PowerShell (Alternative)

Test with curl:

```powershell
# Test GET endpoint
Invoke-RestMethod -Uri "http://localhost:5000/api/upload" -Method GET

# Test POST endpoint (upload file)
$file = "c:\Users\BADAL ORAON\OneDrive\Desktop\Harshdeep\sample-xml-files\Sagar_Ugle1.xml"
$uri = "http://localhost:5000/api/upload"

# Create form data
$form = @{
    xmlFile = Get-Item -Path $file
}

# Send request
Invoke-RestMethod -Uri $uri -Method POST -Form $form
```

---

## Expected Console Output (Backend)

When you upload a file, you should see in your backend terminal:

```
📋 Validating file: Sagar_Ugle1.xml
✅ File validation passed
📁 File uploaded successfully:
   - Filename: Sagar_Ugle1-1729692345678-123456789.xml
   - Original name: Sagar_Ugle1.xml
   - Size: 12.34 KB
   - Path: uploads\Sagar_Ugle1-1729692345678-123456789.xml
```

---

## Troubleshooting

### Error: "Cannot POST /api/upload"

- Backend server not running
- Solution: Start backend with `npm run dev`

### Error: "MulterError: Unexpected field"

- Wrong field name in Postman
- Solution: Use exactly `xmlFile` as the field name

### Error: "File too large"

- File exceeds 10MB
- Solution: Use a smaller XML file

### Error: "Only XML files are allowed"

- Wrong file type
- Solution: Select an .xml file

---

## Success Checklist

- [ ] GET request returns upload info
- [ ] POST request with XML file succeeds
- [ ] File appears in backend/uploads folder
- [ ] Non-XML file is rejected
- [ ] Request without file is rejected
- [ ] Backend console shows upload details

---

**Next Step After Testing:**
Once all tests pass, we'll move to Phase 3: XML Parsing!
