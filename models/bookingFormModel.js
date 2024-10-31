const mongoose = require("mongoose");

// Schema
const rajdhaniAdvertisersBookingFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/, // Email validation
    },
    phone: {
      type: String,
      required: true,
      match: /^(?:\+91)?\d{10}$/, // Phone validation
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Model
const RajdhaniAdvertisersBookingForm = mongoose.model(
  "rajdhaniadvertisersbookingform",
  rajdhaniAdvertisersBookingFormSchema
);

module.exports = {
  RajdhaniAdvertisersBookingForm,
};
