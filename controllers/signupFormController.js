const asyncHandler = require("express-async-handler");

const { ScriptedThreadsSignupForm } = require("../models/signupFormModel");

const { sendScriptedThreadsNewSignupMail } = require("../config/mailer");

const createScriptedThreadsSignupFormEntryAndMail = asyncHandler(
  async (req, res) => {
    const { email } = req.body;
    const apiKey = req.params.company_api_key;

    // Validate required fields
    if (!email) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }

    // Check if the provided API key matches the one in the environment variable
    if (apiKey !== process.env.SCRIPTED_THREADS_API_KEY) {
      res.status(403);
      throw new Error("Forbidden: Invalid API Key");
    }

    const signupData = {
      email: email,
    };

    // Create a new signupform document
    const signupForm = await ScriptedThreadsSignupForm.create(signupData);

    if (signupForm) {
      res.status(201);
      const info = await sendScriptedThreadsNewSignupMail(
        process.env.SCRIPTED_THREADS_RECEIVING_EMAIL,
        signupData
      );

      if (info) {
        if (info.accepted[0] === process.env.SCRIPTED_THREADS_RECEIVING_EMAIL) {
          res.status(200);
          res.send(signupData);
        }
      } else {
        res.status(400);
        throw new Error("Failed to send info to Owner");
      }
    } else {
      res.status(400);
      throw new Error("Failed to create signup form information");
    }
  }
);

module.exports = { createScriptedThreadsSignupFormEntryAndMail };
