import React, { useState } from "react";
import axios from "axios";
import "./GetPrinting.css";

const GetPrinting = () => {
  const [printingBookName, setPrintingBookName] = useState("");
  const [printingDetails, setPrintingDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchPrintingDetails = async () => {
    try {
      const response = await axios.get(`/api/printingmanages/${encodeURIComponent(printingBookName)}`);
      if (response.status === 200) {
        setPrintingDetails(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Printing details not found");
        setPrintingDetails(null);
      } else {
        setError("Error fetching printing data");
        setPrintingDetails(null);
      }
    } catch (error) {
      setError("Error fetching printing data");
      setPrintingDetails(null);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    await fetchPrintingDetails();
  };

  return (
    <div className="get-printing-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={printingBookName}
          onChange={(e) => setPrintingBookName(e.target.value)}
          placeholder="Enter printing book name"
        />
        <button type="submit">Search</button>
      </form>

      {error && <div className="error">{error}</div>}

      {printingDetails && (
        <div className="printing-details">
          <h2>Search Result:</h2>
          <div>
            <p><strong>Printing Book Name: </strong>{printingDetails.printing_bookName}</p>
            <p><strong>Printing Quantity: </strong>{printingDetails.printing_quantity}</p>
            <p><strong>Need Material: </strong>{printingDetails.need_material}</p>
            <p><strong>Printing Status: </strong>{printingDetails.printing_status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetPrinting;
