const Session = require('../models/Session');
const { notifyExpert } = require('../sockets/socketHandler');

exports.bookSession = async (req, res) => {
    const { projectId, expertId, date } = req.body;

    const session = await Session.create({
        project: projectId,
        expert: expertId,
        startup: req.user._id,
        date,
        status: 'requested'
    });

    // Notify Expert in real-time
    notifyExpert(expertId, {
        message: 'New session request received',
        sessionId: session._id,
        projectId,
        date
    });

    res.status(201).json({
        message: 'Session booked successfully',
        session
    });
};
