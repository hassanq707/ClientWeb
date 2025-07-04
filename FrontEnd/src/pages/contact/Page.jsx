import React, { useState } from 'react';
import { FaPaperPlane, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import InputField from '../../component/UI/Input'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock email sending - replace with actual emailjs implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      console.error('EmailJS error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions? Get in touch with our team for assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-200 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>

          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md text-sm sm:text-base">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md text-sm sm:text-base">
              Oops! Something went wrong. Please try again later.
            </div>
          )}

          <div className="flex-1 flex flex-col">
            <div className="space-y-6 flex-1">
              <InputField
                label="Full Name"
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <InputField
                label="Email Address"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <div className="flex-1">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-base sm:text-lg border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className="w-full flex items-center justify-center py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition text-sm sm:text-base mt-6"
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  <FaPaperPlane className="mr-2" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-200 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <div className="space-y-8 flex-1">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                <FaMapMarkerAlt className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Our Office</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  123 Business Ave, Suite 456<br />Karachi, Pakistan
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                <FaPhone className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Phone Number</h3>
                <p className="text-sm sm:text-base text-gray-600">+92 311 2512821</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                <FaEnvelope className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Email Address</h3>
                <p className="text-sm sm:text-base text-gray-600">support@vehiclecheck.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-full mr-4 flex-shrink-0">
                <FaPaperPlane className="text-blue-600 text-xl" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Response Time</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;