import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';


export default function Navbar({ onSave, onSettingsClick, folders, onLoginClick, user, isSyncing  }) {
  console.log('User in nav: ', user);
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  return (
    <div className="bg-black p-3 flex justify-between items-center text-white">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-bold">Sozo Tabs</h1>
        {isSyncing && (
          <div className="ml-2 flex items-center text-blue-500">
            <Loader2 className="w-4 h-4 animate-spin mr-1" />
            <span className="text-xs">Syncing...</span>
          </div>
        )}
        <span className="text-sm text-gray-400">
          {user ? `Hi, ${user.name}!` : `${folders?.length || 0}/5 folders used`}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <button 
          onClick={onSave}
          className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-white transition-colors"
        >
          Save
        </button>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2"
            >
              <img
                src={user.profileUrl || '/placeholder.svg'}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
                <button
                  onClick={onSettingsClick}
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 w-full text-left"
                >
                  Account Settings
                </button>
                <button
                  onClick={() => {}}
                  className="block px-4 py-2 text-sm text-yellow-400 hover:bg-gray-700 w-full text-left"
                >
                  Upgrade Plan
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onLoginClick}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

