import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [attendanceCounts, setAttendanceCounts] = useState({});

  useEffect(() => {
    axios.get('/counts')
      .then(response => {
        setAttendanceCounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance counts:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-4">Attendance Page</h1>
      <div className="text-center mt-4">
        <h2>Attendance Counts for Each Student:</h2>
        <ul>
          {Object.entries(attendanceCounts).map(([studentId, countsByMonth]) => (
            <li key={studentId}>
              Student : {studentId}
              <ul>
                {countsByMonth.map(({ month, count }) => (
                  <li key={month}>
                    Month: {month}, Present Days: {count}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Attendance;
