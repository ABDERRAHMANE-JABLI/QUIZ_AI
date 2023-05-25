import React, { useEffect, useState } from "react";
import { FcTodoList, FcAlarmClock, FcQuestions } from 'react-icons/fc';
import QuestionCard from "../PasserExamen/QuestionCard";
import { Footer } from '../HomeItems/items';
import logo from '../../image/logo_quiz2.png';
import { useParams } from "react-router-dom";

const PasserExamenPage = (props) => {
  const { ExamId } = useParams();
  const endPoint = `http://localhost:8000/api/examens/${ExamId}`;
  const [examData, setExamData] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

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

  const fetchExamData = async () => {
    try {
      const response = await fetch(endPoint); // Replace "your_api_endpoint" with the actual API endpoint to fetch the exam data
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

  const { Durre, titre, description, questions } = examData;

  const cards = questions.map((item) => (
    <QuestionCard
      key={item._id}
      questionTitre={item.titre}
      questionDescription={'description'}
      answers={item.answers}
      questionType={item.type}
    />
  ));

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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
          <p className="infoExam"><FcTodoList />&nbsp;&nbsp;{questions.length} Questions</p>
        </div>
        <div className="d-flex justify-content-center">
          <p className="infoExam" dangerouslySetInnerHTML={{__html:description}}></p>
        </div>
        {remainingTime !== null && (
          <div className="timer-container"  style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: "9999",
          }}>
           <p className="infoExam">Temps restant: {formatTime(remainingTime)}</p>
        </div>
        )}
        <div className="row mt-3">
          <form>
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
