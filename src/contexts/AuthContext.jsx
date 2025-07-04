import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to load auth state from localStorage
  const loadAuthState = () => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    console.log('Loading auth state:', { storedToken: !!storedToken, storedUser: !!storedUser });
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        console.log('Setting user data:', userData);
        setUser(userData);
        setToken(storedToken);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        logout();
      }
    } else {
      console.log('No stored auth data found');
      setUser(null);
      setToken(null);
    }
  };

  useEffect(() => {
    loadAuthState();
    setLoading(false);
    // Listen for storage changes (multi-tab support)
    const handleStorage = () => loadAuthState();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = async (credentials) => {
    console.log('Login attempt with credentials:', credentials);
    try {
      // Use axios instance for login
      const api = (await import('../lib/axios')).default;
      const response = await api.post('/api/auth/login', credentials);
      const data = response.data;
      console.log('Login response:', data);
      
      if (data && data.user && data.token) {
        console.log('Login successful, setting user:', data.user);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', data.user.role);
        // Immediately update state after login
        loadAuthState();
        return { success: true };
      } else {
        console.log('Login failed - invalid response data');
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      if(error?.response?.data?.message){
        return { success: false, error: error.response.data.message };
      }
      else
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    // Let the component handle navigation
  };

  const isAuthenticated = () => {
    const authenticated = !!token && !!user;
    console.log('isAuthenticated check:', { token: !!token, user: !!user, authenticated });
    return authenticated;
  };

  const hasRole = (requiredRole) => {
    return user && user.role === requiredRole;
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 