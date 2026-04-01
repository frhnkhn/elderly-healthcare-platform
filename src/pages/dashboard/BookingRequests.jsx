import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Spinner from '../../components/Spinner';
import { api } from '../../utils/mockApi';
import { toast } from 'react-toastify';
import { FiMapPin } from 'react-icons/fi';

export default function BookingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('pending');

  useEffect(() => {
    api.getCaregiverRequests().then(res => { setRequests(res.data); setLoading(false); });
  }, []);

  const handleStatus = async (id, status) => {
    await api.updateBookingStatus(id, status);
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    toast.success(`Booking ${status}!`);
  };

  const filtered = tab === 'all' ? requests : requests.filter(r => r.status === tab);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="page-title dark:text-white">Booking Requests</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage incoming and accepted booking requests</p>
      </div>
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'accepted', 'completed'].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${tab === t ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700 hover:bg-primary-50 hover:text-primary'}`}>{t}</button>
        ))}
      </div>
      {loading ? <Spinner center /> : filtered.length === 0
        ? <div className="card text-center py-14"><div className="text-5xl mb-3">📩</div><p className="text-gray-500">No {tab} requests.</p></div>
        : <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map(req => (
              <div key={req.id} className="card">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-900 dark:text-white">{req.service}</h3>
                  <span className={`badge ${req.status === 'pending' ? 'badge-pending' : req.status === 'accepted' ? 'badge-accepted' : 'badge-completed'}`}>{req.status}</span>
                </div>
                <div className="text-sm text-gray-500 space-y-1.5 mb-4">
                  <div>👤 Patient: <span className="font-medium text-gray-700 dark:text-gray-300">{req.patient}</span></div>
                  <div>📅 {req.date} · 🕐 {req.time}</div>
                  <div>⏱ Duration: {req.duration}</div>
                  <div className="flex items-start gap-1"><FiMapPin className="mt-0.5 shrink-0 text-primary" />{req.address}</div>
                  {req.notes && <div>📝 {req.notes}</div>}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">${req.amount}</span>
                  {req.status === 'pending' && (
                    <div className="flex gap-2">
                      <button onClick={() => handleStatus(req.id, 'accepted')} className="btn-secondary py-1.5 px-4 text-sm">Accept</button>
                      <button onClick={() => handleStatus(req.id, 'rejected')} className="btn-danger py-1.5 px-4 text-sm">Reject</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
      }
    </DashboardLayout>
  );
}
