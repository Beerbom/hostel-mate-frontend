import React,{ useState, useEffect } from 'react'
import axios from 'axios';
function PerAddress({data,setData}) {
  const [sameAsAbove, setSameAsAbove] = useState(false);

  const handleCheckboxChange = () => {
    setSameAsAbove(!sameAsAbove);
    if (!sameAsAbove) {
      setData({
        ...data,
        RAddress1: data.PAddress1,
        RAddress2: data.PAddress2,
        RPincode: data.PPincode,
        RDistrict: data.PDistrict,
        RState: data.PState,
        RCountry: data.PCountry
      });
    } else {
      // Clear residential address fields if checkbox is unchecked
      setData({
        ...data,
        RAddress1: '',
        RAddress2: '',
        RPincode: '',
        RDistrict: '',
        RState: '',
        RCountry: ''
      });
    }
  };
  useEffect(() => {
    const calculateDistance = async () => {
      if (data.PPincode.length === 6) { // Assuming pincode length is 6
        try {
          const response = await axios.post('http://localhost:5000/calculate', { pin: data.PPincode });
          console.log(response.data[0].distance.text);
          setData({ ...data, Distance: response.data[0].distance.text });
        } catch (error) {
          console.error('Error calculating distance:', error);
        }
      }
    };

    calculateDistance();
  }, [data.PPincode]);
  return (
    <div className='mb-6'>
      fill all the field necessary * in this section
      <div class="form-group " style={{marginBottom:"20px"}}>
        <input type="text" onChange={(e)=>setData({...data,PAddress1:e.target.value})} value={data.PAddress1}
         class="form-control text-white " style={{backgroundColor:"#111111",height:"62px",width:"95%"}} id="exampleInputName" placeholder="Address Line 1 *" />
      </div>
      <div class="form-group d-flex" style={{marginBottom:"20px"}}>
      <input type="text"onChange={(e)=>setData({...data,PAddress2:e.target.value})} value={data.PAddress2}
       class="form-control" id="exampleInputContact" style={{marginRight:'20px',backgroundColor:"#111111",height:"62px",width:"60%"}} placeholder="Address Line 2 *" />
      <input type="text"  class="form-control " onChange={(e)=>setData({...data,PPincode:e.target.value})}
       value={data.PPincode} style={{height:'62px',width:'10%',backgroundColor:'#111111', width:"17%"}} placeholder='Pincode *'/>
           <input
          type="text"
          readOnly
          value={data.Distance}
          className="form-control"
          style={{ height: '62px', backgroundColor: '#111111', width: "15%" }}
          placeholder='KM'
        />
        </div>
      <div className=" flex-row" style={{ display: "flex",justifyContent:"space-between",marginBottom:'20px',width:"95%"}}>
        <div class="col-5">
          <input type="text"onChange={(e)=>setData({...data,PDistrict:e.target.value})} value={data.PDistrict}
           class="form-control" placeholder="District *" style={{backgroundColor:"#111111",height:"62px"}}/>
        </div>
        <div class="col-4">
          <input type="text"onChange={(e)=>setData({...data,PState:e.target.value})} value={data.PState}
           class="form-control" placeholder="State *" style={{backgroundColor:"#111111",height:"62px"}} />
        </div>
        <div class="col-2">
          <input type="text" onChange={(e)=>setData({...data,PCountry:e.target.value})} value={data.PCountry}
           class="form-control" placeholder="Country *" style={{backgroundColor:"#111111",height:"62px"}} />
        </div>
      </div>
      
      <div className="text-white" style={{ marginBottom: "20px" }}>
        <h3>
          Residential Address{" "}
          <small style={{ fontSize: "15px" }}>
            same as above{" "}
            <input
              type="checkbox"
              onChange={handleCheckboxChange}
              checked={sameAsAbove}
            />
          </small>
        </h3>
      </div>
      <div class="form-group " style={{marginBottom:"20px"}}>
        <input type="text" onChange={(e)=>setData({...data,RAddress1:e.target.value})} value={data.RAddress1}
          class="form-control text-white " style={{backgroundColor:"#111111",height:"62px",width:"95%"}} id="exampleInputName" placeholder="Address Line 1" />
      </div>
      <div class="form-group d-flex" style={{marginBottom:"20px"}}>
      <input type="text" onChange={(e)=>setData({...data,RAddress2:e.target.value})} value={data.RAddress2}
      class="form-control" id="exampleInputContact" style={{marginRight:'20px',backgroundColor:"#111111",height:"62px",width:"75%"}} placeholder="Address Line 2" />
      <input type="text" onChange={(e)=>setData({...data,RPincode:e.target.value})} value={data.RPincode}
        class="form-control "  style={{height:'62px',width:'10%',backgroundColor:'#111111',width:"17%"}} placeholder='Pincode'/>
        
      </div>
      <div className=" flex-row" style={{ display: "flex",justifyContent:"space-between",marginBottom:'20px',width:"95%"}}>
        <div class="col-5">
          <input type="text" onChange={(e)=>setData({...data,RDistrict:e.target.value})} value={data.RDistrict} class="form-control" placeholder="District" style={{backgroundColor:"#111111",height:"62px"}}/>
        </div>
        <div class="col-4">
          <input type="text" onChange={(e)=>setData({...data,RState:e.target.value})} value={data.RState} class="form-control" placeholder="State" style={{backgroundColor:"#111111",height:"62px"}} />
        </div>
        <div class="col-2">
          <input type="text" onChange={(e)=>setData({...data,RCountry:e.target.value})} value={data.RCountry} class="form-control" placeholder="Country" style={{backgroundColor:"#111111",height:"62px"}} />
        </div>
      </div>
      
      
     


    </div>
  )
}

export default PerAddress