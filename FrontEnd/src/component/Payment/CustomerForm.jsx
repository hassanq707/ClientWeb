import { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaSpinner, FaArrowRight } from 'react-icons/fa';
import InputField from '../UI/Input';
import axios from "axios";

const CustomerForm = ({ customerInfo, setCustomerInfo, setStep, vehicleType, price }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const url = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };


  const validateForm = () => {
    
    const requiredFields = ['fullname', 'email', 'phoneNumber', 'vinNumber', 'vehicleModel', 'year'];
    const missingFields = requiredFields.filter(field => !customerInfo[field]?.trim());

    if (missingFields.length > 0) {
      setSubmitStatus({
        success: false,
        message: `Please fill all required fields`
      });
      return false;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      setSubmitStatus({
        success: false,
        message: 'Please enter a valid email address'
      });
      return false;
    }

    // Phone number validation 
    if (customerInfo.phoneNumber.length < 8) {
      setSubmitStatus({
        success: false,
        message: 'Please enter a valid phone number'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const orderData = {
        ...customerInfo,
        vehicleType,
        price,
        status: 'pending'
      };

      const { data } = await axios.post(`${url}/orders/`, orderData);
      
      if (!data.success) {
        throw new Error(data.message || 'Order submission failed');
      }

      localStorage.setItem('orderId', data.order._id);
      localStorage.setItem('orderData', JSON.stringify(data.order));

      setStep('payment');

    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error.response?.data?.message || error.message || 'Failed to submit order'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {submitStatus && (
        <div className={`p-3 rounded-lg flex items-start ${
          submitStatus.success 
            ? 'bg-emerald-50 text-emerald-800' 
            : 'bg-rose-50 text-rose-800'
        }`}>
          {submitStatus.success ? (
            <FaCheckCircle className="mt-1 mr-2 flex-shrink-0" />
          ) : (
            <FaExclamationTriangle className="mt-1 mr-2 flex-shrink-0" />
          )}
          <span className="text-sm">{submitStatus.message}</span>
        </div>
      )}

      <div className="grid gap-5">
        <InputField
          label="Full Name"
          name="fullname"
          value={customerInfo.fullname}
          onChange={handleInputChange}
          placeholder="John Doe"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Email Address"
            name="email"
            type="email"
            value={customerInfo.email}
            onChange={handleInputChange}
            placeholder="your@email.com"
            required
          />

          <InputField
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={customerInfo.phoneNumber}
            onChange={handleInputChange}
            placeholder="+1 (123) 456-7890"
            required
          />
        </div>

        <InputField
          label="VIN Number"
          name="vinNumber"
          value={customerInfo.vinNumber}
          onChange={handleInputChange}
          placeholder="1HGCM82633A123456"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Vehicle Model"
            name="vehicleModel"
            value={customerInfo.vehicleModel}
            onChange={handleInputChange}
            placeholder="Camry"
            required
          />

          <InputField
            label="Year"
            name="year"
            type="number"
            min="1900"
            max={new Date().getFullYear() + 1}
            value={customerInfo.year}
            onChange={handleInputChange}
            placeholder="2020"
            required
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full 
            bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
            text-white font-medium py-3 px-6 rounded-lg transition-all duration-200
            shadow-md hover:shadow-lg active:scale-[0.98]
            flex items-center justify-center
            ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin mr-3" />
              Processing...
            </>
          ) : (
            <>
              Continue to Payment
              <FaArrowRight className="ml-2" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;