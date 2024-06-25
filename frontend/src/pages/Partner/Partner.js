import React from 'react'
import { Link } from 'react-router-dom';
import './Partner.css';
import Home2nav from '../../components/home3nav';


function Partner() {
  return (
    <div>
    <Home2nav />
    <div>
    <div className="partner">
      <div className='left'>
        <Link to="/PartnerManage" className="BO-button">PARTNERS MANAGE</Link>
      </div>
      <div className='right'>
        <Link to="/BulkOrderManage" className="BO-button">BULK ORDER MANAGE</Link>
      </div>
    </div>
 </div>
 </div>
  )
}

export default Partner
