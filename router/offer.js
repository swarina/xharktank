const router = require("express").Router();

// controllers
const {
    postOffer
  } = require("../controllers/offer.controller");

/**
 * @route   POST /api/offer
 * @access  private
 * @desc    post a new offer
 */
router.post( "/:id/makeOffer", postOffer );

module.exports = router;
