import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Backend URL

function ExpertDashboard({ expertId }) {
    useEffect(() => {
        // Expert joins their room
        socket.emit('joinExpertRoom', expertId);

        // Listen for new session requests
        socket.on('newSessionRequest', (data) => {
            alert(`New session request for project ${data.projectId}`);
        });

        return () => {
            socket.off('newSessionRequest');
        };
    }, [expertId]);

    return (
        <div>
            <h1>Welcome Expert</h1>
            {/* You can also display list of session requests here */}
        </div>
    );
}

export default ExpertDashboard;
