const express = require("express");
const router = express.Router();
const { getAllGames } = require("../controllers/gameController");
const Game = require('../models/games');
const verifyToken = require("../middleware/authMiddleware");

router.get("/",verifyToken, getAllGames);

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
