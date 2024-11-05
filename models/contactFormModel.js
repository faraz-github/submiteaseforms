const mongoose = require("mongoose");

// Schema
const rajdhaniAdvertisersContactFormSchema = new mongoose.Schema(
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
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const lucknowCarsContactFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: /^(?:\+91)?\d{10}$/, // Phone validation
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Model
const RajdhaniAdvertisersContactForm = mongoose.model(
  "rajdhaniadvertiserscontactform",
  rajdhaniAdvertisersContactFormSchema
);
const LucknowCarsContactForm = mongoose.model(
  "lucknowcarscontactform",
  lucknowCarsContactFormSchema
);

module.exports = {
  RajdhaniAdvertisersContactForm,
  LucknowCarsContactForm,
};
