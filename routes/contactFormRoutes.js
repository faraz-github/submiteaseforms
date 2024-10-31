const express = require("express");
const router = express.Router();

// Controllers
const {
  createRajdhaniAdvertisersContactFormEntryAndMail,
} = require("../controllers/contactFormController");

//----------------------------------------------------------------Create Routes
// @desc    Create new contact for Rajdhani Advertisers
// @route   POST /api/contact-form/rajdhani-advertisers/:company_api_key/create
// @access  Public
router.post(
  "/rajdhani-advertisers/:company_api_key/create",
  createRajdhaniAdvertisersContactFormEntryAndMail
);

module.exports = router;
