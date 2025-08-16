import React from "react";

const QRCodeDisplay = ({ data }) => (
  <div className="w-32 h-32 bg-white rounded-md shadow-inner border border-gray-200 dark:bg-gray-700 dark:border-gray-600 flex items-center justify-center">
    <img
      src={data}
      alt="QR Code"
      className="w-28 h-28 rounded"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src =
          "https://placehold.co/120x120/E0E0E0/A0A0A0?text=QR+Error";
      }}
    />
  </div>
);


export default QRCodeDisplay;