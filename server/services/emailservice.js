import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create the transporter object using Mailgun's SMTP credentials
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,  // SMTP host (Mailgun)
    port: process.env.EMAIL_PORT,  // SMTP port (587 for secure)
    secure: false,  // Use TLS
    auth: {
        user: process.env.EMAIL_USER,  // Mailgun SMTP username
        pass: process.env.EMAIL_PASS,  // Mailgun SMTP password
    },
});

/**
 * Function to send emails
 * @param {Object} options - Contains the email details
 * @param {string} options.to - The recipient's email address
 * @param {string} options.subject - The subject of the email
 * @param {string} options.text - The body of the email
 */
const sendEmail = async ({ to, subject, text }) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,  // Sender's email address
            to,  // Recipient's email address
            subject,  // Email subject
            text,  // Email body content
        });
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw new Error("Failed to send email");
    }
};

export default sendEmail;
