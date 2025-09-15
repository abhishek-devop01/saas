import ExpertDashboard from './components/ExpertDashboard';

function App() {
    const expertId = "64fa1234abc567890def3456"; // Replace with logged-in expert ID

    return (
        <div className="App">
            <ExpertDashboard expertId={expertId} />
        </div>
    );
}

export default App;
