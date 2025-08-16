import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext'; 

const Footer = () => {
  const { theme } = useContext(ThemeContext); 
  return (
    <footer className="bg-gray-800 text-gray-300 p-8 dark:bg-gray-900 dark:text-gray-400">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
       
        <div>
          <h3 className="text-xl font-bold text-white mb-4 dark:text-gray-100">About Smart Bus Pass</h3>
          <p className="text-sm leading-relaxed">
            Smart Bus Pass is a modern solution for seamless public transportation.
            Our app allows users to easily apply for, manage, and use bus passes digitally,
            reducing hassle and promoting efficient travel.
          </p>
        </div>

       
        <div>
          <h3 className="text-xl font-bold text-white mb-4 dark:text-gray-100">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Digital Bus Pass Application</li>
            <li>Instant QR Code Generation</li>
            <li>Wallet Management & Top-ups</li>
            <li>Pass Renewal & History</li>
            <li>Admin Pass Approval System</li>
            <li>Route & Fare Calculation</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-4 dark:text-gray-100">Key Features</h3>
          <ul className="space-y-2 text-sm">
            <li>User-friendly Interface</li>
            <li>Secure Authentication (OTP)</li>
            <li>Real-time Pass Status Updates</li>
            <li>Responsive Design for All Devices</li>
            <li>QR Code Scanning for Verification</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500 dark:border-gray-600 dark:text-gray-500">
        &copy; {new Date().getFullYear()} Smart Bus Pass. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
