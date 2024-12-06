const {
    AzureKeyCredential,
    DocumentAnalysisClient,
  } = require("@azure/ai-form-recognizer");
  require('dotenv').config();

  
  const key = process.env.AZURE_FORM_RECOGNIZER_KEY;
  const endpoint = process.env.AZURE_FORM_RECOGNIZER_ENDPOINT;
   
  //const businessCardURL = "https://raw.githubusercontent.com/Azure-Samples/cognitive-services-REST-api-samples/master/curl/form-recognizer/business-card-english.jpg"  

  module.exports = async function main(businessCardURL) {
   const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

   const poller = await client.beginAnalyzeDocument("prebuilt-businessCard", businessCardURL);

   const {
     documents: [result]
   } = await poller.pollUntilDone();
  
    if (result) {
      const businessCard = result.fields;
      const name = businessCard.ContactNames && businessCard.ContactNames.values[0];
      if (name) {
        const { FirstName, LastName } = name.properties;
      }
  
      const company = businessCard.CompanyNames && businessCard.CompanyNames.values[0];
  
      const address = businessCard.Addresses && businessCard.Addresses.values[0];
      return businessCard;
    } else {
      throw new Error("Expected at least one business card in the result.");
    }
  }
