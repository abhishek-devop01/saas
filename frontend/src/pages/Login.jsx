import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/login', { email, password });

            console.log('Login Response:', res.data); // ✅ debug

            const token = res.data.token;
            const userRole = res.data.user?.role;

            if (!token || !userRole) {
                alert('Login failed: Invalid server response');
                return;
            }

            localStorage.setItem('token', token);
            localStorage.setItem('role', userRole);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow w-96">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Email" 
                    className="w-full p-2 border mb-2"
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Password" 
                    className="w-full p-2 border mb-2"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
            </form>
        </div>
    );
}

export default Login;
