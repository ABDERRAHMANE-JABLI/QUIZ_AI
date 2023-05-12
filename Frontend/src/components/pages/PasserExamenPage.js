import React from "react";
import ExamenInfoCard from "../PasserExamen/ExamenInfo";
import QuestionCard from "../PasserExamen/QuestionCard";
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
      })
      
     return(
            <div className="container">
                   <div className="row"> 
                        <ExamenInfoCard titre ={'examen informatique'} description={'une description'} duree={'60'} niveau={'facile'} nbQuestion={'12'}/>
                         <form > {/*onSubmit={handleOnSubmitExamen}*/}
                           {cards}
                           <input type="submit" value="Submit" className="btn btn-primary float-end" />
                         </form>
                   </div>
            </div>
     )
}
export default PasserExamenPage;