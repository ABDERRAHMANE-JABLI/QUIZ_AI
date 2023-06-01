import React, { useEffect, useState } from "react";
import { FcQuestions } from 'react-icons/fc';
import { Footer } from '../HomeItems/items';
import logo from '../../image/logo_quiz2.png';
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";

const ResultoffQuiz = () => {
  const { ExamId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/submitExam/${ExamId}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ExamId]);

  const calculateTotalNote = () => {
    if (!data) return 0;

    let totalNote = 0;
    data.answers.forEach((answer) => {
      if (Array.isArray(answer.reponse)) {
        answer.reponse.forEach((response) => {
          const selectedAnswer = answer.question.answers.find(ans => ans._id === response.Answer);
          if (selectedAnswer) {
            totalNote += selectedAnswer.note;
          }
        });
      } else {
        const selectedAnswer = answer.question.answers.find(ans => ans._id === answer.reponse.Answer);
        if (selectedAnswer) {
          totalNote += selectedAnswer.note;
        }
      }
    });
    return totalNote;
  };

  if (!data) {
    return <p>Loading data...</p>;
  }

  return (
    <>
      <div className="container d-flex justify-content-center p-3">
        <img src={logo} className="logo_quiz" alt="quiz ai" width="100px" height="70px" />
      </div>
      <div className="container mt-5">
        <p className="d-flex justify-content-center">Total Note: {calculateTotalNote()}</p>
        <div className="d-flex justify-content-between">
          <p className="infoExam"><FcQuestions />&nbsp;&nbsp;{data.student.firstname} {data.student.lastname}</p>
          <p className="infoExam" dangerouslySetInnerHTML={{ __html: data.exam.description }}></p>
          <p className="infoExam"><FcQuestions />&nbsp;&nbsp;{data.exam.titre}</p>
        </div>
        <div className="row mt-3">
          {data.answers.map((answer) => (
            <div className="card mb-4 shadow" key={answer._id}>
              <div className="card-body">
                <h5 className="card-title bg-gradient text-black p-2" dangerouslySetInnerHTML={{ __html: answer.question.titre }}></h5>

                {(() => {
                  switch (answer.question.type) {
                    case 'ChoixMultiple':
                      return (
                        <ul className="list-group list-group-flush">
                          {answer.question.answers.map((ans) => {
                            const isSelected = Array.isArray(answer.reponse) && answer.reponse.find((res) => res.Answer === ans._id);
                            return (
                              <li className={`list-group-item `} key={ans._id}>
                                <input type="checkbox" checked={isSelected} readOnly />
                                {ans.titre}
                                {ans.correct && <span className="text-success"> (Correct, Note: {ans.note})</span>}
                                {!ans.correct && <span className="text-danger"> (InCorrect, Note: {ans.note})</span>}
                              </li>
                            );
                          })}
                        </ul>
                      );
                    case 'ChoixUnique':
                      return (
                        <ul className="list-group list-group-flush">
                          {answer.question.answers.map((ans) => {
                            const isSelected = answer.reponse && answer.reponse.Answer === ans._id;
                            return (
                              <li className={`list-group-item `} key={ans._id}>
                                <input type="radio" checked={isSelected} readOnly />
                                {ans.titre}
                                {ans.correct && <span className="text-success"> (Correct, Note: {ans.note})</span>}
                                {!ans.correct && <span className="text-danger"> (InCorrect, Note: {ans.note})</span>}
                              </li>
                            );
                          })}
                        </ul>
                      );
                    default:
                      return (
                        <>
                          <ReactQuill value={answer.reponse.text} readOnly />
                          <p>
                            Réponse préférée: {answer.question.answers[0].titre}
                          </p>
                        </>
                      );
                  }
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ResultoffQuiz;
