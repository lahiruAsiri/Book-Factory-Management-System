import React, { useState, useEffect } from 'react';
import './recievedMessage.css';
import Home2nav from '../components/home2nav';

const MessageList = () => {
  const [messages, setMessages] = useState([]);
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
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages/received/${userRole}`, {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (userRole) {
      fetchMessages();
    }
  }, [userRole]);

  const handleDelete = async (messageId) => {
    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // Remove the deleted message from the messages array
        setMessages(messages.filter(message => message._id !== messageId));
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
    <div className="MessageList">
      <h2>Received Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <strong>Sender:</strong> {message.sender}, <strong>Content:</strong> {message.messageContent}
            <button onClick={() => handleDelete(message._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default MessageList;
