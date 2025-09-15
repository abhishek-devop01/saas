const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const { bookSession } = require('../controllers/sessionController');

// POST /api/sessions/book → Book a session (Only startup/institution role)
router.post('/book', authenticate, authorize('startup', 'institution'), bookSession);

module.exports = router;
