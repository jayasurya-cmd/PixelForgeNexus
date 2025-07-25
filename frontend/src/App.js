import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import UploadFile from './components/Shared/UploadFile';
import CreateProject from './components/Shared/CreateProject';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/Auth/RegisterPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';


function App() {
  const token = localStorage.getItem('token');
   return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="upload" element={<UploadFile />} />
          <Route path="projects" element={<CreateProject />} />
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* Add more protected routes here */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
