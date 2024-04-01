import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessDuty() {
  const [allocationMessage, setAllocationMessage] = useState('');
  const [messDutyData, setMessDutyData] = useState([]);

  useEffect(() => {
    fetchMessDutyData();
  }, []); // Fetch mess duty data on component mount

  const handleAllocateMessDuty = () => {
    axios.post('/allocate-mess-duty') // Update the URL with your backend URL
      .then(response => {
        setAllocationMessage(response.data.message);
        fetchMessDutyData(); // Fetch mess duty data after allocation
      })
      .catch(error => {
        console.error('Error allocating mess duty:', error);
        setAllocationMessage('Error allocating mess duty');
      });
  };

  const fetchMessDutyData = () => {
    // Fetch mess duty data from backend
    axios.get('/mess-duty') // Update the URL with your backend URL
      .then(response => {
        setMessDutyData(response.data);
      })
      .catch(error => {
        console.error('Error fetching mess duty data:', error);
      });
  };

  return (
    <div>
      <h2>Mess Duty Allocation</h2>
      <button onClick={handleAllocateMessDuty}>Allocate Mess Duty</button>
      <p>{allocationMessage}</p>
      <h3>Mess Duty Table</h3>
      <table>
        <thead>
          <tr>
            <th>Room No</th>
            <th>Student Name</th>
            <th>From Date</th>
            <th>To Date</th>
          </tr>
        </thead>
        <tbody>
          {messDutyData.map((item, index) => (
            <tr key={index}>
              <td>{item.roomNo}</td>
              <td>{item.studentName}</td>
              <td>{item.fromDate}</td>
              <td>{item.toDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MessDuty;
