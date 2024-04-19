import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessDuty() {
  const [allocationMessage, setAllocationMessage] = useState('');
  const [messDutyData, setMessDutyData] = useState([]);

  useEffect(() => {
    fetchMessDutyData();
  }, []);

  const handleAllocateMessDuty = () => {
    axios.post('/allocate-mess-duty')
      .then(response => {
        setAllocationMessage(response.data.message);
        fetchMessDutyData();
      })
      .catch(error => {
        console.error('Error allocating mess duty:', error);
        setAllocationMessage('Error allocating mess duty');
      });
  };

  const fetchMessDutyData = () => {
    axios.get('/mess-duty')
      .then(response => {
        setMessDutyData(response.data);
      })
      .catch(error => {
        console.error('Error fetching mess duty data:', error);
      });
  };

  const handleDeleteAllMessDuty = () => {
    axios.delete('/delete-all-mess-duty')
      .then(response => {
        console.log(response.data.message);
        fetchMessDutyData(); // Refresh the mess duty data after deletion
      })
      .catch(error => {
        console.error('Error deleting all mess duty data:', error);
      });
  };

  return (
    <div>
      <h2>Mess Duty Allocation</h2>
      <button className='btn btn-primary' onClick={handleAllocateMessDuty}>Allocate Mess Duty</button>
      <button className='btn btn-danger' onClick={handleDeleteAllMessDuty}>Delete All Mess Duty Data</button>
      <p>{allocationMessage}</p>
      <h3>Mess Duty Table</h3>
      <table className="table table-bordered table-striped table-lg mx-auto" style={{ width: '80%' }}>
        <thead>
          <tr>
            <th className="text-center">Room No</th>
            <th className="text-center">Student Name</th>
            <th className="text-center">From Date</th>
            <th className="text-center">To Date</th>
          </tr>
        </thead>
        <tbody>
          {messDutyData.map((item, index) => (
            <tr key={index}>
              <td className="text-center">{item.roomNo}</td>
              <td className="text-center">{item.studentName}</td>
              <td className="text-center">{item.fromDate}</td>
              <td className="text-center">{item.toDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MessDuty;
