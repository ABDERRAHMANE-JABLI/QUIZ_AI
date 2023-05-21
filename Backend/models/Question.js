const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      maxlength: 1000,
      required: true
    },
    note: {
      type: Number
    },
    type: {
      type: String,
      default: 'ChoixUnique'
    },
    Exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exams',
      required: true
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
