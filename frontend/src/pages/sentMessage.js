import React, { useState, useEffect } from 'react';
import './sentMessage.css'; // You might want to create a separate CSS file for Sent Messages
import Home2nav from '../components/home2nav';

const SentMessageList = () => {
  const [sentMessages, setSentMessages] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch('/auth/validate-token', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role);
        } else {
          setUserRole('');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchSentMessages = async () => {
      try {
        const response = await fetch(`/api/messages/sent/${userRole}`, {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setSentMessages(data);
        } else {
          console.error('Failed to fetch sent messages');
        }
      } catch (error) {
        console.error('Error fetching sent messages:', error);
      }
    };

    if (userRole) {
      fetchSentMessages();
    }
  }, [userRole]);

  const handleDelete = async (messageId) => {
    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // Remove the deleted message from the sentMessages array
        setSentMessages(sentMessages.filter(message => message._id !== messageId));
        console.log('Message deleted successfully');
      } else {
        console.error('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div>
      <Home2nav />
      <div className="SentMessageList"> {/* Adjust class name */}
        <h2>Sent Messages</h2>
        <ul>
          {sentMessages.map((message, index) => (
            <li key={index}>
              <strong>Receiver:</strong> {message.receiver}, <strong>Content:</strong> {message.messageContent}
              <button onClick={() => handleDelete(message._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SentMessageList;
