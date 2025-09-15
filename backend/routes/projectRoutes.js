const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const { createProject } = require('../controllers/projectController');

// POST /api/projects/create → Create new project (Only startup/institution)
router.post('/create', authenticate, authorize('startup', 'institution'), createProject);

module.exports = router;
