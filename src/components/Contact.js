import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import UserNavbar from './UserNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Loader = () => (
  <div className="loader">
    <span className="loader-text">Loading...</span>
    <span className="load"></span>
  </div>
);

function Contact() {
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
    <div className='bg-dark'>
      {user && user.Name ? <UserNavbar username={user} /> : null}
      <div className="contact-screen d-flex justify-content-center align-items-center">
        <div className="contact-box">
          <h2>Contact Us</h2>
          <div className="contact-info">
            <div className="contact-item">
              <FontAwesomeIcon icon={faPhone} />
              <span>Warden : +919876543210</span>
            </div>
            <div className='d-flex justify-content-between'>
              <div className="contact-item">
                <span><FontAwesomeIcon icon={faPhone} /><small>Matron 1 : +919876543222</small></span>
              </div>
              <div className="contact-item">
                <span><FontAwesomeIcon icon={faPhone} /><small>Matron 2 : +919876543333</small></span>
              </div>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faPhone} />
              <span><small>Matron 3 : +919876543444</small></span>
            </div>
            <div className="contact-item">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span><a style={{ color: 'white', textDecoration: "none" }} href="https://maps.app.goo.gl/w9p5W6tSkamUiuk3A">Nedumkuzhi RIT Rd, Pampady, Kerala</a></span>
            </div>
            <div className="text-center">
              <Link to="/nextpage">
                <button className="btn btn-primary">Back to Home</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
