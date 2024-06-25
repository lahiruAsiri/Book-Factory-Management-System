const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  messageContent: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
