import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiSave } from 'react-icons/fi';

export default function UserProfile() {
  const { user, role } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', bio: '' });
  const handle = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = (e) => { e.preventDefault(); toast.success('Profile updated successfully!'); };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="page-title dark:text-white">My Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account information</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Avatar card */}
        <div className="card text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-700 rounded-full flex items-center justify-center text-white font-extrabold text-4xl mx-auto mb-4">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h2 className="font-bold text-gray-900 dark:text-white text-xl">{user?.name}</h2>
          <p className="text-gray-500 text-sm capitalize mt-1">{role === 'user' ? 'Family + Elderly' : role}</p>
          <span className="badge bg-green-100 text-green-600 mt-2">Active Account</span>
          <button className="btn-outline w-full mt-4 py-2.5 text-sm">Change Photo</button>
        </div>
        {/* Form */}
        <form onSubmit={handleSave} className="lg:col-span-2 card space-y-4">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Personal Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Full Name</label>
              <div className="relative"><FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="name" value={form.name} onChange={handle} className="input-field pl-11" />
              </div>
            </div>
            <div>
              <label className="label">Email</label>
              <div className="relative"><FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="email" type="email" value={form.email} onChange={handle} className="input-field pl-11" />
              </div>
            </div>
            <div>
              <label className="label">Phone</label>
              <div className="relative"><FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="phone" value={form.phone} onChange={handle} className="input-field pl-11" />
              </div>
            </div>
          </div>
          <div>
            <label className="label">Bio / Notes</label>
            <textarea name="bio" value={form.bio} onChange={handle} rows={3} className="input-field resize-none" placeholder="A brief description..." />
          </div>
          <button type="submit" className="btn-primary py-3 flex items-center gap-2"><FiSave /> Save Changes</button>
        </form>
      </div>
    </DashboardLayout>
  );
}
