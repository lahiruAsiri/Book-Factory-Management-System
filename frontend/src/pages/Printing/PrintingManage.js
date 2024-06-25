import React from 'react';
import AddPrinting from '../Printing/AddPrinting';
import GetPrinting from '../Printing/GetPrinting';
import './PrintingManage.css'; 
import { Link } from 'react-router-dom';
import Home2nav from '../../components/home2nav';



function BookDetails() {
  return (
    <div>
    <Home2nav />
    <div className="Printing-details">
     <div className="section">
        <AddPrinting />
      </div>
      <div className="section">
       <div>
        <h2>Search Printing Details</h2>
        <GetPrinting />
       </div> 
       <div>
        <Link to="/PrintingReport" className="BD-button">PRINTING REPORT</Link>
       </div> 
       <div>
       <Link to="/DeletePrinting" className="BD-button">DELETE PRINTING DETAILS</Link>
       </div> 
       <div>
       <Link to="/SerachPrintingU" className="BD-button">UPDATE PRINTING DETAILS</Link>
       </div> 
       </div>
    </div>
    </div>

  );
}

export default BookDetails;
