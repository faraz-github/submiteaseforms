const express = require("express");
const router = express.Router();

// Controllers
const {
  createRajdhaniAdvertisersContactFormEntryAndMail,
  createLucknowCarsContactFormEntryAndMail,
} = require("../controllers/contactFormController");

//----------------------------------------------------------------Create Routes
// @desc    Create new contact for Rajdhani Advertisers
// @route   POST /api/contact-form/rajdhani-advertisers/:company_api_key/create
// @access  Public
router.post(
  "/rajdhani-advertisers/:company_api_key/create",
  createRajdhaniAdvertisersContactFormEntryAndMail
);

// @desc    Create new contact for Lucknow Cars
// @route   POST /api/contact-form/lucknow-cars/:company_api_key/create
// @access  Public
router.post(
  "/lucknow-cars/:company_api_key/create",
  createLucknowCarsContactFormEntryAndMail
);

module.exports = router;
