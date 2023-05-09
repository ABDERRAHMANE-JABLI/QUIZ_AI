const {Utilisateurs, validateUpdateData} = require('../models/Utilisateur');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const path = require('path');
const {cloudinaryUploadImage,cloudinaryRemoveImage} = require("../utils/cloudinary");
/*const _ = require('lodash');
const formidable = require("formidable");*/
const fs = require('fs');

/**-------------------------------------------------------
 * @desc get all profs :
 * @route /api/prof/allprofs
 * @method GET
 * @access private only admin
 ---------------------------------------------------*/
/** 
module.exports.getAllProfs = asyncHandler(async (req, res) =>{
   const profs = await Professors.find().select("-password");
   res.status(200).json(profs);
});*/

/**-------------------------------------------------------
 * @desc get sigle prof :
 * @route /api/prof/profile/:id
 * @method GET
 * @access private only professor him self or admin 
 ---------------------------------------------------*/
//le nombre des users : Utilisateurs.count

 module.exports.getProf = asyncHandler(async (req, res)=>{
   const prof = await Utilisateurs.findById(req.params.id).select("-password");   
   if(!prof){
      return res.status(404).json({message: "not found"});
   }
   res.status(200).json(prof);
 });

 /**-------------------------------------------------------
 * @desc update professor :
 * @route /api/prof/profile/:id
 * @method put
 * @access private only user him self : 
 ---------------------------------------------------*/
module.exports.updateProf = asyncHandler(async (req, res)=>{
   const {error} = validateUpdateData(req.body);
    if(error){
        // 400 bad request
        return res.status(400).json({message : error.details[0].message});
    }
    if(req.body.password){
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);  
    }
    const updatedprofile = await Utilisateurs.findByIdAndUpdate(req.params.id, {
      $set: {
         firstname: req.body.firstname,
         lastname : req.body.lastname,
         email : req.body.email,
         tel : req.body.tel,
         password : req.body.password
      }
    },{new: true}).select("-password");
    res.status(200).json(updatedprofile);
});



/**-------------------------------------------------------
 * @desc modify photo prof :
 * @route /api/prof/profile/upload_photo
 * @method POST
 * @access private only user himself
 ---------------------------------------------------*/

 module.exports.userUploadPhoto = asyncHandler(async (req, res) =>{
   if(!req.file){
      return res.status(400).json({message:"No file provided"});
   }
   //get the path image :
   const imgPath = path.join(__dirname,`../images/${req.file.filename}`);
   // upload image to cloudinary : 
   const result = await cloudinaryUploadImage(imgPath);
   // get user who want modify his photo :
   const user = await Utilisateurs.findById(req.user.id);
   if(user.photo.publicId !== null){
      await cloudinaryRemoveImage(user.photo.publicId);
   } 
   user.photo = {url: result.secure_url, publicId: result.public_id};
   await user.save();

   fs.unlinkSync(imgPath);
   res.status(200).json(
      {
         message:"profile photo uploaded successfuly", 
         photo:{url: result.secure_url, publicId: result.public_id}
      },
      );
      //in the end remove photo from folder images
      
 });

 /**-------------------------------------------------------
 * @desc delete prof :
 * @route /api/prof/profile/:id
 * @method DELETE
 * @access private only admin or user himself
 ---------------------------------------------------*/

 module.exports.deleteProf = asyncHandler(async (req, res) =>{
   //1. Get user from DB :
   const user = await Utilisateurs.findById(req.params.id);
   if(!user){
      return res.status(404).json({message:"Professor not found"});
   }
   //2. delete all classes that belong to the professor :
   //todo
   //3. delete profile picture from the cloudinary :
   await cloudinaryRemoveImage(user.photo.publicId);
   // 4 delete the user
   await Utilisateurs.findByIdAndDelete(req.params.id);
   // send response to client
   res.status(200).json({message:"Deleted successfully"});
 });