import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(403)
      .json({ status: "error", message: "Invalid request method." });
  }

  const { name, email, phone, service, message, form_type } = req.body;

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({
        status: "error",
        message: "Please fill in all required fields.",
      });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({
        status: "error",
        message: "Please enter a valid email address.",
      });
  }

  const subject =
    form_type === "quick_quote"
      ? `New Quick Quote Request from ${name}`
      : `New Contact Form Submission from ${name}`;

  let emailContent = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n`;
  if (service) emailContent += `Service Interested In: ${service}\n`;
  if (message) emailContent += `Message:\n${message}\n`;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Use your SMTP provider
    port: 587,
    secure: false,
    auth: {
      user: "your_email@gmail.com", // Your email
      pass: "your_app_password", // Your app password (not your regular password)
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "hassanolaitan033@gmail.com", // Change to your recipient
      subject,
      text: emailContent,
      replyTo: email,
    });
    res
      .status(200)
      .json({
        status: "success",
        message: "Your message has been sent successfully!",
      });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        message: "Sorry, something went wrong. Please try again later.",
      });
  }
}
