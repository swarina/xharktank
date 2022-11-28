const Pitch = require("../models/pitch_schema");
const { validationResult } = require("express-validator");
const showError = require("../utils/showError.js");

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
    postPitch
  };