import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/protected', {
          withCredentials: true
        });
        console.log('Login Response: ', response.data);
        setUser(response.data.user);
        return response.data;
      } catch (error) {
        // Ignore 401 errors during initial auth check
        if (error.response?.status !== 401) {
          console.error('Auth check error:', error);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    const response = await axios.post('http://localhost:3000/api/login', credentials, {
      withCredentials: true
    });
    console.log('Norm Login response:', response.data);
    setUser(response.data.user);
    return response.data;
  };

  const googleLogin = async (googleData) => {
    const response = await axios.post('http://localhost:3000/api/google-login', googleData, {
      withCredentials: true
    });
    console.log('Goo Login response:', response.data);
    setUser(response.data.user);
    return response.data;
  };

  const register = async (userData) => {
    const response = await axios.post('http://localhost:3000/api/register', userData);
    return response.data;
  };

  const logout = async () => {
    await axios.post('http://localhost:3000/api/logout', {}, {
      withCredentials: true
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, googleLogin, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};