import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Front() {
  const [showMessage, setShowMessage] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <div className="screen d-flex flex-column justify-content-center align-items-center text-light">
      <div className="hostel-mate">HOSTEL-MATE</div>
      <div className="transparent-box d-flex">
        <div
          className="layer black-layer d-flex justify-content-center align-items-center"
          onMouseEnter={() => setShowMessage(true)}
          onMouseLeave={() => setShowMessage(false)}
        >
          <Link to="/front">
            <button className="custom-button white-button">REGISTRATION</button>
          </Link>
          {showMessage && (
            <div className="message-box">
              Students who want to apply for the college hostel can use the REGISTRATION link
            </div>
          )}
        </div>
        <div className="layer white-layer d-flex justify-content-center align-items-center"
          onMouseEnter={() => setShowLogin(true)}
          onMouseLeave={() => setShowLogin(false)}>
          <Link to="/login">
            <button className="custom-button black-button">LOGIN</button>
          </Link>
          {showLogin && (
            <div className="message-box">
              Students who are allotted to the hostels can enter the website through LOGIN
            </div>
          )}
        </div>
      </div>
      <p>Click here</p>
      <button className="small-button" onClick={handleModalOpen}>To Know</button>
      {showModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Information</h2>
            <p><strong>Registration:</strong> Students who want to apply for the college hostel can use the REGISTRATION link.</p>
            <p><strong>Login:</strong> Students who are allotted to the hostels can enter the website through LOGIN.</p>
            <button className="custom-button close-button" onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Front;
