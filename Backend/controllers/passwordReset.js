const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  Utilisateurs,
  validateEmail
} = require("../models/Utilisateur");
const VerificationToken = require("../models/VerifyToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");


/**-----------------------------------------------
 * @desc    Send Reset Password Link
 * @route   /api/password/reset-password-link
 * @method  POST
 * @access  public
 ------------------------------------------------*/

module.exports.sendResetPasswordLinkCtrl = asyncHandler(async (req,res) => {
   // 1. Validation
   const { error } = validateEmail(req.body);
   if(error) {
    return res.status(400).json({ message: error.details[0].message });
   }

   // 2. Get the Utilisateurs from DB by email
   const utilisateur = await Utilisateurs.findOne({ email: req.body.email });
   if(!utilisateur) {
    return res.status(404).json({ message: "Email Utilisateur n'existe pas !" });
   }

   // 3. Creating VerificationToken
   let verificationToken = await VerificationToken.findOne({ user: utilisateur._id });
   if(!verificationToken) {
    verificationToken = new VerificationToken({
        user: utilisateur._id,
        token: crypto.randomBytes(32).toString("hex"),
    });
    await verificationToken.save();
   }

   // 4. Creating link
   const link = `http://localhost:3000/reset-password/${utilisateur._id}/${verificationToken.token}`;
   // 5. Creating HMTL template
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
                 <h4 style="font-size: 24px; margin-bottom: 10px;">Réinitialisation de mot de passe</h4>
                 <p style="font-size: 16px; margin-bottom: 20px;">Vous avez demandé une réinitialisation de mot de passe pour votre compte Exams_AI.</p>
                 <div style="text-align: center;">
                   <a href="${link}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Réinitialiser le mot de passe</a>
                 </div>
                 <p style="font-size: 16px; margin-top: 20px;">Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail.</p>
               </td>
             </tr>
           </table>
         </td>
       </tr>
     </table>
   </body>
   
   </html>
   
   `;
   // 6. Sending Email
   await sendEmail(utilisateur.email,"Reset Password",htmlTemplate);
   // 7. Response to the client
   res.status(200).json({
    message: "Nous avons Envoyé un Lien de Réinitialisation dans votre Boite Email"
   })
});

/**-----------------------------------------------
 * @desc    Get Reset Password Link
 * @route   /api/password/reset-password/:userId/:token
 * @method  GET
 * @access  public
 ------------------------------------------------*/

module.exports.getResetPasswordLinkCtrl = asyncHandler(async (req,res) => {
    const utilisateur = await Utilisateurs.findById(req.params.userId);
    if(!utilisateur) {
        return res.status(400).json({ message: "invalid link" });
    }

    const verificationToken = await VerificationToken.findOne({
        user: utilisateur._id,
        token: req.params.token,
    });
    if(!verificationToken) {
        return res.status(400).json({ message: "invalid link" });
    }
    res.status(200).json({ message: "Valid url" });
});


/**-----------------------------------------------
 * @desc    Reset Password
 * @route   /api/password/reset-password/:userId/:token
 * @method  POST
 * @access  public
 ------------------------------------------------*/
 
module.exports.resetPasswordCtrl = asyncHandler(async (req,res) => {

   const utilisateur = await Utilisateurs.findById(req.params.userId);
   if(!utilisateur) {
    return res.status(400).json({ message: "invalid link" });
   }

   const verificationToken = await VerificationToken.findOne({
    user: utilisateur._id,
    token: req.params.token,
   });
   if(!verificationToken) {
    return res.status(400).json({ message: "invalid link" });
   }

   if(!utilisateur.isVerified) {
    utilisateur.isVerified = true;
   }

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);

   utilisateur.password = hashedPassword;
   await utilisateur.save();
   await VerificationToken.findByIdAndDelete(verificationToken._id);

   res.status(200).json({ message: "Password reset successfully, please log in" });
});