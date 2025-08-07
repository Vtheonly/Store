// src/components/Icons/Icon.jsx
import React from 'react';
import * as LucideIcons from './index';

const Icon = ({ 
  name, 
  size = 20, 
  color = 'currentColor', 
  strokeWidth = 2, 
  className = '',
  ...props 
}) => {
  const IconComponent = LucideIcons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={`icon ${className}`}
      {...props}
    />
  );
};

export default Icon;