// script.js
const sendSMS = require('./sendSMS');
const sendWhatsapp = require('./sendWhatsapp');
const sendMail = require('./sendMail');

// Updated script.js
document.getElementById('alertForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const alertType = document.querySelector('input[name="alertType"]:checked').value;

  let recipients, messageBody, title, html;

  if (alertType === 'sms') {
    recipients = document.getElementById('smsRecipients').value.split(',').map(recipient => recipient.trim());
    messageBody = document.getElementById('smsMessageBody').value;
  } else if (alertType === 'whatsapp') {
    recipients = document.getElementById('whatsappRecipients').value.split(',').map(recipient => recipient.trim());
    messageBody = document.getElementById('whatsappMessageBody').value;
  } else if (alertType === 'mail') {
    recipients = document.getElementById('mailRecipients').value.split(',').map(recipient => recipient.trim());
    messageBody = document.getElementById('mailMessageBody').value;
    title = document.getElementById('title').value;
    html = document.getElementById('html').value;
  }
  
  try {
    const response = await fetch('/send-alert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ alertType, recipients, messageBody, title, html }),
    });

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Error sending alert:', error);
  }
});