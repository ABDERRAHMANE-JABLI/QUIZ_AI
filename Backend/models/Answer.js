const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      maxlength: 250,
      unique: true,
      required: true
    },
    note: {
      type: Number
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    isCorrect: {
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
