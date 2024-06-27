import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Loader = () => (
  <div className="loader">
    <span className="loader-text">Loading...</span>
    <span className="load"></span>
  </div>
);

function MessBillCalculation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    TotalEstablishmentcharge: 0,
    TotalFoodCharge: 0,
    Fine: 0
  });
  const [messBillData, setMessBillData] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for calculating and saving mess bill

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const back = () => {
    navigate('/mb');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting form
    try {
      const response = await axios.post('/api/messbill', formData);
      setMessage(response.data.message);
      setLoading(false); // Set loading to false after successful calculation and saving
    } catch (error) {
      console.error('Error calculating and saving mess bill:', error);
      setError(error.response?.data?.error || 'Failed to calculate and save mess bills');
      setLoading(false); // Set loading to false in case of error
    }
  };

  const handleButtonClick = async () => {
    setLoading(true); // Set loading to true when fetching latest mess bill data
    try {
      const response = await axios.get('/api/latest-messbill');
      setMessBillData(response.data.messBillData);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error('Error fetching latest mess bill data:', error);
      setError('Failed to fetch latest mess bill data');
      setLoading(false); // Set loading to false in case of error
    }
  };

  useEffect(() => {
    handleButtonClick(); // Fetch latest mess bill data on component mount
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container mt-3">
        <h2 className="mb-2">Mess Bill Form</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="TotalEstablishmentcharge">Total Establishment Charge:</label>
            <input type="number" id="TotalEstablishmentcharge" name="TotalEstablishmentcharge" value={formData.TotalEstablishmentcharge} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="TotalFoodCharge">Total Food Charge:</label>
            <input type="number" id="TotalFoodCharge" name="TotalFoodCharge" value={formData.TotalFoodCharge} onChange={handleChange} className="form-control" required />
          </div>
          <div className="form-group">
            <label htmlFor="Fine">Fine:</label>
            <input type="number" id="Fine" name="Fine" value={formData.Fine} onChange={handleChange} className="form-control" required />
          </div>
          <button className='btn btn-warning mt-3 mx-4 align-items-center' style={{ color: '#ffffff' }} type="submit">
            {loading ? <Loader /> : 'Calculate and Save Mess Bill'}
          </button>
        </form>

        <h3>Latest Mess Bill</h3>
       
        {messBillData && (
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-lg mx-auto">
              <thead>
                <tr>
                  <th className="text-center">Date</th>
                  <th className="text-center">Total Establishment Charge</th>
                  <th className="text-center">Total Food Charge</th>
                  <th className="text-center">RatePerday</th>
                  <th className="text-center">No Of Users</th>
                  <th className="text-center">TotalAttendance</th>
                  <th className="text-center">TotalFine</th>
                  <th className="text-center">essCharge</th>
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
            <button className='btn btn-warning' style={{ color: "#ffffff" }} onClick={back}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessBillCalculation;
