const express = require('express');
const router = express.Router();
const  SubmitExamController = require('../controllers/SubmitExamController');


router.post('/',SubmitExamController.submitExam);

router.get('/:exam',SubmitExamController.getExamSubmitionByExamId);

router.get('/:student/:exam',SubmitExamController.getExamSubmitionByExamAndStudent);






module.exports = router;
