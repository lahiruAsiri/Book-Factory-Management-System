import React, { useState } from "react";
import axios from "axios";
import './AddEmployee.css'; 

const AddEmployee = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeNIC, setEmployeeNIC] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [employeeHolidays, setEmployeeHolidays] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Validation
      if (!employeeName.trim()) {
        throw new Error("Employee name is required");
      }
      if (!employeeNIC.trim()) {
        throw new Error("NIC is required");
      }
      if (!employeePosition.trim()) {
        throw new Error("Position is required");
      }
      if (!employeeAddress.trim()) {
        throw new Error("Address is required");
      }
      if (isNaN(employeeHolidays) || parseInt(employeeHolidays) < 0) {
        throw new Error("Holidays must be a positive number");
      }
      if (phoneNumber.length !==10) {
        throw new Error("Phone number must be 10 numbers");
      }

      await axios.post("/api/employees", {
        employee_name: employeeName,
        employee_NIC: employeeNIC,
        employee_position: employeePosition,
        employee_adresses: employeeAddress,
        employee_holidays: employeeHolidays,
        phone_number: phoneNumber
      });
      setSuccess(true);
      setError(null);
      setEmployeeName("");
      setEmployeeNIC("");
      setEmployeePosition("");
      setEmployeeAddress("");
      setEmployeeHolidays("");
      setPhoneNumber("");
    } catch (error) {
      setError(error.message || "Error adding employee details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-employee-container">
      <h2>Add New Employee Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>NIC:</label>
          <input
            type="text"
            value={employeeNIC}
            onChange={(e) => setEmployeeNIC(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Position:</label>
          <input
            type="text"
            value={employeePosition}
            onChange={(e) => setEmployeePosition(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={employeeAddress}
            onChange={(e) => setEmployeeAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Holidays:</label>
          <input
            type="number"
            value={employeeHolidays}
            onChange={(e) => setEmployeeHolidays(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Adding..." : "Add Employee Details"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Employee details added successfully!</div>}
    </div>
  );
};

export default AddEmployee;
