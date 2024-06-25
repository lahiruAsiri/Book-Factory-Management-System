import React from 'react'
import { Link } from 'react-router-dom';
import './material.css';
import Home2nav from '../../components/home3nav';


function Material() {
  return (
    <div>
            <Home2nav />
    <div>
    <div className="material">
      <div>
      <Link to="/MaterialManage" className="md-button">MATERIAL MANAGE</Link>
  
  <Link to="/OrderedMaterialManage" className="md-button">ORDERED MATERIAL MANAGE</Link>

  <Link to="/SMmanage" className="md-button">SUPPLIED MATERIAL MANAGE</Link>
      </div>
      
    
    </div>
 </div>
 </div>

  )
}

export default Material
