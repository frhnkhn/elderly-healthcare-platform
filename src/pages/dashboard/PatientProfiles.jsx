import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import Spinner from '../../components/Spinner';
import { api } from '../../utils/mockApi';
import { toast } from 'react-toastify';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';

const BLANK = { name: '', age: '', gender: '', condition: '', careType: '', address: '', emergencyContact: '', notes: '' };

export default function PatientProfiles() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(BLANK);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getPatients().then(res => { setPatients(res.data); setLoading(false); });
  }, []);

  const handle = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name || !form.age) { toast.error('Name and age are required.'); return; }
    setSaving(true);
    const res = await api.savePatient(form);
    setSaving(false);
    if (res.success) {
      setPatients(prev => [...prev, res.data]);
      setForm(BLANK);
      setShowForm(false);
      toast.success(res.message);
    }
  };

  const CARE_TYPES = ['Nursing Care', 'Elderly Attendant', 'Physiotherapy', 'Post Hospital Care', 'Dementia Care', 'Palliative Care'];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="page-title dark:text-white">Patient Profiles</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage care profiles for your family members</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary py-2.5 px-5 text-sm flex items-center gap-2">
          <FiPlus /> Add Patient
        </button>
      </div>

      {loading ? <Spinner center /> : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {patients.map(p => (
            <div key={p.id} className="card card-hover">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold text-xl">
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{p.name}</h3>
                    <p className="text-sm text-gray-500">{p.age} yrs • {p.gender}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"><FiEdit2 className="text-sm" /></button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"><FiTrash2 className="text-sm" /></button>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 w-28 shrink-0">Condition:</span>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{p.condition}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 w-28 shrink-0">Care Type:</span>
                  <span className="badge bg-primary-50 text-primary-600 text-xs">{p.careType}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 w-28 shrink-0">Address:</span>
                  <span className="text-gray-700 dark:text-gray-300">{p.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 w-28 shrink-0">Emergency:</span>
                  <span className="text-gray-700 dark:text-gray-300 text-xs">{p.emergencyContact}</span>
                </div>
              </div>
              {p.notes && <p className="mt-3 text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2">{p.notes}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Add Patient Profile</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400"><FiX /></button>
            </div>
            <form onSubmit={handleSave} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="label">Patient Name *</label>
                  <input name="name" value={form.name} onChange={handle} className="input-field" placeholder="Full name" required />
                </div>
                <div>
                  <label className="label">Age *</label>
                  <input name="age" type="number" value={form.age} onChange={handle} className="input-field" placeholder="Years" required />
                </div>
                <div>
                  <label className="label">Gender</label>
                  <select name="gender" value={form.gender} onChange={handle} className="input-field">
                    <option value="">Select</option>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="label">Medical Condition</label>
                  <input name="condition" value={form.condition} onChange={handle} className="input-field" placeholder="e.g. Diabetes, Hypertension" />
                </div>
                <div className="col-span-2">
                  <label className="label">Required Care Type</label>
                  <select name="careType" value={form.careType} onChange={handle} className="input-field">
                    <option value="">Select care type</option>
                    {CARE_TYPES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="label">Address</label>
                  <input name="address" value={form.address} onChange={handle} className="input-field" placeholder="Full address" />
                </div>
                <div className="col-span-2">
                  <label className="label">Emergency Contact</label>
                  <input name="emergencyContact" value={form.emergencyContact} onChange={handle} className="input-field" placeholder="Name, relation, phone" />
                </div>
                <div className="col-span-2">
                  <label className="label">Notes</label>
                  <textarea name="notes" value={form.notes} onChange={handle} className="input-field resize-none" rows={2} placeholder="Any special instructions..." />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1 py-3">{saving ? 'Saving...' : 'Save Profile'}</button>
                <button type="button" onClick={() => setShowForm(false)} className="btn-outline px-5 py-3">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
