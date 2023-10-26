// sendMail.js
const nodemailer = require('nodemailer');
const config = require('./public/config');

async function sendMail(recipients, subject, text, html) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    });
    const recipientsArray = recipients.split(',').map(recipient => recipient.trim());
    
    const mailOptions = {
      from: config.email.user,
      to: recipientsArray.join(','),
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Failed to send email');
  }
}
module.exports = sendMail;
