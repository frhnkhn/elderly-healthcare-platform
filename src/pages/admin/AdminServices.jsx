import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { SERVICES_DATA } from '../../utils/mockApi';
import { toast } from 'react-toastify';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function AdminServices() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title dark:text-white">Manage Services</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{SERVICES_DATA.length} active services</p>
        </div>
        <button onClick={() => toast.info('Add service form coming soon!')} className="btn-primary py-2.5 px-5 text-sm flex items-center gap-2">
          <FiPlus /> Add Service
        </button>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {SERVICES_DATA.map(s => (
          <div key={s.id} className="card card-hover">
            <div className="flex items-start justify-between mb-3">
              <div className="text-4xl">{s.icon}</div>
              <div className="flex gap-1">
                <button onClick={() => toast.info(`Edit ${s.name}`)} className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"><FiEdit2 className="text-sm" /></button>
                <button onClick={() => toast.error(`Delete ${s.name}?`)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><FiTrash2 className="text-sm" /></button>
              </div>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-1">{s.name}</h3>
            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{s.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-primary text-lg">${s.price}</span>
              <div className="flex items-center gap-1 text-gray-500">⭐ {s.rating} ({s.reviews} reviews)</div>
            </div>
            <div className="mt-2 text-xs text-gray-400">⏱ {s.duration}</div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
