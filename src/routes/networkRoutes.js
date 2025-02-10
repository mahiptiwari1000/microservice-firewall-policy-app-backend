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
    await Node.insertMany(nodes,  { ordered: false });
    await Link.insertMany(links,  { ordered: false });
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

router.delete("/link/:source/:target", async (req, res) => {
    try {
        const { source, target } = req.params;

        await Link.deleteOne({ source, target });

        res.json({ message: `Link from ${source} to ${target} deleted successfully!` });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete link" });
    }
});



module.exports = router;
