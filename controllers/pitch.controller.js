const Pitch = require("../models/pitch_schema");
const { validationResult } = require("express-validator");
const showError = require("../utils/showError.js");

// Get all Pitches
const getPitches = (req, res) => {
  Pitch.find()
    .sort({_id: -1})
    .then((pitches) => {
      const pitchTruncated = pitches.map(({ _id, entrepreneur, pitchTitle, pitchIdea, askAmount, equity }) => {
        return { _id, entrepreneur, pitchTitle, pitchIdea, askAmount, equity };
      });
      res.status(200).json(
        pitchTruncated
      );
    })
    .catch((error) => {
      console.log(error.message);
      showError(error, res);
    });
};

// Get a Single Pitch
const getPitch = (req, res) => {
  Pitch.findById(req.params.id)
    .then((pitch) => {
      const { _id, entrepreneur, pitchTitle, pitchIdea, askAmount, equity } = pitch
      return res.status(200).json(
        { _id, entrepreneur, pitchTitle, pitchIdea, askAmount, equity }
      );
    })
    .catch((error) => {
      res.status(404).json("Pitch Not Found");
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

    console.log(newPitch);

    return res.status(201).json({"id": newPitch.id});
  } catch (error) {
    showError(error, res);
  }
};

  module.exports = {
    getPitches,
    getPitch,
    postPitch
  };