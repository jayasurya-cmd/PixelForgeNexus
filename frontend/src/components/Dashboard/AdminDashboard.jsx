import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateProject from '../Shared/CreateProject';

function AdminDashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setProjects(res.data);
    }).catch(err => {
      console.error('❌ Failed to fetch projects:', err);
    });
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-indigo-700">👋 Welcome, Admin!</h1>

      <CreateProject />

      <div className="bg-white p-6 rounded-xl shadow-md mt-8">
        <h2 className="text-2xl font-semibold mb-4">📋 Existing Projects</h2>
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : (
          <ul className="space-y-2">
            {projects.map(project => (
              <li key={project._id} className="border-b pb-2">
                <strong>{project.name}</strong> — {project.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
