import React, { useState } from 'react';
import axios from 'axios';

function MessBillCalculation() {
    const [formData, setFormData] = useState({
        date: '',
        TotalEstablishmentcharge: 0,
        TotalFoodCharge: 0,
        Fine: 0
      });
      const [messBillData, setMessBillData] = useState(null);
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('/messbill', formData);
          console.log(response.data);
          // Handle success: show success message, update UI, etc.
        } catch (error) {
          console.error('Error calculating and saving mess bill:', error);
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
      return (
        <div>
          <h2>Mess Bill Form</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="date">Date:</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="TotalEstablishmentcharge">Total Establishment Charge:</label>
              <input type="number" id="TotalEstablishmentcharge" name="TotalEstablishmentcharge" value={formData.TotalEstablishmentcharge} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="TotalFoodCharge">Total Food Charge:</label>
              <input type="number" id="TotalFoodCharge" name="TotalFoodCharge" value={formData.TotalFoodCharge} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="Fine">Fine:</label>
              <input type="number" id="Fine" name="Fine" value={formData.Fine} onChange={handleChange} />
            </div>
            <button type="submit">Calculate and Save Mess Bill</button>
          </form>
          <h2>Latest Mess Bill</h2>
      <button onClick={handleButtonClick}>Get Latest Mess Bill</button>
      {messBillData && (
        <div>
          <h3>Details:</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Establishment Charge</th>
                <th>Total Food Charge</th>
                <th>Fine</th>
                <th>RatePerday</th>
                {/* Add more columns as needed */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{messBillData.date}</td>
                <td>{messBillData.TotalEstablishmentcharge}</td>
                <td>{messBillData.TotalFoodCharge}</td>
                <td>{messBillData.Fine}</td>
                <td>{messBillData.RatePerday}</td>
                {/* Add more cells as needed */}
              </tr>
            </tbody>
          </table>
        </div>
      )}
        </div>
      );
}

export default MessBillCalculation
