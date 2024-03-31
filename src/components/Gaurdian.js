import React from 'react'

function Gaurdian({data,setData}) {
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
      <div class="form-group " style={{marginBottom:"20px"}}>
        <input type="text" onChange={(e)=>setData({...data,Relation:e.target.value})} value={data.Relation}
          class="form-control text-white " style={{backgroundColor:"#111111",height:"62px",width:"95%"}} id="exampleInputName" placeholder="Relationship" />
      </div>
      <div className='text-white'style={{marginBottom:"20px"}}>
        <h3>Details</h3>
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