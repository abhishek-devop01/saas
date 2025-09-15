const Project = require('../models/Project');
const { generateEmbedding } = require('../services/openaiService');

exports.createProject = async (req, res) => {
    const { title, description, required_skills } = req.body;

    // Generate OpenAI embedding
    const embedding = await generateEmbedding(description);

    const project = await Project.create({
        title,
        description,
        required_skills,
        posted_by: req.user._id,
        embedding,
        status: 'open'
    });

    res.status(201).json({
        message: 'Project created successfully',
        project
    });
};
