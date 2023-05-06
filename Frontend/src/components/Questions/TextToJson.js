import React, { useState } from "react";

const  TextToData = ()=> {
  const [text, setText] = useState("");
  const [questions, setQuestions] = useState([]);

  function handleTextChange(event) {
    setText(event.target.value);
  }

  function handleConvertClick() {
    const lines = text.split("\n");
    let newQuestions = [];

    let currentQuestion = {};
    let currentAnswers = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line === "") {
        // Ignore empty lines
        continue;
      }

      if (line.startsWith("Réponse : ")) {
        // This line contains the answer, add it to the current answers and finish the current question
        const answerIds = line
          .substring("Réponse : ".length, line.length - 1)
          .split(",")
          .map((id) => parseInt(id.trim()));

        currentAnswers = currentAnswers.map((answer) => ({
          ...answer,
          correct: answerIds.includes(answer.id),
        }));

        currentQuestion.answers = currentAnswers;
        newQuestions.push(currentQuestion);

        // Reset the current question and answers
        currentQuestion = {};
        currentAnswers = [];
      } else if (line.startsWith("A.")) {
        // This line contains an answer, add it to the current answers
        const answerText = line.substring("A.".length).trim();
        const answer = {
          id: currentAnswers.length + 1,
          text: answerText,
          correct: false,
          score: 0,
        };
        currentAnswers.push(answer);
      } else if (line.startsWith("Q.")) {
        // This line contains a new question, finish the current question (if any) and start a new one
        if (currentQuestion.text !== undefined) {
          currentQuestion.answers = currentAnswers;
          newQuestions.push(currentQuestion);
        }

        currentQuestion = {
          id: newQuestions.length + 1,
          questionText: line.substring("Q.".length).trim(),
          questionType: "choixUnique",
          answers: [],
        };

        currentAnswers = [];
      }
    }

    // Add the last question (if any)
    if (currentQuestion.text !== undefined) {
      currentQuestion.answers = currentAnswers;
      newQuestions.push(currentQuestion);
    }

    setQuestions(newQuestions);
  }

  return (
    <div>
      <textarea value={text} onChange={handleTextChange} rows={10} cols={50} />
      <br />
      <button onClick={handleConvertClick}>Convert</button>
      <br />
      <pre>{JSON.stringify(questions, null, 2)}</pre>
    </div>
  );
}

export default TextToData;
