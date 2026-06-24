const mongoose = require('mongoose');

const TryOnLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Aapke existing User schema ka naam
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Aapke existing Product schema ka naam
    required: true
  },
  renderedOutputUrl: {
    type: String, // FastAPI (VITON-HD) se aane wala final output URL [cite: 59]
    required: true
  },
  status: {
    type: String,
    enum: ['success', 'failed'],
    default: 'success'
  }
}, { timestamps: true });

module.exports = mongoose.model('TryOnLog', TryOnLogSchema);