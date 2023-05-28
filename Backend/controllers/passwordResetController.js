const {PasswordReset} = require('../models/PasswordReset');
const {Utilisateurs} = require('../models/Utilisateur');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require("bcryptjs");

function generateResetToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
  
    for (let i = 0; i < 64; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }
  
    return token;
  }

// Action pour générer et enregistrer une réinitialisation de mot de passe
exports.createPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Utilisateurs.findOne({ email })
    if(!user){
        res.status(400).send({message : `ce email n'existe pas`})
    }
    // Vérifier si l'utilisateur existe dans votre système
    // ...
    // Créer un jeton pour la réinitialisation de mot de passe (vous pouvez utiliser une bibliothèque comme `crypto` ou `jsonwebtoken`)
    const token = generateResetToken();

    // Créer une instance de PasswordReset avec l'email et le jeton
    const passwordReset = new PasswordReset({
      email,
      token
    });

    // Enregistrer la réinitialisation de mot de passe dans la base de données
    await passwordReset.save();
    const resetLink = `http://localhost:3000/auth/${email}/${token}`;
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
                  <h4 style="font-size: 24px; margin-bottom: 10px;">Réinitialisation de mot de passe</h4>
                  <p style="font-size: 16px; margin-bottom: 20px;">Vous avez demandé une réinitialisation de mot de passe pour votre compte Exams_AI.</p>
                  <div style="text-align: center;">
                    <a href="${resetLink}" style="display: inline-block; background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Réinitialiser le mot de passe</a>
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
    await sendEmail(email, "Réinitialisation de mot de passe", htmlTemplate);

    // Envoyer l'email contenant le lien de réinitialisation du mot de passe à l'utilisateur
    // ...

    res.status(200).json({ message: 'Password reset email sent.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Action pour vérifier et valider le jeton de réinitialisation de mot de passe
exports.verifyPasswordResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    // Rechercher la réinitialisation de mot de passe correspondant au jeton
    const passwordReset = await PasswordReset.findOne({ token });

    if (!passwordReset) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Vérifier si le jeton est toujours valide (vérifier si le délai d'expiration est dépassé)

    // Si le jeton est valide, vous pouvez afficher un formulaire de réinitialisation de mot de passe
    // ...

    res.status(200).json({ message: 'Token is valid.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Action pour réinitialiser le mot de passe
exports.resetPassword = async (req, res) => {
    try {
      const { token } = req.params;
      const { email, password } = req.body;
  
      const passwordReset = await PasswordReset.findOne({ token });
  
      if (!passwordReset) {
        return res.status(400).json({ message: 'Jeton invalide ou expiré.' });
      }
  
      let user = await Utilisateurs.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Ce compte n'existe pas." });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Mettre à jour le mot de passe de l'utilisateur dans votre système
      user.password = hashedPassword;
      await user.save();
  
      await PasswordReset.deleteOne({ token });
  
      res.status(200).json({ message: 'Réinitialisation du mot de passe réussie.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
  };
  
