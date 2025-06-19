// src/context/ThemeContext.jsx

import React, { createContext, useState, useEffect } from 'react';

// Create a context with a default value
export const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  // State to hold the current theme. Read from localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Apply the theme class to the body and save to localStorage
    const body = document.body;
    // We add the theme class name (e.g., 'light-theme' or 'dark-theme')
    body.className = theme + '-theme';
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Provide the theme and the toggle function to children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};