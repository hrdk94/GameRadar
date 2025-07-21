const comment = require("../models/comment");
const mongoose = require("mongoose");

console.log("Comment model loaded:", comment);

// Get comments for a game
const getComments = async (req, res) => {
  try {
    const gameObjectId = new mongoose.Types.ObjectId(req.params.gameId);
    const comments = await comment.find({ gameId: gameObjectId });
    res.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err.message);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

// Post a comment
const postComment = async (req, res) => {
  try {
    const { gameId, userId, username, text } = req.body;
    console.log("Incoming comment:", req.body);
    const newComment = await comment.create({ gameId, userId, username, text});
    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error posting comment:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getComments, postComment };
