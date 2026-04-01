import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const NOTIFICATIONS = [
  { id: 1, type: 'booking', icon: '✅', title: 'Booking Confirmed', message: 'Sarah Johnson has accepted your booking for Nursing Care on Apr 5.', time: '2 hours ago', read: false },
  { id: 2, type: 'reminder', icon: '⏰', title: 'Upcoming Session', message: 'Your physiotherapy session with Michael Chen is tomorrow at 11:00 AM.', time: '5 hours ago', read: false },
  { id: 3, type: 'info', icon: 'ℹ️', title: 'Profile Verified', message: 'Your account has been successfully verified.', time: '1 day ago', read: true },
  { id: 4, type: 'booking', icon: '📋', title: 'Session Completed', message: 'Elderly Attendant session with Priya Sharma has been completed. Please leave a review.', time: '3 days ago', read: true },
  { id: 5, type: 'promo', icon: '🎉', title: 'Special Offer', message: 'Get 10% off your next physiotherapy booking this week!', time: '5 days ago', read: true },
];

export default function Notifications() {
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title dark:text-white">Notifications</h1>
          {unread > 0 && <p className="text-gray-500 dark:text-gray-400 mt-1">{unread} unread notification{unread > 1 ? 's' : ''}</p>}
        </div>
        <button className="text-sm text-primary font-medium hover:underline">Mark all as read</button>
      </div>

      <div className="space-y-3 max-w-2xl">
        {NOTIFICATIONS.map(n => (
          <div key={n.id} className={`card flex items-start gap-4 transition-all ${!n.read ? 'border-l-4 border-primary bg-primary-50/30 dark:bg-primary-900/10' : ''}`}>
            <div className="w-11 h-11 rounded-2xl bg-white dark:bg-gray-800 flex items-center justify-center text-xl shadow-sm shrink-0">{n.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={`font-semibold text-sm ${!n.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{n.title}</p>
                <span className="text-xs text-gray-400 shrink-0">{n.time}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{n.message}</p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
