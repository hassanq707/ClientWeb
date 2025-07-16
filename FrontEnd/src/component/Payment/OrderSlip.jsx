import React, { useRef, useState } from 'react';
import { FaCheckCircle, FaDownload, FaSpinner } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

const OrderSlip = ({ vehicleType, price }) => {
  const orderData = JSON.parse(localStorage.getItem("orderData")) || {};
  const {
    _id: orderNumber,
    fullname,
    email,
    phoneNumber,
    vinNumber,
    vehicleModel,
    year
  } = orderData;

  const slipRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const handleDownload = () => {
    setIsDownloading(true);

    const element = slipRef.current;
    const opt = {
      margin: 0.5,
      filename: `OrderSlip-${orderNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        scrollY: 0,
        useCORS: true,
        allowTaint: true
      },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Create a clone of the element to avoid affecting the original
    const clone = element.cloneNode(true);
    clone.style.width = `${element.offsetWidth}px`;
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    document.body.appendChild(clone);

    html2pdf()
      .set(opt)
      .from(clone)
      .save()
      .then(() => {
        setIsDownloading(false);
        document.body.removeChild(clone);
      })
      .catch((error) => {
        console.error("PDF generation failed:", error);
        setIsDownloading(false);
        document.body.removeChild(clone);
      });
  };

  return (
    <div className="flex flex-col h-full">
      <div 
        className="flex-grow overflow-y-auto pr-2" 
        ref={slipRef}
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
            <FaCheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900">Order Confirmed!</h3>
          <p className="text-gray-600 mt-1">Your {vehicleType} report is being processed</p>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
          <div className="flex justify-between bg-blue-50 px-4 py-2 border-b border-gray-200">
            <h4 className="font-medium text-gray-900 text-sm">ORDER SUMMARY</h4>
            <div className='flex justify-between gap-2'>
              <h4 className="font-medium text-gray-900 text-md">Price:</h4>
              <p className="font-bold text-green-800">${price?.toFixed(2) || "0.00"}</p>
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

      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`w-full flex items-center justify-center px-4 py-3 text-white font-medium rounded-lg transition-colors duration-200 mt-4 ${
          isDownloading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
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
  );
};

export default OrderSlip;