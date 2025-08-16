const express = require("express");
const router = express.Router();
const { getAllGames } = require("../controllers/gameController");
const Game = require("../models/games");
const verifyToken = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

// @route   GET /api/games
// @desc    Get all games
// @access  Private
router.get("/", verifyToken, getAllGames);

// @route   GET /api/games/:id
// @desc    Get game by ID
// @access  Private
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid game ID format" });
    }

    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    res.json(game);
  } catch (err) {
    console.error("Error fetching game:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
