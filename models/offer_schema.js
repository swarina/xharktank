const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
  pitchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pitch",
  },
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
    required: true,
  }
});

module.exports = mongoose.model("Offer", OfferSchema);
  