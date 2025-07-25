import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateProject from './CreateProject';
import UploadFile from './UploadFile';

function Dashboard() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setProjects(res.data);
    }).catch(err => {
      console.error('Failed to load projects', err);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">📁 Project Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <CreateProject />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <UploadFile />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🗂 Projects</h2>
        {projects.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {projects.map((p) => (
              <li key={p._id} className="py-2">
                <span className="font-medium">{p.name}</span> —{" "}
                <span className={p.completed ? "text-green-600" : "text-red-600"}>
                  {p.completed ? "✅ Completed" : "❌ Incomplete"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
