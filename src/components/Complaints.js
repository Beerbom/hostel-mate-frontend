import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';

const Loader = () => (
  <div className="loader">
    <span className="loader-text">Loading...</span>
    <span className="load"></span>
  </div>
);

function ComplaintViewer() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchComplaintData = async () => {
    try {
      const response = await axios.get('/api/viewcomplaint');
      setComplaints(response.data); // Assuming the API response is an array of complaint objects
      setLoading(false);
    } catch (error) {
      setError('An error occurred while fetching the complaint data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaintData();
  }, []); 

  return (
    <div>
      <NavBar />
      <div className='container'>
        {loading ? (
          <Loader /> 
        ) : (
          <>
            {error && <div className="alert alert-danger">Error: {error}</div>}
            <div className='mt-5'>
              <table className="table table-bordered table-striped table-lg mx-auto" style={{ width: '80%' }}>
                <thead>
                  <tr>
                    <th className="text-center">ADM NO</th>
                    <th className="text-center">Student Name</th>
                    <th className="text-center">Complaint</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center">{item.AdmNo}</td>
                      <td className="text-center">{item.Name}</td>
                      <td className="text-center">{item.Complaint}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ComplaintViewer;
