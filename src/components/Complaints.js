import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ComplaintViewer() {
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch complaint data when the component mounts
    async function fetchComplaint() {
      try {
        const response = await axios.get('/viewcomplaint');
        setComplaint(response.data);
      } catch (error) {
        setError('An error occurred while fetching the complaint.');
      }
    }

    fetchComplaint(); // Call the function to fetch complaint data
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      
      {error && <div>Error: {error}</div>}
      {complaint && (
        <div>
          
          <p>name {complaint.Name}</p>
          <h1>{complaint.Complaint}</h1>
          {/* Display other complaint details as needed */}
        </div>
      )}
    </div>
  ); 
}

export default ComplaintViewer;
