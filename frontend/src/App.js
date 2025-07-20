import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import UploadPage from './components/UploadPage';
import AssignDevs from './components/AssignDevs';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <LoginPage />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/upload" element={token ? <UploadPage /> : <Navigate to="/" />} />
        <Route path="/assign" element={token ? <AssignDevs /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
