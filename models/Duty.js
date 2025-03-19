const mongoose = require("mongoose");

const dutySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vehicles',
    required: true
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'crews',
    required: true
  },
  conductorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'crews',
    required: true
  },
  startTime: { type: String, required: true },
  duration: { type: Number, required: true } // in minutes
});

module.exports = mongoose.model("Duty", dutySchema);
