const express = require("express");
const router = express.Router();
const Log = require("../models/Log");

router.get("/", async (req, res) => {
    const logs = await Log.find();
    res.json(logs);
});

router.post("/", async (req, res) => {
    const newLog = new Log(req.body);
    await newLog.save();
    res.json({ message: "Log recorded!" });
});

module.exports = router;
