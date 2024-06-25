import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './UpdateEmployee.css'; 
import Home2nav from '../../components/home2nav';


const UpdateEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialEmployeeNIC = queryParams.get("employeeNIC");

  const [employeeDetails, setEmployeeDetails] = useState({
    employee_name: "",
    employee_NIC: initialEmployeeNIC || "",
    employee_position: "",
    employee_addresses: "",
    employee_holidays: "",
    phone_number: ""
  });

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`/api/employees/${initialEmployeeNIC}`);
        setEmployeeDetails(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    };

    fetchEmployeeDetails();
  }, [initialEmployeeNIC]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployeeDetails({ ...employeeDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`/api/employees/${initialEmployeeNIC}`, employeeDetails);
      navigate("/SearchEmployeU"); 
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="update-employee-container">
      <h2>Update Employee Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="employee_name" value={employeeDetails.employee_name} onChange={handleChange} />
        </label>
        <label>
          NIC:
          <input type="text" name="employee_NIC" value={employeeDetails.employee_NIC} onChange={handleChange} disabled />
        </label>
        <label>
          Position:
          <input type="text" name="employee_position" value={employeeDetails.employee_position} onChange={handleChange} />
        </label>
        <label>
          Address:
          <input type="text" name="employee_addresses" value={employeeDetails.employee_adresses} onChange={handleChange} />
        </label>
        <label>
          Holidays:
          <input type="number" name="employee_holidays" value={employeeDetails.employee_holidays} onChange={handleChange} />
        </label>
        <label>
          Phone Number:
          <input type="text" name="phone_number" value={employeeDetails.phone_number} onChange={handleChange} />
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
    </div>
  );
};

export default UpdateEmployee;
