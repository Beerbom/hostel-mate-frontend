import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserView() {
  const [allottedDetails, setAllottedDetails] = useState([]);

  useEffect(() => {
    const fetchAllottedDetails = async () => {
      try {
        const response = await axios.get('/allotted-details');
        setAllottedDetails(response.data);
      } catch (error) {
        console.error('Error fetching allotted details:', error.message);
      }
    };

    fetchAllottedDetails();
  }, []);

  const [showDetailsIndex, setShowDetailsIndex] = useState(null);

  const toggleDetails = (index) => {
    setShowDetailsIndex(index === showDetailsIndex ? null : index);
  };

  return (
    <div className="container">
      <h1 className="my-4">Allotted Details</h1>
      <div className="row">
        {allottedDetails.map((detail, index) => (
          <div key={detail._id} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{detail.Name}</h5>
                <p className="card-text">Admission No: {detail.AdmNo}</p>
                <p className="card-text">Room No: {detail.Room_No}</p>
                {showDetailsIndex === index && (
                  <div className=''>
                   
                    <p className="card-text">Phone No: {detail.PhoneNo}</p>
                    <p className="card-text ">Phone No: {detail.Branch}</p>
                    
                  </div>
                )}
                <button className='btn btn-primary' onClick={() => toggleDetails(index)}>
                  {showDetailsIndex === index ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserView;
