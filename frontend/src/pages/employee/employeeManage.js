import React from 'react';
import AddEmployee from '../employee/AddEmployee';
import GetEmployee from '../employee/GetEmployee';
import './employeeManage.css'; 
import { Link } from 'react-router-dom';
import Home2nav from '../../components/home2nav';



function EmployeDetails() {
  return (
    <div>
    <Home2nav />
    <div className="Employee-details">
     <div className="section">
        <AddEmployee />
      </div>
      <div className="section">
       <div>
        <h2>Search Employee Details</h2>
        <GetEmployee />
       </div> 
       <div>
        <Link to="/EmployeeReport" className="BD-button">EMPLOYEE REPORT</Link>
       </div> 
       <div>
       <Link to="/DeleteEmployee" className="BD-button">DELETE EMPLOYEE DETAILS</Link>
       </div> 
       <div>
       <Link to="/SearchEmployeU" className="BD-button">UPDATE EMPLOYEE DETAILS</Link>
       </div> 
       </div>
    </div>
    </div>
  );
}

export default EmployeDetails;
