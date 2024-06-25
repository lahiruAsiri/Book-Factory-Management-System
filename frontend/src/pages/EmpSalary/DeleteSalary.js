import React, { useState } from "react";
import axios from "axios";
import "./DeleteSalary.css";
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';


const DeleteEmployeeSalary = () => {
  const [employeeNIC, setEmployeeNIC] = useState("");
  const [employeeSalaryData, setEmployeeSalaryData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEmployeeSalaryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/employeeSalarys/${encodeURIComponent(employeeNIC)}`
      );
      if (response.status === 200) {
        setEmployeeSalaryData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Employee salary details not found");
        setEmployeeSalaryData(null);
      } else {
        setError("Employee salary details not found");
        setEmployeeSalaryData(null);
      }
    } catch (error) {
      setError("Employee salary details not found");
      setEmployeeSalaryData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchEmployeeSalaryData();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/employeeSalarys/${encodeURIComponent(employeeNIC)}`);
      setEmployeeSalaryData(null);
      setError("Employee salary details deleted successfully");
    } catch (error) {
      setError("Error deleting employee salary details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="delete-employee-salary-container">
      <h2>Delete an Employee Salary</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={employeeNIC}
          onChange={(e) => setEmployeeNIC(e.target.value)}
          placeholder="Enter employee NIC"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
        <Link to="/EmpSalaryManage" className="back-button">
          Back To Menu
        </Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}

      {employeeSalaryData && (
        <div className="employee-salary-details">
          <p>
            <strong>Employee Name: </strong>
            {employeeSalaryData.employee_name}
          </p>
          <p>
            <strong>Employee NIC: </strong>
            {employeeSalaryData.employee_NIC}
          </p>
          <p>
            <strong>Employee OT: </strong>
            {employeeSalaryData.employee_OT}
          </p>
          <p>
            <strong>Salary Amount: </strong>
            {employeeSalaryData.employee_salaryAmount}
          </p>
          <p>
            <strong>Salary Status: </strong>
            {employeeSalaryData.employee_salary_status}
          </p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Employee Salary"}
          </button>
        </div>
      )}
    </div>
    </div>

  );
};

export default DeleteEmployeeSalary;
