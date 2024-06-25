import React, { useState } from "react";
import axios from "axios";
import "./GetESalary.css";

const GetEmployeeSalary = () => {
  const [employeeNIC, setEmployeeNIC] = useState("");
  const [employeeSalaryDetails, setEmployeeSalaryDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchEmployeeSalaryDetails = async () => {
    try {
      const response = await axios.get(`/api/employeeSalarys/${encodeURIComponent(employeeNIC)}`);
      if (response.status === 200) {
        setEmployeeSalaryDetails(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Employee salary details not found");
        setEmployeeSalaryDetails(null);
      } else {
        setError("Error fetching employee salary data");
        setEmployeeSalaryDetails(null);
      }
    } catch (error) {
      setError("Error fetching employee salary data");
      setEmployeeSalaryDetails(null);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await fetchEmployeeSalaryDetails();
  };

  return (
    <div className="get-employee-salary-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={employeeNIC}
          onChange={(e) => setEmployeeNIC(e.target.value)}
          placeholder="Enter employee NIC"
        />
        <button type="submit">Search</button>
      </form>

      {error && <div className="error">{error}</div>}

      {employeeSalaryDetails && (
        <div className="employee-salary-details">
          <h2>Search Result:</h2>
          <div>
            <p><strong>Employee Name: </strong>{employeeSalaryDetails.employee_name}</p>
            <p><strong>Employee NIC: </strong>{employeeSalaryDetails.employee_NIC}</p>
            <p><strong>OT Hours: </strong>{employeeSalaryDetails.employee_OT}</p>
            <p><strong>Salary Amount: </strong>{employeeSalaryDetails.employee_salaryAmount}</p>
            <p><strong>Salary Status: </strong>{employeeSalaryDetails.employee_salary_status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetEmployeeSalary;
