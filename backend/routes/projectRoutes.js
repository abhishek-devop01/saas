const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const { createProject } = require('../controllers/projectController');

// Only 'startup' or 'institution' role can post a project
router.post('/create', authenticate, authorize('startup', 'institution'), createProject);

module.exports = router;
