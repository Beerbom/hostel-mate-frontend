import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const [showModal, setShowModal] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    
    
    navigate('/login');
  };
  return (
    <>
      {['sm'].map((expand) => (
        <Navbar key={expand} expand={expand} sticky="top" className="bg-body-tertiary mb-3" style={{background:"#000000"}}>
          <Container fluid>
            <Navbar.Brand href="#">Hostel Mate</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Hostel Mate
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 ">
                
                  <Nav.Link href="#action1"><Link style={{ color: 'white',textDecoration:"none" }} to="/attendance">Attendance</Link></Nav.Link>
                  <Nav.Link href="#action2"><Link style={{ color: 'white',textDecoration:"none" }} to="/userview">Inmates</Link></Nav.Link>
                  <Nav.Link href="#action2"><Link style={{ color: 'white',textDecoration:"none" }} to="/messduty">MessDuty</Link></Nav.Link>
                  <Nav.Link href="#action2"><Link style={{ color: 'white',textDecoration:"none" }} to="/messbill">MessBill</Link></Nav.Link>
                  <Nav.Link href="#action2"><Link style={{ color: 'white',textDecoration:"none"}} to="/fetch">Allotment</Link></Nav.Link>
                  <Nav.Link href="#action2"><Link style={{ color: 'white',textDecoration:"none" }} to="/complaints">Complaint</Link></Nav.Link>
                  <Nav.Link>
          
            
        
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
             A
           </div>      
             </Nav.Link>
                 
                </Nav>
                
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>ADMIN</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        {showLogout && (
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Modal.Footer>
    </Modal>
        </Navbar>
      ))}
    </>
  );
}

export default NavBar;
