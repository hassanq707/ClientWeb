import { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from 'react-icons/fa';
import InputField from '../UI/Input';
import axios from "axios"
const CustomerForm = ({ customerInfo, setCustomerInfo, setStep }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ''
  });

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
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
      return false;
    }

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(customerInfo.email)) {
      setSubmitStatus({
        success: false,
        message: 'Please enter a valid email address'
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const {data} = await axios.post(`${url}/orders/`,customerInfo)
      if (!data.success) {
        throw new Error(data.message || 'Order submission failed');
      }

      localStorage.setItem('orderId', data.order._id);
      localStorage.setItem('orderData', JSON.stringify(data.order));

      setSubmitStatus({
        success: true,
        message: 'Order submitted successfully!'
      });

      setStep('orderSlip');

    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error.message || 'Failed to submit order'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {submitStatus.message && (
        <div className={`p-4 rounded-md ${submitStatus.success 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'}`}>
          <div className="flex items-center">
            {submitStatus.success ? (
              <FaCheckCircle className="mr-2" />
            ) : (
              <FaExclamationTriangle className="mr-2" />
            )}
            <span>{submitStatus.message}</span>
          </div>
        </div>
      )}

      <InputField
        label="Full Name"
        name="fullname"
        value={customerInfo.fullname}
        onChange={handleInputChange}
        required
      />

      <InputField
        label="Email Address"
        name="email"
        type="email"
        value={customerInfo.email}
        onChange={handleInputChange}
        required
      />

      <InputField
        label="Phone Number"
        name="phoneNumber"
        type="tel"
        value={customerInfo.phoneNumber}
        onChange={handleInputChange}
        required
      />

      <InputField
        label="VIN Number"
        name="vinNumber"
        value={customerInfo.vinNumber}
        onChange={handleInputChange}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          label="Vehicle Model"
          name="vehicleModel"
          value={customerInfo.vehicleModel}
          onChange={handleInputChange}
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
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full 
          bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                  text-white font-bold py-3 px-6 rounded-xl transition-all duration-300
                  shadow-lg hover:shadow-xl active:scale-95
                  flex items-center justify-center space-x-2
          ${isSubmitting 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isSubmitting ? (
          <>
            <FaSpinner className="animate-spin mr-2" />
            Processing...
          </>
        ) : (
          'Continue to Payment'
        )}
      </button>
    </form>
  );
};

export default CustomerForm;
