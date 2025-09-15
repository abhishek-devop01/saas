import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Welcome to Wisdom Connect</h1>
            <p className="mb-6 text-center max-w-md">
                Connect startups and institutions with experienced retired professionals for mentorship, guidance, and part-time consulting.
            </p>
            <div className="flex space-x-4">
                <button 
                    onClick={() => navigate('/login')} 
                    className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
                >
                    Login
                </button>
                <button 
                    onClick={() => navigate('/register')} 
                    className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition"
                >
                    Register
                </button>
            </div>
        </div>
    );
}

export default Home;
