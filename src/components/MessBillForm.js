import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';

const Loader = () => (
  <div className="loader">
    <span className="loader-text">Loading...</span>
    <span className="load"></span>
  </div>
);
function MessBillForm() {
  const [formData, setFormData] = useState({
    date: '',
    TotalEstablishmentcharge: 0,
    TotalFoodCharge: 0,
    Fine:0,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [latestMessBill, setLatestMessBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const [editedMessBills, setEditedMessBills] = useState([]); // State to track edited mess bills

  useEffect(() => {
    const fetchLatestMessBill = async () => {
      try {
        const response = await axios.get('/api/latest-messbill');
        const latestMessBillData = response.data.messBillData;
        setFormData({
          date: latestMessBillData.date,
          TotalEstablishmentcharge: latestMessBillData.TotalEstablishmentcharge,
          TotalFoodCharge: latestMessBillData.TotalFoodCharge,
          Fine: 0, // Initialize Fine as 0 initially
        });
      } catch (error) {
        setError('Failed to fetch latest mess bill data');
      }
    };

    const genLatestMessBill = async () => {
      try {
        const response = await axios.get('/api/messbillgen');
        setLatestMessBill(response.data.latestMessBill);
        setEditedMessBills(response.data.latestMessBill.messBills); // Initialize edited mess bills with latest data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching latest mess bill:', error);
        setError('Failed to fetch latest mess bill');
        setLoading(false);
      }
    };

    fetchLatestMessBill();
    genLatestMessBill();
  }, []);

  const handleFineChange = (index, value) => {
    const updatedMessBills = [...editedMessBills]; // Use editedMessBills for editing
    updatedMessBills[index].Fine = value;
    updatedMessBills[index].TotalAmount = updatedMessBills[index].Amount + parseFloat(value);
    setEditedMessBills(updatedMessBills);
  };

    const handleAddFine = () => {
        setIsEditing(!isEditing); // Toggle editing state
      };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/messbilll', formData);
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to calculate and save mess bills');
    }
  };
  const handleConfirmUpdate = async () => {
    try {
      const response = await axios.post('/api/update-messbills', { messBills: editedMessBills });
      setMessage(response.data.message);
      setIsEditing(false); // Turn off editing mode after successful update
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update mess bills');
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2 className="mb-4">Mess Bill Form</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <Loader /> // Show loader component when loading is true
        ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="date">Date:</label>
          <input type="text" style={{ border: "none", background: "none", outline: 'none', caretColor: 'transparent' }} id="date" name="date" value={formData.date} readOnly />

          <label htmlFor="TotalEstablishmentcharge">Total Establishment Charge:</label>
          <input type="text" style={{ border: "none", background: "none", caretColor: 'transparent', outline: 'none' }} id="TotalEstablishmentcharge" name="TotalEstablishmentcharge" value={formData.TotalEstablishmentcharge} readOnly />

          <label htmlFor="TotalFoodCharge">Total Food Charge:</label>
          <input type="text" style={{ border: "none", background: "none", outline: 'none', caretColor: 'transparent' }} id="TotalFoodCharge" name="TotalFoodCharge" value={formData.TotalFoodCharge} readOnly />

          <label htmlFor="Fine">Fine:</label>
          <input type="text" style={{ border: "none", background: "none", width: "50px", outline: 'none', caretColor: 'transparent' }} id="Fine" name="Fine" value={formData.Fine} readOnly />

          <button type="submit" style={{ color: '#ffffff' }} className="btn btn-warning align-items-center mt-3">Generate Mess Bill</button>
        </form>
        )}
        <div>
          <h5>Latest Mess Bill</h5>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : latestMessBill ? (
            <div>
                <button onClick={handleAddFine} className="btn btn-danger mb-3">
          {isEditing ? 'Confirm' : 'Add Fine'} {/* Button text changes based on editing state */}
        </button>
              <p className='text-center fs-4 fw-5'>Mess bill for the Month of: {latestMessBill.month}</p>
              <table className="table table-bordered table-striped table-lg mx-auto" style={{ width: '80%' }}>
                <thead>
                  <tr>
                    <th className="text-center">Room</th>
                    <th className="text-center">Sl No</th>
                    <th className="text-center">Name</th>

                    <th className="text-center"> ADM NO</th>
                    <th className="text-center"> Attendance</th>
                    <th className="text-center"> Amount</th>
                    <th className="text-center">Fine</th>
                    <th className="text-center"> Total Amount</th>
                    
                  </tr>
                </thead>
                <tbody>

                  {editedMessBills.map((bill, index) => (
                    <tr key={index}>
                      <td>{bill.Room_No}</td>
                      <td> {index + 1}</td>
                      <td>{bill.Name}</td>
                      <td>{bill.AdmNo}</td>
                      <td>{bill.TotalAttendance}</td>
                      <td>{Math.round(bill.Amount)}</td>
                      <td>
                  {isEditing ? (
                    <input
                      type="number"
                      value={bill.Fine}
                      onChange={(e) => handleFineChange(index, e.target.value)}
                    />
                  ) : (
                    bill.Fine // Show fine amount without input field when not editing
                  )}
                </td>
                      <td>{Math.round(bill.TotalAmount)}</td>
                    </tr>
                  ))}

                </tbody>
              </table>
              {isEditing && (
          <button onClick={handleConfirmUpdate} className="btn btn-success mt-3">
            Confirm {/* Button to confirm and update database */}
          </button>
        )}
            </div>
          ) : (
            <p>No latest mess bill data found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default MessBillForm;
