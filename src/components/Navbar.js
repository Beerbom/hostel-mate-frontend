import React from 'react'
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <div className='bg-white'>Navbar
    <button><Link to="/">home</Link></button>
    <button><Link to="/fetch">submit</Link></button>
    <button><Link to="/attendance">attdebce</Link></button>
    </div>
  )
}

export default Navbar