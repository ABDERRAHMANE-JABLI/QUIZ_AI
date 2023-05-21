const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      maxlength: 1000,
    },
    note: {
      type: Number
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    correct: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = {Answer};
