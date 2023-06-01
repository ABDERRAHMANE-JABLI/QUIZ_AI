const express = require('express');
const router = express.Router();
const  SubmitExamController = require('../controllers/SubmitExamController');


router.post('/',SubmitExamController.submitExam);

router.get('/:exam',SubmitExamController.getExamSubmition);





module.exports = router;
