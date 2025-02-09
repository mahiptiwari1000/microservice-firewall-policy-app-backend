const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
    source: String,
    target: String,
    status: String
});

module.exports = mongoose.model("Link", LinkSchema);
