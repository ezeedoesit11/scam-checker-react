function AdviceCard({ icon, title, description }) {
    return (
      <div className="p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="text-3xl">{icon}</div>
        <h3 className="mt-2 text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>
    );
  }
  
  export default AdviceCard;