import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Spinner from '../../components/Spinner';
import { api } from '../../utils/mockApi';
import { FiSearch } from 'react-icons/fi';

const STATUS_CLASSES = { pending: 'badge-pending', accepted: 'badge-accepted', completed: 'badge-completed', 'in-progress': 'badge-active', cancelled: 'badge-cancelled' };

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => { api.getAllBookings().then(r => { setBookings(r.data); setLoading(false); }); }, []);

  const filtered = bookings
    .filter(b => (b.patient?.toLowerCase().includes(search.toLowerCase()) || b.caregiver?.toLowerCase().includes(search.toLowerCase()) || b.service?.toLowerCase().includes(search.toLowerCase())))
    .filter(b => statusFilter === 'all' || b.status === statusFilter);

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="page-title dark:text-white">Bookings Monitor</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{bookings.length} total bookings</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="input-field pl-9 py-2.5 text-sm w-44" />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="input-field py-2.5 text-sm w-36">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      {loading ? <Spinner center /> : (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <tr>{['ID', 'Service', 'Patient', 'Caregiver', 'Date', 'Amount', 'Status'].map(h => (
                  <th key={h} className="text-left py-3.5 px-4 font-semibold text-gray-600 dark:text-gray-400">{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-3.5 font-mono text-xs text-gray-500">{b.id}</td>
                    <td className="px-4 py-3.5 font-medium text-gray-900 dark:text-white">{b.service}</td>
                    <td className="px-4 py-3.5 text-gray-600 dark:text-gray-400">{b.patient}</td>
                    <td className="px-4 py-3.5 text-gray-600 dark:text-gray-400">{b.caregiver}</td>
                    <td className="px-4 py-3.5 text-gray-500">{b.date}</td>
                    <td className="px-4 py-3.5 font-semibold text-primary">${b.amount}</td>
                    <td className="px-4 py-3.5">
                      <span className={`badge ${STATUS_CLASSES[b.status] || 'badge'}`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
