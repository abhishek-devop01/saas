import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import API from '../api/api';

const socket = io('http://localhost:5000');

function ExpertDashboard({ expertId }) {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        socket.emit('joinExpertRoom', expertId);

        socket.on('newSessionRequest', (data) => {
            alert(`New session request for project ${data.projectId}`);
            fetchSessions();
        });

        fetchSessions();

        return () => {
            socket.off('newSessionRequest');
        };
    }, [expertId]);

    const fetchSessions = async () => {
        try {
            const res = await API.get('/sessions/my'); // Backend API to fetch expert's sessions
            setSessions(res.data.sessions);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>My Sessions</h2>
            <ul>
                {sessions.map(s => (
                    <li key={s._id}>{s.project.title} - {s.status}</li>
                ))}
            </ul>
        </div>
    );
}

export default ExpertDashboard;
