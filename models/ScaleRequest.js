// === File: models/ScaleRequest.js ===
const mongoose = require('mongoose');

const scaleRequestSchema = new mongoose.Schema({
  ideaChoice: { type: String },
  customIdea: { type: String },
  role: [{ type: String }],
  resources: { type: String },
  helpNeeded: [{ type: String }],
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String },
  timeline: { type: String },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ScaleRequest', scaleRequestSchema);