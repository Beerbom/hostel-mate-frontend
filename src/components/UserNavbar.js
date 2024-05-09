import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserNavbar({ username }) {
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowModal(false);
    navigate('/login');
  };

  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(
        '/change-password', // Your backend endpoint for changing password
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage(response.data.message);
      setNewPassword('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response.data.message || 'Error changing password');
      setSuccessMessage('');
    }
  };
  
  const handleComplaintLink = () => {
    navigate('/complaint'); 
  };

  return (
    <>
      <Navbar className="bg-body-tertiary" style={{ background: '#000000' }}>
        <Container>
          {/* <Navbar.Brand href="#home">Mess Bill</Navbar.Brand> */}
          
          <Navbar.Brand href="#home">{username.Name}</Navbar.Brand>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Brand href="#home">Room No:{username.Room_No}</Navbar.Brand>
          
          {/* <Navbar.Brand href="#home">Mess Duty</Navbar.Brand> */}
          
        
          <Navbar.Brand href="#home"></Navbar.Brand>
          {/* <Navbar.Brand href="#home"  onClick={handleComplaintLink}>Feedback</Navbar.Brand> */}
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
          {/* Your Navbar content */}
        {username && username.Name ? ( // Check if username and Name property exist
          <div
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              textAlign: 'center',
              lineHeight: '30px',
              color: '#000000',
              cursor: 'pointer',
              fontWeight: '500',
            }}
            onClick={() => {
              setShowModal(true);
              setShowLogout(true);
            }}
          >
            {username.Name.charAt(0)}
          </div>
        ) : null}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{username.Name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button variant="primary" onClick={handleChangePassword}>
            Change Password
          </Button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          {showLogout && (
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserNavbar;
