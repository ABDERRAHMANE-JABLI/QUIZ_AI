const express = require("express");
const {registerProf, LoginUser, registerStudent, verifyUserAccountCtrl} = require("../controllers/auth");


const router = express.Router();
// /api/auth/register_prof : register professor
router.post('/register_prof',registerProf);

// /api/auth/register_student : 
router.post('/register_student',registerStudent);

// /api/auth/login
router.post('/login',LoginUser);

// /api/auth/:userId/verify/:token
router.get("/:userId/verify/:token", verifyUserAccountCtrl);

module.exports = router;
