import React from 'react';
import AddOrder from '../order/AddOrder';
import SerachOrder from '../order/SerachOrder';
import './OrderManage.css'; 
import { Link } from 'react-router-dom';
import Home2nav from '../../components/home2nav';



function BookDetails() {
  return (
    <div>
    <Home2nav />
    <div className="book-details">
     <div className="section">
        <AddOrder />
      </div>
      <div className="section">
       <div>
        <h2>Search Order</h2>
        <SerachOrder />
       </div> 
       <div>
        <Link to="/OrderReport" className="BD-button">ORDER REPORT</Link>
       </div> 
       <div>
       <Link to="/DeleteOrder" className="BD-button">DELETE ORDER DETAILS</Link>
       </div> 
       <div>
       <Link to="/SerachOrderUpdate" className="BD-button">UPDATE ORDER DETAILS</Link>
       </div> 
       </div>
    </div>
    </div>

  );
}

export default BookDetails;
