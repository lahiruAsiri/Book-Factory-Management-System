import React from 'react';
import NavHome from '../components/home1nav';
import img from '../img/im1.png'; // Check the path to your image
import './home1.css';

function Home1() {
  return (
    <div>
      <NavHome />
      <div className="container">
        <div className="imageBox">
          <img src={img} alt="A decorative image" className="centeredImage" />
        </div>
      </div>
      <div className='text'>
          <p>
          Master Guid Book Publication is a comprehensive management system designed to streamline and optimize every aspect of book production and distribution. From managing book orders to coordinating employees, printing, transportation, material sourcing, and payments, our system offers a centralized platform to efficiently oversee the entire book manufacturing process.

With Master Guid Book Publication, publishers can effortlessly handle book orders, track inventory, and schedule printing jobs with precision. The system provides robust tools for managing employees, assigning tasks, and tracking productivity, ensuring optimal resource utilization and timely completion of projects.
          </p>
        </div>
    </div>
  )
}

export default Home1;
