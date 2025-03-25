import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function ScamTrends() {
  return (
    <div className="min-h-screen bg-gray-900">
      <NavBar />
      <div className="pt-20 pb-10 max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-100 mt-8 mb-6">Scam Trends</h1>
        <p className="text-base text-gray-300">Trends data coming soon via API integration.</p>
      </div>
      <Footer />
    </div>
  );
}

export default ScamTrends;