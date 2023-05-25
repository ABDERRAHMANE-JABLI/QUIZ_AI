import Answer from "./answer";

const QuestionCard = (props) => {
  const { questionTitre , questionDescription, answers , questionType } = props;

  const answerList = answers.map((answer) => (
    <Answer
      text={answer.text}
      questionType={questionType}
    />
  ));

  return (
            <div className="card mb-4 bg-light shadow">
                <div className="card-body">
                        <h5 className="card-title bg-primary bg-gradient text-white p-2">{questionTitre}</h5>
                        <p className="card-text">{questionDescription}</p>
                      {answerList}
                </div>
            </div>  
      );
};

export default QuestionCard;
