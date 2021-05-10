require('dotenv').config({path: __dirname + '/../.env'});
const nodemailer = require('nodemailer');
const MAIL_FROM = process.env.MAIL_FROM;
const transporter = nodemailer.createTransport({
  port: process.env.EMAIL_PORT,
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: false, // upgrades later with STARTTLS -- change this based on the PORT
});
// verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.log('error with email connection');
  }
});

const sendMail = (mailOptions , cb ) => {
    mailOptions.from =  MAIL_FROM;
    transporter.sendMail(mailOptions, cb);
}
module.exports = {
    sendMail: sendMail
};