import React from 'react';
import AddMachine from '../machine/AddMachine';
import GetMachine from '../machine/GetMachine';
import './machineManage.css'; 
import { Link } from 'react-router-dom';
import Home2nav from '../../components/home2nav';



function BookDetails() {
  return (
    <div>
    <Home2nav />
    <div className="machine-details">
     <div className="section">
        <AddMachine />
      </div>
      <div className="section">
       <div>
        <h2>Search Machine Details</h2>
        <GetMachine />
       </div> 
       <div>
        <Link to="/MachineReport" className="BD-button">MACHINE REPORT</Link>
       </div> 
       <div>
       <Link to="/DeleteMachine" className="BD-button">DELETE MACHINE DETAILS</Link>
       </div> 
       <div>
       <Link to="/SearchMachineU" className="BD-button">UPDATE MACHINE DETAILS</Link>
       </div> 
       </div>
    </div>
    </div>

  );
}

export default BookDetails;
