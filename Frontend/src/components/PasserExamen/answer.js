import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Answer = (props) => {
  const { text, questionType, questionId, formValues, handleAnswerChange } = props;

  return (
    <div>
      {(() => {
        switch (questionType) {
          case "ChoixUnique": {
            return (
              <div className="form-check">
                <input
                  id={props.id}
                  className="form-check-input"
                  type="radio"
                  name={questionId}
                  value={props.id}
                  checked={formValues[questionId] === props.id}
                  onChange={handleAnswerChange}
                />
                <label className="form-check-label" htmlFor={props.id}>
                  {text}
                </label>
              </div>
            );
          }

          case "ChoixMultiple": {
            return (
              <div className="form-check">
                <input
                  id={props.id}
                  className="form-check-input"
                  type="checkbox"
                  name={questionId}
                  value={props.id}
                  checked={formValues[questionId] && formValues[questionId].includes(props.id)}
                  onChange={handleAnswerChange}
                />
                <label className="form-check-label" htmlFor={props.id}>
                  {text}
                </label>
              </div>
            );
          }

          default: {
            return (
              <ReactQuill
                id={props.id}
                className="form-control"
                name={questionId}
                value={formValues[questionId] || ""}
                onChange={handleAnswerChange}
              />
            );
          }
        }
      })()}
    </div>
  );
};

export default Answer;
