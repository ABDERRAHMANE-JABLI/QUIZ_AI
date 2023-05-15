const { Question } = require('../models/Question');

 /**-------------------------------------------------------
 * @desc get all classes :
 * @route /api/classrooms/
 * @method GET
 * @access private only admin OR professor who create the class :
 ---------------------------------------------------*/
async function createQuestion(req, res) {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create question' });
  }
}

// Get all questions
async function getAllQuestions(req, res) {
  try {
    const questions = await Question.find({_id:'645f9286f8deb3a6297ff339'}).populate("answers").exec();
    // console.log(questions);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

// Get a question by ID
async function getQuestionById(req, res) {
  try {
    const question = await Question.findById(req.params.id);
    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch question' });
  }
}

// Update a question
async function updateQuestion(req, res) {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update question' });
  }
}

// Delete a question
async function deleteQuestion(req, res) {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (question) {
      res.status(200).json({ message: 'Question deleted successfully' });
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete question' });
  }
}

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
