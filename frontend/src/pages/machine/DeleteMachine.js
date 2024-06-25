import React, { useState } from "react";
import axios from "axios";
import "./DeleteMachine.css";
import { Link } from "react-router-dom";
import Home2nav from '../../components/home2nav';


const DeleteMachine = () => {
  const [machineName, setMachineName] = useState("");
  const [machineData, setMachineData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMachineData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/machines/${encodeURIComponent(machineName)}`
      );
      if (response.status === 200) {
        setMachineData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Machine not found");
        setMachineData(null);
      } else {
        setError("Machine not found");
        setMachineData(null);
      }
    } catch (error) {
      setError("Machine not found");
      setMachineData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchMachineData();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/machines/${encodeURIComponent(machineName)}`);
      setMachineData(null);
      setError("Machine deleted successfully");
    } catch (error) {
      setError("Error deleting machine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Home2nav />
    <div className="delete-machine-container">
      <h2>Delete a Machine</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={machineName}
          onChange={(e) => setMachineName(e.target.value)}
          placeholder="Enter machine name"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
        <Link to="/MachineManage" className="back-button">
          Back To Menu
        </Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}

      {machineData && (
        <div className="machine-details">
          <p>
            <strong>Machine Number: </strong>
            {machineData.machine_number}
          </p>
          <p>
            <strong>Machine Name: </strong>
            {machineData.machine_name}
          </p>
          <p>
            <strong>Machine Condition: </strong>
            {machineData.machine_condition}
          </p>
          <p>
            <strong>Available Status: </strong>
            {machineData.machine_availableStatus}
          </p>
          <button onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete Machine"}
          </button>
        </div>
      )}
    </div>
    </div>

  );
};

export default DeleteMachine;
