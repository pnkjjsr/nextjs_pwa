exports.googleSheet = (code, type) => {
  const fs = require("fs");
  const readline = require("readline");
  const { google } = require("googleapis");

  const sheetCode = code;
  const ministerType = type;

  return new Promise((resolve, reject) => {
    // If modifying these scopes, delete token.json.
    const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
    // https://neta-62fcb.firebaseapp.com/__/auth/handler?code=4/sgGp27COcK2z5CtPjxpdvZtIgOhqtRq88WWuGSv9GNb6dsOpO3eK8MP4oscdaToFRyGE_mjaU7q6XYWZ4eE1iTo&scope=https://www.googleapis.com/auth/spreadsheets.readonly
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    const TOKEN_PATH = "token.json";

    // Load client secrets from a local file.
    fs.readFile("credentials.json", (err, content) => {
      if (err) return reject("Error loading client secret file:", err);
      // Authorize a client with credentials, then call the Google Sheets API.
      authorize(JSON.parse(content), listMajors);
    });

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
      const { client_secret, client_id, redirect_uris } = credentials.web;
      const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
      );

      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
      });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    function getNewToken(oAuth2Client, callback) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES
      });
      console.log("Authorize this app by visiting this url:", authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question("Enter the code from that page here: ", code => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
          if (err)
            return reject(
              "Error while trying to retrieve access token",
              err
            );
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {
            if (err) return reject(err);
            console.log("Token stored to", TOKEN_PATH);
          });
          callback(oAuth2Client);
        });
      });
    }

    /**
     * Get data from sheet
     * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
     * @param {google.auth.OAuth2} Gauth The authenticated Google OAuth client.
     */

    function listMajors(auth) {
      const sheets = google.sheets({
        version: "v4",
        auth
      });
      sheets.spreadsheets.values.get(
        {
          spreadsheetId: sheetCode,
          range: `${ministerType}!A2:P`
        },
        (err, res) => {
          if (err) return reject("The API returned an error: " + err);
          let rows = res.data.values;
          resolve(rows);
        }
      );
    }
  });
};
