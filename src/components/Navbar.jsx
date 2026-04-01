import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiMenu, FiX, FiMoon, FiSun, FiBell, FiLogOut, FiUser, FiChevronDown
} from 'react-icons/fi';
import { FaHeartbeat } from 'react-icons/fa';

export default function Navbar() {
  const { isAuthenticated, user, role, logout, darkMode, toggleDarkMode } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  const getDashboardPath = () => {
    if (role === 'caregiver') return '/caregiver/dashboard';
    if (role === 'admin') return '/admin/dashboard';
    return '/user/dashboard';
  };

  const publicLinks = [
    { label: 'Services', to: '/#services' },
    { label: 'How It Works', to: '/#how-it-works' },
    { label: 'Why Us', to: '/#why-us' },
    { label: 'Contact', to: '/#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-700 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <FaHeartbeat className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Care<span className="text-primary">Connect</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {!isAuthenticated && publicLinks.map(link => (
              <a key={link.label} href={link.to} className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium transition-colors">
                {link.label}
              </a>
            ))}
            {isAuthenticated && (
              <Link to={getDashboardPath()} className="text-gray-600 dark:text-gray-300 hover:text-primary font-medium transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            </button>

            {isAuthenticated ? (
              <>
                <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors relative">
                  <FiBell className="text-lg" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block text-gray-700 dark:text-gray-200 font-medium text-sm max-w-24 truncate">{user?.name}</span>
                    <FiChevronDown className={`text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 animate-fadeIn">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{user?.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{role}</p>
                      </div>
                      <Link
                        to={`/${role}/profile`}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm transition-colors"
                      >
                        <FiUser /> My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 text-sm transition-colors"
                      >
                        <FiLogOut /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="btn-ghost py-2 px-4 text-sm">Sign In</Link>
                <Link to="/register" className="btn-primary py-2 px-4 text-sm">Get Started</Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
            >
              {mobileOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800 animate-fadeIn">
            {!isAuthenticated && publicLinks.map(link => (
              <a
                key={link.label}
                href={link.to}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 px-2 text-gray-600 dark:text-gray-300 hover:text-primary font-medium"
              >
                {link.label}
              </a>
            ))}
            {isAuthenticated && (
              <Link to={getDashboardPath()} onClick={() => setMobileOpen(false)} className="block py-2.5 px-2 text-gray-600 hover:text-primary font-medium">
                Dashboard
              </Link>
            )}
            {!isAuthenticated && (
              <div className="flex flex-col gap-2 mt-3">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-outline py-2.5 text-center">Sign In</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-primary py-2.5 text-center">Get Started</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
