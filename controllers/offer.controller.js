const Pitch = require("../models/pitch_schema");
// const Offer = require("../models/offer_schema");
const { validationResult } = require("express-validator");
const showError = require("../utils/showError.js");

const postOffer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }

  const {investor, amount, equity, comment } = req.body;
  if(!investor || !amount || !equity || !comment) {
    return res.status(400).json("Bad Request");
  }

  if(equity > 100) return res.status(400).json("Bad Request.");

  const pitchId = req.params.id;

    try {
    // create new offer
    const newOffer = {
      investor,
      amount,
      equity,
      comment,
    };

    let newOffers;
    Pitch.findById(pitchId)
    .then((pitch) => {

      const { offers } = pitch;
      offers.push(newOffer);
      newOffers = [...offers];

      Pitch.findByIdAndUpdate(req.params.id, {offers: newOffers}, (err, doc) => {
        if(err) res.status(400).json("Invalid request.")
        else {
          return res.status(201).json({"id": newOffers[newOffers.length - 1]._id});
        }
      })
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json("Pitch Not Found");
    });
    
  } catch (error) {
    showError(error, res);
  }
};

  module.exports = {
    postOffer
  };