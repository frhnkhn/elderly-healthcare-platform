import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { StatCard, BookingCard } from '../../components/Cards';
import Spinner from '../../components/Spinner';
import { api } from '../../utils/mockApi';
import { useAuth } from '../../context/AuthContext';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';

export default function UserDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBookings().then(res => {
      setBookings(res.data);
      setLoading(false);
    });
  }, []);

  const upcoming = bookings.filter(b => ['pending', 'accepted'].includes(b.status));
  const completed = bookings.filter(b => b.status === 'completed');

  return (
    <DashboardLayout>
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary to-primary-700 rounded-2xl p-6 mb-8 text-white flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Good evening, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="text-primary-100">Here's your care overview for today.</p>
        </div>
        <Link to="/user/book" className="hidden sm:flex bg-white text-primary font-bold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors items-center gap-2">
          <FiCalendar /> Book Care
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard icon="📅" label="Upcoming Bookings" value={upcoming.length} trend={`+${upcoming.length}`} color="primary" />
        <StatCard icon="✅" label="Completed Sessions" value={completed.length} trend={`+${completed.length}`} color="secondary" />
        <StatCard icon="👩‍⚕️" label="Active Caregivers" value="1" trend="+1" color="purple" />
        <StatCard icon="💊" label="Total Spent" value={`$${bookings.reduce((a, b) => a + b.amount, 0).toLocaleString()}`} color="orange" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Bookings */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Upcoming Bookings</h2>
            <Link to="/user/bookings" className="text-sm text-primary hover:underline font-medium flex items-center gap-1">
              View all <FiArrowRight />
            </Link>
          </div>
          {loading ? <Spinner center /> : (
            <div className="space-y-4">
              {upcoming.length > 0
                ? upcoming.map(b => <BookingCard key={b.id} booking={b} />)
                : (
                  <div className="card text-center py-10">
                    <div className="text-5xl mb-3">📅</div>
                    <p className="text-gray-500 mb-4">No upcoming bookings</p>
                    <Link to="/user/book" className="btn-primary py-2.5 px-5 text-sm">Book a Caregiver</Link>
                  </div>
                )
              }
            </div>
          )}
        </div>

        {/* Sidebar panel */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="card">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: '📅 Book a Service', to: '/user/book', color: 'bg-primary' },
                { label: '🔍 Browse Services', to: '/user/services', color: 'bg-secondary' },
                { label: '👩‍⚕️ Find Caregivers', to: '/user/caregivers', color: 'bg-purple-500' },
                { label: '🧓 Patient Profiles', to: '/user/patients', color: 'bg-orange-500' },
              ].map(a => (
                <Link key={a.to} to={a.to} className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-colors">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{a.label}</span>
                  <FiArrowRight className="text-gray-400 text-sm" />
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {bookings.slice(-3).reverse().map(b => (
                <div key={b.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-sm shrink-0">📋</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{b.service}</p>
                    <p className="text-xs text-gray-500">{b.date} · {b.caregiver}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
