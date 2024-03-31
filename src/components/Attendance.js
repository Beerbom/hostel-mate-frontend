import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendancePage = () => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState({});

  useEffect(() => {
    // Fetch student data from MongoDB
    axios.get('/attendance')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAttendanceChange = (studentId, isPresent) => {
    setAttendanceData(prevData => ({
      ...prevData,
      [studentId]: {
        date: selectedDate,
        present: isPresent,
      }
    }));
  };

  const handleSubmit = () => {
    // Save attendance data to MongoDB
    axios.post('/attendance/save', { attendanceData })
      .then(response => {
        console.log('Attendance saved successfully:', response.data);
      })
      .catch(error => {
        console.error('Error saving attendance:', error);
      });
  };

  return (
    <div>
      <h1>Attendance Page</h1>
      <label>Select Date:</label>
      <input type="date" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)} />

      <h2>Students:</h2>
      {students.map(student => (
        <div key={student._id}>
          <span>{student.Name}</span>
          <label>
            Present
            <input
              type="checkbox"
              onChange={(e) => handleAttendanceChange(student._id, e.target.checked)}
              checked={attendanceData[student._id]?.present || false}
            />
          </label>
        </div> 
      ))}

      <button onClick={handleSubmit}>Submit Attendance</button>
    </div>
  );
};

export default AttendancePage;
