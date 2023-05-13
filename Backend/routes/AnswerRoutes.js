const express = require('express');
const router = express.Router();
const answerController = require('../controllers/AnswerController');

// Create a new answer
router.post('/', answerController.createAnswer);

// Get all answers
router.get('/', answerController.getAllAnswers);

// Get an answer by ID
router.get('/:id', answerController.getAnswerById);

// Get an answer by Question ID
router.get('/:questionId/answers', answerController.getAnswersByQuestionId);

// Update an answer
router.put('/:id', answerController.updateAnswer);

// Delete an answer
router.delete('/:id', answerController.deleteAnswer);



module.exports = router;
