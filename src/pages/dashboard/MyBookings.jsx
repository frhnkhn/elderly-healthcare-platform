import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { BookingCard } from '../../components/Cards';
import Spinner from '../../components/Spinner';
import { api } from '../../utils/mockApi';
import { Link } from 'react-router-dom';

const STATUS_TABS = ['All', 'Pending', 'Accepted', 'Completed', 'Cancelled'];

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('All');

  useEffect(() => {
    api.getBookings().then(res => { setBookings(res.data); setLoading(false); });
  }, []);

  const filtered = tab === 'All' ? bookings : bookings.filter(b => b.status.toLowerCase() === tab.toLowerCase());

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title dark:text-white">My Bookings</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Track all your care appointments</p>
        </div>
        <Link to="/user/book" className="btn-primary py-2.5 px-5 text-sm">+ New Booking</Link>
      </div>

      {/* Tab Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {STATUS_TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${tab === t ? 'bg-primary text-white shadow' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 hover:text-primary border border-gray-100 dark:border-gray-700'}`}>
            {t}
            {t !== 'All' && <span className="ml-1.5 text-xs opacity-70">({bookings.filter(b => b.status.toLowerCase() === t.toLowerCase()).length})</span>}
          </button>
        ))}
      </div>

      {loading ? <Spinner center /> : (
        filtered.length === 0
          ? <div className="card text-center py-14">
              <div className="text-5xl mb-3">📋</div>
              <p className="text-gray-500 mb-4">No {tab.toLowerCase()} bookings found.</p>
              <Link to="/user/book" className="btn-primary py-2.5 px-6 text-sm">Book a Service</Link>
            </div>
          : <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(b => <BookingCard key={b.id} booking={b} />)}
            </div>
      )}
    </DashboardLayout>
  );
}
