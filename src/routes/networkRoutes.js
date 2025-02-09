const express = require("express");
const router = express.Router();
const Node = require("../models/Node");
const Link = require("../models/Link");

router.get("/", async (req, res) => {
    const nodes = await Node.find();
    const links = await Link.find();
    res.json({ nodes, links });
});

router.post("/", async (req, res) => {
    const { nodes, links } = req.body;
    await Node.insertMany(nodes);
    await Link.insertMany(links);
    res.json({ message: "Network data saved!" });
});

module.exports = router;
