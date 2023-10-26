// sendWhatsApp.js
const config = require('./public/config');
const twilio = require('twilio')(config.accountSid, config.authToken);

async function sendWhatsAppMessages(recipients, messageBody) {
  try {
    for (const recipient of recipients) {
      const message = await twilio.messages.create({
        body: messageBody,
        from: `whatsapp:${config.twilioPhoneNumber}`,
        to: `whatsapp:${recipient}`,
      });
      console.log(`Message SID for ${recipient}: ${message.sid}`);

    }
  } catch (error) {
    console.error('Error sending WhatsApp messages:', error.message);
    throw error;
  }
}
module.exports = sendWhatsAppMessages; // Export the function
// Example usage
// const recipients = ['+1234567890', '+9876543210']; 
// const messageBody = 'This is a test message from Twilio WhatsApp!';

