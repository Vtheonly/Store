import React, { useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onFinished }) => {

  useEffect(() => {
    // This function will listen for the message from the iframe
    const handleMessage = (event) => {
      // Check if the message is the one we expect
      if (event.data === 'loading_finished') {
        onFinished(); // Call the function passed from the parent
      }
    };

    // Add the event listener to the window
    window.addEventListener('message', handleMessage);

    // IMPORTANT: Clean up the event listener when the component is removed
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onFinished]); // Rerun the effect if onFinished function changes

  return (
    <div className="iframe-container">
      <iframe 
        src="/loading/index.html" 
        title="Loading Animation"
        className="loading-iframe"
      />
    </div>
  );
};

export default LoadingScreen;