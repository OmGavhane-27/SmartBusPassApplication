import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { Mail, Phone, Clock, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

const SupportComponent = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate(); 

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fdf4e3] dark:bg-[#0e1726] pt-16 px-4">
      <div className="w-full max-w-xl bg-white dark:bg-[#1e293b] text-gray-800 dark:text-gray-100 rounded-xl shadow-lg p-8 space-y-6 border dark:border-gray-700">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold mb-2">Need Help?</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            We're here to support you with anything you need.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <p className="text-sm font-semibold">Email Us</p>
              <a href="mailto:support@smartbuspass.com" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                support@smartbuspass.com
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <p className="text-sm font-semibold">Call Us</p>
              <p className="text-sm">+91 12345 67890</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
            <div>
              <p className="text-sm font-semibold">Working Hours</p>
              <p className="text-sm">Mon–Fri: 9 AM – 5 PM IST</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/home')} // ✅ correct route
          className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-200
                     dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          <Home className="w-4 h-4" />
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SupportComponent;
