const fetch = require('node-fetch');
require('dotenv').config();

async function getIGDBToken() {
  const response = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: "client_credentials"
    }),
  });

  const data = await response.json();
  return data.access_token;
}

module.exports = { getIGDBToken };
