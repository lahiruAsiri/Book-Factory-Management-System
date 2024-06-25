import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './home3nav.css'; 
import Swal from 'sweetalert2';


function Home2nav() {
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
              position: "top-end",
              title: `You loging in as ${targetRole}. you can not access this `,
              showConfirmButton: false,
              timer: 1500
            });
            // Or display a message in a more visually appealing way, like a modal or a notification
        }
    };

  return (
    <div>
        <nav>
        <h1>MASTER GUIDE PUBLICATIONS</h1>
          <ul>
          {!isLoggedIn && (
          <>
            <li><Link to="/" className="nav-button">Home</Link></li>
            <li><Link to="/Signin" className="nav-Sbutton">Sign in</Link></li>
            <li><Link to="/SignUp" className="nav-Sbutton">Sign up</Link></li>
          </>
        )}
         {isLoggedIn && userRole === 'book_manage' && (
          <>
            <li><Link to="/home2" className="nav-button">Home</Link></li>
            <li><Link to="/bookandorder" className="nav-button">Book & Order</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('book_manage')}>Printing</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('book_manage')}>Employee</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('book_manage')}>Transport</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('book_manage')}>Material</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('book_manage')}>Partners Payment</Link></li>
           </>
        )}
          {isLoggedIn && userRole === 'printing_manage' && (
          <>
            <li><Link to="/home2" className="nav-button">Home</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('printing_manage')}>Book & Order</Link></li>
            <li><Link to="/Printing" className="nav-button">Printing</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('printing_manage')}>Employee</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('printing_manage')}>Transport</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('printing_manage')}>Material</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('printing_manage')}>Partners Payment</Link></li>
           </>
        )}
          {isLoggedIn && userRole === 'emplyee_manage' && (
          <>
            <li><Link to="/home2" className="nav-button">Home</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('emplyee_manage')}>Book & Order</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('emplyee_manage')}>Printing</Link></li>
            <li><Link to="/Employee" className="nav-button">Employee</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('emplyee_manage')}>Transport</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('emplyee_manage')}>Material</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('emplyee_manage')}>Partners Payment</Link></li>
           </>
        )}
          {isLoggedIn && userRole === 'transport_manage' && (
          <>
            <li><Link to="/home2" className="nav-button">Home</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('transport_manage')}>Book & Order</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('transport_manage')}>Printing</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('transport_manage')}>Employee</Link></li>
            <li><Link to="/Transport" className="nav-button">Transport</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('transport_manage')}>Material</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('transport_manage')}>Partners Payment</Link></li>
           </>
        )}
          {isLoggedIn && userRole === 'material_manage' && (
          <>
            <li><Link to="/home2" className="nav-button">Home</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('material_manage')}>Book & Order</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('material_manage')}>Printing</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('material_manage')}>Employee</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('material_manage')}>Transport</Link></li>
            <li><Link to="/Material" className="nav-button">Material</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('material_manage')}>Partners Payment</Link></li>
           </>
        )}
          {isLoggedIn && userRole === 'payment_manage' && (
          <>
            <li><Link to="/home2" className="nav-button">Home</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('payment_manage')}>Book & Order</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('payment_manage')}>Printing</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('payment_manage')}>Employee</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('payment_manage')}>Transport</Link></li>
            <li><Link to="/home2" className="nav-button" onClick={() => handleLinkClick('payment_manage')}>Material</Link></li>
            <li><Link to="/Partner" className="nav-button">Partners Payment</Link></li>
           </>
        )}

        {isLoggedIn && (
          <li>
            <button className='nav-lbutton' onClick={handleLogout}>Logout</button>
            <li><Link to="/Notification" className="N-button">Notification</Link></li> 
          </li>
        )}
            
          </ul>
        </nav>
      
    </div>
  )
}

export default Home2nav
