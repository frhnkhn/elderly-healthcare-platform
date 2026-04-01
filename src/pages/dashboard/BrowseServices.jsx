import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { ServiceCard } from '../../components/Cards';
import Spinner from '../../components/Spinner';
import { api } from '../../utils/mockApi';
import { FiSearch, FiFilter } from 'react-icons/fi';

const CATEGORIES = ['All', 'Nursing Care', 'Attendant', 'Physiotherapy', 'Post Hospital', 'Specialised'];

export default function BrowseServices() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    api.getServices().then(res => { setServices(res.data); setLoading(false); });
  }, []);

  const filtered = services
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase()))
    .filter(s => category === 'All' || s.name.toLowerCase().includes(category.toLowerCase().split(' ')[0]))
    .sort((a, b) => sort === 'price-asc' ? a.price - b.price : sort === 'price-desc' ? b.price - a.price : sort === 'rating' ? b.rating - a.rating : 0);

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="page-title dark:text-white">Browse Services</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Find the perfect care service for your loved one</p>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search services..." className="input-field pl-11" />
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} className="input-field sm:w-48">
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${category === cat ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary-50 hover:text-primary'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? <Spinner center /> : (
        <>
          <p className="text-sm text-gray-500 mb-4">{filtered.length} services found</p>
          {filtered.length === 0
            ? <div className="card text-center py-14"><div className="text-5xl mb-3">🔍</div><p className="text-gray-500">No services match your filters.</p></div>
            : <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(s => <ServiceCard key={s.id} service={s} onBook={svc => navigate(`/user/book?service=${svc.id}`)} />)}
              </div>
          }
        </>
      )}
    </DashboardLayout>
  );
}
