import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function AccountSettings() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Account Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={user?.photoURL || '/placeholder.svg'}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-white font-medium">{user?.displayName}</p>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Subscription</h3>
          <div className="bg-yellow-400 text-black p-4 rounded-lg">
            <p className="font-medium">Free Plan</p>
            <p className="text-sm mt-1">5 folders limit</p>
            <button className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
              Upgrade to Premium
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-medium text-white mb-4">Actions</h3>
          <div className="space-y-4">
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

