import React, { useState } from "react";
import axios from "axios";
import "./DeleteEmployee.css";
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';


const DeleteEmployee = () => {
  const [employeeNIC, setEmployeeNIC] = useState("");
  const [employeeData, setEmployeeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEmployeeData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/employees/${encodeURIComponent(employeeNIC)}`
      );
      if (response.status === 200) {
        setEmployeeData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Employee not found");
        setEmployeeData(null);
      } else {
        setError("Employee not found");
        setEmployeeData(null);
      }
    } catch (error) {
      setError("Employee not found");
      setEmployeeData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchEmployeeData();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/employees/${encodeURIComponent(employeeNIC)}`);
      setEmployeeData(null);
      setError("Employee deleted successfully");
    } catch (error) {
      setError("Error deleting employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="delete-employee-container">
      <h2>Delete an Employee</h2>
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
        <Link to="/EmployeeManage" className="back-button">
          Back To Menu
        </Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}

      {employeeData && (
        <div className="employee-details">
          <p>
            <strong>Name: </strong>
            {employeeData.employee_name}
          </p>
          <p>
            <strong>NIC: </strong>
            {employeeData.employee_NIC}
          </p>
          <p>
            <strong>Position: </strong>
            {employeeData.employee_position}
          </p>
          <p>
            <strong>Address: </strong>
            {employeeData.employee_adresses}
          </p>
          <p>
            <strong>Holidays: </strong>
            {employeeData.employee_holidays}
          </p>
          <p>
            <strong>Phone Number: </strong>
            {employeeData.phone_number}
          </p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Employee"}
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default DeleteEmployee;
