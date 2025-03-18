const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    name: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("vehicles", vehicleSchema);
