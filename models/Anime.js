const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
    malid: Number,
    title: String,
    imageURL: String,
    score: Number,
    episodes: Number,
    status: String,
});

module.exports = mongoose.model("Anime", animeSchema, "Watchlist");