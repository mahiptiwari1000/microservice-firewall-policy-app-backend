const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const connectDB = require("./config/db");

require("dotenv").config();

connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/network", require("./routes/networkRoutes"));
app.use("/api/policies", require("./routes/policyRoutes"));
app.use("/api/logs", require("./routes/logRoutes"));

// Root Route
app.get("/", (req, res) => {
    res.json({ message: "Network Security Backend is running" });
});

// Error Handling Middleware
app.use(require("./middleware/errorHandler"));

module.exports = app;
