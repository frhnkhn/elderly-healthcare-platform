import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { toast } from 'react-toastify';

const COMPLAINTS = [
  { id: 'C001', user: 'Margaret Wilson', caregiver: 'David Kim', issue: 'Caregiver arrived 2 hours late without notification.', date: '2026-03-28', status: 'open', priority: 'high' },
  { id: 'C002', user: 'Robert Thompson', caregiver: 'Emily Rodriguez', issue: 'Caregiver did not follow medication schedule as instructed.', date: '2026-03-25', status: 'investigating', priority: 'high' },
  { id: 'C003', user: 'Linda Davis', caregiver: 'Sarah Johnson', issue: 'Minor disagreement on care routine. Resolved amicably.', date: '2026-03-21', status: 'resolved', priority: 'low' },
  { id: 'C004', user: 'James Brown', caregiver: 'Priya Sharma', issue: 'Billing discrepancy — charged for extra hour not confirmed.', date: '2026-03-18', status: 'resolved', priority: 'medium' },
];

const priorityClasses = { high: 'bg-red-100 text-red-600', medium: 'bg-yellow-100 text-yellow-600', low: 'bg-green-100 text-green-600' };
const statusClasses = { open: 'badge-pending', investigating: 'badge-accepted', resolved: 'badge-completed' };

export default function AdminComplaints() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="page-title dark:text-white">Complaints</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{COMPLAINTS.filter(c => c.status !== 'resolved').length} open complaints requiring attention</p>
      </div>

      <div className="space-y-4">
        {COMPLAINTS.map(c => (
          <div key={c.id} className={`card border-l-4 ${c.status === 'open' ? 'border-red-500' : c.status === 'investigating' ? 'border-yellow-500' : 'border-green-500'}`}>
            <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-gray-400">{c.id}</span>
                  <span className={`badge ${statusClasses[c.status]}`}>{c.status}</span>
                  <span className={`badge ${priorityClasses[c.priority]}`}>{c.priority} priority</span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{c.user}</p>
                <p className="text-sm text-gray-500">vs. Caregiver: <span className="font-medium">{c.caregiver}</span> · {c.date}</p>
              </div>
              <div className="flex gap-2">
                {c.status === 'open' && (
                  <button onClick={() => toast.info('Complaint under investigation.')} className="text-sm px-4 py-2 rounded-xl bg-yellow-50 text-yellow-600 hover:bg-yellow-100 font-medium transition-colors">Investigate</button>
                )}
                {c.status !== 'resolved' && (
                  <button onClick={() => toast.success('Complaint resolved!')} className="text-sm px-4 py-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 font-medium transition-colors">Resolve</button>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl p-3 leading-relaxed">"{c.issue}"</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
