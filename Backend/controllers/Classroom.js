const { Classrooms, validateData} = require("../models/Classroom");
const {Inscriptions} = require('../models/Inscription');
const asyncHandler = require('express-async-handler');
const path = require('path');
const {cloudinaryUploadImage, cloudinaryRemoveImage} = require("../utils/cloudinary");
const fs = require('fs');

/**-------------------------------------------------------
 * @desc Create classroom :
 * @route /api/classroom/
 * @method POST
 * @access private only admin or professor
 ---------------------------------------------------*/
 
 module.exports.createClassroom = asyncHandler(async (req, res) =>{
    //image validation : 
    if(!req.file){ return res.status(400).json({message: "no image provided"});}
    //data validation :
    const {error} = validateData(req.body);
    if(error){
        return res.status(400).json({message : error.details[0].message});
    }
    //get the path image :
    const imgPath = path.join(__dirname,`../images/${req.file.filename}`);
   // upload image to cloudinary : 
   const result = await cloudinaryUploadImage(imgPath);
    fs.unlinkSync(imgPath);
    //create classroom :
    try{
      const classroom = await  Classrooms.create({
         titre : req.body.titre,
         description : req.body.description,
         image : {url: result.secure_url, publicId: result.public_id},
         prof : req.user.id, 
     });
     res.status(201).json(classroom);
    }
    catch(error){
      if(error.code == 11000){
         return res.status(400).json({message : "Le Titre de la classe doit étre unique"});
      }
      return res.status(400).json({message : error});
    }
 });
 
 /**-------------------------------------------------------
 * @desc get all classes :
 * @route /api/classrooms/
 * @method GET
 * @access private only admin OR professor who create the class :
 ---------------------------------------------------*/

 module.exports.getAllClasses = asyncHandler(async (req, res) =>{
    const classes = await Classrooms.find().populate("prof",["_id","firstname","lastname","role"]).sort({ createdAt : -1});
   res.status(200).json(classes);
 });


  /**-------------------------------------------------------
 * @desc get all classes :
 * @route /api/classrooms/
 * @method GET
 * @access private only the professor who create the classe
 ---------------------------------------------------*/

 module.exports.getProfClasses = asyncHandler(async (req, res) =>{
   const classes = await Classrooms.find({"prof":req.user.id}).populate("prof",["_id","firstname","lastname"]).sort({ createdAt : -1});
   if(!classes) res.status(404).json({message:"you Don't Have any classe"});
   else res.status(200).json(classes);
});


  /**-------------------------------------------------------
 * @desc get classe : just title, image and prof :
 * @route /api/classrooms/:id
 * @method GET
 * @access public 
 ---------------------------------------------------*/
 module.exports.getClasse = asyncHandler(async (req, res) =>{
      const classe = await Classrooms.findById(req.params.id).select("titre image")
                     .populate("prof",["firstname","lastname"]);
      res.status(200).json(classe);
 });
   /**-------------------------------------------------------
 * @desc get classe by Id :
 * @route /api/classrooms/:id
 * @method GET
 * @access private only admin or the professor who create the classe
 ---------------------------------------------------*/
 module.exports.getClasseById = asyncHandler(async (req, res) =>{
   const classe = await Classrooms.findById(req.params.id);
   if(classe){
      res.status(200).json(classe);
   }else{
      res.status(403).json({ message: "class not Found" });
   }
});

   /**-------------------------------------------------------
 * @desc Delete classe :
 * @route /api/classrooms/:id
 * @method DELETE
 * @access private only admin or the professor who create the classe
 ---------------------------------------------------*/

 module.exports.deleteClass = asyncHandler(async (req, res) =>{
   //1. Get user from DB :
   const classe = await Classrooms.findById(req.params.id);
   if(!classe){
      return res.status(404).json({message:"Classe not found"});
   }
   
   // 4 delete the class
   if(req.user.role === "admin" || req.user.id === classe.prof.toString()){
      await Classrooms.findByIdAndDelete(req.params.id);
      await cloudinaryRemoveImage(classe.image.publicId);

      res.status(200).json({
         message: "Opération effectué avec succes",
         classeId: classe._id,
       });

   }else {
      res.status(403).json({ message: "access denied, forbidden" });
    }
 });

   /**-------------------------------------------------------
 * @desc return number of classe :
 * @route /api/classrooms/count
 * @method GET
 * @access private only the professor
 ---------------------------------------------------*/
 module.exports.TotalClasses = asyncHandler(async (req, res) =>{
   const Total = await Classrooms.find({"prof":req.user.id}).count();
   res.status(200).json({count_student : Total});
});

   /**-------------------------------------------------------
 * @desc retourner les etudiants inscrient dans une classes:
 * @route /api/classrooms/:idClasse/Students
 * @method GET
 * @access private only the professor or admin
 ---------------------------------------------------*/

 module.exports.getStudentsOfClasse = asyncHandler(async (req, res) =>{//,["_id","firstname","lastname","email","tel","photo.url"]
  try{
   const Students = await Inscriptions.find({"classe":req.params.id}).populate("etudiant",["_id","firstname","lastname","email","tel","photo.url"]).select("etudiant -_id").sort({createdAt : -1});
   const transformedResults = Students.map((item) => {
      const { _id, firstname, lastname, email, tel, photo } = item.etudiant;
      return { _id, firstname, lastname, email, tel, photo };
    });
   res.status(200).json(transformedResults);
  }catch(error){
   res.status(500).json({error});
  }
});

