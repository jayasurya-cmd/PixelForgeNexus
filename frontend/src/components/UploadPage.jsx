import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UploadPage() {
  const [projects, setProjects] = useState([]);
  const [file, setFile] = useState(null);
  const [projectId, setProjectId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/projects', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProjects(res.data))
    .catch(err => console.error("Failed to fetch projects:", err));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage('');
    const token = localStorage.getItem('token');

    if (!file || !projectId) return setMessage("Please select both file and project");

    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    try {
      await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('✅ File uploaded and encrypted successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Upload failed');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white border rounded shadow">
      <h2 className="text-xl font-bold mb-4">📁 Secure File Upload</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <select
          className="w-full border p-2 rounded"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          className="w-full"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Upload
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
