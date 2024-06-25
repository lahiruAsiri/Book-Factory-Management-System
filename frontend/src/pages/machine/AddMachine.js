import React, { useState } from "react";
import axios from "axios";
import './AddMachine.css'; 

const AddMachine = () => {
  const [machineNumber, setMachineNumber] = useState("");
  const [machineName, setMachineName] = useState("");
  const [machineCondition, setMachineCondition] = useState("");
  const [machineAvailableStatus, setMachineAvailableStatus] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      // Validation
      if (!machineNumber.trim()) {
        throw new Error("Machine number is required");
      }
      if (!machineName.trim()) {
        throw new Error("Machine name is required");
      }
      if (!machineCondition) {
        throw new Error("Machine condition is required");
      }
      if (!machineAvailableStatus) {
        throw new Error("Machine available status is required");
      }

      await axios.post("/api/machines", {
        machine_number: machineNumber,
        machine_name: machineName,
        machine_condition: machineCondition,
        machine_availableStatus: machineAvailableStatus
      });
      setSuccess(true);
      setError(null);
      setMachineNumber("");
      setMachineName("");
      setMachineCondition("");
      setMachineAvailableStatus("");
    } catch (error) {
      setError(error.message || "Error adding machine details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-machine-container">
      <h2>Add New Machine Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Machine Number:</label>
          <input
            type="text"
            value={machineNumber}
            onChange={(e) => setMachineNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Machine Name:</label>
          <input
            type="text"
            value={machineName}
            onChange={(e) => setMachineName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Machine Condition:</label>
          <select
            value={machineCondition}
            onChange={(e) => setMachineCondition(e.target.value)}
            required
          >
            <option value="">Select Machine Condition</option>
            <option value="Good">Good</option>
            <option value="Not Good">Not Good</option>
          </select>
        </div>
        <div className="form-group">
          <label>Machine Available Status:</label>
          <select
            value={machineAvailableStatus}
            onChange={(e) => setMachineAvailableStatus(e.target.value)}
            required
          >
            <option value="">Select Machine Available Status</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Adding..." : "Add Machine Details"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Machine details added successfully!</div>}
    </div>
  );
};

export default AddMachine;
