import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './NavBar'; // Fixed to NavBar
import Footer from '../components/Footer';
import ResultCard from '../components/ResultCard'; // Changed to ResultCard (singular)

const riskStyles = {
  'Low': 'bg-green-100 border-green-500 text-green-800',
  'Medium': 'bg-yellow-100 border-yellow-500 text-yellow-800',
  'High': 'bg-red-100 border-red-500 text-red-800',
  'Extremely High': 'bg-red-200 border-red-700 text-red-900',
};

function ResultsCard({ riskLevel, explanation, nextSteps }) {
  return (
    <div className={`p-6 rounded-xl shadow-md border-l-4 ${riskStyles[riskLevel]}`}>
      <h3 className="text-xl font-semibold mb-2">{riskLevel} Risk</h3>
      <p className="text-base mb-4">{explanation}</p>
      <p className="text-sm">{nextSteps}</p>
    </div>
  );
}

export default ResultsCard;