import React from "react";

const Checkbox = (props) => {
  const { text, questionId } = props;

  return (
    <div className="form-check">
      <input
        id={props.id}
        className="form-check-input"
        type="checkbox"
        name={questionId}
        value={props.id}
      />
      <label className="form-check-label" htmlFor={props.id}>
        {text}
      </label>
    </div>
  );
};

export default Checkbox;
