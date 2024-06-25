import React from 'react'
import { Link } from 'react-router-dom';
import './employee.css';
import Home2nav from '../../components/home3nav';


function Employee() {
  return (
    <div>
    <Home2nav />
    <div>
    <div className="employee">
      <div className='left'>
        <Link to="/employeeManage" className="BO-button">EMPLOYEE MANAGE</Link>
      </div>
      <div className='right'>
        <Link to="/EmpSalaryManage" className="BO-button">EMPLOYEE SALARY MANAGE</Link>
      </div>
    </div>
 </div>
 </div>
  )
}

export default Employee
