const asyncHandler = require('express-async-handler');
const bcrypt = require("bcryptjs");
const {Utilisateurs, validateUserData, validateLoginUser} = require("../models/Utilisateur");

/**-------------------------------------------------------
 * créer un compte = Sign up = register new user (Professor) : ( router : /api/auth/register_prof) (method : post)
 * @desc register useressor
 * @route /api/auth/register_prof
 * @method POST
 * @access public
 ---------------------------------------------------*/

module.exports.registerProf = asyncHandler(async (req, res) => {
    // validation data in model: 
    const {error} = validateUserData(req.body);
    if(error){
        // 400 bad request
        return res.status(400).json({message : error.details[0].message});
    }
    let user = await Utilisateurs.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({message : "Compte déja existe dans la base de donnée"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(req.body.password, salt);

    let new_user = new Utilisateurs({
        firstname: req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        tel : req.body.tel,
        password : hashedpass,
        role:"prof"
    });

    try {
        await new_user.save();
        res.status(201).json({message : 'Compte créé avec succes'});  
    } catch (error) {
        res.status(400).json({message:`Erreur MongooDB Num : ${error.code}`});
    }
});

/**-------------------------------------------------------
 * créer un compte = Sign up = register new user (Student) : ( router : /api/auth/register_student) (method : post)
 * @desc register 
 * @route /api/auth/register_student
 * @method POST
 * @access public
 ---------------------------------------------------*/

module.exports.registerStudent = asyncHandler(async (req, res) => {
    // validation data in model: 
    const {error} = validateUserData(req.body);
    if(error){
        // 400 bad request
        return res.status(400).json({message : error.details[0].message});
    }
    let user = await Utilisateurs.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({message : "Compte déja existe dans la base de donnée"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(req.body.password, salt);

    let new_user = new Utilisateurs({
        firstname: req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        tel : req.body.tel,
        password : hashedpass,
        role:"etudiant"
    });
    
    try {
        await new_user.save();
        res.status(201).json({message : 'Compte créé avec succes'});  
    } catch (error) {
        res.status(400).json({message:`Erreur MongooDB Num : ${error.code}`});
    }
   
});

/**-------------------------------------------------------
 * Signin = login = se connecter 
 * @desc Login User
 * @route /api/auth/Login
 * @method POST
 * @access public
 ---------------------------------------------------*/

 module.exports.LoginUser = asyncHandler(async (req, res) => { 
     //1. validation data in model : 
    const {error} = validateLoginUser(req.body);
    if(error){
        // 400 bad request
        return res.status(400).json({message : error.details[0].message});
    }// user is exist ?
    let user = await Utilisateurs.findOne({email: req.body.email});
    if(!user){
        return res.status(400).json({message : "Invalid Email or Password"});
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if(!isMatch){
        return res.status(400).json({message : "Invalid Email or Password"});
    }
    // generate token jwt
    const token = user.generateAuthToken();
    //response to client
    res.status(200).json({_id: user._id, firstname:user.firstname, lastname:user.lastname, token});
 });


   