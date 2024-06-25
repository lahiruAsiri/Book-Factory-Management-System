import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './SearchSalaryU.css'; 
import Home2nav from '../../components/home2nav';


const SearchEmployeeSalaryForUpdate = () => {
  const [employeeNIC, setEmployeeNIC] = useState("");
  const [employeeSalaryData, setEmployeeSalaryData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEmployeeSalaryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/employeeSalarys/${encodeURIComponent(employeeNIC)}`);
      if (response.status === 200) {
        setEmployeeSalaryData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Employee salary details not found");
        setEmployeeSalaryData(null);
      } else {
        setError("Error fetching employee salary details");
        setEmployeeSalaryData(null);
      }
    } catch (error) {
      setError("Error fetching employee salary details");
      setEmployeeSalaryData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchEmployeeSalaryData();
  };

  return (
    <div>
    <Home2nav />
    <div className="search-employee-salary-container">
      <h2>Search For Update</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={employeeNIC}
          onChange={(e) => setEmployeeNIC(e.target.value)}
          placeholder="Enter employee NIC"
        />
        <button type="submit">Search</button>
        <Link to="/EmpSalaryManage" className="back-button">Back To Menu</Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      {employeeSalaryData && (
        <div className="employee-salary-details">
          <p><strong>Name: </strong>{employeeSalaryData.employee_name}</p>
          <p><strong>NIC: </strong>{employeeSalaryData.employee_NIC}</p>
          <p><strong>Overtime: </strong>{employeeSalaryData.employee_OT}</p>
          <p><strong>Salary Amount: </strong>{employeeSalaryData.employee_salaryAmount}</p>
          <p><strong>Salary Status: </strong>{employeeSalaryData.employee_salary_status}</p>

          {!loading && !error && (
            <Link to={`/employeeSalarys/${employeeSalaryData.employee_NIC}/UpdateSalary?employeeNIC=${encodeURIComponent(employeeNIC)}`}>
              <button className="update-button">Update Employee Salary</button>
            </Link>
          )}
        </div>
      )}
    </div>
    </div>

  );
};

export default SearchEmployeeSalaryForUpdate;
