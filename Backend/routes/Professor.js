const express = require("express");
const {getProf, updateProf, userUploadPhoto, deleteProf} = require('../controllers/Professor');
const {verifyTokenAndUser, verifyToken, verifyProfandAdmin } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");
const router = express.Router();

// /api/prof/allprofs
/*
router.route('/allprofs').get(verifyToken, getAllProfs);
*/

// /api/prof/profile/:id
router.route('/profile/:id')
    .get(validateObjectId,verifyTokenAndUser, getProf)
    .put(validateObjectId, verifyTokenAndUser, updateProf)
    .delete(validateObjectId, verifyTokenAndUser,deleteProf);

router.route("/profile/upload_photo").post(verifyToken,photoUpload.single("image"), userUploadPhoto);

module.exports = router;

