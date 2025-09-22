import React from 'react';
import ReactDOM from 'react-dom';

const ErrorOverlay = ({ title, text, onClose }) => {
  // --- Style Objects for the Error Modal ---
  const overlayStyles = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: '1000',
    transition: 'opacity 0.3s ease',
    opacity: '1'
  };

  const cardStyles = {
    background: '#1a1a1a',
    borderRadius: '12px',
    padding: '32px',
    textAlign: 'center',
    border: '2px solid #dc3545', // Using a standard error color for the border
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
    maxWidth: '400px',
    width: '90%'
  };

  const iconStyles = {
    fontSize: '48px',
    color: '#dc3545', // Using error color for the cross symbol
    marginBottom: '16px',
    display: 'block'
  };

  const titleStyles = {
    color: '#c0a068', // Kept gold for consistency with the overall theme
    marginBottom: '8px',
    fontSize: '20px'
  };

  const textStyles = {
    color: '#a9a9a9', // Lighter grey for better readability on a dark background
    margin: '0 0 24px 0'
  };

  // New: Inline style for the button's wrapper to center it
  const buttonWrapperStyles = {
    display: 'flex',
    justifyContent: 'center',
  };

  const errorJSX = (
    <div style={overlayStyles}>
      <div style={cardStyles}>
        <div style={iconStyles}>✕</div>
        <h3 style={titleStyles}>{title}</h3>
        <p style={textStyles}>{text}</p>
        {/* New: Added a wrapper div with the centering style */}
        <div style={buttonWrapperStyles}>
            <button className="login-btn login-btn--primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(errorJSX, document.body);
};

export default ErrorOverlay;