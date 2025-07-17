// === File: controllers/scaleController.js ===
const ScaleRequest = require('../models/ScaleRequest');
const nodemailer = require('nodemailer');

// Create a reusable transporter using Gmail SMTP
// Make sure you set GMAIL_USER and GMAIL_PASS in your .env securely
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,       // e.g. alchemylab.dev@gmail.com
      pass: process.env.GMAIL_PASS,       // e.g. App Password or OAuth2 token
    },
    // To reduce spam flags:
    tls: {
      rejectUnauthorized: true
    },
  });
  
  // Common footer used in all emails
  const emailFooter = `
    <hr style="border:none;border-top:1px solid #ddd;margin:20px 0;" />
    <p style="font-size:12px;color:#666;">
      You’re receiving this because you requested to “Scale With Me” at Alchemy Lab.<br/>
      Alchemy Lab | Architecting Future SaaS with AI<br/>
      <a href="https://alchemy-lab.dev" style="color:#666;text-decoration:underline;">Unsubscribe</a>
    </p>
  `;

// Create a new scale request
exports.createRequest = async (req, res) => {
  try {
    // save to database
    const requestData = req.body;
    const newRequest = new ScaleRequest(requestData);
    const savedRequest = await newRequest.save();

    // 2. Send emails (don't hold up response)
    const { name, email } = requestData;

    // 2a. Welcome email to the user
    transporter.sendMail({
      from: `"Alchemy Lab" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Thanks for your “Scale With Me” request!',
      html: `
        <h2 style="color:#333;">Hi ${name},</h2>
        <p>Thank you for reaching out! We’ve received your collaboration request and we'll be in touch shortly.</p>
        <p>In the meantime, feel free to explore our <a href="https://ai-product-alchemy-lab.vercel.app/process">Process & Playbook</a> for insight into how we’ll bring your AI vision to life.</p>
        ${emailFooter}
      `,
    }).catch(err => {
      console.error('Error sending welcome email:', err);
    });

    // 2b. Notification email to the admin
    transporter.sendMail({
      from: `"Alchemy Lab" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,  // alchemylab.dev@gmail.com
      subject: `New Scale Request from ${email}`,
      html: `
        <h2 style="color:#333;">New “Scale With Me” Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${requestData.company || '—'}</p>
        <p><strong>Chosen AI Idea:</strong> ${requestData.ideaChoice || 'Custom'}</p>
        <p><strong>Custom Idea:</strong> ${requestData.customIdea || '—'}</p>
        <p><strong>Roles:</strong> ${(requestData.role || []).join(', ')}</p>
        <p><strong>Help Needed:</strong> ${(requestData.helpNeeded || []).join(', ')}</p>
        <p><strong>Timeline:</strong> ${requestData.timeline || '—'}</p>
        ${emailFooter}
      `,
    }).catch(err => {
      console.error('Error sending admin notification email:', err);
    });

    //respond to http client
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Error creating scale request:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// (Optional) Get all requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await ScaleRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error('Error fetching scale requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
};