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

app.post('/send-alert', async(req, res) => {
  const { alertType, recipients, messageBody } = req.body;
try{
  switch (alertType) {
    case 'sms':
        await twilioSMS(recipients, messageBody);
        res.json({ success: true, message: 'SMS alert sent successfully.' });
     break;
    case 'whatsapp':
      await twilioWhatsapp(recipients, messageBody);
        res.json({ success: true, message: 'WhatsApp alert sent successfully.' });
     break;
    case 'mail':
      const { title, html, recipients } = req.body;
      if (!recipients || !Array.isArray(recipients)) {
        console.error('Invalid recipients data');
        res.status(400).json({ success: false, message: 'Invalid recipients data' });
        return;
      }
      await SMTPMail(recipients, title, messageBody, html);
        res.json({ success: true, message: 'Email alert sent successfully.' });
      break;
    default:
      console.error('Invalid alert type');
      res.status(400).json({ success: false, message: 'Invalid alert type' });
    }
  } catch (error) {
    console.error('Error sending alert:', error);
    res.status(500).json({ success: false, message: 'Failed to send alert.' });
    }
 });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
