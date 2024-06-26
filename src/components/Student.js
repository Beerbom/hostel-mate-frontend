import React from 'react';

function Student({ data, setData }) {
  const handleDegreeChange = (e) => {
    setData({ ...data, Degree: e.target.value, YearOfStudy: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: (name === 'Name' || name === 'AdmNo') ? value.toUpperCase() : value });
  };

 

  return (
    <div className='mb-6'>
      fill all the field necessary *
      <div className="form-group" style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="Name"
          onChange={handleInputChange}
          value={data.Name}
          className="form-control text-white"
          style={{ backgroundColor: "#111111", height: "62px", width: "95%" }}
          id="exampleInputName"
          placeholder="Name of Student (All in CAPS) *"
        />
      </div>

      <div className="form-group d-flex" style={{ marginBottom: "20px" }}>
        <input type="text" readOnly className="form-control" value="+91" style={{ height: '62px', width: '10%', backgroundColor: '#3E3E3E', color: '#A59191' }} />
        <input
          type="text"
          name="PhoneNo"
          onChange={handleInputChange}
          // onBlur={handleValidation}
          value={data.PhoneNo}
          className="form-control"
          id="exampleInputContact"
          style={{ marginLeft: '20px', backgroundColor: "#111111", height: "62px", width: "82%" }}
          placeholder="Contact Number *"
        />
      </div>

      <div className="form-group" style={{ marginBottom: "20px" }}>
        <input
          type="email"
          name="Email"
          onChange={handleInputChange}
          // onBlur={handleValidation}
          value={data.Email}
          className="form-control text-white"
          style={{ backgroundColor: "#111111", height: "62px", width: "95%" }}
          id="exampleInputEmail"
          placeholder="Email Address *"
        />
      </div>

      <div className='text-white rounded' style={{ marginBottom: "30px", backgroundColor: "#111111", height: "62px", display: 'flex', width: "95%", justifyContent: 'space-evenly', alignItems: 'center' }}>
        Gender *
        <div className="form-check form-check-inline">
          <input className="form-check-input" onChange={(e) => setData({ ...data, Gender: e.target.value })} value="F" checked={data.Gender === "F"} type="radio" name="exampleRadios" id="exampleRadios2" />
          <label className="form-check-label" htmlFor="exampleRadios2">
            F
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" onChange={(e) => setData({ ...data, Gender: e.target.value })} value="Other" checked={data.Gender === "Other"} name="exampleRadios" id="exampleRadios3" />
          <label className="form-check-label" htmlFor="exampleRadios3">
            Other
          </label>
        </div>
      </div>

      <div className='text-white' style={{ marginBottom: "20px" }}>
        <h3>Details</h3>
      </div>

      <div className='text-white rounded' style={{ marginBottom: "30px", backgroundColor: "#111111", height: "62px", display: 'flex', width: "95%", justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap' }}>
        Degree *
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="exampleRadioss" onChange={handleDegreeChange} value="BTech" checked={data.Degree === "BTech"} id="exampleRadios1" />
          <label className="form-check-label" htmlFor="exampleRadios1">
            BTech
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="exampleRadioss" onChange={handleDegreeChange} value="BArch" checked={data.Degree === "BArch"} id="exampleRadios2" />
          <label className="form-check-label" htmlFor="exampleRadios2">
            BArch
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="exampleRadioss" onChange={handleDegreeChange} value="MTech" checked={data.Degree === "MTech"} id="exampleRadios3" />
          <label className="form-check-label" htmlFor="exampleRadios3">
            MTech
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="exampleRadioss" onChange={handleDegreeChange} value="MCA" checked={data.Degree === "MCA"} id="exampleRadios4" />
          <label className="form-check-label" htmlFor="exampleRadios4">
            MCA
          </label>
        </div>
      </div>

      <div className="flex-row" style={{ display: "flex", justifyContent: "space-between", marginBottom: '20px', width: "95%" }}>
        <div className="col-5">
          <input
            type="text"
            className="form-control"
            name="AdmNo"
            onChange={handleInputChange}
            // onBlur={handleValidation}
            value={data.AdmNo}
            placeholder="Admission No *"
            style={{ backgroundColor: "#111111", height: "62px" }}
          />
        </div>

        {data.Degree === 'BTech' && (
          <div className="col-4">
            <select
              className="form-control"
              onChange={(e) => setData({ ...data, YearOfStudy: e.target.value })}
              value={data.YearOfStudy}
              style={{ backgroundColor: "#111111", height: "62px" }}
            >
              <option value="">Select Year of Study</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
        )}

        {data.Degree === 'BArch' && (
          <div className="col-4">
            <select
              className="form-control"
              onChange={(e) => setData({ ...data, YearOfStudy: e.target.value })}
              value={data.YearOfStudy}
              style={{ backgroundColor: "#111111", height: "62px" }}
            >
              <option value="">Select Year of Study</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        )}

        {(data.Degree === 'MTech' || data.Degree === 'MCA') && (
          <div className="col-4">
            <select
              className="form-control"
              onChange={(e) => setData({ ...data, YearOfStudy: e.target.value })}
              value={data.YearOfStudy}
              style={{ backgroundColor: "#111111", height: "62px" }}
            >
              <option value="">Select Year of Study</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        )}

        <div className="col-2">
          <input
            type="text"
            className="form-control"
            name="Branch"
            onChange={handleInputChange}
            value={data.Branch}
            placeholder="Branch *"
            style={{ backgroundColor: "#111111", height: "62px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Student;
