function TrendCard({ title, date, description }) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="mt-2 text-gray-600">{description}</p>
        <button className="mt-2 text-blue-600 hover:underline">Read more</button>
      </div>
    );
  }
  
  export default TrendCard;