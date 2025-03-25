import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import ResultCard from '../components/ResultCard';

const paymentCategories = [
  'Car Purchase', 'Crypto Payment', 'Friend or Family Request', 'Own Account Transfer',
  'Building Work', 'Investment', 'House Purchase', 'Loan Repayment', 'Multiple Payments', 'Other'
];

const questionFlows = {
  'Car Purchase': [
    { question: 'Where did you find the car?', options: ['Facebook', 'eBay', 'AutoTrader', 'Dealership Website', 'Private Seller Ad', 'Other'] },
    { question: 'Is the seller a private individual or a dealership?', options: ['Private Seller', 'Dealership'] },
    { question: 'Have you met the seller in person?', options: ['Yes', 'No'] },
    { question: 'Have you seen the car or test driven it in person?', options: ['Yes', 'No'] },
    { question: 'Are you being asked to pay before collecting the car?', options: ['Yes', 'No'] },
    { question: 'What payment method are they requesting?', options: ['Bank Transfer', 'Cash', 'Card', 'Crypto', 'Other'] },
    { question: 'How were the payment details sent to you?', options: ['In Person', 'Email', 'Text/Phone'] },
    { question: 'Are they pressuring you to pay quickly?', options: ['Yes', 'No'] },
    { question: 'If it’s a dealership, is it registered and verifiable (e.g., checked online)?', options: ['Yes', 'No', 'Not a dealership'], conditional: (answers) => answers[1] === 'Dealership' },
    { question: 'Have you checked the car’s details on DVLA or similar (e.g., registration, MOT)?', options: ['Yes', 'No'] },
  ],
  'Crypto Payment': [
    { question: 'Which platform are you sending money to?', options: ['Coinbase', 'Binance', 'Other'] },
    { question: 'Did you open the crypto account yourself?', options: ['Yes', 'No'] },
    { question: 'Does anyone else have access to the account?', options: ['Yes', 'No'] },
    { question: 'Who asked you to make the payment?', options: ['No one', 'Someone online', 'Someone on phone'] },
    { question: 'What payment method are they requesting?', options: ['Bank Transfer', 'Card', 'Crypto', 'Cash'] },
    { question: 'Are you expecting large returns with little risk?', options: ['Yes', 'No'] },
    { question: 'How did they contact you?', options: ['Email', 'Social media', 'Phone'] },
    { question: 'Have you researched the platform or offer?', options: ['Yes', 'No'] },
    { question: 'Are they pressuring you to pay quickly?', options: ['Yes', 'No'] },
    { question: 'Is there a written agreement or terms provided?', options: ['Yes', 'No'] },
  ],
  'Friend or Family Request': [
    { question: 'Who is asking for money?', options: ['Friend', 'Family', 'Online contact'] },
    { question: 'Have you met them in real life?', options: ['Yes', 'No'] },
    { question: 'How long have you known them?', options: ['Years', 'Months', 'Days/Never'] },
    { question: 'Are you being asked to keep this secret?', options: ['Yes', 'No'] },
    { question: 'Have you sent money to them before?', options: ['Yes', 'No'] },
    { question: 'What payment method are they requesting?', options: ['Bank Transfer', 'Cash', 'Crypto', 'Other'] },
    { question: 'How did they contact you?', options: ['Phone', 'Text', 'Email', 'Social media'] },
    { question: 'Is this a new number or account?', options: ['Yes', 'No'] },
    { question: 'Are they pressuring you to send it quickly?', options: ['Yes', 'No'] },
    { question: 'What’s the money for?', type: 'text' },
  ],
  'Own Account Transfer': [
    { question: 'Did you open this account yourself?', options: ['Yes', 'No'] },
    { question: 'When was it opened?', options: ['Recently (last month)', 'Over a month ago'] },
    { question: 'Are you moving money because someone told you to?', options: ['Yes', 'No'] },
    { question: 'Has anyone contacted you about your original account being “compromised”?', options: ['Yes', 'No'] },
    { question: 'Are you being told to move money to a "safe account"?', options: ['Yes', 'No'] },
    { question: 'What payment method are you using?', options: ['Bank Transfer', 'App', 'Other'] },
    { question: 'Have you verified with your bank that this is a real instruction?', options: ['Yes', 'No'] },
    { question: 'Are you in full control of both accounts?', options: ['Yes', 'No'] },
    { question: 'Has anyone asked you to lie to the bank about this?', options: ['Yes', 'No'] },
    { question: 'Is this a usual transfer for you?', options: ['Yes', 'No'] },
  ],
  'Building Work': [
    { question: 'What work is being done?', type: 'text' },
    { question: 'Have they started the work or is it still pending?', options: ['Started', 'Pending'] },
    { question: 'Who recommended them, or where did you find them?', options: ['Friend/Family', 'Online', 'No one'] },
    { question: 'Are they a registered business or sole trader?', options: ['Registered', 'Sole trader', 'Unsure'] },
    { question: 'Did they provide a written quote or contract?', options: ['Yes', 'No'] },
    { question: 'What payment method are they requesting?', options: ['Bank Transfer', 'Cash', 'Card', 'Other'] },
    { question: 'Are you being asked to pay in full before work is finished?', options: ['Yes', 'No'] },
    { question: 'Have you seen examples of their previous work or reviews?', options: ['Yes', 'No'] },
    { question: 'Are they pressuring you to pay quickly?', options: ['Yes', 'No'] },
    { question: 'Have they asked you to lie to the bank?', options: ['Yes', 'No'] },
  ],
  'Investment': [
    { question: 'Who introduced this opportunity to you?', options: ['Friend', 'Online', 'Phone'] },
    { question: 'Is the company FCA regulated?', options: ['Yes', 'No', 'Unsure'] },
    { question: 'Is the expected return unusually high or “guaranteed”?', options: ['Yes', 'No'] },
    { question: 'What payment method are they requesting?', options: ['Bank Transfer', 'Crypto', 'Cash', 'Other'] },
    { question: 'Have you been pressured to act quickly?', options: ['Yes', 'No'] },
    { question: 'How did they contact you?', options: ['Phone', 'Email', 'Social media'] },
    { question: 'Have you checked online reviews or warnings about the company?', options: ['Yes', 'No'] },
    { question: 'Do they have a landline and registered office?', options: ['Yes', 'No', 'Only mobile'] },
    { question: 'Have they provided written documentation?', options: ['Yes', 'No'] },
    { question: 'Has a known financial advisor recommended them?', options: ['Yes', 'No'] },
  ],
  'House Purchase': [
    { question: 'Have you seen the house in person?', options: ['Yes', 'No'] },
    { question: 'Who are you sending the payment to?', options: ['UK Solicitor / Law Firm', 'UK Estate Agent', 'Overseas Lawyer / Legal Entity', 'Individual Seller (Overseas)', 'Not Sure / Unknown'] },
    { question: 'Do you have a signed contract or formal agreement?', options: ['Yes', 'No'] },
    { question: 'Did you find them, or did they contact you?', options: ['You found them', 'They contacted you'] },
    { question: 'Have you independently verified their contact details?', options: ['Yes', 'No'] },
    { question: 'What payment method are they requesting?', options: ['Bank Transfer', 'Card', 'Crypto', 'Cash'] },
    { question: 'Is there pressure to send the payment urgently?', options: ['Yes', 'No'] },
    { question: 'Are you being asked to lie to your bank?', options: ['Yes', 'No'] },
    { question: 'Is the amount what you expected?', options: ['Yes', 'No'] },
    { question: 'Is there a legal agreement for this sale?', options: ['Yes', 'No'], conditional: (answers) => answers[1] === 'Individual Seller (Overseas)' },
    { question: 'Have you verified the seller’s identity and ownership?', options: ['Yes', 'No'], conditional: (answers) => answers[1] === 'Individual Seller (Overseas)' },
  ],
  'Loan Repayment': [
    { question: 'Is it a known or unknown company?', options: ['Known', 'Unknown'] },
    { question: 'Did you apply for the loan yourself?', options: ['Yes', 'No'] },
    { question: 'Are you being asked to pay a fee before getting funds?', options: ['Yes', 'No'] },
    { question: 'What payment method are they requesting?', options: ['Bank Transfer', 'Cash', 'Crypto', 'Other'] },
    { question: 'How were you contacted?', options: ['Phone', 'Email', 'Text'] },
    { question: 'Have you verified the company with a regulator?', options: ['Yes', 'No'] },
    { question: 'Are they rushing you to pay?', options: ['Yes', 'No'] },
    { question: 'Have they provided a contract?', options: ['Yes', 'No'] },
    { question: 'Did they contact you first?', options: ['Yes', 'No'] },
    { question: 'Is the amount expected?', options: ['Yes', 'No'] },
  ],
  'Multiple Payments': [
    { question: 'Who suggested splitting it up?', options: ['You', 'Them'] },
    { question: 'Is this for one item or several?', options: ['One', 'Several'] },
    { question: 'What payment method are they requesting?', options: ['Bank Transfer', 'Cash', 'Crypto', 'Other'] },
    { question: 'Are you being rushed to make these payments?', options: ['Yes', 'No'] },
    { question: 'Why are multiple payments needed?', type: 'text' },
    { question: 'Have they asked you to avoid bank questions?', options: ['Yes', 'No'] },
    { question: 'Is the recipient verified?', options: ['Yes', 'No'] },
    { question: 'Is this a normal process for you?', options: ['Yes', 'No'] },
    { question: 'How were you contacted?', options: ['Phone', 'Email', 'Text'] },
    { question: 'Is the total amount expected?', options: ['Yes', 'No'] },
  ],
  'Other': [
    { question: 'Please describe the payment request:', type: 'text' },
  ],
};

function ScamChecker() {
  const [category, setCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    const questions = questionFlows[category] || [];
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length && (!questions[nextIndex].conditional || questions[nextIndex].conditional(newAnswers))) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      evaluateRisk(newAnswers);
    }
  };

  const evaluateRisk = (answers) => {
    let riskLevel, explanation, redFlags = [];

    switch (category) {
      case 'Car Purchase':
        if (answers[1] === 'Private Seller' && answers[3] === 'No' && answers[4] === 'Yes' && answers[7] === 'Yes') {
          redFlags = ['Private seller', 'Not seen', 'Payment before pickup', 'Urgency'];
          riskLevel = 'Extremely High';
          explanation = 'Multiple red flags: private seller, car not seen, payment before pickup, and urgency.';
        } else if (answers[1] === 'Dealership' && answers[4] === 'Yes' && answers[8] === 'No') {
          redFlags = ['Payment before pickup', 'Unverified dealership'];
          riskLevel = 'High';
          explanation = 'Red flags: payment requested before pickup from an unverified dealership.';
        } else if (answers[3] === 'No' && answers[5] === 'Bank Transfer' && answers[9] === 'No') {
          redFlags = ['Not seen', 'Bank transfer', 'No DVLA check'];
          riskLevel = 'High';
          explanation = 'Red flags: car not seen, bank transfer requested, and no DVLA verification.';
        } else if (answers[4] === 'Yes' || answers[7] === 'Yes') {
          redFlags = answers[4] === 'Yes' ? ['Payment before pickup'] : ['Urgency'];
          riskLevel = 'Medium';
          explanation = `Red flag: ${redFlags[0]} detected.`;
        } else {
          riskLevel = 'Low';
          explanation = 'No significant red flags detected.';
        }
        break;

      case 'Crypto Payment':
        if (answers[1] === 'No' || answers[2] === 'Yes' || (answers[5] === 'Yes' && answers[8] === 'Yes')) {
          redFlags = [];
          if (answers[1] === 'No') redFlags.push('Account not opened by you');
          if (answers[2] === 'Yes') redFlags.push('Shared account access');
          if (answers[5] === 'Yes' && answers[8] === 'Yes') redFlags.push('High returns with urgency');
          riskLevel = 'Extremely High';
          explanation = `Multiple red flags: ${redFlags.join(', ')}.`;
        } else if (answers[3] === 'Someone online' && answers[7] === 'No') {
          redFlags = ['Unsolicited request', 'No research'];
          riskLevel = 'High';
          explanation = 'Red flags: unsolicited request and no research done.';
        } else if (answers[4] === 'Crypto' || answers[8] === 'Yes') {
          redFlags = answers[4] === 'Crypto' ? ['Crypto payment'] : ['Urgency'];
          riskLevel = 'Medium';
          explanation = `Red flag: ${redFlags[0]} detected.`;
        } else {
          riskLevel = 'Low';
          explanation = 'No significant red flags detected.';
        }
        break;

      case 'Friend or Family Request':
        if (answers[1] === 'No' && answers[3] === 'Yes' && answers[8] === 'Yes') {
          redFlags = ['Not met', 'Secrecy', 'Urgency'];
          riskLevel = 'Extremely High';
          explanation = 'Multiple red flags: person not met, secrecy requested, and urgency.';
        } else if (answers[0] === 'Online contact' && answers[7] === 'Yes') {
          redFlags = ['Online contact', 'New account'];
          riskLevel = 'High';
          explanation = 'Red flags: online contact using a new number or account.';
        } else if (answers[4] === 'No' || answers[5] === 'Crypto') {
          redFlags = answers[4] === 'No' ? ['No prior payments'] : ['Crypto payment'];
          riskLevel = 'Medium';
          explanation = `Red flag: ${redFlags[0]} detected.`;
        } else {
          riskLevel = 'Low';
          explanation = 'No significant red flags detected.';
        }
        break;

      case 'Own Account Transfer':
        if (answers[4] === 'Yes' || answers[8] === 'Yes') {
          redFlags = answers[4] === 'Yes' ? ['"Safe account" mention'] : ['Lie to bank'];
          if (answers[4] === 'Yes' && answers[8] === 'Yes') redFlags.push('Lie to bank');
          riskLevel = 'Extremely High';
          explanation = `Multiple red flags: ${redFlags.join(', ')}.`;
        } else if (answers[0] === 'No' || (answers[2] === 'Yes' && answers[6] === 'No')) {
          redFlags = answers[0] === 'No' ? ['Account not yours'] : ['External request', 'Unverified'];
          riskLevel = 'High';
          explanation = `Red flags: ${redFlags.join(', ')}.`;
        } else if (answers[1] === 'Recently (last month)' && answers[7] === 'No') {
          redFlags = ['New account', 'Not fully controlled'];
          riskLevel = 'Medium';
          explanation = 'Red flags: recently opened account not fully controlled.';
        } else {
          riskLevel = 'Low';
          explanation = 'No significant red flags detected.';
        }
        break;

      case 'Building Work':
        if (answers[1] === 'Pending' && answers[6] === 'Yes' && answers[9] === 'Yes') {
          redFlags = ['Work not started', 'Full payment', 'Lie to bank'];
          riskLevel = 'Extremely High';
          explanation = 'Multiple red flags: work not started, full payment requested, and lie to bank.';
        } else if (answers[1] === 'Pending' && answers[4] === 'No') {
          redFlags = ['Work not started', 'No contract'];
          riskLevel = 'High';
          explanation = 'Red flags: work not started and no contract provided. Deposits are common, but verification is key.';
        } else if (answers[1] === 'Pending' || answers[8] === 'Yes') {
          redFlags = answers[1] === 'Pending' ? ['Work not started'] : ['Urgency'];
          riskLevel = 'Medium';
          explanation = `Red flag: ${redFlags[0]} detected. Deposits are common, but ensure a quote exists.`;
        } else {
          riskLevel = 'Low';
          explanation = 'No significant red flags detected.';
        }
        break;

      case 'Investment':
        if (answers[2] === 'Yes' && answers[4] === 'Yes' && answers[1] === 'No') {
          redFlags = ['High returns', 'Urgency', 'Unregulated'];
          riskLevel = 'Extremely High';
          explanation = 'Multiple red flags: high returns, urgency, and unregulated company.';
        } else if (answers[5] === 'Phone' && answers[6] === 'No') {
          redFlags = ['Unsolicited contact', 'No research'];
          riskLevel = 'High';
          explanation = 'Red flags: unsolicited contact and no research done.';
        } else if (answers[3] === 'Crypto' || answers[7] === 'Only mobile') {
          redFlags = answers[3] === 'Crypto' ? ['Crypto payment'] : ['Mobile-only contact'];
          riskLevel = 'Medium';
          explanation = `Red flag: ${redFlags[0]} detected.`;
        } else {
          riskLevel = 'Low';
          explanation = 'No significant red flags detected.';
        }
        break;

      case 'House Purchase':
        if (answers[1] === 'Not Sure / Unknown' || (answers[0] === 'No' && answers[4] === 'No' && answers[6] === 'Yes')) {
          redFlags = answers[1] === 'Not Sure / Unknown' ? ['Unknown recipient'] : ['Not seen', 'Unverified', 'Urgency'];
          riskLevel = 'Extremely High';
          explanation = `Multiple red flags: ${redFlags.join(', ')}.`;
        } else if (answers[1] === 'Individual Seller (Overseas)' && (answers[9] === 'No' || answers[10] === 'No')) {
          redFlags = ['Overseas seller', answers[9] === 'No' ? 'No contract' : 'Unverified seller'];
          riskLevel = 'High';
          explanation = `Red flags: ${redFlags.join(', ')}.`;
        } else if (answers[2] === 'No' || answers[5] === 'Crypto') {
          redFlags = answers[2] === 'No' ? ['No contract'] : ['Crypto payment'];
          riskLevel = 'Medium';
          explanation = `Red flag: ${redFlags[0]} detected.`;
        } else {
          riskLevel = 'Low';
          explanation = 'No significant red flags detected.';
        }
        break;

      case 'Loan Repayment':
        if (answers[2] === 'Yes' || (answers[5] === 'No' && answers[6] === 'Yes')) {
          redFlags = answers[2] === 'Yes' ? ['Fee before funds'] : ['Unverified', 'Urgency'];
          riskLevel = 'Extremely High';
          explanation = `Multiple red flags: ${redFlags.join(', ')}.`;
        } else if (answers[0] === 'Unknown' && answers[1] === 'No') {
          redFlags = ['Unknown company', 'Not applied'];
          riskLevel = 'High';
          explanation = 'Red flags: unknown company and you didn’t apply.';
        } else if (answers[3] === 'Crypto' || answers[8] === 'Yes') {
          redFlags = answers[3] === 'Crypto' ? ['Crypto payment'] : ['Unsolicited contact'];
          riskLevel = 'Medium';
          explanation = `Red flag: ${redFlags[0]} detected.`;
        } else {
          riskLevel = 'Low';
          explanation = 'No significant red flags detected.';
        }
        break;

      case 'Multiple Payments':
        if (answers[0] === 'Them' && answers[3] === 'Yes' && answers[5] === 'Yes') {
          redFlags = ['Their suggestion', 'Urgency', 'Avoid bank questions'];
          riskLevel = 'Extremely High';
          explanation = 'Multiple red flags: their suggestion, urgency, and avoiding bank questions.';
        } else if (answers[1] === 'One' && answers[6] === 'No') {
          redFlags = ['One item', 'Unverified recipient'];
          riskLevel = 'High';
          explanation = 'Red flags: splitting for one item with an unverified recipient.';
        } else if (answers[2] === 'Crypto' || answers[3] === 'Yes') {
          redFlags = answers[2] === 'Crypto' ? ['Crypto payment'] : ['Urgency'];
          riskLevel = 'Medium';
          explanation = `Red flag: ${redFlags[0]} detected.`;
        } else {
          riskLevel = 'Low';
          explanation = 'No significant red flags detected.';
        }
        break;

      case 'Other':
        riskLevel = 'Medium';
        explanation = 'Limited details provided; more analysis might reveal risks.';
        redFlags = ['Insufficient info'];
        break;

      default:
        riskLevel = 'Medium';
        explanation = 'Unable to fully assess with current info.';
        redFlags = ['Insufficient info'];
    }

    setResult({
      riskLevel,
      explanation: `${explanation} You are in control. This result is for insight only. We recommend pausing and verifying if you have any doubts.`,
      nextSteps: `Consider your next steps based on these flags: ${redFlags.join(', ')}. Contact Action Fraud (0300 123 2040) if unsure.`,
    });
  };

  const currentQuestion = category && questionFlows[category]?.find((q, i) => i === currentQuestionIndex && (!q.conditional || q.conditional(answers)));

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="pt-20 pb-10 max-w-3xl mx-auto px-4">
        {!category && (
          <div className="mt-8">
            <h1 className="text-3xl font-semibold text-gray-100">Payment Scam Checker</h1>
            <p className="text-base text-gray-400 mt-2 mb-6">Let’s check if your payment request is safe.</p>
            <h2 className="text-lg font-medium text-gray-300 mb-4">What type of payment are you making?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paymentCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-base font-medium rounded-xl px-6 py-3 shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {category && !result && currentQuestion && (
          <div className="mt-8">
            <h1 className="text-3xl font-semibold text-gray-100 mb-4">Payment Scam Checker</h1>
            <div className="bg-gray-800 p-6 rounded-xl shadow-md border border-gray-700">
              <h2 className="text-lg font-medium text-gray-300">{currentQuestion.question}</h2>
              <div className="mt-4 space-y-2">
                {currentQuestion.options ? (
                  currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="w-full bg-gray-700 text-gray-300 text-base font-medium rounded-lg px-4 py-2 hover:bg-gray-600 transition-all"
                    >
                      {option}
                    </button>
                  ))
                ) : (
                  <input
                    type="text"
                    onKeyPress={(e) => e.key === 'Enter' && handleAnswer(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-300"
                    placeholder="Type your answer and press Enter"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <h1 className="text-3xl font-semibold text-gray-100 mb-4">Payment Scam Checker</h1>
            <ResultCard {...result} />
            <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setCategory(null)}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-base font-medium rounded-xl px-6 py-3 shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all"
              >
                Start Over
              </button>
              <button
                disabled
                className="bg-gray-600 text-gray-400 text-base font-medium rounded-xl px-6 py-3 shadow-md opacity-50 cursor-not-allowed"
              >
                Chat with Advisor (Coming Soon)
              </button>
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ScamChecker;