import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/projects', label: 'Projects' },
    { path: '/upload', label: 'Upload File' },
  ];

  if (role === 'admin') {
    navItems.unshift({ path: '/register', label: 'Register User' });
  }
  if (role === 'lead') {
    navItems.push({ path: '/assign', label: 'Assign Devs' });
  }

  return (
    <div className="w-64 h-screen bg-white border-r shadow-lg p-4 space-y-6 fixed">
      <h2 className="text-2xl font-bold text-indigo-600">PixelForge</h2>
      <nav className="flex flex-col gap-2 mt-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
