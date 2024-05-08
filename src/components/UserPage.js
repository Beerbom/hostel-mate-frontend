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
      <h3>User Profile</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : user ? (
        <div>
          <h6>AdmNo: {user.AdmNo}</h6>
        </div>
      ) : (
        <p>No user profile data found.</p>
      )}

      <h3>Mess Duty Data</h3>
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

      <h3>Complaint Registration</h3>
      {complaintSuccess && <p style={{ color: 'green' }}>Complaint submitted successfully!</p>}
      <form onSubmit={handleComplaintSubmit}>
        <div className=''>
        <div className='d-flex mt-3 my-3 mx-5'><input style={{border:"none", background:"none"}} type="text" value={user?.Name} readOnly />
        <input style={{border:"none", background:"none"}} type="text" value={user?.AdmNo} readOnly /></div>
          
          <div className='d-flex mt-3 my-3 mx-5'>
          <textarea
            style={{width:'550px',height:'250px'}}
            id="complaint"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
          ></textarea>
          </div>
          <button className='btn btn-primary ' style={{marginLeft:'440px'}} type="submit">Submit Complaint</button>
        </div>
        
        {complaintError && <p style={{ color: 'red' }}>{complaintError}</p>}
      </form>
    </div>
  );
};

export default UserPage;
