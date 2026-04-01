import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import Spinner from '../../components/Spinner';
import { api } from '../../utils/mockApi';
import { FiStar, FiMapPin, FiArrowLeft, FiCheck } from 'react-icons/fi';

const avatarColors = ['from-blue-400 to-blue-600', 'from-green-400 to-green-600', 'from-purple-400 to-purple-600', 'from-pink-400 to-pink-600', 'from-orange-400 to-orange-600', 'from-teal-400 to-teal-600'];

const SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

export default function CaregiverProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caregiver, setCaregiver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCaregiverById(id).then(res => { setCaregiver(res.data); setLoading(false); });
  }, [id]);

  if (loading) return <DashboardLayout><Spinner center /></DashboardLayout>;
  if (!caregiver) return <DashboardLayout><div className="card text-center py-14"><p className="text-gray-500">Caregiver not found.</p></div></DashboardLayout>;

  const colorIdx = caregiver.id % avatarColors.length;

  const REVIEWS = [
    { name: 'Margaret W.', rating: 5, text: 'Absolutely wonderful carer. My mother improved so much under her care.', date: '2026-02-15' },
    { name: 'James T.', rating: 5, text: 'Professional, punctual, and genuinely compassionate. Highly recommended.', date: '2026-01-20' },
    { name: 'Patricia L.', rating: 4, text: 'Very skilled and kind. Always goes the extra mile for her patients.', date: '2025-12-10' },
  ];

  return (
    <DashboardLayout>
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition-colors">
        <FiArrowLeft /> Back to Caregivers
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card">
            <div className="flex items-start gap-5 mb-5">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${avatarColors[colorIdx]} flex items-center justify-center text-white font-extrabold text-3xl shrink-0`}>
                {caregiver.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{caregiver.name}</h1>
                  {caregiver.verified && <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-semibold">✓ Verified</span>}
                </div>
                <p className="text-primary font-semibold">{caregiver.qualification}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 flex-wrap">
                  <span className="flex items-center gap-1"><FiStar className="text-yellow-400 fill-yellow-400" />{caregiver.rating} ({caregiver.reviews} reviews)</span>
                  <span className="flex items-center gap-1"><FiMapPin className="text-primary" />{caregiver.location}</span>
                  <span>💼 {caregiver.experience}</span>
                  <span className={`font-semibold ${caregiver.availability === 'Available' ? 'text-green-500' : 'text-orange-500'}`}>● {caregiver.availability}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{caregiver.bio}</p>
            <div className="flex flex-wrap gap-2">
              {caregiver.languages.map(l => <span key={l} className="badge bg-primary-50 text-primary-600">{l}</span>)}
            </div>
          </div>

          {/* Services */}
          <div className="card">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Services Offered</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {caregiver.services.map(s => (
                <div key={s} className="flex items-center gap-2 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                  <FiCheck className="text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="card">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Patient Reviews</h3>
            <div className="space-y-4">
              {REVIEWS.map((r, i) => (
                <div key={i} className="py-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">{r.name.charAt(0)}</div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{r.name}</p>
                      <p className="text-xs text-gray-400">{r.date}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(r.rating)].map((_, i) => <FiStar key={i} className="text-yellow-400 fill-yellow-400 text-xs" />)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 pl-10 italic">"{r.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="space-y-5">
          <div className="card sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-extrabold text-primary">${caregiver.price}</p>
                <p className="text-xs text-gray-400">per visit</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${caregiver.availability === 'Available' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                {caregiver.availability}
              </div>
            </div>

            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Available Time Slots</h4>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {SLOTS.map(slot => (
                <button key={slot} className="py-1.5 px-3 text-xs border border-primary-200 text-primary rounded-xl hover:bg-primary hover:text-white transition-colors font-medium">
                  {slot}
                </button>
              ))}
            </div>

            <Link to={`/user/book?caregiver=${caregiver.id}`} className="btn-primary w-full py-3.5 text-center block">
              Book Now
            </Link>
            <p className="text-xs text-center text-gray-400 mt-3">No cancellation fee within 24 hours</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
