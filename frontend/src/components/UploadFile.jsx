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
      alert('File uploaded!');
    } catch (err) {
      alert('Upload failed');
    }
  };

  return (
    <div>
      <h3>Upload File</h3>
      <form onSubmit={handleUpload}>
        <input placeholder="Project ID" onChange={e => setProjectId(e.target.value)} /><br />
        <input type="file" onChange={e => setFile(e.target.files[0])} /><br />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default UploadFile;
