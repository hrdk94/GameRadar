const express = require("express");
const router = express.Router();
const { getComments, postComment } = require("../controllers/commentController");
const verifyToken = require("../middleware/authMiddleware");

// Get all comments for a game
router.get("/:gameId", getComments);

// Post a comment
router.post("/",verifyToken, postComment);

module.exports = router;
