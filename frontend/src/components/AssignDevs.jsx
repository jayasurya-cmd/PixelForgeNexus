import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AssignDevs() {
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedDevs, setSelectedDevs] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setProjects(res.data));

    axios.get('http://localhost:5000/api/users/developers', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setDevelopers(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/projects/assign', {
        projectId: selectedProject,
        developerIds: selectedDevs
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Developers assigned successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Assignment failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white border rounded shadow">
      <h2 className="text-xl font-bold mb-4">👥 Assign Developers to Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full border p-2 rounded"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          required
        >
          <option value="">Select Project</option>
          {projects.map((proj) => (
            <option key={proj._id} value={proj._id}>{proj.name}</option>
          ))}
        </select>

        <label className="block font-medium">Select Developers:</label>
        <div className="grid grid-cols-2 gap-2">
          {developers.map((dev) => (
            <label key={dev._id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={dev._id}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSelectedDevs(prev =>
                    checked ? [...prev, dev._id] : prev.filter(id => id !== dev._id)
                  );
                }}
              />
              <span>{dev.username}</span>
            </label>
          ))}
        </div>

        <button className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
          Assign
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
