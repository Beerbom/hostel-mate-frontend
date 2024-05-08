import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';

function ComplaintViewer() {
  const [complaint, setComplaint] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchComplaintData = async () => {
    try {
      const response = await axios.get('/viewcomplaint');
      setComplaint(response.data); // Assuming the API response is an array of complaint objects
      setLoading(false);
    } catch (error) {
      setError('An error occurred while fetching the complaint data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaintData();
  }, []); // Empty dependency array ensures the effect runs only once

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  return (
    <div>
      <NavBar />
      {error && <div>Error: {error}</div>}
      <table className="table table-bordered table-striped table-lg mx-auto" style={{ width: '80%' }}>
        <thead>
          <tr>
            <th className="text-center">Student Name</th>
            <th className="text-center">Complaint</th>
          </tr>
        </thead>
        <tbody>
          {complaint.map((item, index) => (
            <tr key={index}>
              <td className="text-center">{item.Name}</td>
              <td className="text-center">{item.Complaint}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComplaintViewer;
