import React, { useState, useEffect } from 'react';
import {FaPaperPlane,FaMapMarkerAlt,FaPhone,FaEnvelope,FaClock,FaCheckCircle,FaTimesCircle,FaHeadset,FaShieldAlt,FaUser,FaMobileAlt,FaBolt,FaFileAlt} from 'react-icons/fa';
import { motion } from 'framer-motion';
import contactImage from '/contact.jpg';
import Card1 from '/Card1.jpg';
import Card2 from '/Card2.jpg';
import Card3 from '/Card3.jpg';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  setCurrentImage
  const contactImages = [
    { text: "We're here to help with any questions", subtext: "Our team responds within 24 hours" },
    { text: "Get in touch for support", subtext: "Available 6 days a week" },
    { text: "Your message matters to us", subtext: "We read every inquiry carefully" }
  ];

  const contactCards = [
    {
      icon: <FaHeadset className="text-4xl text-blue-600" />,
      title: "24/7 Customer Support",
      description: "Our dedicated team is available round the clock to assist you with any queries or concerns."
    },
    {
      icon: <FaBolt className="text-4xl text-blue-600" />,
      title: "Instant Response",
      description: "Get immediate acknowledgment of your message with our automated response system while our team prepares your detailed reply."
    },
    {
      icon: <FaFileAlt className="text-4xl text-blue-600" />,
      title: "Document Assistance",
      description: "Need help with paperwork? Our experts can guide you through any documentation process."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % contactImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
      // Do Email integration here
      // Not Authorized to do it
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen -mt-4 md:-mt-2 bg-gradient-to-br from-slate-50 via-blue-50 to-blue-100">

      <div className="relative overflow-hidden h-[80vh] md:h-screen max-h-[700px]">

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${contactImage})`,
            backgroundColor: '#3c5ea1' 
          }}
        ></div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-black"
        ></motion.div>

        {/* Content */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-center w-full">
            <div
              className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-full mb-4 md:mb-6 shadow-lg mx-auto"
            >
              <FaHeadset className="text-white text-xl md:text-2xl" />
            </div>

            <div className="overflow-hidden">
              <h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-tight"
              >
                Contact <span className="text-blue-300">Our Team</span>
              </h1>
            </div>

            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed"
            >
              Get in touch with our expert support team for any inquiries or assistance
            </p>

            <div
              className="flex flex-wrap justify-center gap-3 md:gap-4 text-blue-200"
            >
              {[
                { icon: <FaShieldAlt className="mr-2 text-blue-300" />, label: 'Secure Communication' },
                { icon: <FaClock className="mr-2 text-blue-300" />, label: '24/7 Support Available' },
                { icon: <FaCheckCircle className="mr-2 text-blue-300" />, label: 'Guaranteed Response' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center bg-blue-900/30 px-3 py-2 rounded-full backdrop-blur-sm text-sm sm:text-base"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Image Cards  */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="relative group overflow-hidden rounded-2xl shadow-xl h-64">
            <div className="absolute inset-0 bg-gradient-to-tl from-black to-blue-900 opacity-40 z-10"></div>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${Card1})` }}
            ></div>
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
              <FaPhone className="text-white text-3xl mb-3" />
              <h3 className="text-white text-xl font-bold mb-2">Immediate Assistance</h3>
              <p className='text-white'>Call our hotline for urgent inquiries and support</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative group overflow-hidden rounded-2xl shadow-xl h-64">
            <div className="absolute inset-0 bg-gradient-to-tl from-black to-blue-900 opacity-40 z-10"></div>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${Card2})` }}
            ></div>
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
              <FaEnvelope className="text-white text-3xl mb-3" />
              <h3 className="text-white text-xl font-bold mb-2">Email Support</h3>
              <p className="text-white">Get detailed responses within 24 hours</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative group overflow-hidden rounded-2xl shadow-xl h-64">
            <div className="absolute inset-0 bg-gradient-to-tl from-black to-blue-900 opacity-40 z-10"></div>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${Card3})` }}
            ></div>
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
              <FaMapMarkerAlt className="text-white text-3xl mb-3" />
              <h3 className="text-white text-xl font-bold mb-2">Visit Us</h3>
              <p className="text-white">Schedule an appointment at our office</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center"
            >
              <div className="flex justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <FaPaperPlane className="mr-3 animate-bounce" />
                  Send Us a Message
                </h2>
                <p className="text-blue-100 mt-2">We'll get back to you as soon as possible</p>
              </div>

              <div className="p-8">
                {submitStatus === 'success' && (
                  <div
                    className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center"
                  >
                    <FaCheckCircle className="mr-3 text-green-600 text-xl" />
                    <span className="font-medium">Thank you! Your message has been sent successfully.</span>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div
                    className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center"
                  >
                    <FaTimesCircle className="mr-3 text-red-600 text-xl" />
                    <span className="font-medium">Oops! Something went wrong. Please try again later.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-400"
                          placeholder="Your name"
                        />
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-400"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaMobileAlt className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-400"
                          placeholder="+92 XXX XXXXXXX"
                        />
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-400"
                        placeholder="What's this about?"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 group-hover:border-blue-400 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            
            <div
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Contact Information</h3>
              </div>
              <div className="p-6 space-y-4">
                <div
                  className="flex items-center group hover:bg-blue-50 p-3 rounded-xl transition-colors"
                >
                  <div className="bg-blue-100 p-3 rounded-full mr-4 group-hover:bg-blue-200 transition-colors">
                    <FaPhone className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-blue-600 font-medium">+92 311 2512821</p>
                    <p className="text-sm text-gray-500">Primary contact number</p>
                  </div>
                </div>

                <div
                  className="flex items-center group hover:bg-blue-50 p-3 rounded-xl transition-colors"
                >
                  <div className="bg-blue-100 p-3 rounded-full mr-4 group-hover:bg-blue-200 transition-colors">
                    <FaEnvelope className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-blue-600 font-medium">info.fusionscar@gmail.com</p>
                    <p className="text-sm text-gray-500">For general inquiries</p>
                  </div>
                </div>

                <div
                  className="flex items-center group hover:bg-blue-50 p-3 rounded-xl transition-colors"
                >
                  <div className="bg-blue-100 p-3 rounded-full mr-4 group-hover:bg-blue-200 transition-colors">
                    <FaMapMarkerAlt className="text-blue-600 text-lg" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Office Address</h4>
                    <p className="text-gray-600">123 Business Ave, Suite 456</p>
                    <p className="text-gray-600">Karachi, Pakistan</p>
                    <p className="text-sm text-gray-500">Open by appointment</p>
                  </div>
                </div>
              </div>
            </div>


            {/* Support Hours Card */}
            <div
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Working Hours</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center">
                    <FaClock className="text-blue-600 mr-3" />
                    <span className="font-medium text-gray-700">Monday - Friday</span>
                  </div>
                  <span className="text-gray-600">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center">
                    <FaClock className="text-blue-600 mr-3" />
                    <span className="font-medium text-gray-700">Saturday</span>
                  </div>
                  <span className="text-gray-600">10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center">
                    <FaClock className="text-blue-600 mr-3" />
                    <span className="font-medium text-gray-700">Sunday</span>
                  </div>
                  <span className="text-gray-600">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactPage;



