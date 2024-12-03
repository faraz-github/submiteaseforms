const mongoose = require("mongoose");

// Schema
const scriptedThreadsSignupFormSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/, // Email validation
    },
  },
  { timestamps: true }
);

// Model
const ScriptedThreadsSignupForm = mongoose.model(
  "scriptedthreadssignupform",
  scriptedThreadsSignupFormSchema
);

module.exports = {
  ScriptedThreadsSignupForm,
};
