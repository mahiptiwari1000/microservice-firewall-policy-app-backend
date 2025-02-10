require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// API Routes
app.get("/", (req, res) => {
    res.json({ message: "Network Security Backend is running" });
});

const networkRoutes = require("./src/routes/networkRoutes");
const policyRoutes = require("./src/routes/policyRoutes");
const logRoutes = require("./src/routes/logRoutes");

app.use("/api/network", networkRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/logs", logRoutes);

// ❌ Do NOT use `app.listen(PORT)` for Vercel
module.exports = app;
