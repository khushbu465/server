const mongoose = require("mongoose");

const crewSchema = new mongoose.Schema({
  name: { type: String },
  role: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("crews", crewSchema);
