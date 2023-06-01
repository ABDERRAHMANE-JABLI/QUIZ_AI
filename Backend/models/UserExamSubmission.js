const mongoose = require("mongoose");

const userExamSubmissionSchema = new mongoose.Schema({
  student:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Utilisateurs",
    required : true,
},
exam:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Exams",
    required : true,
},
  answers: {
    type: [{
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
      },
      reponse: {
        type: mongoose.Schema.Types.Mixed,
      },
    }],
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const UserExamSubmission = mongoose.model(
  "UserExamSubmission",
  userExamSubmissionSchema
);

module.exports = {UserExamSubmission};
