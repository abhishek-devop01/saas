import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import API from '../api/api';

// ✅ Use the same URL as backend
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
            const res = await API.get('/sessions/my');
            setSessions(res.data.sessions);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">My Sessions</h2>
            <ul>
                {sessions.map(s => (
                    <li key={s._id}>{s.project.title} - {s.status}</li>
                ))}
            </ul>
        </div>
    );
}

export default ExpertDashboard;
