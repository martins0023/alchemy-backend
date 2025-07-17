// === File: controllers/contactController.js ===
const ContactRequest = require('../models/ContactRequest');

// Create a new contact request
exports.createContact = async (req, res) => {
  try {
    const requestData = req.body;
    const newRequest = new ContactRequest(requestData);
    const saved = await newRequest.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    console.error('Error creating contact request:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// (Optional) Get all contact requests
exports.getAllContacts = async (req, res) => {
  try {
    const all = await ContactRequest.find().sort({ createdAt: -1 });
    res.json({ success: true, data: all });
  } catch (error) {
    console.error('Error fetching contact requests:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};