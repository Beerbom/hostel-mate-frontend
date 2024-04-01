import React from 'react'
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <div className='bg-white'>Navbar
    <button><Link to="/">home</Link></button>
    <button><Link to="/fetch">submit</Link></button>
    <button><Link to="/attendance">attdebce</Link></button>
    <button><Link to="/userview">UserView</Link></button>
    <button><Link to="/messduty">MessDuty</Link></button>

    </div>
  )
}

export default Navbar