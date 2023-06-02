const mongoose = require('mongoose');
const joi = require("joi");
const jwt = require('jsonwebtoken');

require("dotenv").config();

const UtilisateursSchema = new mongoose.Schema({
    firstname:{
        type:String,
        trim : true,
        required : true,
        maxlength: 50,
    },
    lastname:{
        type: String,
        trim : true,
        maxlength: 50,
        required : true
    },
    photo:{
        type: Object,
        default:{
            url:"https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png",
            publicId: null,
        }
    },
    specialite: {
        type: String, 
        default:'Informatique'
    },
    email:{
        type: String,
        trim : true,
        unique: true,
        required : true
    },
    tel:{
        type: String,
        trim : true,
        unique: true,
    },
    password : {
        type : String,
        required : true
    },
    role:{
        type : String,
        required: true
    },
    isVerified :{
        type:Boolean,
        default: false,
    }
}
    ,{
        timestamps:true, 
    }
);

  
// generate auth token :**********************************************

UtilisateursSchema.methods.generateAuthToken = function(){
    return jwt.sign({id:this._id, role:this.role},process.env.JWT_secret)
}

//************************************************************************ */

const Utilisateurs = mongoose.model("Utilisateurs", UtilisateursSchema);
//validation des donnees : 

function validateUserData(obj){
    const shema = joi.object({
        firstname : joi.string().trim().max(50).required(),
        lastname : joi.string().trim().max(50).required(),
        email : joi.string().trim().max(50).required().email(),
        tel : joi.string().trim().min(10).max(10).required(),
        password : joi.string().trim().required(),
        role : joi.string().trim().required(),
    });
    return shema.validate(obj);
}

function validateLoginUser(obj){
    const shema = joi.object({
        email : joi.string().trim().required().email(),
        password : joi.string().trim().required(),
    });
    return shema.validate(obj);
}

function validateUpdateData(obj){
    const shema = joi.object({
        firstname : joi.string().trim().max(50),
        lastname : joi.string().trim().max(50),
        email : joi.string().trim().max(50).email(),
        tel : joi.string().trim().min(10).max(10),
        password : joi.string().trim(),
    });
    return shema.validate(obj);
}

function validateEmail(obj) {
    const schema = joi.object({
        email: joi.string().trim().min(5).max(100).required().email(),
    });
    return schema.validate(obj);
}

module.exports = {
    Utilisateurs,
    validateUserData,
    validateLoginUser,
    validateUpdateData,
    validateEmail
}