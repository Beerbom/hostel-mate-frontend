import React, { useState } from 'react'
import Student from '../components/Student';
import PerAddress from '../components/PerAddress';
import Gaurdian from '../components/Gaurdian';
import axios from 'axios';
function Form() {
  const [page, setpage] = useState(0);
  const [data, setData] = useState({
    Name: '',
    PhoneNo: '',
    emergencyContactNo: '',
    Gender: '',
    degree: '',
    admNo: '',
    yearofStudy: '',
    branch: '',
    paddressLine1: '',
    paddressLine2: '',
    pPincode: '',
    pDistrict: '',
    pState: '',
    pCountry: '',
    adhaar: '',
    raddressLine1: '',
    raddressLine2: '',
    rPincode: '',
    rDistrict: '',
    rState: '',
    rCountry: '',
    income: '',
    IncomeCertificate: '',
    gname: '',
    gcontactNo: '',
    relation: '',
    gaddressLine1: '',
    gaddressLine2: '',
    gPincode: '',
    gDistrict: '',
    gState: '',
    gCountry: ''
  })
  const RegisterUser = async (e) =>{
    const {Name,PhoneNo,EmergencyPhoneNo,Gender,Degree,admNo,YearOfStudy,Branch,PAddress1,
      PAddress2,PPincode,PDistrict,PState,PCountry,adhar,RAddressLine1,RAddress2,RPincode,RDistrict,RState,RCountry,
    Income,IncomeCertificate,GName,GPhoneNo,Relation,GAddress1,GAddress2,GPincode,GDistrict,GState,GCountry}=data;
    e.preventDefault();
    try {
      await axios.post('/register',{
        Name,PhoneNo,EmergencyPhoneNo,Gender,Degree,admNo,YearOfStudy,Branch,PAddress1,
    PAddress2,PPincode,PDistrict,PState,PCountry,adhar,RAddressLine1,RAddress2,RPincode,RDistrict,RState,RCountry,
  Income,IncomeCertificate,GName,GPhoneNo,Relation,GAddress1,GAddress2,GPincode,GDistrict,GState,GCountry

      })
      alert("Registration Successfull");
    } catch (error) {
      alert("Registartion failed");
      console.log(error);
    }

  }
  const title = ["Add Students", "Permanent Address (same as in adhar)", "Gaurdian Details"];
  const PageDisplay = () => {
    if (page == 0) {
      return <Student data={data} setData={setData} />
    }
    else if (page == 1) {
      return <PerAddress data={data} setData={setData} />
    }
    else {
      return <Gaurdian data={data} setData={setData} />
    }
  }
  
  return (
    <div>
{/* title */}
      <div className='d-flex justify-content-center '>
        <div className='py-8 px-4 shadow rounded-lg px-10 w-100 mt-10 rounded' style={{ backgroundColor: "#2E2E2E", maxWidth: "748px", marginTop: "50px" }}>
          <h2 className='mt-3 text-white mb-3'>{title[page]}</h2>
          <div>{PageDisplay()}</div>
          <div className="d-flex  flex-row gap-3 pt-8 justify-content-center" >
            <button
              onClick={(e) => {
                if (page === title.length - 1) {
                  alert("Form Submitted");
                  RegisterUser(e);
                  console.log(data);
                }
                else {
                  setpage((currPage) => currPage + 1)
                }
              }}
              className="btn  d-flex w-25 justify-content-center rounded-md border border-transparent py-2 px-4" style={{ backgroundColor: "#00868D", color: "#FFFFFF", marginBottom: '20px' }}>
              {page === title.length - 1 ? "Submit" : "Next"}
            </button>
            <button
              disabled={page == 0}
              onClick={() => {
                setpage((currPage) => currPage - 1)
              }}
              className="btn d-flex w-25 justify-content-center rounded-md border border-transparent py-2 px-4" style={{ backgroundColor: "#3F3F3F", color: "#FFFFFF", marginBottom: '20px' }}>Prev</button>


          </div>

        </div>



      </div>
    </div>
  )
}

export default Form