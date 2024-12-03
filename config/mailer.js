const nodemailer = require("nodemailer");

async function sendRajdhaniAdvertisersNewContactMail(sendTo, contactData) {
  try {
    // Transport Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.RAJDHANI_ADVERTISERS_SENDING_EMAIL_ADDRESS,
        pass: process.env.RAJDHANI_ADVERTISERS_SENDING_EMAIL_APP_PASSWORD,
      },
    });

    // Mail Options
    const mailOptions = {
      from: `Rajdhani Advertisers | Website <${process.env.RAJDHANI_ADVERTISERS_SENDING_EMAIL_ADDRESS}>`,
      to: sendTo,
      subject: "New Client Contact Request 🎉", // Subject line
      text: `New Client | Name: ${contactData?.name}, Email: ${contactData?.email}, Phone: ${contactData?.phone}, Message: ${contactData?.message}`, // plain text body
      html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <hr />
                <center>
                  <h2>New Client Request 🎉</h2>
                </center>
                <hr />
                <h4>Name: ${contactData?.name}</h4>
                <h4>Email: ${contactData?.email}</h4>
                <h4>Phone: ${contactData?.phone}</h4>
                
                <h4>Message:</h4>
                <p style="border: 1px solid #ddd; padding: 10px; border-radius: 5px; background-color: #f9f9f9;">
                  ${contactData?.message}
                </p>
              </div>
            `, // html body
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

async function sendRajdhaniAdvertisersNewBookingMail(sendTo, bookingData) {
  try {
    // Transport Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.RAJDHANI_ADVERTISERS_SENDING_EMAIL_ADDRESS,
        pass: process.env.RAJDHANI_ADVERTISERS_SENDING_EMAIL_APP_PASSWORD,
      },
    });

    // Mail Options
    const mailOptions = {
      from: `Rajdhani Advertisers Website <${process.env.RAJDHANI_ADVERTISERS_SENDING_EMAIL_ADDRESS}>`,
      to: sendTo,
      subject: "New Client Booking Request 🎉", // Subject line
      text: `New Client | Name: ${bookingData?.name}, Email: ${bookingData?.email}, Phone: ${bookingData?.phone}, Details: ${bookingData?.message}`, // plain text body
      html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <hr />
                <center>
                  <h2>New Client Booking Request 🎉</h2>
                </center>
                <hr />
                <h4>Name: ${bookingData?.name}</h4>
                <h4>Email: ${bookingData?.email}</h4>
                <h4>Phone: ${bookingData?.phone}</h4>
                
                <h4>Details:</h4>
                <p style="border: 1px solid #ddd; padding: 10px; border-radius: 5px; background-color: #f9f9f9;">
                  ${bookingData?.details}
                </p>
              </div>
            `, // html body
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

async function sendLucknowCarsNewContactMail(sendTo, contactData) {
  try {
    // Transport Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.LUCKNOW_CARS_SENDING_EMAIL_ADDRESS,
        pass: process.env.LUCKNOW_CARS_SENDING_EMAIL_APP_PASSWORD,
      },
    });

    // Mail Options
    const mailOptions = {
      from: `Lucknow Cars | Website <${process.env.LUCKNOW_CARS_SENDING_EMAIL_ADDRESS}>`,
      to: sendTo,
      subject: "New Customer Contact Request 🎉", // Subject line
      text: `New Customer | Name: ${contactData?.name}, Phone: ${contactData?.phone}, Message: ${contactData?.message}`, // plain text body
      html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <hr />
                <center>
                  <h2>New Customer Request 🎉</h2>
                </center>
                <hr />
                <h4>Name: ${contactData?.name}</h4>
                <h4>Phone: ${contactData?.phone}</h4>
                
                <h4>Message:</h4>
                <p style="border: 1px solid #ddd; padding: 10px; border-radius: 5px; background-color: #f9f9f9;">
                  ${contactData?.message}
                </p>
              </div>
            `, // html body
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

async function sendScriptedThreadsNewSignupMail(sendTo, signupData) {
  try {
    // Transport Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SCRIPTED_THREADS_SENDING_EMAIL_ADDRESS,
        pass: process.env.SCRIPTED_THREADS_SENDING_EMAIL_APP_PASSWORD,
      },
    });

    // Mail Options
    const mailOptions = {
      from: `Scripted Threads | Website <${process.env.SCRIPTED_THREADS_SENDING_EMAIL_ADDRESS}>`,
      to: sendTo,
      subject: "New Signup Request 🎉", // Subject line
      text: `New Signup |  Email: ${signupData?.email}`, // plain text body
      html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <hr />
                <center>
                  <h2>New Signup Request 🎉</h2>
                </center>
                <hr />
                <h4>Email: ${signupData?.email}</h4>
              </div>
            `, // html body
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

module.exports = {
  sendRajdhaniAdvertisersNewContactMail,
  sendRajdhaniAdvertisersNewBookingMail,
  sendLucknowCarsNewContactMail,
  sendScriptedThreadsNewSignupMail,
};
