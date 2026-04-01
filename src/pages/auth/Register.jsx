import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiLock, FiMapPin, FiUpload, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaHeartbeat } from 'react-icons/fa';
import Spinner from '../../components/Spinner';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
    qualification: '', experience: '', location: '', serviceType: '',
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [docName, setDocName] = useState('');

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error('Please fill all required fields.'); return; }
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match.'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = register({ name: form.name, email: form.email, phone: form.phone, role, qualification: form.qualification, experience: form.experience, location: form.location });
    setLoading(false);
    if (result.success) {
      toast.success('Account created successfully! Welcome to CareConnect!');
      navigate(role === 'caregiver' ? '/caregiver/dashboard' : '/user/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-4 px-6">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-700 rounded-xl flex items-center justify-center">
            <FaHeartbeat className="text-white text-lg" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">Care<span className="text-primary">Connect</span></span>
        </Link>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Create Your Account</h1>
            <p className="text-gray-500 dark:text-gray-400">Join CareConnect and get care your loved ones deserve</p>
          </div>

          {/* Role Selection */}
          <div className="card mb-6">
            <p className="font-semibold text-gray-900 dark:text-white mb-3">I am registering as:</p>
            <div className="grid grid-cols-2 gap-3">
              {[{ val: 'user', label: 'Family / Elderly', icon: '👨‍👩‍👧', desc: 'Looking for caregivers' },
                { val: 'caregiver', label: 'Caregiver', icon: '👩‍⚕️', desc: 'Offering care services' }
              ].map(r => (
                <button
                  key={r.val}
                  type="button"
                  onClick={() => setRole(r.val)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${role === r.val ? 'border-primary bg-primary-50 dark:bg-primary-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-primary-200'}`}
                >
                  <div className="text-3xl mb-2">{r.icon}</div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{r.label}</p>
                  <p className="text-xs text-gray-500">{r.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="card space-y-4">
            {/* Common Fields */}
            <div>
              <label className="label">Full Name *</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" className="input-field pl-11" required />
              </div>
            </div>
            <div>
              <label className="label">Email Address *</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="input-field pl-11" required />
              </div>
            </div>
            <div>
              <label className="label">Phone Number</label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className="input-field pl-11" />
              </div>
            </div>

            {/* Caregiver-specific */}
            {role === 'caregiver' && (
              <>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                  <p className="text-sm font-semibold text-primary mb-3">👩‍⚕️ Professional Details</p>
                </div>
                <div>
                  <label className="label">Qualification *</label>
                  <input name="qualification" value={form.qualification} onChange={handleChange} placeholder="e.g. Registered Nurse (RN)" className="input-field" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Experience</label>
                    <input name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 5 years" className="input-field" />
                  </div>
                  <div>
                    <label className="label">Service Type</label>
                    <select name="serviceType" value={form.serviceType} onChange={handleChange} className="input-field">
                      <option value="">Select...</option>
                      <option>Nursing Care</option>
                      <option>Elderly Attendant</option>
                      <option>Physiotherapy</option>
                      <option>Post Hospital Care</option>
                      <option>Dementia Care</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label">Location</label>
                  <div className="relative">
                    <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input name="location" value={form.location} onChange={handleChange} placeholder="City, State" className="input-field pl-11" />
                  </div>
                </div>
                <div>
                  <label className="label">Upload Documents</label>
                  <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer hover:border-primary-300 transition-colors">
                    <FiUpload className="text-primary text-xl" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{docName || 'Click to upload credentials'}</p>
                      <p className="text-xs text-gray-400">PDF, JPG, PNG (Max 10MB)</p>
                    </div>
                    <input type="file" className="hidden" onChange={e => setDocName(e.target.files[0]?.name || '')} accept=".pdf,.jpg,.jpeg,.png" />
                  </label>
                </div>
              </>
            )}

            {/* Password */}
            <div className="border-t border-gray-100 dark:border-gray-700 pt-2">
              <label className="label">Password *</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="password" type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={handleChange} placeholder="At least 6 characters" className="input-field pl-11 pr-11" required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <div>
              <label className="label">Confirm Password *</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="confirmPassword" type="password" value={form.confirmPassword}
                  onChange={handleChange} placeholder="Confirm your password" className="input-field pl-11" required
                />
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2">
                {loading ? <><Spinner size="sm" /> Creating Account...</> : 'Create Account — It\'s Free'}
              </button>
            </div>

            <p className="text-xs text-center text-gray-400">
              By registering you agree to our{' '}
              <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>{' '}
              and <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
            </p>
          </form>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-5 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
