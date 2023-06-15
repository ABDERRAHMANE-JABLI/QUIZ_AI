const router = require("express").Router();
const {verifyStudent, verifyProfandAdmin } = require("../middlewares/verifyToken");
const { subscribStudent,getClasses, unsubscribe_Student } = require("../controllers/Inscription");
const validateObjectId = require("../middlewares/validateObjectId");

// /api/students/subscrib/:idclasse
router.route('/subscrib/:id')
    .post(validateObjectId, verifyStudent, subscribStudent);

// /api/students/subscrib/:idclasse
router.route('/getInscription/:etudiant')
    .get(getClasses);

    
// /api/students/:idStudent/unSubscrib/:idclasse
router.route('/:etudiant/unSubscrib/:id')
    .delete(verifyProfandAdmin, unsubscribe_Student);


module.exports = router;