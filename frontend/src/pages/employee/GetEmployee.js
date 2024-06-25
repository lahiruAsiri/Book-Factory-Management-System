import React, { useState } from "react";
import axios from "axios";
import "./GetEmployee.css";

const GetEmployee = () => {
  const [employeeNIC, setEmployeeNIC] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get(`/api/employees/${encodeURIComponent(employeeNIC)}`);
      if (response.status === 200) {
        setEmployeeDetails(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Employee details not found");
        setEmployeeDetails(null);
      } else {
        setError("Error fetching employee data");
        setEmployeeDetails(null);
      }
    } catch (error) {
      setError("Error fetching employee data");
      setEmployeeDetails(null);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await fetchEmployeeDetails();
  };

  return (
    <div className="get-employee-container">
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

      {employeeDetails && (
        <div className="employee-details">
          <h2>Search Result:</h2>
          <div>
            <p><strong>Employee Name: </strong>{employeeDetails.employee_name}</p>
            <p><strong>Employee NIC: </strong>{employeeDetails.employee_NIC}</p>
            <p><strong>Employee Position: </strong>{employeeDetails.employee_position}</p>
            <p><strong>Employee Address: </strong>{employeeDetails.employee_adresses}</p>
            <p><strong>Employee Holidays: </strong>{employeeDetails.employee_holidays}</p>
            <p><strong>Phone Number: </strong>{employeeDetails.phone_number}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetEmployee;
