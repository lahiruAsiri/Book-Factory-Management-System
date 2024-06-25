import React from 'react';
import AddorderedMaterial from '../orderedMaterial/AddorderedMaterial';
import GetorderedMaterial from '../orderedMaterial/GetorderedMaterial';
import './orderedMaterialManage.css'; 
import { Link } from 'react-router-dom';
import Home2nav from '../../components/home2nav';



function OrderedMaterialDetails() {
  return (
    <div>
            <Home2nav />
    <div className="OM-details">
     <div className="section">
        <AddorderedMaterial />
      </div>
      <div className="section">
       <div>
        <h2>Search Ordered Material Details</h2>
        <GetorderedMaterial />
       </div> 
       <div>
        <Link to="/orderedMaterialReport" className="BD-button">ORDERED MATERIAL REPORT</Link>
       </div> 
       <div>
       <Link to="/DeleteorderedMaterial" className="BD-button">DELETE ORDERED MATERIAL DETAILS</Link>
       </div> 
       <div>
       <Link to="/SearchOMU" className="BD-button">UPDATE ORDERED MATERIAL DETAILS</Link>
       </div> 
       </div>
    </div>
    </div>

  );
}

export default OrderedMaterialDetails;
