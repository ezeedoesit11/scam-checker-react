import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function HelpAdvice() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <NavBar />
      <div className="pt-20 pb-10 max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-100 mt-8 mb-6">Help & Advice</h1>
        <div className="space-y-4">
          <div>
            <button
              onClick={() => toggleSection('how-to-spot')}
              className="w-full text-left bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700 hover:bg-gray-700 focus:outline-none"
            >
              <h2 className="text-xl font-semibold text-gray-300">How to Spot a Scam</h2>
            </button>
            {expandedSection === 'how-to-spot' && (
              <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 mt-2">
                <p className="text-base text-gray-300 leading-relaxed font-medium mb-2">
                  Key Red Flags:
                </p>
                <ul className="list-disc pl-5 mb-4 text-base text-gray-300 leading-relaxed">
                  <li>You’re pressured to act quickly or urgently</li>
                  <li>The sender asks you to keep it secret or not tell your bank</li>
                  <li>They request unusual payment methods (bank transfer, crypto, gift cards)</li>
                  <li>You're told to send money to a “safe account”</li>
                  <li>The contact came out of the blue (cold call, DM, unexpected email)</li>
                  <li>You’re offered something too good to be true</li>
                  <li>You're asked to lie about the reason for payment</li>
                </ul>
                <p className="text-base text-gray-300 leading-relaxed">
                  If something feels off, pause and verify before acting.
                </p>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={() => toggleSection('what-to-do')}
              className="w-full text-left bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700 hover:bg-gray-700 focus:outline-none"
            >
              <h2 className="text-xl font-semibold text-gray-300">What to Do If You’ve Been Scammed</h2>
            </button>
            {expandedSection === 'what-to-do' && (
              <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 mt-2">
                <ol className="list-decimal pl-5 text-base text-gray-300 leading-relaxed">
                  <li>Stop communication immediately</li>
                  <li>Do not send any more money</li>
                  <li>Contact your bank and explain what happened</li>
                  <li>
                    Report it to:
                    <ul className="list-disc pl-5 mt-1 mb-1">
                      <li>Action Fraud: 0300 123 2040</li>
                      <li>
                        Your bank’s fraud team (
                        <Link to="/fraud-contacts" className="text-blue-400 hover:underline">
                          see Fraud Contacts
                        </Link>
                        )
                      </li>
                    </ul>
                  </li>
                  <li>If you shared identity details, contact CIFAS to protect your credit file</li>
                  <li>Keep screenshots and records of messages, calls, and transfers</li>
                  <li>If it happened on a platform (e.g. Facebook), report the user or listing</li>
                </ol>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={() => toggleSection('prevention-tips')}
              className="w-full text-left bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700 hover:bg-gray-700 focus:outline-none"
            >
              <h2 className="text-xl font-semibold text-gray-300">Trusted Prevention Tips</h2>
            </button>
            {expandedSection === 'prevention-tips' && (
              <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 mt-2">
                <ul className="list-disc pl-5 text-base text-gray-300 leading-relaxed">
                  <li>Never share your full banking password or PIN</li>
                  <li>Use Two-Factor Authentication (2FA) on banking and email accounts</li>
                  <li>Verify sellers or services before sending money</li>
                  <li>Avoid bank transfer for unverified items — use a protected payment method</li>
                  <li>Never allow remote access to your devices</li>
                  <li>Don’t click links in unsolicited emails or texts</li>
                  <li>Regularly check your credit file and use alerts where available</li>
                </ul>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={() => toggleSection('when-to-contact')}
              className="w-full text-left bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700 hover:bg-gray-700 focus:outline-none"
            >
              <h2 className="text-xl font-semibold text-gray-300">When to Contact Your Bank</h2>
            </button>
            {expandedSection === 'when-to-contact' && (
              <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 mt-2">
                <p className="text-base text-gray-300 leading-relaxed mb-2">
                  Contact your bank immediately if:
                </p>
                <ul className="list-disc pl-5 mb-4 text-base text-gray-300 leading-relaxed">
                  <li>You’ve sent money and suspect it was a scam</li>
                  <li>Someone accessed your online banking</li>
                  <li>You’re being told to lie to the bank</li>
                  <li>You were instructed to move money to a “safe account”</li>
                  <li>You shared account security info with someone else</li>
                </ul>
                <p className="text-base text-gray-300 leading-relaxed">
                  Faster action can increase your chances of getting your money back.
                </p>
              </div>
            )}
          </div>
          <div>
            <button
              onClick={() => toggleSection('resources')}
              className="w-full text-left bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700 hover:bg-gray-700 focus:outline-none"
            >
              <h2 className="text-xl font-semibold text-gray-300">Useful Resources</h2>
            </button>
            {expandedSection === 'resources' && (
              <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 mt-2">
                <ul className="list-none space-y-2 text-base text-gray-300 leading-relaxed">
                  <li>
                    <a href="https://www.actionfraud.police.uk" className="text-blue-400 hover:underline">
                      Action Fraud
                    </a>
                  </li>
                  <li>
                    <a href="https://www.takefive-stopfraud.org.uk" className="text-blue-400 hover:underline">
                      Take Five To Stop Fraud
                    </a>
                  </li>
                  <li>
                    <a href="https://www.getsafeonline.org" className="text-blue-400 hover:underline">
                      Get Safe Online
                    </a>
                  </li>
                  <li>
                    <a href="https://www.cifas.org.uk/services/protective-registration" className="text-blue-400 hover:underline">
                      CIFAS Protective Registration
                    </a>
                  </li>
                  <li>
                    <a href="https://www.gov.uk/report-suspicious-emails-websites-phishing" className="text-blue-400 hover:underline">
                      GOV.UK Scam Reporting
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HelpAdvice;