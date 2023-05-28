const mongoose = require('mongoose');

const passwordResetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    expires: '1h' // Expire après 1 heure
  }
});

const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);

module.exports = {PasswordReset};
