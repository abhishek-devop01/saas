import ProjectForm from '../components/ProjectForm';
import RecommendedExperts from '../components/RecommendedExperts';
import ExpertDashboard from '../components/ExpertDashboard';
import { useState } from 'react';

function Dashboard() {
    const [lastProjectId, setLastProjectId] = useState(null);
    const role = localStorage.getItem('role');
    const userId = "exampleExpertId"; // Replace with logged-in user id from API

    const handleProjectCreated = (projectId) => {
        setLastProjectId(projectId);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            {role === 'startup' || role === 'institution' ? (
                <>
                    <ProjectForm onCreated={handleProjectCreated} />
                    {lastProjectId && <RecommendedExperts projectId={lastProjectId} />}
                </>
            ) : role === 'expert' ? (
                <ExpertDashboard expertId={userId} />
            ) : (
                <p>Unknown role</p>
            )}
        </div>
    );
}

export default Dashboard;
