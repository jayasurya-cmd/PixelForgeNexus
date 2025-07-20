import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(res.data);
      } catch (err) {
        setError('Failed to load projects');
      }
    };
    fetchProjects();
  }, []);

  const markComplete = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/projects/${id}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.map(p => p._id === id ? { ...p, status: 'Completed' } : p));
    } catch {
      alert('You must be an admin to mark as complete');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Project Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="space-y-4">
        {projects.map(project => (
          <li key={project._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p>{project.description}</p>
            <p className="text-sm text-gray-500">Status: {project.status}</p>
            {project.status !== 'Completed' && (
              <button
                onClick={() => markComplete(project._id)}
                className="mt-2 px-4 py-1 bg-green-600 text-white rounded"
              >
                Mark Completed
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
