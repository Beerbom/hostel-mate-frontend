import React from 'react';

function Files({ data, setData }) {
  return (
    <div className='mb-6'>
      fill all the field necessary *
      <div className=' text-white rounded' style={{marginBottom:"30px",backgroundColor:"#111111",height:"62px",display:'flex',width:"95%",justifyContent:'space-evenly',alignItems:'center'}}>Priority *
        <div class="form-check form-check-inline" >

          <input class="form-check-input" onChange={(e)=>setData({...data,Priority:e.target.value})} value="SC/ST" checked={data.Priority === "SC/ST"} type="radio" name="priority" id="priority1"   />
          <label class="form-check-label" for="priority1">
            SC/ST
          </label>
        </div >
        <div class="form-check form-check-inline">
          <input class="form-check-input" onChange={(e)=>setData({...data,Priority:e.target.value})} value="OEC" checked={data.Priority === "OEC"} type="radio" name="priority" id="priority2"  />
          <label class="form-check-label" for="priority2">
            OEC
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" onChange={(e)=>setData({...data,Priority:e.target.value})} value="BPL"checked={data.Priority === "BPL"} name="priority" id="priority3"  />
          <label class="form-check-label" for="priority3">
            BPL
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" onChange={(e)=>setData({...data,Priority:e.target.value})} value="none"checked={data.Priority === "none"} name="priority" id="priority4"  />
          <label class="form-check-label" for="priority4">
            none
          </label>
        </div>
      </div>
      <div className='text-white' style={{ marginBottom: '20px' }}>
        <h3>Income certificate <small style={{ fontSize: "15px" }}>(pdf maximum size 3 mb)</small></h3>
      </div>
      <div className="flex-row" style={{ display: "flex", justifyContent: "space-evenly", marginBottom: '20px', width: "95%" }}>
        <div className="col-5">
          <input type="text" className="form-control" onChange={(e) => setData({ ...data, Income: e.target.value })} value={data.Income} placeholder="Annual Income *" style={{ backgroundColor: "#111111", height: "62px" }} required />
        </div>
        <div className="col-5">
          <input type="file" name="IncomeCertificate" accept='application/pdf' className="form-control" onChange={(e) => setData({ ...data, IncomeCertificate: e.target.files[0] })} style={{ backgroundColor: "#111111", height: "62px" }} required />
        </div>
      </div>

      <div className='text-white' style={{ marginBottom: "20px" }}>
        <h3>Adhaar card <small style={{ fontSize: "15px" }}>(pdf maximum size 3 mb)</small></h3>
      </div>

      <div className="w-50" style={{ marginBottom: '20px' }}>
        <input type="file" className="form-control" name='Adhar' onChange={(e) => setData({ ...data, Adhar: e.target.files[0] })} style={{ backgroundColor: "#111111", height: "62px" }} accept='application/pdf' required />
      </div>
    </div>
  );
}

export default Files;
