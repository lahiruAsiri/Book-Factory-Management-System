import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Home.css';
import Home2nav from '../components/home2nav';
import Swal from 'sweetalert2';




const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch('/auth/validate-token', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role);
          setIsLoggedIn(true);
        } else {
          setUserRole('');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setIsLoggedIn(false);
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/logout', {
        credentials: 'include',
      });

      if (response.ok) {
        Cookies.remove('token'); // Remove the token from cookies
        setIsLoggedIn(false);
        navigate('/'); // Redirect to the home page
      } else {
        console.error('Error logging out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleLinkClick = (targetRole) => {
    if (userRole === targetRole) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: `You loging in as ${targetRole}. you can not access this `,
        showConfirmButton: false,
        timer: 1500
        
      });
    }
  };

  return (
    <div>
      <Home2nav />
    
    <div className="home">
         {isLoggedIn && userRole === 'book_manage' && (
          <>
            <div className='left'>
               <Link to="/bookandorder" className="big-button">BOOK & ORDER MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('book_manage')}>EMPLOYEE  MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('book_manage')}>MATERIAL MANAGE</Link>
            </div>
            <div className='right'>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('book_manage')}>PRINTING MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('book_manage')}>TRANSPORT MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('book_manage')}>PARTNERS PAYMENT MANAGE</Link>
            </div>
           </>
        )}
            {isLoggedIn && userRole === 'emplyee_manage' && (
          <>
            <div className='left'>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('emplyee_manage')}>BOOK & ORDER MANAGE</Link>
               <Link to="/Employee" className="big-button">EMPLOYEE  MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('emplyee_manage')}>MATERIAL MANAGE</Link>
            </div>
            <div className='right'>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('emplyee_manage')}>PRINTING MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('emplyee_manage')}>TRANSPORT MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('emplyee_manage')}>PARTNERS PAYMENT MANAGE</Link>
            </div>
           </>
        )}
            {isLoggedIn && userRole === 'material_manage' && (
          <>
            <div className='left'>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('material_manage')}>BOOK & ORDER MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('material_manage')}>EMPLOYEE  MANAGE</Link>
               <Link to="/Material" className="big-button">MATERIAL MANAGE</Link>
            </div>
            <div className='right'>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('material_manage')}>PRINTING MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('material_manage')}>TRANSPORT MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('material_manage')}>PARTNERS PAYMENT MANAGE</Link>
            </div>
           </>
        )}
            {isLoggedIn && userRole === 'printing_manage' && (
          <>
            <div className='left'>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('printing_manage')}>BOOK & ORDER MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('printing_manage')}>EMPLOYEE  MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('printing_manage')}>MATERIAL MANAGE</Link>
            </div>
            <div className='right'>
               <Link to="/Printing" className="big-button">PRINTING MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('printing_manage')}>TRANSPORT MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('printing_manage')}>PARTNERS PAYMENT MANAGE</Link>
            </div>
           </>
        )}
            {isLoggedIn && userRole === 'transport_manage' && (
          <>
            <div className='left'>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('transport_manage')}>BOOK & ORDER MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('transport_manage')}>EMPLOYEE  MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('transport_manage')}>MATERIAL MANAGE</Link>
            </div>
            <div className='right'>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('transport_manage')}>PRINTING MANAGE</Link>
               <Link to="/Transport" className="big-button">TRANSPORT MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('transport_manage')}>PARTNERS PAYMENT MANAGE</Link>
            </div>
           </>
        )}
            {isLoggedIn && userRole === 'payment_manage' && (
          <>
            <div className='left'>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('payment_manage')}>BOOK & ORDER MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('payment_manage')}>EMPLOYEE  MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('payment_manage')}>MATERIAL MANAGE</Link>
            </div>
            <div className='right'>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('payment_manage')}>PRINTING MANAGE</Link>
               <Link to="/home2" className="big-button" onClick={() => handleLinkClick('payment_manage')}>TRANSPORT MANAGE</Link>
               <Link to="/Partner" className="big-button">PARTNERS PAYMENT MANAGE</Link>
            </div>
           </>
        )}
    </div>
    </div>
  );
};

export default Home;
