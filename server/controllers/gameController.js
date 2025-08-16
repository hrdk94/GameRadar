const Game = require("../models/games");

const getAllGames = async (req, res) => {
  try {
    const { page = 1, limit = 50, search = "" } = req.query;

    const query = search
      ? { name: { $regex: search, $options: "i" } } // case-insensitive search
      : {};

    const totalGames = await Game.countDocuments(query);
    const totalPages = Math.ceil(totalGames / limit);
    
    const games = await Game.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("name description iconUrl"); // minimal data for list

    res.json({ games, totalPages });
  } catch (err) {
    console.error("Error fetching games:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllGames };
