const mongoose = require("mongoose");

const NodeSchema = new mongoose.Schema({
    id: String,
    group: String
});

module.exports = mongoose.model("Node", NodeSchema);
