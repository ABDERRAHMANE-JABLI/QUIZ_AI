const {UserExamSubmission} = require('../models/UserExamSubmission');

/**-------------------------------------------------------
 * @desc submit Exam by  student  :
 * @route /api/submitExam
 * @method POST
 * @access public
 ---------------------------------------------------*/
const submitExam = async (req, res) => {
  const { student, exam, userAnswers } = req.body;

  try {
    // Create a new user exam submission object
    const submission = new UserExamSubmission({
      student,
      exam,
      answers: userAnswers,
    });

    // Save the submission to the database
    await submission.save();

    // Return a success response
    res.status(200).json({ message: 'Exam submitted successfully.' });
  } catch (error) {
    console.error('Error submitting exam:', error);
    res.status(500).json({ message: 'Failed to submit exam.' });
  }
};

/**-------------------------------------------------------
 * @desc get ExamSubmition   :
 * @route /api/submitExam
 * @method GET
 * @access on_professeur
 ---------------------------------------------------*/
const getExamSubmitionByExamId = async (req,res)=>{
  try {
    const { exam } = req.params;

    // Retrieve exam submissions for the specified examId
    const submissions = await UserExamSubmission.find({ exam })
  .populate({
    path: 'student',
    select: 'firstname lastname email photo', // Exclude the password field
  })
  .populate({
    path: 'exam',
    select: 'titre description classe',
  })
  .select('-answers')
  .exec();

    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }

} 

const getExamSubmitionByExamAndStudent = async (req,res)=>{
  try {
    const { exam ,student } = req.params;

    // Retrieve exam submissions for the specified examId
    const submissions = await UserExamSubmission.findOne({ student,exam})
  .populate({
    path: 'student',
    select: 'firstname lastname email photo', // Exclude the password field
  })
  .populate({
    path: 'exam',
    select: 'titre description',
  })
  .populate({
    path: 'answers.question',
    select :'-Exam -createdAt -updatedAt -__v',
    populate: {
      path: 'answers',
      model: 'Answer',
      select: 'titre note correct',
    },
  })
  .exec();

    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }

} 

module.exports = {
  submitExam,
  getExamSubmitionByExamId,
  getExamSubmitionByExamAndStudent,
};
