import React from 'react';
import '../styles/Model.css'; // Import the CSS file for styling

const Modal = ({ show, handleClose, handleConfirm, title, message, confirmText }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>{title}</h4>
        <p>{message}</p>
        <div className="modal-footer">
          {handleConfirm && (
            <button className="btn btn-primary" onClick={handleConfirm}>
              {confirmText || 'Confirm'}
            </button>
          )}
          <button className="btn btn-secondary" onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
