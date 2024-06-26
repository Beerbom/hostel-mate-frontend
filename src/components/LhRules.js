import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import UserNavbar from './UserNavbar';

const Loader = () => (
  <div className="loader">
    <span className="loader-text">Loading...</span>
    <span className="load"></span>
  </div>
);

function LhRules() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-dark">
      {user && user.Name ? <UserNavbar username={user} /> : null}
      <div className="rules-screen d-flex justify-content-center align-items-center">
        <div className="rules-box">
          <h2>Hostel Rules</h2>
          <span>Students who are allotted to hostels must follow these rules:</span>
          <ul>
            <li>Every student must enter the hostel before 9:30 pm, they can inform the reason to warden in advance if they are unable to do so. Else she is liable to pay a fine of 100/-.</li>
            <li>The hostels will open only at 6:00 am those who needed to enter/exit before this have to inform one day prior.</li>
            <li>Before going home, all the inmates should complete the home register with their room no., address and date of leave. After return also these must be filled.</li>
            <li>Mess duties allotted to each student must be carried out properly, else fines are charged.</li>
            <li>Before entering the mess, every inmate should tie up their hair.</li>
            <li>The gate towards the washing area will be closed after 6:00 pm.</li>
          </ul>
          <div className="text-center">
            <Link to="/nextpage">
              <button className="btn btn-primary">Back to Home</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LhRules;
