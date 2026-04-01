import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner center size="lg" />;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  if (allowedRoles && !allowedRoles.includes(role)) {
    const redirect = role === 'admin' ? '/admin/dashboard' : role === 'caregiver' ? '/caregiver/dashboard' : '/user/dashboard';
    return <Navigate to={redirect} replace />;
  }

  return children;
}
