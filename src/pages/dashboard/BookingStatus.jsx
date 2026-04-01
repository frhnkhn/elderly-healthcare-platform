import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';

const STATUS_STEPS = [
  { key: 'pending', label: 'Booking Submitted', icon: '📋', desc: 'Your booking request has been received.' },
  { key: 'accepted', label: 'Caregiver Confirmed', icon: '✅', desc: 'Caregiver has accepted and confirmed the booking.' },
  { key: 'in-progress', label: 'Care in Progress', icon: '🏃', desc: 'The caregiver is currently providing care.' },
  { key: 'completed', label: 'Session Completed', icon: '🎉', desc: 'Care session completed successfully.' },
];

const STATUS_ORDER = ['pending', 'accepted', 'in-progress', 'completed'];

export default function BookingStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking || {
    id: 'BK001', service: 'Nursing Care', caregiver: 'Sarah Johnson', date: '2026-04-05',
    time: '09:00 AM', duration: '8 hours', status: 'accepted', patient: 'Robert Smith', amount: 900,
    address: '123 Main St, New York, NY',
  };

  const currentStep = STATUS_ORDER.indexOf(booking.status);

  const statusColors = { pending: 'yellow', accepted: 'blue', 'in-progress': 'green', completed: 'gray' };
  const color = statusColors[booking.status] || 'blue';
  const colorMap = { yellow: 'bg-yellow-100 text-yellow-700', blue: 'bg-blue-100 text-blue-700', green: 'bg-green-100 text-green-700', gray: 'bg-gray-100 text-gray-600' };

  return (
    <DashboardLayout>
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors">
        <FiArrowLeft /> Back to Bookings
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Booking Status — #{booking.id}</h1>
            <span className={`badge ${colorMap[color]}`}>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Progress</span>
              <span className="text-sm font-semibold text-primary">{Math.round(((currentStep + 1) / STATUS_ORDER.length) * 100)}%</span>
            </div>
            <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary-600 rounded-full transition-all duration-700"
                style={{ width: `${Math.round(((currentStep + 1) / STATUS_ORDER.length) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Steps */}
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-gray-700"></div>
            <div className="space-y-6">
              {STATUS_STEPS.map((step, i) => {
                const done = i <= currentStep;
                const active = i === currentStep;
                return (
                  <div key={step.key} className="flex items-start gap-4 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${done ? 'bg-primary shadow-md' : 'bg-gray-100 dark:bg-gray-700'}`}>
                      {done ? <FiCheck className="text-white font-bold" /> : <span className="text-lg opacity-50">{step.icon}</span>}
                    </div>
                    <div className={`flex-1 py-2 ${active ? '' : 'opacity-70'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <p className={`font-bold ${done ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{step.label}</p>
                        {active && <span className="badge bg-primary-50 text-primary text-xs">Current</span>}
                      </div>
                      <p className="text-sm text-gray-500">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="card h-fit">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Booking Details</h3>
          <div className="space-y-3 text-sm">
            {[
              ['Service', booking.service],
              ['Caregiver', booking.caregiver],
              ['Patient', booking.patient],
              ['Date', booking.date],
              ['Time', booking.time],
              ['Duration', booking.duration],
              ['Address', booking.address],
              ['Total', `$${booking.amount}`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <span className="text-gray-500">{label}</span>
                <span className="font-medium text-gray-900 dark:text-white text-right max-w-36">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
            <p className="text-xs font-semibold text-primary mb-1">📞 Emergency Contact</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">CareConnect 24/7: <span className="font-bold">1-800-CARE-NOW</span></p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
