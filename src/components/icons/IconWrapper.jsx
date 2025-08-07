// src/components/icons/IconWrapper.jsx
import React from 'react';

/**
 * IconWrapper component for consistent icon styling
 * Provides dynamic sizing, coloring, and stroke width control
 */
const IconWrapper = ({ 
  children, 
  size = 20, 
  color = 'currentColor', 
  strokeWidth = 2,
  className = '',
  ...props 
}) => {
  return React.cloneElement(children, {
    size,
    color,
    strokeWidth,
    className: `icon ${className}`,
    ...props
  });
};

export default IconWrapper;