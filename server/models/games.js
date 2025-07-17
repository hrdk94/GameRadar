const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    iconUrl:{
        type: String,
        required: true
    },
    developer: {
        type: String,
    },
    platforms: {
        type: String,
    },
    isMultiplayer: {
        type: Boolean,
        required: true,
        default: false
    }
});
const Game =mongoose.model("Game", gameSchema);
module.exports =Game;