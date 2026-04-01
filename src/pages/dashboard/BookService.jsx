import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import Spinner from '../../components/Spinner';
import { api, SERVICES_DATA, CAREGIVERS_DATA } from '../../utils/mockApi';
import { toast } from 'react-toastify';
import { FiCalendar, FiClock, FiMapPin, FiFileText } from 'react-icons/fi';

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];
const DURATIONS = ['1 hour', '2 hours', '4 hours', '6 hours', '8 hours', '10 hours', '12 hours'];

export default function BookService() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    service: searchParams.get('service') ? SERVICES_DATA.find(s => s.id === parseInt(searchParams.get('service')))?.name || '' : '',
    caregiver: searchParams.get('caregiver') ? CAREGIVERS_DATA.find(c => c.id === parseInt(searchParams.get('caregiver')))?.name || '' : '',
    date: '',
    time: '',
    duration: '4 hours',
    patient: '',
    address: '',
    notes: '',
  });

  const handle = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const getPrice = () => {
    const svc = SERVICES_DATA.find(s => s.name === form.service);
    return svc ? svc.price : 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.service || !form.date || !form.time || !form.address) { toast.error('Please fill all required fields.'); return; }
    setLoading(true);
    const res = await api.postBooking({ ...form, amount: getPrice() });
    setLoading(false);
    if (res.success) {
      toast.success(res.message);
      navigate('/user/bookings');
    }
  };

  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="page-title dark:text-white">Book a Service</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Complete the form to schedule care for your loved one</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
          {/* Service & Caregiver */}
          <div className="card space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white">Service Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Select Service *</label>
                <select name="service" value={form.service} onChange={handle} className="input-field" required>
                  <option value="">Choose a service...</option>
                  {SERVICES_DATA.map(s => <option key={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Preferred Caregiver</label>
                <select name="caregiver" value={form.caregiver} onChange={handle} className="input-field">
                  <option value="">Any available caregiver</option>
                  {CAREGIVERS_DATA.map(c => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="card space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><FiCalendar className="text-primary" /> Schedule</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="label">Date *</label>
                <input type="date" name="date" value={form.date} onChange={handle} min={minDate} className="input-field" required />
              </div>
              <div>
                <label className="label">Time *</label>
                <select name="time" value={form.time} onChange={handle} className="input-field" required>
                  <option value="">Select time...</option>
                  {TIME_SLOTS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Duration</label>
                <select name="duration" value={form.duration} onChange={handle} className="input-field">
                  {DURATIONS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Patient & Address */}
          <div className="card space-y-4">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><FiMapPin className="text-primary" /> Location & Patient</h3>
            <div>
              <label className="label">Patient Name *</label>
              <input name="patient" value={form.patient} onChange={handle} placeholder="Name of the patient" className="input-field" required />
            </div>
            <div>
              <label className="label">Service Address *</label>
              <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="address" value={form.address} onChange={handle} placeholder="Full address for the visit" className="input-field pl-11" required />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="card space-y-3">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2"><FiFileText className="text-primary" /> Additional Notes</h3>
            <textarea name="notes" value={form.notes} onChange={handle} rows={3} placeholder="Any special instructions, medical conditions, or requirements..." className="input-field resize-none" />
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="btn-primary flex-1 py-3.5 flex items-center justify-center gap-2">
              {loading ? <><Spinner size="sm" /> Confirming...</> : '✅ Confirm Booking'}
            </button>
            <button type="button" onClick={() => navigate(-1)} className="btn-outline px-6 py-3.5">Cancel</button>
          </div>
        </form>

        {/* Summary */}
        <div>
          <div className="card sticky top-24">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Booking Summary</h3>
            <div className="space-y-3 text-sm">
              {[
                ['Service', form.service || '—'],
                ['Caregiver', form.caregiver || 'Any available'],
                ['Date', form.date || '—'],
                ['Time', form.time || '—'],
                ['Duration', form.duration],
                ['Patient', form.patient || '—'],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-medium text-gray-900 dark:text-white text-right max-w-32 truncate">{value}</span>
                </div>
              ))}
              <div className="flex justify-between pt-3">
                <span className="font-semibold text-gray-900 dark:text-white">Estimated Total</span>
                <span className="text-xl font-extrabold text-primary">${getPrice()}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-xs text-primary-700 dark:text-primary-300">
              💡 Free cancellation up to 24 hours before the booking
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
