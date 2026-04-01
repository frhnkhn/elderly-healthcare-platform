import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Spinner from '../../components/Spinner';
import { api } from '../../utils/mockApi';
import { FiSearch, FiCheck, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function AdminCaregivers() {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { api.getAllCaregivers().then(r => { setCaregivers(r.data); setLoading(false); }); }, []);

  const filtered = caregivers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.qualification.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title dark:text-white">Manage Caregivers</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{caregivers.length} registered caregivers</p>
        </div>
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search caregivers..." className="input-field pl-9 py-2.5 text-sm w-56" />
        </div>
      </div>
      {loading ? <Spinner center /> : (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                <tr>{['Name', 'Qualification', 'Location', 'Rating', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left py-3.5 px-5 font-semibold text-gray-600 dark:text-gray-400">{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.id} className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-secondary to-secondary-600 flex items-center justify-center text-white font-bold text-sm">{c.name.charAt(0)}</div>
                        <span className="font-medium text-gray-900 dark:text-white">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{c.qualification}</td>
                    <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{c.location}</td>
                    <td className="px-5 py-4 font-semibold text-gray-900 dark:text-white">⭐ {c.rating}</td>
                    <td className="px-5 py-4">
                      <span className="badge badge-active">Verified</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => toast.success(`${c.name} verified!`)} className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition-colors" title="Verify"><FiCheck /></button>
                        <button onClick={() => toast.error(`${c.name} suspended!`)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors" title="Suspend"><FiX /></button>
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
