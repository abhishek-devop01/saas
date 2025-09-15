import { useEffect, useState } from 'react';
import API from '../api/api';

function RecommendedExperts({ projectId }) {
    const [experts, setExperts] = useState([]);

    useEffect(() => {
        const fetchExperts = async () => {
            try {
                const res = await API.get(`/recommendations/${projectId}`);
                setExperts(res.data.recommendedExperts);
            } catch (err) {
                console.error(err);
            }
        };

        fetchExperts();
    }, [projectId]);

    const bookSession = async (expertId) => {
        const date = prompt('Enter session date (YYYY-MM-DDTHH:mm:ssZ)');
        if (!date) return;

        try {
            const res = await API.post('/sessions/book', { projectId, expertId, date });
            alert('Session booked successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to book session');
        }
    };

    return (
        <div>
            <h3>Recommended Experts</h3>
            <ul>
                {experts.map(expert => (
                    <li key={expert._id} className="mb-2 border p-2 rounded">
                        <strong>{expert.name}</strong> - Skills: {expert.skills.join(', ')}
                        <button
                            onClick={() => bookSession(expert._id)}
                            className="ml-4 bg-green-500 text-white px-2 py-1 rounded"
                        >
                            Book Session
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecommendedExperts;
