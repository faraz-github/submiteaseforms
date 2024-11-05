const asyncHandler = require("express-async-handler");

const {
  RajdhaniAdvertisersContactForm,
  LucknowCarsContactForm,
} = require("../models/contactFormModel");

const {
  sendRajdhaniAdvertisersNewContactMail,
  sendLucknowCarsNewContactMail,
} = require("../config/mailer");

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

const createLucknowCarsContactFormEntryAndMail = asyncHandler(
  async (req, res) => {
    const { name, phone, message } = req.body;
    const apiKey = req.params.company_api_key;

    // Validate required fields
    if (!name || !phone || !message) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }

    // Check if the provided API key matches the one in the environment variable
    if (apiKey !== process.env.LUCKNOW_CARS_API_KEY) {
      res.status(403);
      throw new Error("Forbidden: Invalid API Key");
    }

    const contactData = {
      name: name,
      phone: phone,
      message: message,
    };

    // Create a new contactform document
    const contactForm = await LucknowCarsContactForm.create(contactData);

    if (contactForm) {
      res.status(201);
      const info = await sendLucknowCarsNewContactMail(
        process.env.LUCKNOW_CARS_RECEIVING_EMAIL,
        contactData
      );

      if (info) {
        if (info.accepted[0] === process.env.LUCKNOW_CARS_RECEIVING_EMAIL) {
          res.status(200);
          // res.send(contactData); - use this when using js site e.g. react
          // Send a success response - use this when using plain html
          res.send(`
              <h2>Thank you for contacting us, ${contactData?.name}!</h2>
              <p>Your message has been successfully sent. 🎉</p>
              <a href="https://lucknowcars.netlify.app/">Go back to the website</a>
              <script>
                window.history.pushState({}, '', '/api/contact-form/lucknow-cars/thank-you');
              </script>
              `);
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
  createLucknowCarsContactFormEntryAndMail,
};
