import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { StatCard } from '../../components/Cards';
import Spinner from '../../components/Spinner';
import { api } from '../../utils/mockApi';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.getAdminStats().then(r => { setStats(r.data); setLoading(false); }); }, []);

  return (
    <DashboardLayout>
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-6 mb-8 text-white">
        <h1 className="text-2xl font-bold mb-1">Admin Control Panel</h1>
        <p className="text-purple-200">Platform overview and management dashboard</p>
      </div>

      {loading ? <Spinner center /> : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <StatCard icon="👥" label="Total Users" value={stats.totalUsers.toLocaleString()} trend="+12%" color="primary" />
            <StatCard icon="👩‍⚕️" label="Total Caregivers" value={stats.totalCaregivers} trend="+8%" color="secondary" />
            <StatCard icon="📋" label="Total Bookings" value={stats.totalBookings.toLocaleString()} trend="+24%" color="purple" />
            <StatCard icon="💰" label="Total Revenue" value={`$${(stats.revenue / 1000).toFixed(0)}k`} trend="+31%" color="orange" />
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Active Bookings', value: stats.activeBookings, color: 'bg-blue-50 text-blue-700 border-blue-100', icon: '🟢' },
              { label: 'Pending Verifications', value: stats.pendingVerifications, color: 'bg-yellow-50 text-yellow-700 border-yellow-100', icon: '⏳' },
              { label: 'Open Complaints', value: stats.complaints, color: 'bg-red-50 text-red-700 border-red-100', icon: '⚠️' },
              { label: 'Platform Rating', value: '4.9 ★', color: 'bg-green-50 text-green-700 border-green-100', icon: '⭐' },
            ].map(s => (
              <div key={s.label} className={`card border ${s.color.split(' ')[2]} ${s.color.split(' ')[0]}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <p className={`text-sm font-medium ${s.color.split(' ')[1]}`}>{s.label}</p>
                    <p className={`text-2xl font-extrabold ${s.color.split(' ')[1]}`}>{s.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Nav */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: '👥 Manage Users', to: '/admin/users', desc: `${stats.totalUsers.toLocaleString()} registered users` },
              { label: '👩‍⚕️ Manage Caregivers', to: '/admin/caregivers', desc: `${stats.pendingVerifications} pending verifications` },
              { label: '📋 Monitor Bookings', to: '/admin/bookings', desc: `${stats.activeBookings} active bookings` },
              { label: '⚕️ Manage Services', to: '/admin/services', desc: 'Add, edit, or remove services' },
              { label: '⚠️ Complaints', to: '/admin/complaints', desc: `${stats.complaints} open complaints` },
              { label: '📊 Analytics', to: '/admin/dashboard', desc: 'Platform metrics & reports' },
            ].map(item => (
              <Link key={item.to} to={item.to} className="card card-hover border border-gray-100 dark:border-gray-700">
                <p className="font-bold text-gray-900 dark:text-white mb-1">{item.label}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </Link>
            ))}
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
