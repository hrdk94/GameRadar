const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    iconUrl: {
        type: String,
        required: true
    },
    developer: {
        type: String,
        default: "Unknown"
    },
    platforms: {
        type: [String],
        default: []
    },
    isMultiplayer: {
        type: Boolean,
        required: true,
        default: false
    },
    releaseDate: {
        type: Date,
        default: null
    },
    genres: {
        type: [String], 
        default: []
    },
    rating: {
        type: Number,
        default: null
    },
    trailer: {
        type: String,
        default: null
    }
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
