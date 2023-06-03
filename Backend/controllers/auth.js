const asyncHandler = require('express-async-handler');
const bcrypt = require("bcryptjs");
const {Utilisateurs, validateUserData, validateLoginUser} = require("../models/Utilisateur");
const VerificationToken = require("../models/VerifyToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

/**-------------------------------------------------------
 * créer un compte = Sign up = register new user (Professor) : ( router : /api/auth/register_prof) (method : post)
 * @desc register useressor
 * @route /api/auth/register_prof
 * @method POST
 * @access public
 ---------------------------------------------------*/

module.exports.registre = asyncHandler(async (req, res) => {
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
    let tel = await Utilisateurs.findOne({tel: req.body.tel});
    if(tel){
        return res.status(400).json({message : "Votre numero de telephone deja associer avec autre compte"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpass = await bcrypt.hash(req.body.password, salt);

    let new_user = new Utilisateurs({
        firstname: req.body.firstname,
        lastname : req.body.lastname,
        email : req.body.email,
        tel : req.body.tel,
        password : hashedpass,
        role: req.body.role
    });
    await new_user.save();
    //la verification de l'email :
    const verifyToken = new VerificationToken({
        user : new_user._id,
        token : crypto.randomBytes(32).toString("hex"),
    });
    await verifyToken.save();
    // Le lien${process.env.DOMAIN}
    const link = `http://localhost:3000/profs/${new_user._id}/verify/${verifyToken.token}`;
    // Putting the link into an html template
    const htmlTemplate = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Template</title>
    </head>
    
    <body>
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        <tr>
          <td align="center" bgcolor="#f5f5f5" style="padding: 20px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td align="center" bgcolor="#ffffff" style="padding: 20px;">
                  <h4 style="font-size: 24px; margin-bottom: 10px;">Vérification de votre compte sur QuiZ AI</h4>
                  <p style="font-size: 16px; margin-bottom: 20px;">Bienvenue ${req.body.firstname} ${req.body.lastname}</p>
                  <p style="font-size: 16px; margin-bottom: 20px;">Cliquez sur le lien ci-dessous pour vérifier votre compte sur QuiZ AI</p>
                  <div style="text-align: center;">
                    <a href="${link}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Vérifier</a>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    
    </html>
    `;
    await sendEmail(new_user.email, "Verify Your Email", htmlTemplate);

    res.status(201).json({
        message: "Nous avons envoyé un Lien dans votre Adresse Email, Vérifiez S'il vous plait",
    });
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
   let tel = await Utilisateurs.findOne({tel: req.body.tel});
   if(tel){
       return res.status(400).json({message : "Votre numero de telephone deja associer avec autre compte"});
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
   await new_user.save();
   //la verification de l'email :
   const verifyToken = new VerificationToken({
       user : new_user._id,
       token : crypto.randomBytes(32).toString("hex"),
   });
   await verifyToken.save();
   // Le lien${process.env.DOMAIN}
   const link = `http://localhost:3000/students/${new_user._id}/verify/${verifyToken.token}`;
   // Putting the link into an html template
   const htmlTemplate = `<!DOCTYPE html>
   <html lang="en">
   
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Email Template</title>
   </head>
   
   <body>
     <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
       <tr>
         <td align="center" bgcolor="#f5f5f5" style="padding: 20px;">
           <table border="0" cellpadding="0" cellspacing="0" width="100%">
             <tr>
               <td align="center" bgcolor="#ffffff" style="padding: 20px;">
                 <h4 style="font-size: 24px; margin-bottom: 10px;">Vérification de votre compte sur QuiZ AI</h4>
                 <p style="font-size: 16px; margin-bottom: 20px;">Bienvenue ${req.body.firstname} ${req.body.lastname}</p>
                 <p style="font-size: 16px; margin-bottom: 20px;">Cliquez sur le lien ci-dessous pour vérifier votre compte sur QuiZ AI</p>
                 <div style="text-align: center;">
                   <a href="${link}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Vérifier</a>
                 </div>
               </td>
             </tr>
           </table>
         </td>
       </tr>
     </table>
   </body>
   
   </html>
   `;
   await sendEmail(new_user.email, "Verify Your Email", htmlTemplate);

   res.status(201).json({
       message: "Nous avons envoyé un Lien dans votre Adresse Email, Vérifiez S'il vous plait",
   });
   
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
    if(!user.isVerified){
        return res.status(400).json({message : "Votre Compte n'est pas active, Verifier Votre Email"});
    }
    // generate token jwt
    const token = user.generateAuthToken();
    //response to client
    res.status(200).json({_id: user._id, firstname:user.firstname, lastname:user.lastname, photo:user.photo,role:user.role, token});
 });

/**-----------------------------------------------
 * @desc    Verify User Account
 * @route   /api/auth/:userId/verify/:token
 * @method  GET
 * @access  public
 ------------------------------------------------*/
 module.exports.verifyUserAccountCtrl = asyncHandler(async (req, res) => {
    const user = await Utilisateurs.findById(req.params.userId);
    if (!user) {
      return res.status(400).json({ message: "invalid link" });
    }
  
    const verificationToken = await VerificationToken.findOne({
      user: req.params.userId,
      token: req.params.token,
    });
  
    if (!verificationToken) {
      return res.status(400).json({ message: "invalid link" });
    }
  
    user.isVerified = true;
    await user.save();
  
    await VerificationToken.findOneAndDelete({user:req.params.userId});
    res.status(200).json({ message: "Maitenant Votre compte est verifié" });
  });
   