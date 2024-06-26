import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './Navbar';
import Modal from './Model';

const Loader = () => (
  <div className="loader">
    <span className="loader-text">Loading...</span>
    <span className="load"></span>
  </div>
);

const CardComponent = () => {
  const [data, setData] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(null);
  const [allottedStudents, setAllottedStudents] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [allotting, setAllotting] = useState(false); 
  const [showModal, setShowModal] = useState(false); 
  const [currentStudentId, setCurrentStudentId] = useState(null); 
  const [modalTitle, setModalTitle] = useState(''); 
  const [modalMessage, setModalMessage] = useState(''); 
  const [confirmAction, setConfirmAction] = useState(null); 
  

  useEffect(() => {
    axios.get('/api/fetch')
      .then(response => {
        const priorityOrder = {
          "SC/ST": 0,
          "OEC": 0,
          "BPL": 0,
          "none": 1 
        };

        const getPriorityValue = (student) => {
          const priority = student.Priority || "None";
          return priorityOrder[priority];
        };

        const extractNumericDistance = (distance) => {
          const match = distance.match(/(\d+)/);
          return match ? parseInt(match[1], 10) : 0;
        };

        const distanceWeight = 0.7;
        const incomeWeight = 0.3;

        const maxDistance = Math.max(...response.data.map(student => extractNumericDistance(student.Distance)));

        const customSort = (a, b) => {
          const aDistance = extractNumericDistance(a.Distance);
          const bDistance = extractNumericDistance(b.Distance);

          const aIncome = parseFloat(a.Income) || 0;
          const bIncome = parseFloat(b.Income) || 0;

          const aScore = distanceWeight * (aDistance / maxDistance) - incomeWeight * aIncome;
          const bScore = distanceWeight * (bDistance / maxDistance) - incomeWeight * bIncome;

          const priorityDiff = getPriorityValue(a) - getPriorityValue(b);
          if (priorityDiff !== 0) {
            return priorityDiff;
          }

          return bScore - aScore;
        };

        const sortedUsers = response.data.sort(customSort);
        setData(sortedUsers.map(user => ({ ...user, selectedPdf: null, showDetails: false })));
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });

    getpdf();
  }, []);

  const getpdf = async () => {
    try {
      const result = await axios.get("/api/getfiles");
      setData(prevData => prevData.map(user => ({ ...user, selectedPdf: null })));
      setData(prevData => prevData.map(user => ({ ...user, selectedPdf: result.data.data.find(data => data._id === user._id)?.IncomeCertificate })));
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

  const handleAllotClick = (studentId) => {
    setCurrentStudentId(studentId);
    setModalTitle('Confirmation');
    setModalMessage('Are you sure you want to allot this student?');
    setConfirmAction(() => handleConfirmAllot);
    setShowModal(true);
  };

  const handleConfirmAllot = () => {
    setShowModal(false);
    setAllotting(true);
    axios.post('/api/allotment', { studentId: currentStudentId })
      .then(response => {
        setModalTitle('Success');
        setModalMessage(`Student details stored successfully. Room allocated successfully. Room No: ${response.data.roomNo}`);
        setConfirmAction(null);
        setShowModal(true);
        moveStudentToAllotted(currentStudentId);
        setAllotting(false);
      })
      .catch(error => {
        setModalTitle('Error');
        setModalMessage('Error storing student details or allocating room.');
        setConfirmAction(null);
        setShowModal(true);
        setAllotting(false);
      });
  };

  const showPdfInFrame = (pdfUrl, index) => {
    setSelectedPdf(pdfUrl);
    setSelectedPdfIndex(index);
  };

  return (
    <>
      <NavBar />
      {loading && <Loader />}
      <div className="container">
        <div className="row">
          {data.map((item, index) => (
            <div key={item._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.Name}</h5>
                  <p className="card-text">AdmNo : {item.AdmNo}</p>
                  <p className="card-text">Degree : {item.Degree} {item.Branch} ({item.YearOfStudy}) year</p>
                  <p className="card-text">Distance : {item.Distance}</p>
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
                      <p>Mob No : {item.PhoneNo}</p>
                      <p>Emergency No : {item.Email}</p>
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
                        <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
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
                      <button className="btn btn-primary" onClick={() => handleAllotClick(item._id)}>Allot</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {allotting && <Loader />}
      </div>
      <Modal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={confirmAction}
        title={modalTitle}
        message={modalMessage}
      />
    </>
  );
};

export default CardComponent;
