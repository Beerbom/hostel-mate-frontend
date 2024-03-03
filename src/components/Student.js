import React from 'react'

function Student({data,setData}) {
  return (
    <div className='mb-6'>
      <div class="form-group " style={{marginBottom:"20px"}}>
        <input type="text" onChange={(e)=>setData({...data,Name:e.target.value})} value={data.Name}
          class="form-control text-white " style={{backgroundColor:"#111111",height:"62px",width:"95%"}} id="exampleInputName" placeholder="Name of Student(All in CAPS)" />
      </div>
      <div class="form-group d-flex" style={{marginBottom:"20px"}}>
      <input type="text" readonly class="form-control " value="+91" style={{height:'62px',width:'10%',backgroundColor:'#3E3E3E',color:'#A59191'}}/>
        <input type="number"onChange={(e)=>setData({...data,PhoneNo:e.target.value})} value={data.PhoneNo}
         class="form-control" id="exampleInputContact" style={{marginLeft:'20px',backgroundColor:"#111111",height:"62px",width:"82%"}} placeholder="Contact Number" />
      </div>
      <div class="form-group d-flex" style={{marginBottom:"20px"}}>
      <input type="text" readonly class="form-control " value="+91" style={{height:'62px',width:'10%',backgroundColor:'#3E3E3E',color:'#A59191'}}/>
        <input type="number" onChange={(e)=>setData({...data,emergencyContactNo:e.target.value})} value={data.emergencyContactNo}
         class="form-control" id="exampleInputEmergency" style={{marginLeft:'20px',backgroundColor:"#111111",height:"62px",width:"82%"}} placeholder="Emergency Contact Number" />
      </div>
      
      <div className=' text-white rounded' style={{marginBottom:"30px",backgroundColor:"#111111",height:"62px",display:'flex',width:"95%",justifyContent:'space-evenly',alignItems:'center'}}>Gender
        <div class="form-check form-check-inline" >

          <input class="form-check-input" onChange={(e)=>setData({...data,Gender:e.target.value})} value="M" checked={data.Gender === "M"} type="radio" name="exampleRadios" id="exampleRadios1"   />
          <label class="form-check-label" for="exampleRadios1">
            M
          </label>
        </div >
        <div class="form-check form-check-inline">
          <input class="form-check-input" onChange={(e)=>setData({...data,Gender:e.target.value})} value="F" checked={data.Gender === "F"} type="radio" name="exampleRadios" id="exampleRadios2"  />
          <label class="form-check-label" for="exampleRadios2">
            F
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" onChange={(e)=>setData({...data,Gender:e.target.value})} value="Other"checked={data.Gender === "Other"} name="exampleRadios" id="exampleRadios3"  />
          <label class="form-check-label" for="exampleRadios3">
            Other
          </label>
        </div>
      </div>
      <div className='text-white'style={{marginBottom:"20px"}}>
        <h3>Details</h3>
      </div>

      <div className='text-white rounded' style={{marginBottom:"30px",backgroundColor:"#111111",height:"62px",display:'flex',width:"95%",justifyContent:'space-evenly',alignItems:'center',flexWrap:'wrap'}}>
        Degree
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="exampleRadios" onChange={(e)=>setData({...data,degree:e.target.value})} value="BTech" checked={data.degree === "BTech"} id="exampleRadios1"   />
          <label class="form-check-label" for="exampleRadios1">
            BTech
          </label>
        </div >
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="exampleRadios" onChange={(e)=>setData({...data,degree:e.target.value})} value="BArch" checked={data.degree === "BArch"} id="exampleRadios2"  />
          <label class="form-check-label" for="exampleRadios2">
            BArch
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="exampleRadios" onChange={(e)=>setData({...data,degree:e.target.value})} value="MTech" checked={data.degree === "MTech"} id="exampleRadios3"  />
          <label class="form-check-label" for="exampleRadios3">
            MTech
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="exampleRadios" onChange={(e)=>setData({...data,degree:e.target.value})} value="MCA" checked={data.degree === "MCA"}id="exampleRadios3"  />
          <label class="form-check-label" for="exampleRadios4">
            MCA
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="exampleRadios" onChange={(e)=>setData({...data,degree:e.target.value})} value="phD" checked={data.degree === "phD"} id="exampleRadios3"  />
          <label class="form-check-label" for="exampleRadios5">
            phD
          </label>
        </div>
      </div>

      <div className=" flex-row" style={{ display: "flex",justifyContent:"space-between",marginBottom:'20px',width:"95%"}}>
        <div class="col-5">
          <input type="text" class="form-control" onChange={(e)=>setData({...data,admNo:e.target.value})} value={data.admNo}
           placeholder="Admission No" style={{backgroundColor:"#111111",height:"62px"}}/>
        </div>
        <div class="col-4">
          <input type="Number" class="form-control" onChange={(e)=>setData({...data,yearofStudy:e.target.value})} value={data.yearofStudy}
           placeholder="Year of Study" style={{backgroundColor:"#111111",height:"62px"}} />
        </div>
        <div class="col-2">
          <input type="text" class="form-control" onChange={(e)=>setData({...data,branch:e.target.value})} value={data.branch} 
          placeholder="Branch" style={{backgroundColor:"#111111",height:"62px"}} />
        </div>
      </div>


    </div>
  )
}

export default Student