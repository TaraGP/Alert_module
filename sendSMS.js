const config=require('./public/config');
const twilio = require('twilio')(config.accountSid, config.authToken);

async function sendSMS(recipients, messageBody){
    try{
        for(const recipient of recipients){
            const message=await twilio.messages.create({
                body: messageBody,
                from:config.twilioPhoneNumber,
                to: recipient,
            });
            console.log('Message SID for ${recipient}: ${message.sid}');
        }}
    catch(error)
        {
            console.error('Error sending SMS to ${recipient}:', error.message);
            throw new Error('Failed to send SMS  to ${recipient}');
        }
    }
     module.exports = sendSMS;