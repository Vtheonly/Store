// src/components/LoadingScreen/LoadingScreen.jsx

import React, { useEffect } from "react";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  // This effect runs when the component is first rendered (mounts)
  useEffect(() => {
    // Add a class to the body to disable scrolling
    document.body.classList.add("loading-active");

    // This is the cleanup function. It runs when the component is removed (unmounts).
    return () => {
      // Remove the class to re-enable scrolling
      document.body.classList.remove("loading-active");
    };
  }, []); // The empty array ensures this effect runs only once on mount and cleanup on unmount

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
