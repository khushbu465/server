const mongoose = require("mongoose");

const dutySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  vehicleId: { type: String, required: true },
  driverId: { type: String, required: true },
  conductorId: { type: String, required: true },
  startTime: { type: String, required: true },
  duration: { type: Number, required: true } // in minutes
});

module.exports = mongoose.model("Duty", dutySchema);
    