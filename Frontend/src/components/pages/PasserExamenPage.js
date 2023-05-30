import React, { useEffect, useState } from "react";
import { FcTodoList, FcAlarmClock, FcQuestions } from 'react-icons/fc';
import QuestionCard from "../PasserExamen/QuestionCard";
import { Footer } from '../HomeItems/items';
import logo from '../../image/logo_quiz2.png';
import { useParams } from "react-router-dom";
import Radio from "../PasserExamen/answers/radio";
import Checkbox from "../PasserExamen/answers/checkbox";
import TextArea from "../PasserExamen/answers/textArea";

const PasserExamenPage = (props) => {
  const { ExamId } = useParams();
  const endPoint = `http://localhost:8000/api/examens/${ExamId}`;
  const [examData, setExamData] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    fetchExamData(); // Fetch the exam data when the component mounts
  }, []);

  useEffect(() => {
    if (examData && examData.Durre) {
      const durationInSeconds = examData.Durre * 60;
      setRemainingTime(durationInSeconds);

      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [examData]);

  useEffect(() => {
    if (examData && examData.questions) {
      // Shuffle the questions array randomly
      const shuffled = [...examData.questions].map((question) => {
        const shuffledAnswers = [...question.answers].sort(() => Math.random() - 0.5);
        return { ...question, answers: shuffledAnswers };
      });
      setShuffledQuestions(shuffled);
    }
  }, [examData]);

  const fetchExamData = async () => {
    try {
      const response = await fetch(endPoint);
      const data = await response.json();
      setExamData(data);
    } catch (error) {
      console.error("Error fetching exam data:", error);
    }
  };

  if (!examData) {
    // Render loading state or return null while the data is being fetched
    return null;
  }

  const { Durre, titre, description } = examData;

  const cards = shuffledQuestions.map((item) => (
    <QuestionCard
      id={item._id}
      key={item._id}
      questionTitre={item.titre}
      questionType={item.type}
      questionId={item._id}
    >
      {item.answers.map((answer) => {
        switch (item.type) {
          case 'ChoixUnique':
            return (
              <Radio
                key={answer._id}
                id={answer._id}
                text={answer.titre}
                questionType={item.type}
                questionId={item._id}
              />
            );
          case 'ChoixMultiple':
            return (
              <Checkbox
                key={answer._id}
                id={answer._id}
                text={answer.titre}
                questionType={item.type}
                questionId={item._id}
              />
            );
          default:
            return (
              <TextArea
                key={answer._id}
                id={answer._id}
                text={answer.titre}
                questionType={item.type}
                questionId={item._id}
              />
            );
        }
      })}
    </QuestionCard>
  ));

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

 const handleSubmit = (event) => {
  event.preventDefault();

  const userAnswers = shuffledQuestions.map((question) => {
    const questionType = question.type;
    const questionId = question._id;
    let answersSelected;

    switch (questionType) {
      case 'ChoixUnique':
        const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
        const idAnswer = selectedOption ? selectedOption.value : null;
        answersSelected = { idAnswer };
        break;

      case 'ChoixMultiple':
        const selectedCheckboxes = Array.from(document.querySelectorAll(`input[name="${questionId}"]:checked`));
        const selectedIds = selectedCheckboxes.map((checkbox) => checkbox.value);
        answersSelected = selectedIds.map((idAnswer) => ({ idAnswer }));
        break;

      case 'InputText':
        const textInput = document.querySelector(`input[name="${questionId}"]`);
        const text = textInput ? textInput.value : '';
        answersSelected = { text };
        break;

      default:
        break;
    }

    return {
      QuestionType: questionType,
      QuestionId: questionId,
      answersSelected: answersSelected,
    };
  });

  console.log(JSON.stringify(userAnswers));
  // Perform any necessary logic with the user's answers
};


  return (
    <>
      <div className="container d-flex justify-content-center p-3">
        <img src={logo} className="logo_quiz" alt="quiz ai" width="100px" height="70px" />
      </div>
      <div className="container mt-5">
        <div className="d-flex justify-content-between">
          <p className="infoExam"><FcQuestions />&nbsp;&nbsp;{titre}</p>
          <p className="infoExam"><FcAlarmClock />&nbsp;&nbsp;Durée {Durre} min</p>
          <p className="infoExam"><FcTodoList />&nbsp;&nbsp;{shuffledQuestions.length} Questions</p>
        </div>
        <div className="d-flex justify-content-center">
          <p className="infoExam" dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
        {remainingTime !== null && (
          <div
            className="timer-container"
            style={{
              position: "fixed",
              bottom: "10px",
              right: "10px",
              zIndex: "9999",
            }}
          >
            <p className="infoExam">Temps restant: {formatTime(remainingTime)}</p>
          </div>
        )}
        <div className="row mt-3">
          <form onSubmit={handleSubmit}>
            {cards}
            <input type="submit" value="Submit" className="btn btn-primary float-end" />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PasserExamenPage;
