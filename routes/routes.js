const express = require("express");
const router = express.Router();
const Anime = require("../models/Anime");

router.get("/", async (req, res) => {
    const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=3");
    const data = await response.json();

    res.render("index", {
        recommendations: data.data
    });
});

router.get("/help", (req, res) => { res.render("help"); });

router.get("/list", async (req, res) => { 
    const savedAnime = await Anime.find();
    res.render("list", { savedAnime: savedAnime }); 
});

router.post("/search", async (req, res) => {
    const searchTerm = req.body.searchTerm;
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchTerm)}&limit=15`);
    const data = await response.json();
    
    res.render("results", { results: data.data });
});

router.post("/add", async (req, res) => {
    const anime = new Anime({
        malid: req.body.malid,
        title: req.body.title,
        imageURL: req.body.imageURL,
        score: req.body.score,
        episodes: req.body.episodes,
        status: req.body.status,
    });
    
    await anime.save();
    res.json({ message: "Anime added to watchlist" });
});

router.post("/delete", async (req, res) => {
    await Anime.deleteOne({ _id: req.body.id });
    res.json({ message: "Anime removed from watchlist "});
});

router.post("/clear", async (req, res) => {
    await Anime.deleteMany({});
    res.redirect("/list"); 
});

module.exports = router;