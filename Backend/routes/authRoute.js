const express = require("express");
const {registre, LoginUser, verifyUserAccountCtrl} = require("../controllers/auth");


const router = express.Router();
// /api/auth/register 
router.post('/registre',registre);

// /api/auth/login
router.post('/login',LoginUser);

// /api/auth/:userId/verify/:token
router.get("/:userId/verify/:token", verifyUserAccountCtrl);

module.exports = router;
