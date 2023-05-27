const mongoose = require('mongoose');
const joi = require("joi");

const ExamSchema = new mongoose.Schema({
    titre:{
        type: String,
        maxlength: 50,
        required : true
    },
    description:{
        type : String,
        maxlength: 250,
    },
    Date_debut : {
        type : Date
    },
    questions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    Durre: {
        type: Number
    },
    classe:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Classes",
        required :true,
    }
}
    ,{
        timestamps : true, 
    }
);

const Exams = mongoose.model("Exams", ExamSchema);

//validation des donnees dans l'ajout: 
function validateData(obj){
    const shema = joi.object({
        titre : joi.string().max(50).required(),
        description : joi.string().max(250),
    });
    return shema.validate(obj);
}

module.exports = {
    Exams,
    validateData,
}
// annotateur / type annotation : text, image, 