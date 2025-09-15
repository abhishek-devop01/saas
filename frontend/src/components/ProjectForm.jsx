import { useState } from 'react';
import API from '../api/api';

function ProjectForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/projects/create', {
                title,
                description,
                required_skills: skills.split(',')
            });
            alert('Project created successfully');
            setTitle('');
            setDescription('');
            setSkills('');
            if(onCreated) onCreated(res.data.project._id);
        } catch (err) {
            console.error(err);
            alert('Error creating project');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Project Title" className="w-full p-2 border mb-2"/>
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Project Description" className="w-full p-2 border mb-2"/>
            <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="Skills (comma separated)" className="w-full p-2 border mb-2"/>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Project</button>
        </form>
    );
}

export default ProjectForm;
