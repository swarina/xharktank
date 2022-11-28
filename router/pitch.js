const router = require("express").Router();

// controllers
const {
    postPitch
  } = require("../controllers/pitch.controller");

/**
 * @route   POST /api/pitch
 * @access  private
 * @desc    post a new pitch
 */
router.post(
"/",
postPitch
);

module.exports = router;
