const Game = require("../models/games");

const getAllGames = async (req, res) => {
    try {
        const games = await Game.find().select("name description iconUrl"); // minimal data for list
        res.json(games);
    } catch (err) {
        console.error("Error fetching games:", err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getAllGames };
