# Document Extraction API

## Why? 
Simplify document text extraction without complex configurations! Extract text from invoices, receipts, and business cards using a simple API call with just a document URL.

## Built Using
- Node.js
- Express.js
- Azure AI Document Intelligence

## API Endpoints

### 1. Invoice Analysis
- **URL**: `https://your-api-domain.com/analyze-invoice`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "url": "https://example.com/invoice.pdf"
  }
  ```
![Invoice Document Example](/invoice.png)

### 2. Receipt Analysis
- **URL**: `https://your-api-domain.com/analyze-receipt`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "url": "https://example.com/receipt.jpg"
  }
  ```
![Receipt Document Example](/receipt.png)

### 3. Business Card Analysis
- **URL**: `https://your-api-domain.com/analyze-business-card`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "url": "https://example.com/businesscard.png"
  }
  ```
![Business Card Document Example](/business-card.png)

## How to Use
1. No installation required
2. Use Postman, Thunder Client, or any HTTP client
3. Send a POST request with a document URL
4. Receive structured JSON response

## Sample Response
**Example Invoice Response**:
```json
{
  "invoiceNumber": "INV-2023-001",
  "total": 1299.99,
  "vendorName": "Tech Solutions Inc.",
  "date": "2023-12-06"
}
```

## Response Codes
- `200 OK`: Successful extraction
- `400 Bad Request`: Missing URL
- `500 Internal Server Error`: Processing failure

## Detailed API Documentation
For comprehensive API details, check out our Swagger documentation:
**[Swagger API Docs](http://192.241.155.46/api-docs/#/)**

## Recommended Tools
- Postman
- Thunder Client
- cURL
- Any HTTP client supporting POST requests

## Thank You!
If you've reached till here, you're awesome! Thanks for taking the time to use my API 🙌🏻