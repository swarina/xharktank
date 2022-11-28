const mongoose = require("mongoose");

const PitchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  idea: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  equity: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("Pitch", PitchSchema);
  