// === File: controllers/scaleController.js ===
const ScaleRequest = require('../models/ScaleRequest');

// Create a new scale request
exports.createRequest = async (req, res) => {
  try {
    const requestData = req.body;
    const newRequest = new ScaleRequest(requestData);
    const savedRequest = await newRequest.save();
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