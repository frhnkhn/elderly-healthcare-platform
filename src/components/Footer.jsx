import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  const services = ['Nursing Care', 'Elderly Attendant', 'Physiotherapy', 'Post Hospital Care', 'Dementia Care', 'Palliative Care'];
  const quickLinks = [
    { label: 'About Us', to: '/#why-us' },
    { label: 'How It Works', to: '/#how-it-works' },
    { label: 'Book a Caregiver', to: '/login' },
    { label: 'Become a Caregiver', to: '/register' },
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-600 rounded-xl flex items-center justify-center">
                <FaHeartbeat className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-white">Care<span className="text-primary-400">Connect</span></span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-5">
              Connecting families with trusted, verified caregivers for compassionate, professional home-based elderly care.
            </p>
            <div className="flex items-center gap-3">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors">
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">Our Services</h4>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s}>
                  <Link to="/login" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-base">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FiMapPin className="text-primary-400 mt-0.5 shrink-0" />
                123 Healthcare Ave, New York, NY 10001
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiPhone className="text-primary-400 shrink-0" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <FiMail className="text-primary-400 shrink-0" />
                care@careconnect.com
              </li>
            </ul>
            <div className="mt-6 p-4 bg-gray-800 rounded-2xl">
              <p className="text-sm font-medium text-white mb-1">24/7 Emergency Support</p>
              <p className="text-primary-400 font-bold">1-800-CARE-NOW</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 CareConnect. All rights reserved.</p>
          <p className="text-sm text-gray-500">Made with ❤️ for a healthier world</p>
        </div>
      </div>
    </footer>
  );
}
