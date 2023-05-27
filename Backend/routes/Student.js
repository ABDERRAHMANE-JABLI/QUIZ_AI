const express = require("express");
const {verifyTokenAndUser, verifyToken, verifyProfandAdmin } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");
const { getAllStudents, getStudent, updateStudent, deleteStudent, userUploadPhoto, TotalStudents,InviterStudent} = require("../controllers/Student");
const router = express.Router();

// /api/students/allStudents
router.route('/allStudents').get(verifyProfandAdmin, getAllStudents);

// /api/students/count
router.route('/count').get(verifyProfandAdmin, TotalStudents);
// /api/students/profile/:id
router.route('/profile/:id')
    .get(validateObjectId, getStudent)
    .put(validateObjectId, verifyToken, updateStudent)
    .delete(validateObjectId, verifyTokenAndUser,deleteStudent);

    // /api/students/inviter/:idclasse
router.post('/inviter/:id',InviterStudent);

router.route("/profile/upload_photo").post(verifyTokenAndUser, photoUpload.single("image"), userUploadPhoto);

module.exports = router;

