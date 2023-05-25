const express = require('express');
const router = express.Router();
const ExamenController = require('../controllers/ExamController');

// Create a new Quiz
router.post('/', ExamenController.CreatExamen);

// Create Quiz using chatGPT
router.post('/GenerateExamen', ExamenController.generateQuiz);
// Get all Quizs
router.get('/', ExamenController.getAllExam);

// Get Quizs by Id 
router.get('/:id', ExamenController.getExamById);

router.get('/:classId/examens', ExamenController.getExamByClassId);







// // Get a question by ID
// router.get('/:id', questionController.getQuestionById);

// // Update a question
router.put('/:id', ExamenController.updateExamen);

// // Delete a question
// router.delete('/:id', questionController.deleteQuestion);

module.exports = router;
