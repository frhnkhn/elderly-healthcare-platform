import React from 'react';
import { FiStar, FiMapPin, FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const avatarColors = [
  'from-blue-400 to-blue-600',
  'from-green-400 to-green-600',
  'from-purple-400 to-purple-600',
  'from-pink-400 to-pink-600',
  'from-orange-400 to-orange-600',
  'from-teal-400 to-teal-600',
];

export function ServiceCard({ service, onBook }) {
  return (
    <div className="card card-hover cursor-pointer group">
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl">{service.icon}</div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">${service.price}</p>
          <p className="text-xs text-gray-400">per visit</p>
        </div>
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{service.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">{service.description}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
        <span className="flex items-center gap-1">
          <FiClock className="text-primary" />
          {service.duration}
        </span>
        <span className="flex items-center gap-1">
          <FiStar className="text-yellow-400 fill-yellow-400" />
          <span className="font-medium">{service.rating}</span>
          <span className="text-gray-400">({service.reviews})</span>
        </span>
      </div>
      <button
        onClick={() => onBook?.(service)}
        className="btn-primary w-full py-2.5 text-sm"
      >
        Book Now
      </button>
    </div>
  );
}

export function CaregiverCard({ caregiver, compact = false }) {
  const colorIdx = caregiver.id % avatarColors.length;
  const availColor = caregiver.availability === 'Available' ? 'text-green-500' : 'text-orange-500';

  return (
    <div className="card card-hover">
      <div className="flex items-start gap-4 mb-4">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${avatarColors[colorIdx]} flex items-center justify-center text-white font-bold text-xl shrink-0`}>
          {caregiver.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-gray-900 dark:text-white">{caregiver.name}</h3>
            {caregiver.verified && (
              <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">✓ Verified</span>
            )}
          </div>
          <p className="text-sm text-primary font-medium">{caregiver.qualification}</p>
          <p className="text-xs text-gray-500 mt-0.5">{caregiver.experience} experience</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm mb-3">
        <span className="flex items-center gap-1 text-gray-500">
          <FiStar className="text-yellow-400 fill-yellow-400" />
          <span className="font-semibold text-gray-900 dark:text-white">{caregiver.rating}</span>
          <span>({caregiver.reviews} reviews)</span>
        </span>
      </div>

      <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
        <FiMapPin className="text-primary shrink-0" />
        {caregiver.location}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {caregiver.services.slice(0, 2).map(s => (
          <span key={s} className="text-xs bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full font-medium">{s}</span>
        ))}
        {caregiver.services.length > 2 && (
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">+{caregiver.services.length - 2} more</span>
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className={`text-sm font-semibold ${availColor} flex items-center gap-1`}>
          <span className={`w-2 h-2 rounded-full ${caregiver.availability === 'Available' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
          {caregiver.availability}
        </span>
        <span className="font-bold text-gray-900 dark:text-white">${caregiver.price}<span className="text-sm font-normal text-gray-400">/visit</span></span>
      </div>

      <div className="flex gap-2">
        <Link to={`/user/caregivers/${caregiver.id}`} className="btn-outline flex-1 py-2 text-sm text-center">
          View Profile
        </Link>
        <Link to={`/user/book?caregiver=${caregiver.id}`} className="btn-primary flex-1 py-2 text-sm text-center">
          Book
        </Link>
      </div>
    </div>
  );
}

export function BookingCard({ booking }) {
  const statusStyles = {
    pending: 'badge-pending',
    accepted: 'badge-accepted',
    'in-progress': 'badge-active',
    completed: 'badge-completed',
    cancelled: 'badge-cancelled',
  };

  const statusLabel = {
    pending: 'Pending',
    accepted: 'Accepted',
    'in-progress': 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  return (
    <div className="card card-hover">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-900 dark:text-white">{booking.service}</h3>
          <p className="text-sm text-gray-500 mt-0.5">with {booking.caregiver}</p>
        </div>
        <span className={statusStyles[booking.status] || 'badge'}>{statusLabel[booking.status] || booking.status}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-4">
        <div>📅 {booking.date}</div>
        <div>🕐 {booking.time}</div>
        <div>⏱ {booking.duration}</div>
        <div>👤 {booking.patient}</div>
      </div>
      {booking.notes && (
        <p className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2 mb-4">{booking.notes}</p>
      )}
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-primary">${booking.amount}</span>
        <Link to="/user/bookings/status" state={{ booking }} className="text-sm text-primary hover:underline font-medium">
          Track Status →
        </Link>
      </div>
    </div>
  );
}

export function StatCard({ icon, label, value, trend, color = 'primary' }) {
  const colorMap = {
    primary: 'from-primary to-primary-600 text-primary bg-primary-50',
    secondary: 'from-secondary to-secondary-600 text-secondary bg-secondary-50',
    purple: 'from-purple-500 to-purple-700 text-purple-600 bg-purple-50',
    orange: 'from-orange-400 to-orange-600 text-orange-500 bg-orange-50',
  };
  const [gradient, textColor, bgColor] = (colorMap[color] || colorMap.primary).split(' ');

  return (
    <div className="card flex items-center gap-4">
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} ${gradient.split(' ')[1]} flex items-center justify-center shrink-0 shadow-sm`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        {trend && <p className={`text-xs font-medium mt-0.5 ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{trend} this month</p>}
      </div>
    </div>
  );
}
