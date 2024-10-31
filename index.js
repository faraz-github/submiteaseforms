const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

//----------------------------------------------------------------MIDDLEWARE - CORS Cross Origin Resource Sharing
app.use(
  cors({
    origin: [
      process.env.VITE_REACT_ORIGIN,
      process.env.RAJDHANI_ADVERTISERS_ORIGIN,
    ],
  })
);

//----------------------------------------------------------------DATABASE
const connectDB = require("./config/db");
connectDB();

//----------------------------------------------------------------MIDDLEWARE - REQUEST Data Parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

//----------------------------------------------------------------ROUTES
app.use("/api/contact-form", require("./routes/contactFormRoutes"));
app.use("/api/booking-form", require("./routes/bookingFormRoutes"));

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
