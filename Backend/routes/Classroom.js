const router = require("express").Router();
const { createClassroom, getClasse, getProfClasses, TotalClasses, deleteClass,getClasseById, getStudentsOfClasse } = require("../controllers/Classroom");
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
    .get(validateObjectId, getClasse)
    .delete(validateObjectId, verifyProfandAdmin, deleteClass);
router.get('/ClassById/:id',getClasseById);

// /api/classroms/:idclasse/students
router.route('/:id/Students').get(getStudentsOfClasse);

module.exports = router;