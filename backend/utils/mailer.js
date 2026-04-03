const nodemailer = require('nodemailer');

const sendAlertEmail = async (to, subject, text) => {
  try {
    // For test purposes, you can use ethereal email or use standard SMTP from .env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: process.env.SMTP_PORT || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: '"GuardianQR Alerts" <alerts@guardianqr.com>',
      to,
      subject,
      text,
    });

    console.log('Message sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = sendAlertEmail;