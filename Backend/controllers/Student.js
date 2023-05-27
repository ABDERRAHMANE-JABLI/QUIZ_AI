const {Utilisateurs, validateUpdateData} = require('../models/Utilisateur');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const path = require('path');
const {cloudinaryUploadImage,cloudinaryRemoveImage} = require("../utils/cloudinary");
const sendEmail = require("../utils/sendEmail");

/*const _ = require('lodash');
const formidable = require("formidable");*/
const fs = require('fs');

/**-------------------------------------------------------
 * @desc get all Students :
 * @route /api/students/allStudent
 * @method GET
 * @access private only admin or professor
 ---------------------------------------------------*/

module.exports.getAllStudents = asyncHandler(async (req, res) =>{
   const students = await Utilisateurs.find({role:"etudiant"}).select("-password");
   res.status(200).json(students);

});

/**-------------------------------------------------------
 * @desc get the number of Students :
 * @route /api/students/count
 * @method GET
 * @access private only admin or professor
 ---------------------------------------------------*/

module.exports.TotalStudents = asyncHandler(async (req, res) =>{
    const Total = await Utilisateurs.find({role:"etudiant"}).count();
    res.status(200).json({count_student : Total});
 });

/**-------------------------------------------------------
 * @desc get single Student :
 * @route /api/students/profile/:id
 * @method GET
 * @access public
 ---------------------------------------------------*/

 module.exports.getStudent = asyncHandler(async (req, res)=>{
   const student = await Utilisateurs.findById(req.params.id).select("-password");   
   if(!student){
      return res.status(404).json({message: "not found"});
   }
   res.status(200).json(student);
 });

 /**-------------------------------------------------------
 * @desc Update Student Profile :
 * @route /api/Students/profile/:id
 * @method put
 * @access private only user him self : 
 ---------------------------------------------------*/
module.exports.updateStudent = asyncHandler(async (req, res)=>{
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
 * @desc update student photo :
 * @route /api/Students/profile/upload_photo
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

   
   res.status(200).json(
      {
         message:"profile photo uploaded successfuly", 
         photo:{url: result.secure_url, publicId: result.public_id}
      },
      );
      //in the end remove photo from folder images
      fs.unlinkSync(imgPath);
 });

 /**-------------------------------------------------------
 * @desc delete student :
 * @route /api/Students/profile/:id
 * @method DELETE
 * @access private only admin or user himself
 ---------------------------------------------------*/

 module.exports.deleteStudent = asyncHandler(async (req, res) =>{
   //1. Get user from DB :
   const user = await Utilisateurs.findById(req.params.id);
   if(!user){
      return res.status(404).json({message:"Student not found"});
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

/**-------------------------------------------------------
 * @desc inviter student  :
 * @route /api/students/profile/:id
 * @method POST
 * @access public
 ---------------------------------------------------*/

 
 module.exports.InviterStudent = asyncHandler(async (req, res) => {
   const { emails } = req.body;
   const idclasse = req.params.id;
   const link = `http://localhost:3000/Inviter/${idclasse}`;
   const htmlTemplate = `<html lang="fr">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Invitation à la classe en ligne</title>
   </head>
   <body>
       <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
           <tr>
               <td align="center" bgcolor="#f5f5f5" style="padding: 20px;">
                   <table border="0" cellpadding="0" cellspacing="0" width="100%">
                       <tr>
                           <td align="center" bgcolor="#ffffff" style="padding: 20px;">
                               <h4 style="font-size: 24px; margin-bottom: 10px;">Invitation à la classe en ligne</h4>
                               <p style="font-size: 16px; margin-bottom: 20px;">Cher étudiant(e),</p>
                               <p style="font-size: 16px; margin-bottom: 20px;">Nous sommes ravis de vous inviter à participer à notre classe en ligne.</p>
                               <div style="text-align: center;">
                               <a href="${link}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Participer</a>
                             </div>
                           </td>
                       </tr>
                   </table>
               </td>
           </tr>
       </table>
   </body>
   </html>`;

   const emailPromises = emails.map(email => sendEmail(email, "Participer à notre classe en ligne", htmlTemplate));
   await Promise.all(emailPromises);

   res.status(201).json({
      message: "Invitation effectué avec succes.",
   });

});
