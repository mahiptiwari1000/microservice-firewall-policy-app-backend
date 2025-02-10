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

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPolicy = await Policy.findByIdAndDelete(id);

        if (!deletedPolicy) {
            return res.status(404).json({ message: "Policy not found" });
        }

        res.json({ message: "Policy deleted successfully!" });
    } catch (error) {
        console.error("Error deleting policy:", error);
        res.status(500).json({ message: "Server error while deleting policy" });
    }
});

module.exports = router;
