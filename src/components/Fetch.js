import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CardComponent = () => {
  const [data, setData] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(null);
  const [allottedStudents, setAllottedStudents] = useState([]);


  useEffect(() => {
    axios.get('/fetch')
      .then(response => {
        // Custom sorting function
        const customSort = (a, b) => {
          // Define priority based on caste
          const priorityOrder = {
            "SC/ST": 0,
            "OEC": 0,
            "BPL": 0,
            "None": 1 // Other categories have no priority
          };
  
          // Check if students are from Kerala
          const isFromKerala = (student) => student.PState === 'Kerala';
  
          // Assign default priority if not defined
          const priorityA = a.Priority || "None";
          const priorityB = b.Priority || "None";
  
          // Check if students are from Kerala
          const fromKeralaA = isFromKerala(a);
          const fromKeralaB = isFromKerala(b);
  
          // Compare students from Kerala vs outside Kerala
          if (!fromKeralaA && fromKeralaB) return -1; // Student A is from outside Kerala, but student B is from Kerala
          if (fromKeralaA && !fromKeralaB) return 1; // Student B is from outside Kerala, but student A is from Kerala
  
          // If students are from Kerala, caste priority is not considered
          if (fromKeralaA && fromKeralaB) {
            // If caste priority is the same, compare income
            if (priorityOrder[priorityA] === priorityOrder[priorityB]) {
              return a.Income - b.Income;
            }
            // Compare priority based on caste
            return priorityOrder[priorityA] - priorityOrder[priorityB];
          }
  
          // If students are from outside Kerala, caste priority is considered
          // Compare priority based on caste
          if (priorityOrder[priorityA] !== priorityOrder[priorityB]) {
            return priorityOrder[priorityA] - priorityOrder[priorityB];
          }
  
          // If caste priority is the same, compare income
          return a.Income - b.Income;
        };
  
        // Sort the users array
        const sortedUsers = response.data.sort(customSort);
        setData(sortedUsers.map(user => ({ ...user, selectedPdf: null, showDetails: false }))); // Add selectedPdf and showDetails property to each user
      })
      .catch(error => console.log(error));
  
    getpdf();
  }, []);
  
  

  const getpdf = async () => {
    try {
      const result = await axios.get("/getfiles");
      setData(prevData => prevData.map(user => ({ ...user, selectedPdf: null }))); // Reset selectedPdf for each user
      setData(prevData => prevData.map(user => ({ ...user, selectedPdf: result.data.data.find(data => data._id === user._id)?.IncomeCertificate }))); // Set selectedPdf for each user
    } catch (error) {
      console.error('Error fetching PDFs:', error);
    }
  };

  const toggleDetails = (index) => {
    const newData = [...data];
    newData[index].showDetails = !newData[index].showDetails;
    setData(newData);
  };
    const moveStudentToAllotted = (studentId) => {
    const studentIndex = data.findIndex(student => student._id === studentId);
    const allottedStudent = data[studentIndex];
    setData(prevData => prevData.filter(student => student._id !== studentId));
    setAllottedStudents(prevStudents => [...prevStudents, allottedStudent]);
  };

  const allotStudent = (studentId) => {
    // Show confirm message
    const confirmMessage = `Are you sure you want to allot this student?`;
    if (window.confirm(confirmMessage)) {
      // Send a request to store student details in MongoDB
      axios.post('/allot', { studentId })
        .then(response => {
          alert('Student details stored successfully:', response.data);
          alert(`Room allocated successfully. Room No: ${response.data.roomNo}`);
          moveStudentToAllotted(studentId);

        })
        .catch(error => {
          alert('Error storing student details:', error);
          alert('Error allocating room:', error);
        });
    }
  };

  const showPdfInFrame = (pdfUrl, index) => {
    setSelectedPdf(pdfUrl);
    setSelectedPdfIndex(index);
  };

  return (
    <div className="container">
      <div className="row">
        {data.map((item, index) => (
          <div key={item._id} className="col-md-4 mb-4">
           
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.Name}</h5>
                <p className="card-text">AdmNo : {item.AdmNo}</p>
                <p className="card-text">Degree : {item.Degree} {item.Branch} ({item.YearOfStudy}) year</p>
                <p className="card-text">Income : {item.Income},  Priority : {item.Priority} State: {item.PState}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => toggleDetails(index)}
                >
                  {item.showDetails ? 'Hide Details' : 'Show Details'}
                </button>
                {item.showDetails && (
                  <div>
                    <p>Additional Data:</p>
                    {/* Render additional data here */}
                    <p>Mob No : {item.PhoneNo}</p>
                    <p>Emergency No : {item.EmergencyPhoneNo}</p>
                    <p>Gender : {item.Gender}</p>
                    <p>Address : {item.PAddress1} {item.PAddress2}</p>
                    <p>PinCode : {item.PPincode}</p>
                    <p>{item.PDistrict} {item.PState} {item.PCountry}</p>
                    <p>Residential Address : {item.RAddress1} {item.RAddress2}</p>
                    <p>PinCode : {item.RPincode}</p>
                    <p>{item.RDistrict} {item.RState} {item.RCountry}</p>
                    <p>Gaurdian Details : {item.GName} {item.GPhoneNo}</p>
                    <p>Realation : {item.Relation}</p>
                    <p>Address : {item.GAddress1} {item.GAddress2}</p>
                    <p>PinCode : {item.GPincode}</p>
                    <p>{item.GDistrict} {item.GState} {item.GCountry}</p>
                    <p key={index}>
                      <button className='btn btn-primary' onClick={() => showPdfInFrame(item.IncomeCertificate, index)}>Income Certificate</button><span></span>
                     <span></span> <button className='btn btn-primary' onClick={() => showPdfInFrame(item.Adhar, index)}>Adhaar</button>
                    </p>
                    {selectedPdf && selectedPdfIndex === index && (
                      <div  style={{ maxWidth: '100%', overflow: 'hidden' }}>
                        <iframe
                          src={`http://localhost:5000/files/${selectedPdf}`}
                          width="340"
                          height="300"
                          title="PDF Viewer"
                          style={{ border: "1px solid black" }}
                          frameBorder="0"
                        ></iframe>
                        
                      </div>
                    )}
                    <button className="btn btn-primary" onClick={() => allotStudent(item._id)}>Allot</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardComponent;
