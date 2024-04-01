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
    <div className="container">
      <h1 className="text-center mt-4">Attendance Page</h1>
      <label className="d-block text-center">Select Date:</label>
      <input className="form-control mx-auto" type="date" value={selectedDate} onChange={(e) => handleDateChange(e.target.value)} style={{ cursor: 'pointer' }}/>

      <h2 className="text-center mt-4">Students:</h2>
      <table className="table table-bordered table-striped table-lg mx-auto" style={{ width: '80%' }}>
        <thead>
          <tr>
            <th className="text-center">Serial No</th>
            <th className="text-center">Room No</th>
            <th className="text-center">Name</th>
            <th className="text-center">Present</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student._id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{student.Room_No}</td>
              <td>{student.Name}</td>
              <td className="text-center">
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => handleAttendanceChange(student._id, e.target.checked)}
                    checked={attendanceData[student._id]?.present || false}
                  />
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSubmit}>Submit Attendance</button>
      </div>
    </div>
  );
};

export default AttendancePage;
