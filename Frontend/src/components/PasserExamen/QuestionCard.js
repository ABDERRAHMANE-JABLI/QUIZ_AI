import React from "react";

const QuestionCard = (props) => {
  const { questionTitre, questionId } = props;

  return (
    <div className="card mb-4 bg-light shadow">
      <div className="card-body">
        <h5 className="card-title bg-primary bg-gradient text-white p-2" dangerouslySetInnerHTML={{ __html: questionTitre }}></h5>
        {props.children}
      </div>
    </div>
  );
};

export default QuestionCard;
