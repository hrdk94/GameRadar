const express = require("express");
const router = express.Router();
const { getComments, postComment } = require("../controllers/commentController");

// Get all comments for a game
router.get("/:gameId", getComments);

// Post a comment
router.post("/", postComment);

module.exports = router;
