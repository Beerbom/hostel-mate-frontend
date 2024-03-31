import React, { useState } from 'react';
import Student from '../components/Student';
import PerAddress from '../components/PerAddress';
import Gaurdian from '../components/Gaurdian';
import Files from '../components/Files';
import axios from 'axios';

function Form() {
  const [page, setPage] = useState(0);
  const [data, setData] = useState({
    Name: '',
    PhoneNo: '',
    EmergencyPhoneNo: '',
    Gender: '',
    Degree: '',
    AdmNo: '',
    YearOfStudy: '',
    Branch: '',
    PAddress1: '',
    PAddress2: '',
    PPincode: '',
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
    Priority:''
  });

  const RegisterUser = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/register', data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      copyToAnotherSchema(data);

      console.log(data);
      alert("Registration Successful");
    } catch (error) {
      alert("Registration failed");
      console.log(error);
    }
  };
  const copyToAnotherSchema = async (data) => {
    try {
      await axios.post('/copyregister', data);
      console.log("Data copied to another schema:", data);
    } catch (error) {
      console.error("Failed to copy data to another schema:", error);
    }
  };

  const title = ["Add Students", "Permanent Address (same as in adhar)", "Guardian Details", "Upload data"];

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
          <div className="d-flex flex-row gap-3 pt-8 justify-content-center" >
            <button
              onClick={(e) => {
                if (page === title.length - 1) {
                  alert("Form Submitted");
                  RegisterUser(e);
                  console.log(data);
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
              className="btn d-flex w-25 justify-content-center rounded-md border border-transparent py-2 px-4" style={{ backgroundColor: "#00868D", color: "#FFFFFF", marginBottom: '20px' }}>
              {page === title.length - 1 ? "Submit" : "Next"}
            </button>
            <button
              disabled={page === 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
              className="btn d-flex w-25 justify-content-center rounded-md border border-transparent py-2 px-4" style={{ backgroundColor: "#3F3F3F", color: "#FFFFFF", marginBottom: '20px' }}>Prev</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
