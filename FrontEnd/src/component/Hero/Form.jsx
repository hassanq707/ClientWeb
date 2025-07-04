import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FormSection = ({ formData, handleInputChange, handleSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await handleSubmit(e);
      navigate('/package');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full  transform transition-all duration-300 hover:scale-[1.01]">
      <div className="bg-white rounded-2xl shadow-2xl shadow-blue-500/20 p-6 sm:px-8 sm:pt-7 sm:pb-6 w-full border border-blue-200/30 overflow-hidden relative">
        
        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-700 bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
              Get Your Report
            </h2>
          </div>

          <form onSubmit={onSubmit}>  
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg border-gray-300 bg-white/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="vin" className="block mb-2 text-sm font-medium text-gray-700">VIN/HIN</label>
                <input
                  type="text"
                  id="vin"
                  name="vinNumber"
                  value={formData.vinNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2  border rounded-lg border-gray-300 bg-white/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-700">Model</label>
                <input
                  type="text"
                  id="model"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2  border rounded-lg border-gray-300 bg-white/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-700">Year</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2  border rounded-lg border-gray-300 bg-white/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                  text-white font-bold py-3 px-6 rounded-xl transition-all duration-300
                  shadow-lg hover:shadow-xl active:scale-95
                  flex items-center justify-center space-x-2
                  ${isSubmitting ? 'opacity-90 cursor-not-allowed' : ''}
                `}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    
                    <span>Get Instant Report</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default FormSection;