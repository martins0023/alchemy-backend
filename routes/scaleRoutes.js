// === File: routes/scaleRoutes.js ===
const express = require('express');
const router = express.Router();
const scaleController = require('../controllers/scaleController');

// POST /api/scale/requests
router.post('/requests', scaleController.createRequest);

// GET /api/scale/requests (optional admin)
router.get('/requests', scaleController.getAllRequests);

module.exports = router;