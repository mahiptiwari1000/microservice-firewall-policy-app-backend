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

router.delete("/node/:id", async (req, res) => {
    try {
        const nodeId = req.params.id;
        
        await Node.findOneAndDelete({ id: nodeId });

        await Link.deleteMany({ $or: [{ source: nodeId }, { target: nodeId }] });

        res.json({ message: `Node ${nodeId} and its associated links deleted successfully!` });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete node" });
    }
});

router.delete("/link/:id", async (req, res) => {
    try {
        const linkId = req.params.id;
        await Link.findByIdAndDelete(linkId);
        res.json({ message: "Link deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete link" });
    }
});


module.exports = router;
