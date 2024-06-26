import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserNavbar from './UserNavbar';
import { Modal, Button } from 'react-bootstrap';
import '../App.css';
import { Link } from 'react-router-dom';

const Loader = () => (
  <div className="loader">
    <span className="loader-text">Loading...</span>
    <span className="load"></span>
  </div>
);

function ComplaintRegistration() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [complaint, setComplaint] = useState('');
  const [complaintSuccess, setComplaintSuccess] = useState(false);
  const [complaintError, setComplaintError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('/api/nextpage', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching user profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleComplaintSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(
        '/api/complaint',
        { complaint, Name: user.Name, AdmNo: user.AdmNo },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComplaintSuccess(true);
      setComplaintError('');
      setComplaint('');
      setShowModal(false); // Close modal on successful submission
    } catch (error) {
      setComplaintError(error.response?.data?.error || 'Error submitting complaint');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (complaint.length < 10) {
      setComplaintError('Complaint must be at least 10 characters long');
      return;
    }
    setShowModal(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='bg-dark'>
      {user && user.Name ? <UserNavbar username={user} /> : null}
      <div className="container mt-4">
        <h3>Complaint Registration</h3>
        {complaintSuccess && <p style={{ color: 'green' }}>Complaint submitted successfully!</p>}
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <input
              className="form-control short-input"
              type="text"
              value={user?.Name}
              readOnly
              style={{width:"30%"}}
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control short-input"
              type="text"
              value={user?.AdmNo}
              readOnly 
              style={{width:"30%"}}
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              style={{ width: '100%', height: '150px' }}
              id="complaint"
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              minLength="10"
            ></textarea>
          </div>
          <button className="btn btn-primary" type="submit">Submit Complaint</button>
          <Link to="/nextpage">
            <button className="btn btn-primary mx-2">Back to Home</button>
          </Link>
          {complaintError && <p style={{ color: 'red' }}>{complaintError}</p>}
        </form>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to submit this complaint?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleComplaintSubmit}>
            Yes
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ComplaintRegistration;
