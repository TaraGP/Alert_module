const twilio = require('twilio');
const config = require('./public/config');

const client = twilio(config.accountSid, config.authToken);

async function sendWhatsapp(recipients, messageBody) {
  try {
    for (const recipient of recipients) {
      await client.messages.create({
        body: messageBody,
        from: config.twilioPhoneNumber,
        to: recipient,
        messagingServiceSid: config.messagingServiceSid, // You may need to adjust this
      });
      console.log(`WhatsApp message sent to ${recipient}`);
    }
  } catch (error) {
    console.error('Error sending WhatsApp messages:', error);
    throw new Error('Failed to send WhatsApp messages');
  }
}

module.exports = sendWhatsapp;


// sendWhatsApp.js
// const config = require('./public/config');
// const twilio = require('twilio')(config.accountSid, config.authToken);

// async function sendWhatsApp(recipients, messageBody) {
//   try {
//     for (const recipient of recipients) {
//       const message = await twilio.messages.create({
//         body: messageBody,
//         from: config.twilioPhoneNumber,
//         to: recipient,
//         messagingServiceSid: config.messagingServiceSid,
//       });
//       console.log(`Message SID for ${recipient}: ${message.sid}`);

//     }
//   } catch (error) {
//     console.error('Error sending WhatsApp messages:', error);
//     throw error;
//   }
// }
// module.exports = sendWhatsApp; // Export the function
// // Example usage
// // const recipients = ['+1234567890', '+9876543210']; 
// // const messageBody = 'This is a test message from Twilio WhatsApp!';

