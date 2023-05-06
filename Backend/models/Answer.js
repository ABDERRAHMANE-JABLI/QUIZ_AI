const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    titre:{
        type: String,
        maxlength: 250,
        unique: true,
        required : true
    },
    note:{
        type : Number
    },
    question:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Questions",
        required : true,
    },
    isCorrect : {
        type : Boolean,
        default: true,
    }
   
}
    ,{
        timestamps : true, 
    }
);


const Answers = mongoose.model("Answers", AnswerSchema);

module.exports = {
    Answers,
}