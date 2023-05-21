const { Answer } = require('../models/Answer');
const { Question } = require('../models/Question')
/**-------------------------------------------------------
 * @desc Create a new answer
 * @route /api/answers
 * @method POST
 * @access private only admin or professor
 ---------------------------------------------------*/
async function createAnswer(req, res) {
  try {
    const answer = await Answer.create(req.body);
    Question.findByIdAndUpdate(
      answer.question,
      { $push: { answers: answer._id } },
      { new: true }
    )
    .then(updatedQuestion => {
      console.log(updatedQuestion);
    });

    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

// 
/**-------------------------------------------------------
 * @desc Get all answers
 * @route /api/questions
 * @method GET
 * @access private only admin or professor
 ---------------------------------------------------*/
async function getAllAnswers(req, res) {
  try {
    const answers = await Answer.find();
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch answers' });
  }
}

/**-------------------------------------------------------
 * @desc Get an answer by ID
 * @route /api/answers/:id
 * @method GET
 * @access private only admin or professor
 ---------------------------------------------------*/
async function getAnswerById(req, res) {
  try {
    const answer = await Answer.findById(req.params.id);
    if (answer) {
      res.status(200).json(answer);
    } else {
      res.status(404).json({ error: 'Answer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch answer' });
  }
}


/**-------------------------------------------------------
 * @desc Get an answers by Question ID
 * @route /api/answers/:questionid/answers
 * @method GET
 * @access private only admin or professor
 ---------------------------------------------------*/

async function getAnswersByQuestionId(req, res) {
    try {
      const questionId = req.params.questionId;
  
      const answers = await Answer.find({ question: questionId });
  
      res.status(200).json(answers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch answers' });
    }
  }


/**-------------------------------------------------------
 * @desc  Update an answer
 * @route /api/answers/:id
 * @method PUT
 * @access private only admin or professor
 ---------------------------------------------------*/
async function updateAnswer(req, res) {
  try {
    const answer = await Answer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (answer) {
      res.status(200).json(answer);
    } else {
      res.status(404).json({ error: 'Answer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update answer' });
  }
}


/**-------------------------------------------------------
 * @desc  Delete an answer
 * @route /api/answers/:id
 * @method Delete
 * @access private only admin or professor
 ---------------------------------------------------*/
async function deleteAnswer(req, res) {
  try {
    const answer = await Answer.findByIdAndDelete(req.params.id);
    if (answer) {
      Question.findByIdAndUpdate(
        answer.question,
        { $pull: { answers: answer._id } },
        { new: true }
      )
      .then(updatedQuestion => {
        console.log(updatedQuestion);
        res.status(200).json({ message: 'Answer deleted successfully' });

      })
    } else {
      res.status(404).json({ error: 'Answer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete answer' });
  }
}

module.exports = {
  createAnswer,
  getAllAnswers,
  getAnswerById,
  updateAnswer,
  deleteAnswer,
  getAnswersByQuestionId,
};
