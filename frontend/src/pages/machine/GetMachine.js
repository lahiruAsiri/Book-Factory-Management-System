import React, { useState } from "react";
import axios from "axios";
import "./GetMachine.css";

const GetMachine = () => {
  const [machineName, setMachineName] = useState("");
  const [machineDetails, setMachineDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchMachineDetails = async () => {
    try {
      const response = await axios.get(`/api/machines/${encodeURIComponent(machineName)}`);
      if (response.status === 200) {
        setMachineDetails(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Machine details not found");
        setMachineDetails(null);
      } else {
        setError("Error fetching machine data");
        setMachineDetails(null);
      }
    } catch (error) {
      setError("Error fetching machine data");
      setMachineDetails(null);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await fetchMachineDetails();
  };

  return (
    <div className="get-machine-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={machineName}
          onChange={(e) => setMachineName(e.target.value)}
          placeholder="Enter machine name"
        />
        <button type="submit">Search</button>
      </form>

      {error && <div className="error">{error}</div>}

      {machineDetails && (
        <div className="machine-details">
          <h2>Search Result:</h2>
          <div>
            <p><strong>Machine Number: </strong>{machineDetails.machine_number}</p>
            <p><strong>Machine Name: </strong>{machineDetails.machine_name}</p>
            <p><strong>Machine Condition: </strong>{machineDetails.machine_condition}</p>
            <p><strong>Machine Available Status: </strong>{machineDetails.machine_availableStatus}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetMachine;
