import React, { useState } from 'react';
import axios from 'axios';
import UserNavbar from './UserNavbar'; // Import the UserNavbar component

const ComplaintForm = ({ username, handleSuccess }) => {
  const [complaint, setComplaint] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Token not found');
      }
  
      const response = await axios.post(
        '/complaint',
        { name: username.Name, admno: username.AdmNo, complaint },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response && response.data) {
        // Handle successful response
        handleSuccess(); // Call the parent component's success handler
      } else {
        throw new Error('Empty response received');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Error submitting complaint');
    }
  };

  return (
    <div>
      <UserNavbar username={username} /> {/* Include UserNavbar component */}
      <h2>Complaint Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="complaint">Complaint:</label>
          <textarea
            id="complaint"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Submit Complaint</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default ComplaintForm;
