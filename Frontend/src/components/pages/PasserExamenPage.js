import React from "react";
import {FcTodoList, FcAlarmClock, FcQuestions} from 'react-icons/fc'
import QuestionCard from "../PasserExamen/QuestionCard";
import {Footer} from '../HomeItems/items'
import logo from '../../image/logo_quiz2.png';

const PasserExamenPage= (props)=>{
  
    const data = [ {
        id: 1,
        questionText: "Quelle est la capitale de la France ?",
        questionType: "ChoixMultiple",
        answers: [
          { id: 1, text: "Londres", correct: false, score: 0 },
          { id: 2, text: "Paris", correct: true, score: 0.5,},
          { id: 3, text: "Berlin", correct: true, score: 0.5 , },
          { id: 4, text: "Madrid", correct: false, score: 0 , }
        ]
        },
        {
          id: 2,
          questionText: "Quelle est la capitale de la France ?",
          questionType: "ChoixUnique",
          answers: [
            { id: 1, text: "Londres", correct: false, score: 0 },
            { id: 2, text: "Paris", correct: true, score: 1,},
            { id: 3, text: "Berlin", correct: false, score: 0 , },
            { id: 4, text: "Madrid", correct: false, score: 0 , }
          ]
          },
          {
            id: 3,
            questionText: "Quelle est la capitale de la France ?",
            questionType: "InputText",
            answers: [
              { id: 1, text: "Londres", correct: false, score: 1 },
            ]
            },{
              id: 4,
              questionText: "Quel est le plus grand pays du monde ?",
              questionType: "ChoixUnique",
              answers: [
                { id: 1, text: "Canada", correct: false, score: 0 },
                { id: 2, text: "Russie", correct: true, score: 1 },
                { id: 3, text: "Chine", correct: false, score: 0 },
                { id: 4, text: "États-Unis", correct: false, score: 0 }
              ]
            },
            {
              id: 5,
              questionText: "Quel est le plus grand océan du monde ?",
              questionType: "ChoixMultiple",
              answers: [
                { id: 1, text: "Océan Atlantique", correct: false, score: 0 },
                { id: 2, text: "Océan Pacifique", correct: true, score: 0.5 },
                { id: 3, text: "Océan Indien", correct: true, score: 0.5 },
                { id: 4, text: "Océan Arctique", correct: false, score: 0 }
              ]
            },
            {
              id: 6,
              questionText: "Quelle est la plus haute montagne du monde ?",
              questionType: "InputText",
              answers: [
                { id: 1, text: "Mont Everest", correct: true, score: 1 }
              ]
            }
      ];
      const cards = data.map(function(item){
        return <QuestionCard  questionTitre={item.questionText} questionDescription={'description'} answers={item.answers} questionType={item.questionType}/>
      });
      
     return(
      <>
          <div className="container d-flex justify-content-center p-3">
            <img src={logo} className="logo_quiz" alt="quiz ai" width="100px"  height="70px"/>
          </div>
            <div className="container mt-5">
              <div className="d-flex justify-content-between"><p className="infoExam"><FcQuestions/>&nbsp;&nbsp;Examen Informatique</p> <p className="infoExam"><FcAlarmClock/>&nbsp;&nbsp;Durée 1h</p> <p className="infoExam"><FcTodoList/>&nbsp;&nbsp; 10 Questions</p></div>
                   <div className="row mt-3"> 
                         <form > {/*onSubmit={handleOnSubmitExamen}*/}
                           {cards}
                           <input type="submit" value="Submit" className="btn btn-primary float-end" />
                         </form>
                   </div>
            </div>
          <Footer/>
      </>
     )
}
export default PasserExamenPage;