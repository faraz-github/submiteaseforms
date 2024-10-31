const asyncHandler = require("express-async-handler");

const {
  RajdhaniAdvertisersContactForm,
} = require("../models/contactFormModel");

const { sendRajdhaniAdvertisersNewContactMail } = require("../config/mailer");

const createRajdhaniAdvertisersContactFormEntryAndMail = asyncHandler(
  async (req, res) => {
    const { name, email, phone, message } = req.body;
    const apiKey = req.params.company_api_key;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }

    // Check if the provided API key matches the one in the environment variable
    if (apiKey !== process.env.RAJDHANI_ADVERTISERS_API_KEY) {
      res.status(403);
      throw new Error("Forbidden: Invalid API Key");
    }

    const contactData = {
      name: name,
      email: email,
      phone: phone,
      message: message,
    };

    // Create a new contactform document
    const contactForm = await RajdhaniAdvertisersContactForm.create(
      contactData
    );

    if (contactForm) {
      res.status(201);
      const info = await sendRajdhaniAdvertisersNewContactMail(
        process.env.RAJDHANI_ADVERTISERS_RECEIVING_EMAIL,
        contactData
      );

      if (info) {
        if (
          info.accepted[0] === process.env.RAJDHANI_ADVERTISERS_RECEIVING_EMAIL
        ) {
          res.status(200);
          res.send(contactData);
        }
      } else {
        res.status(400);
        throw new Error("Failed to send info to Owner");
      }
    } else {
      res.status(400);
      throw new Error("Failed to create contact form information");
    }
  }
);

module.exports = {
  createRajdhaniAdvertisersContactFormEntryAndMail,
};
