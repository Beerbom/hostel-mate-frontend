import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate(); // Get the history object
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if username and password match admin credentials
      if (username === "abc" && password === "1234") {
        // If credentials are correct, redirect to admin dashboard or page
        history('/userview');
      } else {
        // If credentials are incorrect, display error message
        setErrorMessage('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred while logging in.');
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-center'>
        <div className='py-8 px-4 shadow rounded-lg px-10 w-100 mt-10 rounded' style={{ backgroundColor: "#2E2E2E", maxWidth: "500px", marginTop: "50px", maxHeight: "1800px" }}>
          <h2 className='mt-3 text-white mb-3 '>Admin Login</h2>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: "20px" }}>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
    </div>
  );
}

export default AdminLogin;
