// === File: models/ContactRequest.js ===
const mongoose = require('mongoose');

const contactRequestSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ContactRequest', contactRequestSchema);