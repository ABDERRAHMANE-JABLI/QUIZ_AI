const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
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
    type: {
      type: String,
      default: 'unique'
    },
    Exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exams',
      required: false
    },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
      }
    ]
  },
  {
    timestamps: true
  }
);

const Question = mongoose.model('Question', QuestionSchema);

module.exports = {Question};
