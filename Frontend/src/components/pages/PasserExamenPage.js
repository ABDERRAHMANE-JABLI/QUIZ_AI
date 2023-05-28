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
      const shuffled = [...examData.questions].sort(() => Math.random() - 0.5);
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
      key={item._id}
      questionTitre={item.titre}
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
          <p className="infoExam"><FcTodoList />&nbsp;&nbsp;{shuffledQuestions.length} Questions</p>
        </div>
        <div className="d-flex justify-content-center">
          <p className="infoExam" dangerouslySetInnerHTML={{__html:description}}></p>
        </div>
        {remainingTime !== null && (
          <div className="timer-container"  
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
