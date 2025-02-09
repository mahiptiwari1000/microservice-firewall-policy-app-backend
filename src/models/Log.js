const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    category: String,
    message: String
});

module.exports = mongoose.model("Log", LogSchema);
