# 🧪 Phase 4 & 5 Testing Guide

## Testing Database & API Endpoints

---

## ✅ Prerequisites

1. Backend server running: `npm run dev` in backend folder
2. MongoDB running: `net start MongoDB`
3. Postman installed

---

## 📤 Test 1: Upload XML and Save to Database

### Request:

```
Method: POST
URL: http://localhost:5000/api/upload
Body: form-data
Key: xmlFile (type: File)
Value: Select Sagar_Ugle1.xml
```

### Expected Response:

```json
{
  "success": true,
  "message": "XML file uploaded, parsed, and saved successfully!",
  "data": {
    "reportId": "507f1f77bcf86cd799439011",
    "file": {
      "filename": "Sagar_Ugle1-1234567890.xml",
      "originalname": "Sagar_Ugle1.xml",
      "size": 12345,
      "uploadedAt": "2025-10-23T..."
    },
    "creditReport": {
      "basicDetails": {
        "firstName": "Sagar",
        "lastName": "ugle",
        "fullName": "Sagar ugle",
        "mobilePhone": "9819137672",
        "pan": "AOZPB0247S"
      },
      "creditScore": {
        "score": 719,
        "confidenceLevel": "H"
      },
      "reportSummary": {
        "totalAccounts": 4,
        "activeAccounts": 3,
        "currentBalance": 245000
      }
    }
  }
}
```

### Check Backend Console:

```
📁 File uploaded successfully
🔍 Parsing XML file...
✅ XML parsed successfully
💾 Saving credit report to MongoDB...
✅ Credit report saved successfully!
   - Document ID: 507f1f77bcf86cd799439011
```

---

## 📊 Test 2: Get All Reports

### Request:

```
Method: GET
URL: http://localhost:5000/api/reports
```

### Expected Response:

```json
{
  "success": true,
  "count": 1,
  "total": 1,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "basicDetails": { ... },
      "creditScore": { ... },
      "reportSummary": { ... },
      "creditAccounts": [ ... ],
      "addresses": [ ... ],
      "uploadDate": "2025-10-23T...",
      "createdAt": "2025-10-23T..."
    }
  ]
}
```

---

## 📄 Test 3: Get Report by ID

### Request:

```
Method: GET
URL: http://localhost:5000/api/reports/YOUR_REPORT_ID
```

Replace `YOUR_REPORT_ID` with the actual ID from Test 1 response.

### Expected Response:

Full credit report with all details

---

## 🔍 Test 4: Get Reports by PAN

### Request:

```
Method: GET
URL: http://localhost:5000/api/reports/pan/AOZPB0247S
```

### Expected Response:

All reports for that PAN number

---

## 📱 Test 5: Get Reports by Mobile

### Request:

```
Method: GET
URL: http://localhost:5000/api/reports/mobile/9819137672
```

### Expected Response:

All reports for that mobile number

---

## 📈 Test 6: Get Statistics

### Request:

```
Method: GET
URL: http://localhost:5000/api/reports/stats
```

### Expected Response:

```json
{
  "success": true,
  "data": {
    "totalReports": 1,
    "averageCreditScore": 719
  }
}
```

---

## 🗑️ Test 7: Delete Report (Soft Delete)

### Request:

```
Method: DELETE
URL: http://localhost:5000/api/reports/YOUR_REPORT_ID
```

### Expected Response:

```json
{
  "success": true,
  "message": "Credit report deleted successfully",
  "data": {
    "id": "507f1f77bcf86cd799439011"
  }
}
```

---

## 🔄 Test 8: Pagination

### Request:

```
Method: GET
URL: http://localhost:5000/api/reports?page=1&limit=5
```

Upload multiple files first, then test pagination.

---

## 🔍 Test 9: Filter by PAN (Query Parameter)

### Request:

```
Method: GET
URL: http://localhost:5000/api/reports?pan=AOZPB0247S
```

---

## 💾 Test 10: Verify in MongoDB Compass

1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Select database: `creditsea`
4. Select collection: `creditreports`
5. View the documents

---

## ✅ Success Checklist

- [ ] Upload XML saves to database
- [ ] GET /api/reports returns all reports
- [ ] GET /api/reports/:id returns specific report
- [ ] GET /api/reports/pan/:pan works
- [ ] GET /api/reports/mobile/:mobile works
- [ ] GET /api/reports/stats returns statistics
- [ ] DELETE /api/reports/:id soft deletes
- [ ] Pagination works correctly
- [ ] Data visible in MongoDB Compass
- [ ] Backend console shows proper logs

---

## 🐛 Troubleshooting

### Error: "Cannot POST /api/reports"

- Reports endpoint is GET only
- Use POST for /api/upload

### Error: "Invalid report ID format"

- Check the ID is a valid MongoDB ObjectId (24 hex characters)
- Copy ID from upload response

### Error: "Credit report not found"

- Report might be soft-deleted (isActive: false)
- Check MongoDB Compass

### No data in response

- Make sure you've uploaded at least one XML file
- Check MongoDB connection

---

## 🎯 Next Steps

Once all tests pass:

1. ✅ Upload functionality working
2. ✅ Data saved to MongoDB
3. ✅ All API endpoints working
4. ✅ Ready for frontend development!

**Move to Phase 6: Frontend Upload Page** 🚀
