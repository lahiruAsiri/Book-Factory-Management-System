const mongoose = require('mongoose')

const Schema = mongoose.Schema

const partnersSchema = new Schema({
    
  partner_name: {
    type: String,
    required: true
  },
  partner_shopName: {
    type: String,
    required: true
  },
  shop_adresses: {
    type: String,
    required: true
  },
  payment_status: {
    type: String,
    required: true
  }

}, { timestamps: true })

module.exports = mongoose.model('partner', partnersSchema)