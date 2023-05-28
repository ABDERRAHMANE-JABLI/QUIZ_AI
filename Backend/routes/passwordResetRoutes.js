const express = require('express');
const router = express.Router();
const passwordResetController = require('../controllers/passwordResetController');

// Route pour générer et enregistrer une réinitialisation de mot de passe
router.post('/', passwordResetController.createPasswordReset);

// Route pour vérifier et valider le jeton de réinitialisation de mot de passe
router.get('/:token', passwordResetController.verifyPasswordResetToken);

// Route pour réinitialiser le mot de passe
router.post('/:token', passwordResetController.resetPassword);

module.exports = router;
