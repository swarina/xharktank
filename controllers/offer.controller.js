const Pitch = require("../models/pitch_schema");
const Offer = require("../models/offer_schema");
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
  const pitchId = req.params.id;
  // console.log(req.);
    try {
    // create new offer
    const newOffer = new Offer({
      investor,
      amount,
      equity,
      comment,
    });
    // await newOffer.save();

    let newOffers;
    // Find present offers array
    await Pitch.findById(pitchId)
    .then((pitch) => {
      
      // console.log(newOffer);
      newOffer.save();
      pitch.offers.push(newOffer);
      pitches.save();
      console.log(pitches);
      // newOffers = offers;
      // console.log({"newOffers": newOffers});

      // Pitch.findByIdAndUpdate(req.params.id, {offers: newOffers}, (err, doc) => {
      //   if(err) console.log(err);
      //   else {
      //     console.log(newOffers);
      //     return res.status(201).json({"id": newOffer.id});
      //   }
      // })
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json("Pitch Not Found");
    });

    // newOffer.save();
    return res.status(200).json({"id": newOffer.id});
    
  } catch (error) {
    showError(error, res);
  }
};

  module.exports = {
    postOffer
  };