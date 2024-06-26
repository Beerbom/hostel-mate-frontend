import React, { useState } from 'react';
import Student from '../components/Student';
import PerAddress from '../components/PerAddress';
import Gaurdian from '../components/Gaurdian';
import Files from '../components/Files';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; 

const Loader = () => (
  <div className="loader">
    <span className="loader-text">Loading...</span>
    <span className="load"></span>
  </div>
);

function Form() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState({
    Name: '',
    PhoneNo: '',
    Email: '',
    Gender: '',
    Degree: '',
    AdmNo: '',
    YearOfStudy: '',
    Branch: '',
    PAddress1: '',
    PAddress2: '',
    PPincode: '',
    Distance: '',
    PDistrict: '',
    PState: '',
    PCountry: '',
    Adhar: '',
    RAddress: '',
    RAddress2: '',
    RPincode: '',
    RDistrict: '',
    RState: '',
    RCountry: '',
    Income: '',
    IncomeCertificate: '',
    Gname: '',
    GPhoneNo: '',
    Relation: '',
    GAddress1: '',
    GAddress2: '',
    GPincode: '',
    GDistrict: '',
    GState: '',
    GCountry: '',
    Priority: ''
  });

  const [loading, setLoading] = useState(false); // Added loading state
  const [modalShow, setModalShow] = useState(false); // Modal show state
  const [modalMessage, setModalMessage] = useState(''); // Modal message state
  const navigate = useNavigate();

  const validateForm = () => {
    // Check for required fields
    const requiredFields = [
      'Name', 'PhoneNo', 'Email', 'Gender', 'Degree', 'AdmNo', 'YearOfStudy', 'Branch',
      'PAddress1', 'PAddress2', 'PPincode', 'PDistrict', 'PState', 'PCountry','Adhar','Income','IncomeCertificate',
      'GPhoneNo','Relation','Priority'
    ];
    for (let field of requiredFields) {
      if (!data[field]) {
        setModalMessage(`${field} is required`);
        setModalShow(true);
        return false;
      }
    }
    // Check for specific field formats
    if (!/^\d{10}$/.test(data.PhoneNo)) {
      setModalMessage('Phone Number must be numeric and have exactly 10 digits.');
      setModalShow(true);
      return false;
    }
    if (!/^\d{2}[A-Z]{2}\d{5}$/.test(data.AdmNo)) {
      setModalMessage('Admission Number must have exactly 9 characters: first two numeric, next two uppercase letters, and the rest numeric.');
      setModalShow(true);
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.Email)) {
      setModalMessage('Please enter a valid email address.');
      setModalShow(true);
      return false;
    }
    return true;
  };

  const RegisterUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true); // Set loading to true when the process starts

    try {
      await axios.post('/api/register', data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      await copyToAnotherSchema(data); // Ensure the data is copied only after the registration is successful

      console.log(data);
      setModalMessage("Registration Successful");
      setModalShow(true);
    } catch (error) {
      setModalMessage("Registration failed");
      setModalShow(true);
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false when the process ends
    }
  };

  const copyToAnotherSchema = async (data) => {
    try {
      await axios.post('/api/copyregister', data);
      console.log("Data copied to another schema:", data);
    } catch (error) {
      console.error("Failed to copy data to another schema:", error);
    }
  };

  const title = ["Add Students", "Permanent Address (same as in Aadhaar)", "Guardian Details", "Upload data"];

  const PageDisplay = () => {
    switch (page) {
      case 0:
        return <Student data={data} setData={setData} />;
      case 1:
        return <PerAddress data={data} setData={setData} />;
      case 2:
        return <Gaurdian data={data} setData={setData} />;
      default:
        return <Files data={data} setData={setData} />;
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-center '>
        <div className='py-8 px-4 shadow rounded-lg px-10 w-100 mt-10 rounded' style={{ backgroundColor: "#2E2E2E", maxWidth: "748px", marginTop: "50px" }}>
          <h2 className='mt-3 text-white mb-3'>{title[page]}</h2>
          <div>{PageDisplay()}</div>
          <div className="d-flex flex-row gap-3 pt-8 justify-content-center">
            <button
              onClick={(e) => {
                if (page === title.length - 1) {
                  RegisterUser(e);
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
              className="btn d-flex w-25 justify-content-center rounded-md border border-transparent py-2 px-4" style={{ backgroundColor: "#00868D", color: "#FFFFFF", marginBottom: '20px' }}
              disabled={loading} // Disable button when loading
            >
              {page === title.length - 1 ? "Submit" : "Next"}
            </button>
            <button
              onClick={() => {
                if (page === 0) {
                  navigate('/');
                } else {
                  setPage((currPage) => currPage - 1);
                }
              }}
              className="btn d-flex w-25 justify-content-center rounded-md border border-transparent py-2 px-4" style={{ backgroundColor: "#3F3F3F", color: "#FFFFFF", marginBottom: '20px' }}
            >
              {page === 0 ? "Back" : "Prev"}
            </button>
          </div>
        </div>
      </div>
      {loading && <Loader />} {/* Show loader when loading */}
      
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Form;
