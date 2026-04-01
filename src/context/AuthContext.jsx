import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Mock users for demo
const MOCK_USERS = [
  { id: 1, name: 'John Smith', email: 'user@demo.com', password: 'demo123', role: 'user', phone: '555-0101', avatar: null },
  { id: 2, name: 'Sarah Johnson', email: 'caregiver@demo.com', password: 'demo123', role: 'caregiver', qualification: 'RN', experience: '5 years', location: 'New York', rating: 4.8, avatar: null },
  { id: 3, name: 'Admin User', email: 'admin@demo.com', password: 'admin123', role: 'admin', avatar: null },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('careconnect_user');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setRole(parsed.role);
      setIsAuthenticated(true);
    }
    const savedDark = localStorage.getItem('careconnect_dark');
    if (savedDark === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    setLoading(false);
  }, []);

  const login = (email, password, selectedRole) => {
    const found = MOCK_USERS.find(
      u => u.email === email && u.password === password && u.role === selectedRole
    );
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      setRole(userData.role);
      setIsAuthenticated(true);
      localStorage.setItem('careconnect_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, message: 'Invalid credentials or role mismatch.' };
  };

  const register = (userData) => {
    // Mock registration — just log in the user
    const newUser = {
      id: Date.now(),
      ...userData,
    };
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    setRole(safeUser.role);
    setIsAuthenticated(true);
    localStorage.setItem('careconnect_user', JSON.stringify(safeUser));
    return { success: true, user: safeUser };
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('careconnect_user');
  };

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('careconnect_dark', String(next));
    if (next) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, loading, darkMode, login, register, logout, toggleDarkMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
