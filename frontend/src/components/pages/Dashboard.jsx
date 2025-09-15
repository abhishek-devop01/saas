import ProjectForm from '../components/ProjectForm';
import RecommendedExperts from '../components/RecommendedExperts';
import { useState } from 'react';

function Dashboard() {
    const [lastProjectId, setLastProjectId] = useState(null);

    const handleProjectCreated = (projectId) => {
        setLastProjectId(projectId); // Pass newly created project to recommendation component
    };

    return (
        <div className="p-4">
            <h1>Dashboard</h1>
            <ProjectForm onCreated={handleProjectCreated} />
            
            {lastProjectId && (
                <RecommendedExperts projectId={lastProjectId} />
            )}
        </div>
    );
}

export default Dashboard;
