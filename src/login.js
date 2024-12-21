import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import './index.css';

const container = document.getElementById('loginRoot');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Login />
    </AuthProvider>
  </React.StrictMode>
);

