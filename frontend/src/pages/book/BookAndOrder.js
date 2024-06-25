import React from 'react'
import { Link } from 'react-router-dom';
import './BookAndOrder.css';
import Home2nav from '../../components/home3nav';


function BookAndOrder() {
  return (
    <div>
            <Home2nav />
    <div className="BookAndOrder">
      <div className='left'>
        <Link to="/bookManage" className="BO-button">BOOK MANAGE</Link>
      </div>
      <div className='right'>
        <Link to="/OrderManage" className="BO-button">ORDER MANAGE</Link>
      </div>
    </div>
 </div>
  )
}

export default BookAndOrder
