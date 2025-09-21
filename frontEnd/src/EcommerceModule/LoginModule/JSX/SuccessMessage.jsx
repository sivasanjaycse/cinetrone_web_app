import React from 'react';
import ReactDOM from 'react-dom';

const SuccessMessage = ({ title, text, onClose }) => {
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
    border: '2px solid #c0a068',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
    maxWidth: '400px',
    width: '90%'
  };

  const iconStyles = {
    fontSize: '48px',
    color: '#c0a068', // <-- UPDATED: Gold theme for the tick symbol
    marginBottom: '16px',
    display: 'block'
  };

  const titleStyles = {
    color: '#c0a068',
    marginBottom: '8px',
    fontSize: '20px'
  };

  const textStyles = {
    color: '#666666',
    marginBottom: '24px',
    margin: '0 0 24px 0'
  };

  const messageJSX = (
    <div style={overlayStyles}>
      <div style={cardStyles}>
        <div style={iconStyles}>✓</div>
        <h3 style={titleStyles}>{title}</h3>
        <p style={textStyles}>{text}</p>
        <button className="login-btn login-btn--primary" onClick={onClose}>Continue</button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(messageJSX, document.body);
};

export default SuccessMessage;