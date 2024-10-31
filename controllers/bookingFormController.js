const asyncHandler = require("express-async-handler");

const {
  RajdhaniAdvertisersBookingForm,
} = require("../models/bookingFormModel");

const { sendRajdhaniAdvertisersNewBookingMail } = require("../config/mailer");

const createRajdhaniAdvertisersBookingFormEntryAndMail = asyncHandler(
  async (req, res) => {
    const { name, email, phone, details } = req.body;
    const apiKey = req.params.company_api_key;

    // Validate required fields
    if (!name || !email || !phone || !details) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }

    // Check if the provided API key matches the one in the environment variable
    if (apiKey !== process.env.RAJDHANI_ADVERTISERS_API_KEY) {
      res.status(403);
      throw new Error("Forbidden: Invalid API Key");
    }

    const bookingData = {
      name: name,
      email: email,
      phone: phone,
      details: details,
    };

    // Create a new bookingform document
    const bookingForm = await RajdhaniAdvertisersBookingForm.create(
      bookingData
    );

    if (bookingForm) {
      res.status(201);
      const info = await sendRajdhaniAdvertisersNewBookingMail(
        process.env.RAJDHANI_ADVERTISERS_RECEIVING_EMAIL,
        bookingData
      );

      if (info) {
        if (
          info.accepted[0] === process.env.RAJDHANI_ADVERTISERS_RECEIVING_EMAIL
        ) {
          res.status(200);
          res.send(bookingData);
        }
      } else {
        res.status(400);
        throw new Error("Failed to send info to Owner");
      }
    } else {
      res.status(400);
      throw new Error("Failed to create booking form information");
    }
  }
);

module.exports = {
  createRajdhaniAdvertisersBookingFormEntryAndMail,
};
