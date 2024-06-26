import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form'; // Import Form component

const Loader = () => (
  <div className="loader">
    <span className="loader-text">Loading...</span>
    <span className="load"></span>
  </div>
);

function UserNavbar({ username }) {
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showLogout, setShowLogout] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      localStorage.removeItem('token');
      setShowModal(false);
      navigate('/login');
    } catch (error) {
      setErrorMessage('Error logging out');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(
        '/api/change-password', // Your backend endpoint for changing password
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMessage(response.data.message);
      setNewPassword('');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error changing password');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar expand="sm" sticky="top" className="bg-body-tertiary" style={{ background: "#000000" }}>
        <Container fluid>
          <Navbar.Brand href="#">Hostel Mate</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-sm"
            aria-labelledby="offcanvasNavbarLabel-expand-sm"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
                Hostel Mate
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link as={Link} to="/nextpage" style={{ color: 'white' }}>Mess Bill&Duty</Nav.Link>
                <Nav.Link as={Link} to="/complaintform" style={{ color: 'white' }}>Complaint Form</Nav.Link>
                <Nav.Link as={Link} to="/rules" style={{ color: 'white' }}>Rules</Nav.Link>
                <Nav.Link as={Link} to="/contact" style={{ color: 'white' }}>Contact</Nav.Link>
                <Nav.Link>
                  {username && username.Name ? (
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
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{username.Name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Room No: {username.Room_No}</h6>
            <Form.Group>
              <Form.Label htmlFor="newPassword">New Password:</Form.Label>
              <Form.Control
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </Form.Group>
            <Button variant="primary" onClick={handleChangePassword} className="mt-3">
              Change Password
            </Button>
            {loading && <Loader />} {/* Show loader when changing password */}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          </Modal.Body>
          <Modal.Footer>
            {showLogout && (
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            )}
            {loading && <Loader />} {/* Show loader when logging out */}
          </Modal.Footer>
        </Modal>
      </Navbar>
    </>
  );
}

export default UserNavbar;
