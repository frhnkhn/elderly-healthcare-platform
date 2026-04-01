import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Spinner from '../../components/Spinner';
import { api } from '../../utils/mockApi';
import { FiSearch, FiUserX, FiUserCheck } from 'react-icons/fi';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { api.getAllUsers().then(r => { setUsers(r.data); setLoading(false); }); }, []);

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title dark:text-white">Manage Users</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{users.length} registered users</p>
        </div>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="input-field pl-9 py-2.5 text-sm w-56" />
        </div>
      </div>
      {loading ? <Spinner center /> : (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <tr>{['Name', 'Email', 'Joined', 'Bookings', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left py-3.5 px-5 font-semibold text-gray-600 dark:text-gray-400">{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold text-sm">{u.name.charAt(0)}</div>
                        <span className="font-medium text-gray-900 dark:text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{u.email}</td>
                    <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{u.joined}</td>
                    <td className="px-5 py-4 font-semibold text-gray-900 dark:text-white">{u.bookings}</td>
                    <td className="px-5 py-4">
                      <span className={`badge ${u.status === 'active' ? 'badge-active' : 'badge-cancelled'}`}>{u.status}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition-colors"><FiUserCheck /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><FiUserX /></button>
                      </div>
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
