import { useState } from 'react';
import API from '../api/api';

function SessionFeedback({ sessionId, onSubmitted }) {
    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async () => {
        try {
            await API.post('/sessions/feedback', { sessionId, rating, feedback });
            alert('Feedback submitted!');
            if (onSubmitted) onSubmitted();
        } catch(err) {
            console.error(err);
            alert('Failed to submit feedback');
        }
    };

    return (
        <div className="p-2 border rounded my-2">
            <input type="number" min="1" max="5" value={rating} onChange={e=>setRating(e.target.value)} placeholder="Rating (1-5)" className="border p-1 mr-2"/>
            <input type="text" value={feedback} onChange={e=>setFeedback(e.target.value)} placeholder="Feedback" className="border p-1 mr-2"/>
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-2 py-1 rounded">Submit</button>
        </div>
    );
}

export default SessionFeedback;
