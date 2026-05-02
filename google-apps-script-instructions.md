# Google Sheets Integration Guide

Follow these steps to set up the Google Apps Script so your React app can submit data directly to your Google Sheet.

## 1. Open Your Google Sheet
Go to the Google Sheet URL you provided: 
[https://docs.google.com/spreadsheets/d/1tgr0dZ2V40GLKKKVjFzmNGc9_eXmeGvcqi0D2iZvA1Y/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1tgr0dZ2V40GLKKKVjFzmNGc9_eXmeGvcqi0D2iZvA1Y/edit?usp=sharing)

## 2. Prepare the Sheet
In the first row (Row 1) of "Sheet1", create the following headers:
- Cell A1: **Timestamp**
- Cell B1: **First Name**
- Cell C1: **Last Name**
- Cell D1: **Email**
- Cell E1: **Raion Profile URL**

## 3. Open Apps Script Editor
In the Google Sheets menu, click on **Extensions** > **Apps Script**.

## 4. Paste the Code
Replace any existing code in `Code.gs` with the following:

```javascript
const SHEET_NAME = 'Sheet1'; // Change this if your sheet is named differently

function doPost(e) {
  try {
    // Open the spreadsheet and get the correct sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    // Parse the incoming JSON payload (if it comes as JSON)
    let payload;
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else {
      payload = e.parameter;
    }
    
    // Extract the values
    const firstName = payload.firstName || '';
    const lastName = payload.lastName || '';
    const email = payload.email || '';
    const raionUrl = payload.raionUrl || '';
    
    // Append the data as a new row along with a timestamp
    sheet.appendRow([
      new Date(), // Timestamp
      firstName,
      lastName,
      email,
      raionUrl
    ]);
    
    // Return a JSON response
    return ContentService.createTextOutput(JSON.stringify({"status": "success", "message": "Data saved"}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return an error if something fails
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Added so the endpoint doesn't fail on a standard browser GET test
function doGet(e) {
  return ContentService.createTextOutput("The endpoint is running. Please use POST to submit data.");
}
```

## 5. Deploy as Web App
1. Click the blue **Deploy** button at the top right of the Apps Script interface.
2. Select **New deployment**.
3. Under "Select type" (the gear icon), check **Web app**.
4. In the configuration:
   - **Description**: Add a description (e.g., "Registration API").
   - **Execute as**: Select **Me**.
   - **Who has access**: Select **Anyone**. *(This is required for public form submissions without authentication).*
5. Click **Deploy**.
6. Google will ask for authorization. Click **Authorize access**, choose your account, click **Advanced** (at the bottom), and then **Go to Untitled project (unsafe)**. Finally, click **Allow**.

## 6. Copy the Webhook URL
Once deployed, you will see a window with your **Web app URL** (it starts with `https://script.google.com/macros/s/...`). 
**Copy this URL.**

## 7. Update Your React Application
In your project, open `/src/LandingPage.tsx` and replace `YOUR_GOOGLE_APPS_SCRIPT_WEBHOOK_URL_HERE` with the URL you just copied:

```typescript
const WEBHOOK_URL = 'https://script.google.com/macros/s/.../exec';
```

Done! Your React app will now save registrants directly into your Google Sheet.
