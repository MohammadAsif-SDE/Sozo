/* global chrome */
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AppContent from './AppContent';
import AppWithRouter from './AppWithRouter';

export default function App() {
  const isChromeExtension = !!chrome?.runtime?.id;

  return (
    <AuthProvider>
      {isChromeExtension ? (
        <AppContent />
      ) : (
        <Router>
          <AppWithRouter />
        </Router>
      )}
    </AuthProvider>
  );
}
