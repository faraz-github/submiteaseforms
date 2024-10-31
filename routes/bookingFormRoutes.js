const express = require("express");
const router = express.Router();

// Controllers
const {
  createRajdhaniAdvertisersBookingFormEntryAndMail,
} = require("../controllers/bookingFormController");

//----------------------------------------------------------------Create Routes
// @desc    Create new booking for Rajdhani Advertisers
// @route   POST /api/booking-form/rajdhani-advertisers/:company_api_key/create
// @access  Public
router.post(
  "/rajdhani-advertisers/:company_api_key/create",
  createRajdhaniAdvertisersBookingFormEntryAndMail
);

module.exports = router;
