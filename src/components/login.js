import React from 'react'

function login() {
  return (
   
      <div className='d-flex justify-content-center '>
        <div className='py-8 px-4 shadow rounded-lg px-10 w-100  mt-10 rounded' style={{ backgroundColor: "#2E2E2E", maxWidth: "500px", marginTop: "50px",height:"300px" }}>
          <h2 className='mt-3 text-white mb-3'></h2>
         
          <div className="d-flex flex-row gap-3 pt-8  justify-content-center" >
          <div className='mb-6 h-100'>
       <div className="form-group" style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="Name"
       
        
        className="form-control text-white"
        style={{ backgroundColor: "#111111", height: "70px", width: "100%" }}
        id="exampleInputName"
        placeholder="Username"
      />
    </div>
      <div class="form-group d-flex" style={{marginBottom:"20px"}}>
     
        <input type="password"
         class="form-control" id="exampleInputContact" style={{marginLeft:'0px',backgroundColor:"#111111",height:"62px",width:"95%"}} placeholder="Password" />
      </div>
    
      
      </div>


    </div>
          </div>
        
        </div>
      
   
  )
}

export default login