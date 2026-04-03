const twilio = require('twilio');

// Initialize Twilio client only if credentials are provided in .env
let client;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

const sendAlertSMS = async (toPhone, message) => {
  try {
    if (client && process.env.TWILIO_PHONE_NUMBER) {
      const response = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: toPhone
      });
      console.log(`[SMS SUCCESS] Alert sent to ${toPhone}. SID: ${response.sid}`);
    } else {
      // Mock SMS sending if Twilio keys are missing
      console.log(`\n======================================================`);
      console.log(`[MOCK SMS] Would send to: ${toPhone}`);
      console.log(`[MOCK MESSAGE]:`);
      console.log(message);
      console.log(`======================================================\n`);
    }
  } catch (error) {
    console.error(`[SMS ERROR] Failed to send SMS to ${toPhone}:`, error.message);
  }
};

const sendAlertCall = async (toPhone, message) => {
  try {
    if (client && process.env.TWILIO_PHONE_NUMBER) {
      const response = await client.calls.create({
        twiml: `<Response><Say voice="alice">${message}</Say></Response>`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: toPhone
      });
      console.log(`[CALL SUCCESS] Voice Call initiated to ${toPhone}. SID: ${response.sid}`);
    } else {
      // Mock Voice Call if Twilio keys are missing
      console.log(`\n======================================================`);
      console.log(`[MOCK CALL] Would call: ${toPhone}`);
      console.log(`[MOCK MESSAGE AUDIO]: ${message}`);
      console.log(`======================================================\n`);
    }
  } catch (error) {
    console.error(`[CALL ERROR] Failed to initiate call to ${toPhone}:`, error.message);
  }
};

module.exports = { sendAlertSMS, sendAlertCall };
