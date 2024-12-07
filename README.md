# Document Extraction API

## Why? 
In the world of document processing, developers and businesses often face significant challenges when trying to extract text from invoices, receipts, and business cards. Traditional methods require:

Complex Azure API configurations
Creating and managing Azure accounts
Understanding intricate API documentation
Handling multiple SDKs and libraries
Significant development time and expertise

Our Document Extraction API solves these pain points by providing:

Instant Text Extraction: Simply send a document URL, receive structured data
Zero Configuration: No Azure account or complex setup required
Universal Compatibility: Works with PDFs, images across various document types
Simplified Integration: One-step API call replaces hours of development work
Cost-Effective: Eliminate the need for individual Azure subscriptions and complex infrastructure

Whether you're a startup, freelancer, or enterprise developer, this API removes the technical barriers of document text extraction. We've done the heavy lifting with Azure AI, so you can focus on building your core product instead of wrestling with document processing complexities.
Want to extract text from an invoice in seconds? Just send a URL. Need business card details without manual entry? We've got you covered. No accounts, no configurations, just pure, simple data extraction.

## Built Using
- Node.js
- Express.js
- Azure AI Document Intelligence

## API Endpoints

### 1. Invoice Analysis
- **URL**: `http://192.241.155.46/analyze-invoice`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "url": "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-invoice.pdf"
  }
  ```
![Invoice Document Example](/screenshots/invoice.png)

### 2. Receipt Analysis
- **URL**: `http://192.241.155.46/analyze-receipt`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "url": "https://raw.githubusercontent.com/Azure/azure-sdk-for-python/main/sdk/formrecognizer/azure-ai-formrecognizer/tests/sample_forms/receipt/contoso-receipt.png"
  }
  ```
![Receipt Document Example](/screenshots/receipt.png)

### 3. Business Card Analysis
- **URL**: `http://192.241.155.46/analyze-business-card`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "url": "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/business-card-english.jpg"
  }
  ```
![Business Card Document Example](/screenshots/business-card.png)

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