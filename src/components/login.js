import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [AdmNo, setAdmNo] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const back = () => {
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (AdmNo === "admin" && password === "admin123") {
        // If admin credentials are correct, redirect to admin dashboard
        navigate('/userview');
      } else {
        const response = await axios.post('/login', { AdmNo, password });
        const { user, token } = response.data;

        // Store the token in localStorage for future use
        localStorage.setItem('token', token);
        navigate('/nextpage');
        // Redirect or perform other actions upon successful login
        console.log('Logged in user:', user);
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.error || 'Server error');
      setErrorMessage(error.response?.data?.error || 'Server error');
    }
  };

  return (
    <div className='d-flex justify-content-center '>
      <div className='py-8 px-4 shadow rounded-lg   px-10 w-100 mt-10 rounded ' style={{ backgroundColor: "#2E2E2E", maxWidth: "500px",minHeight:"350px", marginTop: "50px", maxHeight: "1800px" }}>
        <h2 className='mt-3 text-white mb-3'>Login</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              placeholder="AdmNo"
              value={AdmNo}
              onChange={(e) => setAdmNo(e.target.value)}
              className="form-control"
              style={{ height: "50px" }}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              style={{ height: "50px" }}
            />
          </div>
          <button type="submit" className="btn btn-primary mb-3 w-100">Login</button>
          <button type="button" className="btn btn-danger w-100" onClick={back}>Back</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
