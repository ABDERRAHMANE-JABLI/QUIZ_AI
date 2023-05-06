const router = require("express").Router();
const { createClassroom, getClasse, getProfClasses, TotalClasses, deleteClass } = require("../controllers/Classroom");
const photoUpload = require("../middlewares/photoUpload");
const validateObjectId = require("../middlewares/validateObjectId");
const { verifyProfandAdmin } = require("../middlewares/verifyToken");


// /api/classrooms
router.route("/")
    .post(verifyProfandAdmin, photoUpload.single("image"), createClassroom)
    .get(verifyProfandAdmin, getProfClasses);

// /api/classrooms/count
router.route('/count').get(verifyProfandAdmin, TotalClasses);

router.route('/:id')
    .get(validateObjectId, verifyProfandAdmin, getClasse)
    .delete(validateObjectId, verifyProfandAdmin, deleteClass);
// /api/classroms/:id

module.exports = router;