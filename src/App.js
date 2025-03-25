import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScamChecker from './pages/ScamChecker';
import HelpAdvice from './pages/HelpAdvice';
import ScamTrends from './pages/ScamTrends';
import FraudContact from './pages/FraudContact';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-300">
        <NavBar />
        <Routes>
          <Route path="/" element={<ScamChecker />} />
          <Route path="/help-advice" element={<HelpAdvice />} />
          <Route path="/scam-trends" element={<ScamTrends />} />
          <Route path="/fraud-contacts" element={<FraudContact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;