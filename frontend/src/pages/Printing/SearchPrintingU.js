import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './SearchPrintingu.css'; 
import Home2nav from '../../components/home2nav';


const SearchPrintingForUpdate = () => {
  const [printingBookName, setPrintingBookName] = useState("");
  const [printingData, setPrintingData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPrintingData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/printingmanages/${encodeURIComponent(printingBookName)}`);
      if (response.status === 200) {
        setPrintingData(response.data);
        setError(null);
      } else if (response.status === 404) {
        setError("Printing details not found");
        setPrintingData(null);
      } else {
        setError("Error fetching printing details");
        setPrintingData(null);
      }
    } catch (error) {
      setError("Error fetching printing details");
      setPrintingData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchPrintingData();
  };

  return (
    <div>
    <Home2nav />
    <div className="search-printing-container">
      <h2>Search For Update</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={printingBookName}
          onChange={(e) => setPrintingBookName(e.target.value)}
          placeholder="Enter printing book name"
        />
        <button type="submit">Search</button>
        <Link to="/PrintingManage" className="back-button">Back To Menu</Link>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      
      {printingData && (
        <div className="printing-details">
          <p><strong>Book Name: </strong>{printingData.printing_bookName}</p>
          <p><strong>Printing Quantity: </strong>{printingData.printing_quantity}</p>
          <p><strong>Need Material: </strong>{printingData.need_material}</p>
          <p><strong>Printing Status: </strong>{printingData.printing_status}</p>

          {!loading && !error && (
            <Link to={`/printingmanages/${printingData.printing_bookName}/UpdatePrinting?printingBookName=${encodeURIComponent(printingBookName)}`}>
              <button className="update-button">Update Printing</button>
            </Link>
          )}
        </div>
      )}
    </div>
    </div>

  );
};

export default SearchPrintingForUpdate;
