import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiLogOut } from 'react-icons/fi';
import { FaHeartbeat } from 'react-icons/fa';

const USER_LINKS = [
  { label: 'Dashboard', to: '/user/dashboard', icon: '🏠' },
  { label: 'Book Service', to: '/user/book', icon: '📅' },
  { label: 'Browse Services', to: '/user/services', icon: '🔍' },
  { label: 'Find Caregivers', to: '/user/caregivers', icon: '👩‍⚕️' },
  { label: 'My Bookings', to: '/user/bookings', icon: '📋' },
  { label: 'Patient Profiles', to: '/user/patients', icon: '🧓' },
  { label: 'Notifications', to: '/user/notifications', icon: '🔔' },
  { label: 'My Profile', to: '/user/profile', icon: '👤' },
];

const CAREGIVER_LINKS = [
  { label: 'Dashboard', to: '/caregiver/dashboard', icon: '🏠' },
  { label: 'Booking Requests', to: '/caregiver/requests', icon: '📩' },
  { label: 'My Services', to: '/caregiver/services', icon: '💼' },
  { label: 'Earnings', to: '/caregiver/earnings', icon: '💰' },
  { label: 'Availability', to: '/caregiver/availability', icon: '📆' },
  { label: 'My Profile', to: '/caregiver/profile', icon: '👤' },
];

const ADMIN_LINKS = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: '📊' },
  { label: 'Users', to: '/admin/users', icon: '👥' },
  { label: 'Caregivers', to: '/admin/caregivers', icon: '👩‍⚕️' },
  { label: 'Bookings', to: '/admin/bookings', icon: '📋' },
  { label: 'Services', to: '/admin/services', icon: '⚕️' },
  { label: 'Complaints', to: '/admin/complaints', icon: '⚠️' },
];

export default function Sidebar() {
  const { role, user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const links = role === 'caregiver' ? CAREGIVER_LINKS : role === 'admin' ? ADMIN_LINKS : USER_LINKS;
  const roleLabel = role === 'caregiver' ? 'Caregiver' : role === 'admin' ? 'Administrator' : 'Family';
  const roleColor = role === 'admin' ? 'from-purple-500 to-purple-700' : role === 'caregiver' ? 'from-secondary to-secondary-600' : 'from-primary to-primary-700';

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col ${collapsed ? 'w-20' : 'w-64'} min-h-screen bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 shrink-0`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2">
              <div className={`w-8 h-8 bg-gradient-to-br ${roleColor} rounded-xl flex items-center justify-center`}>
                <FaHeartbeat className="text-white text-sm" />
              </div>
              <span className="font-bold text-gray-900 dark:text-white text-sm">Care<span className="text-primary">Connect</span></span>
            </Link>
          )}
          {collapsed && (
            <div className={`w-8 h-8 bg-gradient-to-br ${roleColor} rounded-xl flex items-center justify-center mx-auto`}>
              <FaHeartbeat className="text-white text-sm" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors ml-2"
          >
            {collapsed ? <FiMenu className="text-sm" /> : <FiX className="text-sm" />}
          </button>
        </div>

        {/* User info */}
        {!collapsed && (
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${roleColor} rounded-full flex items-center justify-center text-white font-bold shrink-0`}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{user?.name}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${roleColor} text-white font-medium`}>
                  {roleLabel}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {links.map(link => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
                title={collapsed ? link.label : ''}
              >
                <span className="text-lg shrink-0">{link.icon}</span>
                {!collapsed && <span className="truncate">{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={logout}
            className={`sidebar-link text-red-500 hover:bg-red-50 hover:text-red-600 w-full ${collapsed ? 'justify-center px-2' : ''}`}
            title={collapsed ? 'Sign Out' : ''}
          >
            <FiLogOut className="text-lg shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
