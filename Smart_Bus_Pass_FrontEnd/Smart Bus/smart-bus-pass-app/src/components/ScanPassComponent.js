import React, { useState, useEffect } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import { useTheme } from '../contexts/ThemeContext'; 
import { useLocation } from 'react-router-dom';
import { simulatedPasses } from '../data/simulatedData';

const ScanPassComponent = ({ navigate }) => {
  const [scannedPass, setScannedPass] = useState(null);
  const [message, setMessage] = useState('');
  const { theme } = useTheme(); 

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const qrData = queryParams.get('qrData');

    if (qrData) {
      const foundPass = simulatedPasses.find(pass => pass.qrCodeData === qrData);
      if (foundPass) {
        setScannedPass(foundPass);
        setMessage('Pass details retrieved successfully!');
      } else {
        setMessage('Invalid QR Code or Pass Not Found.');
        setScannedPass(null);
      }
    } else {
      setMessage('No QR data provided in the URL.');
      setScannedPass(null);
    }
  }, [window.location.hash]); 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 pt-16 font-inter
                    dark:bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md
                    dark:bg-gray-800 dark:text-gray-100 dark:shadow-none dark:border dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6
                       dark:text-gray-100">Scan Bus Pass</h2>

        {message && (
          <p className={`text-center mb-4 ${scannedPass ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        {scannedPass ? (
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg font-bold text-blue-800 dark:text-blue-400">Pass ID: {scannedPass.id.substring(0, 8)}</p>
            <p><strong>User ID:</strong> {scannedPass.userId}</p>
            <p><strong>Type:</strong> {scannedPass.type}</p>
            <p><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                scannedPass.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
                scannedPass.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100' :
                'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
              }`}>{scannedPass.status}</span></p>
            <p><strong>Route:</strong> {scannedPass.source} to {scannedPass.destination}</p>
            <p><strong>Valid From:</strong> {scannedPass.startDate}</p>
            <p><strong>Valid Until:</strong> {scannedPass.endDate}</p>
            <p><strong>Fare:</strong> ₹{scannedPass.fare}</p>
            <p><strong>Duration:</strong> {scannedPass.durationType === 'daily' ? 'Daily' : `${scannedPass.durationMonths} Month(s)`}</p>
            <div className="mt-4 flex justify-center">
              <QRCodeDisplay data={scannedPass.qrCodeData} />
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400">Scan a QR code to display pass details.</p>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('dashboard')}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md text-lg
                       dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanPassComponent;