import React, { useRef, useState } from 'react';
import { FaDownload, FaSpinner } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

const PaymentSuccess = ({ vehicleType, price }) => {
  const orderData = JSON.parse(localStorage.getItem("orderData")) || {};
  const {
    _id: orderNumber,
    fullname,
    email,
    phoneNumber,
    vinNumber,
    vehicleModel,
    year,
    paymentMethod,
  } = orderData;

  const contentRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const handleDownload = () => {
    setIsDownloading(true);
    const element = contentRef.current;

    const opt = {
      margin: 0.5,
      filename: `OrderSlip-${orderNumber}.pdf`,
      html2canvas: {
        scale: 2,
        scrollY: 0,
        useCORS: true
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .finally(() => setIsDownloading(false));
  };

  return (
    <div className="flex flex-col h-full">

      <div className="flex-1 overflow-y-auto pr-2" style={{ minHeight: 0 }}>
        <div ref={contentRef}>

          <div className="text-center mb-4 pt-4 relative">


            {/* Header */}
            <div className="flex flex-col items-center justify-center mb-3">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-600/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                  <img
                    src="/logo.png"
                    alt="Fusions Car Logo"
                    className="h-14 w-14 relative z-10 transition-all duration-300 group-hover:drop-shadow-lg group-hover:scale-105 rounded-lg shadow-md"
                  />
                </div>
                <span className="ml-3 text-2xl font-black tracking-tight">
                  Fusions <span className="text-blue-800">Car</span>
                </span>
              </div>

              <div className="space-y-1 text-center mt-2">
                <h2 className="text-xl font-bold text-green-700 mb-1 flex items-center justify-center gap-2">
                  Payment Successful!
                </h2>
                <p className="text-sm md:text-base text-gray-600 font-medium">
                  Thank you. Your order has been received
                </p>
              </div>
            </div>

          </div>

          {/* Order Details */}
          <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
            <div className="flex justify-between bg-blue-50 px-4 py-2 border-b border-gray-200">
              <h4 className="font-medium text-gray-900 text-sm mt-2.5">ORDER SUMMARY</h4>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Method</p>
                  <p className="font-medium text-sm">{paymentMethod || 'N/A'}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="font-bold text-green-800">${price?.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="min-w-0 break-words">
                  <p className="text-gray-500">Order #</p>
                  <p className="font-medium break-all">{orderNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium">{currentDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Customer</p>
                  <p className="font-medium">{fullname || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <p className="font-medium">{phoneNumber || 'N/A'}</p>
                </div>
              </div>

              <div className="text-sm">
                <p className="text-gray-500">Email</p>
                <p className="font-medium break-all">{email || 'N/A'}</p>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <h5 className="font-medium text-gray-900 text-sm mb-2">VEHICLE DETAILS</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="min-w-0 break-words">
                    <p className="text-gray-500">VIN</p>
                    <p className="font-medium break-all">{vinNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Model</p>
                    <p className="font-medium">{vehicleModel || 'N/A'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-2">
                  <div>
                    <p className="text-gray-500">Year</p>
                    <p className="font-medium">{year || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Type</p>
                    <p className="font-medium">{vehicleType || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex-shrink-0 pt-4 border-t border-gray-200 bg-white sticky bottom-0">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`w-full flex items-center justify-center px-4 py-3 text-white font-semibold rounded-lg transition-all duration-300 transform shadow-lg ${isDownloading
            ? 'bg-gradient-to-r from-blue-400 to-blue-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl'
            }`}
        >
          {isDownloading ? (
            <>
              <FaSpinner className="mr-2 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <FaDownload className="mr-2" />
              Download Receipt
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;