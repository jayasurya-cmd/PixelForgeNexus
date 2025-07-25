import React, { useState } from 'react';
import axios from 'axios';

function UploadFile() {
  const [file, setFile] = useState(null);
  const [projectId, setProjectId] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    try {
      await axios.post('http://localhost:5000/api/files/upload', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ File uploaded!');
      setFile(null);
      setProjectId('');
    } catch (err) {
      alert('❌ Upload failed');
    }
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">📤 Upload File</h2>
      <form onSubmit={handleUpload} className="space-y-3">
        <input
          type="text"
          placeholder="Project ID"
          value={projectId}
          onChange={e => setProjectId(e.target.value)}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadFile;
