import React from 'react';
import { Link } from 'react-router-dom';
import AddQuantity from '../bookQuantity/AddQuantity';
import SerachQuantity from '../bookQuantity/SearchQuantity';
import Home2nav from '../../components/home2nav';



function BookQuantityDetails() {
  return (
    <div>
            <Home2nav />
    <div className="book-details">
     <div className="section">
        <AddQuantity />
        <h2>Search Book Quantity</h2>
        <SerachQuantity />
      </div>
      <div className="section">
       <div>
       </div> 
       <div>
        <Link to="/BookQuantityReport" className="BD-button">BOOK QUANTITY REPORT</Link>
       </div> 
       <div>
       <Link to="/DeleteBookQuantity" className="BD-button">DELETE A BOOK DETAILS</Link>
       </div> 
       <div>
       <Link to="/SearchBQUpdate" className="BD-button">UPDATE A BOOK DETAILS</Link>
       </div> 
       </div>
    </div>
    </div>
  );
}

export default BookQuantityDetails;
