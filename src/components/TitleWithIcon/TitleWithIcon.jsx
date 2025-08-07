// src/components/TitleWithIcon/TitleWithIcon.jsx
import React from 'react';
import { IconWrapper } from '../icons';
import './TitleWithIcon.css';

const TitleWithIcon = ({ icon: IconComponent, children, iconColor = '#667eea', iconSize = 24 }) => {
  return (
    <span className="title-with-icon">
      <IconWrapper size={iconSize} color={iconColor}>
        <IconComponent />
      </IconWrapper>
      {children}
    </span>
  );
};

export default TitleWithIcon;