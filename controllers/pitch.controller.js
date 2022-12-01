const Pitch = require("../models/pitch_schema");
const { validationResult } = require("express-validator");
const showError = require("../utils/showError.js");

// Get all Pitches
const getPitches = (req, res) => {
  Pitch.find()
    .sort({_id: -1})
    .then((pitches) => {
      const pitchTruncated = pitches.map(({ _id, entrepreneur, pitchTitle, pitchIdea, askAmount, equity, offers }) => {
        var newOffers = [];
        offers.forEach((offer) => {
          const {investor, amount, equity, comment, _id} = offer;
          newOffers.push({"id": _id, investor, amount, equity, comment});
        })
        return { "id": _id, entrepreneur, pitchTitle, pitchIdea, askAmount, equity, "offers": newOffers };
      });
      res.status(200).json(
        pitchTruncated
      );
    })
    .catch((error) => {
      showError(error, res);
      // res.status(400).json("Invalid request");
    });
};

// Get a Single Pitch
const getPitch = (req, res) => {
  Pitch.findById(req.params.id)
  .then((pitch) => {
    if(pitch === null) return res.status(404).json("Pitch Not Found");

    const {_id, entrepreneur, pitchTitle, pitchIdea, askAmount, equity, offers } = pitch;
    var newOffers = [];
    offers.forEach((offer) => {
      const {investor, amount, equity, comment, _id} = offer;
      newOffers.push({"id": _id, investor, amount, equity, comment});
    })

    res.status(200).json(
      {"id": _id, entrepreneur, pitchTitle, pitchIdea, askAmount, equity, "offers" : newOffers}
    );
  })
  .catch((error) => {
    // console.log(error);
    res.status(400).json("Bad Request");
  });
};

// Create a new Pitch
const postPitch = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }

  const { entrepreneur, pitchTitle, pitchIdea, askAmount, equity } = req.body;

  if(equity > 100) return res.status(400).json("Bad Request.");

  try {
    // create new pitch
    const newPitch = new Pitch({
      entrepreneur,
      pitchTitle,
      pitchIdea,
      askAmount,
      equity
    });

    await newPitch.save();
    return res.status(201).json({"id": newPitch.id});
    
  } catch (error) {
    showError(error, res);
    return res.status(400).json({
      message: errors.array(),
    });
  }
};

  module.exports = {
    getPitches,
    getPitch,
    postPitch
  };