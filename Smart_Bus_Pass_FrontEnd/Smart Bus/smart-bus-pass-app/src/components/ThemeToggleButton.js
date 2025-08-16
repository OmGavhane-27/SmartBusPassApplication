import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition duration-300 z-50
                 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-300"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.325 3.325l-.707.707M5.388 5.388l-.707-.707M18.611 5.388l.707-.707M5.388 18.611l-.707.707M12 7a5 5 0 110 10 5 5 0 010-10z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9 9 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggleButton;