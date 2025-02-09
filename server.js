require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

// mongoose.connect("mongodb://localhost:27017/networkDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

const NodeSchema = new mongoose.Schema({ id: String, group: String });
const LinkSchema = new mongoose.Schema({ source: String, target: String, status: String });
const PolicySchema = new mongoose.Schema({ source: String, target: String, action: String });
const LogSchema = new mongoose.Schema({ timestamp: String, category: String, message: String });

const Node = mongoose.model("Node", NodeSchema);
const Link = mongoose.model("Link", LinkSchema);
const Policy = mongoose.model("Policy", PolicySchema);
const Log = mongoose.model("Log", LogSchema);

app.get("/api/network", async (req, res) => {
    const nodes = await Node.find();
    const links = await Link.find();
    res.json({ nodes, links });
});

app.post("/api/network", async (req, res) => {
    const { nodes, links } = req.body;
    await Node.insertMany(nodes);
    await Link.insertMany(links);
    res.json({ message: "Network data saved!" });
});

app.get("/api/policies", async (req, res) => {
    const policies = await Policy.find();
    res.json(policies);
});

app.post("/api/policies", async (req, res) => {
    const newPolicy = new Policy(req.body);
    await newPolicy.save();
    res.json({ message: "Policy added!" });
});

app.get("/api/logs", async (req, res) => {
    const logs = await Log.find();
    res.json(logs);
});

app.post("/api/logs", async (req, res) => {
    const newLog = new Log(req.body);
    await newLog.save();
    res.json({ message: "Log recorded!" });
});

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
    res.json({message: "Network Security Backend is running"});
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


