import React from 'react'
import {Sidebar, Footer, Header, Container} from '../components';
import EditerExamForm from '../ClassDetails/EditExamenForm';
import QuestionContainer from '../Questions/Question';

const EditerExamen = () => {
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

  // id, question, answers, removeQuestion
  const cards = data.map(function(item){
    return <QuestionContainer id={item.id} questionText={item.questionText} answers={item.answers} questionType={item.questionType}/>
  })
  return (
    <div id="wrapper">
      <Sidebar/>
      <div className="d-flex flex-column" id="content-wrapper">
        <div id="content">
          <Header/>
          <Container>
          {/* <TextToData/> */}
            <EditerExamForm/>
            
            <div className="card" >
                  <div className="card-header">
                    <div className="d-flex justify-content-between">
                      <div className="p-2 bd-highlight">
                        <span> select type </span>
                      </div>
                      <div className="p-2 bd-highlight">
                        <select
                          id="question_type"
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="" selected="">
                            Open this select menu
                          </option>
                          <option value={1}>Choix multiple</option>
                          <option value={2}>Choix unique</option>
                          <option value={3}>Input text</option>
                        </select>
                      </div>
                      <div className="p-2 bd-highlight">
                        <button className="btn btn-primary mb-3 addQuestion" type="submit">
                          Ajouter
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div id="parent-div" className="col">
                        {cards}
                      </div>
                    </div>
                  </div>
                </div>
          </Container>
        </div>
        <Footer/>
      </div>
    </div>
  )
}

export default EditerExamen