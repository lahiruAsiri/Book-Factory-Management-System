import React from 'react'
import { Link } from 'react-router-dom';
import './transport.css';
import Home2nav from '../../components/home3nav';


function Transport() {
  return (
    <div>
    <Home2nav />
    <div>
    <div className="transport">
      <div className='left'>
        <Link to="/TransportManage" className="BO-button">TRANSPORT MANAGE</Link>
      </div>
      <div className='right'>
        <Link to="/DeliveryManage" className="BO-button">DELIVERY MANAGE</Link>
      </div>
    </div>
 </div>
 </div>

  )
}

export default Transport
