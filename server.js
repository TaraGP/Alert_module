// server.js
const express = require('express');
const bodyParser = require('body-parser');
const twilioSMS = require('./sendSMS');
const twilioWhatsapp = require('./sendWhatsapp');
const SMTPMail = require('./sendMail');
const path=require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req,res)=>{
  res.sendFile(__dirname + "/index.html")
});

app.post('/send-alert', (req, res) => {
  const { alertType, recipients, messageBody } = req.body;

  switch (alertType) {
    case 'sms':
      twilioSMS(recipients, messageBody);
      break;
    case 'whatsapp':
      twilioWhatsapp(recipients, messageBody);
      break;
    case 'mail':
      const {title, html} = req.body;
      SMTPMail(recipients, title, messageBody, html);
      break;
    default:
      console.error('Invalid alert type');
  }
  if(res)
    res.json({ success: true, message: 'Alert sent successfully.' });
  else
  res.json({ success: false, message: 'Alert not sent. ' });

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
