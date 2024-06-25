import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './UpdateSalary.css'; 
import Home2nav from '../../components/home2nav';


const UpdateEmployeeSalary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialEmployeeNIC = queryParams.get("employeeNIC");

  const [employeeSalaryDetails, setEmployeeSalaryDetails] = useState({
    employee_name: "",
    employee_NIC: initialEmployeeNIC || "",
    employee_OT: "",
    employee_salaryAmount: "",
    employee_salary_status: ""
  });

  useEffect(() => {
    const fetchEmployeeSalaryDetails = async () => {
      try {
        const response = await axios.get(`/api/employeeSalarys/${initialEmployeeNIC}`);
        setEmployeeSalaryDetails(response.data);
      } catch (error) {
        console.error("Error fetching employee salary details:", error);
      }
    };

    fetchEmployeeSalaryDetails();
  }, [initialEmployeeNIC]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployeeSalaryDetails({ ...employeeSalaryDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`/api/employeeSalarys/${initialEmployeeNIC}`, employeeSalaryDetails);
      navigate("/SearchSalaryU"); 
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="update-employee-salary-container">
      <h2>Update Employee Salary Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Employee Name:
          <input type="text" name="employee_name" value={employeeSalaryDetails.employee_name} onChange={handleChange} />
        </label>
        <label>
          Employee NIC:
          <input type="text" name="employee_NIC" value={employeeSalaryDetails.employee_NIC} onChange={handleChange} disabled />
        </label>
        <label>
          Employee Overtime (OT):
          <input type="number" name="employee_OT" value={employeeSalaryDetails.employee_OT} onChange={handleChange} />
        </label>
        <label>
          Employee Salary Amount:
          <input type="number" name="employee_salaryAmount" value={employeeSalaryDetails.employee_salaryAmount} onChange={handleChange} />
        </label>
        <label>
          Salary Status:
          <select name="employee_salary_status" value={employeeSalaryDetails.employee_salary_status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
    </div>

  );
};

export default UpdateEmployeeSalary;
