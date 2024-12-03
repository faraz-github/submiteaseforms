const express = require("express");
const router = express.Router();

// Controllers
const {
  createScriptedThreadsSignupFormEntryAndMail,
} = require("../controllers/signupFormController");

//----------------------------------------------------------------Create Routes
// @desc    Create new signup for Scripted Threads
// @route   POST /api/signup-form/scripted-threads/:company_api_key/create
// @access  Public
router.post(
  "/scripted-threads/:company_api_key/create",
  createScriptedThreadsSignupFormEntryAndMail
);

module.exports = router;
