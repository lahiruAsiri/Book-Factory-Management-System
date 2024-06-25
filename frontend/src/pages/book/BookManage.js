import React from 'react'
import { Link } from 'react-router-dom';
import './BookAndOrder.css';
import Home2nav from '../../components/home2nav';


function BookManage() {
  return (
    <div>
      <div>
                  <Home2nav />
       <div className="BookAndOrder">
      <div className='left'>
        <Link to="/BookDetails" className="BO-button">BOOK DETAILS</Link>
      </div>
      <div className='right'>
        <Link to="/BookQuantity" className="BO-button">BOOK QUANTITY</Link>
      </div>
    </div>
    </div>
    </div>

  )
}

export default BookManage
