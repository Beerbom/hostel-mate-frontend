import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from './UserNavbar';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messDutyData, setMessDutyData] = useState([]);
  const [complaint, setComplaint] = useState('');
  const [complaintSuccess, setComplaintSuccess] = useState(false);
  const [complaintError, setComplaintError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('/nextpage', {
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

  useEffect(() => {
    const fetchUserMessDuty = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('/usermessduty', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMessDutyData(response.data);
      } catch (error) {
        setMessDutyData([]);
      }
    };

    fetchUserMessDuty();
  }, []);

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(
        '/complaint',
        { complaint, Name: user.Name, AdmNo: user.AdmNo },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComplaintSuccess(true);
      setComplaintError('');
      setComplaint('');
    } catch (error) {
      setComplaintError(error.response?.data?.error || 'Error submitting complaint');
    }
  };

  return (
    <div>
      {user && user.Name ? (
        <UserNavbar username={user} />
      ) : null}
      <h1>User Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : user ? (
        <div>
          <p>AdmNo: {user.AdmNo}</p>
          <p>Name: {user.Name}</p>
        </div>
      ) : (
        <p>No user profile data found.</p>
      )}

      <h2>Mess Duty Data</h2>
      {messDutyData.length > 0 ? (
        <ul>
          {messDutyData.map((duty, index) => (
            <li key={index}>
              From: {duty.fromDate} - To: {duty.toDate}
            </li>
          ))}
        </ul>
      ) : (
        <p>No mess duty data found for the logged-in user.</p>
      )}

      <h2>Complaint Registration</h2>
      {complaintSuccess && <p style={{ color: 'green' }}>Complaint submitted successfully!</p>}
      <form onSubmit={handleComplaintSubmit}>
        <div>
          <label htmlFor="complaint">Complaint:</label>
          {/* Display read-only input fields for Name and AdmNo */}
          <input type="text" value={user?.Name} readOnly />
          <input type="text" value={user?.AdmNo} readOnly />
          <textarea
            id="complaint"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Submit Complaint</button>
        {complaintError && <p style={{ color: 'red' }}>{complaintError}</p>}
      </form>
    </div>
  );
};

export default UserPage;
