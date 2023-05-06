const mongoose = require('mongoose');

const PassExamSchema = new mongoose.Schema({
    student:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Utilisateurs",
        required : true,
    },
    exam:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Answers",
        required : true,
    },
    answers:{
        type : String,
        required : true,
    }
   
}
    ,{
        timestamps : true, 
    }
);

const PassExam = mongoose.model("PassExam", PassExamSchema);

module.exports = {
    PassExam,
}