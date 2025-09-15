const User = require('../models/User');
const Project = require('../models/Project');
const { cosineSimilarity } = require('../utils/calculateSimilarity');

exports.getRecommendedExperts = async (req, res) => {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const projectEmbedding = project.embedding;

    // Get all experts
    const experts = await User.find({ role: 'expert', embedding: { $exists: true } });

    // Calculate similarity for each expert
    const expertScores = experts.map(expert => {
        const similarity = cosineSimilarity(projectEmbedding, expert.embedding);
        return { expert, similarity };
    });

    // Sort by highest similarity and pick top 5
    expertScores.sort((a, b) => b.similarity - a.similarity);
    const topExperts = expertScores.slice(0, 5).map(item => item.expert);

    res.status(200).json({
        message: 'Recommended Experts fetched successfully',
        recommendedExperts: topExperts
    });
};
