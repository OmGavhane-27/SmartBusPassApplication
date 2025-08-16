import React from 'react';

const LoadingButton = ({ loading, children, className = '', ...props }) => {
  return (
    <button
      {...props}
      className={`w-full py-3 rounded-lg font-semibold transition duration-200 shadow-md flex items-center justify-center ${className}`}
      disabled={loading}
    >
      {loading ? (
        <img
          src="/Bouncing ball.gif"
          alt="Loading..."
          className="h-10 w-auto object-contain" 
        />
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
