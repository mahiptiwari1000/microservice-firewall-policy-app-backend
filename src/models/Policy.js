const mongoose = require("mongoose");

const PolicySchema = new mongoose.Schema({
    source: String,
    target: String,
    action: String
});

module.exports = mongoose.model("Policy", PolicySchema);
