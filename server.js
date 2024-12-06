const analyzeInvoice = require('./helpers/invoice.js'); 
const analyzeReceipt = require('./helpers/receipt.js'); 
const analyzeBusinessCard = require('./helpers/business_card.js'); 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


app.use(bodyParser.json());

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Document Analysis API",
            version: "1.0.0",
            description: "API for analyzing invoices, receipts, and business cards",
        },
    },
    apis: ["./server.js"], // Path to your API documentation
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /analyze-invoice:
 *   post:
 *     summary: Analyze an invoice document
 *     description: Analyzes the invoice and returns structured data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL of the invoice document to analyze.
 *                 example: "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-invoice.pdf"
 *     responses:
 *       200:
 *         description: Successfully analyzed the invoice.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example :
 *                    AmountDue:
 *                      kind: currency
 *                      value:
 *                        amount: 610
 *                        currencySymbol: "$"
 *                        currencyCode: USD
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 7.3587
 *                          "y": 7.8012
 *                        - x: 7.9174
 *                          "y": 7.8012
 *                        - x: 7.9222
 *                          "y": 7.9731
 *                        - x: 7.3539
 *                          "y": 7.9731
 *                      content: "$610.00"
 *                      spans:
 *                      - offset: 653
 *                        length: 7
 *                      confidence: 0.949
 *                    BillingAddress:
 *                      kind: address
 *                      value:
 *                        houseNumber: '123'
 *                        road: Bill St
 *                        city: Redmond
 *                        state: WA
 *                        postalCode: '98052'
 *                        streetAddress: 123 Bill St
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 0.5635
 *                          "y": 4.3589
 *                        - x: 2.0247
 *                          "y": 4.3589
 *                        - x: 2.0247
 *                          "y": 4.7266
 *                        - x: 0.5635
 *                          "y": 4.7266
 *                      content: |-
 *                        123 Bill St,
 *                        Redmond WA, 98052
 *                      spans:
 *                      - offset: 328
 *                        length: 12
 *                      - offset: 370
 *                        length: 17
 *                      confidence: 0.889
 *                    BillingAddressRecipient:
 *                      kind: string
 *                      value: Microsoft Finance
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 0.573
 *                          "y": 4.1434
 *                        - x: 1.801
 *                          "y": 4.1489
 *                        - x: 1.8003
 *                          "y": 4.316
 *                        - x: 0.5723
 *                          "y": 4.3105
 *                      content: Microsoft Finance
 *                      spans:
 *                      - offset: 272
 *                        length: 17
 *                      confidence: 0.938
 *                    CustomerAddress:
 *                      kind: address
 *                      value:
 *                        houseNumber: '123'
 *                        road: Other St
 *                        city: Redmond
 *                        state: WA
 *                        postalCode: '98052'
 *                        streetAddress: 123 Other St
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 0.5635
 *                          "y": 2.8312
 *                        - x: 2.0247
 *                          "y": 2.8312
 *                        - x: 2.0247
 *                          "y": 3.2036
 *                        - x: 0.5635
 *                          "y": 3.2036
 *                      content: |-
 *                        123 Other St,
 *                        Redmond WA, 98052
 *                      spans:
 *                      - offset: 205
 *                        length: 31
 *                      confidence: 0.888
 *                    CustomerAddressRecipient:
 *                      kind: string
 *                      value: Microsoft Corp
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 0.5715
 *                          "y": 2.6076
 *                        - x: 1.598
 *                          "y": 2.626
 *                        - x: 1.5947
 *                          "y": 2.8089
 *                        - x: 0.5683
 *                          "y": 2.7906
 *                      content: Microsoft Corp
 *                      spans:
 *                      - offset: 190
 *                        length: 14
 *                      confidence: 0.936
 *                    CustomerId:
 *                      kind: string
 *                      value: CID-12345
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 7.3253
 *                          "y": 2.2201
 *                        - x: 7.9938
 *                          "y": 2.2105
 *                        - x: 7.9938
 *                          "y": 2.3681
 *                        - x: 7.3301
 *                          "y": 2.3633
 *                      content: CID-12345
 *                      spans:
 *                      - offset: 180
 *                        length: 9
 *                      confidence: 0.967
 *                    CustomerName:
 *                      kind: string
 *                      value: MICROSOFT CORPORATION
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 6.2075
 *                          "y": 2.0098
 *                        - x: 7.9699
 *                          "y": 2.0052
 *                        - x: 7.9703
 *                          "y": 2.1582
 *                        - x: 6.2079
 *                          "y": 2.1628
 *                      content: MICROSOFT CORPORATION
 *                      spans:
 *                      - offset: 145
 *                        length: 21
 *                      confidence: 0.919
 *                    DueDate:
 *                      kind: date
 *                      value: '2019-12-15T00:00:00.000Z'
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 7.2441
 *                          "y": 1.8047
 *                        - x: 7.9938
 *                          "y": 1.7999
 *                        - x: 8.0034
 *                          "y": 1.9527
 *                        - x: 7.2441
 *                          "y": 1.9527
 *                      content: 12/15/2019
 *                      spans:
 *                      - offset: 119
 *                        length: 10
 *                      confidence: 0.971
 *                    InvoiceDate:
 *                      kind: date
 *                      value: '2019-11-15T00:00:00.000Z'
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 7.2393
 *                          "y": 1.5994
 *                        - x: 7.9986
 *                          "y": 1.5946
 *                        - x: 7.9986
 *                          "y": 1.7522
 *                        - x: 7.2393
 *                          "y": 1.7522
 *                      content: 11/15/2019
 *                      spans:
 *                      - offset: 78
 *                        length: 10
 *                      confidence: 0.971
 *                    InvoiceId:
 *                      kind: string
 *                      value: INV-100
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 7.4638
 *                          "y": 1.3893
 *                        - x: 7.9986
 *                          "y": 1.3845
 *                        - x: 7.9986
 *                          "y": 1.5516
 *                        - x: 7.4638
 *                          "y": 1.5516
 *                      content: INV-100
 *                      spans:
 *                      - offset: 51
 *                        length: 7
 *                      confidence: 0.971
 *                    InvoiceTotal:
 *                      kind: currency
 *                      value:
 *                        amount: 110
 *                        currencySymbol: "$"
 *                        currencyCode: USD
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 7.3635
 *                          "y": 7.2044
 *                        - x: 7.9174
 *                          "y": 7.2044
 *                        - x: 7.9174
 *                          "y": 7.3715
 *                        - x: 7.3683
 *                          "y": 7.3715
 *                      content: "$110.00"
 *                      spans:
 *                      - offset: 610
 *                        length: 7
 *                      confidence: 0.969
 *                    Items:
 *                      kind: array
 *                      values:
 *                      - kind: object
 *                        properties:
 *                          Amount:
 *                            kind: currency
 *                            value:
 *                              amount: 100
 *                              currencySymbol: "$"
 *                              currencyCode: USD
 *                            boundingRegions:
 *                            - pageNumber: 1
 *                              polygon:
 *                              - x: 7.3635
 *                                "y": 6.0729
 *                              - x: 7.9126
 *                                "y": 6.0729
 *                              - x: 7.9126
 *                                "y": 6.2305
 *                              - x: 7.3635
 *                                "y": 6.2352
 *                            content: "$100.00"
 *                            spans:
 *                            - offset: 562
 *                              length: 7
 *                            confidence: 0.913
 *                          Description:
 *                            kind: string
 *                            value: Test for 23 fields
 *                            boundingRegions:
 *                            - pageNumber: 1
 *                              polygon:
 *                              - x: 1.9006
 *                                "y": 6.0729
 *                              - x: 3.0323
 *                                "y": 6.0729
 *                              - x: 3.0323
 *                                "y": 6.2305
 *                              - x: 1.9006
 *                                "y": 6.2305
 *                            content: Test for 23 fields
 *                            spans:
 *                            - offset: 541
 *                              length: 18
 *                            confidence: 0.914
 *                          Quantity:
 *                            kind: number
 *                            value: 1
 *                            boundingRegions:
 *                            - pageNumber: 1
 *                              polygon:
 *                              - x: 0.5874
 *                                "y": 6.0872
 *                              - x: 0.659
 *                                "y": 6.0872
 *                              - x: 0.6638
 *                                "y": 6.2161
 *                              - x: 0.5921
 *                                "y": 6.2161
 *                            content: '1'
 *                            spans:
 *                            - offset: 539
 *                              length: 1
 *                            confidence: 0.905
 *                          Unit:
 *                            kind: string
 *                            value: '1'
 *                            boundingRegions:
 *                            - pageNumber: 1
 *                              polygon:
 *                              - x: 6.6663
 *                                "y": 6.092
 *                              - x: 6.7284
 *                                "y": 6.092
 *                              - x: 6.7284
 *                                "y": 6.2114
 *                              - x: 6.6663
 *                                "y": 6.2114
 *                            content: '1'
 *                            spans:
 *                            - offset: 560
 *                              length: 1
 *                            confidence: 0.497
 *                        boundingRegions:
 *                        - pageNumber: 1
 *                          polygon:
 *                          - x: 0.5874
 *                            "y": 6.0729
 *                          - x: 7.9126
 *                            "y": 6.0729
 *                          - x: 7.9126
 *                            "y": 6.2352
 *                          - x: 0.5874
 *                            "y": 6.2352
 *                        content: |-
 *                          1
 *                          Test for 23 fields
 *                          1
 *                          $100.00
 *                        spans:
 *                        - offset: 539
 *                          length: 30
 *                        confidence: 0.923
 *                    PreviousUnpaidBalance:
 *                      kind: currency
 *                      value:
 *                        amount: 500
 *                        currencySymbol: "$"
 *                        currencyCode: USD
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 7.3683
 *                          "y": 7.5052
 *                        - x: 7.9174
 *                          "y": 7.5004
 *                        - x: 7.9222
 *                          "y": 7.6723
 *                        - x: 7.3587
 *                          "y": 7.6723
 *                      content: "$500.00"
 *                      spans:
 *                      - offset: 635
 *                        length: 7
 *                      confidence: 0.95
 *                    PurchaseOrder:
 *                      kind: string
 *                      value: PO-3333
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 1.8862
 *                          "y": 5.3186
 *                        - x: 2.4736
 *                          "y": 5.3138
 *                        - x: 2.4736
 *                          "y": 5.4618
 *                        - x: 1.8862
 *                          "y": 5.4618
 *                      content: PO-3333
 *                      spans:
 *                      - offset: 493
 *                        length: 7
 *                      confidence: 0.967
 *                    RemittanceAddress:
 *                      kind: address
 *                      value:
 *                        houseNumber: '123'
 *                        road: Remit St
 *                        city: New York
 *                        state: NY
 *                        postalCode: '10001'
 *                        streetAddress: 123 Remit St
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 0.5587
 *                          "y": 9.5056
 *                        - x: 2.0008
 *                          "y": 9.5056
 *                        - x: 2.0008
 *                          "y": 9.8828
 *                        - x: 0.5587
 *                          "y": 9.8828
 *                      content: |-
 *                        123 Remit St
 *                        New York, NY, 10001
 *                      spans:
 *                      - offset: 716
 *                        length: 32
 *                      confidence: 0.887
 *                    RemittanceAddressRecipient:
 *                      kind: string
 *                      value: Contoso Billing
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 0.578
 *                          "y": 9.2967
 *                        - x: 1.5949
 *                          "y": 9.3099
 *                        - x: 1.5927
 *                          "y": 9.483
 *                        - x: 0.5758
 *                          "y": 9.4699
 *                      content: Contoso Billing
 *                      spans:
 *                      - offset: 700
 *                        length: 15
 *                      confidence: 0.938
 *                    ServiceAddress:
 *                      kind: address
 *                      value:
 *                        houseNumber: '123'
 *                        road: Service St
 *                        city: Redmond
 *                        state: WA
 *                        postalCode: '98052'
 *                        streetAddress: 123 Service St
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 6.1983
 *                          "y": 4.3637
 *                        - x: 7.6452
 *                          "y": 4.3637
 *                        - x: 7.6452
 *                          "y": 4.7266
 *                        - x: 6.1983
 *                          "y": 4.7266
 *                      content: |-
 *                        123 Service St,
 *                        Redmond WA, 98052
 *                      spans:
 *                      - offset: 354
 *                        length: 15
 *                      - offset: 406
 *                        length: 17
 *                      confidence: 0.888
 *                    ServiceAddressRecipient:
 *                      kind: string
 *                      value: Microsoft Services
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 6.1983
 *                          "y": 4.1488
 *                        - x: 7.4542
 *                          "y": 4.1489
 *                        - x: 7.4542
 *                          "y": 4.3112
 *                        - x: 6.1983
 *                          "y": 4.3111
 *                      content: Microsoft Services
 *                      spans:
 *                      - offset: 309
 *                        length: 18
 *                      confidence: 0.936
 *                    ShippingAddress:
 *                      kind: address
 *                      value:
 *                        houseNumber: '123'
 *                        road: Ship St
 *                        city: Redmond
 *                        state: WA
 *                        postalCode: '98052'
 *                        streetAddress: 123 Ship St
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 3.3284
 *                          "y": 4.3589
 *                        - x: 4.7705
 *                          "y": 4.3589
 *                        - x: 4.7705
 *                          "y": 4.7218
 *                        - x: 3.3284
 *                          "y": 4.7218
 *                      content: |-
 *                        123 Ship St,
 *                        Redmond WA, 98052
 *                      spans:
 *                      - offset: 341
 *                        length: 12
 *                      - offset: 388
 *                        length: 17
 *                      confidence: 0.888
 *                    ShippingAddressRecipient:
 *                      kind: string
 *                      value: Microsoft Delivery
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 3.3189
 *                          "y": 4.1429
 *                        - x: 4.589
 *                          "y": 4.1536
 *                        - x: 4.5876
 *                          "y": 4.3257
 *                        - x: 3.3174
 *                          "y": 4.3151
 *                      content: Microsoft Delivery
 *                      spans:
 *                      - offset: 290
 *                        length: 18
 *                      confidence: 0.937
 *                    SubTotal:
 *                      kind: currency
 *                      value:
 *                        amount: 100
 *                        currencySymbol: "$"
 *                        currencyCode: USD
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 7.3635
 *                          "y": 6.6124
 *                        - x: 7.9174
 *                          "y": 6.6124
 *                        - x: 7.9174
 *                          "y": 6.7652
 *                        - x: 7.3635
 *                          "y": 6.7747
 *                      content: "$100.00"
 *                      spans:
 *                      - offset: 579
 *                        length: 7
 *                      confidence: 0.97
 *                    TotalTax:
 *                      kind: currency
 *                      value:
 *                        amount: 10
 *                        currencySymbol: "$"
 *                        currencyCode: USD
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 7.4447
 *                          "y": 6.9084
 *                        - x: 7.9222
 *                          "y": 6.9036
 *                        - x: 7.9174
 *                          "y": 7.0707
 *                        - x: 7.4447
 *                          "y": 7.0707
 *                      content: "$10.00"
 *                      spans:
 *                      - offset: 597
 *                        length: 6
 *                      confidence: 0.97
 *                    VendorAddress:
 *                      kind: address
 *                      value:
 *                        houseNumber: '123'
 *                        road: 456th St
 *                        city: New York
 *                        state: NY
 *                        postalCode: '10001'
 *                        streetAddress: 123 456th St
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 0.5683
 *                          "y": 1.6042
 *                        - x: 1.9961
 *                          "y": 1.6042
 *                        - x: 1.9961
 *                          "y": 1.9813
 *                        - x: 0.5683
 *                          "y": 1.9813
 *                      content: |-
 *                        123 456th St
 *                        New York, NY, 10001
 *                      spans:
 *                      - offset: 59
 *                        length: 12
 *                      - offset: 89
 *                        length: 19
 *                      confidence: 0.887
 *                    VendorAddressRecipient:
 *                      kind: string
 *                      value: Contoso Headquarters
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 0.573
 *                          "y": 1.3922
 *                        - x: 2.1115
 *                          "y": 1.3989
 *                        - x: 2.1107
 *                          "y": 1.5798
 *                        - x: 0.5723
 *                          "y": 1.5731
 *                      content: Contoso Headquarters
 *                      spans:
 *                      - offset: 21
 *                        length: 20
 *                      confidence: 0.938
 *                    VendorName:
 *                      kind: string
 *                      value: CONTOSO LTD.
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 0.5827
 *                          "y": 0.6523
 *                        - x: 2.3318
 *                          "y": 0.6636
 *                        - x: 2.3303
 *                          "y": 0.8912
 *                        - x: 0.5812
 *                          "y": 0.8799
 *                      content: CONTOSO LTD.
 *                      spans:
 *                      - offset: 0
 *                        length: 12
 *                      confidence: 0.937
 *       400:
 *         description: Missing or invalid URL parameter.
 *       500:
 *         description: Internal server error.
 */
app.post('/analyze-invoice', async (req, res) => {

    const invoiceUrl = req.body.url; 

    if (!invoiceUrl) {
        return res.status(400).json({ message: "url parameter is missing" });  
    }

    try {
        const invoiceData = await analyzeInvoice(invoiceUrl);
        res.status(200).json(invoiceData); 
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

/**
 * @swagger
 * /analyze-receipt:
 *   post:
 *     summary: Analyze a receipt document
 *     description: Analyzes the receipt and returns structured data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL of the receipt document to analyze.
 *                 example: "https://raw.githubusercontent.com/Azure/azure-sdk-for-python/main/sdk/formrecognizer/azure-ai-formrecognizer/tests/sample_forms/receipt/contoso-receipt.png"
 *     responses:
 *       200:
 *         description: Successfully analyzed the receipt.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                    Items:
 *                      kind: array
 *                      values:
 *                      - kind: object
 *                        properties:
 *                          Description:
 *                            kind: string
 *                            value: Surface Pro 6
 *                            boundingRegions:
 *                            - pageNumber: 1
 *                              polygon:
 *                              - x: 373
 *                                "y": 1559
 *                              - x: 672
 *                                "y": 1559
 *                              - x: 672
 *                                "y": 1621
 *                              - x: 373
 *                                "y": 1621
 *                            content: Surface Pro 6
 *                            spans:
 *                            - offset: 103
 *                              length: 13
 *                            confidence: 0.985
 *                          Quantity:
 *                            kind: number
 *                            value: 1
 *                            boundingRegions:
 *                            - pageNumber: 1
 *                              polygon:
 *                              - x: 335
 *                                "y": 1558
 *                              - x: 361
 *                                "y": 1559
 *                              - x: 361
 *                                "y": 1620
 *                              - x: 335
 *                                "y": 1620
 *                            content: '1'
 *                            spans:
 *                            - offset: 101
 *                              length: 1
 *                            confidence: 0.991
 *                          TotalPrice:
 *                            kind: number
 *                            value: 999
 *                            boundingRegions:
 *                            - pageNumber: 1
 *                              polygon:
 *                              - x: 933
 *                                "y": 1790
 *                              - x: 1131
 *                                "y": 1791
 *                              - x: 1131
 *                                "y": 1860
 *                              - x: 933
 *                                "y": 1859
 *                            content: "$ 999.00"
 *                            spans:
 *                            - offset: 157
 *                              length: 8
 *                            confidence: 0.989
 *                        boundingRegions:
 *                        - pageNumber: 1
 *                          polygon:
 *                          - x: 335
 *                            "y": 1558
 *                          - x: 1132
 *                            "y": 1562
 *                          - x: 1131
 *                            "y": 1860
 *                          - x: 334
 *                            "y": 1856
 *                        content: |-
 *                          1 Surface Pro 6
 *                          256GB / Intel Core i5 /
 *                          8GB RAM (Black)
 *                          $ 999.00
 *                        spans:
 *                        - offset: 101
 *                          length: 64
 *                        confidence: 0.99
 *                      - kind: object
 *                        properties:
 *                          Description:
 *                            kind: string
 *                            value: SurfacePen
 *                            boundingRegions:
 *                            - pageNumber: 1
 *                              polygon:
 *                              - x: 361
 *                                "y": 2017
 *                              - x: 630
 *                                "y": 2012
 *                              - x: 632
 *                                "y": 2079
 *                              - x: 361
 *                                "y": 2083
 *                            content: SurfacePen
 *                            spans:
 *                            - offset: 168
 *                              length: 10
 *                            confidence: 0.984
 *                          Quantity:
 *                            kind: number
 *                            value: 1
 *                            boundingRegions:
 *                            - pageNumber: 1
 *                              polygon:
 *                              - x: 318
 *                                "y": 2018
 *                              - x: 348
 *                                "y": 2017
 *                              - x: 348
 *                                "y": 2084
 *                              - x: 318
 *                                "y": 2084
 *                            content: '1'
 *                            spans:
 *                            - offset: 166
 *                              length: 1
 *                            confidence: 0.991
 *                          TotalPrice:
 *                            kind: number
 *                            value: 99.99
 *                            boundingRegions:
 *                            - pageNumber: 1
 *                              polygon:
 *                              - x: 966
 *                                "y": 2023
 *                              - x: 1127
 *                                "y": 2024
 *                              - x: 1127
 *                                "y": 2097
 *                              - x: 965
 *                                "y": 2095
 *                            content: "$99.99"
 *                            spans:
 *                            - offset: 179
 *                              length: 6
 *                            confidence: 0.989
 *                        boundingRegions:
 *                        - pageNumber: 1
 *                          polygon:
 *                          - x: 317
 *                            "y": 2017
 *                          - x: 1127
 *                            "y": 2004
 *                          - x: 1128
 *                            "y": 2097
 *                          - x: 318
 *                            "y": 2110
 *                        content: |-
 *                          1 SurfacePen
 *                          $99.99
 *                        spans:
 *                        - offset: 166
 *                          length: 19
 *                        confidence: 0.987
 *                    MerchantAddress:
 *                      kind: address
 *                      value:
 *                        houseNumber: '123'
 *                        road: Main Street
 *                        city: Redmond
 *                        state: WA
 *                        postalCode: '98052'
 *                        streetAddress: 123 Main Street
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 314
 *                          "y": 690
 *                        - x: 754
 *                          "y": 696
 *                        - x: 752
 *                          "y": 865
 *                        - x: 312
 *                          "y": 859
 *                      content: |-
 *                        123 Main Street
 *                        Redmond, WA 98052
 *                      spans:
 *                      - offset: 16
 *                        length: 33
 *                      confidence: 0.984
 *                    MerchantName:
 *                      kind: string
 *                      value: Contoso
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 327
 *                          "y": 589
 *                        - x: 497
 *                          "y": 602
 *                        - x: 494
 *                          "y": 653
 *                        - x: 324
 *                          "y": 641
 *                      content: Contoso
 *                      spans:
 *                      - offset: 8
 *                        length: 7
 *                      confidence: 0.972
 *                    MerchantPhoneNumber:
 *                      kind: phoneNumber
 *                      value: "+11234567890"
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 306
 *                          "y": 1005
 *                        - x: 614
 *                          "y": 1010
 *                        - x: 614
 *                          "y": 1069
 *                        - x: 306
 *                          "y": 1065
 *                      content: 123-456-7890
 *                      spans:
 *                      - offset: 50
 *                        length: 12
 *                      confidence: 0.993
 *                    Subtotal:
 *                      kind: number
 *                      value: 1098.99
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 924
 *                          "y": 2258
 *                        - x: 1133
 *                          "y": 2254
 *                        - x: 1134
 *                          "y": 2321
 *                        - x: 925
 *                          "y": 2325
 *                      content: "$ 1098.99"
 *                      spans:
 *                      - offset: 196
 *                        length: 9
 *                      confidence: 0.98
 *                    Total:
 *                      kind: number
 *                      value: 1203.39
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 919
 *                          "y": 2584
 *                        - x: 1126
 *                          "y": 2611
 *                        - x: 1116
 *                          "y": 2685
 *                        - x: 909
 *                          "y": 2658
 *                      content: "$ 1203.39"
 *                      spans:
 *                      - offset: 225
 *                        length: 9
 *                      confidence: 0.958
 *                    TotalTax:
 *                      kind: number
 *                      value: 104.4
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 937
 *                          "y": 2370
 *                        - x: 1127
 *                          "y": 2366
 *                        - x: 1128
 *                          "y": 2435
 *                        - x: 938
 *                          "y": 2439
 *                      content: "$ 104.40"
 *                      spans:
 *                      - offset: 210
 *                        length: 8
 *                      confidence: 0.992
 *                    TransactionDate:
 *                      kind: date
 *                      value: '2019-06-10T00:00:00.000Z'
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 302
 *                          "y": 1219
 *                        - x: 502
 *                          "y": 1221
 *                        - x: 501
 *                          "y": 1292
 *                        - x: 300
 *                          "y": 1291
 *                      content: 6/10/2019
 *                      spans:
 *                      - offset: 63
 *                        length: 9
 *                      confidence: 0.988
 *                    TransactionTime:
 *                      kind: time
 *                      value: '13:59:00'
 *                      boundingRegions:
 *                      - pageNumber: 1
 *                        polygon:
 *                        - x: 516
 *                          "y": 1221
 *                        - x: 629
 *                          "y": 1222
 *                        - x: 629
 *                          "y": 1293
 *                        - x: 515
 *                          "y": 1292
 *                      content: '13:59'
 *                      spans:
 *                      - offset: 73
 *                        length: 5
 *                      confidence: 0.995
 *       400:
 *         description: Missing or invalid URL parameter.
 *       500:
 *         description: Internal server error.
 */
app.post('/analyze-receipt', async (req, res) => {

    const receiptUrl = req.body.url; 

    if (!receiptUrl) {
        return res.status(400).json({ message: "url parameter is missing" }); 
    }

    try {
        const receiptData = await analyzeReceipt(receiptUrl);
        res.status(200).json(receiptData); 
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});

/**
 * @swagger
 * /analyze-business-card:
 *   post:
 *     summary: Analyze a business card document
 *     description: Analyzes the business card and returns structured data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL of the business card document to analyze.
 *                 example: "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/business-card-english.jpg"
 *     responses:
 *       200:
 *         description: Successfully analyzed the business card.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example: 
 *                    Addresses:
 *                      kind: array
 *                      values:
 *                      - kind: address
 *                        value:
 *                          houseNumber: '2'
 *                          road: Kingdom Street
 *                          city: London
 *                          postalCode: W2 6BD
 *                          streetAddress: 2 Kingdom Street
 *                          suburb: Paddington
 *                        boundingRegions:
 *                        - pageNumber: 1
 *                          polygon:
 *                          - x: 1229
 *                            "y": 2136
 *                          - x: 2505
 *                            "y": 1678
 *                          - x: 2583
 *                            "y": 1896
 *                          - x: 1307
 *                            "y": 2354
 *                        content: |-
 *                          2 Kingdom Street
 *                          Paddington, London, W2 6BD
 *                        spans:
 *                        - offset: 190
 *                          length: 43
 *                        confidence: 0.968
 *                    CompanyNames:
 *                      kind: array
 *                      values:
 *                      - kind: string
 *                        value: Contoso
 *                        boundingRegions:
 *                        - pageNumber: 1
 *                          polygon:
 *                          - x: 1146
 *                            "y": 1896
 *                          - x: 2246
 *                            "y": 1589
 *                          - x: 2293
 *                            "y": 1753
 *                          - x: 1201
 *                            "y": 2109
 *                        content: Contoso
 *                        spans:
 *                        - offset: 182
 *                          length: 7
 *                        confidence: 0.895
 *                    ContactNames:
 *                      kind: array
 *                      values:
 *                      - kind: object
 *                        properties:
 *                          FirstName:
 *                            kind: string
 *                            value: Avery
 *                            boundingRegions:
 *                            - pageNumber: 1
 *                              polygon:
 *                              - x: 681
 *                                "y": 1098
 *                              - x: 1108
 *                                "y": 998
 *                              - x: 1136
 *                                "y": 1115
 *                              - x: 707
 *                                "y": 1211
 *                            content: Avery
 *                            spans:
 *                            - offset: 4
 *                              length: 5
 *                            confidence: 0.989
 *                          LastName:
 *                            kind: string
 *                            value: Smith
 *                            boundingRegions:
 *                            - pageNumber: 1
 *                              polygon:
 *                              - x: 1162
 *                                "y": 985
 *                              - x: 1565
 *                                "y": 884
 *                              - x: 1596
 *                                "y": 992
 *                              - x: 1190
 *                                "y": 1101
 *                            content: Smith
 *                            spans:
 *                            - offset: 10
 *                              length: 5
 *                            confidence: 0.989
 *                        boundingRegions:
 *                        - pageNumber: 1
 *                          polygon:
 *                          - x: 421
 *                            "y": 1146
 *                          - x: 1571
 *                            "y": 883
 *                          - x: 1600
 *                            "y": 1009
 *                          - x: 450
 *                            "y": 1272
 *                        content: Dr. Avery Smith
 *                        spans:
 *                        - offset: 0
 *                          length: 15
 *                        confidence: 0.984
 *                    Departments:
 *                      kind: array
 *                      values:
 *                      - kind: string
 *                        value: Cloud & Al Department
 *                        boundingRegions:
 *                        - pageNumber: 1
 *                          polygon:
 *                          - x: 478
 *                            "y": 1410
 *                          - x: 1582
 *                            "y": 1139
 *                          - x: 1601
 *                            "y": 1218
 *                          - x: 497
 *                            "y": 1489
 *                        content: Cloud & Al Department
 *                        spans:
 *                        - offset: 34
 *                          length: 21
 *                        confidence: 0.973
 *                    Emails:
 *                      kind: array
 *                      values:
 *                      - kind: string
 *                        value: avery.smith@contoso.com
 *                        boundingRegions:
 *                        - pageNumber: 1
 *                          polygon:
 *                          - x: 2104
 *                            "y": 936
 *                          - x: 2905
 *                            "y": 707
 *                          - x: 2925
 *                            "y": 761
 *                          - x: 2122
 *                            "y": 992
 *                        content: avery.smith@contoso.com
 *                        spans:
 *                        - offset: 56
 *                          length: 23
 *                        confidence: 0.988
 *                    Faxes:
 *                      kind: array
 *                      values:
 *                      - kind: phoneNumber
 *                        value: "+442067892345"
 *                        boundingRegions:
 *                        - pageNumber: 1
 *                          polygon:
 *                          - x: 2518
 *                            "y": 1195
 *                          - x: 3188
 *                            "y": 984
 *                          - x: 3211
 *                            "y": 1058
 *                          - x: 2541
 *                            "y": 1269
 *                        content: "+44 (0) 20 6789 2345"
 *                        spans:
 *                        - offset: 161
 *                          length: 20
 *                        confidence: 0.987
 *                    JobTitles:
 *                      kind: array
 *                      values:
 *                      - kind: string
 *                        value: Senior Researcher
 *                        boundingRegions:
 *                        - pageNumber: 1
 *                          polygon:
 *                          - x: 449
 *                            "y": 1302
 *                          - x: 1310
 *                            "y": 1103
 *                          - x: 1330
 *                            "y": 1189
 *                          - x: 469
 *                            "y": 1388
 *                        content: Senior Researcher
 *                        spans:
 *                        - offset: 16
 *                          length: 17
 *                        confidence: 0.988
 *                    MobilePhones:
 *                      kind: array
 *                      values:
 *                      - kind: phoneNumber
 *                        value: "+447911123456"
 *                        boundingRegions:
 *                        - pageNumber: 1
 *                          polygon:
 *                          - x: 2426
 *                            "y": 1039
 *                          - x: 3064
 *                            "y": 844
 *                          - x: 3087
 *                            "y": 917
 *                          - x: 2449
 *                            "y": 1112
 *                        content: "+44 (0) 7911 123456"
 *                        spans:
 *                        - offset: 110
 *                          length: 19
 *                        confidence: 0.987
 *                    Websites:
 *                      kind: array
 *                      values:
 *                      - kind: string
 *                        value: https://www.contoso.com/
 *                        boundingRegions:
 *                        - pageNumber: 1
 *                          polygon:
 *                          - x: 2116
 *                            "y": 1005
 *                          - x: 2986
 *                            "y": 761
 *                          - x: 3004
 *                            "y": 821
 *                          - x: 2135
 *                            "y": 1072
 *                        content: https://www.contoso.com/
 *                        spans:
 *                        - offset: 80
 *                          length: 24
 *                        confidence: 0.989
 *                    WorkPhones:
 *                      kind: array
 *                      values:
 *                      - kind: phoneNumber
 *                        value: "+442098765432"
 *                        boundingRegions:
 *                        - pageNumber: 1
 *                          polygon:
 *                          - x: 2464
 *                            "y": 1121
 *                          - x: 3129
 *                            "y": 909
 *                          - x: 3153
 *                            "y": 984
 *                          - x: 2488
 *                            "y": 1195
 *                        content: "+44 (0) 20 9876 5432"
 *                        spans:
 *                        - offset: 135
 *                          length: 20
 *                        confidence: 0.985
 *       400:
 *         description: Missing or invalid URL parameter.
 *       500:
 *         description: Internal server error.
 */
app.post('/analyze-business-card', async (req, res) => {

    const businessCardURL = req.body.url; 

    if (!businessCardURL) {
        return res.status(400).json({ message: "url parameter is missing" });  
    }

    try {
        const businessCardData = await analyzeBusinessCard(businessCardURL);
        res.status(200).json(businessCardData); 
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

