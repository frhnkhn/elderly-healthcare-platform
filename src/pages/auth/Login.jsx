import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { FaHeartbeat } from 'react-icons/fa';
import Spinner from '../../components/Spinner';

const DEMO_CREDS = [
  { role: 'user', email: 'user@demo.com', password: 'demo123', label: 'Family User' },
  { role: 'caregiver', email: 'caregiver@demo.com', password: 'demo123', label: 'Caregiver' },
  { role: 'admin', email: 'admin@demo.com', password: 'admin123', label: 'Admin' },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

  const [form, setForm] = useState({ email: '', password: '', role: 'user' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill in all fields.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));
    const result = login(form.email, form.password, form.role);
    setLoading(false);
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name}!`);
      const redirect = from || (form.role === 'admin' ? '/admin/dashboard' : form.role === 'caregiver' ? '/caregiver/dashboard' : '/user/dashboard');
      navigate(redirect, { replace: true });
    } else {
      toast.error(result.message || 'Login failed. Please check your credentials.');
    }
  };

  const fillDemo = (cred) => {
    setForm({ email: cred.email, password: cred.password, role: cred.role });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background dark:bg-gray-950">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col bg-gradient-to-br from-primary-600 to-primary-900 p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full border border-white" style={{ width: `${(i + 1) * 100}px`, height: `${(i + 1) * 100}px`, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
          ))}
        </div>
        <Link to="/" className="flex items-center gap-2 z-10">
          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
            <FaHeartbeat className="text-white text-xl" />
          </div>
          <span className="text-2xl font-bold">CareConnect</span>
        </Link>
        <div className="flex-1 flex flex-col justify-center z-10">
          <h2 className="text-4xl font-extrabold mb-4 leading-tight">Compassionate Care,<br />Right at Your Door</h2>
          <p className="text-primary-100 text-lg leading-relaxed mb-8">
            Join 10,000+ families who trust CareConnect for verified, professional elderly care at home.
          </p>
          <div className="space-y-4">
            {['24/7 Emergency Support', '500+ Verified Caregivers', 'HIPAA Compliant Platform', '100% Satisfaction Guarantee'].map(item => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs">✓</div>
                <span className="text-primary-100">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-primary-200 text-sm z-10">© 2026 CareConnect. Trusted Elderly Care.</p>
      </div>

      {/* Right Panel */}
      <div className="flex flex-col items-center justify-center p-8">
        {/* Mobile logo */}
        <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-700 rounded-xl flex items-center justify-center">
            <FaHeartbeat className="text-white text-xl" />
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">Care<span className="text-primary">Connect</span></span>
        </Link>

        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400">Sign in to your CareConnect account</p>
          </div>

          {/* Role Selector */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 mb-6">
            {[{ value: 'user', label: '👨‍👩‍👧 Family' }, { value: 'caregiver', label: '👩‍⚕️ Caregiver' }, { value: 'admin', label: '🔐 Admin' }].map(r => (
              <button
                key={r.value}
                onClick={() => setForm(prev => ({ ...prev, role: r.value }))}
                className={`flex-1 py-2 px-2 rounded-xl text-sm font-semibold transition-all ${form.role === r.value ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow' : 'text-gray-500 dark:text-gray-400'}`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label mb-0">Password</label>
                <button type="button" className="text-sm text-primary hover:underline font-medium">Forgot password?</button>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="input-field pl-11 pr-11"
                  required
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 flex items-center justify-center gap-2">
              {loading ? <><Spinner size="sm" /> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-gray-500 dark:text-gray-400 my-5 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">Create account</Link>
          </p>

          {/* Demo accounts */}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-5">
            <p className="text-xs text-gray-400 text-center mb-3 font-medium uppercase tracking-wide">Quick Demo Login</p>
            <div className="grid grid-cols-3 gap-2">
              {DEMO_CREDS.map(cred => (
                <button
                  key={cred.role}
                  onClick={() => fillDemo(cred)}
                  className="text-xs py-2 px-3 border border-primary-100 dark:border-gray-700 rounded-xl text-primary hover:bg-primary-50 dark:hover:bg-gray-800 font-medium transition-colors"
                >
                  {cred.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
