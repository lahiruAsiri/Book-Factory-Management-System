import React from 'react';
import AddESalary from '../EmpSalary/AddESalary';
import GetESalary from '../EmpSalary/GetESalary';
import './EmpSalaryManage.css'; 
import { Link } from 'react-router-dom';
import Home2nav from '../../components/home2nav';



function EmpSalary() {
  return (
    <div>
    <Home2nav />
    <div className="EmployeeSalary-details">
     <div className="section">
        <AddESalary />
      </div>
      <div className="section">
       <div>
        <h2>Search Employee Salary Details</h2>
        <GetESalary />
       </div> 
       <div>
        <Link to="/SalaryReport" className="BD-button">EMPLOYEE SALARY REPORT</Link>
       </div> 
       <div>
       <Link to="/DeleteSalary" className="BD-button">DELETE EMPLOYEE SALARY DETAILS</Link>
       </div> 
       <div>
       <Link to="/SearchSalaryU" className="BD-button">UPDATE EMPLOYEE SALARY DETAILS</Link>
       </div> 
       </div>
    </div>
    </div>

  );
}

export default EmpSalary;
