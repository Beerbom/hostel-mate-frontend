import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNavbar from './UserNavbar';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [messDutyData, setMessDutyData] = useState([]);
  const [complaint, setComplaint] = useState('');
  const [complaintSuccess, setComplaintSuccess] = useState(false);
  const [complaintError, setComplaintError] = useState('');
  const [messBill, setMessBill] = useState(null);
  const [messBillData, setMessBillData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('/nextpage', {
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

  useEffect(() => {
    const fetchUserMessDuty = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('/usermessduty', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMessDutyData(response.data);
      } catch (error) {
        setMessDutyData([]);
      }
    };
    const fetchMessBill = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }

        const response = await axios.get('/usermessbill', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response.data.userMessBill)
        setMessBill(response.data.userMessBill);
      } catch (error) {
        setError('Error fetching mess bill');
      }
    };

    fetchMessBill();
    handleButtonClick();
    fetchUserMessDuty();
  }, []);

  const handleComplaintSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(
        '/complaint',
        { complaint, Name: user.Name, AdmNo: user.AdmNo },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComplaintSuccess(true);
      setComplaintError('');
      setComplaint('');
    } catch (error) {
      setComplaintError(error.response?.data?.error || 'Error submitting complaint');
    }
  };
  const handleButtonClick = async () => {
    try {
      const response = await axios.get('/latest-messbill');
      console.log(response.data);
      setMessBillData(response.data.messBillData);
    } catch (error) {
      console.error('Error fetching latest mess bill data:', error);
      // Handle error: show error message, etc.
    }
  };

  return (
    <div>
      {user && user.Name ? (
        <UserNavbar username={user} />
      ) : null}
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p></p>
      ) : user ? (
        <div>
          <h6>AdmNo: {user.TotalAmount}</h6>
        </div>
      ) : (
        <p>No user profile data found.</p>
      )}

      <h3>Mess Duty Data</h3>
      {messDutyData.length > 0 ? (
        <ul>
          {messDutyData.map((duty, index) => (
            <li key={index}>
              From: {duty.fromDate} - To: {duty.toDate}
            </li>
          ))}
        </ul>
      ) : (
        <p>No mess duty data found for the logged-in user.</p>
      )}
      <h3>Mess Bill Details</h3>
      {user ?(
      <div><p>Total Amount to be paid for this month:{Math.round(user.TotalAmount)}</p>
      <h3>Attendance :{user.TotalAttendance}</h3>
      </div>
        
        
      ) : (<p></p>)}
      {messBill ? (
        <div>
          <p>Amount: {messBill.Amount}</p>
          <p>Fine: {messBill.Fine}</p>
          <p>TotalAttendance: {messBill.TotalAttendance}</p>
        </div>
      ) : (
        <p></p>
      )}
      {messBillData && (
        <div>
          
          <table className="table table-bordered table-striped table-lg mx-auto" style={{ width: '80%' }}>
            <thead>
              <tr>
                <th className="text-center">Date</th>
                <th className="text-center">Total Establishment Charge</th>
                <th className="text-center">Total Food Charge</th>
                
                <th className="text-center"> RatePerday</th>
                <th className="text-center"> No Of Users</th>
                <th className="text-center"> TotalAttendance</th>
                <th className="text-center">TotalFine</th>
                <th className="text-center"> essCharge</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">{messBillData.date}</td>
                <td className="text-center">{messBillData.TotalEstablishmentcharge}</td>
                <td className="text-center">{messBillData.TotalFoodCharge}</td>
                
                <td className="text-center">{Math.round(messBillData.RatePerDay)}</td>
                <td className="text-center">{messBillData.NumberofUser}</td>
                <td className="text-center">{messBillData.TotalAttendance}</td>
                <td className="text-center">{messBillData.Fine}</td>
                <td className="text-center">{Math.round(messBillData.esscharge)}</td>
                
                
              </tr>
            </tbody>
          </table>
          
        </div>
      )}

      <h3>Complaint Registration</h3>
      {complaintSuccess && <p style={{ color: 'green' }}>Complaint submitted successfully!</p>}
      <form onSubmit={handleComplaintSubmit}>
        <div className=''>
        <div className='d-flex mt-3 my-3 mx-5'><input style={{border:"none", background:"none"}} type="text" value={user?.Name} readOnly />
        <input style={{border:"none", background:"none"}} type="text" value={user?.AdmNo} readOnly /></div>
          
          <div className='d-flex mt-3 my-3 mx-5'>
          <textarea
            style={{width:'550px',height:'250px'}}
            id="complaint"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
          ></textarea>
          </div>
          <button className='btn btn-primary ' style={{marginLeft:'440px'}} type="submit">Submit Complaint</button>
        </div>
        
        {complaintError && <p style={{ color: 'red' }}>{complaintError}</p>}
      </form>
    </div>
  );
};

export default UserPage;
