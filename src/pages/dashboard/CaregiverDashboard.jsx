import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { StatCard } from '../../components/Cards';
import Spinner from '../../components/Spinner';
import { api } from '../../utils/mockApi';
import { useAuth } from '../../context/AuthContext';

export default function CaregiverDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getCaregiverRequests(), api.getEarnings()]).then(([r, e]) => {
      setRequests(r.data); setEarnings(e.data); setLoading(false);
    });
  }, []);

  const totalEarnings = earnings.reduce((a, b) => a + b.amount, 0);
  const totalBookings = earnings.reduce((a, b) => a + b.bookings, 0);

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-r from-secondary to-secondary-600 rounded-2xl p-6 mb-8 text-white flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Welcome, {user?.name?.split(' ')[0]}! 🏥</h1>
          <p className="text-secondary-100">Here's your caregiver dashboard overview.</p>
        </div>
        <Link to="/caregiver/profile" className="hidden sm:flex bg-white text-secondary font-bold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors items-center gap-2">
          My Profile
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard icon="📩" label="Pending Requests" value={requests.filter(r => r.status === 'pending').length} color="primary" />
        <StatCard icon="✅" label="Accepted This Month" value={totalBookings} trend="+14" color="secondary" />
        <StatCard icon="💰" label="Total Earnings" value={`$${totalEarnings.toLocaleString()}`} trend="+$9.6k" color="orange" />
        <StatCard icon="⭐" label="Avg. Rating" value="4.9" color="purple" />
      </div>

      {loading ? <Spinner center /> : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pending requests */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Pending Requests</h2>
              <Link to="/caregiver/requests" className="text-sm text-primary hover:underline font-medium">View all →</Link>
            </div>
            <div className="space-y-4">
              {requests.filter(r => r.status === 'pending').map(req => (
                <div key={req.id} className="card">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-bold text-gray-900 dark:text-white">{req.service}</h3>
                    <span className="badge-pending">Pending</span>
                  </div>
                  <div className="text-sm text-gray-500 grid grid-cols-2 gap-1 mb-4">
                    <span>👤 {req.patient}</span>
                    <span>📅 {req.date}</span>
                    <span>🕐 {req.time}</span>
                    <span>⏱ {req.duration}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn-secondary flex-1 py-2 text-sm" onClick={() => alert('Accepted!')}>Accept</button>
                    <button className="btn-danger flex-1 py-2 text-sm" onClick={() => alert('Rejected!')}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Earnings summary */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Earnings Overview</h2>
            <div className="card">
              <div className="space-y-4">
                {earnings.map(e => (
                  <div key={e.month}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{e.month}</span>
                      <span className="font-bold text-gray-900 dark:text-white">${e.amount.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-secondary to-secondary-600 rounded-full" style={{ width: `${(e.amount / 12000) * 100}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{e.bookings} bookings</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Total Earnings</span>
                <span className="text-2xl font-extrabold text-secondary">${totalEarnings.toLocaleString()}</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="card mt-4">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: '📩 Requests', to: '/caregiver/requests' },
                  { label: '💼 My Services', to: '/caregiver/services' },
                  { label: '📆 Availability', to: '/caregiver/availability' },
                  { label: '💰 Earnings', to: '/caregiver/earnings' },
                ].map(a => (
                  <Link key={a.to} to={a.to} className="p-3 text-center border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-primary-50 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
