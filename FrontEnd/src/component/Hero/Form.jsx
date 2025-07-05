// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const FormSection = ({ formData, handleInputChange, handleSubmit }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       await handleSubmit(e);
//       navigate('/package');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="w-full  transform transition-all duration-300 hover:scale-[1.01]">
//       <div className="bg-white rounded-2xl shadow-2xl shadow-blue-500/20 p-6 sm:px-8 sm:pt-7 sm:pb-6 w-full border border-blue-200/30 overflow-hidden relative">

//         {/* Content */}
//         <div className="relative z-10">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-700 bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
//               Get Your Report
//             </h2>
//           </div>

//           <form onSubmit={onSubmit}>  
//             <div className="space-y-5">
//               <div>
//                 <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="fullname"
//                   value={formData.fullname}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-2 border rounded-lg border-gray-300 bg-white/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="vin" className="block mb-2 text-sm font-medium text-gray-700">VIN/HIN</label>
//                 <input
//                   type="text"
//                   id="vin"
//                   name="vinNumber"
//                   value={formData.vinNumber}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-2  border rounded-lg border-gray-300 bg-white/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="model" className="block mb-2 text-sm font-medium text-gray-700">Model</label>
//                 <input
//                   type="text"
//                   id="model"
//                   name="vehicleModel"
//                   value={formData.vehicleModel}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-2  border rounded-lg border-gray-300 bg-white/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-700">Year</label>
//                 <input
//                   type="number"
//                   id="year"
//                   name="year"
//                   value={formData.year}
//                   onChange={handleInputChange}
//                   required
//                   className="w-full px-4 py-2  border rounded-lg border-gray-300 bg-white/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`
//                   w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
//                   text-white font-bold py-3 px-6 rounded-xl transition-all duration-300
//                   shadow-lg hover:shadow-xl active:scale-95
//                   flex items-center justify-center space-x-2
//                   ${isSubmitting ? 'opacity-90 cursor-not-allowed' : ''}
//                 `}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     <span>Processing...</span>
//                   </>
//                 ) : (
//                   <>

//                     <span>Get Instant Report</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormSection;



import { useState } from 'react';
import { User, Hash, Car, Calendar, Lock } from 'lucide-react';
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
    <div className="w-full transform transition-all duration-300 hover:scale-[1.01]">

      <div className='bg-gray-900/35 rounded-2xl'>
        <div className="backdrop-blur-lg bg-white/5 rounded-2xl shadow-xl shadow-blue-500/20 p-6 sm:p-8 w-full border border-white/10 overflow-hidden relative">

          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl opacity-20 z-0"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600 rounded-full filter blur-3xl opacity-10 z-0"></div>

          <div className="relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                Get Your <span className="text-blue-300">Report</span>
              </h2>
              <p className="text-gray-300/80">Complete the form to receive instant results</p>
            </div>

            <div onSubmit={onSubmit}>
              <div className="space-y-4">
                {/* Full Name */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-300/90">
                    <User className="text-lg" />
                  </div>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname || ''}
                    onChange={handleInputChange}
                    required
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-none border border-white/10 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/30 transition-all duration-300"
                  />
                </div>


                {/* VIN/HIN */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-300/90">
                    <Hash className="text-lg" />
                  </div>
                  <input
                    type="text"
                    name="vinNumber"
                    value={formData.vinNumber || ''}
                    onChange={handleInputChange}
                    required
                    placeholder="VIN/HIN Number"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-none border border-white/10 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/30 transition-all duration-300"
                  />
                </div>

                {/* Model and Year */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-300/90">
                      <Car className="text-lg" />
                    </div>
                    <input
                      type="text"
                      name="vehicleModel"
                      value={formData.vehicleModel || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="Model"
                      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-none border border-white/10 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/30 transition-all duration-300"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-blue-300/90">
                      <Calendar className="text-lg" />
                    </div>
                    <input
                      type="number"
                      name="year"
                      value={formData.year || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="Year"
                      className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-none border border-white/10 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/30 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={onSubmit}
                  className={`
                  w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600
                  text-white font-bold py-3 px-6 rounded-xl transition-all duration-300
                  shadow-lg hover:shadow-xl active:scale-[0.98]
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
                    <span className="text-lg">Get Instant Report →</span>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm bg-white/10 backdrop-blur-none px-4 py-2 rounded-full border border-white/10">
              <Lock className="text-blue-300/90" />
              <span className="text-gray-300 font-lg">End-to-end encrypted submission</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default FormSection;

