const { Question } = require('../models/Question');
const {Exams} = require('../models/Exam')
const {Answer}=require('../models/Answer')

 /**-------------------------------------------------------
 * @desc get all classes :
 * @route /api/classrooms/
 * @method GET
 * @access private only admin OR professor who create the class :
 ---------------------------------------------------*/
async function createQuestion(req, res) {
  try {
    const question = await Question.create(req.body);
    Exams.findByIdAndUpdate(question.Exam,
      { $push: { questions: question._id } },
      { new: true }
    )
    .then(updatedQuestion => {
      res.status(201).json(question);
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create question' });
  }
}

// Get all questions
async function getAllQuestions(req, res) {
  try {
    const questions  = await Question.find({}).populate('answers');
    // console.log(questions);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

// Get a question by ID
async function getQuestionById(req, res) {
  try {
    const question = await Question.findById(req.params.id).populate("answers",["_id","titre","note"]).sort({createdAt:-1});
    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch question' });
  }
}

// Get a question by Exam ID
async function getQuestionByExamId(req, res) {
  try {
    const ExamsId =req.params.ExamsId;
    // console.log(ExamsId);
    const question = await Question.find({Exam : ExamsId}).populate('answers');
    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ error: 'Questions not found' });
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
      // Delete associated answers
      await Answer.deleteMany({ question: question._id });

      // Remove the question reference from the exam
      const updatedExam = await Exams.findByIdAndUpdate(
        question.Exam,
        { $pull: { questions: question._id } },
        { new: true }
      );

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
  getQuestionByExamId,
};
