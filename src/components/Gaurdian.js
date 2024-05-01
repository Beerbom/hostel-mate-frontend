import React, { useState } from 'react'

function Gaurdian({data,setData}) {
  const [sameAddress, setSameAddress] = useState(false);

  const handleCheckboxChange = () => {
    setSameAddress(!sameAddress);
    if (!sameAddress) {
      setData({
        ...data,
        GAddress1: data.PAddress1,
        GAddress2: data.PAddress2,
        GPincode: data.PPincode,
        GDistrict: data.PDistrict,
        GState: data.PState,
        GCountry: data.PCountry
      });
    } else {
      // Clear guardian address fields if checkbox is unchecked
      setData({
        ...data,
        GAddress1: '',
        GAddress2: '',
        GPincode: '',
        GDistrict: '',
        GState: '',
        GCountry: ''
      });
    }
  };
  const handleRelationChange = (e) => {
    setData({ ...data, Relation: e.target.value });
  };
  return (
    <div className='mb-6'>
       <div class="form-group " style={{marginBottom:"20px"}}>
        <input type="text" onChange={(e)=>setData({...data,GName:e.target.value})} value={data.GName}
         class="form-control text-white " style={{backgroundColor:"#111111",height:"62px",width:"95%"}} id="exampleInputName" placeholder="Gaurdian Name" />
      </div>
      <div class="form-group d-flex" style={{marginBottom:"20px"}}>
      <input type="text" readonly class="form-control " value="+91" style={{height:'62px',width:'10%',backgroundColor:'#3E3E3E',color:'#A59191'}}/>
        <input type="text" onChange={(e)=>setData({...data,GPhoneNo:e.target.value})} value={data.GPhoneNo}
         class="form-control" id="exampleInputContact" style={{marginLeft:'20px',backgroundColor:"#111111",height:"62px",width:"82%"}} placeholder="Contact Number" />
      </div>
      <div className="form-group" style={{ marginBottom: "20px" }}>
        <select
          className="form-control text-white"
          value={data.Relation}
          onChange={handleRelationChange}
          style={{ backgroundColor: "#111111", height: "62px", width: "95%" }}
        >
          <option value="">Select Relationship</option>
          <option value="Father">Father</option>
          <option value="Mother">Mother</option>
          <option value="Guardian">Guardian</option>
        </select>
      </div>
      <div className="text-white" style={{ marginBottom: "20px" }}>
        <h3>Address <small style={{ fontSize: "15px" }}>Same as Student's Address <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={sameAddress}
          /> </small></h3>
        <div>
         
          <label htmlFor="sameAddress"></label>
        </div>
      </div>
      <div class="form-group " style={{marginBottom:"20px"}}>
        <input type="text" onChange={(e)=>setData({...data,GAddress1:e.target.value})} value={data.GAddress1}
         class="form-control text-white " style={{backgroundColor:"#111111",height:"62px",width:"95%"}} id="exampleInputName" placeholder="Address Line 1" />
      </div>
      <div class="form-group d-flex" style={{marginBottom:"20px"}}>
      <input type="text" onChange={(e)=>setData({...data,GAddress2:e.target.value})} value={data.GAddress2}
       class="form-control" id="exampleInputContact" style={{marginRight:'20px',backgroundColor:"#111111",height:"62px",width:"75%"}} placeholder="Address Line 2" />
      <input type="text" onChange={(e)=>setData({...data,GPincode:e.target.value})} value={data.GPincode}
        class="form-control "  style={{height:'62px',width:'10%',backgroundColor:'#111111',width:'17%'}} placeholder='Pincode'/>
        
      </div>
      <div className=" flex-row" style={{ display: "flex",justifyContent:"space-between",marginBottom:'20px',width:"95%"}}>
        <div class="col-5">
          <input type="text" onChange={(e)=>setData({...data,GDistrict:e.target.value})} value={data.GDistrict}
           class="form-control" placeholder="District" style={{backgroundColor:"#111111",height:"62px"}}/>
        </div>
        <div class="col-4">
          <input type="text" onChange={(e)=>setData({...data,GState:e.target.value})} value={data.GState}
           class="form-control" placeholder="State" style={{backgroundColor:"#111111",height:"62px"}} />
        </div>
        <div class="col-2">
          <input type="text" onChange={(e)=>setData({...data,GCountry:e.target.value})} value={data.GCountry}
           class="form-control" placeholder="Country" style={{backgroundColor:"#111111",height:"62px"}} />
        </div>
      </div>

    </div>
  )
}

export default Gaurdian