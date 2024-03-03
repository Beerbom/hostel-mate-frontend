import React from 'react'

function PerAddress({data,setData}) {
  return (
    <div className='mb-6'>
      <div class="form-group " style={{marginBottom:"20px"}}>
        <input type="text" onChange={(e)=>setData({...data,paddressLine1:e.target.value})} value={data.paddressLine1}
         class="form-control text-white " style={{backgroundColor:"#111111",height:"62px",width:"95%"}} id="exampleInputName" placeholder="Address Line 1" />
      </div>
      <div class="form-group d-flex" style={{marginBottom:"20px"}}>
      <input type="number"onChange={(e)=>setData({...data,paddressLine2:e.target.value})} value={data.paddressLine2}
       class="form-control" id="exampleInputContact" style={{marginRight:'20px',backgroundColor:"#111111",height:"62px",width:"75%"}} placeholder="Contact Number" />
      <input type="text"  class="form-control " onChange={(e)=>setData({...data,pPincode:e.target.value})}
       value={data.pPincode} style={{height:'62px',width:'10%',backgroundColor:'#111111', width:"17%"}} placeholder='Pincode'/>
        
      </div>
      <div className=" flex-row" style={{ display: "flex",justifyContent:"space-between",marginBottom:'20px',width:"95%"}}>
        <div class="col-5">
          <input type="text"onChange={(e)=>setData({...data,pDistrict:e.target.value})} value={data.pDistrict}
           class="form-control" placeholder="District" style={{backgroundColor:"#111111",height:"62px"}}/>
        </div>
        <div class="col-4">
          <input type="Number"onChange={(e)=>setData({...data,pState:e.target.value})} value={data.pState}
           class="form-control" placeholder="State" style={{backgroundColor:"#111111",height:"62px"}} />
        </div>
        <div class="col-2">
          <input type="text" onChange={(e)=>setData({...data,pCountry:e.target.value})} value={data.pCountry}
           class="form-control" placeholder="Country" style={{backgroundColor:"#111111",height:"62px"}} />
        </div>
      </div>
      <div className='w-50' style={{marginBottom:'20px'}}>
      <input type="file" class="form-control" onChange={(e)=>setData({...data,adhaar:e.target.value})} value={data.adhaar} placeholder="adhaar" style={{backgroundColor:"#111111",height:"62px"}} />
      </div>
      <div className='text-white'style={{marginBottom:"20px"}}>
        <h3>Details</h3>
      </div>
      <div class="form-group " style={{marginBottom:"20px"}}>
        <input type="text" onChange={(e)=>setData({...data,raddressLine1:e.target.value})} value={data.raddressLine1}
          class="form-control text-white " style={{backgroundColor:"#111111",height:"62px",width:"95%"}} id="exampleInputName" placeholder="Address Line 1" />
      </div>
      <div class="form-group d-flex" style={{marginBottom:"20px"}}>
      <input type="number" onChange={(e)=>setData({...data,raddressLine2:e.target.value})} value={data.raddressLine2}
      class="form-control" id="exampleInputContact" style={{marginRight:'20px',backgroundColor:"#111111",height:"62px",width:"75%"}} placeholder="Address Line 2" />
      <input type="text" onChange={(e)=>setData({...data,rPincode:e.target.value})} value={data.rPincode}
        class="form-control "  style={{height:'62px',width:'10%',backgroundColor:'#111111',width:"17%"}} placeholder='Pincode'/>
        
      </div>
      <div className=" flex-row" style={{ display: "flex",justifyContent:"space-between",marginBottom:'20px',width:"95%"}}>
        <div class="col-5">
          <input type="text" onChange={(e)=>setData({...data,rDistrict:e.target.value})} value={data.rDistrict} class="form-control" placeholder="District" style={{backgroundColor:"#111111",height:"62px"}}/>
        </div>
        <div class="col-4">
          <input type="Number" onChange={(e)=>setData({...data,rState:e.target.value})} value={data.rState} class="form-control" placeholder="State" style={{backgroundColor:"#111111",height:"62px"}} />
        </div>
        <div class="col-2">
          <input type="text" onChange={(e)=>setData({...data,rCountry:e.target.value})} value={data.rCountry} class="form-control" placeholder="Country" style={{backgroundColor:"#111111",height:"62px"}} />
        </div>
      </div>
      
      <div className='text-white'style={{marginBottom:"20px"}}>
        <h3>Details</h3>
      </div>
      <div className=" flex-row" style={{ display: "flex",justifyContent:"space-evenly",marginBottom:'20px',width:"95%"}}>
        <div class="col-5">
          <input type="text" class="form-control" onChange={(e)=>setData({...data,income:e.target.value})} value={data.income} placeholder="Annual Income" style={{backgroundColor:"#111111",height:"62px"}}/>
        </div>
        <div class="col-5">
          <input type="file" class="form-control" onChange={(e)=>setData({...data,IncomeCertificate:e.target.value})} value={data.IncomeCertificate} placeholder="income Certificate" style={{backgroundColor:"#111111",height:"62px"}} />
        </div>
        
      </div>


    </div>
  )
}

export default PerAddress