function ContactCard({ name, phone }) {
    const copyToClipboard = () => {
      navigator.clipboard.writeText(phone);
      alert('Number copied!');
    };
  
    return (
      <div className="p-4 bg-white rounded-xl shadow-lg flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-600">{phone}</p>
        </div>
        <button onClick={copyToClipboard} className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Copy
        </button>
      </div>
    );
  }
  
  export default ContactCard;