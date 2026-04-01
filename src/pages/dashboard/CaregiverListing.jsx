import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { CaregiverCard } from '../../components/Cards';
import Spinner from '../../components/Spinner';
import { api } from '../../utils/mockApi';
import { FiSearch } from 'react-icons/fi';

const SERVICE_TYPES = ['All', 'Nursing Care', 'Elderly Attendant', 'Physiotherapy', 'Post Hospital Care', 'Dementia Care'];

export default function CaregiverListing() {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [availFilter, setAvailFilter] = useState('All');
  const [sort, setSort] = useState('rating');

  useEffect(() => {
    api.getCaregivers().then(res => { setCaregivers(res.data); setLoading(false); });
  }, []);

  const filtered = caregivers
    .filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase()))
    .filter(c => serviceFilter === 'All' || c.services.some(s => s === serviceFilter))
    .filter(c => availFilter === 'All' || c.availability === availFilter)
    .sort((a, b) => sort === 'rating' ? b.rating - a.rating : sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : 0);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="page-title dark:text-white">Find a Caregiver</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Browse verified professionals ready to help</p>
      </div>

      {/* Filters */}
      <div className="card mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or location..." className="input-field pl-11" />
          </div>
          <select value={availFilter} onChange={e => setAvailFilter(e.target.value)} className="input-field sm:w-44">
            <option value="All">Availability</option>
            <option value="Available">Available</option>
            <option value="Busy">Busy</option>
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} className="input-field sm:w-44">
            <option value="rating">Top Rated</option>
            <option value="price-asc">Price: Low-High</option>
            <option value="price-desc">Price: High-Low</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          {SERVICE_TYPES.map(type => (
            <button key={type} onClick={() => setServiceFilter(type)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${serviceFilter === type ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary-50 hover:text-primary'}`}>
              {type}
            </button>
          ))}
        </div>
      </div>

      {loading ? <Spinner center /> : (
        <>
          <p className="text-sm text-gray-500 mb-4">{filtered.length} caregivers found</p>
          {filtered.length === 0
            ? <div className="card text-center py-14"><div className="text-5xl mb-3">👩‍⚕️</div><p className="text-gray-500">No caregivers match your filters.</p></div>
            : <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(c => <CaregiverCard key={c.id} caregiver={c} />)}
              </div>
          }
        </>
      )}
    </DashboardLayout>
  );
}
