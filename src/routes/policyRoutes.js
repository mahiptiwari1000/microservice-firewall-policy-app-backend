const express = require("express");
const router = express.Router();
const Policy = require("../models/Policy");

router.get("/", async (req, res) => {
    const policies = await Policy.find();
    res.json(policies);
});

router.post("/", async (req, res) => {
    const newPolicy = new Policy(req.body);
    await newPolicy.save();
    res.json({ message: "Policy added!" });
});

module.exports = router;
