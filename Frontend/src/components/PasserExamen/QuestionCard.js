import Answer from "./answer";

const QuestionCard = (props) => {
  const { questionTitre , answers , questionType } = props;

  const answerList = answers.map((answer) => (
    <Answer
      text={answer.titre}
      questionType={questionType}
    />
  ));

  return (
            <div className="card mb-4 bg-light shadow">
                <div className="card-body">
                        <h5 className="card-title bg-primary bg-gradient text-white p-2" dangerouslySetInnerHTML={{__html:questionTitre}}></h5>
                      {answerList}
                </div>
            </div>  
      );
};

export default QuestionCard;
