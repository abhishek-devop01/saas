const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const generateEmbedding = async (text) => {
    try {
        const response = await openai.embeddings.create({
            model: 'text-embedding-ada-002',
            input: text
        });

        // The response structure is also different in the new version
        return response.data[0].embedding;
    } catch (error) {
        console.error("Error generating embedding:", error.message);
        throw error;
    }
};

module.exports = { generateEmbedding };