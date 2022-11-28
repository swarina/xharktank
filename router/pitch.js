const router = require("express").Router();

// controllers
const {
    getPitches,
    getPitch,
    postPitch
  } = require("../controllers/pitch.controller");

/**
 * @route   GET ALL /pitches
 * @access  private
 * @desc    get list of all pitches
 */
router.get("/", getPitches);

/**
 * @route   GET /pitches/:id
 * @access  private
 * @desc    get a single pitch
 */
 router.get("/:id", getPitch);

/**
 * @route   POST /pitches
 * @access  private
 * @desc    post a new pitch
 */
router.post("/", postPitch);

module.exports = router;
