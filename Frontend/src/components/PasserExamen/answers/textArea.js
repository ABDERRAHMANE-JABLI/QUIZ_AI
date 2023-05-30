import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect } from "react";

const TextArea = (props) => {
  const { questionId } = props;
  const [text, setText] = useState("");

  const handleTextChange = (value) => {
    setText(value);
  };

  useEffect(() => {
    const hiddenInput = document.getElementById(questionId);
    if (hiddenInput) {
      hiddenInput.value = text;
    }
  }, [text, questionId]);

  return (
    <>
      <ReactQuill
        className="form-control"
        value={text}
        onChange={handleTextChange}
      />
      <input type="hidden" id={questionId} name={questionId} value={text} />
    </>
  );
};

export default TextArea;
