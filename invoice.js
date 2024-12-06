
const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
require('dotenv').config();


const key = process.env.AZURE_FORM_RECOGNIZER_KEY;
const endpoint = process.env.AZURE_FORM_RECOGNIZER_ENDPOINT;

//const invoiceUrl = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/sample-invoice.pdf";

module.exports = async function main(invoiceUrl) {

    const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

    const poller = await client.beginAnalyzeDocument("prebuilt-invoice", invoiceUrl);

    const {
        documents: [result]
    } = await poller.pollUntilDone();

    if (result) {
        const invoice = result.fields;
        return invoice;
    } else {
        throw new Error("Expected at least one receipt in the result.");
    }
}

