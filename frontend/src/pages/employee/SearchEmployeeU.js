import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './SearchEmployeeU.css'; 
import Home2nav from '../../components/home2nav';


const SearchEmployeeForUpdate = () => {
  const [employeeNIC, setEmployeeNIC] = useState("");
  const [employeeData, setEmployeeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEmployeeData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/employees/${encodeURIComponent(employeeNIC)}`);
      if (response.status === 200) {
        setEmployeeData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Employee details not found");
        setEmployeeData(null);
      } else {
        setError("Error fetching employee details");
        setEmployeeData(null);
      }
    } catch (error) {
      setError("Error fetching employee details");
      setEmployeeData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchEmployeeData();
  };

  return (
    <div>
    <Home2nav />
    <div className="search-employee-container">
      <h2>Search For Update</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={employeeNIC}
          onChange={(e) => setEmployeeNIC(e.target.value)}
          placeholder="Enter employee NIC"
        />
        <button type="submit">Search</button>
        <Link to="/EmployeeManage" className="back-button">Back To Menu</Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      {employeeData && (
        <div className="employee-details">
          <p><strong>Name: </strong>{employeeData.employee_name}</p>
          <p><strong>NIC: </strong>{employeeData.employee_NIC}</p>
          <p><strong>Position: </strong>{employeeData.employee_position}</p>
          <p><strong>Address: </strong>{employeeData.employee_adresses}</p>
          <p><strong>Holidays: </strong>{employeeData.employee_holidays}</p>

          {!loading && !error && (
            <Link to={`/employees/${employeeData.employee_NIC}/UpdateEmployee?employeeNIC=${encodeURIComponent(employeeNIC)}`}>
              <button className="update-button">Update Employee</button>
            </Link>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default SearchEmployeeForUpdate;
