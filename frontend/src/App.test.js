import React from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

function App() {
  const token = localStorage.getItem('token');
  return token ? <Dashboard /> : <LoginPage />;
}

export default App;
