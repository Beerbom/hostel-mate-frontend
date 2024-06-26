import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';

const Loader = () => (
  <div className="loader">
    <span className="loader-text">Loading...</span>
    <span className="load"></span>
  </div>
);

function UserView() {
  const [allottedDetails, setAllottedDetails] = useState([]);
  const [showDetailsIndex, setShowDetailsIndex] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [vacating, setVacating] = useState(false); // Loading state for vacating

  useEffect(() => {
    const fetchAllottedDetails = async () => {
      try {
        const response = await axios.get('/api/allotted-details'); // Assuming this endpoint exists
        setAllottedDetails(response.data);
      } catch (error) {
        console.error('Error fetching allotted details:', error.message);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchAllottedDetails();
  }, []);

  const handleVacateRoom = async (userId, roomId) => {
    console.log('User ID:', userId, 'Room ID:', roomId);
    const confirmed = window.confirm('Are you sure you want to vacate this room?');
    if (!confirmed) return;

    setVacating(true); // Set vacating state to true
    try {
      await axios.post('/api/vacate-room', { userId, roomId });
      const updatedDetails = allottedDetails.filter(detail => detail._id !== userId);
      setAllottedDetails(updatedDetails);
    } catch (error) {
      console.error('Error vacating room:', error.message);
    } finally {
      setVacating(false); // Set vacating state to false after request completes
    }
  };

  const toggleDetails = (index) => {
    setShowDetailsIndex(index === showDetailsIndex ? null : index);
  };

  return (
    <>
      <NavBar />
      {loading && <Loader />}
      {vacating && <Loader />}
      <div className="container">
        <h1 className="my-4">Allotted Details</h1>
        <div className="row">
          {allottedDetails && allottedDetails.map((detail, index) => (
            <div key={detail._id} className="col-md-4">
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">{detail.Name}</h5>
                  <p className="card-text">Admission No: {detail.AdmNo}</p>
                  <p className="card-text">Room No: {detail.Room_No}</p>
                  <button
                    className="btn btn-danger mx-2" // Added margin-right to create a gap
                    onClick={() => handleVacateRoom(detail._id, detail.Room_No)}
                  >
                    Vacate Room
                  </button>
                  {showDetailsIndex === index && (
                    <div className="">
                      <p className="card-text">Phone No: {detail.PhoneNo}</p>
                      <p className="card-text">Branch: {detail.Branch}</p>
                    </div>
                  )}
                  <button className="btn btn-primary " onClick={() => toggleDetails(index)}>
                    {showDetailsIndex === index ? 'Hide Details' : 'Show Details'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserView;
