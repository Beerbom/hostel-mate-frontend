import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import arrow from '../pages/istockphoto-944808858-170667a-removebg-preview.png'

function Front() {
  return (
    
    <div className='screen'>
        <div className='hostel-mate'>HOSTEL-MATE</div>
        <div className='registration'><a></a>REGISTRATION</div>
        {/* <div><a class="nav-link"  href="#"><Link to="/">home</Link></a>
</div> */}

        <div className='group-259 ellipse-109'></div>
        <div className='ellipse-109'>
         <Link to="/front"><img src={arrow} alt="" /></Link>
        </div>
        {/* <div className='arrow'></div>  */}
          <div className='group-260 ellipse-209'></div>
        <div className='ellipse-209'>
        <Link to="/login"><img src={arrow} alt="" /></Link>
        </div>
        <div className='login'>LOGIN</div>
        <div className='bg'></div>
      
      
    </div>
  )
}

export default Front

