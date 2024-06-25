import React from 'react';
import { Link } from 'react-router-dom';
import './notification.css';
import Home2nav from '../components/home3nav';

function NotificationPage() {
  return (
    <div>
      <Home2nav />
      <div className="NotificationPage">
        <div className="notification-button">
          <Link to="/MessageSend" className="notification-link">Send Message</Link>
        </div>
        <div className="notification-button">
          <Link to="/ReceivedMessage" className="notification-link">Received Messages</Link>
        </div>
        <div className="notification-button">
          <Link to="/SentMessage" className="notification-link">Sent Messages</Link>
        </div>
      </div>
    </div>
  );
}

export default NotificationPage;
