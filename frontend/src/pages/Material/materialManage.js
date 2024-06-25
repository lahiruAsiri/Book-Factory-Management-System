import React from 'react';
import AddMaterial from '../Material/AddMaterial';
import GetMaterial from '../Material/GetMaterial';
import './materialManage.css'; 
import { Link } from 'react-router-dom';
import Home2nav from '../../components/home2nav';



function MaterialDetails() {
  return (
    <div>
            <Home2nav />
    <div className="material-details">
     <div className="section">
        <AddMaterial />
      </div>
      <div className="section">
       <div>
        <h2>Search Material Details</h2>
        <GetMaterial />
       </div> 
       <div>
        <Link to="/MaterialReport" className="BD-button">MATERIAL REPORT</Link>
       </div> 
       <div>
       <Link to="/DeleteMaterial" className="BD-button">DELETE MATERIAL DETAILS</Link>
       </div> 
       <div>
       <Link to="/SearchMaterialU" className="BD-button">UPDATE MATERIAL DETAILS</Link>
       </div> 
       </div>
    </div>
    </div>

  );
}

export default MaterialDetails;
