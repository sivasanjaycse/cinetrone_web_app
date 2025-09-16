import React from "react";
import "./Modal.css";
const Modal = ({ isOpen, onClose, title, children, size = "normal" }) => {
  if (!isOpen) return null;

  const sizeClass = size === "large" ? "modal-large" : "";

  return (
    <div className="modal" onClick={onClose}>
      <div
        className={`modal-content ${sizeClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
