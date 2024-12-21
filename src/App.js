/* global chrome */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import FolderList from './components/FolderList';
import LinkList from './components/LinkList';
import AccountSettings from './pages/AccountSettings';
import Sozo from './pages/Sozo';

function AppContent() {
  const [view, setView] = useState('folders');
  const [showSettings, setShowSettings] = useState(false);
  const { user } = useAuth();
  const [folders, setFolders] = useState([]);
  const [currentLinks, setCurrentLinks] = useState([]);
  const [currentFolderIndex, setCurrentFolderIndex] = useState(-1);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (chrome && chrome.storage) {
      chrome.storage.local.get(['folders', 'isStarted'], (result) => {
        setFolders(result.folders || []);
        setIsStarted(result.isStarted || false);
      });
    }
  }, []);

  const handleGetStarted = () => {
    setIsStarted(true);
    if (chrome && chrome.storage) {
      chrome.storage.local.set({ isStarted: true });
    }
  };

  const handleSave = () => {
    if (folders.length >= 5 && !user) {
      alert('You have reached the maximum number of folders. Please login to continue.');
      return;
    }
    if (chrome && chrome.tabs) {
      chrome.tabs.query({ currentWindow: true }, (tabs) => {
        setCurrentLinks(tabs.map(tab => tab.url));
        setView('links');
        setCurrentFolderIndex(-1);
      });
    }
  };

  const handleLogin = () => {
    if (chrome && chrome.tabs) {
      chrome.tabs.create({ url: 'login.html' });
    }
  };

  if (!isStarted && !user) {
    return (
      <div className="w-[300px] h-[200px] bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold mb-4">Welcome to Sozo Tabs</h1>
        <button
          onClick={handleGetStarted}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors mb-2"
        >
          Get Started
        </button>
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </div>
    );
  }

  if (showSettings) {
    return <AccountSettings onBack={() => setShowSettings(false)} />;
  }

  return (
    <div className="w-[400px] h-[500px] bg-light-900 text-black">
      <Navbar 
        onSave={handleSave}
        onSettingsClick={() => setShowSettings(true)}
        folders={folders}
        onLoginClick={handleLogin}
        user={user}
      />
      
      {view === 'folders' ? (
        <FolderList 
          folders={folders} 
          setFolders={(newFolders) => {
            if (!user && newFolders.length > 5) {
              alert('Please upgrade to premium to create more than 5 folders');
              return;
            }
            if (chrome && chrome.storage) {
              chrome.storage.local.set({ folders: newFolders }, () => {
                setFolders(newFolders);
              });
            }
          }}
          onFolderClick={(links, index) => {
            setCurrentLinks(links);
            setView('links');
            setCurrentFolderIndex(index);
          }}
          user={user}
        />
      ) : (
        <LinkList 
          links={currentLinks}
          folderIndex={currentFolderIndex}
          folders={folders}
          setFolders={(newFolders) => {
            if (chrome && chrome.storage) {
              chrome.storage.local.set({ folders: newFolders }, () => {
                setFolders(newFolders);
              });
            }
          }}
          onBack={() => setView('folders')}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

