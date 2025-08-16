const fetch = require('node-fetch');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { getIGDBToken } = require('./utils/igdb');
const Game = require('./models/games');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

async function fetchGamesBatch(token, offset) {
  const response = await fetch("https://api.igdb.com/v4/games", {
    method: "POST",
    headers: {
      "Client-ID": process.env.TWITCH_CLIENT_ID,
      "Authorization": `Bearer ${token}`,
    },
    body: `
      fields name, summary, cover.image_id, platforms.name, multiplayer_modes.*, 
             involved_companies.company.name, first_release_date, genres.name, rating, videos.video_id; 
      where cover != null; 
      limit 500; 
      offset ${offset};
    `
  });

  return response.json();
}

async function seedGames() {
  try {
    const token = await getIGDBToken();
    await Game.deleteMany({}); 

    let totalAdded = 0;
    for (let offset = 0; offset < 10000; offset += 500) {
      const games = await fetchGamesBatch(token, offset);
      if (!games.length) break; 

      const formatted = games.map(game => ({
        name: game.name,
        description: game.summary || "No description",
        iconUrl: `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`,
        developer: game.involved_companies?.[0]?.company?.name || "Unknown",
        platforms: game.platforms?.map(p => p.name) || [],
        isMultiplayer: game.multiplayer_modes?.length > 0,
        releaseDate: game.first_release_date ? new Date(game.first_release_date * 1000) : null,
        genres: game.genres?.map(g => g.name) || [],
        rating: game.rating || null,
        trailer: game.videos?.length ? `https://www.youtube.com/watch?v=${game.videos[0].video_id}` : null
      }));

      await Game.insertMany(formatted);
      totalAdded += formatted.length;
      console.log(`Added ${totalAdded} games so far...`);
    }

    console.log(" Game seeding complete.");
    process.exit();
  } catch (err) {
    console.error("Error seeding games:", err);
    process.exit(1);
  }
}

seedGames();
