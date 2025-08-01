import React from 'react';
import { useNavigate } from 'react-router-dom';

const TravelAgentPartnership = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl bg-gradient-to-r from-orange-50 to-blue-50 p-8 flex flex-col items-center text-center my-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Travel Agent Partnership</h2>
      <p className="text-gray-700 mb-6 max-w-2xl">
        Are you a travel agent? Partner with us to showcase your packages to thousands of travelers.
      </p>
      <button 
        onClick={() => navigate('/travel-agent/onboarding')}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-md text-lg transition-colors"
      >
        Become a Partner
      </button>
    </div>
  );
};

export default TravelAgentPartnership; 