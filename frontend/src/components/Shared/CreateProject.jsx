import React, { useState } from 'react';
import axios from 'axios';

function CreateProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/projects', {
        name, description, deadline
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Project created');
      setName('');
      setDescription('');
      setDeadline('');
    } catch (err) {
      alert('❌ Failed to create project');
    }
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">📌 Create New Project</h2>
      <form onSubmit={handleCreate} className="space-y-3">
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Create Project
        </button>
      </form>
    </div>
  );
}

export default CreateProject;
