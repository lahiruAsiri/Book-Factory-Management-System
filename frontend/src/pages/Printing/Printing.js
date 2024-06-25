import React from 'react'
import { Link } from 'react-router-dom';
import './Printing.css';
import Home2nav from '../../components/home3nav';


function BookAndOrder() {
  return (
    <div>
    <Home2nav />
    <div>
    <div className="Printing">
      <div className='left'>
        <Link to="/PrintingManage" className="BO-button">PRINTING MANAGE</Link>
      </div>
      <div className='right'>
        <Link to="/machineManage" className="BO-button">MACHINE MANAGE</Link>
      </div>
    </div>
 </div>
 </div>

  )
}

export default BookAndOrder
