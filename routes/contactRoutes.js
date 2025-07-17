// === File: routes/contactRoutes.js ===
const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST /api/contact
router.post('/', contactController.createContact);

// GET /api/contact (optional admin)
router.get('/', contactController.getAllContacts);

module.exports = router;