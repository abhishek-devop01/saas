const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    required_skills: [{ type: String, required: true }],
    posted_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    embedding: { type: Array },  // OpenAI embedding
    status: { type: String, default: 'open' }  // open / in_progress / completed
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
