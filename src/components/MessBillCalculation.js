import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './Navbar';
import { useNavigate } from 'react-router-dom';

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
        try {
          const response = await axios.post('/messbill', formData);
          console.log(response.data);
          setMessage(response.data.message);
          // Handle success: show success message, update UI, etc.
        } catch (error) {
          console.error('Error calculating and saving mess bill:', error);
          setError(error.response?.data?.error || 'Failed to calculate and save mess bills');
          // Handle error: show error message, etc.
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
      useEffect(()=>{
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
        handleButtonClick();
      },[])
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
              <input type="date" id="date"  name="date" value={formData.date} onChange={handleChange} className="form-control w-25" required />
            </div>
            <div className="form-group">
              <label htmlFor="TotalEstablishmentcharge">Total Establishment Charge:</label>
              <input type="number" id="TotalEstablishmentcharge" name="TotalEstablishmentcharge" value={formData.TotalEstablishmentcharge} onChange={handleChange} className="form-control w-25" required/>
            </div>
            <div className="form-group">
              <label htmlFor="TotalFoodCharge">Total Food Charge:</label>
              <input type="number" id="TotalFoodCharge" name="TotalFoodCharge" value={formData.TotalFoodCharge} onChange={handleChange} className="form-control w-25" required/>
            </div>
            <div className="form-group">
              <label htmlFor="Fine">Fine:</label>
              <input type="number" id="Fine" name="Fine" value={formData.Fine} onChange={handleChange} className="form-control w-25" required />
            </div>
            <button className='btn btn-warning mt-3 mx-4 align-items-center ' style={{color:'#ffffff'}}type="submit">Calculate and Save Mess Bill</button>
          </form>
          <h3>Latest Mess Bill</h3>
      {/* <button className='btn btn-warning'onClick={handleButtonClick}>Get Latest Mess Bill</button> */}
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
          <button className='btn btn-warning' style={{color:"#ffffff"}} onClick={back}>Next</button> 
        </div>
      )}
      </div>
        </div>
      );
}

export default MessBillCalculation
