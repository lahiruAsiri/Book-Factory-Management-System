import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './SearchMachineU.css'; 
import Home2nav from '../../components/home2nav';


const SearchMachineForUpdate = () => {
  const [machineName, setMachineName] = useState("");
  const [machineData, setMachineData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMachineData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/machines/${encodeURIComponent(machineName)}`);
      if (response.status === 200) {
        setMachineData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Machine details not found");
        setMachineData(null);
      } else {
        setError("Error fetching machine details");
        setMachineData(null);
      }
    } catch (error) {
      setError("Error fetching machine details");
      setMachineData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchMachineData();
  };

  return (
    <div>
    <Home2nav />
    <div className="search-machine-container">
      <h2>Search For Update</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={machineName}
          onChange={(e) => setMachineName(e.target.value)}
          placeholder="Enter machine name"
        />
        <button type="submit">Search</button>
        <Link to="/MachineManage" className="back-button">Back To Menu</Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      {machineData && (
        <div className="machine-details">
          <p><strong>Machine Number: </strong>{machineData.machine_number}</p>
          <p><strong>Machine Name: </strong>{machineData.machine_name}</p>
          <p><strong>Machine Condition: </strong>{machineData.machine_condition}</p>
          <p><strong>Machine Available Status: </strong>{machineData.machine_availableStatus}</p>

          {!loading && !error && (
            <Link to={`/machines/${machineData.machine_name}/UpdateMachine?machineName=${encodeURIComponent(machineName)}`}>
              <button className="update-button">Update Machine</button>
            </Link>
          )}
        </div>
      )}
    </div>
    </div>

  );
};

export default SearchMachineForUpdate;
