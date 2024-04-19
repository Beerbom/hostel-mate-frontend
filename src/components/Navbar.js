import React from 'react'
import { Link } from 'react-router-dom';


function Navbar() {
  return (
    
    <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link"  href="#"><Link to="/">home</Link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><Link to="/fetch">submit</Link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><Link to="/attendance">attdebce</Link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><Link to="/userview">Userview</Link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link"><Link to="/messduty">MessDuty</Link></a>
        </li>
        <li class="nav-item">
          <a class="nav-link"><Link to="/view">view</Link></a>
        </li>
      </ul>
    </div>
  </div>
</nav>

    
  )
}

export default Navbar