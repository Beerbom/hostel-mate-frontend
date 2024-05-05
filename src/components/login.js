import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
function Login({ history }) {
  const navigate=useNavigate()
  const [AdmNo, setAdmNo] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //
      const response = await axios.post('/login', { AdmNo, password });
      if (response && response.data) {
        console.log(response.data); // Handle successful login or store token
        //history.push('/nextpage'); // Redirect to next page upon successful login
        navigate("/nextpage")
      } else {
        console.error('Invalid response from server:', response);
        setErrorMessage('An error occurred while logging in. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error.response.data.error);
      setErrorMessage('Username or password is incorrect.');
    }
  };

  return (
    <div className='d-flex justify-content-center'>
      <div className='py-8 px-4 shadow rounded-lg px-10 w-100 mt-10 rounded' style={{ backgroundColor: "#2E2E2E", maxWidth: "500px", marginTop: "50px", maxHeight: "1800px" }}>
        <h2 className='mt-3 text-white mb-3 '>Login</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <input
              type="text"
              name="AdmNo"
              value={AdmNo}
              onChange={(e) => setAdmNo(e.target.value)}
              className="form-control text-white"
              style={{ backgroundColor: "#111111", height: "70px", width: "100%" }}
              placeholder="Username"
            />
          </div>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control text-white"
              style={{ backgroundColor: "#111111", height: "70px", width: "100%" }}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
