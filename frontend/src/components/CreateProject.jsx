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
      alert('Project created');
    } catch (err) {
      alert('Failed to create project');
    }
  };

  return (
    <div>
      <h3>Create Project (Admin)</h3>
      <form onSubmit={handleCreate}>
        <input placeholder="Name" onChange={e => setName(e.target.value)} /><br />
        <input placeholder="Description" onChange={e => setDescription(e.target.value)} /><br />
        <input type="date" onChange={e => setDeadline(e.target.value)} /><br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateProject;
