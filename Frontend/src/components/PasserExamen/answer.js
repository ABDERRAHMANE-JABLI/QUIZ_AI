import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Answer = (props) => {
  const { text, questionType } = props;

  return (
    <div>
      {(() => {
        switch (questionType) {
          case "ChoixUnique": {
            return (
              <div className="form-check">
                <input
                  id="question1Choice1"
                  className="form-check-input"
                  type="radio"
                  name="question1"
                  defaultValue="choice1"
                />
                <label className="form-check-label" htmlFor="question1Choice1">
                  {text}
                </label>
              </div>
            );
          }

          case "ChoixMultiple": {
            return (
              <div className="form-check">
                <input
                  id="question2Choice1"
                  className="form-check-input"
                  type="checkbox"
                  name="question2[]"
                  defaultValue="choice1"
                />
                <label className="form-check-label" htmlFor="question2Choice1">
                  {text}
                </label>
              </div>
            );
          }

          default: {
            return (
              <ReactQuill
                id="question2Choice1"
                className="form-control"
                defaultValue={text}
              />
            );
          }
        }
      })()}
    </div>
  );
};

export default Answer;
