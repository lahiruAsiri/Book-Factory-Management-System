import React, { useState, useEffect } from 'react';
import './messagesend.css';
import Home2nav from '../components/home2nav';

const SendMessageForm = () => {
  const [receiver, setReceiver] = useState('');
  const [messageContent, setMessageContent] = useState('');
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

  const sendMessage = async () => {
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: userRole,
          receiver,
          messageContent,
        }),
      });

      if (response.ok) {
        console.log('Message sent successfully');
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    setReceiver('');
    setMessageContent('');
  };

  return (
    <div>
      <Home2nav />

   
    <div className="SendMessageForm">
      
      <form onSubmit={handleSubmit}>
        <select
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        >
          <option value="">Select Receiver</option>
          {userRole !== 'book_manage' && <option value="book_manage">Book Manager</option>}
          {userRole !== 'employee_manage' && <option value="employee_manage">Employee Manager</option>}
          {userRole !== 'material_manage' && <option value="material_manage">Material Manager</option>}
          {userRole !== 'printing_manage' && <option value="printing_manage">Printing Manager</option>}
          {userRole !== 'transport_manage' && <option value="transport_manage">Transport Manager</option>}
          {userRole !== 'payment_manage' && <option value="payment_manage">Payment Manager</option>}
        </select>

        <textarea
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
    </div>
  );
};

export default SendMessageForm;
