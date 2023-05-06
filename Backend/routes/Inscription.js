const router = require("express").Router();
const {verifyStudent } = require("../middlewares/verifyToken");
const { SubscribStudent } = require("../controllers/Inscription");
const validateObjectId = require("../middlewares/validateObjectId");

// /api/students/subscrib/:id
router.route('/subscrib/:id')
    .get(validateObjectId, verifyStudent,SubscribStudent);

module.exports = router;