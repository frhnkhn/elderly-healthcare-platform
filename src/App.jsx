import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public
import Landing from './pages/public/Landing';

// Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// User Dashboard
import UserDashboard from './pages/dashboard/UserDashboard';
import BrowseServices from './pages/dashboard/BrowseServices';
import CaregiverListing from './pages/dashboard/CaregiverListing';
import CaregiverProfile from './pages/dashboard/CaregiverProfile';
import BookService from './pages/dashboard/BookService';
import MyBookings from './pages/dashboard/MyBookings';
import BookingStatus from './pages/dashboard/BookingStatus';
import PatientProfiles from './pages/dashboard/PatientProfiles';
import Notifications from './pages/dashboard/Notifications';
import UserProfile from './pages/dashboard/UserProfile';

// Caregiver Dashboard
import CaregiverDashboard from './pages/dashboard/CaregiverDashboard';
import BookingRequests from './pages/dashboard/BookingRequests';
import Earnings from './pages/dashboard/Earnings';
import Availability from './pages/dashboard/Availability';

// Admin Dashboard
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCaregivers from './pages/admin/AdminCaregivers';
import AdminBookings from './pages/admin/AdminBookings';
import AdminServices from './pages/admin/AdminServices';
import AdminComplaints from './pages/admin/AdminComplaints';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User routes */}
          <Route path="/user/dashboard" element={<ProtectedRoute allowedRoles={['user']}><UserDashboard /></ProtectedRoute>} />
          <Route path="/user/services" element={<ProtectedRoute allowedRoles={['user']}><BrowseServices /></ProtectedRoute>} />
          <Route path="/user/caregivers" element={<ProtectedRoute allowedRoles={['user']}><CaregiverListing /></ProtectedRoute>} />
          <Route path="/user/caregivers/:id" element={<ProtectedRoute allowedRoles={['user']}><CaregiverProfile /></ProtectedRoute>} />
          <Route path="/user/book" element={<ProtectedRoute allowedRoles={['user']}><BookService /></ProtectedRoute>} />
          <Route path="/user/bookings" element={<ProtectedRoute allowedRoles={['user']}><MyBookings /></ProtectedRoute>} />
          <Route path="/user/bookings/status" element={<ProtectedRoute allowedRoles={['user']}><BookingStatus /></ProtectedRoute>} />
          <Route path="/user/patients" element={<ProtectedRoute allowedRoles={['user']}><PatientProfiles /></ProtectedRoute>} />
          <Route path="/user/notifications" element={<ProtectedRoute allowedRoles={['user']}><Notifications /></ProtectedRoute>} />
          <Route path="/user/profile" element={<ProtectedRoute allowedRoles={['user']}><UserProfile /></ProtectedRoute>} />

          {/* Caregiver routes */}
          <Route path="/caregiver/dashboard" element={<ProtectedRoute allowedRoles={['caregiver']}><CaregiverDashboard /></ProtectedRoute>} />
          <Route path="/caregiver/requests" element={<ProtectedRoute allowedRoles={['caregiver']}><BookingRequests /></ProtectedRoute>} />
          <Route path="/caregiver/services" element={<ProtectedRoute allowedRoles={['caregiver']}><BrowseServices /></ProtectedRoute>} />
          <Route path="/caregiver/earnings" element={<ProtectedRoute allowedRoles={['caregiver']}><Earnings /></ProtectedRoute>} />
          <Route path="/caregiver/availability" element={<ProtectedRoute allowedRoles={['caregiver']}><Availability /></ProtectedRoute>} />
          <Route path="/caregiver/profile" element={<ProtectedRoute allowedRoles={['caregiver']}><UserProfile /></ProtectedRoute>} />

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/caregivers" element={<ProtectedRoute allowedRoles={['admin']}><AdminCaregivers /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute allowedRoles={['admin']}><AdminBookings /></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute allowedRoles={['admin']}><AdminServices /></ProtectedRoute>} />
          <Route path="/admin/complaints" element={<ProtectedRoute allowedRoles={['admin']}><AdminComplaints /></ProtectedRoute>} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
