import React, { useState } from "react";
import axios from "axios";
import './AddESalary.css'; 

const AddEmployeeSalary = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeNIC, setEmployeeNIC] = useState("");
  const [employeeOT, setEmployeeOT] = useState("");
  const [employeeSalaryAmount, setEmployeeSalaryAmount] = useState("");
  const [employeeSalaryStatus, setEmployeeSalaryStatus] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Client-side validation
      if (!employeeName || !employeeNIC || !employeeOT || !employeeSalaryAmount || !employeeSalaryStatus) {
        setError("All fields are required");
        setLoading(false);
        return;
      }
      if (!/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/.test(employeeNIC)) {
        setError("Invalid NIC format");
        setLoading(false);
        return;
      }

      // Server-side validation
      const response = await axios.post("/api/employeeSalarys", {
        employee_name: employeeName,
        employee_NIC: employeeNIC,
        employee_OT: employeeOT,
        employee_salaryAmount: employeeSalaryAmount,
        employee_salary_status: employeeSalaryStatus
      });
      
      if (response.status === 200) {
        setSuccess(true);
        setError(null);
        setEmployeeName("");
        setEmployeeNIC("");
        setEmployeeOT("");
        setEmployeeSalaryAmount("");
        setEmployeeSalaryStatus("");
      }
    } catch (error) {
      setError("Error adding employee salary details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-employee-salary-container">
      <h2>Add New Employee Salary Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Employee Name:</label>
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Employee NIC:</label>
          <input
            type="text"
            value={employeeNIC}
            onChange={(e) => setEmployeeNIC(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Employee OT:</label>
          <input
            type="number"
            value={employeeOT}
            onChange={(e) => setEmployeeOT(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Employee Salary Amount:</label>
          <input
            type="number"
            value={employeeSalaryAmount}
            onChange={(e) => setEmployeeSalaryAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Employee Salary Status:</label>
          <select
            value={employeeSalaryStatus}
            onChange={(e) => setEmployeeSalaryStatus(e.target.value)}
            required
          >
            <option value="">Select Salary Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Adding..." : "Add Employee Salary Details"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Employee salary details added successfully!</div>}
    </div>
  );
};

export default AddEmployeeSalary;
