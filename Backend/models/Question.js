const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    titre:{
        type: String,
        maxlength: 250,
        unique: true,
        required : true
    },
    note:{
        type : Number
    },
    type : {
        type : String,
        default:'unique',
    },
    Exam:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Exams",
        required : true,
    }
}
    ,{
        timestamps : true, 
    }
);

// pour le type de la question il ya unique / multiple et paragraphe

const Questions = mongoose.model("Questions", QuestionSchema);

module.exports = {
    Questions,
}