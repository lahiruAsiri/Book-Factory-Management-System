const express = require('express');
const Message = require('../models/messageModel');

const router = express.Router();

// Get messages by receiver
router.get('/messages/received/:receiver', async (req, res) => {
  const receiver = req.params.receiver;

  try {
    const messages = await Message.find({ receiver });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get messages by sender
router.get('/messages/sent/:sender', async (req, res) => {
  const sender = req.params.sender;

  try {
    const messages = await Message.find({ sender });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a message
router.post('/messages', async (req, res) => {
  const { sender, receiver, messageContent } = req.body;

  try {
    const newMessage = new Message({ sender, receiver, messageContent });
    await newMessage.save();
    res.json({ status: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a message
router.delete('/messages/:id', async (req, res) => {
  const messageId = req.params.id;

  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    await Message.findByIdAndDelete(messageId);
    res.json({ status: true, message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
