import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('startup');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/register', { name, email, password, role });
            alert('Registered successfully!');
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert('Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow w-96">
                <h2 className="text-xl font-bold mb-4">Register</h2>
                <input 
                    type="text" 
                    value={name} 
                    onChange={e=>setName(e.target.value)} 
                    placeholder="Name" 
                    className="w-full p-2 border mb-2"
                />
                <input 
                    type="email" 
                    value={email} 
                    onChange={e=>setEmail(e.target.value)} 
                    placeholder="Email" 
                    className="w-full p-2 border mb-2"
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={e=>setPassword(e.target.value)} 
                    placeholder="Password" 
                    className="w-full p-2 border mb-2"
                />
                <select value={role} onChange={e=>setRole(e.target.value)} className="w-full p-2 border mb-2">
                    <option value="startup">Startup</option>
                    <option value="institution">Institution</option>
                    <option value="expert">Expert</option>
                </select>
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Register</button>
            </form>
        </div>
    );
}

export default Register;
