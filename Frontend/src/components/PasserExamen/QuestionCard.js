import React, { useEffect, useState } from "react";
import Answer from "./answer";

const QuestionCard = (props) => {
  const { questionTitre, answers, questionType } = props;
  const [shuffledAnswers, setShuffledAnswers] = useState([]);


  useEffect(() => {
    // Shuffle the answers array once when the component mounts
    const shuffled = [...answers].sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
  }, []);

  const answerList = shuffledAnswers.map((answer) => (
    <Answer
      key={answer.id}
      text={answer.titre}
      questionType={questionType}
    />
  ));

  return (
    <div className="card mb-4 bg-light shadow">
      <div className="card-body">
        <h5 className="card-title bg-primary bg-gradient text-white p-2" dangerouslySetInnerHTML={{ __html: questionTitre }}></h5>
        {answerList}
      </div>
    </div>
  );
};

export default QuestionCard;
