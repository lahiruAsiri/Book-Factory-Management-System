import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import './UpdateMachine.css'; 
import Home2nav from '../../components/home2nav';


const UpdateMachine = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialMachineName = queryParams.get("machineName");

  const [machineDetails, setMachineDetails] = useState({
    machine_name: initialMachineName || "",
    machine_number: "",
    machine_condition: "",
    machine_availableStatus: ""
  });

  useEffect(() => {
    const fetchMachineDetails = async () => {
      try {
        const response = await axios.get(`/api/machines/${initialMachineName}`);
        setMachineDetails(response.data);
      } catch (error) {
        console.error("Error fetching machine details:", error);
      }
    };

    fetchMachineDetails();
  }, [initialMachineName]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMachineDetails({ ...machineDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`/api/machines/${initialMachineName}`, machineDetails);
      navigate("/SearchMachineU"); 
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="update-machine-container">
      <h2>Update Machine Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Machine Name:
          <input type="text" name="machine_name" value={machineDetails.machine_name} onChange={handleChange} />
        </label>
        <label>
          Machine Number:
          <input type="text" name="machine_number" value={machineDetails.machine_number} onChange={handleChange} />
        </label>
        <label>
          Machine Condition:
          <select name="machine_condition" value={machineDetails.machine_condition} onChange={handleChange}>
            <option value="">Select Machine Condition</option>
            <option value="Good">Good</option>
            <option value="Not Good">Not Good</option>
          </select>
        </label>
        <label>
          Machine Available Status:
          <select name="machine_availableStatus" value={machineDetails.machine_availableStatus} onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
    </div>

  );
};

export default UpdateMachine;
