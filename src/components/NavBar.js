import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="fixed top-0 w-full bg-gray-800 shadow-md p-4 z-10">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-100">
          <Link to="/">ScamSafe</Link>
        </div>
        <div className="space-x-6 flex items-center">
          <Link to="/" className="text-gray-300 hover:text-blue-400">
            Scam Checker
          </Link>
          <Link to="/help-advice" className="text-gray-300 hover:text-blue-400">
            Help & Advice
          </Link>
          <Link to="/scam-trends" className="text-gray-300 hover:text-blue-400">
            Scam Trends
          </Link>
          <Link to="/fraud-contacts" className="text-gray-300 hover:text-blue-400">
            Fraud Contacts
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;