import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FiStar, FiArrowRight, FiCheckCircle, FiShield, FiClock, FiHeart } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

const SERVICES = [
  { icon: '🩺', title: 'Nursing Care', desc: 'Professional registered nurses for medication management, wound care, and health monitoring.' },
  { icon: '❤️', title: 'Elderly Attendant', desc: 'Compassionate daily assistance for bathing, grooming, and companionship.' },
  { icon: '🏃', title: 'Physiotherapy', desc: 'Expert physical therapy to improve mobility and aid recovery at home.' },
  { icon: '🏥', title: 'Post Hospital Care', desc: 'Safe, supervised transition from hospital to home with specialised recovery support.' },
];

const STEPS = [
  { num: '01', title: 'Create Your Profile', desc: "Sign up and add your patient's medical details and care requirements in minutes." },
  { num: '02', title: 'Browse & Choose', desc: 'Explore verified caregivers filtered by service, location, and ratings.' },
  { num: '03', title: 'Book & Relax', desc: 'Confirm your booking and track real-time status. We handle the rest.' },
];

const WHY_US = [
  { icon: <FiShield className="text-primary text-2xl" />, title: 'Verified Professionals', desc: 'Every caregiver undergoes rigorous background checks, credential verification, and training validation.' },
  { icon: <FiClock className="text-primary text-2xl" />, title: '24/7 Available', desc: 'Round-the-clock caregiver availability and emergency support for peace of mind.' },
  { icon: <FiHeart className="text-primary text-2xl" />, title: 'Personalised Care', desc: 'Tailored care plans based on individual patient needs, conditions, and preferences.' },
  { icon: <FiCheckCircle className="text-primary text-2xl" />, title: 'Quality Guaranteed', desc: 'Continuous care monitoring, satisfaction tracking, and a full refund guarantee.' },
];

const TESTIMONIALS = [
  { name: 'Margaret Wilson', role: 'Daughter of patient', text: 'CareConnect found us a wonderful nurse within hours. My father\'s recovery has been remarkable. The caregiver is patient, professional, and truly caring.', rating: 5 },
  { name: 'Robert Thompson', role: 'Patient', text: 'After my hip surgery, I needed reliable home care. The physiotherapist from CareConnect helped me regain mobility in just 3 weeks. Absolutely outstanding service.', rating: 5 },
  { name: 'Patricia Davis', role: 'Wife of patient', text: 'My husband has dementia. The specialised caregiver we found here has changed our lives. She knows exactly how to keep him calm and comfortable. Forever grateful.', rating: 5 },
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-950">
      <Navbar />

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 py-20 lg:py-32">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-100 dark:bg-secondary-900/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 opacity-60"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fadeInUp">
            <span className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 text-primary font-semibold text-sm px-4 py-2 rounded-full mb-6">
              🏆 #1 Trusted Elderly Care Platform
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
              Book Trusted<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-700">Elderly Care</span><br />
              at Home
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-lg">
              Connect with verified nurses, physiotherapists, and attendants for compassionate, professional home-based care — available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="btn-primary py-4 px-8 text-base flex items-center justify-center gap-2">
                Book Care Now <FiArrowRight className="text-lg" />
              </Link>
              <Link to="/login" className="btn-outline py-4 px-8 text-base text-center">
                Sign In
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {['👩‍⚕️', '👨‍⚕️', '👩', '👴'].map((e, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-200 to-primary-400 border-2 border-white dark:border-gray-900 flex items-center justify-center text-sm">{e}</div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[...Array(5)].map((_, i) => <FiStar key={i} className="text-yellow-400 fill-yellow-400 text-sm" />)}
                  <span className="text-sm font-bold text-gray-900 dark:text-white ml-1">4.9</span>
                </div>
                <p className="text-sm text-gray-500">from 2,400+ happy families</p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="card p-5 bg-white dark:bg-gray-800 shadow-card-hover mt-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white text-xl">🩺</div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">Sarah Johnson, RN</p>
                    <p className="text-xs text-gray-500">Nursing Care Specialist</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => <FiStar key={i} className="text-yellow-400 fill-yellow-400 text-xs" />)}
                  <span className="text-xs font-semibold ml-1">4.9</span>
                </div>
                <span className="badge-active">Available Now</span>
              </div>
              <div className="card p-5 bg-white dark:bg-gray-800 shadow-card-hover">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">📋 Today's Schedule</p>
                <p className="text-xs text-gray-500 mb-3">3 visits confirmed</p>
                <div className="space-y-1.5">
                  {['09:00 AM — Wound Care', '01:00 PM — Medication', '05:00 PM — Monitoring'].map(t => (
                    <div key={t} className="text-xs flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>{t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="card p-5 bg-white dark:bg-gray-800 shadow-card-hover">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">📊 Health Overview</p>
                <div className="space-y-2">
                  {[['Blood Pressure', '120/80', 'text-green-500'], ['Heart Rate', '74 bpm', 'text-blue-500'], ['Glucose', '98 mg/dL', 'text-green-500']].map(([label, val, color]) => (
                    <div key={label} className="flex justify-between text-xs">
                      <span className="text-gray-500">{label}</span>
                      <span className={`font-semibold ${color}`}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card p-5 bg-gradient-to-br from-primary to-primary-700 text-white shadow-card-hover">
                <p className="text-sm font-semibold mb-1">✅ Booking Confirmed</p>
                <p className="text-xs opacity-80 mb-2">Physiotherapy session</p>
                <p className="text-lg font-bold">Tomorrow, 10:00 AM</p>
                <p className="text-xs opacity-70 mt-1">Michael Chen, MPT</p>
              </div>
              <div className="card p-4 bg-white dark:bg-gray-800 shadow-card-hover">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Monthly Savings</p>
                    <p className="text-xl font-bold text-green-500">$1,240</p>
                  </div>
                  <span className="text-3xl">💰</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="bg-primary dark:bg-primary-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '10,000+', label: 'Happy Families' },
              { val: '500+', label: 'Verified Caregivers' },
              { val: '50,000+', label: 'Care Hours Delivered' },
              { val: '4.9 ★', label: 'Average Rating' },
            ].map(stat => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold text-white">{stat.val}</p>
                <p className="text-primary-100 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section id="services" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">What We Offer</span>
            <h2 className="section-title mt-2 dark:text-white">Comprehensive Care Services</h2>
            <p className="section-sub dark:text-gray-400">From daily assistance to specialised medical support — all delivered in the comfort of your home.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map(s => (
              <div key={s.title} className="card card-hover text-center group cursor-pointer">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{s.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">{s.desc}</p>
                <Link to="/login" className="text-primary text-sm font-semibold hover:underline">Learn more →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="py-20 bg-background dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Simple Process</span>
            <h2 className="section-title mt-2 dark:text-white">How CareConnect Works</h2>
            <p className="section-sub dark:text-gray-400">Get professional care at your doorstep in 3 simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary to-secondary -translate-y-1/2 z-0"></div>
            {STEPS.map((step, i) => (
              <div key={step.num} className="card text-center relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-700 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-5 shadow-md">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section id="why-us" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Why CareConnect</span>
            <h2 className="section-title mt-2 mb-4 dark:text-white">Care You Can Trust, Every Time</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              We don't just connect you with caregivers — we partner with you to ensure your loved one receives the highest standard of care, backed by technology and compassion.
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {WHY_US.map(item => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { emoji: '🏆', title: 'Award Winning', sub: 'Best Healthcare Platform 2025', color: 'from-yellow-400 to-orange-500' },
              { emoji: '🔒', title: 'HIPAA Compliant', sub: 'Your data is fully protected', color: 'from-primary to-primary-600' },
              { emoji: '💬', title: '24/7 Support', sub: 'Always here when you need us', color: 'from-secondary to-secondary-600' },
              { emoji: '✅', title: '100% Satisfaction', sub: 'Full refund if not happy', color: 'from-purple-500 to-purple-700' },
            ].map(card => (
              <div key={card.title} className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white shadow-lg`}>
                <div className="text-4xl mb-3">{card.emoji}</div>
                <h4 className="font-bold text-lg">{card.title}</h4>
                <p className="text-sm opacity-80 mt-1">{card.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">Testimonials</span>
            <h2 className="section-title mt-2 dark:text-white">Families Love CareConnect</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card">
                <FaQuoteLeft className="text-primary-200 text-3xl mb-4" />
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <FiStar key={i} className="text-yellow-400 fill-yellow-400 text-sm" />)}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="contact" className="py-20 bg-gradient-to-r from-primary to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Get Started?</h2>
          <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of families who trust CareConnect for reliable, compassionate elderly care right at home.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-primary font-bold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
              Book Care Now — It's Free
            </Link>
            <Link to="/login" className="border-2 border-white text-white font-bold py-4 px-8 rounded-xl hover:bg-white hover:text-primary transition-colors">
              Sign In
            </Link>
          </div>
          <p className="text-primary-100 text-sm mt-6">No credit card required • Setup in 2 minutes • Cancel anytime</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
