import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Layout/Sidebar';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('developer');
  const [qrImage, setQrImage] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username, password, role
      });
      setQrImage(res.data.qrImage);
      setMessage('Scan this QR code with your Authenticator app');
      setUsername('');
      setPassword('');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="flex">
      <Sidebar role="admin" />
      <div className="flex-1 ml-64 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6">👤 Register New User</h1>
        {!qrImage ? (
          <form onSubmit={handleRegister} className="bg-white p-6 rounded-xl shadow-md space-y-4 max-w-md">
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Role</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
              >
                <option value="admin">Admin</option>
                <option value="lead">Lead</option>
                <option value="developer">Developer</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Register
            </button>
          </form>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-md max-w-md text-center">
            <p className="mb-4 text-gray-700">{message}</p>
            <img src={qrImage} alt="MFA QR Code" className="mx-auto w-48 h-48" />
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
