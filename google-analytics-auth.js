const { google } = require("googleapis");
const key = require("./google-keys.json");

const scopes = ["https://www.googleapis.com/auth/analytics.readonly"];
const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  scopes
);

module.exports = jwtClient;
