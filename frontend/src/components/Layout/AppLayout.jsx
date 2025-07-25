import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function AppLayout() {
  const role = localStorage.getItem('role') || 'developer'; // fallback if undefined

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={role} />
      <main className="ml-64 flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
