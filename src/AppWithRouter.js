import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sozo from './pages/Sozo';
import AccountSettings from './pages/AccountSettings';
import Home from './pages/Home';
import Login from './auth/Login';
import Register from './auth/Register';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

function AppWithRouter() {
  return (
    <div className="app">
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/account-settings"
              element={
                <PrivateRoute>
                  <AccountSettings />
                </PrivateRoute>
              }
            />
            <Route
              path="/sozo"
              element={
                <PrivateRoute>
                  <Sozo />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/sozo" />} />
          </Routes>
        </AuthProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default AppWithRouter;
