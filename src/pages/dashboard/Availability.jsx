import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { toast } from 'react-toastify';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SLOTS = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];

export default function Availability() {
  const [selected, setSelected] = useState({ Monday: ['09:00 AM', '10:00 AM', '02:00 PM'], Tuesday: ['11:00 AM'], Wednesday: [], Thursday: ['09:00 AM'], Friday: ['03:00 PM', '04:00 PM'], Saturday: [], Sunday: [] });

  const toggle = (day, slot) => {
    setSelected(prev => ({
      ...prev,
      [day]: prev[day].includes(slot) ? prev[day].filter(s => s !== slot) : [...prev[day], slot],
    }));
  };

  const handleSave = () => toast.success('Availability updated successfully!');

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title dark:text-white">Manage Availability</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Select your available time slots for each day</p>
        </div>
        <button onClick={handleSave} className="btn-secondary py-2.5 px-5 text-sm">Save Availability</button>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {DAYS.map(day => (
          <div key={day} className="card">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900 dark:text-white">{day}</h3>
              <span className="text-xs text-gray-400">{selected[day]?.length || 0} slots selected</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SLOTS.map(slot => {
                const active = selected[day]?.includes(slot);
                return (
                  <button key={slot} onClick={() => toggle(day, slot)}
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${active ? 'bg-secondary text-white border-secondary' : 'border-gray-200 dark:border-gray-600 text-gray-500 hover:border-secondary hover:text-secondary'}`}>
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
