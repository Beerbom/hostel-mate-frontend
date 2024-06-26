import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './Navbar';

function MessDuty() {
  const [allocationMessage, setAllocationMessage] = useState('');
  const [messDutyData, setMessDutyData] = useState([]);
  const [lastClickedDate, setLastClickedDate] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    fetchMessDutyData();
  }, []);

  const handleAllocateMessDuty = () => {
    setLoading(true); // Set loading to true when button is clicked

    if (lastClickedDate && isSameDay(new Date(), lastClickedDate)) {
      setAllocationMessage('Button disabled for today.');
      setLoading(false); // Set loading to false after handling the click
      return;
    }

    setLastClickedDate(new Date());
    axios.post('/api/allocate-mess-duty')
      .then(response => {
        setAllocationMessage(response.data.message);
        fetchMessDutyData();
        setLoading(false); // Set loading to false after handling the click
      })
      .catch(error => {
        console.error('Error allocating mess duty:', error);
        setAllocationMessage('Error allocating mess duty');
        setLoading(false); // Set loading to false after handling the click
      });
  };

  const fetchMessDutyData = () => {
    setLoading(true); // Set loading to true when fetching data

    axios.get('/api/mess-duty')
      .then(response => {
        setMessDutyData(response.data);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch(error => {
        console.error('Error fetching mess duty data:', error);
        setLoading(false); // Set loading to false after fetching data
      });
  };

  const handleDeleteAllMessDuty = () => {
    setLoading(true); // Set loading to true when button is clicked

    axios.delete('/api/delete-all-mess-duty')
      .then(response => {
        console.log(response.data.message);
        fetchMessDutyData();
        setLoading(false); // Set loading to false after handling the click
      })
      .catch(error => {
        console.error('Error deleting all mess duty data:', error);
        setLoading(false); // Set loading to false after handling the click
      });
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <div>
      <NavBar />
      <h2>Mess Duty Allocation</h2>
      <div className="loader" style={{ display: loading ? 'flex' : 'none' }}>
        <span className="loader-text">loading</span>
        <span className="load"></span>
      </div>
      <button className='btn btn-primary' onClick={handleAllocateMessDuty} disabled={messDutyData.length > 0}>
        Allocate Mess Duty
      </button>
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
