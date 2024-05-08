import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
    <Navbar className="bg-body-tertiary" style={{background:"#000000"}}>
      <Container>
      <Navbar.Collapse className="justify-content-between">
        <Navbar.Text ><Link to="/attendance">Attendance</Link></Navbar.Text>
        <Navbar.Text ><Link to="/userview">Inmates</Link></Navbar.Text>
        <Navbar.Text ><Link to="/messduty">MessDuty</Link></Navbar.Text>
        <Navbar.Text ><Link to="/messbill">MessBill</Link></Navbar.Text>
        <Navbar.Text ><Link to="/fetch">Allotment</Link></Navbar.Text>
        <Navbar.Text ><Link to="/complaints">Complaint</Link></Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          
            
        
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
        
            </Navbar.Text>
          </Navbar.Collapse>
         
        
      </Container>
    </Navbar>
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
   </>
  );
}

export default NavBar;
{/* <a class="nav-link"  href="#"><Link to="/">home</Link></a>
</li>
<li class="nav-item">
  <a class="nav-link" href="#"><Link to="/fetch">submit</Link></a>
</li>  
<li class="nav-item">
  <a class="nav-link" href="#"><Link to="/attendance">Attendance</Link></a>
</li>
<li class="nav-item">
  <a class="nav-link" href="#"><Link to="/userview">Userview</Link></a>
</li>
<li class="nav-item">
  <a class="nav-link"><Link to="/messduty">MessDuty</Link></a>
</li>
<li class="nav-item">
  <a class="nav-link"><Link to="/view">view</Link></a>
</li>
<li class="nav-item">
  <a class="nav-link"><Link to="/complaints">complaint</Link></a> */}