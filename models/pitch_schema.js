const mongoose = require("mongoose");

const PitchSchema = new mongoose.Schema({
  entrepreneur: {
    type: String,
    required: true,
  },
  pitchTitle: {
    type: String,
    required: true,
  },
  pitchIdea: {
    type: String,
    required: true,
  },
  askAmount: {
    type: Number,
    required: true,
  },
  equity: {
    type: Number,
    required: true,
  },
  offers: [{
    investor: {
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
    },
    comment: {
      type: String,
      required: true
    }
  }],
}, { timestamps: true });

module.exports = mongoose.model("Pitch", PitchSchema);
  