const express = require('express');
const router = express.Router();
const questionController = require('../controllers/QuestionController');

// Create a new question
router.post('/', questionController.createQuestion);

// Get all questions
router.get('/', questionController.getAllQuestions);

// Get a question by ID
router.get('/:id', questionController.getQuestionById);

router.get('/:ExamsId/questions', questionController.getQuestionByExamId);


// Update a question
router.put('/:id', questionController.updateQuestion);

// Delete a question
router.delete('/:id', questionController.deleteQuestion);


module.exports = router;
