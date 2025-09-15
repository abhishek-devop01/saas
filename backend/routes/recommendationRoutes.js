const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const authorize = require('../middleware/roleMiddleware');
const { getRecommendedExperts } = require('../controllers/recommendationController');

// GET /api/recommendations/:projectId → Get recommended experts
router.get('/:projectId', authenticate, authorize('startup', 'institution'), getRecommendedExperts);

module.exports = router;
