import React from 'react'
import { Link } from 'react-router-dom';
import './home1nav.css'; 



function home1nav() {
  return (
    <div>
        <nav>
          <h1>MASTER GUIDE PUBLICATIONS</h1>
          <ul>
            <li><Link to="/" className="nav-button">Home</Link></li>
            <li><Link to="/Signin" className="nav-Sbutton">Sign in</Link></li>
            <li><Link to="/SignUp" className="nav-Sbutton">Sign up</Link></li>
          </ul>
        </nav>
      
    </div>
  )
}

export default home1nav
