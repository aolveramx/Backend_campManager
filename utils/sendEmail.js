const nodemailer = require('nodemailer')

const sendEmail = async options => {
  if (process.env.NODE_ENV === 'production') {
    transporter.secure = true
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  const info = await transporter.sendMail(message)

  console.log('Message sent: %s', info.messageId)
}

module.exports = sendEmail
