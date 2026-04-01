import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-950">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-background dark:bg-gray-950 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
