
const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
require('dotenv').config();


const key = process.env.AZURE_FORM_RECOGNIZER_KEY;
const endpoint = process.env.AZURE_FORM_RECOGNIZER_ENDPOINT;
 
 //const receiptURL = "https://raw.githubusercontent.com/Azure/azure-sdk-for-python/main/sdk/formrecognizer/azure-ai-formrecognizer/tests/sample_forms/receipt/contoso-receipt.png"
 
 module.exports = async function main(receiptURL) {
   
   const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

   const poller = await client.beginAnalyzeDocument("prebuilt-receipt", receiptURL);

   const {
     documents: [result]
   } = await poller.pollUntilDone();
 
   if (result) {
    const receipt = result.fields;
    return receipt;
  } else {
    throw new Error("Expected at least one receipt in the result.");
  }
   
}
 