let ioInstance;

const socketHandler = (io) => {
    ioInstance = io;

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Listen for expert joining their personal room
        socket.on('joinExpertRoom', (expertId) => {
            socket.join(expertId);
            console.log(`Expert ${expertId} joined their room`);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};

// Function to send notification to expert
const notifyExpert = (expertId, data) => {
    if (ioInstance) {
        ioInstance.to(expertId).emit('newSessionRequest', data);
    }
};

module.exports = { socketHandler, notifyExpert };
