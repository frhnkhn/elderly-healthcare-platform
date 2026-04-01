import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Spinner from '../../components/Spinner';
import { api } from '../../utils/mockApi';

export default function Earnings() {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { api.getEarnings().then(r => { setEarnings(r.data); setLoading(false); }); }, []);

  const total = earnings.reduce((a, b) => a + b.amount, 0);
  const maxAmount = Math.max(...earnings.map(e => e.amount), 1);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="page-title dark:text-white">Earnings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Track your monthly income and booking history</p>
      </div>

      {loading ? <Spinner center /> : (
        <>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Total Earnings', value: `$${total.toLocaleString()}`, icon: '💰' },
              { label: 'Total Bookings', value: earnings.reduce((a, b) => a + b.bookings, 0), icon: '📋' },
              { label: 'Avg per Booking', value: `$${Math.round(total / Math.max(earnings.reduce((a, b) => a + b.bookings, 0), 1))}`, icon: '📈' },
            ].map(s => (
              <div key={s.label} className="card flex items-center gap-4">
                <div className="text-3xl">{s.icon}</div>
                <div>
                  <p className="text-sm text-gray-500">{s.label}</p>
                  <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="card mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white mb-5">Monthly Earnings</h3>
            <div className="flex items-end gap-4 h-40">
              {earnings.map(e => (
                <div key={e.month} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">${(e.amount / 1000).toFixed(1)}k</span>
                  <div className="w-full rounded-t-xl bg-gradient-to-t from-secondary to-secondary-400 transition-all" style={{ height: `${(e.amount / maxAmount) * 100}%` }}></div>
                  <span className="text-xs text-gray-400">{e.month.slice(0, 3)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Earnings Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-100 dark:border-gray-700">
                  {['Month', 'Bookings', 'Amount', 'Avg / Booking'].map(h => (
                    <th key={h} className="text-left pb-3 font-semibold text-gray-500 pr-4">{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {earnings.map(e => (
                    <tr key={e.month} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <td className="py-3 font-medium text-gray-900 dark:text-white pr-4">{e.month}</td>
                      <td className="py-3 text-gray-600 dark:text-gray-400 pr-4">{e.bookings}</td>
                      <td className="py-3 font-bold text-secondary pr-4">${e.amount.toLocaleString()}</td>
                      <td className="py-3 text-gray-600 dark:text-gray-400">${Math.round(e.amount / e.bookings)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
