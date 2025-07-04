import { Link } from 'react-router-dom';
import { FaCar, FaExclamationTriangle } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen -mt-2 bg-white flex flex-col items-center justify-center p-4 text-center">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <FaCar className="h-8 w-8 text-red-600" />
        <span className="ml-2 text-2xl font-bold text-gray-900">FUSION</span>
      </div>

      {/* 404 Illustration */}
      <div className="relative mb-8">
        <div className="w-40 h-40 rounded-full bg-red-50 flex items-center justify-center mx-auto">
          <FaExclamationTriangle className="text-5xl text-red-600" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-200">
          <span className="text-2xl font-bold text-gray-800">404</span>
        </div>
      </div>

      {/* Message */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-600 max-w-md mb-8">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-300 group"
      >
        <span>Return Home</span>
        <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
      </Link>

      <div className="mt-12 text-sm text-gray-500">
        <p>Need help? <Link to="/contact" className="text-red-600 hover:underline">Contact our support</Link></p>
      </div>
    </div>
  );
}
