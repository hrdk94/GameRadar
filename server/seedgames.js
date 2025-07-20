const mongoose = require('mongoose');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const { getIGDBToken } = require('./utils/igdb');
const Game = require('./models/games');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

async function seedGames() {
  try {
    const token = await getIGDBToken();

    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.TWITCH_CLIENT_ID,
        "Authorization": `Bearer ${token}`,
      },
      body: `
        fields name, summary, cover.image_id, platforms.name, multiplayer_modes.*, involved_companies.company.name; 
        where cover != null; 
        limit 250;
      `
    });

    const data = await response.json();

    for (let game of data) {
      await Game.create({
        name: game.name,
        description: game.summary || "No description",
        iconUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`,
        Developer: game.involved_companies?.[0]?.company?.name || "Unknown",
        platforms: game.platforms?.map(p => p.name).join(", ") || "N/A",
        isMultiplayer: game.multiplayer_modes?.length > 0
      });
    }

    console.log("Game seeding complete.");
    process.exit();
  } catch (err) {
    console.error("Error seeding games:", err);
    process.exit(1);
  }
}

seedGames();
