const express = require("express");
const router = express.Router();
const { getAllGames } = require("../controllers/gameController");

router.get("/", getAllGames);

router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
