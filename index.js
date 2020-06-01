const cypress = require("cypress");
const nodemailer = require("nodemailer");
require('dotenv').config()

const senderEmail = process.env.SENDER;
const recieverEmail = process.env.RECIEVER;
const emailPW = process.env.PW;

console.log(senderEmail,recieverEmail,emailPW)

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderEmail,
    pass: emailPW,
  },
});

const mailOptions = {
  from: senderEmail,
  to: recieverEmail,
  subject: "KVR Crawler",
  text: "Appointment available.",
};

cypress
  .run({
    spec: "./cypress/integration/kvr_spec.js",
  })
  .then((runsResults) => {
    const summary = runsResults.runs[0].stats.failures;
    //.map((oneRun) => oneRun)
    /*.map((run) => {
      return {
        spec: run.spec.name,
        tests: run.stats.tests,
        passes: run.stats.passes,
        failures: run.stats.failures,
      }
    })*/
    if (summary != 0) {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  })
  .catch((err) => {
    console.error(err);
  });
