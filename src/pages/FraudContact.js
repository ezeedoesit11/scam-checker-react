import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const bankContacts = [
  {
    name: 'Natwest',
    customerService: '03457 888 444 (Natwest), 03457 242 424 (RBS), 03457 424 365 (Ulster NI)',
    fraud: {
      accountTakeoverDebit: '0800 161 5156',
      accountTakeoverCredit: '0800 161 5155',
      debitCardProfiling: '0345 307 0009',
      creditCardFraud: '0800 161 5153 / +44 1268 508 020 (International)',
      creditCardRetailDispute: '0800 904 7015',
      creditCardFraudCommercial: '0800 161 5164',
      creditCardDisputes: '0800 012 1369',
      fasterPaymentFraud: '0800 161 5165',
      mobileBankingFraud: '0800 161 5168',
      onlineBankingFraud: '0800 161 5154',
      openBankingFraud: '0800 161 5154',
      smishing: '020 7183 6009',
      offshoreFraud: '01624 637 190',
      fraudReportsAndBlocks: '0800 028 9096',
      fraudApplication: '0800 085 0499',
      creditProfiling: '0800 161 5163',
    },
    internationalCreditProfiling: '+44 1268 508 154',
    customerServiceOffshore: '01534 282 850',
    couttsFraud: '020 7770 0011',
  },
  {
    name: 'Barclays',
    customerService: '0345 734 5345',
    fraud: {
      debitCardFraud: '0800 389 1652 / +44 1604 529 410 (International)',
      creditCardFraud: '0800 318 665 / +44 1452 828 309 (International)',
      barclayPartnerFinanceFraud: '0800 152 2888 / +44 1236 681 763 (International)',
      smartInvestorFraud: '0800 279 3667 / +44 1413 523 919 (International)',
      otherFraud: '0800 389 1652 / +44 1604 529 410 (International)',
    },
  },
  {
    name: 'Halifax',
    customerService: '0345 720 3040 / +44 1132 421 984 (International)',
    fraud: {
      creditCardFraud: '0800 015 1515 / +44 1132 428 196 (International)',
      onlineBankingFraud: '0800 500 3914 / +44 1132 888 408 (International)',
      debitCardFraud: 'Report via app: Find payment > Help with this transaction > View your options > Report this transaction',
    },
    instructions: 'For debit card fraud, find the payment in your app, select "Help with this transaction," then "View your options." Read the guide on identifying transactions, and if it doesn’t help, select "Report this transaction" to raise the fraud in-app. For online banking fraud, inform them if money has been taken, a payment seems fraudulent, or someone knows your password, has used your account, or asked you to move money to a "safe account" or another account in your name.',
  },
  {
    name: 'Lloyds',
    customerService: '0345 300 0000 / 0345 744 9900 (International)',
    fraud: {
      creditCardFraud: '0345 606 2172 / +44 1702 278 272 (International)',
      onlineBankingFraud: '0800 917 7017 / +44 2074 812 614 (International)',
      debitCardFraud: 'Report via app: Find payment > Help with this transaction > View your options > Report this transaction if someone knows your PIN or used your card without approval',
    },
    instructions: 'For debit card fraud, advise if someone knows your debit card PIN or has used your card without approval. Log into the app, find the payment, select "Help with this transaction," then "View your options." Read the guide on identifying a transaction, and if it doesn’t help, select "Report this transaction" to raise the fraud.',
  },
  {
    name: 'Action Fraud',
    fraud: {
      reporting: '0300 123 2040',
    },
  },
];

function FraudContact() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedBank, setExpandedBank] = useState(null);

  const filteredBanks = bankContacts.filter((bank) => {
    const searchLower = searchTerm.toLowerCase();
    const bankNameMatch = bank.name.toLowerCase().includes(searchLower);
    const fraudFieldsMatch = Object.entries(bank.fraud).some(([key, value]) =>
      `${key} ${value}`.toLowerCase().includes(searchLower)
    );
    const otherFieldsMatch =
      (bank.customerService && bank.customerService.toLowerCase().includes(searchLower)) ||
      (bank.internationalCreditProfiling && bank.internationalCreditProfiling.toLowerCase().includes(searchLower)) ||
      (bank.customerServiceOffshore && bank.customerServiceOffshore.toLowerCase().includes(searchLower)) ||
      (bank.couttsFraud && bank.couttsFraud.toLowerCase().includes(searchLower)) ||
      (bank.instructions && bank.instructions.toLowerCase().includes(searchLower));
    return bankNameMatch || fraudFieldsMatch || otherFieldsMatch;
  });

  const toggleExpand = (bankName) => {
    setExpandedBank(expandedBank === bankName ? null : bankName);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <NavBar />
      <div className="pt-20 pb-10 max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-gray-100 mt-8 mb-6">Fraud Contacts</h1>
        <p className="text-base text-gray-300 mb-4">
          Contact your bank’s fraud team immediately if you suspect fraudulent activity. Use the search below to find specific numbers or banks.
        </p>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by bank name or keyword (e.g., 'credit card', 'mobile')"
          className="w-full p-3 mb-6 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-300 text-base"
        />
        {filteredBanks.length > 0 ? (
          filteredBanks.map((bank) => (
            <div key={bank.name} className="mb-4">
              <button
                onClick={() => toggleExpand(bank.name)}
                className="w-full text-left bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700 hover:bg-gray-700 focus:outline-none"
              >
                <h2 className="text-xl font-semibold text-gray-300">{bank.name}</h2>
              </button>
              {expandedBank === bank.name && (
                <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 mt-2 text-base text-gray-300 leading-relaxed">
                  {bank.customerService && <p><strong>Customer Service:</strong> {bank.customerService}</p>}
                  {Object.entries(bank.fraud).map(([key, value]) => (
                    <p key={key}>
                      <strong>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                      </strong>{' '}
                      {value}
                    </p>
                  ))}
                  {bank.internationalCreditProfiling && (
                    <p><strong>International Credit Profiling:</strong> {bank.internationalCreditProfiling}</p>
                  )}
                  {bank.customerServiceOffshore && (
                    <p><strong>Customer Service Offshore:</strong> {bank.customerServiceOffshore}</p>
                  )}
                  {bank.couttsFraud && <p><strong>Coutts Fraud:</strong> {bank.couttsFraud}</p>}
                  {bank.instructions && <p className="mt-2"><strong>Instructions:</strong> {bank.instructions}</p>}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-base text-gray-300">No results found for "{searchTerm}".</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default FraudContact;