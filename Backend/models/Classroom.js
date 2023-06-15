const mongoose = require('mongoose');
const joi = require("joi");

const ClassroomSchema = new mongoose.Schema({
    titre:{
        type: String,
        trim : true,
        maxlength: 50,
        required : true
    },
    description:{
        type : String,
        maxlength: 250,
    },
    image:{
        type: Object,
        default:{
            url:"https://cdn.pixabay.com/photo/2020/01/22/09/40/teacher-4784917_1280.jpg",
            publicId: null,
        }
    },
    prof:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Utilisateurs",
        required : true,
    }
}
    ,{
        timestamps:true, 
    }
);

const Classrooms = mongoose.model("Classes", ClassroomSchema);
//validation des donnees dans l'ajout: 

function validateData(obj){
    const shema = joi.object({
        titre : joi.string().max(50).required(),
        description : joi.string().max(250),
    });
    return shema.validate(obj);
}
//validation des données dans update :
function validateUpdateData(obj){
    const shema = joi.object({
        titre : joi.string().max(50).required(),
        description : joi.string().max(250),
    });
    return shema.validate(obj);
}

module.exports={
    Classrooms,
    validateData,
    validateUpdateData,
}