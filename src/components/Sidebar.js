import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-16 min-h-full p-2">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/home" className="block py-2 px-1 hover:bg-gray-700 text-center">
              <i className="fas fa-home"></i>
              <span className="text-xs block">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/sozo" className="block py-2 px-1 hover:bg-gray-700 text-center">
              <i className="fas fa-star"></i>
              <span className="text-xs block">Sozo</span>
            </Link>
          </li>
          <li>
            <Link to="/about" className="block py-2 px-1 hover:bg-gray-700 text-center">
              <i className="fas fa-cog"></i>
              <span className="text-xs block">about</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

