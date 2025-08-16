import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4
                      dark:bg-gray-800 dark:text-gray-100">
        <h3 className="text-xl font-bold mb-4 border-b pb-2
                       dark:border-gray-700">{title}</h3>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;